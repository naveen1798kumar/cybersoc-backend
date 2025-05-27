// routes/serviceRoutes.js
import express from 'express';
import Service from '../model/Services.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const services = await Service.find(filter).populate('category');
  res.json(services);
});

router.get('/:id', async (req, res) => {
  const service = await Service.findById(req.params.id).populate('category');
  res.json(service);
});

router.post('/', async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
});

router.put('/:id', async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;