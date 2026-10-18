# Specification — `@tonic-ui/react` standalone ESM artifact

**Status:** Implemented  
**Decision record:** [Standalone ESM artifact naming ADR](../adr/2026-10-16-standalone-esm-artifact-naming.md)  
**Plan:** [Standalone CDN roadmap](../plans/2026-10-15-future-packages-standalone-cdn-roadmap.md)

## Purpose

Provide a single-file ESM build of `@tonic-ui/react` for browser/CDN consumers using import maps. This artifact is separate from the package's ordinary `dist/cjs` and `dist/esm` builds.

## Artifact and build

- Output: `packages/react/dist/standalone/index.js`.
- Format: minified ESM, transpiled to ES2022.
- Package publication: `packages/react/package.json` includes `dist` in `files`, so the artifact is part of the package output.
- Dedicated command: `yarn build:standalone`; it runs the standalone Rollup target and the minification step.
- `yarn build` also emits the standalone artifact when sibling workspace package distributions are available.

The current `.js` filename is intentional implementation state. The ADR's recommendation to use `.mjs` for a new public path has not been implemented; do not assume an `index.mjs` artifact exists.

## Dependency contract

The standalone target inlines non-peer dependencies. All 13 direct runtime dependencies declared by the current `packages/react/package.json` are bundled; Rollup tree-shakes the result, so the artifact does not contain each dependency's full package:

- `@popperjs/core`
- `@tonic-ui/react-base`
- `@tonic-ui/react-hooks`
- `@tonic-ui/react-icons`
- `@tonic-ui/styled-system`
- `@tonic-ui/theme`
- `@tonic-ui/utils`
- `date-fns`
- `ensure-type`
- `micro-memoize`
- `react-focus-lock`
- `react-is`
- `react-transition-group`

React, React DOM, and Emotion remain external. The package declares these peers:

| Peer dependency | Supported range |
| --- | --- |
| `react` | `^18.3.0` or `^19.0.0` |
| `react-dom` | `^18.3.0` or `^19.0.0` |
| `@emotion/react` | `^11.0.0` |
| `@emotion/styled` | `^11.0.0` |

CDN consumers must provide the artifact's React and Emotion imports through an import map, with shared instances for the page. Ordinary package consumers get regular dependencies through their package manager and must satisfy the peer dependencies in the host application.

## Build assertion and known limit

After minification, `scripts/minify-standalone.mjs` rejects bare static imports outside the React/React DOM and Emotion package families. This preserves the external dependency contract as direct dependencies change.

The assertion currently scans static imports only; it does not detect dynamic `import()` expressions. This validation gap is recorded in the ADR's related build-review evidence and is not proof that dynamic imports are safe.

## Documentation

The consumer-facing installation and dependency guidance is in [`packages/react/README.md`](../../packages/react/README.md). The roadmap's core precedent remains the implemented `@tonic-ui/react` artifact; its add-on package designs remain future work.
