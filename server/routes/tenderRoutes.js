import express from "express";
import Tender from "../models/Tender.js";
import { generateSummary } from "../services/llm.js";

const router = express.Router();

// Fetch all tenders
router.get("/", async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Generate summary for a tender
router.post("/:id/summary", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ error: "Tender not found" });

    const summary = await generateSummary(tender.description);
    tender.summary = summary;
    await tender.save();

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
