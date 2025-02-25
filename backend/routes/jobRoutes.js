import express from "express";
import Job from "../models/Job.js";
import mongoose from "mongoose";
const router = express.Router();

// POST: Add a new job
router.post("/", async (req, res) => {
  try {
    const { position, description, requirements } = req.body;

    if (!position || !description || !requirements) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = new Job({ position, description, requirements });
    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Fetch latest jobs first
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
