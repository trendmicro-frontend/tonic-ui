# Examples

Standalone reference demos. Each one runs from its own directory with installed workspace dependencies.

## `app-shared-runtime` — the consuming application reference

The complete application that the docs' "How the Vite setup works" steps describe: a Vite config with the external rule, the shared runtime entry files, the import map, and a bootstrap that switches families on CDN failure. `src/app.jsx` is the application itself — normal imports, normal JSX, a few Tonic UI components.

From `packages/react-docs/examples/app-shared-runtime/`:

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. This builds into the demo's own ignored `dist/` directory and serves it with Vite Preview; `npm run build` only writes the static files. Unlike the runtime inspector, this demo is not copied into `public/demos/` — the docs page embeds only the inspector. Navigation: Integrations → Shared runtime. No MFE server, Module Federation, or Wujie is required.

The demo uses the two-bundle runtime model shared with the [runtime inspector](../integrations/shared-runtime/README.md). Two runtime families keep it small, and both load from public esm.sh by default. The React family uses one combined module serving `react`, `react-dom/client`, and the JSX runtimes, plus a second module serving `react-dom`; an import map points all five React specifiers at those URLs, so the app and the Tonic bundle share one in-memory React instance. The Tonic family is one bundled entry whose only externals are `react` and `react-dom`, with Emotion and ordinary Tonic dependencies such as date-fns and focus-lock inlined. On CDN failure the same-origin build of that family takes over before mount.

Each family falls back independently. All-local must not request esm.sh modules. Local/app/mount errors remain visible rather than trigger retry loops.
