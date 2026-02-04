import { GoogleGenAI } from "@google/genai";

// Netlify serverless function for Gemini
// Expects POST body: { messages: ChatMessage[] }
// Uses server-side env var GEMINI_API_KEY
export async function handler(event: any) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfigured: GEMINI_API_KEY missing" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { messages } = body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid payload: messages[] required" }),
      };
    }

    const lastMessage = messages[messages.length - 1];
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
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

    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.text || "Analyzed. Minimalist execution. Strong hierarchy." }),
    };
  } catch (error: any) {
    console.error("Gemini API Error (netlify):", error?.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate content" }),
    };
  }
}export default async (req: Request) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not found" }),
        { status: 500 }
      );
    }

    const body = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: body.prompt || "Hello" }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
};
