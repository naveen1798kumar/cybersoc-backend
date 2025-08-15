import express from 'express';
import ServiceCategory from '../model/ServiceCategory.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  const categories = await ServiceCategory.find();
  res.json(categories);
});

// Create category
router.post('/', async (req, res) => {
  const category = new ServiceCategory(req.body);
  await category.save();
  res.status(201).json(category);
});

// Update category by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await ServiceCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await ServiceCategory.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
