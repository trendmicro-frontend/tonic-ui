# examples/cdn-with-fallback/

Reference app for the [CDN with local fallback](../../packages/react-docs/pages/integrations/cdn-with-local-fallback/index.page.mdx) integration: React and Tonic UI load from a CDN first, with automatic fallback to same-origin runtime files when a CDN import fails or times out during startup. The runtime is selected by the shared bootstrap in [`examples/cdn-shared`](../cdn-shared/), which both CDN examples use.

This one example builds two products:

- **The reference application** (the default build): the demo app, its local runtime files, and the generated manifest.
- **The runtime inspector** (the `--inspector` option, enabled only when requested): the same runtime plus a visible control shell, failure-scenario presets, and a disposable runtime frame. The inspector is the demo embedded in the documentation page; the docs build runs the same script with a different output directory.

## Run the application

From this directory:

```bash
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173/`). You should see **Demo app**. The command builds the local runtime files and the manifest, then starts Vite. Edit `src/app.jsx` to check page reloads (this example uses page reloads, not React Fast Refresh, with its production vendor runtimes). Try `?__local=react,tonic` in the URL to force local-only loading with no runtime CDN requests; remove `__local` and `__failed` from the URL to try the CDN again.

`npm run build && npm run preview` serves the static production output, normally on port 4173. Both dev and preview accept `--host 0.0.0.0` or `HOST=0.0.0.0`.

## Run the inspector

```bash
npm run dev:inspector
```

Build with `npm run build:inspector` and serve with `npm run preview:inspector`. The default `npm run build` does not include inspector files.

The inspector is a visible shell with a scenario dropdown and a hidden, reloadable runtime frame. The shell document owns every visible section, including the runtime-manifest.json display (collapsed by default), which the shell fetches itself so the manifest stays inspectable while the frame loads and after failures. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable the network in DevTools.

Open the inspector URL with `?scenario=all-local` (or any scenario id) to start in that scenario; `?run` numbering distinguishes frame reloads.
## What the build uses

The runtime entries (`entries/`, `entries.mjs`) and the Emotion-mapping
helper (`scripts/emotion-redirects.mjs`) are this example's own files: only
this example builds local runtime bundles. The bootstrap, the development
plugin, and the manifest URL helpers are the shared single copy in
[`examples/cdn-shared`](../cdn-shared/); the build script copies the
bootstrap into `dist/` rather than keeping a second file here.

The React family uses one combined local module serving `react`, `react-dom/client`, and the JSX runtimes, plus a second module serving `react-dom`. All consumers resolve React through one import map. If the installed Tonic package contains `dist/standalone/index.js`, the CDN candidate uses that raw artifact with external Emotion imports mapped separately. Otherwise, it uses an esm.sh Tonic build. A locally built artifact does not guarantee that the selected published version contains it. The same-origin Tonic fallback includes Emotion and ordinary dependencies, with only React external.

Each family falls back independently. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

## Development notes

The development plugin keeps normal React and Tonic source imports external through synthetic HTTP identifiers, then the manifest maps those identifiers to the same selected URLs as vendor bare imports. Vite dependency auto-discovery is disabled to prevent a second shared runtime from being prebundled.

Edit `dist/runtime-manifest.json` while the server runs to change CDN targets. The server reads it per request and reloads the document on changes. The `__local` and `__failed` fallback query parameters live on the document URL, written by the bootstrap after a CDN failure; remove them (or use the inspector's Retry control) to try the CDN again. Builds regenerate this file; change `scripts/build.mjs` for permanent deployment changes. Bootstrap, document, and script edits also reload. Vendor and visible-shell source edits require rebuilding their bundles.

The visible shell stays prebuilt and isolated; the hidden app uses Vite-transformed source. The same bootstrap and per-family fallback run in both development and production. Direct Emotion or sibling Tonic imports, additional CommonJS app dependencies, SSR, and React Fast Refresh are outside the example's development contract.

## Automated checks

The [root E2E suite](../../e2e/README.md) covers the reference application: local-only loading, CDN-first loading, and automatic local fallback. The [react-docs E2E suite](../../packages/react-docs/e2e/README.md) covers the inspector alongside the other docs demos.

```bash
yarn test:e2e --project cdn-with-fallback
yarn workspace @tonic-ui/react-docs test:e2e --project cdn-with-local-fallback
```
