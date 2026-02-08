import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { getPreferenceValues } from "@raycast/api";
import { spawn, ChildProcess } from "child_process";
import { Readable } from "stream";

interface Preferences {
  elevenLabsApiKey: string;
  elevenLabsVoiceId: string;
}

let currentProcess: ChildProcess | null = null;

export function stopSpeaking(): void {
  if (currentProcess) {
    currentProcess.kill();
    currentProcess = null;
  }
}

export async function speakText(text: string): Promise<void> {
  const preferences = getPreferenceValues<Preferences>();

  if (!preferences.elevenLabsApiKey) {
    throw new Error("ElevenLabs API key not configured. Please set it in preferences.");
  }

  const client = new ElevenLabsClient({
    apiKey: preferences.elevenLabsApiKey,
  });

  const voiceId = preferences.elevenLabsVoiceId || "JBFqnCBsd6RMkjVDRZzb";

  const audioStream = await client.textToSpeech.stream(voiceId, {
    text,
    modelId: "eleven_v3",
    outputFormat: "mp3_44100_128",
  });

  const reader = audioStream.getReader();
  const nodeStream = new Readable({
    async read() {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      } catch (err) {
        this.destroy(err as Error);
      }
    },
  });

  stopSpeaking();

  return new Promise((resolve, reject) => {
    const mpv = spawn("/opt/homebrew/bin/mpv", [
      "--no-video",
      "--no-terminal",
      "-",
    ], { stdio: ["pipe", "ignore", "ignore"] });

    currentProcess = mpv;
    nodeStream.pipe(mpv.stdin);

    mpv.on("close", (code) => {
      currentProcess = null;
      if (code && code !== 0) {
        reject(new Error(`mpv exited with code ${code}`));
      } else {
        resolve();
      }
    });

    mpv.on("error", (err) => {
      currentProcess = null;
      reject(err);
    });

    nodeStream.on("error", (err) => {
      mpv.kill();
      reject(err);
    });
  });
}
