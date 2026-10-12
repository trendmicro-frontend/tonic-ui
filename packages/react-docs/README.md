# @tonic-ui/react-docs

A documentation site for the React Tonic UI component library.

## Standalone CDN-first demo

From `packages/react-docs/demos/cdn-runtime/`, with installed workspace dependencies:

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. This standalone app builds into its own ignored `dist/` directory and serves it with Vite Preview; `npm run build` only writes the static files. Normal docs build/dev instead run `yarn build:cdn-runtime` and output the same app to `public/demos/cdn-runtime/`. Navigation: Integrations → CDN-first runtime. No MFE server, Module Federation, or Wujie is required.

Public esm.sh supplies React, necessary Emotion peers and a single `@tonic-ui/react` standalone entry. Ordinary Tonic dependencies, including date-fns and focus-lock, are bundled rather than loaded as per-function modules. Necessary peers and esm.sh wrappers still require requests. The local app has one file per Tonic source variant; there is no separate widget build.

Each family falls back independently before mount. A Tonic failure selects the local app containing the entire Tonic family, retaining healthy React/Emotion CDN choices. Local vendors preserve one shared implementation per family. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

The shell document owns every visible inspector section. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the visible log updates during loading, then the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable browser cache and block requests. The per-family 8-second budget can fall back during cold CDN builds. Bootstrap installs the map before imports and never changes the parent docs runtime.
