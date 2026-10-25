# Examples

The CDN example is a Yarn workspace. Run `yarn install` from the repository directory and build the Tonic UI packages before running it. Commands below start from the repository directory.

## `esm-cdn-with-fallback`

React and `@tonic-ui/react` load from a CDN first, with automatic fallback to same-origin runtime files when a CDN import fails or times out during startup.

```bash
cd examples/esm-cdn-with-fallback
npm run dev
```

Open the URL printed by Vite. You should see **Demo app** and the generated runtime manifest. Edit `src/app.jsx` to check page reloads. Add `?__local=react,react-dom,@tonic-ui/react` to check local-only loading with no runtime CDN requests; remove `__local` and `__failed` to try the CDN again.

The command builds local runtime files and the manifest before starting Vite. Vendor/dependency changes require a rebuild. For production, run `npm run build`, then `npm run preview`, from the example directory. Deploy the complete `dist/` so fallback files remain available.

Inspect `dist/runtime-manifest.json` to see the generated CDN and local candidates. The build probes the published `@tonic-ui/react` standalone artifact; if it is unavailable, the build selects the esm.sh standalone build instead. A CDN import failure at runtime falls back to the local candidate.

The same example builds the [runtime inspector](./esm-cdn-with-fallback/README.md) embedded in the documentation when the `--inspector` option is on: `npm run build:inspector`, `npm run dev:inspector`, `npm run preview:inspector`. The default build contains only the reference application.

Documentation: [CDN with fallback](../packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx).

## Micro frontend demos

`mfe-module-federation/` and `mfe-wujie/` contain the source projects for the
[Micro frontend architecture guide](../packages/react-docs/pages/integrations/micro-frontend/index.page.mdx).
Shared inventory data lives in `mfe-shared/`. The docs workspace builds and
serves these demos under `packages/react-docs/public/demos/`.

## End-to-end checks

The root [E2E suite](../test/e2e/README.md) covers local-only loading, CDN-first loading, and automatic local fallback. CDN checks need network access.

```bash
yarn build-public      # build the Tonic UI packages the example resolves
yarn playwright install chromium  # one-time Chromium download
yarn test:e2e examples
```

The suite builds the example and starts its production preview server on an automatically assigned port. Use `E2E_HOST` or `E2E_PORT` to override the host or request a fixed port. Docs integrations, including the inspector, belong to the separate [react-docs suite](../packages/react-docs/test/e2e/README.md).
