# Docs E2E

Playwright (Chromium) coverage owned by `@tonic-ui/react-docs`. Existing scenarios cover the CDN runtime inspector, Module Federation, and Wujie demos under `public/demos/`. Reference applications belong to the root examples suite; reusable component behavior belongs to the React suite.

## Run

From the repository root, with workspace dependency builds and Chromium available:

```bash
yarn test:e2e docs            # both configs, one after the other
yarn test:e2e docs:demos      # demo contracts only
yarn test:e2e docs:pages      # documentation-page contracts only
yarn test:e2e docs:demos --project mfe-wujie
yarn test:e2e docs:pages --project <route>
yarn test:e2e docs --grep @drawer
yarn test:e2e docs:pages --list
```

The workspace alias uses the same repository runner:

```bash
yarn workspace @tonic-ui/react-docs test:e2e
```

The suite builds the real demo applications, then starts their production Vite preview. Build commands must succeed before preview starts. Remote modules and sub-apps use the configured origin. Do not start a server manually; the current demo scenarios do not require a Next.js build or another server wrapper.

Documentation-page specs are rendered by the Next.js dev server that `pages/playwright.config.mjs` starts on port 3129 (`E2E_PAGES_PORT` overrides it, `TONIC_UI_REACT_DOCS_DIST_DIR=build-e2e` keeps it apart from a developer's `yarn dev`). Demo builds are not needed for that config, so `docs:pages` runs without them.

CDN-first scenarios need network access. Local-only and outage scenarios control browser CDN requests, but the demo build can still retrieve CDN metadata.

## Ownership and extension

Two folders, two Playwright configs, so a project name only has to be unique inside its kind:

| Folder | Kind | Config | Server |
| :--- | :--- | :--- | :--- |
| `demos/` | reference apps built into the docs site | `demos/playwright.config.mjs` | demo builds + Vite preview |
| `pages/` | documentation pages | `pages/playwright.config.mjs` | the Next.js dev server |

- `demos/*.spec.mjs`: one spec per demo. `demos/index.mjs` lists the targets explicitly, because each one pairs a spec with a build script and a `/demos/…` path. Project names follow the example folder, e.g. `cdn-with-local-fallback`.
- `pages/**/*.spec.mjs`: one spec per documentation page, at the same relative path as the page it tests. A spec at `pages/<route>.spec.mjs` covers `packages/react-docs/pages/<route>/index.page.mdx`, and becomes project `<route>` served from `/<route>/`. **The folder layout is the contract**: adding a page needs only the spec file, because `pages/index.mjs` walks the folder and derives the project name, `testMatch`, and base URL from it.
- `demos/index.mjs` and `pages/index.mjs`: target definitions consumed by their config.
- `demos/playwright.config.mjs` and `pages/playwright.config.mjs`: real server definitions and per-target base URLs, using the shared `test/e2e/config.mjs` factory.

Use native tags for components and scenarios where they describe the actual integration. Both micro-frontend suites carry `@drawer` and `@portal`; Wujie also carries `@lifecycle`. Use `@wujie` and `@module-federation` to select the integration boundary.

Future documentation-page contracts go under `pages/`, mirroring the route they test. Do not force them through the demo preview, copy the React fixture server, or add an unused Next.js harness in advance.

See the [repository E2E guide](../../../../test/e2e/README.md) for suite selection, host/port overrides, console/file output, and debug settings. Report paths are relative to `packages/react-docs/`; no CI job is added.
