  import "dotenv/config";
  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import contactRoutes from "./routes/contactRoutes.js";
  import processRoutes from "./routes/processRoutes.js";
  import jobRoutes from "./routes/jobRoutes.js"; // Import job routes
  import careerRoutes from "./routes/careerRoutes.js"
  const app = express();
  app.use(express.json());
  app.use(cors());

  mongoose
    .connect("mongodb+srv://influidity:uCIOM9kXvLuIXIii@influidity.w8ykh.mongodb.net/?retryWrites=true&w=majority&appName=influidity", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error: ", err));

  app.use("/api/contact", contactRoutes);
  app.use("/api/process", processRoutes);
  app.use("/api/jobs", jobRoutes); 
  app.use("/api/career", careerRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
