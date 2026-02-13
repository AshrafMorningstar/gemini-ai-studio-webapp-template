
import { GoogleGenAI } from "@google/genai";

export class CareerAdvisorService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async refineUserStory(story: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Refine the following user story to meet professional Product Owner standards. Include Acceptance Criteria. Story: "${story}"`,
    });
    return response.text || "Failed to refine story.";
  }

  async translateSupportToProduct(achievement: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate this Technical Support achievement into a Business Analyst or Product Owner bullet point for a resume. Emphasize impact and strategy. Achievement: "${achievement}"`,
    });
    return response.text || "Failed to translate achievement.";
  }

  async searchPersonContext(name: string = "Ashraf Morningstar"): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Search for information regarding ${name}'s professional background on LinkedIn and GitHub. Focus on how a tech support professional with this name could pivot to BA/PO roles.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || "No specific background info found.";
  }
}
