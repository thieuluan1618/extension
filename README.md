# Ask Pepe - Raycast AI Extension

A Raycast extension that lets you ask questions to Pepe AI (powered by Google Gemini via Vertex AI) with streaming responses and ElevenLabs text-to-speech.

## Features

- 🐸 Casual, friendly AI assistant with personality
- ⚡ Streaming responses (real-time text rendering)
- 💬 Multi-turn conversation with chat history
- 🔊 Text-to-speech via ElevenLabs (streaming playback with mpv)
- 🇻🇳 Vietnamese language support

## Installation

1. Clone or download this extension
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to load the extension in Raycast

### Requirements

- [mpv](https://mpv.io/) - Required for streaming TTS playback (`brew install mpv`)
- A GCP service account JSON key with Vertex AI access

## Setup

1. Create a GCP service account with the **Vertex AI User** role
2. Download the JSON key and place it at `assets/vertex-ai-client.json`
3. (Optional) Get your ElevenLabs API key from [ElevenLabs](https://elevenlabs.io/)
4. Open Raycast and type "Ask Pepe"
5. (Optional) Change the model, region, or voice ID in extension preferences

## Usage

1. Open Raycast
2. Type "Ask Pepe"
3. Enter your question
4. Press Enter to get the response

### Actions

- **Ask Follow-up** (`⌘↩`) - Continue the conversation
- **Speak Response** (`⌘S`) - Read the last response aloud via ElevenLabs
- **Copy Last Response** (`⌘C`) - Copy response to clipboard
- **New Conversation** (`⌘N`) - Start fresh

## Preferences

| Preference | Description | Required |
|---|---|---|
| GCP Project ID | Google Cloud project ID (auto-detected from credentials if not set) | No |
| GCP Location | Vertex AI region (default: `us-central1`) | No |
| Model | Vertex AI model (default: `gemini-2.5-flash-lite`) | No |
| ElevenLabs API Key | ElevenLabs API key for TTS | No |
| ElevenLabs Voice ID | Voice to use (default: George) | No |

## Build

```bash
pnpm build
```

## Development

```bash
pnpm dev
```

## Lint

```bash
pnpm lint
```
