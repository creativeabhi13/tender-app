import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: String,
  closingDate: String,
  department: String,
  summary: String, // LLM-generated summary
});

export default mongoose.model("Tender", tenderSchema);
