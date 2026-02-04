import { GoogleGenAI } from "@google/genai";

// Vercel-style serverless function (Node runtime).
// Expects a JSON body: { messages: ChatMessage[] }
// Uses server-side env var GEMINI_API_KEY (never exposed to the client).
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: GEMINI_API_KEY is missing" });
    return;
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Invalid payload: messages[] required" });
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const currentParts: any[] = [{ text: lastMessage.text }];
    if (lastMessage.image) {
      currentParts.push({
        inlineData: {
          data: lastMessage.image.data,
          mimeType: lastMessage.image.mimeType,
        },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: currentParts }],
      config: {
        systemInstruction: `You are the AI assistant for 'STUDIO.', a world-class graphic design agency.\n
        Your tone is sophisticated, minimalist, and deeply creative.\n
        STRICT RULES:\n
        1. You ONLY answer questions related to graphic design, branding, typography, UI/UX, visual arts, or the studio's portfolio.\n
        2. BREVITY IS KEY: Answer in short, punchy forms. Avoid long-winded descriptions or fluff. Get straight to the point.\n
        3. If a user asks anything unrelated to design, politely decline in a single short sentence.\n
        4. When an image is provided, offer a 1-2 sentence critique maximum.\n
        5. Use bullet points if listing more than two items, but keep each point under 10 words.`,
      },
    });

    res.status(200).json({ text: response.text || "Analyzed. Minimalist execution. Strong hierarchy." });
  } catch (error: any) {
    console.error("Gemini API Error (server):", error?.message || error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}