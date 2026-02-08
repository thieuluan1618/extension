# AGENTS.md - Ask Pepe Raycast Extension

## Quick Commands
- **Build**: `pnpm build` (compiles TypeScript, bundles extension)
- **Dev**: ``pnpm dev`` (hot-reload during development)
- **Lint**: `pnpm lint` (ESLint check, no autofix)
- **Lint Fix**: `pnpm lint --fix` (autofix ESLint issues)

## Architecture
**Single Command Extension**: `src/pepe.tsx` - main entry point
- **UI**: Native Raycast argument input, displays response in Detail view
- **API Layer**: `src/utils/gemini.ts` - wraps Google Generative AI SDK with system prompt + Google Search grounding
- **Config**: Preferences in package.json (geminiApiKey, model selection)
- **Assets**: `assets/pepe-icon.png` - command icon

## Features
- Google Search grounding for real-time web info
- Current date/time awareness in system prompt
- Casual/friendly personality with Vietnamese support
- Multi-turn conversation with Gemini chat history API
- ElevenLabs TTS with streaming playback via mpv
  
## Code Style
- **Language**: TypeScript strict mode (React + Raycast components)
- **Imports**: ES modules only (`"type": "module"`)
- **Naming**: camelCase for functions, PascalCase for React components
- **Styling**: Casual/friendly tone with emojis in AI responses (1-2 max)
- **Error Handling**: Use `showToast()` for user feedback, throw descriptive errors
- **Components**: Prefer Raycast Detail for response display
