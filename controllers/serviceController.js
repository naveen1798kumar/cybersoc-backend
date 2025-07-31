import mongoose from "mongoose";
import Service from '../model/Services.js';

// Get all services (optionally filter by category)
export const getServices = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const services = await Service.find(filter).populate('category');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID or slug
export const getServiceById = async (req, res) => {
  try {
    let service = null;
    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      service = await Service.findById(req.params.id).populate('category');
    }
    // If not found by ID, try by slug
    if (!service) {
      service = await Service.findOne({ id: req.params.id }).populate('category');
    }
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};