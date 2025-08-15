// models/Service.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const SectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String, 
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
  id: { type: String, unique: true }, // slug from title
  title: { type: String, required: true },
  summary: String, // ✅ short intro under title
  description: String,
  image: String, // optional thumbnail
  bannerImage: String, // ✅ hero section background image

  benefits: [String], // ✅ key benefits list
  benefitsImage: String, // ✅ image for benefits section

  sections: [SectionSchema], // ✅ multiple content sections

  features: [FeatureSchema], // ✅ feature list

  faqImage: String, // ✅ single image for FAQ section
  faqs: [FAQSchema], // ✅ list of FAQ items

  galleryEnabled: { type: Boolean, default: false }, // ✅ toggle for gallery
  gallery: [String], // ✅ multiple images for gallery

  metaTitle: String, // ✅ SEO
  metaDescription: String, // ✅ SEO
  keywords: String, // ✅ SEO
}, { timestamps: true });

ServiceSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Service', ServiceSchema);
