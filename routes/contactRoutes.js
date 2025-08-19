import express from "express";
import ContactMessage from "../model/ContactMessage.js";

const router = express.Router();

// Save new message
router.post("/", async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
