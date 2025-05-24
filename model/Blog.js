import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  image: String,
  author: String,
  category: String,
  date: { type: Date, default: Date.now },
  style: {
    font: String,
    colorTheme: String,
    layout: String,
  }
});

export default mongoose.model('Blog', blogSchema);
