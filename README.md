# Raycast AI Ask with Google Gemini

A Raycast extension that lets you ask questions to Google's Gemini AI directly from Raycast.

## Installation

1. Clone or download this extension
2. Run `pnpm install` to install dependencies
3. Run `ray develop` to load the extension in Raycast

## Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Open Raycast preferences
3. Find "AI Ask with Gemini" extension
4. Paste your API key in the "Gemini API Key" field
5. (Optional) Change the model in preferences (defaults to `gemini-2.0-flash`)

## Usage

1. Open Raycast (cmd+K by default)
2. Type "Ask AI" to find the command
3. Enter your question
4. Press Enter to get the response
5. Copy the response or ask another question

## Available Models

- `gemini-2.0-flash` (default, fastest)
- `gemini-1.5-pro` (most capable)
- `gemini-1.5-flash` (balanced)

## Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```
