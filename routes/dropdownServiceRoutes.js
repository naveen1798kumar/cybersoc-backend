import express from "express";
import DropdownService from "../model/DropdownService.js";

const router = express.Router();

// Get all dropdown services
router.get("/", async (req, res) => {
  try {
    const services = await DropdownService.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching services" });
  }
});

// Add new dropdown service
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Service name is required" });

    const newService = new DropdownService({ name });
    await newService.save();
    res.json({ success: true, service: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding service" });
  }
});

// Delete dropdown service
router.delete("/:id", async (req, res) => {
  try {
    await DropdownService.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting service" });
  }
});

export default router;
