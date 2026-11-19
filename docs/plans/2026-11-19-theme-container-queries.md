# Phase 2: Theme Container Queries Implementation Plan

## Context

Add CSS size-query helpers after [Phase 1: Breakpoints](./2026-11-19-theme-breakpoints.md) merges. The helpers let descendant layout respond to an ancestor container's available width rather than the viewport. Follow MUI's shared-scale design: named keys use the active theme's `xs/sm/md/lg/xl` values; use numeric widths when content needs another threshold. Do not add a separate token scale, shorthand syntax, or a containment component.

## Findings

- [MUI's guide](https://next.mui.com/material-ui/customization/container-queries/) documents a callable `theme.containerQueries('sidebar')` with the same five methods also available directly on `theme.containerQueries`. MUI's [`cssContainerQueries.ts` and tests](https://github.com/mui/material-ui/tree/master/packages/mui-system/src/cssContainerQueries), verified against the local reference checkout, derive all methods from `theme.breakpoints`. Use the actual implementation and tests for exact output; the guide's abbreviated API examples do not show the real epsilon results.
- Use Phase 1's scale for containers. Numeric widths cover narrower layouts without a separate scale, aliases, or shorthand.
- Tonic `packages/styled-system/src/sx.js` passes unknown CSS declarations through and recursively resolves plain-object nested rules. `packages/react-base/src/box/Box.js` accepts a theme callback. The existing styling pipeline is suitable for explicit `@container` keys and `containerType`/`containerName`; do not introduce a wrapper component merely to set CSS containment.
- `packages/react/src/theme/createTheme.js` and `packages/theme/src/v3/index.js` assemble the two theme surfaces. The React theme must rebuild helpers from the effective options, before `resolveTheme()` creates its light/dark variants. Docs demos are inline and the docs Playwright runner discovers specs by route.

## Approach

### 1. Adapt Phase 1 queries; do not duplicate boundary logic

Create `packages/utils/src/internal/createContainerQueries.js` and re-export `createContainerQueries` from the same internal barrel as Phase 1 `createBreakpoints`. No equivalent Tonic helper exists. Implement `createContainerQueries(breakpoints: Breakpoints): ContainerQueries` with JSDoc types inferred from the Phase 1 factory. `ContainerQueries` is `((name: string) => ContainerQueryMethods) & ContainerQueryMethods`, where `ContainerQueryMethods` is `Pick<Breakpoints, 'up' | 'down' | 'only' | 'not' | 'between'>`. `Breakpoints` is `ReturnType<typeof createBreakpoints>`; use the same method signatures and validation rather than restating the `Breakpoint` union.

- Each method delegates to the same Phase 1 method. For normal results replace the leading `@media` with `@container` or `@container ${name}`. Named calls take a valid CSS container identifier, without `@`, quotes, or selector syntax; use it as authored. `undefined` or empty name at runtime uses the unnamed prefix, matching MUI. Do not invent a sanitizer or selector parser; callers supply a valid CSS name. Calling the factory result with a name returns a new method object closed over that name, never changes the unnamed methods or other stored named objects, and does not cache names globally.
- Only a middle key produces `@media not all and ...`. Strip that prefix, replace `min-width:` with `width<`, `max-width:` with `width>`, and `) and (` with `) or (`. Add the container prefix and name last, preserving identifiers such as `landing`. For the first key with a successor, translate `up(next)` even when the first width is nonzero. Last and singleton keys translate `down(key)`; do not recalculate bounds or epsilon.
- `up/down/between` accept numeric widths in the configured breakpoint unit or a named key. `only/not` take named keys. Missing or unsupported names, an empty scale, and numeric inputs follow Phase 1; no raw length-string support such as `up('300px')`. Do not add another `step`, `unit`, breakpoint map, or query sorting policy.
- Reference check: the local [MUI factory and tests](https://github.com/mui/material-ui/tree/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/cssContainerQueries) distinguish direct and named calls. Running the factory returned `@container (min-width:300px)` for `up(300)` and `@container landing (width<600px) or (width>899.95px)` for `containerQueries('landing').not('sm')`. MUI also implements shorthand and sorting; neither is part of this plan. String output alone does not establish which ancestor a browser selects.

| Call with default configuration | Exact result |
| --- | --- |
| `up('sm')` | `@container (min-width:600px)` |
| `down('md')` | `@container (max-width:899.95px)` |
| `between('sm', 'lg')` | `@container (min-width:600px) and (max-width:1199.95px)` |
| `only('md')` | `@container (min-width:900px) and (max-width:1199.95px)` |
| `not('md')` | `@container (width<900px) or (width>1199.95px)` |
| `not('xs')` | `@container (min-width:600px)` |
| `not('xl')` | `@container (max-width:1535.95px)` |
| `containerQueries('sidebar').up(300)` | `@container sidebar (min-width:300px)` |

### 2. Attach the derived API at the existing theme boundaries

- `packages/theme/src/v3/index.js`: build the Phase 1 `breakpoints` once, assign it to the returned theme, and set `containerQueries: createContainerQueries(breakpoints)`. This reaches the standalone theme package default export and its `createTheme('px'|'rem')` without new public exports. Extend its existing Phase 1 runtime return typing so the callable signature is available to TypeScript through inference.
- `packages/react/src/theme/createTheme.js`: build `containerQueries` from the same immutable breakpoint snapshot exposed on the resolved base, light, and dark themes. Attach the callable before `resolveTheme()`; functions are preserved as leaves. Ignore an input theme’s old callable and derive a new one from the effective options. Only `breakpoints` is configurable; creating an extended theme must not change the original.
- `packages/react/src/theme/createTheme.js` and `useTheme.js`: add `containerQueries: ReturnType<typeof createContainerQueries>` alongside the Phase 1 breakpoint return type, preserving the rest of the theme and avoiding changes to `ThemeScales`. The `resolveTheme()` variants already preserve enumerable function leaves; do not change `ThemeProvider`, color-mode resolution, or the styled-system parser.
- In all Box `sx` callback forms, declare `containerQueries` optional, with the same callable type when present. A bare Box does not install a theme. Keep `createTheme()` and provider-backed `useTheme()` results non-optional; do not add a second scale or a fallback container API.
- In `packages/react/src/theme/utils/css-vars.js` extend the Phase 1 top-level `breakpoints` exclusion to `containerQueries`; neither runtime API is a variable scale. Phase 1's source-backed loader and inventory projection remain authoritative. The callable is not a collectible token; verify output shows no new container token paths. Both the changed theme source and internal utils barrel are fingerprinted, so refresh the implementation snapshot even if all token records are unchanged.
- Check the packed manifests against this phase’s release plan. Theme and React must each require a utils release that exports `createContainerQueries`. Inspect react-base’s emitted Box `.d.ts`: if it references that factory, react-base itself must declare a non-dev dependency on utils with the same minimum capability. A newer utils resolved by React does not satisfy a separate copy resolved by react-base.
- React’s minimum theme and react-base versions must provide the callable API and typed Box callback. In an isolated consumer of the packed artifacts, resolve each dependency at its lowest permitted version without workspace links, hoisting assumptions, or source aliases. Compile the public Box example with `skipLibCheck: false`, then evaluate the direct and named helpers. Do not publish as part of this check.
- Keep Phase 1's reverse-compatibility release gate: check the actual theme/renderer candidates against dependency ranges in already-published array consumers. If a mixed incompatible graph still resolves, block release. The named helper smoke test on an all-new graph does not cover this case.

### 3. Document and exercise explicit `sx` usage

Create `packages/react-docs/pages/theme/container-queries/index.page.mdx` with title `Container queries`, then `## Usage`, `## Named containment contexts`, `## Customizing container queries`, and `## API`. Link to `../breakpoints` for names, configuration, and epsilon. Include the output table and numeric input rules. In a `TonicProvider` child, obtain `const { containerQueries } = useTheme()`. Put `sx={{ containerType: 'inline-size', containerName: 'sidebar' }}` on the ancestor and `sx={{ [containerQueries('sidebar').up(300)]: { display: 'flex' } }}` on its descendant. Names select ancestors, not token sets. Raw `@container` rules need no helper; do not add `@sm`, `@300/sidebar`, property-level shorthand, or automatic sorting.

- Register `{ title: 'Container queries', path: 'theme/container-queries' }` in `packages/react-docs/config/sidebar-routes.js` after the Theme getting-started link and before `DESIGN TOKENS`. Add `[Container queries](./container-queries)` in the theme overview's References and `[Container queries](../container-queries)` in the Phase 1 breakpoints page's CSS media queries section. Add the matching `/theme/container-queries/` entry and classification to `packages/react-docs/pages/llms.txt` next to `theme/breakpoints`; the existing page coverage checker requires it.
- Add inline demo `packages/react-docs/pages/theme/container-queries/resizing.js` and `{render('./resizing')}` under Usage. Label a Tonic `Input type="number"` with `TextLabel`: `Container width (px)`. Link `htmlFor` to its ID; use `step="any"`, min 200, max 950, initial value 299. Keep the entered text; only finite, nonempty, in-range input changes the applied width. A scrollable `Box` (`sx={{ overflowX: 'auto' }}`) contains `query-sidebar`, an inline-size container named `sidebar` with width `${width}px` and no horizontal padding or border. Its two children are an outer indicator (`query-unnamed-outer`) and a 200px inline-size container named `card` (`query-card-container`). Place the card and remaining indicators inside `card`.
- Show one descendant `query-card` with `display: 'flex'`, default `flexDirection: 'column'`, and `theme.containerQueries('sidebar').up(300)` switching to row. Render two child text blocks to make the layout difference visible. Add text indicators, default `display: 'none'` and shown on match: `query-unnamed` uses `theme.containerQueries.up(300)` (closer width 200, remains hidden); `query-only-sm` uses `theme.containerQueries('sidebar').only('sm')`; `query-not-sm` uses the corresponding `not('sm')`. Label the conditions in the UI. These are real component styles, not simulated DOM state or injected test styles.
- Use the same unnamed `up(300)` rule on both `query-unnamed-outer` and `query-unnamed`. Label the outer indicator as measuring the sidebar and the inner indicator as measuring the card. The outer indicator changes with the input; the inner one does not.

### 4. Synchronize the source-derived token inventory

Run `rtk node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs` after source changes; compare the regenerated `tokens` array against the Phase 1 base and require identical records (no new container scale). Source fingerprints change, so increment exactly the patch component of `plugins/tonic-ui-tokens/.claude-plugin/plugin.json` relative to the Phase 2 base and run `rtk node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write`. Leave Figma snapshots and the relation ledger unchanged. Do not run the release updater, publish a plugin, or open a remote PR as part of implementation.

## Verification

### Unit, integration, declarations, and inventory

- New `packages/utils/src/internal/__tests__/createContainerQueries.test.js`: verify the output table, all named methods, interleaved stored contexts, and `landing.not('md')` preserving the name. With `{ sm:40, md:60 }`, unit `em`, step `10`, the first key gives `not('sm') → @container sidebar (min-width:60em)` and `down(50) → @container (max-width:49.9em)`. Keep the default middle-key `not('md')` inversion test separate. With only `lg:600`, `not('lg') → @container (max-width:599.95px)`; with empty values `up(300) → @container (min-width:300px)` and `only('sm')` throws the Phase 1 `RangeError`.
- Extend `packages/theme/src/__tests__/{createTheme,index}.test.js`: verify `containerQueries.up('sm')` on standalone default export and both unit-argument factory forms, which all use px breakpoints. Continue comparing token data (excluding both helper properties) and assert callable results separately, not function identity.
- Extend `packages/react/src/theme/__tests__/createTheme.test.js`: default `up('sm')` uses `600px`; `createTheme(defaultTheme, { breakpoints: { values: { xs: 0, sm: 30, md: 50 }, unit: 'rem', step: 10 } })` yields `containerQueries('sidebar').only('sm') → @container sidebar (min-width:30rem) and (max-width:49.9rem)`, leaves the original usable, and emits neither `--tonic-breakpoints*` nor `--tonic-containerQueries*` CSS-variable keys while `--tonic-space-1x` remains. In `useTheme.test.js`, pass these raw breakpoint options unchanged to `TonicProvider` in one case and `createTheme(options)` in the other. Assert that exact named query in both light and dark on both paths. Do not pass raw options through the existing `createWrapper`: it normalizes them before the provider sees them.
- In `packages/react/src/theme/__tests__/{createTheme,useTheme}.test-d.tsx`, direct and named calls return `string`. In `packages/react/src/box/__tests__/Box.test-d.tsx`, compile the documented provider-backed example and a bare Box callback guarded by `if (theme.containerQueries)`. Reject unguarded calls in the callback and, after narrowing, invalid `up('mobile')`, `up('300px')`, and `only(300)`. Without a provider, SSR a Box whose callback selects base styles when `containerQueries` is absent; assert its content and base styles render without a container rule. Use the browser demo for actual query matching.
- In the base theme and both modes, attempts to change `breakpoints.values.sm` must leave `breakpoints.up('sm')` and direct/named container `up('sm')` at the same threshold. Extending via `createTheme()` must update all three for the new theme only.

From repo root with workspace dependencies and Chromium already available, rebuild sibling distributions before React's standalone bundle and run the targeted checks:

```sh
rtk yarn build-public
rtk yarn workspace @tonic-ui/utils test --coverage=false --runTestsByPath src/internal/__tests__/createContainerQueries.test.js
rtk yarn workspace @tonic-ui/theme test --coverage=false --runTestsByPath src/__tests__/createTheme.test.js src/__tests__/index.test.js
rtk yarn workspace @tonic-ui/react test --coverage=false --runTestsByPath src/theme/__tests__/createTheme.test.js src/theme/__tests__/useTheme.test.js __tests__/standalone-build.test.js
rtk yarn workspace @tonic-ui/react test:types
# build-public skips private workspaces. Generate physical MDX before the MCP check.
rtk bash -ec 'cd packages/react-docs && . ./tonic-ui.env && bash ./scripts/update-docs.sh'
PLUGIN_BASE_REF=main VALIDATION_BRANCH=main VALIDATION_MCP=1 rtk yarn validate-ai-tooling
```

### Browser acceptance: change the container, not the viewport

Add `packages/react-docs/test/e2e/pages/theme/container-queries.spec.mjs` (auto-discovered project `theme/container-queries`). Use the real docs page and the width input above. At constant viewport 1920×1000, navigate to `./`, locate the demo within `#main`, and fill the labeled spinbutton with each width. Assert `window.innerWidth` stays equal to its initial 1920 reading; use a retrying bounding-box width assertion to verify actual outer width (tolerance `0.001px`), and check that the nearer named box stays `200px` wide. Check `flex-direction` via `toHaveCSS`, and the indicators via `toBeVisible`/`toBeHidden`. Use the exact representable fractional widths below to straddle the upper epsilon. No injected CSS, fake geometry, or sleeps.

Assert both unnamed indicators exist before checking visibility: `toBeHidden()` alone also passes for a missing indicator.

| Outer content width (px) | Card direction | Unnamed: sidebar child | Unnamed: card child | `only('sm')` | `not('sm')` |
| ---: | --- | --- | --- | --- | --- |
| 299 | column | hidden | hidden | hidden | visible |
| 300 | row | visible | hidden | hidden | visible |
| 599 | row | visible | hidden | hidden | visible |
| 600 | row | visible | hidden | visible | hidden |
| 899.9375 | row | visible | hidden | visible | hidden |
| 899.96875 | row | visible | hidden | hidden | visible |
| 900 | row | visible | hidden | hidden | visible |

Run the existing Phase 1 breakpoint project alongside the new project to protect viewport behavior. For screenshots use `test/e2e/screenshots.mjs` `captureColorModes` at 299 and 600 with scenario `container-queries`, cases `narrow` and `wide`; change color mode using the actual header `[title="Toggle color mode"]` and wait for `html[data-color-scheme]`, then set the width using the input and scroll the demo into view. Never call `page.screenshot` directly. Inspect the two width cases for the visible layout switch and non-overlapping controls.

```sh
E2E_SCREENSHOTS=1 rtk yarn test:e2e docs:pages --project theme/breakpoints --project theme/container-queries
```

## Assumptions & contingencies

- Start from `main` after Phase 1 is merged. If Phase 1 is not present, do not duplicate its factory or ship the two changes together; finish Phase 1 first.
- If the Next.js test port is occupied, set `E2E_PAGES_PORT` to a free port. If dependencies or Chromium are unavailable, run reachable checks and report the missing prerequisite, without installing software.
