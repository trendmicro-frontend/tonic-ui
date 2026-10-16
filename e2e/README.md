# e2e/

Local Playwright (Chromium) suite for `examples/app-cdn` and `examples/app-cdn-with-local-fallback`. Docs integrations have a separate [react-docs suite](../packages/react-docs/e2e/README.md).

## How to run

The entry point is a single command, run from the **repository root**:

```bash
yarn build-public      # after install or dependency changes: builds the Tonic packages
yarn test:e2e:install  # one-time: downloads Chromium
yarn test:e2e
```

`yarn test:e2e` builds both examples, then starts their production preview servers on ports 4180 and 4181 and runs all five tests. Do not start the apps manually.

Run a single surface or scenario:

```bash
yarn test:e2e --project app-cdn
yarn test:e2e --project app-cdn-with-local-fallback
yarn test:e2e --grep "falls back"
```

## What the tests prove

- `app-cdn`: mounts and interacts with Tonic UI loaded from a CDN; stays unmounted (by design, no fallback) when the CDN is unreachable.
- `app-cdn-with-local-fallback`: forced local, CDN, and automatic fallback when the CDN fails.

CDN checks use real `esm.sh` / `raw.esm.sh` URLs and need network access. Local and outage cases avoid or block CDN requests in the browser; builds can still fetch CDN metadata. An installed Tonic version can lack a published standalone artifact, so CDN-first checks probe the generated manifest's candidate URL before checking the final mounted document.

## Files

| File | Purpose |
| :--- | :--- |
| `tests/index.mjs` | Example targets, builds, preview commands and ports |
| `playwright.config.mjs` | Projects and preview servers derived from `tests/index.mjs`; reporters and timeouts |
| `helpers.mjs` | CDN host matching, request blocking/counting |
| `tests/app-cdn.spec.mjs` | CDN-only app |
| `tests/app-cdn-with-local-fallback.spec.mjs` | CDN with automatic local fallback |

Failure artifacts go to `e2e/test-results/`; the HTML report goes to `e2e/playwright-report/`, both relative to the repository root and git-ignored.
