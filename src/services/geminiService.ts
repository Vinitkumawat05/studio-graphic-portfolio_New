
import { MessageRole, ChatMessage } from "../types";

export const getDesignCritique = async (messages: ChatMessage[]) => {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      console.error("Gemini server error status:", response.status);
      return "Connection interrupted. Re-evaluating design nodes.";
    }

    const data = await response.json();
    return data.text || "Analyzed. Minimalist execution. Strong hierarchy.";
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return "Connection interrupted. Re-evaluating design nodes.";
  }
};
