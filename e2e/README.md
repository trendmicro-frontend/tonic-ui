# e2e/

Local Playwright (Chromium) suite for `examples/esm-cdn-with-fallback`. Docs integrations have a separate [react-docs suite](../packages/react-docs/e2e/README.md).

## How to run

The entry point is a single command, run from the **repository root**:

```bash
yarn build-public      # after install or dependency changes: builds the Tonic UI packages
yarn playwright install chromium  # one-time: downloads Chromium
yarn test:e2e
```

`yarn test:e2e` builds the example, starts its production preview server, and checks local-only loading, CDN-first loading, and automatic local fallback. The server automatically binds an available port. Do not start the app manually.

Both suites declare targets in `tests/index.mjs` and servers directly in `playwright.config.mjs`. The shared factory creates projects and joins each server's build/preview commands with `&&`, so preview starts only after successful builds.

Optionally override the host or request fixed ports with `E2E_HOST` and `E2E_PORT`:

```bash
E2E_HOST=localhost E2E_PORT=4280 yarn test:e2e
```

The host defaults to `127.0.0.1`. Without `E2E_PORT` (or with `0`), the server binds port `0` and the OS assigns its port. Playwright captures the actual URL from Vite's ready output and passes it to browser workers. A nonzero `E2E_PORT` requests that port. The server is started fresh for each run.

Run a single surface or scenario:

```bash
yarn test:e2e --project esm-cdn-with-fallback
yarn test:e2e --grep "falls back"
```

CDN checks use real `esm.sh` / `raw.esm.sh` URLs and need network access. Local and outage cases avoid or block CDN requests in the browser; builds can still fetch CDN metadata. The Tonic UI group's CDN source prefers the published standalone artifact, served raw from the published npm tarball; when the installed package lacks it, the build probes the published URL and selects the esm.sh build instead, so CDN-first checks probe the generated manifest's candidate URL before checking the final mounted document.

## Files

| File | Purpose |
| :--- | :--- |
| `tests/index.mjs` | Example targets and their build/preview metadata |
| `playwright.config.mjs` | Suite registry, base URLs, server definitions and retries |
| `../scripts/playwright-config.mjs` | Shared factory: projects, webServer construction, output modes and last-run suppression |
| `tests/helpers.mjs` | CDN host matching and request blocking |
| `tests/*.spec.mjs` | Scenarios; each file's prologue describes its purpose |

## Output modes

Console-only is the default: test results use the `list` reporter, with no retained report or artifact files. Traces, screenshots, and videos are disabled; attachments and last-run state are not retained.

To also write reports and keep failure artifacts:

```bash
E2E_REPORTS=1 yarn test:e2e
```

File mode writes `output/e2e-playwright-report/` and `output/e2e-test-results/` relative to the repository root. It retains failure traces and attachments. Both directories are git-ignored.

Neither mode saves `.last-run.json`, so `--last-failed` has no saved state to use.

Unset `E2E_REPORTS` or set it to `0` to return to console-only mode. Existing HTML reports are not deleted. This toggle controls test results, not application builds: builds still write their assets, and Playwright may use temporary output directories.

## Debug output

From the repository root, show build output, server URLs/readiness, and individual test results:

```bash
DEBUG=pw:webserver yarn test:e2e
```

Use `DEBUG=pw:webserver,pw:api` to also log browser actions and assertions. Debug logging does not enable HTML reports or retained test artifacts.

