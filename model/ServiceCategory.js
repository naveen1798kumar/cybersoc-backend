// models/ServiceCategory.js
import mongoose from 'mongoose';

const ServiceCategorySchema = new mongoose.Schema({
  id: String, // e.g. "websites-and-softwares"
  title: String,
  description: String,
  image: String,
});

export default mongoose.model('ServiceCategory', ServiceCategorySchema);