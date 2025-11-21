import express from 'express';
import { protect } from '../middleware/auth.js';
import { createComplaint, getMyComplaints } from '../controllers/complaintController.js';
import upload from '../config/multer.js';

const router = express.Router();

// All complaint routes are protected
router.use(protect);

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB'
      });
    }
    if (err.message && err.message.includes('Only image files')) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Invalid file'
    });
  }
  next();
};

//router.post('/', upload.single('photo'), createComplaint);
router.post('/', upload.single('photo'), handleMulterError, createComplaint);

// @desc    Get all complaints by logged in user
// @route   GET /api/complaints
// @access  Private
router.get('/', getMyComplaints);

export default router;

