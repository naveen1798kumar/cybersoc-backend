import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  summary: String,
  date: String, // You may use Date type if you want, but your frontend uses a string
  author: String,
  category: String,
  image: String, // Store image URL or path as string
  content: String,
  lists: {
    whyImportant: [String],
    types: [String],
    pros: [String],
    cons: [String],
    useCases: [String],
    bestPractices: [String],
    tools: [String],
  }
});

export default mongoose.model('Blog', blogSchema);