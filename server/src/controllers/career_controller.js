import { generateCareerMatches, generateCareerRoadmap } from "../services/gemini_service.js";

export async function discoverGoalsController(req, res, next) {
  try {
    const { age, stream, hasInterest, interestText, quizAnswers } = req.body;

    if (!age || !stream) {
      return res.status(400).json({ error: "Age and stream are required." });
    }

    if (hasInterest && !interestText?.trim()) {
      return res.status(400).json({ error: "Please enter your interest or switch to the discovery quiz." });
    }

    const result = await generateCareerMatches({
      age,
      stream,
      hasInterest,
      interestText,
      quizAnswers
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function generateRoadmapController(req, res, next) {
  try {
    const { age, stream, acceptedGoal } = req.body;

    if (!age || !stream || !acceptedGoal?.title) {
      return res.status(400).json({ error: "Age, stream, and acceptedGoal are required." });
    }

    const roadmap = await generateCareerRoadmap({ age, stream, acceptedGoal });
    return res.status(200).json(roadmap);
  } catch (error) {
    next(error);
  }
}