import express from 'express';
import { protect } from '../middleware/auth.js';
import { createComplaint, getMyComplaints } from '../controllers/complaintController.js';
import upload from '../config/multer.js';

const router = express.Router();

// All complaint routes are protected
router.use(protect);


//router.post('/', upload.single('photo'), createComplaint);
router.post('/', protect,  createComplaint);

// @desc    Get all complaints by logged in user
// @route   GET /api/complaints
// @access  Private
router.get('/', getMyComplaints);

export default router;

