import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  posted: { type: String, default: () => new Date().toLocaleDateString() },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
