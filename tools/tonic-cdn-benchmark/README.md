# Tonic UI: full recursive CDN Network benchmark

This provides **actual Chromium measurements** for the four loading approaches described in
`packages/react-docs/pages/integrations/cdn/index.page.mdx`:

1. esm.sh plain URL, no import map: `https://esm.sh/@tonic-ui/react@3.0.0-alpha.1`
2. esm.sh standalone build with peer dependencies mapped: `https://esm.sh/@tonic-ui/react@3.0.0-alpha.1?standalone&external=react,react-dom`
3. jsDelivr on-demand bundling: `https://cdn.jsdelivr.net/npm/@tonic-ui/react@3.0.0-alpha.1/+esm`
4. Tonic UI’s **own prebuilt standalone** file, normally `packages/react/dist/standalone/index.min.js`, served from the application origin, with React and Emotion left external as configured by `packages/react/rollup.config.mjs`

Each scenario runs the same small application: it imports React, `react-dom/client`, and `@tonic-ui/react`, renders `TonicProvider` with a `Box`, a `Button`, and `useColorMode`, and records the resulting DOM. The measured graph is therefore the graph an application actually fetches, not just the entry module.

It captures all recursively loaded JavaScript module HTTP requests using Chromium CDP, rather than guessing counts from the entry module. It also records every request URL, response status, duration, CDN-transferred bytes, decoded JS response bytes, main Tonic bundle size, render outcome (React version, computed `Box` and `Button` padding), and a request waterfall.

## Run inside the Tonic UI repo

Save `benchmark.mjs` under the repository root (for example `tools/tonic-cdn-benchmark/benchmark.mjs`) so it can resolve the repository’s installed Node dependencies.

First, build the workspace packages and Tonic UI standalone artifact, if needed:

```bash
yarn build
```

Install Playwright only if not already available (a project with E2E tests may already have it). If necessary:

```bash
yarn add -D -W playwright
npx playwright install chromium
```

From the repository root, run:

```bash
node ./tools/tonic-cdn-benchmark/benchmark.mjs \
  --bundle ./packages/react/dist/standalone/index.min.js \
  --repeats 3 \
  --output ./tonic-cdn-benchmark-report.html
```

It produces two files:

- `tonic-cdn-benchmark-report.html` — interactive charts, summary metrics, and a waterfall of **all** module requests for each scenario.
- `tonic-cdn-benchmark-report.json` — raw CDP evidence for each run and each URL.

## Compare a published, hosted Tonic UI standalone file instead

To avoid comparing CDN latency with localhost latency, provide a deployed URL:

```bash
node ./tools/tonic-cdn-benchmark/benchmark.mjs \
  --tonic-url 'https://YOUR-CDN/PATH/index.min.js' \
  --repeats 3
```

The URL must serve your **prebuilt standalone JS artifact** as an ESM module with valid CORS headers. If the file does not exist on a CDN, the local baseline still allows a correct structural comparison of request counts and sizes but **not** a fair latency ranking.

## Precisely what is measured

- Each scenario runs a minimal page that imports React, `react-dom/client`, and the Tonic UI source, then mounts `TonicProvider` with a `Box`, a `Button`, and `useColorMode`; no other application code or CSS is included.
- A fresh, isolated Chromium browser context is created for every run; HTTP browser cache is disabled and service workers are bypassed. This **cannot** clear the CDN edge cache.
- All recursively loaded JS module resources (including React, Emotion and transitive dependencies) are captured from actual `Network.*` events; the HTML document is excluded.
- **JS requests**: actual HTTP request records, including redirects. **Unique URLs**: distinct requested URLs.
- **Transferred**: Chrome DevTools Protocol `Network.loadingFinished.encodedDataLength`, used as a wire-byte estimate. Not equivalent to file byte size (CDN content encoding and HTTP framing may affect it).
- **Decoded JS**: actual decoded response body byte count where CDP can read it. Any missing decoded bodies are reported; do not treat a partially missing sum as exact.
- **Main bundle size**: decoded size of the primary Tonic JS artifact (`react.mjs`, `react.bundle.mjs`, `+esm`, or your own `index.min.js`), shown separately from the aggregate decoded JS size.
- **Module span**: time between first and last JS request in the module graph. This is not LCP, FCP, TTI, or full UI render time.
- `good runs`: runs where the application mounted and the rendered `Box` and `Button` had computed padding. Errors (including React error #527 and duplicate-React hook failures) remain visible in the raw JSON.
- The scenarios that use an import map pin peers to esm.sh by default: React `19.2.7`, `@emotion/react` `11.14.0`, `@emotion/styled` `11.14.1`, `@emotion/is-prop-valid` `1.2.2`. Use `--react`, `--emotion-react`, `--emotion-styled`, and `--emotion-prop-valid` to change them. The CDN entry URLs are still measured *as written*, so each CDN resolves its own transitive versions.

## Caveats

- Tonic UI `dist/standalone/index.min.js` does **not** include React / React DOM / Emotion. This matches the `standaloneExternal` function in your Rollup config. It **does** include ordinary `@tonic-ui/*` and non-peer dependencies.
- A published npm package may or may not include the locally generated standalone artifact. You can test the local built artifact without assuming it has already been published.
- The render check proves that the module graph mounts a component tree with computed styles. It does not cover CDN uptime, CDN cold-build latency at the edge, or interactive behavior beyond the initial mount.
- The script is read-only toward your repository. Running `yarn build` and installing Playwright are separate preparation steps that may update build outputs or dependency files.

## Documentation-ready comparison view (new)

Open **`comparison.html`** directly in a browser. This is a standalone documentation page with:

- A four-way summary table: esm.sh default / esm.sh `?standalone` / jsDelivr `+esm` / the Tonic UI prebuilt standalone.
- A pairwise bar comparison for JS HTTP requests, total transferred bytes, total decoded JavaScript, and the main Tonic UI bundle's decoded size.
- **Four separate DevTools-like waterfall panels**, each showing request paths, HTTP statuses, transferred sizes, and request start/duration bars. Each waterfall has dependency-category filtering and a show-all option; click any file for its full URL.
- A per-category breakdown of Tonic UI, React, Emotion, and other dependencies.

Without benchmark JSON, the page displays *only verified first-level import URL lists*, with no invented file sizes, timing bars or total network requests. In this preview mode, the Tonic prebuilt entry is not counted because it needs the actual compiled file. **Importing the real JSON is required for full request waterfalls and sizes.**

After running `benchmark.mjs`, open the generated HTML directly (`--output tonic-cdn-benchmark-report.html`): it embeds the measured JSON into this same comparison view. You can also open `comparison.html` and use **載入 Network 量測 JSON** to load any previous `.json` file. The exported HTML and its JSON are portable to the docs site as static assets. Do not label the entry-import preview as a real network capture.

### Metrics needed before performance conclusions

In addition to total request count, compare *both* the main Tonic bundle size and total recursive decoded/transfer sizes. Use versions compatible with `@tonic-ui/react@3.0.0-alpha.1`. For direct latency comparisons, host the Tonic standalone file on a comparable CDN (`--tonic-url`) rather than localhost and consider running with/without a warm browser cache in separate tests. The default benchmark is a cold-browser-cache load; it does not invalidate edge caches.
