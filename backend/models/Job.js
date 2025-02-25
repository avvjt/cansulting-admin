import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
