import Complaint from '../models/Complaint.js';

// @desc    Get all complaints (Admin only)
// @route   GET /api/admin/complaints
// @access  Private/Admin
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('createdBy', 'name email city')
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

// @desc    Update complaint status
// @route   PATCH /api/admin/complaints/:id
// @access  Private/Admin
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'in-progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updateFeilds = { status };

    if(status === 'pending') {
      updateFeilds['statusTimestamps.pendingAt'] = new Date();
    } else if(status === 'in-progress') {
      updateFeilds['statusTimestamps.inProgressAt'] = new Date();
    } else if(status === 'resolved') {
      updateFeilds['statusTimestamps.resolvedAt'] = new Date();
    }

    // Update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email city');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Complaint status updated to "${status}" successfully`,
      data: {
        complaint
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating complaint status',
      error: error.message
    });
  }
};

