# v2 → v3 upgrade rules

Rule groups for a consuming-app migration to Tonic UI v3. Each rule states its **classification**, the **evidence** in this repository, and how to **verify** it.

Evidence paths are relative to the Tonic UI repository root. `packages/react/src/...` are the target-version sources; read them at the target revision, not from memory.

Classifications: **NEC** necessary · **DEP** deprecated but still supported · **OPT** optional adoption · **MAN** manual decision. See [SKILL.md](SKILL.md).

---

## P. Packages and peer versions

**P1 · Bump `@tonic-ui/react` to the exact intended target — NEC.**
The target is a specific version, not "v3.x" and not "latest". The repository's current manifests are `3.0.0-alpha.1`; the public migration guide still says `3.0.0-alpha.0` in its package updates and checklist. That is a **guide-versus-manifest source conflict**: resolve the app's target from the package metadata the app will install, and report which figure was used. Set it in `package.json` and update the lockfile.
Evidence: `packages/react/package.json` `version`; `packages/react-docs/pages/migrations/migrating-from-v2-to-v3/index.page.mdx`, "Package updates".

**P2 · Resolve every other `@tonic-ui/*` package's version from its own peer metadata — NEC, version per package.**
Versions are not guaranteed identical across packages. At the repository's current `3.0.0-alpha.1` release line:

| Package | Version | Relevant peer requirements |
| --- | --- | --- |
| `@tonic-ui/react` | 3.0.0-alpha.1 | `@emotion/react` `^11.0.0`, `@emotion/styled` `^11.0.0`, `react`/`react-dom` `^18.3.0 \|\| ^19.0.0` |
| `@tonic-ui/react-base` | 3.0.0-alpha.1 | `@emotion/react` `^11.0.0`, `@emotion/styled` `^11.0.0`, `react`/`react-dom` `^18.3.0 \|\| ^19.0.0` |
| `@tonic-ui/react-hooks` | 3.0.0-alpha.1 | `react` `^18.3.0 \|\| ^19.0.0` |
| `@tonic-ui/react-icons` | 3.0.0-alpha.1 | `react`/`react-dom` `^18.3.0 \|\| ^19.0.0` |
| `@tonic-ui/styled-system` | 3.0.0-alpha.1 | — |
| `@tonic-ui/theme` | 3.0.0-alpha.1 | — |
| `@tonic-ui/utils` | 3.0.0-alpha.1 | — |

The `@tonic-ui/react` manifest depends on the sibling packages with `^3.0.0-alpha.1` ranges, so the package manager normally aligns them; still resolve each package from its own manifest rather than assuming a single global version. There is **no** `@tonic-ui/react-data-grid` or chart package in this repository (see group D).
Evidence: each `packages/*/package.json`.

**P3 · Do not apply a universal prerelease pin — NEC (avoid).**
There is no evidence for "pin every package to one beta/alpha suffix". Prerelease suffixes across different packages do not by themselves establish compatibility, and a blanket pin can contradict a later intended target. Resolve per package, then let the package manager dedupe.

**P4 · Align Emotion — check the peer and the guide.**
The manifest peer range is `^11.0.0` (`packages/react/package.json`, `packages/react-base/package.json`), and the migration guide also says to install `@emotion/react@^11.0.0` / `@emotion/styled@^11.0.0`. They agree here. Practical guidance: install a single `@emotion/react` / `@emotion/styled` major and confirm `npm ls @emotion/react` shows no duplicates, since duplicate Emotion instances break context/theme. Classification: **NEC if the app resolves multiple Emotion majors; otherwise OPT once verified.**

**P5 · Every legacy token must be rewritten before upgrading — false.** See group T; v2 tokens remain supported. Not a prerequisite.

---

## S. Provider and global CSS setup

**S1 · `TonicProvider` prop names are case-sensitive — NEC only when the old spellings are used.**
`TonicProvider` accepts `colorMode`, `colorStyle`, `environment`, `theme`, `useCSSBaseline`, `useCSSVariables` (`packages/react/src/provider/TonicProvider.js`). An existing provider otherwise keeps working. The misspelled `useCssBaseline` / `useCssVariables` props are ignored with a dev-only `console.error` telling the app to use the correct casing; if the app relied on them, it must rename them or lose the behavior. Evidence: `packages/react/src/provider/TonicProvider.js`; guide, "Prop names are case-sensitive".

**S2 · `useCSSBaseline` / `useCSSVariables` are for standalone apps only — MAN.**
The migration guide marks both "intended for standalone applications only"; in a widget sharing another app's document, leave them off to avoid clashing with the host's global styles and CSS variables. Classification: **MAN** (scope decision), not NEC.

**S3 · With `useCSSVariables`, set `data-color-scheme` on the root — NEC when the app enables CSS variables.**
`CSSVariables` emits `[data-color-scheme="dark"]` / `[data-color-scheme="light"]` rules (`packages/react/src/css-variables/CSSVariables.js`). Without the attribute, mode-specific variables do not resolve. Set it on `document.documentElement`, or on the shadow host for shadow DOM (`.../css-theme-variables/index.page.mdx`).

**S4 · `createTheme({ cssVariables })` no longer accepts a boolean — NEC when the app relied on `true`.**
`createTheme()` now always generates the CSS-variable map. A boolean emits a warning and no longer enables or disables anything; runtime enablement is `TonicProvider`'s `useCSSVariables` prop. Move the opt-in to the provider. Passing a configuration object (`{ prefix, rootSelector }`) is still supported. Evidence: `packages/react/src/theme/createTheme.js`; guide, "CSS theme variables".

**S5 · Keep the theme object stable — MAN (performance).**
Create the theme once with `createTheme()` and pass a stable reference. v3 warns in development when the theme was not created with `createTheme()` and would re-run theme creation on every render. Evidence: `packages/react/src/provider/TonicProvider.js`; guide, "Pass a stable theme".

**S6 · Global-style token indexing must be checked — NEC when flat indexing receives semantic paths.**
v2 globally spread `colorStyle.color.*` and indexed a flat `colors` map, e.g. `colors[colorStyle.color.disabled]`. The v3 default `colorStyle.color.disabled` now holds the semantic path `"text.disabled"` (`packages/react/src/color-style/color-style.js`), and semantic colors nest (`packages/theme/src/v3/semantic/colors/index.js`); the resolver preserves that nesting (`packages/utils/src/internal/resolveTheme.js`). So old flat indexing can silently yield `undefined` and drop CSS — check each global style, then resolve by path with `useTheme().get('colors.text.disabled')` or `theme.get('fontSizes.sm')` (`.../migrating-from-v2-to-v3/index.page.mdx`). Keeping the legacy v2 token key itself is optional; the resolution expression is the functional risk.

**S7 · Scope global CSS deliberately — MAN.**
`Global` styles from a widget can leak into the host document. Decide per app: standalone (own CSS baseline, variables, root attribute) vs. embedded widget (none of them). Not a compile requirement either way.

**S8 · React and React DOM versions — NEC.**
v3 requires `react` / `react-dom` `^18.3.0 || ^19.0.0` (manifest and guide). If the app is on React 16, 17, or 18.0–18.2, upgrade React before adopting v3. Evidence: `packages/react/package.json`; guide, "React version".

---

## C. slots / slotProps (replacing `*Component` / `*Props`)

**C1 · The `*Component` / `*Props` pairs are deprecated but still work — DEP.**
Every component in the table destructures the legacy prop, still renders, and — when the deprecated prop is actually set, and outside production — routes its warning through a `useOnceWhen(() => warnDeprecatedProps(..., { willRemove: true }))` callsite, so a given mounted instance warns at most once for that prop. The single-fire behavior belongs to those callsites, not to `warnDeprecatedProps` itself: a deprecated API with no `warnDeprecatedProps` call (see group X, `SubmenuToggle`) emits nothing. Source-verified component → deprecated props:

| Component (source) | Deprecated props | Replacement |
| --- | --- | --- |
| `accordion/AccordionContent.js` | `TransitionComponent`, `TransitionProps` | `slots.transition`, `slotProps.transition` |
| `autocomplete/AutocompleteList.js` | `PopperComponent`, `PopperProps`, `TransitionComponent`, `TransitionProps` | `slots.popper` / `slotProps.popper`, `slots.transition` / `slotProps.transition` |
| `date-pickers/DatePicker/DatePickerContent.js` | `PopperComponent`, `PopperProps`, `TransitionComponent`, `TransitionProps` | as above |
| `drawer/DrawerContent.js`, `drawer/DrawerOverlay.js` | `TransitionComponent`, `TransitionProps` | `slots.transition` / `slotProps.transition` |
| `input/InputControl.js` | `inputComponent`, `inputProps` | `slots.input` / `slotProps.input` |
| `menu/MenuContent.js`, `menu/SubmenuContent.js` | `PopperComponent`, `PopperProps`, `TransitionComponent`, `TransitionProps` | as above |
| `modal/ModalContent.js`, `modal/ModalOverlay.js` | `TransitionComponent`, `TransitionProps` | `slots.transition` / `slotProps.transition` |
| `popover/PopoverContent.js` | `PopperComponent`, `PopperProps`, `TransitionComponent`, `TransitionProps`, `PopoverArrowComponent`, `PopoverArrowProps` | `slots.popper`, `slots.transition`, `slots.arrow` (+ `slotProps.*`) |
| `toast/ToastManager.js` | `TransitionComponent`, `TransitionProps` | `slots.transition` / `slotProps.transition` |
| `tooltip/TooltipContent.js` | `PopperComponent`, `PopperProps`, `TooltipArrowComponent`, `TooltipArrowProps`, `TransitionComponent`, `TransitionProps` | `slots.popper`, `slots.arrow`, `slots.transition` (+ `slotProps.*`) |
| `tree/TreeItem.js` | `TransitionComponent`, `TransitionProps` | `slots.transition` / `slotProps.transition` |

The public guide specifically calls out `AutocompleteList`; the rest of the table is source evidence and should be treated as such.

**C2 · Legacy and slot props are merged, slot wins — NEC to understand before editing.**
`MenuContent` builds `slotProps: { ...PopperProps, ...slotProps.popper }` (`packages/react/src/menu/MenuContent.js`); other components fold the deprecated prop under the new one the same way. So migration can be incremental — set the new prop without losing the old behavior. Do not delete an existing `*Props` blindly.

**C3 · New-only slots (`root`, `closeButton`, `scrollView`) have no legacy equivalent — OPT.**
`DrawerContent`/`ModalContent` expose `closeButton`; `InputControl` exposes `root`; `Scrollbar` exposes `root` and `scrollView`. These are additions, not replacements for a v2 prop. Evidence: the components' JSDoc and `useSlot` calls.

**C4 · `SubmenuToggle` is deprecated in favor of `SubmenuTrigger` — DEP.**
`SubmenuToggle` lives under `packages/react/src/menu/deprecated/` and is annotated `@deprecated ... Use SubmenuTrigger instead, which combines MenuItem functionality with submenu trigger behavior.` `SubmenuTrigger` already exists (`menu/SubmenuTrigger.js`, `Submenu.Trigger`). Replacement shape (guide):

```jsx
// before
<SubmenuToggle width="100%"><MenuItem>…</MenuItem></SubmenuToggle>
// after
<SubmenuTrigger width="100%">…</SubmenuTrigger>
```

Do not wrap `SubmenuTrigger` in a `MenuItem` — it is itself the item. The JSDoc is the only deprecation evidence; there is no runtime warning.

---

## R. Portals and popper behavior

**R1 · `usePortal` is deprecated in favor of `portalled` — DEP.**
`Popper` still reads `usePortal` as a fallback (`if (portalled || usePortal)` — `packages/react/src/popper/Popper.js`). Its deprecation warning is **currently commented out** in source with a `TODO` to enable it once `portalled` has been officially available — so in the target source `usePortal` works and emits no warning at all, contrary to what the guide implies. **Source conflict / caveat: report it; do not promise a console message for `usePortal`.**
Replacement examples (guide, "Replace deprecated `usePortal` with `portalled`"): `<Popper portalled />`, `<Menu portalled>`, `<Submenu portalled>`, `<Tooltip portalled>`, `<OverflowTooltip portalled>`, `<Popover portalled>` (or on `PopoverContent`), `<DatePicker portalled />`, `<Autocomplete portalled />`, `<Dropdown portalled />`.

**R2 · `portalled` is threaded from the root component down — NEC to place it correctly.**
`Menu`, `Submenu`, `Popover`, `Tooltip`, `DatePicker`, `Dropdown`, `Autocomplete` accept `portalled` and pass it to their content/popper (`useMenu.js`, `useSubmenu()` context consuming `portalled` in `MenuContent`/`SubmenuContent`, `packages/react/src/dropdown/Dropdown.js`). Old code set it inside `PopperProps={{ usePortal: true }}`; in v3 prefer the root-level prop. `Popper` also exposes `portalProps` for the portal itself.

**R3 · `anchorEl` is deprecated in favor of `referenceRef` — DEP.**
`packages/react/src/popper/Popper.js` warns `anchorEl` → `referenceRef` with `willRemove: true`.

**R4 · Popper placement semantics changed — verify, don't assume a bug.**
The `3.0.0-alpha.1` changelog documents `computedPlacement` (placement Popper.js actually used) vs. the preferred `placement`, resize-driven re-positioning, and lifecycle fixes. Overlays now grow from the facing edge. **MAN/Optional**: adjust only if the app depended on the old placement quirks. Evidence: `packages/react/CHANGELOG.md` 3.0.0-alpha.1; `popper/Popper.js`.

**R5 · `matchWidth` is new — OPT.**
Available on `Popper`, `Menu`, `Autocomplete`, `Dropdown`; sizes the popper to the reference width. Not present on v2. Evidence: the components' JSDoc and `Dropdown.js`.

**R6 · Portal defaults resolve from the mounted root — NEC to know for shadow DOM / iframes.**
`Portal` uses the native `Node.getRootNode()` instead of always `document.body`, so portal components render inside a shadow root automatically; explicit `containerRef` still overrides (`packages/react/src/portal/Portal.js`, changelog 3.0.0-alpha.1, `EnvironmentProvider`). Apps not in shadow DOM/iframes see no change.

---

## D. DataGrid and charts — package availability boundary

**D1 · No DataGrid package is present in this repository — NOT_APPLICABLE / source-only.**
There is no `@tonic-ui/react-data-grid` package under `packages/`. Do not invent a DataGrid version, peer floor, `heightMode` prop or behavior rule for Tonic UI. Upstream source material may describe a separate data-grid package; that is **source-only** and must not be presented as a Tonic UI package or as evidence about this target. A Tonic UI v3 upgrade does not remove or rewrite a separately owned DataGrid package. If the app separately depends on a data-grid package, read that package's own `package.json`, changelog and source and label the findings as app/package-specific.

**D2 · No chart package is present in this repository — NOT_APPLICABLE / source-only.**
There is no chart package under `packages/`. The theme still exports private `_chart` tokens (`packages/theme/src/v3/semantic/colors/_chart.js`), but that is theme data, not a chart package, default palette or `globalConfig` contract. Do not claim a Tonic UI chart package, chart peer (`echarts`), or default palette. If the app uses an external chart package, verify that package's own metadata and configuration.

---

## T. Color style and tokens

**T1 · v2 color tokens remain fully backward compatible in v3 — NEC (do not force a rewrite).**
The token guide states: "The v2 tokens remain fully backward compatible in v3. You can upgrade without changing any token references and migrate at your own pace. V2 and v3 tokens can coexist, enabling incremental adoption." So `color="blue:60"` is **not** automatically a migration failure — verify it still resolves and looks right, then leave it or adopt v3 syntax (**OPT**). A blanket "rewrite every legacy token first" is unsupported. Evidence: `.../migrating-color-tokens-from-v2-to-v3/index.page.mdx`; layered v3 theme in `packages/theme/src/v3/index.js`.

**T2 · Primitive token values are NOT equivalent between v2 and v3 — MAN.**
The dot-notation scale is renumbered (`gray:10` = `#f2f2f2` while `gray.100` = `#ffffff`). Blindly converting `x:NN` → `x.NN` changes appearance. Adopt semantic tokens (`background.low`, `text.primary`) rather than mechanical primitive renames. Evidence: the color migration guide; `packages/theme/src/v2/colors.js` vs `packages/theme/src/v3/primitive/colors.js`.

**T3 · `useColorStyle({ colorMode })` is supported — do not claim a crash.**
`useColorStyle` accepts `{ colorMode }`, falls back to the context color mode, and throws only when called outside `ColorStyleProvider`, or when the requested mode is absent from the style object (`packages/react/src/color-style/useColorStyle.js`). There is no evidence the option crashes in v3; tests exercise it (`color-style/__tests__/`). Classification: **no change required (NEC: none)**. Only change it if the app wants the token-direct style.

**T4 · The v3 default `colorStyle` exposes five groups — NEC only if the app read a missing default.**
The v3 default (`packages/react/src/color-style/color-style.js`) contains only `background`, `color`, `divider`, `text` and `shadow`. Reading another entry from the **default** style yields `undefined`. A **custom** `colorStyle` passed to `TonicProvider` is preserved because the provider uses the supplied value/defaultValue. This repository does not establish which extra entries a given v2 default exposed, so do not claim a specific entry was removed; compare the app's v2 colorStyle with the v3 default and report the actual difference. Evidence: `packages/react/src/color-style/color-style.js`, `ColorStyleProvider.js`.

**T5 · Custom severity/risk mappings must be preserved — NEC (preserve intent).**
If the app merges a custom `colorStyle` (`merge(colorStyle, {...})`) and passes it to `TonicProvider`, that object is what the provider uses (`ColorStyleProvider` → `value`/`defaultValue`). Port the mapping so its values reference v3 semantic tokens; do not drop the custom entry. The theme implements `severity.*` and `riskLevel.*` semantic families (`packages/theme/src/v3/semantic/colors/alert.js`), including `.text`, `.chart`, `._overlay` and `._onOverlay.*`. Watch key renames when the design row uses them — for example the design/code distinction between `info` and `informational` (`severity.informational.text`). A custom mapping's **keys and intent** are the app's decision; changing token syntax alone is **OPT**, while a value that no longer resolves is **NEC**.

**T6 · The default `colorStyle` API itself is unchanged — DEP/OPT.**
`colorStyle` values now map to semantic tokens, but the shape (`background.primary`, `color.primary`, …) is the same (`packages/react/src/color-style/color-style.js`); `useColorStyle` is unchanged. Migrating consumers from `colorStyle.*` to direct semantic tokens is **OPT**.

**T7 · Breakpoints changed between v2 and v3 — MAN.**
v2: `320 / 640 / 1024 / 1280 / 1680`; v3: `320 / 744 / 1440 / 1680 / 1920` (`packages/theme/src/v2/breakpoints.js` vs `packages/theme/src/v3/primitive/breakpoints.js`). Responsive layouts keyed to `md`/`lg`/`xl`/`2xl` shift as a result. Not a compile error; a visual/manual review item. Evidence: guide, "Breakpoints".

**T8 · Some v3 scale values collide with v2 names — MAN.**
The guide's collision table: `radii.sm` `0.1875rem` → `0.25rem`, `radii.lg` `0.75rem` → `0.5rem`, `fonts.base` changes to Inter, `fonts.mono` changes to DM Mono. `radii.circle` and `radii.none` are v2-only and preserved. Re-check border radius and font loading. Evidence: guide, "Theme changes".

**T9 · Other scales are additive — OPT/verify.**
`borders` adds `0.5`, `1.5`, and `6`–`10`; `radii` adds `xs`; `shadows` adds semantic `low`/`medium`/`high` with direction and dark/light variants; `fontSizes`, `lineHeights`, `outlines`, `sizes`, `space`, `zIndices` are unchanged. Verify only the scales the app uses. Evidence: guide, "Other scales".

**T10 · For exact token paths/values, use the `tonic-ui-tokens` skill.**
Its `assets/tokens.json` inventory and `scripts/lookup-tokens.mjs` (both relative to that skill's root) resolve an implemented token path, visibility and CSS variable. Do not duplicate that data here, and do not treat it as a prerequisite for the upgrade.

---

## X. Other source-verifiable v3 deprecations

These props/deprecations still work in the target source. Most `warnDeprecatedProps` callsites are wrapped in `useOnceWhen`, so they warn at most once per mounted instance when the deprecated prop is set; a couple have no live runtime warning at all. Evidence below is the declaration site — read it before asserting what the console does.

| Component | Deprecated | Replacement | Evidence |
| --- | --- | --- | --- |
| `Popper` | `anchorEl` | `referenceRef` | `popper/Popper.js` |
| `Popper` | `usePortal` | `portalled` | `popper/Popper.js` (warning commented out) |
| `Modal`, `Drawer` | `closeOnOutsideClick` | `closeOnInteractOutside` | `modal/Modal.js`, `drawer/Drawer.js` |
| `Scrollbar` | `scrollViewProps`, `scrollViewRef` | `slotProps.scrollView`, `slotProps.scrollView.ref` | `scrollbar/Scrollbar.js` |
| `Spinner` | `lineColor`, `lineWidth`, `trackColor`, `trackWidth` | `color`, `thickness`, `sx` (track via `sx`), `thickness` | `spinner/Spinner.js` |
| `CircularProgress` | `trackColor` | `sx={{ "svg circle:first-of-type": { color: trackColor } }}` | `progress/CircularProgress.js` |
| `LinearProgress` | `size` | `height` | `progress/LinearProgress.js` |
| `Select` | `isInvalid` | `error` | `select/Select.js` |
| `Skeleton` | `variant="rect"` | `variant="rectangle"` | `skeleton/Skeleton.js` |
| `Tabs` (`Tab`, `TabPanel`) | render-function context `isActive` | `isSelected` | `tabs/Tab.js`, `tabs/TabPanel.js` (deprecated getter on the object passed to function children, not an input prop; warns on every access, not once per mount) |
| `Link`, `LinkButton` | `textDecoration="underline"` | `variant="inline"` | `link/Link.js`, `link/LinkButton.js` (no `willRemove` flag — fires only when the value is `"underline"`) |
| `DateCalendar` | `date`, `defaultDate` | `value`, `defaultValue` | `date-pickers/DateCalendar/DateCalendar.js` |
| `SubmenuToggle` | whole component | `SubmenuTrigger` | `menu/deprecated/SubmenuToggle.js` (JSDoc-deprecated; no runtime warning) |

**X1 · Deprecated ≠ removed ≠ crashes — NEC (classification discipline).**
`warnDeprecatedProps` no-ops in production and fires on every call; single-fire is a property of the wrapping callsite, not of the helper. Most callsites in groups C/X wrap the call in `useOnceWhen` and so warn at most once per mounted instance for that prop — describe it that way, not as a helper guarantee. Some deprecations have no live warning at all: `usePortal`'s call is commented out in `Popper.js`, and `SubmenuToggle` is JSDoc-only. The `isActive` context getters in `tabs/Tab.js` / `tabs/TabPanel.js` call `warnDeprecatedProps` directly on each access, so they are neither "once per mount" nor absent — they warn every time the function child reads `isActive`. An obsolete prop, a TypeScript error, an ignored prop and a runtime crash are different outcomes; do not claim one without evidence.

**X2 · Migrate deprecated props only when required or when already touching the file — DEP.**
They are safe to leave for the target release. Where a `warnDeprecatedProps` callsite exists (most of groups C/X), the only functional cost is a dev-only console warning; where none is wired up (`usePortal`, `SubmenuToggle`), leaving the old API costs nothing at runtime. Prefer incremental migration because legacy + slot props merge (C2), and nothing must be changed just to upgrade.

---

## Verification checklist

For each rule the plan touches, record one of **PASS / FAIL / NOT_APPLICABLE / UNVERIFIED** plus the evidence.

1. Install resolves with one Emotion major and no out-of-range peers (`npm ls @tonic-ui/react @emotion/react`).
2. Typecheck/build succeeds on the target version.
3. Light **and** dark mode render correctly for changed surfaces.
4. Each migrated overlay still opens/closes, positions, and (if portalled) renders in the intended root.
5. DataGrid/chart checks are **NOT_APPLICABLE** for this repository because those packages are absent; if the app separately owns such a package, verify that package's own contract and label it as app/package-specific.
6. Custom `colorStyle` (if any) still drives the intended severity/risk appearance.
7. Global CSS scope is correct for the app's embedding context (standalone vs. widget).
8. Any "not exercised" surface is reported as **UNVERIFIED**, not PASS.
