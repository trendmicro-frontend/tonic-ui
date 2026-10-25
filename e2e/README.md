# Repository E2E

One entry point runs the repository's Playwright (Chromium) suites. Each suite owns its tests and real application server; `e2e/config.mjs` supplies common browser, reporting, and server defaults.

## Run

From the repository root, with workspace dependencies and Chromium available:

```bash
yarn build-public      # after install or workspace dependency changes
yarn test:e2e
```

The runner executes React development, React production, reference examples, then docs integrations. It stops on the first failed run and preserves its exit code. It does not install dependencies or browsers.

| Selection | Test ownership | Server |
| :-- | :-- | :-- |
| `react` | [`packages/react/e2e`](../packages/react/e2e/README.md): component behavior and shared scenarios | Current React sources, bundled in memory with esbuild |
| `examples` | `e2e/tests/examples/`: reference applications | Each application's production build and preview |
| `docs` | [`packages/react-docs/e2e`](../packages/react-docs/e2e/README.md): docs-owned integrations | Production demos under `public/demos/` |

```bash
yarn test:e2e react
yarn test:e2e examples
yarn test:e2e docs
yarn test:e2e all       # explicit equivalent of yarn test:e2e
```

React runs the same contracts against both build modes: development warnings are present only in development; production behavior is exercised with the production React runtime. To run one mode:

```bash
E2E_NODE_ENV=development yarn test:e2e react
E2E_NODE_ENV=production yarn test:e2e react
```

## Filter with Playwright

Choose the owning suite first. Remaining arguments go directly to Playwright; the runner has no custom test-filter language.

```bash
yarn test:e2e react --grep @menu
yarn test:e2e react --grep @interact-outside
yarn test:e2e react --grep '(?=.*@drawer)(?=.*@interact-outside)'
yarn test:e2e react --grep '@menu|@popover'
yarn test:e2e react --grep @interact-outside --grep-invert @touch
yarn test:e2e react components/popper.spec.mjs
yarn test:e2e docs --project mfe-wujie
yarn test:e2e docs --grep @drawer
yarn test:e2e examples --grep 'falls back'
yarn test:e2e --list
```

`--grep` is Playwright's native regular-expression filter. It matches a space-separated string containing the project name, spec filename, describe titles, test title, and declared tags—not only tags. Patterns are substring matches unless anchored. Quote expressions that contain shell operators such as `|`, parentheses, or spaces.

| Tag kind | Values | Selects |
| :-- | :-- | :-- |
| Component | `@menu`, `@popover`, `@modal`, `@drawer`, `@dropdown`, `@autocomplete`, `@date-picker`, `@tooltip`, `@overflow-tooltip`, `@popper` | One component's coverage |
| Scenario | `@interact-outside`, `@lifecycle`, `@focus`, `@keyboard`, `@portal`, `@deprecation`, `@positioning`, `@hover` | One behavior across components |
| Input or boundary | `@touch`, `@example`, `@cdn`, `@docs`, `@integration`, `@module-federation`, `@wujie` | Native input, application, or integration boundary |

A test inherits tags from its enclosing `describe` groups and can carry several tags. Use `|` for OR, lookaheads such as `(?=.*@drawer)(?=.*@interact-outside)` for AND, and `--grep-invert` to exclude matches. The contract behind each component tag is in the [React component guide](../packages/react/e2e/README.md).

Use `--list` with any filter to inspect selected tests without starting servers or running tests. For example: `yarn test:e2e react --grep @menu --list`. React lists both modes by default; set `E2E_NODE_ENV=development` to list once.

Always put the suite before a spec path. Without a suite, the runner treats the first non-option argument as a suite name. With no suite or with `all`, Playwright arguments apply separately to every suite and React mode. A filter or project that does not exist in one suite fails that run and stops the runner before later suites; narrow to the owning suite first.

Do not create a project per component or duplicate a spec merely to support another filter. Projects represent separate application/server targets; React component selection is tag-based.

## Layout and extension

- `e2e/run.mjs`: suite selection and development/production execution.
- `e2e/config.mjs`: shared Playwright defaults and real server construction.
- `e2e/playwright.config.mjs` and `e2e/tests/index.mjs`: reference-app targets, native `testMatch` patterns, builds, and preview commands.
- `e2e/support/cdn.mjs`: reference-app network controls.
- `packages/react/e2e/tests/scenarios/`: reusable browser contracts across components.
- `packages/react/e2e/tests/components/`: component-specific browser contracts.
- `packages/react/e2e/fixtures/components/`: small real-component fixtures.
- `packages/react-docs/e2e/tests/integrations/`: docs demo integration tests. Add docs-page scenarios to that suite only when there is a real page contract and a matching real server; do not add an empty Next.js harness in advance.

All configs use native Playwright `testMatch` patterns, so adding a spec under an existing target does not require another npm script. Add another application target and server only when it needs a different runtime or origin.

## Servers and network

Servers start automatically and bind an available port. Do not start them manually for test runs. `E2E_HOST` defaults to `127.0.0.1`; `E2E_PORT=0` selects an available port. A nonzero port requests a fixed port:

```bash
E2E_HOST=localhost E2E_PORT=4280 yarn test:e2e examples
```

In the examples suite, a fixed `E2E_PORT` is the first target's port; later targets use consecutive ports (`E2E_PORT + index`). Docs uses one preview server for all its projects.

The shared factory joins build and preview commands with `&&`, so preview starts only after a successful build. The example and docs CDN scenarios use real `esm.sh` / `raw.esm.sh` URLs and require network access. Their local/outage browser cases block or avoid CDN requests, but builds can still retrieve CDN metadata. React component fixtures use no CDN.

## Reports and debugging

Console-only output is the default. Traces, screenshots, and videos are disabled; no last-run state is retained.

```bash
E2E_REPORTS=1 yarn test:e2e react
DEBUG=pw:webserver yarn test:e2e docs
```

File mode writes `output/e2e-playwright-report/` and `output/e2e-test-results/` relative to the owning workspace (repository root for examples). Traces are retained only for failures. Development and production use the same React report directory; the most recent run owns that report. The runner stops before a failing run can be overwritten by the next mode. No CI job is added.

`--last-failed` has no saved state in either mode. Existing HTML reports are not deleted by changing output mode. Builds still write their own generated application assets. `DEBUG=pw:webserver,pw:api` adds server and browser-action diagnostics without enabling retained artifacts.
