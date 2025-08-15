import mongoose from 'mongoose';
import slugify from 'slugify';

const ServiceCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // <-- renamed from `id` to `slug`
    description: String,
    image: String,
  },
  { timestamps: true }
);

// Automatically generate slug from title
ServiceCategorySchema.pre('save', function (next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('ServiceCategory', ServiceCategorySchema);
