import { VertexAI, Content } from "@google-cloud/vertexai";
import { environment, getPreferenceValues } from "@raycast/api";

interface Preferences {
  gcpProjectId: string;
  gcpLocation?: string;
  model: string;
}

interface ContentPart {
  text: string;
}

export interface VertexMessage {
  role: "user" | "model";
  parts: ContentPart[];
}

function getSystemPrompt(): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `You are a casual, concise AI assistant.

CURRENT DATE/TIME: ${dateStr}, ${timeStr}
USER LOCATION: Ho Chi Minh City, Vietnam

RESPONSE RULES:
- Keep answers SHORT (1-3 sentences max)
- Use casual language: "bro", "ní" (vietnamese), "fen" (vietnamese)
- 1 emoji max per response
- Match user's language (Vietnamese if asked in Vietnamese)
- Skip fluff, get straight to the answer`;
}

function loadCredentials(): { projectId: string; credPath: string } | null {
  const fs = require("fs");
  const path = require("path");

  const candidates = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.join(environment.assetsPath, "vertex-ai-client.json"),
    path.join(
      process.env.HOME || "",
      ".config",
      "gcloud",
      "vertex-ai-client.json",
    ),
  ].filter(Boolean) as string[];

  for (const credPath of candidates) {
    try {
      if (fs.existsSync(credPath)) {
        const cred = JSON.parse(fs.readFileSync(credPath, "utf-8"));
        console.log(`[Vertex AI] Loaded credentials from: ${credPath}`);
        return { projectId: cred.project_id, credPath };
      }
    } catch (err) {
      console.error(`[Vertex AI] Failed to read ${credPath}:`, err);
    }
  }
  return null;
}

function getVertexModel() {
  const preferences = getPreferenceValues<Preferences>();
  let gcpProjectId = preferences.gcpProjectId;

  const creds = loadCredentials();
  if (creds) {
    if (!gcpProjectId) {
      gcpProjectId = creds.projectId;
    }
    process.env.GOOGLE_APPLICATION_CREDENTIALS = creds.credPath;
  }

  const location = preferences.gcpLocation || "us-central1";
  const model = preferences.model || "gemini-2.5-flash-lite";

  if (!gcpProjectId) {
    throw new Error(
      "GCP Project ID not found. Place vertex-ai-client.json in assets/ or configure in Raycast preferences.",
    );
  }

  const vertexAI = new VertexAI({ project: gcpProjectId, location });
  return vertexAI.getGenerativeModel({ model });
}

function buildContents(question: string, history: VertexMessage[]): Content[] {
  return [
    ...history.map((msg) => ({
      role: msg.role,
      parts: msg.parts,
    })),
    { role: "user", parts: [{ text: question }] },
  ];
}

export async function streamGemini(
  question: string,
  history: VertexMessage[] = [],
  onChunk: (text: string) => void,
): Promise<string> {
  const generativeModel = getVertexModel();
  const contents = buildContents(question, history);

  try {
    const response = await generativeModel.generateContentStream({
      contents,
      systemInstruction: {
        role: "system",
        parts: [{ text: getSystemPrompt() }],
      },
    });

    let fullText = "";
    for await (const chunk of response.stream) {
      const part = chunk.candidates?.[0]?.content?.parts?.[0];
      if (part && "text" in part) {
        fullText += part.text;
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error) {
    console.error("[Vertex AI] Stream Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Vertex AI API error: ${errorMessage}`);
  }
}

export async function askGemini(
  question: string,
  history: VertexMessage[] = [],
): Promise<string> {
  const generativeModel = getVertexModel();
  const contents = buildContents(question, history);

  try {
    const response = await generativeModel.generateContent({
      contents,
      systemInstruction: {
        role: "system",
        parts: [{ text: getSystemPrompt() }],
      },
    });

    const result = response.response;
    const textContent = result.candidates?.[0]?.content?.parts?.[0];
    if (!textContent || !("text" in textContent)) {
      throw new Error("No text response received from Vertex AI");
    }

    return textContent.text as string;
  } catch (error) {
    console.error("[Vertex AI] Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Vertex AI API error: ${errorMessage}`);
  }
}
