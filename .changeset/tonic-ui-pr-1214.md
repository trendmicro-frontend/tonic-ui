---
"@tonic-ui/react": minor
---

feat(react): add a standalone ESM build

Provides a minified, single-file bundle at `dist/standalone/index.js` in `@tonic-ui/react` for direct browser and CDN use. Bundles non-peer dependencies while keeping React, React DOM, and Emotion external, so applications can share these dependencies through an import map.