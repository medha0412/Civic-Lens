import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import { classifyComplaint } from '../utils/aiClassifier.js';

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
export const createComplaint = async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log('Received complaint request:', {
      body: req.body,
      hasFile: !!req.file,
      user: req.user ? { id: req.user._id, email: req.user.email } : null
    });

    const { message, latitude, longitude, city, area } = req.body;

    // Validate required fields
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Location (latitude and longitude) is required'
      });
    }

    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'City is required'
      });
    }

    // Validate user exists
    if (!req.user || !req.user._id) {
      console.error('User authentication failed:', { user: req.user });
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Get user to verify
    const user = await User.findById(req.user._id);

    if (!user) {
      console.error('User not found in database:', req.user._id);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Validate and parse coordinates
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid latitude or longitude values'
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90, longitude must be between -180 and 180'
      });
    }

    // Classify complaint (with error handling)
    let category;
    try {
      category = await classifyComplaint(message);
    } catch (classifyError) {
      console.error('Error classifying complaint, using default:', classifyError);
      category = 'Other'; // Fallback to default category
    }

    // Create complaint
    const complaintData = {
      message: message.trim(),
      category,
      photo: req.file ? `/uploads/complaints/${req.file.filename}` : null,
      location: {
        latitude: lat,
        longitude: lng
      },
      city: city.trim(),
      area: area ? area.trim() : null,
      createdBy: req.user._id
    };

    console.log('Creating complaint with data:', { ...complaintData, createdBy: req.user._id });

    const complaint = await Complaint.create(complaintData);

    // Populate user details
    await complaint.populate('createdBy', 'name email');

    console.log('Complaint created successfully:', complaint._id);

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: {
        complaint
      }
    });
  } catch (error) {
    console.error('Error creating complaint - Full error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      success: false,
      message: 'Error creating complaint',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get all complaints by logged in user
// @route   GET /api/complaints
// @access  Private
export const getMyComplaints = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const complaints = await Complaint.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: {
        complaints
      }
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

