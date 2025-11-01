const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { 
  validateSignup, 
  validateSignin, 
  validate 
} = require('../middleware/validator');

// Public routes
router.post('/signup', validateSignup, validate, signup);
router.post('/signin', validateSignin, validate, signin);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;

