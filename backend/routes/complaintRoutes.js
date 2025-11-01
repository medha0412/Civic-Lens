const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createComplaint, getMyComplaints } = require('../controllers/complaintController');
const upload = require('../config/multer');

// All complaint routes are protected
router.use(protect);

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
router.post('/', upload.single('photo'), createComplaint);

// @desc    Get all complaints by logged in user
// @route   GET /api/complaints
// @access  Private
router.get('/', getMyComplaints);

module.exports = router;

