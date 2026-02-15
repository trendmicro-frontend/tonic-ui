---
name: tonic-ui-patterns
description: Coding patterns extracted from tonic-ui repository
version: 1.0.0
source: local-git-analysis
analyzed_commits: 200
---

# Tonic UI Patterns

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

Add `.changeset/<changeset-name>.md`:
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

## Changesets & Releases

- Uses `@changesets/cli` for versioning
- Base branch: `v2`
- Changelog: Custom `@tonic-ui/changelog-github` generator
- Access: `public` (npm)
- Changeset files go in `.changeset/` with descriptive names (e.g., `tonic-ui-pr-1085.md`)

## Key Conventions

1. **JavaScript only** — No TypeScript for components; `.d.ts` files for type definitions
2. **forwardRef everywhere** — All components forward refs
3. **Styled System props** — Style via props (`px`, `py`, `color`, `bg`), not CSS classes
4. **Color tokens** — Use `colorStyle.color.primary`, `colorStyle.color.secondary`, `colorStyle.color.error`
5. **useDefaultProps** — Components use this for default prop values
6. **displayName** — Always set on components
7. **Named exports** — Barrel files use named `export { X } from './X'` pattern
