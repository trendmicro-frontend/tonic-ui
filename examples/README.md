# Examples

These examples are Yarn workspaces. Run `yarn install` from the repository directory or either example directory; all use the shared `yarn.lock`. Build the Tonic UI packages before running the examples. Start each command block below from the repository directory.

| Example | Development | Production preview |
| :--- | :--- | :--- |
| `cdn-without-fallback` | Bootstrap selects the CDN runtime; the app loads from source on it | CDN import map; no local fallback, so a CDN failure shows a visible startup error |
| `cdn-with-fallback` | Same selection, with automatic local fallback | Same selection and automatic local fallback |
| `cdn-shared` | Shared runtime library used by the two examples: bootstrap, manifest helpers, development plugin | Not runnable; the examples copy or import its files |

## `cdn-without-fallback`

```bash
cd examples/cdn-without-fallback
npm run build
npm run preview
```

Open the URL printed by Vite. You should see **Demo app**. Inspect the esm.sh requests in DevTools Network.

The build generates `runtime-manifest.json` from the installed package versions and copies the shared bootstrap from `cdn-shared/` into `dist/`. Rebuild after dependency changes. Development runs the application from source on the same selected CDN runtime.

Documentation: Integrations → CDN integration → CDN setup.

## `cdn-with-fallback`

```bash
cd examples/cdn-with-fallback
npm run dev
```

Open the URL printed by Vite. You should see **Demo app**. Edit `src/app.jsx` to check page reloads. Add `?__local=react,react-dom,tonic-ui` to check local-only loading with no runtime CDN requests; remove `__local` and `__failed` to try the CDN again.

The command builds local runtime files and a generated manifest before starting Vite. Vendor/dependency changes require a rebuild. For production, run `npm run build`, then `npm run preview`, from this example directory. Deploy the complete `dist/` so fallback files remain available.

Inspect `dist/runtime-manifest.json` to see the selected CDN URLs. The build probes the published standalone artifact: a workspace build the published package lacks is detected at build time and the esm.sh build is selected instead, so an unpublished artifact does not break the manifest.

The same example builds the [runtime inspector](./cdn-with-fallback/README.md) used by the documentation demo when the `--inspector` option is on: `npm run build:inspector`, `npm run dev:inspector`, `npm run preview:inspector`. The default build contains only the reference application.

Documentation: Integrations → CDN integration → CDN with local fallback.

## `cdn-shared`

The shared runtime library behind both CDN examples: the bootstrap that selects a source per runtime group and installs the import map, the manifest URL helpers, and the development plugin. It has no build or dev script of its own; see its [README](./cdn-shared/README.md) for the manifest schema and selection rules.

## End-to-end checks

The root [E2E suite](../e2e/README.md) covers the two application examples: local-only loading, CDN loading, automatic local fallback, and the no-fallback error state. CDN checks need network access.

From the repository directory:

```bash
yarn build-public      # build the Tonic UI packages the examples resolve
yarn playwright install chromium  # one-time Chromium download
yarn test:e2e
```

The suite builds both examples, starts their production preview servers on automatically assigned ports, and runs its tests. Use `E2E_HOST` or `E2E_PORT` to override the host or request fixed ports. Docs integrations, including the inspector demo, belong to the separate [react-docs suite](../packages/react-docs/e2e/README.md).
