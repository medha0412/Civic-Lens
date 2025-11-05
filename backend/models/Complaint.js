import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  photo: {
    type: String,
    default: null
  },
  location: {
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Invalid latitude'],
      max: [90, 'Invalid latitude']
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Invalid longitude'],
      max: [180, 'Invalid longitude']
    }
  },

  // 🧠 New field — AI-assigned category
  category: {
    type: String,
    enum: [
      'Garbage Issue',
      'Road Damage',
      'Water Leakage',
      'Streetlight Fault',
      'Noise Pollution',
      'Other'
    ],
    default: 'Other'
  },

  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },

  statusTimestamps: {
    pendingAt: { type: Date, default: Date.now },
    inProgressAt: { type: Date },
    resolvedAt: { type: Date }
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for optimization
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ createdBy: 1 });

export default mongoose.model('Complaint', complaintSchema);
