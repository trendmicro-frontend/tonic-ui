# integrations/shared-runtime/

Standalone demo for the shared runtime. It runs from its own directory with installed workspace dependencies.

## The runtime inspector

The verification tool: a visible shell with failure scenarios and a hidden, reloadable runtime frame. The shell document owns every visible inspector section. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the visible log updates during loading, then the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable browser cache and block requests. The per-family 8-second budget can fall back during cold CDN builds. Bootstrap installs the map before imports and never changes the parent docs runtime.

From `packages/react-docs/integrations/shared-runtime/`:

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. This builds into the demo's own ignored `dist/` directory and serves it with Vite Preview; `npm run build` only writes the static files. The docs build/dev instead runs `yarn build:shared-runtime` from the react-docs root, outputting the same files to `public/demos/shared-runtime/`. Navigation: Integrations → Shared runtime. No MFE server, Module Federation, or Wujie is required.

The inspector's runtime entry files are shared with the [reference app](../../examples/app-shared-runtime/) in `examples/app-shared-runtime/`; they are built into the inspector's own output so its import map resolves from its own origin.

The inspector uses the same two-bundle runtime model as the reference app. Two runtime families keep it small, and both load from public esm.sh by default. The React family uses one combined module serving `react`, `react-dom/client`, and the JSX runtimes, plus a second module serving `react-dom`; an import map points all five React specifiers at those URLs, so the app and the Tonic bundle share one in-memory React instance. The Tonic family is one bundled entry whose only externals are `react` and `react-dom`, with Emotion and ordinary Tonic dependencies such as date-fns and focus-lock inlined. On CDN failure the same-origin build of that family takes over before mount.

Each family falls back independently. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.
