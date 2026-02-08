# Ask Pepe - Raycast AI Extension

A Raycast extension that lets you ask questions to Pepe AI (powered by Google Gemini) directly from Raycast with real-time web search capabilities and ElevenLabs text-to-speech.

## Features

- 🐸 Casual, friendly AI assistant with personality
- 🔍 Built-in Google Search grounding for real-time info
- 💬 Multi-turn conversation with proper chat history
- 🔊 Text-to-speech via ElevenLabs (streaming playback with mpv)
- 🇻🇳 Vietnamese language support

## Installation

1. Clone or download this extension
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to load the extension in Raycast

### Requirements

- [mpv](https://mpv.io/) - Required for streaming TTS playback (`brew install mpv`)

## Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. (Optional) Get your ElevenLabs API key from [ElevenLabs](https://elevenlabs.io/)
3. Open Raycast and type "Ask Pepe"
4. Enter your API keys when prompted
5. (Optional) Change the model or voice ID in extension preferences

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
| Gemini API Key | Google Gemini API key | Yes |
| Model | Gemini model (default: `gemini-2.0-flash`) | No |
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
