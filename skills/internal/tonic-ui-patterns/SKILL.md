---
name: tonic-ui-patterns
description: Apply Tonic UI repository conventions when creating or reviewing components, hooks, exports, browser E2E tests, and commit messages. Use for component structure, style hooks, documentation, and changeset workflows.
metadata:
  version: "1.0.0"
  source: "local-git-analysis"
  analyzed_commits: "200"
---

# Tonic UI Patterns

All `packages/` and `.changeset/` paths below are relative to the repository root.
Read the root `AGENTS.md` policy before PR or changeset work. Use the styling skill
when authoring Box-based styles; examples here describe component structure, not
an alternative to the `sx` / `__sx` precedence rules.

## Commit Conventions

This project uses **conventional commits** with scope:

| Type | Usage | Frequency |
|------|-------|-----------|
| `chore` | Releases, deps, tooling | ~36% |
| `feat` | New features | ~23% |
| `docs` | Documentation | ~18% |
| `ci` | CI/CD workflows | ~12% |
| `fix` | Bug fixes | ~7% |
| `test` | Test additions | ~2% |
| `refactor` | Code restructuring | ~1% |

**Scope format:** `type(package/component)` — e.g., `feat(react/menu)`, `fix(react/Checkbox)`, `chore(deps-dev)`

Common scopes:
- `react` / `react/<component>` — Main component package
- `react-hooks` — Hooks package
- `react-icons` — Icons package
- `mcp` — MCP server package
- `deps` / `deps-dev` — Dependency bumps
- `release` — Version releases
- `changesets` — Changeset config

**PR references:** Commit messages include `(#<number>)` at the end.

## Monorepo Structure

```
packages/
├── changelog-github/   # Custom changelog generator
├── codemod/            # Code migration tools
├── mcp/                # MCP server (TypeScript)
├── react/              # Main component library (JavaScript)
├── react-base/         # Base primitives (Box)
├── react-docs/         # Next.js documentation site
├── react-hooks/        # Shared hooks
├── react-icons/        # SVG icon components
├── styled-system/      # Styled System utilities
├── theme/              # Design tokens
└── utils/              # Shared utilities
```

**Key:** `packages/react` is the most frequently modified package (~38 commits in last 200).

## Component Architecture

### File Structure Pattern

Each component lives in `packages/react/src/<component-name>/`:

```
<component-name>/
├── ComponentName.js        # Main component (forwardRef + Box base)
├── index.js                # Barrel exports
├── styles.js               # Style hooks (useComponentNameStyle)
├── context.js              # React context (if compound component)
├── useComponentName.js     # Context consumer hook
├── withComponentName.js    # HOC for context injection (optional)
├── constants.js            # Constants (variants, sizes)
└── __tests__/
    ├── ComponentName.test.js
    └── __snapshots__/
        └── ComponentName.test.js.snap
```

### Component Pattern

Components use `forwardRef` with `useDefaultProps`:

```javascript
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { useComponentStyle } from './styles';

const Component = forwardRef((inProps, ref) => {
  const {
    prop1,
    prop2,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Component' });

  const styleProps = useComponentStyle({ prop1 });

  return (
    <Box ref={ref} {...styleProps} {...rest} />
  );
});

Component.displayName = 'Component';

export default Component;
```

### Compound Component Pattern

For related component groups (Menu, FormControl, Accordion):

1. **Context file** (`context.js`) — `createContext()`
2. **Provider component** — wraps children with context
3. **Consumer hook** (`useComponentName.js`) — `useContext(ComponentContext)`
4. **HOC** (`withComponentName.js`) — injects context props (optional)
5. **Barrel exports** (`index.js`) — named exports for all sub-components

### Style Pattern

Styles use hooks that return style objects using Styled System tokens:

```javascript
import { useColorStyle } from '../color-style';

const useComponentStyle = ({ variant }) => {
  const [colorStyle] = useColorStyle();

  return {
    color: colorStyle.color.primary,
    fontSize: 'sm',
    px: '2x',
    py: '1x',
  };
};
```

**Token formats:** `'1x'`, `'2x'`, `'sm'`, `'md'`, `'lg'` (Styled System spacing/sizing).

## Adding a New Component

Based on recent features (Highlight, Mark, FormControl), the workflow is:

### 1. Create component source files

```
packages/react/src/<component-name>/
├── ComponentName.js
├── index.js
├── styles.js
└── __tests__/
    └── ComponentName.test.js
```

### 2. Register in package index

Add to `packages/react/src/index.js`:
```javascript
export { ComponentName } from './<component-name>';
```

### 3. Update package export test

Add to `packages/react/__tests__/index.test.js` to verify the export exists.

### 4. Create documentation pages

Add to `packages/react-docs/pages/components/<component-name>/`:
- `index.page.mdx` — Main doc page
- Individual example files (`.js`) for each usage pattern

### 5. Register in sidebar

Add route to `packages/react-docs/config/sidebar-routes.js`.

### 6. Create changeset

After the PR exists and its number is known, create `.changeset/tonic-ui-pr-<PR_NUMBER>.md`
only when the user requests it. Before then, provide a content draft without creating a
file or opening a PR to obtain a number. Use one file per PR and include all affected
publishable packages with their appropriate bump types.
```markdown
---
"@tonic-ui/react": minor
---

feat: Add `ComponentName` component
```

## Files That Co-Change

These files typically change together:
- `packages/react/src/index.js` + `packages/react/__tests__/index.test.js` (new exports)
- `packages/react-docs/config/sidebar-routes.js` + `packages/react-docs/pages/components/*/index.page.mdx` (new docs)
- `packages/react/package.json` + `packages/react/CHANGELOG.md` + `.changeset/*.md` (releases)

## Testing Patterns

- **Framework:** Jest with React Testing Library
- **Location:** `__tests__/` directories co-located with source
- **Naming:** `ComponentName.test.js`
- **Snapshots:** Used extensively for visual regression (`__snapshots__/`)
- **Accessibility:** Tests use `@tonic-ui/react-base/test-utils/accessibility` utilities
- **Test command:** `yarn test`

### Browser E2E

- Use the repository entry point: `yarn test:e2e`. Select `react`, `examples`, `docs`, `docs:demos`, or `docs:pages` before native Playwright arguments; React runs development and production by default.
- Read `test/README.md`, `test/e2e/README.md`, and the selected suite's README before adding browser coverage. Browser suites live in `packages/react/test/e2e/`, `packages/react-docs/test/e2e/demos/`, `packages/react-docs/test/e2e/pages/`, and `examples/cdn-with-local-fallback/test/e2e/`; existing package unit and type tests stay in place.
- Documentation-page specs mirror the route: a spec at `packages/react-docs/test/e2e/pages/<route>.spec.mjs` tests `packages/react-docs/pages/<route>/index.page.mdx`, as project `<route>` at `/<route>/`. The folder layout is the contract — adding a page needs only the spec, because `pages/index.mjs` derives the project name, `testMatch`, and base URL from it. Demo specs are listed explicitly in `demos/index.mjs` because each pairs a build script with a `/demos/…` path.
- Keep small real-component fixtures in `packages/react/test/e2e/fixtures/components/`. Under that suite, put shared contracts in `scenarios/` and unique behavior in `components/`, without an extra `tests/` directory. Keep helpers in their owning suite until another suite needs them.
- Every browser test drives a real library component. The UI under test — dialog, trigger, control, content — is rendered with Tonic UI (`Button`, `Checkbox`, `Box`, `Text`, `Flex`, `Input`), not raw `<button>`, `<div>`, `<label><input>`, or markup built inside `page.evaluate`. Raw HTML is allowed only for the suite shell and environment hosts: `fixtures/index.jsx` page chrome, `public/index.html`, and the shadow-root/iframe elements.
- Interact with a component through its own visible semantics. `Checkbox` keeps its state on a visually hidden input: click the rendered label/control and assert `getByRole('checkbox', { name }).toBeChecked()`, because `locator.check()`/`uncheck()` cannot act on the hidden input.
- Enforcement is review, not lint: ESLint has no element rule for fixtures, so the PR diff must show that each tested element is a library component.
- Use native component/scenario tags with `--grep`; do not create a project or npm script per component. Projects identify actual application/server targets.
- All suites reuse `test/e2e/config.mjs`. Preserve root reference-app and react-docs integration coverage; do not add a second server/config framework or an empty future-page scaffold.

#### Screenshot evidence

- Screenshots are opt-in: `E2E_SCREENSHOTS=1`. Without it, nothing is written. All generation goes through `test/e2e/screenshots.mjs`; do not call `page.screenshot` directly.
- One case = one directory under the owning suite: `output/e2e-screenshots/<scenario>/<case>/`, where `<scenario>` is the spec name (`focus-lock`) and `<case>` is the component and state (`modal-locked`, `drawer-unlocked`).
- Names follow `<artifact>.<variant>.png`: `screenshot.light.png`, `screenshot.dark.png`, or `screenshot.png`. The name describes the picture, not the reason only one picture exists.
- A case that depends on the colour mode writes the `light`/`dark` pair with `captureColorModes(page, scenario, case, prepare)`; `prepare(colorMode)` reloads the fixture with `?colorMode=light|dark` and leaves the page in the state to capture.
- A case that does not depend on the colour mode writes one `screenshot.png` with `capture(page, scenario, case, { colorMode: null, reason })`. `reason` is required and states why the colour mode changes nothing.
- Any dimension that changes the pixels (colour mode, document/shadow/iframe host, backdrop) belongs in `<scenario>` or `<case>`; the file name is the identity of the shot.
- Each case directory holds `manifest.json` with `scenario`, `case`, `modeDependent`, `reason`, and one entry per shot (`mode`, `artifact`, fixture `url`), so a reviewer can reproduce the shot. Playwright's own failure screenshots stay in `output/e2e-test-results/`.
- Test the actual public API and boundary: not every overlay exposes `onInteractOutside`, and defaults/event propagation differ. Use real browser actions, owning-document/open-shadow-root cases, cancellation, and unmount cleanup where applicable.
- Exposed defects stay failing until resolved. Do not weaken assertions, add expected-failure markers, or test fake callback forwarding to obtain a pass.

## Changesets & Releases

- Uses `@changesets/cli` for versioning
- PR base branch: `main`
- Changelog: Custom `@tonic-ui/changelog-github` generator
- Access: `public` (npm)
- Changeset files use `.changeset/tonic-ui-pr-<PR_NUMBER>.md`, without suffixes, and are created only after the PR exists.

## Key Conventions

1. **JavaScript only** — No TypeScript for components; `.d.ts` files for type definitions
2. **forwardRef everywhere** — All components forward refs
3. **Styled System props** — Style via props (`px`, `py`, `color`, `bg`), not CSS classes
4. **Color tokens** — Use `colorStyle.color.primary`, `colorStyle.color.secondary`, `colorStyle.color.error`
5. **useDefaultProps** — Components use this for default prop values
6. **displayName** — Always set on components
7. **Named exports** — Barrel files use named `export { X } from './X'` pattern
