// routes/categoryRoutes.js
import express from 'express';
import ServiceCategory from '../model/ServiceCategory.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await ServiceCategory.find();
  res.json(categories); // <-- This returns an array!
});

router.post('/', async (req, res) => {
  const category = new ServiceCategory(req.body);
  await category.save();
  res.status(201).json(category);
});

export default router;