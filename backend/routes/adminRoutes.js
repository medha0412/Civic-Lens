import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { getAllComplaints, updateComplaintStatus } from '../controllers/adminController.js';

const router = express.Router();

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

export default router;

