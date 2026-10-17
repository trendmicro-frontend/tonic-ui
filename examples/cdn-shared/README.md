# examples/cdn-shared/

Shared runtime library used by the [`cdn-without-fallback`](../cdn-without-fallback/) and
[`cdn-with-fallback`](../cdn-with-fallback/) examples. It is not an application:
there is nothing to run, and the examples copy or import its files from here.

| File | Used by | Purpose |
| :--- | :--- | :--- |
| `bootstrap.js` | Both examples (copied into `dist/`) | The generic runtime loader: reads the manifest, selects one source per runtime group, installs one import map, probes each group, and mounts the application. |
| `manifest.mjs` | Both build scripts | Node helpers that generate manifest CDN URLs and group sources from installed package versions: the `specifiersMap` of bare specifiers per family, the `groupKey` manifest-group naming, and `groupCdnSource`, which selects the published-artifact probe or the esm.sh build per family. |
| `emotion-redirects.mjs` | Both build scripts | Emotion mapping generator for the Tonic UI CDN source. |
| `runtime-dev.mjs` | Both Vite configs | The development plugin that serves the production runtime from `dist/` while loading the application from source. |

## The bootstrap

The bootstrap starts in one of two ways:

- **Self-starting**: the document loads it with a `data-manifest` attribute. It
  fetches the manifest and runs. This is how both example applications start.
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

This is the entire difference between the two examples:
`cdn-without-fallback` generates a manifest whose groups have no local source,
and `cdn-with-fallback` generates one whose groups do. The same bootstrap file
serves both.

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
the `data-manifest` attribute). Example build scripts generate it:

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
    "tonic-ui": {
      "local": { "imports": { "@tonic-ui/react": "./assets/npm/@tonic-ui/react@3.0.0/tonic-*.js" }, "probes": ["@tonic-ui/react"] },
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
  Tonic UI bundle's Emotion family).
- `apps.app.entry` is the application module; the application must export
  `mount(element, runtime)`, receiving the `selected` sources and package
  `versions`.
- In development the plugin injects `aliases`, mapping synthetic
  `https://runtime.invalid/` identifiers (the externalized bare imports in the
  application source) to the same URLs the manifest selects.

The development plugin serves the production manifest with `apps.app` replaced
by the application source entry, so development loads the application from
Vite-transformed source on the same selected CDN runtime.
