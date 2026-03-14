# AGENTS.md - Ask Pepe Raycast Extension

## Quick Commands
- **Build**: `pnpm build` (compiles TypeScript, bundles extension)
- **Dev**: ``pnpm dev`` (hot-reload during development)
- **Lint**: `pnpm lint` (ESLint check, no autofix)
- **Lint Fix**: `pnpm lint --fix` (autofix ESLint issues)

## Architecture
**Single Command Extension**: `src/pepe.tsx` - main entry point
- **UI**: Native Raycast argument input, displays response in Detail view
- **API Layer**: `src/utils/gemini.ts` - wraps Vertex AI SDK (`@google-cloud/vertexai`) with streaming support
- **TTS**: `src/utils/elevenlabs.ts` - ElevenLabs streaming TTS via mpv
- **Config**: Preferences in package.json (gcpProjectId, gcpLocation, model)
- **Credentials**: Service account JSON at `assets/vertex-ai-client.json` (gitignored)
- **Assets**: `assets/pepe-icon.png` - command icon

## Features
- Streaming responses via `generateContentStream()` for real-time text rendering
- Current date/time awareness in system prompt
- Casual/friendly personality with Vietnamese support
- Multi-turn conversation with Vertex AI chat history
- ElevenLabs TTS with streaming playback via mpv
- Default model: `gemini-2.5-flash-lite` (fastest, sufficient accuracy)
  
## Code Style
- **Language**: TypeScript strict mode (React + Raycast components)
- **Imports**: ES modules only (`"type": "module"`)
- **Naming**: camelCase for functions, PascalCase for React components
- **Styling**: Casual/friendly tone with emojis in AI responses (1-2 max)
- **Error Handling**: Use `showToast()` for user feedback, throw descriptive errors
- **Components**: Prefer Raycast Detail for response display
