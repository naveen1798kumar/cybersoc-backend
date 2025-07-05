// routes/categoryRoutes.js
import express from 'express';
import ServiceCategory from '../model/ServiceCategory.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await ServiceCategory.find();
  res.json(categories); // <-- This returns an array!
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const category = new ServiceCategory(req.body);
  await category.save();
  res.status(201).json(category);
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await ServiceCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(204).end(); // 204 = No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;