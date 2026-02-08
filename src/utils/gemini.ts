import { GoogleGenerativeAI, Content } from "@google/generative-ai";
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

  return `You are a casual, concise AI assistant.

CURRENT DATE/TIME: ${dateStr}, ${timeStr}
USER LOCATION: Ho Chi Minh City, Vietnam

RESPONSE RULES:
- Keep answers SHORT (1-3 sentences max)
- Use casual language: "bro", "ní" (vietnamese), "fen" (vietnamese)
- 1 emoji max per response
- Match user's language (Vietnamese if asked in Vietnamese)
- Skip fluff, get straight to the answer

When you have web search results, use them and cite sources briefly.`;
}

export async function askGemini(question: string, history: Content[] = []): Promise<string> {
  const preferences = getPreferenceValues<Preferences>();

  if (!preferences.geminiApiKey) {
    throw new Error("Gemini API key not configured. Please set it in preferences.");
  }

  const client = new GoogleGenerativeAI(preferences.geminiApiKey);
  
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

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(question);
  const text = result.response.text();

  return text;
}
