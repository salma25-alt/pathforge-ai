import { Type } from "@google/genai";

export const careerDiscoverySchema = {
  type: Type.OBJECT,
  properties: {
    analysisSummary: {
      type: Type.STRING,
      description: "Brief encouraging summary of the user's profile and stream situation."
    },
    recommendations: {
      type: Type.ARRAY,
      description: "3 distinct, realistic career options tailored to age, stream, and interests.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          fitType: {
            type: Type.STRING,
            enum: ["Direct Fit", "Bridge Pathway", "Adjacent Pivot"]
          },
          matchScore: { type: Type.INTEGER },
          tagline: { type: Type.STRING },
          streamRealityNote: { type: Type.STRING }
        },
        required: ["title", "fitType", "matchScore", "tagline", "streamRealityNote"]
      }
    }
  },
  required: ["analysisSummary", "recommendations"]
};

export const roadmapSchema = {
  type: Type.OBJECT,
  properties: {
    careerTitle: { type: Type.STRING },
    estimatedTimeline: { type: Type.STRING },
    streamStrategy: { type: Type.STRING },
    pillars: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          category: {
            type: Type.STRING,
            enum: ["Core Skill", "Soft Skill"]
          },
          duration: { type: Type.STRING },
          overview: { type: Type.STRING },
          subtopics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                whatToLearn: { type: Type.STRING },
                practicalMilestone: { type: Type.STRING }
              },
              required: ["name", "whatToLearn", "practicalMilestone"]
            }
          }
        },
        required: ["id", "title", "category", "duration", "overview", "subtopics"]
      }
    }
  },
  required: ["careerTitle", "estimatedTimeline", "streamStrategy", "pillars"]
};