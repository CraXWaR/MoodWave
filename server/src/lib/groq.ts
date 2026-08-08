import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.AI_API_KEY,
});
