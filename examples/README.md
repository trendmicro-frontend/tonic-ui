# Examples

These examples are Yarn workspaces. Run `yarn install` from the repository directory or either example directory; all use the shared `yarn.lock`. Build the Tonic packages before running the examples. Start each command block below from the repository directory.

| Example | Development | Production preview |
| :--- | :--- | :--- |
| `app-cdn` | Vite resolves installed packages locally | CDN import map; no automatic fallback |
| `app-cdn-with-local-fallback` | Bootstrap selects CDN or local runtime | Same selection and automatic local fallback |

## `app-cdn`

```bash
cd examples/app-cdn
npm run build
npm run preview
```

Open the URL printed by Vite. You should see **Tonic UI from a CDN**. Click the counter button and inspect the esm.sh requests in DevTools Network.

Vite generates the map from installed package versions; no versions are maintained in HTML. Rebuild after dependency changes. `npm run dev` is available for local development but does not verify CDN loading.

Documentation: Integrations → CDN integration → CDN setup.

## `app-cdn-with-local-fallback`

```bash
cd examples/app-cdn-with-local-fallback
npm run dev
```

Open the URL printed by Vite. You should see **Demo app**. Edit `src/app.jsx` to check page reloads. Add `?__local=react,tonic` to check local-only loading; remove `__local` and `__failed` to try the CDN again.

The command builds local runtime files and a generated manifest before starting Vite. Vendor/dependency changes require a rebuild. For production, run `npm run build`, then `npm run preview`, from this example directory. Deploy the complete `dist/` so fallback files remain available.

Inspect `dist/runtime-manifest.json` to see the selected CDN URLs. A workspace standalone artifact does not imply that its version is published; an unavailable CDN artifact causes normal local fallback.

Documentation: Integrations → CDN integration → CDN with local fallback. The opening inspector demo provides failure scenarios; see its [source guide](../packages/react-docs/integrations/cdn-with-local-fallback/README.md) to run it separately.

## End-to-end checks

The root [E2E suite](../e2e/README.md) covers both examples: local-only loading, CDN loading, and automatic local fallback. CDN checks need network access.

From the repository directory:

```bash
yarn build-public      # build the Tonic packages the examples resolve
yarn playwright install chromium  # one-time Chromium download
yarn test:e2e
```

The suite builds both examples, starts their production preview servers on automatically assigned ports, and runs five tests. Use `E2E_HOST` or `E2E_PORT` to override the host or request fixed ports. Docs integrations belong to the separate [react-docs suite](../packages/react-docs/e2e/README.md).
