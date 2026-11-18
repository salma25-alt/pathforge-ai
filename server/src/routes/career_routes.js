import { Router } from "express";
import {
  discoverGoalsController,
  generateRoadmapController
} from "../controllers/career_controller.js";

const router = Router();

router.post("/discover-goals", discoverGoalsController);
router.post("/generate-roadmap", generateRoadmapController);

export default router;