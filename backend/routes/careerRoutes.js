import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

// @route   POST /api/career/submit
// @desc    Save career form submission
router.post("/submit", async (req, res) => {
  try {
    const { name, organisation, phone, about, reasonForJoining } = req.body;

    // Validate required fields
    if (!name || !organisation || !phone || !about || !reasonForJoining) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to database
    const newSubmission = new Career({
      name,
      organisation,
      phone,
      about,
      reasonForJoining,
    });

    await newSubmission.save();
    return res.status(201).json({ message: "Form submitted successfully." });
  } catch (error) {
    console.error("Error saving form:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// @route   GET /api/career/all
// @desc    Fetch all submissions
router.get("/all", async (req, res) => {
  try {
    const submissions = await Career.find().sort({ createdAt: -1 });
    return res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;