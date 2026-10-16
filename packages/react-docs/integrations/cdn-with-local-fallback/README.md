# integrations/cdn-with-local-fallback/

Standalone demo for the shared runtime. It runs from its own directory with installed workspace dependencies.

## The runtime inspector

The verification tool: a visible shell with failure scenarios and a hidden, reloadable runtime frame. The shell document owns every visible inspector section. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the visible log updates during loading, then the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable browser cache and block requests. The per-family 8-second budget can fall back during cold CDN builds. Bootstrap installs the map before imports and never changes the parent docs runtime.

From `packages/react-docs/integrations/cdn-with-local-fallback/`:

```bash
npm run dev
```

Open the development URL printed by Vite (normally `http://localhost:5173/`). The command builds the local runtime and inspector shell into the demo's ignored `dist/`, then starts Vite's development server. The hidden runtime loads `src/app.js` directly; source edits reload the page rather than using React Fast Refresh with the production vendor runtime. `npm run build && npm run preview` serves the static production output, normally on port 4173. The docs build/dev still runs `yarn build:cdn-with-local-fallback` from the react-docs root, outputting static files to `public/demos/cdn-with-local-fallback/`. No MFE server, Module Federation, or Wujie is required.

Both demos accept `yarn dev --host 0.0.0.0` or `HOST=0.0.0.0 yarn dev`. With npm, use `npm run dev -- --host 0.0.0.0`. The same options apply to `preview`. CLI `--host` overrides the process environment variable `HOST`; without either, Vite defaults to localhost. This configuration does not load `HOST` from `.env` files. Use a specific interface address instead of `0.0.0.0` if network exposure must be limited.

The runtime entry files (`entries/`, `entries.mjs`) and helper scripts (`scripts/runtime-dev.mjs`, `scripts/emotion-redirects.mjs`) are independent copies of the ones in the [reference app](../../../../examples/app-cdn-with-local-fallback/); they are built into the inspector's own output so its import map resolves from its own origin. Keep the two copies in sync when either changes.

The inspector uses the same runtime boundaries as the reference app. The React family uses one combined local module serving `react`, `react-dom/client`, and the JSX runtimes, plus a second module serving `react-dom`. All consumers resolve React through one import map. If the installed Tonic package contains `dist/standalone/index.js`, the CDN candidate uses that raw artifact with external Emotion imports mapped separately. Otherwise, it uses an esm.sh Tonic build. A locally built artifact does not guarantee that the selected published version contains it. The same-origin Tonic fallback includes Emotion and ordinary dependencies, with only React external.

Each family falls back independently. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

## Development import maps

The inspector uses its own `scripts/runtime-dev.mjs` (an independent copy of the reference app's). It keeps normal React and Tonic source imports external through synthetic HTTP identifiers, then the bootstrap maps those identifiers to the same selected URLs as vendor bare imports. Vite dependency auto-discovery is disabled to prevent a second shared runtime from being prebundled.

Edit `dist/runtime-manifest.json` while the server runs to change CDN targets. The server reads it per request and reloads the document on changes. Remove fallback query parameters (or use the inspector's Retry control) to try the CDN again. Builds regenerate this file; change `scripts/build.mjs` for permanent deployment changes. Bootstrap and HTML edits also reload. Vendor and visible-shell source edits require rebuilding their bundles.

The visible shell stays prebuilt and isolated; the hidden app uses Vite-transformed source. The same bootstrap and per-family fallback run in both development and production. Direct Emotion or sibling Tonic imports, additional CommonJS app dependencies, SSR, and React Fast Refresh are outside the example's development contract.

## Automated checks

The [react-docs E2E suite](../../e2e/README.md) covers this integration alongside Module Federation and Wujie. From the repository root:

```bash
yarn workspace @tonic-ui/react-docs test:e2e --project cdn-with-local-fallback
```

The root `yarn test:e2e` command covers only `examples/`.
