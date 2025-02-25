import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    organisation: { type: String, required: true }, // Represents the city
    phone: { type: String, required: true }, // Was previously "serviceType"
    about: { type: String, required: true }, // Was previously "email" (incorrectly mapped)
    reasonForJoining: { type: String, required: true }, // Was previously "elaboration"
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", CareerSchema);

export default Career;
