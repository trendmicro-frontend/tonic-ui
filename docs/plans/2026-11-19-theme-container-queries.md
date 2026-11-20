# Phase 2: Theme Container Queries Implementation Plan

## Context

Add CSS size-query helpers after [Phase 1: Breakpoints](./2026-11-19-theme-breakpoints.md) merges. The helpers let descendant layout respond to an ancestor container's available width rather than the viewport. Reuse the active theme's `sm/md/lg/xl/2xl` values, which default to `40/48/64/80/96rem` regardless of the theme's dimension-unit argument; use numeric widths in the configured breakpoint unit when content needs another threshold. `xs` is not a breakpoint. Provide only `gte`, `lt`, `between`, and `only`, directly and for named containers. Do not add a separate token scale, shorthand syntax, aliases, or a containment component.

Phase 1 removes responsive style value arrays. Flat style props use named breakpoint objects with `_` for the base; `sx` and `__sx` use explicit viewport media query keys. Arrays passed to `sx` or `__sx` themselves still compose style objects. Apply the same explicit-key pattern to container queries rather than adding property-level responsive syntax.

**Current status:** Phase 1 has a draft PR #1249 that has not merged; its linked plan includes the subsequently approved responsive-value cutover. This plan remains unimplemented; start from `main` only after Phase 1 merges, and recheck its actual merged contract and release gates.

## Findings

- [MUI's guide](https://next.mui.com/material-ui/customization/container-queries/) documents a callable `theme.containerQueries('sidebar')` with methods also available directly on `theme.containerQueries`. MUI's [`cssContainerQueries.ts` and tests](https://github.com/mui/material-ui/tree/master/packages/mui-system/src/cssContainerQueries) derive their methods from `theme.breakpoints`. This plan follows the shared-scale structure, but uses Phase 1's Tonic helper names and exact CSS range syntax instead of MUI's output.
- Use Phase 1's scale for containers. Numeric widths cover narrower layouts without a separate scale, aliases, or shorthand.
- Tonic `packages/styled-system/src/sx.js` passes unknown CSS declarations through and recursively resolves plain-object nested rules. `packages/react-base/src/box/index.js` accepts a theme callback. The existing styling pipeline is suitable for explicit `@container` keys and `containerType`/`containerName`; do not introduce a wrapper component merely to set CSS containment.
- `packages/react/src/theme/createTheme.js` and `packages/theme/src/v3/index.js` assemble the two theme surfaces. The React theme must rebuild helpers from the effective options, before `resolveTheme()` creates its light/dark variants. Docs demos are inline and the docs Playwright runner discovers specs by route.

## Approach

### 1. Adapt Phase 1 queries; do not duplicate boundary logic

Create `packages/utils/src/internal/createContainerQueries.js` and re-export `createContainerQueries` from the same internal barrel as Phase 1 `createBreakpoints`. No equivalent Tonic helper exists. Implement `createContainerQueries(breakpoints: Breakpoints): ContainerQueries` with JSDoc types inferred from the Phase 1 factory. `ContainerQueries` is `((name: string) => ContainerQueryMethods) & ContainerQueryMethods`, where `ContainerQueryMethods` is `Pick<Breakpoints, 'gte' | 'lt' | 'between' | 'only'>`. `Breakpoints` is `ReturnType<typeof createBreakpoints>`; use the same method signatures and validation rather than restating the `Breakpoint` union.

- Each method delegates to the same Phase 1 method. Replace only the leading `@media` with `@container` or `@container ${name}`. Preserve the query expression exactly.
- Named calls take a valid CSS container identifier, without `@`, quotes, or selector syntax; use it as authored. `undefined` or empty name at runtime uses the unnamed prefix. Do not invent a sanitizer or selector parser; callers supply a valid CSS name. Calling the factory result with a name returns a new method object closed over that name, never changes the unnamed methods or other stored named objects, and does not cache names globally.
- `gte`, `lt`, and `between` accept numeric widths in the configured breakpoint unit or a named key. `only` accepts a named key. Missing or unsupported names, an empty scale, and numeric inputs follow Phase 1; no raw length-string support such as `gte('300px')`. Do not add another breakpoint map, unit, boundary offset, or query sorting policy.
- The MUI reference also implements shorthand and sorting; neither is part of this plan. String output alone does not establish which ancestor a browser selects.

| Call with default configuration | Exact result |
| --- | --- |
| `gte('sm')` | `@container (width >= 40rem)` |
| `lt('md')` | `@container (width < 48rem)` |
| `between('sm', 'lg')` | `@container (40rem <= width < 64rem)` |
| `only('md')` | `@container (48rem <= width < 64rem)` |
| `containerQueries('sidebar').gte(18.75)` | `@container sidebar (width >= 18.75rem)` |

### 2. Attach the derived API at the existing theme boundaries

- `packages/theme/src/v3/index.js`: build the Phase 1 `breakpoints` once, assign it to the returned theme, and set `containerQueries: createContainerQueries(breakpoints)`. This reaches the standalone theme package default export and its `createTheme('px'|'rem')` without new public exports. Extend its existing Phase 1 runtime return typing so the callable signature is available to TypeScript through inference.
- `packages/react/src/theme/createTheme.js`: build `containerQueries` from the same immutable breakpoint snapshot exposed on the resolved base, light, and dark themes. Attach the callable before `resolveTheme()`; functions are preserved as leaves. The current merge excludes only `breakpoints` from the standalone theme and merges other incoming scales, so also exclude or discard any pre-existing `containerQueries` from the default and each input before deriving the new callable from the effective options. Only `breakpoints` is configurable; creating an extended theme must not change the original.
- `packages/react/src/theme/createTheme.js` and `useTheme.js`: add `containerQueries: ReturnType<typeof createContainerQueries>` alongside the Phase 1 breakpoint return type, preserving the rest of the theme and avoiding changes to `ThemeScales`. The `resolveTheme()` variants already preserve enumerable function leaves; do not change `ThemeProvider`, color-mode resolution, or the styled-system parser.
- In all Box `sx` callback forms, declare `containerQueries` optional, with the same callable type when present. A bare Box does not install a theme, and JSX cannot infer that even a provider-backed Box callback has a provider; narrow the optional property before calling it in every callback. Keep `createTheme()` and provider-backed `useTheme()` results non-optional; do not add a second scale or a fallback container API.
- In `packages/react/src/theme/utils/css-vars.js` extend the Phase 1 top-level `breakpoints` exclusion to `containerQueries`; neither runtime API is a variable scale and neither emits CSS custom properties. Phase 1's source-backed loader and inventory projection remain authoritative: numeric breakpoint widths retain unambiguous separate rem unit provenance without requiring a particular metadata shape. The callable is not a collectible token; verify output shows no new container token paths. Both the changed theme source and internal utils barrel are fingerprinted, so refresh the implementation snapshot even if all token records are unchanged.
- Check the packed manifests against this phase’s release plan. Theme and React must each require a utils release that exports `createContainerQueries`. Inspect react-base’s emitted Box `.d.ts`: if it references that factory, react-base itself must declare a non-dev dependency on utils with the same minimum capability. A newer utils resolved by React does not satisfy a separate copy resolved by react-base.
- React’s minimum theme and react-base versions must provide the callable API and typed Box callback. In an isolated consumer of the packed artifacts, resolve each dependency at its lowest permitted version without workspace links, hoisting assumptions, or source aliases. Compile the public Box example with `skipLibCheck: false`, then evaluate the direct and named helpers. Do not publish as part of this check.
- Keep Phase 1's reverse-compatibility release gate: check the actual theme/renderer candidates against dependency ranges in already-published consumers of the old breakpoint array contract. If a mixed incompatible graph still resolves, block release. Consumers must also migrate removed responsive style value arrays; the named helper smoke test on an all-new graph does not cover either case.

### 3. Document and exercise explicit `sx` usage

Create `packages/react-docs/pages/theme/container-queries/index.page.mdx` with title `Container queries`, then `## Usage`, `## Named containment contexts`, `## Customizing container queries`, and `## API`. Link to `../breakpoints` for names, configuration, and inclusive lower and exclusive upper boundaries. Include the output table and numeric input rules; `18.75` uses the default rem unit and equals 300px when the relevant root font size is 16px. In a `TonicProvider` child, obtain `const { containerQueries } = useTheme()`. Put `sx={{ containerType: 'inline-size', containerName: 'sidebar' }}` on the ancestor and `sx={{ [containerQueries('sidebar').gte(18.75)]: { display: 'flex' } }}` on its descendant. Names select ancestors, not token sets. Raw `@container` rules need no helper; do not add `@sm`, `@300/sidebar`, property-level shorthand, or automatic sorting.

In the docs, recommend a base style with an `only()` or `between()` override when the same style applies on both sides of a range. When a rule must match only outside a range, show native CSS as an `sx` key: `@container sidebar not (40rem <= width < 48rem)`. Do not expose a `not()` helper.

Container query helpers produce explicit nested rule keys for `sx` or `__sx`; they are not property-level breakpoint objects. A whole-`sx` or `__sx` composition array may still combine objects containing these rules.

- Register `{ title: 'Container queries', path: 'theme/container-queries' }` in `packages/react-docs/config/sidebar-routes.js` after the Theme getting-started link and before `DESIGN TOKENS`. Add `[Container queries](./container-queries)` in the theme overview's References and `[Container queries](../container-queries)` in the Phase 1 breakpoints page's CSS media queries section. Add the matching `/theme/container-queries/` entry and classification to `packages/react-docs/pages/llms.txt` next to `theme/breakpoints`; the existing page coverage checker requires it.
- Add inline demo `packages/react-docs/pages/theme/container-queries/resizing.js` and `{render('./resizing')}` under Usage. Label a Tonic `Input type="number"` with `TextLabel`: `Container width (px)`. Link `htmlFor` to its ID; use `step="any"`, min 200, max 900, initial value 299. Keep the entered text; only finite, nonempty, in-range input changes the applied width. A scrollable `Box` (`sx={{ overflowX: 'auto' }}`) contains `query-sidebar`, an inline-size container named `sidebar` with width `${width}px` and no horizontal padding or border. Its two children are an outer indicator (`query-unnamed-outer`) and a 200px inline-size container named `card` (`query-card-container`). Place the card and remaining indicators inside `card`.
- Show one descendant `query-card` with `display: 'flex'`, default `flexDirection: 'column'`, and `theme.containerQueries('sidebar').gte(18.75)` switching to row. Render two child text blocks to make the layout difference visible. Add text indicators, default `display: 'none'` and shown on match: `query-unnamed` uses `theme.containerQueries.gte(18.75)` (closer width 200, remains hidden); `query-only-sm` uses `theme.containerQueries('sidebar').only('sm')`. Label the conditions and their units in the UI. These are real component styles, not simulated DOM state or injected test styles.
- Use the same unnamed `gte(18.75)` rule on both `query-unnamed-outer` and `query-unnamed`. Label the outer indicator as measuring the sidebar and the inner indicator as measuring the card. The outer indicator changes with the input; the inner one does not. At a root font size of 16px, `18.75rem` is 300px and `only('sm')` is `[640px, 768px)`.

### 4. Synchronize the source-derived token inventory

With explicit authorization to regenerate the implementation inventory, run `rtk node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs` after source changes; compare the regenerated `tokens` array against the Phase 1 base and require identical records (no new container scale). Preserve unambiguous rem unit provenance for the numeric breakpoint widths and emit no breakpoint or container CSS custom properties. Source fingerprints change; review the plugin delivery version and catalog against the Phase 2 base, and obtain separate authorization before any version bump or catalog sync. Leave Figma snapshots and the relation ledger unchanged. Do not run the release updater, publish a plugin, or open a remote PR as part of implementation.

## Verification

### Unit, integration, declarations, and inventory

- New `packages/utils/src/internal/__tests__/createContainerQueries.test.js`: verify the output table, all four direct and named methods with numeric inputs where supported, interleaved stored contexts, preservation of the container name, and unnamed behavior for an empty or undefined name. With `{ sm:40, md:60 }` and unit `em`, `containerQueries('sidebar').only('sm')` returns `@container sidebar (40em <= width < 60em)` and `lt(50)` returns `@container (width < 50em)`. With only `{ lg:600 }` and explicit `unit:'px'`, `only('lg')` returns `@container (width >= 600px)`; with the empty low-level px factory `gte(300)` returns `@container (width >= 300px)` and `only('sm')` throws the Phase 1 `RangeError`. An explicit px custom scale also verifies named and numeric widths in px.
- Extend `packages/theme/src/__tests__/{createTheme,index}.test.js`: verify `containerQueries.gte('sm')` is `@container (width >= 40rem)` on standalone default export and both dimension-unit-argument factory forms, which all use rem breakpoints. Continue comparing token data (excluding both helper properties) and assert callable results separately, not function identity.
- Extend `packages/react/src/theme/__tests__/createTheme.test.js`: default `gte('sm')` uses `40rem`; first define `const defaultTheme = createTheme()`, then `createTheme(defaultTheme, { breakpoints: { values: { sm: 30, md: 50 }, unit: 'rem' } })` yields `containerQueries('sidebar').only('sm') → @container sidebar (30rem <= width < 50rem)`, leaves the original usable, and emits neither `--tonic-breakpoints*` nor `--tonic-containerQueries*` CSS-variable keys while `--tonic-space-1x` remains. With custom numeric px widths, set `unit: 'px'` explicitly. In `useTheme.test.js`, pass these raw breakpoint options unchanged to `TonicProvider` in one case and `createTheme(options)` in the other. Assert that exact named query in both light and dark on both paths. Do not pass raw options through the existing `createWrapper`: it normalizes them before the provider sees them.
- In `packages/react/src/theme/__tests__/{createTheme,useTheme}.test-d.tsx`, direct and named calls return `string`. In `packages/react/src/box/__tests__/Box.test-d.tsx`, compile the documented provider-backed `useTheme()` example and a Box callback guarded by `if (theme.containerQueries)`; a callback inside a provider needs the same guard. Reject unguarded calls in the callback and, after narrowing, invalid `gte('mobile')`, `gte('300px')`, and `only(300)`. Extend `packages/react-base/src/box/__tests__/Box.ssr.test.js` with a no-provider Box callback that selects base styles when `containerQueries` is absent; assert its content and base styles render without a container rule. Use the browser demo for actual query matching.
- Extend `packages/styled-system/src/__tests__/sx.test.js` to exercise explicit container query keys in both a single `sx` object and an `sx` composition array. When the same query appears in multiple composition items, preserve non-conflicting declarations and let later items win for conflicts; do not reintroduce responsive value arrays or implicit query sorting.
- In the base theme and both modes, attempts to change `breakpoints.values.sm` must leave `breakpoints.gte('sm')` and direct/named container `gte('sm')` at the same threshold. Extending via `createTheme()` must update all three for the new theme only. Extend `plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs` to assert unchanged token records, no container paths or CSS variables, retained rem provenance, and a fingerprint for the new factory.

From repo root with workspace dependencies and Chromium already available, rebuild sibling distributions before React's standalone bundle and run the targeted checks:

```sh
rtk yarn build-public
rtk yarn workspace @tonic-ui/utils test --coverage=false --runTestsByPath src/internal/__tests__/createContainerQueries.test.js
rtk yarn workspace @tonic-ui/theme test --coverage=false --runTestsByPath src/__tests__/createTheme.test.js src/__tests__/index.test.js
rtk yarn workspace @tonic-ui/styled-system test --coverage=false --runTestsByPath src/__tests__/sx.test.js
rtk yarn workspace @tonic-ui/react-base test --coverage=false --runTestsByPath src/box/__tests__/Box.ssr.test.js
rtk yarn workspace @tonic-ui/react test --coverage=false --runTestsByPath src/theme/__tests__/createTheme.test.js src/theme/__tests__/useTheme.test.js __tests__/standalone-build.test.js
rtk yarn workspace @tonic-ui/react test:types
rtk node --test plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs
# build-public skips private workspaces. Generate physical MDX before the MCP check.
rtk bash -ec 'cd packages/react-docs && . ./tonic-ui.env && bash ./scripts/update-docs.sh'
PLUGIN_BASE_REF=main VALIDATION_BRANCH=main VALIDATION_MCP=1 rtk yarn validate-ai-tooling
```

### Browser acceptance: change the container, not the viewport

Add `packages/react-docs/test/e2e/pages/theme/container-queries.spec.mjs` (auto-discovered project `theme/container-queries`). Use the real docs page and the width input above. At constant viewport 1920×1000 with a computed root font size of 16px, navigate to `./`, locate the demo within `#main`, and fill the labeled spinbutton with each width. Assert the root font size and that `window.innerWidth` stays equal to its initial 1920 reading; use a retrying bounding-box width assertion to verify actual outer width (tolerance `0.001px`), and check that the nearer named box stays `200px` wide. Check `flex-direction` via `toHaveCSS`, and the indicators via `toBeVisible`/`toBeHidden`. Use representable fractional widths immediately below and above 300px, 640px, and 768px to verify the numeric cutoff and exact inclusive/exclusive `only('sm')` boundaries. No injected CSS, fake geometry, or sleeps.

Assert both unnamed indicators exist before checking visibility: `toBeHidden()` alone also passes for a missing indicator.

| Outer content width (px) | Card direction | Unnamed: sidebar child | Unnamed: card child | `only('sm')` |
| ---: | --- | --- | --- | --- |
| 299 | column | hidden | hidden | hidden |
| 299.984375 | column | hidden | hidden | hidden |
| 300 | row | visible | hidden | hidden |
| 300.015625 | row | visible | hidden | hidden |
| 639.984375 | row | visible | hidden | hidden |
| 640 | row | visible | hidden | visible |
| 640.015625 | row | visible | hidden | visible |
| 767.984375 | row | visible | hidden | visible |
| 768 | row | visible | hidden | hidden |
| 768.015625 | row | visible | hidden | hidden |

Run the existing Phase 1 breakpoint and `getting-started/usage` projects alongside the new project to protect viewport behavior. For screenshots use `test/e2e/screenshots.mjs` `captureColorModes` at 299 and 640 with scenario `container-queries`, cases `narrow` and `wide`; change color mode using the actual header `[title="Toggle color mode"]` and wait for `html[data-color-scheme]`, then set the width using the input and scroll the demo into view. Never call `page.screenshot` directly. Inspect the two width cases for the visible layout switch and non-overlapping controls.

```sh
E2E_SCREENSHOTS=1 rtk yarn test:e2e docs:pages --project theme/breakpoints --project getting-started/usage --project theme/container-queries
```

## Assumptions & contingencies

- Start from `main` after Phase 1 is merged. If Phase 1 is not present, do not duplicate its factory or ship the two changes together; finish Phase 1 first.
- If the Next.js test port is occupied, set `E2E_PAGES_PORT` to a free port. If dependencies or Chromium are unavailable, run reachable checks and report the missing prerequisite, without installing software.
