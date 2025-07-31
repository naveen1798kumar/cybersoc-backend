// models/Service.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const SectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String, // ✅ New field
}, { _id: false });

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
  image: String, // ✅ New field
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  id: { type: String, unique: true }, // e.g. "static-website"
  title: { type: String, required: true },
  description: String,
  image: String,
  bannerImage: String,        // ✅ New: Banner image (main heading banner)
  serviceImage: String,
  serviceImageFAQ: String,
  sections: [SectionSchema],
  benefits: [String],
  features: [FeatureSchema],
  faqs: [FAQSchema],
}, { timestamps: true });

ServiceSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Service', ServiceSchema);
