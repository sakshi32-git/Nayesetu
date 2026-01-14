
import { GoogleGenAI, Type } from "@google/genai";
import { FIRData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const digitizeFIR = async (base64Image: string): Promise<FIRData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              text: "Act as a legal expert and OCR specialist. Analyze this handwritten FIR (First Information Report) image. Extract all relevant details and map them to the corresponding IPC (Indian Penal Code) sections based on the incident described. Return the result in a clean JSON format.",
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            firNumber: { type: Type.STRING },
            date: { type: Type.STRING },
            complainantName: { type: Type.STRING },
            accusedName: { type: Type.STRING },
            incidentLocation: { type: Type.STRING },
            description: { type: Type.STRING },
            ipcSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["section", "description"],
              },
            },
          },
          required: ["firNumber", "description", "ipcSections"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as FIRData;
  } catch (error) {
    console.error("Error digitizing FIR:", error);
    return null;
  }
};

export const getLegalAdvice = async (history: { role: string; content: string }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are NyaySetu AI, a specialized legal advisor for Indian citizens. Your goal is to provide accurate, easy-to-understand legal information regarding Indian laws, IPC, CrPC, and basic citizen rights. Always advise users to consult with a professional lawyer for critical legal decisions. Be empathetic, objective, and clear.",
      },
    });

    // Note: In real-world, we'd map history correctly. For simplicity here:
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error getting legal advice:", error);
    return "I'm sorry, I encountered an error processing your legal query. Please try again.";
  }
};
