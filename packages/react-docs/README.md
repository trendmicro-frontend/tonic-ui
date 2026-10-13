# @tonic-ui/react-docs

A documentation site for the React Tonic UI component library.

## Standalone CDN-first demo

From `packages/react-docs/demos/cdn-runtime/`, with installed workspace dependencies:

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. This standalone app builds into its own ignored `dist/` directory and serves it with Vite Preview; `npm run build` only writes the static files. Normal docs build/dev instead run `yarn build:cdn-runtime` and output the same app to `public/demos/cdn-runtime/`. Navigation: Integrations → CDN-first runtime. No MFE server, Module Federation, or Wujie is required.

Two runtime families keep the demo small. The React family is always same-origin: one combined module serves `react`, `react-dom/client`, and the JSX runtimes, and a second module serves `react-dom`; an import map points all five React specifiers at those two files, so the app and the Tonic bundle share one in-memory React instance. The Tonic family is one bundled entry: public esm.sh serves a single-file build whose only externals are `react` and `react-dom`, with Emotion and ordinary Tonic dependencies such as date-fns and focus-lock inlined. On CDN failure the same-origin Tonic bundle takes over.

Each family falls back independently before mount. A Tonic failure selects the local bundle containing the entire Tonic family; the React family is unaffected because it never leaves the origin. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

The shell document owns every visible inspector section. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the visible log updates during loading, then the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable browser cache and block requests. The per-family 8-second budget can fall back during cold CDN builds. Bootstrap installs the map before imports and never changes the parent docs runtime.
