import mongoose from "mongoose";
import Service from '../model/Services.js';
import ServiceCategory from '../model/ServiceCategory.js';

// @desc    Get all services or filter by category slug
// @route   GET /api/services?categorySlug=web-development
// Get all services (optionally filter by category)
export const getServices = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      // Ensure it's a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(req.query.category)) {
        filter.category = new mongoose.Types.ObjectId(req.query.category);
      } else {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    const services = await Service.find(filter).populate('category');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 

// @desc    Get a single service by ID or slug
// @route   GET /api/services/:id
export const getServiceById = async (req, res) => {
  try {
    let service = null;

    // If param is a valid ObjectId → search by _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      service = await Service.findById(req.params.id)
        .populate('category', 'title slug image description');
    }

    // If not found by _id, try by slug (id field in Service model)
    if (!service) {
      service = await Service.findOne({ id: req.params.id })
        .populate('category', 'title slug image description');
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new service
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message });
  }
};
