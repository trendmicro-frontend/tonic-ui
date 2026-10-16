# Integration E2E

Local Playwright (Chromium) checks for `packages/react-docs/integrations/` only. Application examples belong to the separate [root suite](../../../e2e/README.md).

## Run

From the repository root, with workspace dependencies installed:

```bash
yarn build-public
yarn workspace @tonic-ui/react-docs playwright install chromium  # one-time Chromium download
yarn workspace @tonic-ui/react-docs test:e2e
```

From `packages/react-docs/`, the entry point is simply `yarn test:e2e`.

Both suites declare targets in `tests/index.mjs` and servers directly in `playwright.config.mjs`. The shared factory joins commands with `&&`: existing build scripts must succeed before Vite preview serves `public/`. Remote modules and sub-apps use the same configured origin. No separate server script or Next.js build is needed. Do not start a server manually.

Optionally override the host or request a fixed port with `E2E_HOST` and `E2E_PORT`:

```bash
E2E_HOST=localhost E2E_PORT=4282 yarn workspace @tonic-ui/react-docs test:e2e
```

The host defaults to `127.0.0.1`. Without `E2E_PORT` (or with `0`), Vite binds port `0` and the OS assigns its port. Playwright captures the actual URL from Vite's ready output and passes it to browser workers. Set a nonzero `E2E_PORT` only when a fixed port is needed.

Run one project:

```bash
yarn workspace @tonic-ui/react-docs test:e2e --project mfe-wujie
```

Filtering selects tests, but the shared server still builds all registered integrations. Some checks and build steps require network access. Each spec's prologue describes its purpose.

## Files

- `tests/index.mjs`: integration names, spec files, paths, and build scripts.
- `tests/*.spec.mjs`: browser scenarios.
- `playwright.config.mjs`: registry, base URLs, server definition, and assertion timeout.
- `../../../scripts/playwright-config.mjs`: shared project and webServer construction, output modes, and last-run suppression. Suite ownership stays separate.

## Output modes

Console-only is the default: test results use the `list` reporter, with no retained report or artifact files. Traces, screenshots, and videos are disabled; attachments and last-run state are not retained.

To also write reports and keep failure artifacts, run from the repository root:

```bash
E2E_REPORTS=1 yarn workspace @tonic-ui/react-docs test:e2e
```

File mode writes `output/e2e-playwright-report/` and `output/e2e-test-results/` relative to `packages/react-docs/`, using the same layout as the root suite. It retains failure traces and attachments. Both directories are git-ignored.

Neither mode saves `.last-run.json`, so `--last-failed` has no saved state to use.

Unset `E2E_REPORTS` or set it to `0` to return to console-only mode. Existing HTML reports are not deleted. Builds still write their assets, and Playwright may use temporary output directories. E2E remains local-only; no CI job is added.

## Debug output

From `packages/react-docs/`, show build output, server URLs/readiness, and individual test results:

```bash
DEBUG=pw:webserver yarn test:e2e
```

Use `DEBUG=pw:webserver,pw:api` to also log browser actions and assertions. Debug logging does not enable HTML reports or retained test artifacts.

