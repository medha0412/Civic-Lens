import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // 1. Find user by Google ID OR Email
        let user =
          (await User.findOne({ googleId: profile.id })) ||
          (await User.findOne({ email }));

        // 2. Create new Google user
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            authType: "google"
          });

          await user.save();
        }

        // 3. If user exists but googleId missing → update it
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user); // IMPORTANT
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

// Required for passport sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
