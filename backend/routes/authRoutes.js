import express from 'express';
import { signup, signin, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateSignup, validateSignin, validate } from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, validate, signup);
router.post('/signin', validateSignin, validate, signin);

// Protected routes
router.get('/me', protect, getMe);

export default router;

