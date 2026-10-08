# @tonic-ui/react-docs

A documentation site for the React Tonic UI component library.

## Standalone CDN-first demo

From the repository root, using the existing installed workspace dependencies:

```bash
yarn workspace @tonic-ui/react-docs build:cdn-runtime
python3 -m http.server 4173 --bind 127.0.0.1 --directory packages/react-docs/public/demos/cdn-runtime
```

Open `http://127.0.0.1:4173/`. Normal docs build/dev also assemble this demo. Navigation: **Integrations → CDN-first runtime**; Micro frontend is a separate page in the same section.

Sources: `demos/cdn-runtime/`. Generated assets: `public/demos/cdn-runtime/`, ignored by Git. Rebuild after changing sources. No MFE server, Module Federation or Wujie is required.

Public esm.sh supplies React, necessary Emotion peers and a single `@tonic-ui/react` standalone entry. Ordinary Tonic dependencies, including date-fns and focus-lock, are bundled rather than loaded as per-function modules. Necessary peers and esm.sh wrappers still require requests. The local app has one file per Tonic source variant; there is no separate widget build.

Each family falls back independently before mount. A Tonic failure selects the local app containing the entire Tonic family, retaining healthy React/Emotion CDN choices. Local vendors preserve one shared implementation per family. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

The full loaded surface uses one `TonicProvider`. **Failure scenario** uses Tonic `Dropdown`; the counter and theme toggle must work after fallback. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable browser cache and block requests. The per-family 8-second budget can fall back during cold CDN builds. Bootstrap installs the map before imports and reloads the demo before changing families; it does not change the parent docs runtime.
