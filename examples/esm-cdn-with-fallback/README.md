# examples/esm-cdn-with-fallback/

Reference app for the [CDN with fallback](../../packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx) integration: React and Tonic UI load from a CDN first, with automatic fallback to same-origin runtime files when a CDN import fails or times out during startup. The application and inspector share `public/bootstrap.js`; all runtime helpers are included in this directory.

This one example builds two products:

- **The reference application** (the default build): the demo app, its local runtime files, and the generated manifest.
- **The runtime inspector** (the `--inspector` option, enabled only when requested): the same runtime plus a visible control shell, failure-scenario presets, and a disposable runtime frame. The inspector is the demo embedded in the documentation page; the docs build runs the same script with a different output directory.

## Run the application

From this directory:

```bash
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173/`). You should see **Demo app**. The command builds the local runtime files and the manifest, then starts Vite. Edit `src/app.jsx` to check page reloads (this example uses page reloads, not React Fast Refresh, with its production vendor runtimes). Try `?__local=react,react-dom,@tonic-ui/react` in the URL to force local-only loading with no runtime CDN requests; remove `__local` and `__failed` from the URL to try the CDN again.

`npm run build && npm run preview` serves the static production output, normally on port 4173. Both dev and preview accept `--host 0.0.0.0` or `HOST=0.0.0.0`.

## Run the inspector

```bash
npm run dev:inspector
```

Build with `npm run build:inspector` and serve with `npm run preview:inspector`. The default `npm run build` does not include inspector files.

The inspector is a visible shell with a scenario dropdown and a hidden, reloadable runtime frame. The shell document owns every visible section, including the runtime-manifest.json display (collapsed by default), which the shell fetches itself so the manifest stays inspectable while the frame loads and after failures. `public/runtime.html` runs in a hidden iframe as the disposable import-map realm and streams its load log to the shell. A scenario change or CDN fallback reloads only that hidden document; the selected-source cells and versions update in place after the chosen runtime mounts. Failure presets inject a real missing-module import, not a simulated success. For actual CDN outage checks, disable the network in DevTools.

Open the inspector URL with `?scenario=all-local` (or any scenario id) to start in that scenario; `?run` numbering distinguishes frame reloads.
## What the build uses

The example is self-contained. Copy this directory to use it outside the
repository; no sibling helper directory or import-path changes are required.

| File | Purpose |
| :--- | :--- |
| `entries/`, `entries.mjs` | Local runtime entry files and their package specifiers |
| `public/bootstrap.js` | Runtime selection, import-map installation, probes, and mounting for app and inspector |
| `scripts/manifest.mjs` | Package versions, specifier groups, and CDN source selection |
| `scripts/emotion-redirects.mjs` | Generated Emotion mappings for the selected `@tonic-ui/react` CDN source |
| `scripts/runtime-dev.mjs` | Serve the production runtime while loading application source in Vite |

The build copies `public/bootstrap.js` into `dist/`. There is one loader
implementation for both products.

The React family uses one combined local module serving `react`, `react-dom/client`, and the JSX runtimes, plus a second module serving `react-dom`. All consumers resolve React through one import map. The build prefers `dist/standalone/index.js` only when the file exists in the installed `@tonic-ui/react` package and its published URL is reachable; otherwise it selects an esm.sh `@tonic-ui/react` build. A locally built artifact does not guarantee that the selected published version contains it. The generated manifest maps the selected CDN source's external Emotion imports. The same-origin `@tonic-ui/react` fallback includes Emotion and ordinary dependencies, with only React external.

Each family falls back independently. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.

## Development notes

The development plugin keeps normal React and `@tonic-ui/react` source imports external through synthetic HTTP identifiers, then the manifest maps those identifiers to the same selected URLs as vendor bare imports. Vite dependency auto-discovery is disabled to prevent a second shared runtime from being prebundled.

Edit `dist/runtime-manifest.json` while the server runs to change CDN targets. The server reads it per request and reloads the document on changes. The `__local` and `__failed` fallback query parameters live on the document URL, written by the bootstrap after a CDN failure; remove them (or use the inspector's Retry control) to try the CDN again. Builds regenerate this file; change `scripts/build.mjs` for permanent deployment changes. Bootstrap, document, and script edits also reload. Vendor and visible-shell source edits require rebuilding their bundles.

The visible shell stays prebuilt and isolated; the hidden app uses Vite-transformed source. The same bootstrap and per-family fallback run in both development and production. Direct Emotion or sibling `@tonic-ui/*` imports, additional CommonJS app dependencies, SSR, and React Fast Refresh are outside the example's development contract.

## Automated checks

The [root E2E suite](../../e2e/README.md) covers the reference application: local-only loading, CDN-first loading, and automatic local fallback. The [react-docs E2E suite](../../packages/react-docs/e2e/README.md) covers the inspector alongside the other docs demos.

```bash
yarn test:e2e --project esm-cdn-with-fallback
yarn workspace @tonic-ui/react-docs test:e2e --project esm-cdn-with-fallback
```

## The bootstrap

The bootstrap starts in one of two ways:

- **Self-starting**: the document loads it with a `data-manifest` attribute. It
  fetches the manifest and runs. This is how the reference application starts.
- **Consumer-started**: the document loads it without a manifest, which only
  registers `window.CdnRuntime`. A consumer script then prepares a
  manifest and calls `CdnRuntime.start({ manifest, onStatus,
  mountOptions })`. The runtime inspector uses this path to apply scenario
  presets to the manifest; scenario logic is not part of the bootstrap itself.

For each group named in the manifest, the bootstrap selects one source:

| Group state in the manifest | Selection | CDN probe fails | Local probe fails |
| :--- | :--- | :--- | :--- |
| `cdn` set, `local` set | CDN first; `__local` forces local | Reload the document with the group forced local (`__local` and `__failed` query parameters) | Terminal startup error |
| `cdn` set, `local` null | CDN only | Terminal startup error (a visible error state; the application does not mount) | — |
| `cdn` null, `local` set | Local only | — | Terminal startup error |

The example generates both sources for every group. The inspector uses the
same bootstrap and changes the manifest to apply a selected scenario.

Probes run on an eight-second budget for CDN sources only; an unavailable local
file is a deployment error, not a slow network. A failed CDN probe discards the
partially loaded document and reloads, because a native import map cannot be
rebound after modules have loaded. Manifest, CSS, application, and mount
failures are terminal startup errors rather than retry triggers.

## Status events

The bootstrap reports startup state through a single `onStatus(event)`
callback. Each event is a JSON-serializable object, and the bootstrap never
formats text: the consumer decides what to present (the application logs the
events to the console; the inspector renders the load log and streams it to
its shell).

| Event | Fields | Meaning |
| :--- | :--- | :--- |
| `cdn-failed` | `group`, `source: "cdn"` | The group failed in a discarded document and is carried over in `__failed` |
| `selected` | `group`, `source` | The source chosen for the group (`"cdn"` or `"local"`) |
| `probe-start` | `group`, `source` | The group's probe import started |
| `probe-failed` | `group`, `source`, `message` | The probe failed or exceeded the CDN budget |
| `fallback` | `group`, `source: "local"`, `url` | The document is being replaced to retry with the local source |
| `probe-ok` | `group`, `source` | The probe succeeded |
| `app-load` | — | The application CSS and entry load started |
| `error` | `message` | Startup failed; the error state is shown and the application does not mount |
| `mounted` | — | The application mounted |

## The manifest

The bootstrap reads `runtime-manifest.json` from beside the document (or from
the `data-manifest` attribute). The example build script generates it:

```json
{
  "versions": { "react": "19.2.7", "react-dom": "19.2.7", "@tonic-ui/react": "3.0.0" },
  "groups": {
    "react": {
      "local": { "imports": { "react": "./assets/npm/react@19.2.7/react-*.js", "react/jsx-runtime": "./assets/npm/react@19.2.7/react-*.js", "react/jsx-dev-runtime": "./assets/npm/react@19.2.7/react-*.js" }, "probes": ["react", "react/jsx-runtime", "react/jsx-dev-runtime"] },
      "cdn": { "imports": { "react": "https://esm.sh/react@19.2.7?target=es2022", "react/jsx-runtime": "https://esm.sh/react@19.2.7/jsx-runtime?target=es2022", "react/jsx-dev-runtime": "https://esm.sh/react@19.2.7/jsx-dev-runtime?target=es2022" }, "probes": ["react", "react/jsx-runtime", "react/jsx-dev-runtime"] }
    },
    "react-dom": {
      "local": { "imports": { "react-dom": "./assets/npm/react-dom@19.2.7/react-dom-*.js", "react-dom/client": "./assets/npm/react@19.2.7/react-*.js" }, "probes": ["react-dom", "react-dom/client"] },
      "cdn": { "imports": { "react-dom": "https://esm.sh/react-dom@19.2.7?target=es2022&external=react", "react-dom/client": "https://esm.sh/react-dom@19.2.7/client?target=es2022&external=react" }, "probes": ["react-dom", "react-dom/client"] }
    },
    "@tonic-ui/react": {
      "local": { "imports": { "@tonic-ui/react": "./assets/npm/@tonic-ui/react@3.0.0/tonic-ui-react-*.js" }, "probes": ["@tonic-ui/react"] },
      "cdn": { "imports": { "@tonic-ui/react": "https://esm.sh/@tonic-ui/react@3.0.0?target=es2022&standalone&external=react,react-dom" }, "probes": ["@tonic-ui/react"] }
    }
  },
  "shared": { "imports": { "@emotion/react": "https://esm.sh/@emotion/react@11.14.0?standalone&target=es2022" } },
  "apps": { "app": { "entry": "./assets/app/app-*.js", "css": [] } }
}
```

- `groups.<name>.local` and `groups.<name>.cdn` are candidate sources; either
  may be `null`. `imports` are the import map entries (relative paths resolve
  against the manifest URL); `probes` are imported to verify the source.
- `shared.imports` adds extra import map entries used by the CDN source (the
  `@tonic-ui/react` bundle's Emotion family).
- `apps.app.entry` is the application module; the application must export
  `mount(element, runtime)`, receiving the `selected` sources and package
  `versions`.
- In development the plugin injects `aliases`, mapping synthetic
  `https://runtime.invalid/` identifiers (the externalized bare imports in the
  application source) to the same URLs the manifest selects.

The development plugin serves the production manifest with `apps.app` replaced
by the application source entry, so development loads the application from
Vite-transformed source on the same selected CDN runtime.
