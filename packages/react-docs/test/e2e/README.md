# Docs E2E

Playwright (Chromium) coverage owned by `@tonic-ui/react-docs`. Existing scenarios cover the CDN runtime inspector, Module Federation, and Wujie demos under `public/demos/`. Reference applications belong to the root examples suite; reusable component behavior belongs to the React suite.

## Run

From the repository root, with workspace dependency builds and Chromium available:

```bash
yarn test:e2e docs
yarn test:e2e docs --project mfe-wujie
yarn test:e2e docs --grep @drawer
yarn test:e2e docs --list
```

The workspace alias uses the same repository runner:

```bash
yarn workspace @tonic-ui/react-docs test:e2e
```

The suite builds the real demo applications, then starts their production Vite preview. Build commands must succeed before preview starts. Remote modules and sub-apps use the configured origin. Do not start a server manually; the current demo scenarios do not require a Next.js build or another server wrapper.

CDN-first scenarios need network access. Local-only and outage scenarios control browser CDN requests, but the demo build can still retrieve CDN metadata.

## Ownership and extension

- `integrations/*.spec.mjs`: current real-demo integration contracts. Existing test behavior is preserved when files are organized here.
- `index.mjs`: application targets, native `testMatch` patterns, URL paths, and real build scripts.
- `playwright.config.mjs`: real server definition and per-target base URLs, using the shared `test/e2e/config.mjs` factory.

Use native tags for components and scenarios where they describe the actual integration. Both micro-frontend suites carry `@drawer` and `@portal`; Wujie also carries `@lifecycle`. Use `@wujie` and `@module-federation` to select the integration boundary.

Future documentation-page contracts also belong here. Add a real page spec and its required application/server target when the behavior exists. Use the real docs server for those pages; do not force them through the demo preview, copy the React fixture server, or add an unused Next.js harness in advance.

See the [repository E2E guide](../../../../test/e2e/README.md) for suite selection, host/port overrides, console/file output, and debug settings. Report paths are relative to `packages/react-docs/`; no CI job is added.
