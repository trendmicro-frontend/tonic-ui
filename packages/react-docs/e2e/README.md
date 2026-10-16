# Integration E2E

Local Playwright (Chromium) checks for `packages/react-docs/integrations/` only. Application examples belong to the separate [root suite](../../../e2e/README.md).

## Run

From the repository root, with workspace dependencies installed:

```bash
yarn build-public
yarn workspace @tonic-ui/react-docs test:e2e:install # one-time Chromium download
yarn workspace @tonic-ui/react-docs test:e2e
```

From `packages/react-docs/`, the entry point is simply `yarn test:e2e`.

The runner builds the demos with the existing `build:*` scripts, then serves `public/` on `http://127.0.0.1:4182`. All remote modules and Wujie sub-apps load from that same origin. No Next.js server or full docs-site build is needed. The runner uses an empty deployment prefix for local URLs. Do not start a server manually.

## Projects

| Project | Coverage |
| :--- | :--- |
| `cdn-with-local-fallback` | Local-only with no browser CDN requests; failed-family fallback; CDN-first selection |
| `mfe-module-federation` | Dashboard remotes; Inventory navigation; endpoint Drawer in the shell document; close/Escape and revisit |
| `mfe-wujie` | Dashboard sub-apps; Inventory navigation; endpoint Drawer inside the shadow root; close and sandbox remount |

Run one project:

```bash
yarn workspace @tonic-ui/react-docs test:e2e --project mfe-wujie
```

Filtering selects tests, but the shared server still builds all registered integrations. The CDN-first case uses real `esm.sh` / `raw.esm.sh` and needs network access. Local-only makes no browser CDN requests; injected failures do not require successful CDN responses. The CDN build can still inspect CDN metadata.

An unavailable published standalone file must lead to local fallback, not an assumption that every installed artifact is published.

## Files

- `tests/index.mjs`: integration names, spec files, demo paths, and build scripts.
- `tests/*.spec.mjs`: browser scenarios.
- `serve.mjs`: build integrations, then start same-origin static preview.
- `playwright.config.mjs`: Chromium projects, preview readiness, timeouts, and reports.

HTML reports go to `e2e/playwright-report/`; failure traces and error snapshots go to `e2e/test-results/`, both relative to `packages/react-docs/` and git-ignored. E2E is local-only; no CI job is added.
