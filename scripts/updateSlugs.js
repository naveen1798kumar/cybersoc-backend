import mongoose from 'mongoose';
import slugify from 'slugify';
import dotenv from 'dotenv';
import ServiceCategory from '../model/ServiceCategory.js'; // adjust path if needed

dotenv.config(); // Load MONGO_URI from .env

// Connect to MongoDB and update slugs
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categories = await ServiceCategory.find();

    for (const category of categories) {
      let updated = false;

      // Add slug if missing or regenerate if title changed
      if (!category.slug) {
        category.slug = slugify(category.title, { lower: true, strict: true });
        updated = true;
      }

      // Remove old 'id' field if it exists
      if ('id' in category.toObject()) {
        category.set('id', undefined); // unset the field properly
        updated = true;
      }

      if (updated) {
        await category.save();
        console.log(`✅ Updated: ${category.title} -> ${category.slug}`);
      } else {
        console.log(`✔ Already OK: ${category.title}`);
      }
    }

    console.log('✅ All categories updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating categories:', err);
    process.exit(1);
  }
};

start();
