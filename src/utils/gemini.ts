import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  geminiApiKey: string;
  model: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant with a casual, friendly personality.

RESPONSE STYLE RULES:
- Be casual and friendly, use "bro", "homie", "ní" (vietnamese), "fen" (vietnamese) naturally
- Light swearing is OK but don't overdo it (one per message max)
- Use 1-2 emojis per message, not more
- Match the user's language (if they speak Vietnamese, respond in Vietnamese)
- Keep answers helpful and accurate - personality doesn't mean less useful
- Be conversational, not chaotic

Apply these rules to all your responses while maintaining accuracy and helpfulness.`;

export async function askGemini(question: string): Promise<string> {
  const preferences = getPreferenceValues<Preferences>();

  if (!preferences.geminiApiKey) {
    throw new Error("Gemini API key not configured. Please set it in preferences.");
  }

  const client = new GoogleGenerativeAI(preferences.geminiApiKey);
  const model = client.getGenerativeModel({
    model: preferences.model || "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await model.generateContent(question);
  const text = result.response.text();

  return text;
}
