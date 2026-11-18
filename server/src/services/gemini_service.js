import { ai, GEMINI_MODEL } from "../config/gemini.js";
import { careerDiscoverySchema, roadmapSchema } from "../schemas/career_schemas.js";

export async function generateCareerMatches({ age, stream, hasInterest, interestText, quizAnswers }) {
  const interestContext = hasInterest
    ? `User's stated interest/goal: "${interestText}"`
    : `User does not know their interest yet. Scenario quiz answers: ${JSON.stringify(quizAnswers)}`;

  const prompt = `
    You are an expert Indian career counselor and industry mentor.
    Analyze this student's profile:
    - Age: ${age}
    - Current Education Stream: ${stream}
    - ${interestContext}

    Strict Rules:
    1. Enforce Indian academic and licensing rules (e.g., MBBS/BDS requires 12th PCB + NEET; CA allows any stream; Software Development allows non-CS streams via BCA, BSc IT, or strong portfolios).
    2. If their stream blocks their stated dream (e.g., Arts/Commerce wanting to be a Surgeon), NEVER give false hope. Provide an "Adjacent Pivot" that captures what they like legally, plus realistic "Bridge Pathway" options.
    3. Return exactly 3 distinct career options.
  `;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: careerDiscoverySchema,
      temperature: 0.4
    }
  });

  return JSON.parse(response.text);
}

export async function generateCareerRoadmap({ age, stream, acceptedGoal }) {
  const prompt = `
    Create a comprehensive, structured learning and career roadmap for:
    - Target Career: ${acceptedGoal.title} (${acceptedGoal.fitType})
    - Student Age: ${age}
    - Current Stream: ${stream}
    - Stream Context: ${acceptedGoal.streamRealityNote}

    Strict Rules:
    1. Break the roadmap into 5 to 7 "Big Pillars" (e.g., Programming Foundations, Frontend, Backend, Databases, Communication & Stakeholder Explaining, Team Collaboration).
    2. Include at least 2 dedicated "Soft Skill" pillars tailored specifically to what this role demands.
    3. Each Big Pillar must contain 3 to 5 granular "subtopics" with concrete tools/concepts and a practical milestone.
  `;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: roadmapSchema,
      temperature: 0.3
    }
  });

  return JSON.parse(response.text);
}