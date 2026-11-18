// backend/src/app.js
import express from "express";
import cors from "cors";
import careerRoutes from "./routes/career_routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", careerRoutes);

// Centralized Error Middleware
app.use((err, req, res, next) => {
  console.error("[Server Error]:", err);
  res.status(500).json({ error: "Internal server error while processing AI request." });
});

export default app;