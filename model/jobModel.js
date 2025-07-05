import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  minQualification: { type: String, required: true },
  openings: { type: Number, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  timing: { type: String, required: true },
  shift: { type: String, required: true },
  salary: { type: String, required: true },
  type: { type: String, required: true }, // Full-time, Part-time, etc.
  skills: { type: [String], required: true }, // Array of skills
  description: { type: String, required: true },
  posted: { type: String, default: () => new Date().toLocaleDateString() },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
