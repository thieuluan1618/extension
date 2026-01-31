# AGENTS.md - Raycast Gemini Extension

## Quick Commands
- **Build**: `pnpm build` (compiles TypeScript, bundles extension)
- **Dev**: `pnpm dev` (hot-reload during development)
- **Lint**: `pnpm lint` (ESLint check, no autofix)
- **Lint Fix**: `pnpm lint --fix` (autofix ESLint issues)

## Architecture
**Single Command Extension**: `src/gemini.tsx` - main entry point (must match command name in package.json)
- **UI**: Raycast List with SearchBar input, displays response in markdown detail view
- **API Layer**: `src/utils/gemini.ts` - wraps Google Generative AI SDK with system prompt
- **Config**: Preferences stored in package.json (geminiApiKey, model selection)
  
## Code Style
- **Language**: TypeScript strict mode (React + Raycast components)
- **Imports**: ES modules only (`"type": "module"`)
- **Naming**: camelCase for functions, PascalCase for React components
- **Styling**: Casual/friendly tone with emojis in AI responses (1-2 max), support Vietnamese
- **Error Handling**: Use `showToast()` for user feedback, throw descriptive errors
- **Components**: Prefer Raycast List/Detail over Form for input UX
