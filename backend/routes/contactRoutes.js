import express from "express";
import Contact from "../models/Contact.js"; // Ensure ES Module import

const router = express.Router();

// @route   POST /api/contact/submit
// @desc    Save contact form submission
router.post("/submit", async (req, res) => {
  try {
    const { name, organisation, serviceType, elaboration, phone, email } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const newContact = new Contact({ name, organisation, serviceType, elaboration, phone, email });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully", data: newContact });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route   GET /api/contact/all
// @desc    Get all contact form submissions
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router; // Ensure ES Module export
