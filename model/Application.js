// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },           // ✅ New
  experience: { type: String, required: true },       // ✅ New
  position: { type: String, required: true }, 
  message: String,
  resumeUrl: { type: String, required: true },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Application', applicationSchema);
