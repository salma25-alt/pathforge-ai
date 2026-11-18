import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const GEMINI_MODEL = "gemini-3.5-flash-lite";