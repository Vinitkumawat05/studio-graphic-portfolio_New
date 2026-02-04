
import { GoogleGenAI } from "@google/genai";
import { MessageRole, ChatMessage } from "../types";

// Initialize with API key from environment variables
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const getDesignCritique = async (messages: ChatMessage[]) => {
  try {
    const lastMessage = messages[messages.length - 1];
    
    // Prepare history for context
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === MessageRole.USER ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Current message parts
    const currentParts: any[] = [{ text: lastMessage.text }];
    
    if (lastMessage.image) {
      currentParts.push({
        inlineData: {
          data: lastMessage.image.data,
          mimeType: lastMessage.image.mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: currentParts }
      ],
      config: {
        systemInstruction: `You are the AI assistant for 'STUDIO.', a world-class graphic design agency. 
        Your tone is sophisticated, minimalist, and deeply creative. 
        
        STRICT RULES:
        1. You ONLY answer questions related to graphic design, branding, typography, UI/UX, visual arts, or the studio's portfolio.
        2. BREVITY IS KEY: Answer in short, punchy forms. Avoid long-winded descriptions or fluff. Get straight to the point.
        3. If a user asks anything unrelated to design, politely decline in a single short sentence.
        4. When an image is provided, offer a 1-2 sentence critique maximum.
        5. Use bullet points if listing more than two items, but keep each point under 10 words.`,
      },
    });

    return response.text || "Analyzed. Minimalist execution. Strong hierarchy.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("API Key present:", !!import.meta.env.VITE_GEMINI_API_KEY);
    console.error("API Key value:", import.meta.env.VITE_GEMINI_API_KEY);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    return "Connection interrupted. Re-evaluating design nodes.";
  }
};
