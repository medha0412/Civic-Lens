import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// Step 1: Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google redirects here after login
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/google/failure', session: false }),
  (req, res) => {
      console.log("Callback route hit");

    // SAFETY CHECK — IMPORTANT!
    if (!req.user) {
            console.error("No user received in callback!");

      return res.redirect('/api/auth/google/failure');
    }

    const user = req.user;
        console.log('User data received in callback:', user);

    console.log('User data:', user);

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('Token created');

    // Redirect to frontend with token and user data
    const userData = JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      authType: user.authType
    });
    console.log('UserData string:', userData);
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(userData)}`;
    console.log('Redirecting to:', redirectUrl);
    return res.redirect(redirectUrl);
  }
);

// Failure route
router.get('/google/failure', (req, res) => {
  res.send('Google authentication failed');
});

export default router;
