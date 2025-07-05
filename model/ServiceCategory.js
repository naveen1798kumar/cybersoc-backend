import mongoose from 'mongoose';
import slugify from 'slugify';

const ServiceCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, unique: true }, // slug
  description: String,
  image: String,
}, { timestamps: true });

ServiceCategorySchema.pre('save', function (next) {
  if (!this.id) {
    this.id = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('ServiceCategory', ServiceCategorySchema);
