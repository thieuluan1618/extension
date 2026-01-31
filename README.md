# Ask Pepe - Raycast AI Extension

A Raycast extension that lets you ask questions to Pepe AI (powered by Google Gemini) directly from Raycast with real-time web search capabilities.

## Features

- 🐸 Casual, friendly AI assistant with personality
- 🔍 Built-in Google Search grounding for real-time info
- 🇻🇳 Vietnamese language support
- ⚡ Native Raycast input for quick queries

## Installation

1. Clone or download this extension
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to load the extension in Raycast

## Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Open Raycast and type "Ask Pepe"
3. Enter your API key when prompted
4. (Optional) Change the model in extension preferences

## Usage

1. Open Raycast
2. Type "Ask Pepe"
3. Enter your question in the native input field
4. Press Enter to get the response
5. Copy the response or press "Ask Another Question"

## Available Models

- `gemini-2.0-flash` (default, fastest with web search)
- `gemini-1.5-pro` (most capable)
- `gemini-1.5-flash` (balanced)

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
