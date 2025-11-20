import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// Temporary storage for auth data (in production, use Redis or database)
const authSessions = new Map();

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
    console.log("Request user:", req.user);
    console.log("Request query:", req.query);
    console.log("Request params:", req.params);

    // SAFETY CHECK — IMPORTANT!
    if (!req.user) {
      console.error("No user received in callback!");
      const frontendUrl = process.env.FRONTEND_URL || 
        (process.env.NODE_ENV === 'production' 
          ? 'https://civiclens-major.netlify.app' 
          : 'http://localhost:5173');
      console.error("Redirecting to login due to missing user");
      return res.redirect(`${frontendUrl}/login?error=no_user`);
    }

    const user = req.user;
    console.log('User data received in callback:', user);

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

    // Create a short session ID to pass in URL
    const sessionId = Math.random().toString(36).substring(2, 15);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      authType: user.authType
    };
    
    // Store the data temporarily (expires in 5 minutes)
    authSessions.set(sessionId, { token, user: userData });
    setTimeout(() => authSessions.delete(sessionId), 5 * 60 * 1000);

    console.log('Session created with ID:', sessionId);
    
    // Determine frontend URL - support both local and production
    let frontendUrl = process.env.FRONTEND_URL;
    
    // If FRONTEND_URL is not set or is localhost, try to detect from request
    if (!frontendUrl || frontendUrl.includes('localhost')) {
      // In production, use the Netlify URL
      if (process.env.NODE_ENV === 'production') {
        frontendUrl = 'https://civiclens-major.netlify.app';
      } else {
        // Local development - default to Vite dev server
        frontendUrl = 'http://localhost:5173';
      }
    }
    
    const redirectUrl = `${frontendUrl}/auth/google/callback?session=${sessionId}`;
    console.log('Redirecting to:', redirectUrl);
    return res.redirect(redirectUrl);
  }
);

// API endpoint to retrieve auth data by session ID
router.get('/google/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const authData = authSessions.get(sessionId);
  
  if (!authData) {
    return res.status(404).json({ message: 'Session not found or expired' });
  }
  
  // Delete after retrieval (one-time use)
  authSessions.delete(sessionId);
  
  res.json(authData);
});

// Failure route
router.get('/google/failure', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://civiclens-major.netlify.app' 
      : 'http://localhost:5173');
  res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
});

export default router;
