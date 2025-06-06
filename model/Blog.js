import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);