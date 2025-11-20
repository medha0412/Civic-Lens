import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },

  // OPTIONAL FOR GOOGLE USERS
  password: {
    type: String,
    required: function () {
      return this.authType === 'local'; // only required for normal signup
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },

  // NEW FIELD TO DISTINGUISH AUTH TYPE
  googleId: {
  type: String,
  default: null
},
  authType: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },

  city: {
    type: String,
    trim: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// HASH PASSWORD ONLY IF LOCAL USER
userSchema.pre('save', async function (next) {
  // If password not modified OR user is google auth → skip hashing
  if (!this.isModified('password') || this.authType === 'google') {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// COMPARE PASSWORD (LOCAL ONLY)
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.authType === 'google') return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
