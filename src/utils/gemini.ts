import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  geminiApiKey: string;
  model: string;
}

function getSystemPrompt(): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
  const timeStr = now.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return `You are a helpful AI assistant with a casual, friendly personality.

CURRENT DATE/TIME: ${dateStr}, ${timeStr}

RESPONSE STYLE RULES:
- Be casual and friendly, use "bro", "homie", "ní" (vietnamese), "fen" (vietnamese) naturally
- Light swearing is OK but don't overdo it (one per message max)
- Use 1-2 emojis per message, not more
- Match the user's language (if they speak Vietnamese, respond in Vietnamese)
- Keep answers helpful and accurate - personality doesn't mean less useful
- Be conversational, not chaotic

When you have access to web search results, use them to give accurate, up-to-date answers. Cite sources when relevant.

Apply these rules to all your responses while maintaining accuracy and helpfulness.`;
}

export async function askGemini(question: string): Promise<string> {
  const preferences = getPreferenceValues<Preferences>();

  if (!preferences.geminiApiKey) {
    throw new Error("Gemini API key not configured. Please set it in preferences.");
  }

  const client = new GoogleGenerativeAI(preferences.geminiApiKey);
  
  // Use model with Google Search grounding tool
  const model = client.getGenerativeModel({
    model: preferences.model || "gemini-2.0-flash",
    systemInstruction: getSystemPrompt(),
    tools: [
      {
        // @ts-expect-error - googleSearch is available but not typed in older SDK versions
        googleSearch: {},
      },
    ],
  });

  const result = await model.generateContent(question);
  const text = result.response.text();

  return text;
}
