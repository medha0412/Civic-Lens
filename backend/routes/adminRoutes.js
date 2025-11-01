const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/adminController');

// All admin routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// @desc    Get all complaints
// @route   GET /api/admin/complaints
// @access  Private/Admin
router.get('/complaints', getAllComplaints);

// @desc    Update complaint status
// @route   PATCH /api/admin/complaints/:id
// @access  Private/Admin
router.patch('/complaints/:id', updateComplaintStatus);

module.exports = router;

