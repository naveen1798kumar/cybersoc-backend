// models/Service.js
import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { _id: false });

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  id: { type: String, required: true }, // e.g. "static-website"
  title: { type: String, required: true },
  description: String,
  image: String,
  serviceImage: String,        // optional
  serviceImageFAQ: String,     // optional
  sections: [SectionSchema],   // array of { title, content }
  benefits: [String],          // array of strings
  features: [FeatureSchema],   // array of { title, description }
  faqs: [FAQSchema],           // array of { question, answer }
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);