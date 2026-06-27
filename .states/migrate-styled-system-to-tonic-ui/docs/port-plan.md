# Engine-Port Plan: tonic-one → tonic-ui

Maker/checker brief for the execution workflow. Units are ordered so each unit's
dependencies land first. Each unit lists SOURCE→TARGET files, the exact change,
the "done when" verify command, and upstream dependencies.

Repos:
- SRC root: `/home/cheton/Code/trend-common-platform/tonic-one`
- DST root: `/home/cheton/Code/trendmicro-frontend/tonic-ui`

Dependency spine (must land in order):
`U2 (utils) → U3 (createTheme/css-vars) → {U4 useTheme, U5 getter} → U6 (Box) → U7 (CSSVariables) → U8 (Theme/TonicProvider) → U9..U11 (color-mode)`

---

## U2 — Shared `resolveTheme` + `toCSSVariable` in `@tonic-ui/utils`

**Depends on:** none (substrate root).

**SOURCE**
- `packages/utils/src/internal/resolveTheme.js`
- `packages/utils/src/internal/toCSSVariable.js`
- `packages/utils/src/internal/index.js`

**TARGET**
- `packages/utils/src/resolveTheme.js` (new, flat — no `internal/` subpath in tonic-ui)
- `packages/utils/src/toCSSVariable.js` (new, flat)
- `packages/utils/src/index.js` — add `export * from './resolveTheme'; export * from './toCSSVariable';`

**Change**
- Land both files flat in `src/` (tonic-ui has no `./internal` export in `packages/utils/package.json`).
- Delete the two ad-hoc local copies of `toCSSVariable`:
  - `packages/react/src/theme/utils/css-vars.js` (local copy — replaced in U3)
  - `packages/styled-system/src/transforms/getter.js` (local copy — replaced in U5)
- The tonic-one `toCSSVariable` semantics **must win**: preserve hyphens, map colons/spaces to underscores (NOT tonic-ui's "all non-alphanumeric → hyphen"). This matches the `-dark`/`-light` suffix convention emitted by `mapThemeToCSSVariables`.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/utils && yarn test --testPathPattern="resolveTheme|toCSSVariable"
```

---

## U3 — `createTheme` + `mapThemeToCSSVariables`

**Depends on:** U2 (imports `resolveTheme` and shared `toCSSVariable`).

**SOURCE**
- `packages/react/src/theme/createTheme.js`
- `packages/react/src/theme/utils/css-vars.js`

**TARGET**
- `packages/react/src/theme/createTheme.js`
- `packages/react/src/theme/utils/css-vars.js`

**Change (createTheme)**
- `import { resolveTheme } from '@tonic-ui/utils'`.
- Call `resolveTheme(theme)` unconditionally after the merge (returns resolved object carrying `toColorMode`).
- Always run `mapThemeToCSSVariables` — remove the `if (cssVariableConfig)` guard (keep only a boolean-compat warning).
- Use `Object.defineProperties`: non-enumerable `TONIC_THEME` sentinel; enumerable `cssVariablePrefix` / `cssVariables` / `rootSelector`.
- Freeze the `cssVariables` map.
- Change `cssVariables: false` default to `{}`.

**Change (css-vars / mapThemeToCSSVariables)**
- Replace `flatten()` + the local `toCSSVariable` copy with `processColorModeTokens`.
- `processColorModeTokens` detects `_dark`/`_light` pairs and emits `<path>-dark` / `<path>-light` siblings plus a base `var(<path>-light)` default. This is the mechanism `CSSVariables.js` (U7) depends on.
- Import `toCSSVariable` from `@tonic-ui/utils`.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="createTheme"
```

---

## U4 — `useTheme` (color-mode-resolving wrapper)

**Depends on:** U3 (relies on `theme.toColorMode` produced by `resolveTheme`).

**SOURCE**
- `packages/react/src/theme/useTheme.js`

**TARGET**
- `packages/react/src/theme/useTheme.js`

**Change**
- Replace the bare Emotion `useTheme` re-export with the wrapping version: read `ColorModeContext`, resolve current `colorMode`, return `theme.toColorMode(colorMode)` so consumers get a pre-resolved, flattened theme with `get()`.
- Import `ColorModeContext` from tonic-ui's `'../color-mode/context'` (NOT the react-base `./internal` subpath — tonic-ui keeps it in `packages/react/src/color-mode/context.js`).

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="useTheme"
```

---

## U5 — styled-system `getter`

**Depends on:** U2 (shared `toCSSVariable`). Parallel-safe with U4.

**SOURCE**
- `packages/styled-system/src/transforms/getter.js`

**TARGET**
- `packages/styled-system/src/transforms/getter.js`

**Change** — adopt all three additions:
1. Gatekeeper: if `_dark`/`_light`/`main`/`value` are all absent on the object, return the raw value.
2. Priority 1 (CSS-var path): gate on `theme.useCSSVariables` (not just `cssVariables` presence); pass through `var(--…)` aliases; unwrap `_dark`/`_light` to use `_light` as the literal for string replacement.
3. Priority 2 (non-CSS-var path): read `options?.props?.__colorMode` (injected by Box in U6) to pick `_dark` vs `_light`, then fall back to `main`, then `value`.
- Import `toCSSVariable` from `@tonic-ui/utils` (drop inline copy).

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/styled-system && yarn test --testPathPattern="getter"
```

---

## U6 — `react-base/box` (`__colorMode` injection)

**Depends on:** U5 (getter reads `options.props.__colorMode`).

**SOURCE**
- `packages/react-base/src/box/index.js`
- `packages/react-base/src/box/Box.js`

**TARGET**
- `packages/react-base/src/internal/color-mode/context.js` (new — copy from source; keeps react-base off a `react` dep)
- `packages/react-base/package.json` — add `./internal` subpath export
- `packages/react-base/src/box/index.js`
- `packages/react-base/src/box/Box.js`

**Change**
- `Box.js`: add `__colorMode: true` to `omittedStylePropMap` so it never reaches the DOM.
- `index.js`: convert passthrough to the wrapping `forwardRef` pattern — read `ColorModeContext` from `./internal/color-mode/context`, inject `__colorMode={context.colorMode}` so the styled-system getter can read it.
- Note: react-base must NOT import from `react` (peer). The internal context copy resolves this.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react-base && yarn test --testPathPattern="Box"
```

---

## U7 — `CSSVariables` (color-scheme switching layer)

**Depends on:** U3 (consumes `-dark`/`-light` keys in `theme.cssVariables`).

**SOURCE**
- `packages/react/src/css-variables/CSSVariables.js`

**TARGET**
- `packages/react/src/theme/CSSVariables.js`

**Change** — full replace with tonic-one's implementation:
- Detect paired `-dark`/`-light` keys in `theme.cssVariables`.
- Exclude the base alias variable from the `:root` block.
- Emit two extra rules:
  - `[data-color-scheme="dark"] { <base>: var(<base>-dark) }`
  - `[data-color-scheme="light"] { <base>: var(<base>-light) }`
- This is the switching layer that responds to `data-color-scheme` set by U9–U11.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="CSSVariables"
```

---

## U8 — `ThemeProvider` + `TonicProvider` (`useCSSVariables` threading)

**Depends on:** U3 (`createTheme` / `TONIC_THEME` sentinel), U7 (`CSSVariables` render site).

**SOURCE**
- `packages/react/src/theme/ThemeProvider.js`
- `packages/react/src/provider/TonicProvider.js`

**TARGET**
- `packages/react/src/theme/ThemeProvider.js`
- `packages/react/src/provider/TonicProvider.js`

**Change (ThemeProvider)**
- Add `useCSSVariables` prop; build `{ ...baseTheme, useCSSVariables }` in a `useMemo` (so the getter's `theme.useCSSVariables` gate works).
- Remove the unconditional `<CSSVariables />` render from ThemeProvider (it moves to TonicProvider).
- Add `TONIC_THEME`-guarded fallback: pass through an already-created theme, else `createTheme`.

**Change (TonicProvider)**
- Add `useCSSVariables = false` prop; thread to `<ThemeProvider useCSSVariables={useCSSVariables}>`.
- Conditionally render `<CSSVariables />` before `ColorModeProvider`.
- Use `useOnceWhen` guards for prop validation.
- Import `CSSVariables` from its U7 landing path (`'../theme/CSSVariables'` / `'../css-variables'`).

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="TonicProvider|ThemeProvider"
```

---

## U9 — `DarkMode` (`data-color-scheme="dark"`)

**Depends on:** U7 (selectors target this attribute). Parallel-safe with U10, U11.

**SOURCE** `packages/react/src/color-mode/DarkMode.js`
**TARGET** `packages/react/src/color-mode/DarkMode.js`

**Change** — add `data-color-scheme="dark"` prop on the rendered `Box` (keep existing `colorScheme`).

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="DarkMode"
```

---

## U10 — `LightMode` (`data-color-scheme="light"`)

**Depends on:** U7. Parallel-safe with U9, U11.

**SOURCE** `packages/react/src/color-mode/LightMode.js`
**TARGET** `packages/react/src/color-mode/LightMode.js`

**Change** — add `data-color-scheme="light"` prop on the rendered `Box`.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="LightMode"
```

---

## U11 — `InvertedMode` (`data-color-scheme={invertedColorMode}`)

**Depends on:** U7. Parallel-safe with U9, U10.

**SOURCE** `packages/react/src/color-mode/InvertedMode.js`
**TARGET** `packages/react/src/color-mode/InvertedMode.js`

**Change** — add `data-color-scheme={invertedColorMode}` prop on the rendered `Box`.

**Done when**
```
cd /home/cheton/Code/trendmicro-frontend/tonic-ui/packages/react && yarn test --testPathPattern="InvertedMode"
```

---

## Cross-unit risks

- **Shared substrate (U2):** `toCSSVariable` semantics are load-bearing for the whole chain. Wrong separator handling silently breaks `-dark`/`-light` matching in U3/U7 with green unit tests but broken switching. Verify the tonic-one variant wins.
- **react-base must stay react-free (U6):** importing `ColorModeContext` from `packages/react` would create a peer-dep cycle. The `internal/color-mode/context` copy + `./internal` package export is mandatory, not optional.
- **Snapshot churn:** U6 (`__colorMode` omitted from DOM but altering style resolution), U7 (new `:root` + `[data-color-scheme]` blocks), and U8 (CSSVariables render-site move) will regenerate Emotion/CSS snapshots across many `packages/react` component tests beyond the targeted files — review snapshot diffs repo-wide, don't auto-`-u` blindly.
- **Getter gate coupling (U5↔U8):** the Priority-1 path gates on `theme.useCSSVariables`, which only exists after U8 injects it. Until U8 lands, CSS-var resolution stays inert (Priority-2 path), which is the intended interim state.
- **Ordering hazard:** U6 before U5 would leave the getter reading an undefined `__colorMode`; U8 before U7 would import a missing `CSSVariables`. Keep the spine ordering.
