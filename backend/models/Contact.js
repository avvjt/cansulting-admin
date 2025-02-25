import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organisation: { type: String, required: true },
  serviceType: { type: String, required: true },
  elaboration: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
