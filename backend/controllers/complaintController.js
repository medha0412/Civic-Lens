const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
  try {
    const { message, latitude, longitude } = req.body;

    // Validate required fields
    if (!message) {
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

    // Get user to fetch city
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create complaint
    const complaint = await Complaint.create({
      message,
      photo: req.file ? `/uploads/complaints/${req.file.filename}` : null,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      },
      city: user.city,
      createdBy: req.user.id
    });

    // Populate user details
    await complaint.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: {
        complaint
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating complaint',
      error: error.message
    });
  }
};

// @desc    Get all complaints by logged in user
// @route   GET /api/complaints
// @access  Private
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id })
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
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
};

