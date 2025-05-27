// models/Service.js
import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const ServiceSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
  id: String, // e.g. "static-website"
  title: String,
  description: String,
  image: String,
  serviceImage: String,
  serviceImageFAQ: String,
  sections: [SectionSchema],
  benefits: [String],
  features: [FeatureSchema],
  faqs: [FAQSchema],
});

export default mongoose.model('Service', ServiceSchema);