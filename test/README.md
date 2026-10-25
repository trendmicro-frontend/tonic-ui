# Testing

## Choose the test level

Keep unit, React integration, type, and real-browser tests with the package or application they exercise. Share browser infrastructure through [`e2e/`](./e2e/README.md).

Use `test/` for package-level test infrastructure and suites. The MCP CLI suite uses `packages/mcp/test/`; existing colocated `__tests__/` and type-test directories remain unchanged. Browser specs live directly under `e2e/` or its `components/`, `scenarios/`, and `integrations/` subdirectories; rendered UI stays in `fixtures/`.

| Contract | Location | Command |
| :-- | :-- | :-- |
| Component or hook behavior in Jest and React Testing Library | Existing `packages/*/src/**/__tests__/` and package-level `__tests__/` directories | `yarn workspace <package> test` |
| Public React TypeScript declarations | Existing type-test files in `packages/react/` | `yarn workspace @tonic-ui/react test:types` |
| CLI and transport integration tests | `packages/mcp/test/` (Node test runner) | `yarn workspace @tonic-ui/mcp test-cli` |
| Browser interaction, focus, portals, owning documents, and event ordering | [`packages/react/test/e2e/`](../packages/react/test/e2e/README.md) | `yarn test:e2e react` |
| Reference application loading and CDN fallback | `examples/esm-cdn-with-fallback/test/e2e/` | `yarn test:e2e examples` |
| Documentation demo integrations | [`packages/react-docs/test/e2e/`](../packages/react-docs/test/e2e/README.md) | `yarn test:e2e docs` |

`yarn test` runs workspace test scripts. `yarn test:e2e` runs all browser suites, including both React development and production modes. Browser prerequisites, filters, reports, and debugging are documented in the [E2E guide](./e2e/README.md).

CSS declarations and browser layout are different contracts. Keep token resolution, generated `padding`/`margin`/size rules, responsive CSS, and style precedence in unit tests. Use real-browser tests for measured insets/gaps, flex or percentage sizing, overflow, scrolling, clipping boundaries, and native observers/media queries. A mocked `getBoundingClientRect`, `offsetHeight`, or observer callback does not verify layout.

`yarn lint` includes the root shared infrastructure and example browser suite using the React package's existing ESLint rules through `test/eslint.config.mjs`. React and docs browser suites use their owning package's lint configuration.

## Fixtures and browser actions

React browser coverage has two parts:

- `packages/react/test/e2e/fixtures/`: the rendered UI, composed from real library components.
- `packages/react/test/e2e/scenarios/` and `components/`: user actions and observable behavior assertions. Shared component contracts belong in `scenarios/`; unique component behavior belongs in `components/`.

Prefer a small dedicated fixture for a new scenario when changing an existing fixture would alter unrelated tests. Keep test helpers in the suite that uses them. Extract shared infrastructure only when multiple suites need the same behavior.

The examples and documentation suites exercise real applications in their owning workspace. Their application sources remain in place; do not duplicate them as browser fixtures.
