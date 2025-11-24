import { GoogleGenAI, Type } from "@google/genai";
import { CorrectionType, CorrectionResponse } from '../types';

const getSystemInstruction = (type: CorrectionType): string => {
  if (type === CorrectionType.ADVANCED) {
    return `You are an expert editor and writing coach. 
    Your task is to significantly improve the user's text.
    Focus on:
    1. Correcting all grammar and spelling errors.
    2. Enhancing flow, tone, and vocabulary for a professional standard.
    3. Improving clarity and conciseness.
    
    Return the result in JSON format with the corrected text and a brief explanation of the major stylistic improvements made.`;
  }
  
  return `You are a strict grammar corrector.
  Your task is to fix grammar, spelling, and punctuation errors ONLY.
  Do not change the style or tone. Keep the original meaning exactly as is.
  
  Return the result in JSON format with the corrected text.`;
};

export const correctText = async (
  text: string, 
  type: CorrectionType
): Promise<CorrectionResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using gemini-2.5-flash-lite as requested for low latency
  const modelName = 'gemini-2.5-flash-lite';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: text,
      config: {
        systemInstruction: getSystemInstruction(type),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctedText: {
              type: Type.STRING,
              description: "The fully corrected version of the input text."
            },
            explanation: {
              type: Type.STRING,
              description: "A brief explanation of changes (mainly for advanced mode).",
              nullable: true
            }
          },
          required: ["correctedText"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(responseText) as CorrectionResponse;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process text. Please try again.");
  }
};