// processRoutes.js
import express from "express";
import Process from "../models/Process.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const processes = await Process.find().sort({ id: 1 });
        res.json(processes);
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { phase, name, review, src } = req.body;

        if (!phase || !name) {
            return res.status(400).json({ 
                success: false, 
                message: "Phase and Name are required fields" 
            });
        }

        const lastProcess = await Process.findOne().sort({ id: -1 });
        const newId = lastProcess ? lastProcess.id + 1 : 1;

        const newProcess = new Process({
            id: newId,
            phase: phase.trim(),
            name: name.trim(),
            src: src || `/images/phase${newId}.png`,
            review: review?.trim() || "",
            button: "read",
        });

        const savedProcess = await newProcess.save();
        res.status(201).json(savedProcess);
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { phase, name, review, src } = req.body;
        const processId = parseInt(req.params.id);

        const updatedProcess = await Process.findOneAndUpdate(
            { id: processId },
            {
                phase: phase?.trim(),
                name: name?.trim(),
                src: src,
                review: review?.trim(),
            },
            { new: true, runValidators: true }
        );

        if (!updatedProcess) {
            return res.status(404).json({ 
                success: false, 
                message: "Process item not found" 
            });
        }

        res.json(updatedProcess);
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const processId = parseInt(req.params.id);
        const deletedProcess = await Process.findOneAndDelete({ id: processId });

        if (!deletedProcess) {
            return res.status(404).json({ 
                success: false, 
                message: "Process item not found" 
            });
        }

        res.json(deletedProcess);
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
});

export default router;