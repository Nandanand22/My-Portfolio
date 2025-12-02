import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const API_KEY = process.env.API_KEY || '';

export const initializeChat = (): boolean => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing.");
    return false;
  }

  try {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
    chatSession = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    const success = initializeChat();
    if (!success) {
      return "I'm sorry, my AI brain is currently offline (API Key missing). Please contact Nandana directly via email.";
    }
  }

  try {
    // We use the non-streaming method for simplicity in this specific UI implementation,
    // but the streaming method is available if we wanted to upgrade later.
    const response: GenerateContentResponse = await chatSession!.sendMessage({ message });
    return response.text || "I didn't have a response for that.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered a temporary error. Please try again later.";
  }
};