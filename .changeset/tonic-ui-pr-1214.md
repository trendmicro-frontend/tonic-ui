---
"@tonic-ui/react": minor
---

feat(react): add a standalone ESM build

Provides a full bundle at `dist/standalone/index.js` and a minified, ES2022 bundle at `dist/standalone/index.min.js` in `@tonic-ui/react` for browser and CDN use. Both bundle non-peer dependencies while keeping React, React DOM, and Emotion external, so applications can share these dependencies through an import map.