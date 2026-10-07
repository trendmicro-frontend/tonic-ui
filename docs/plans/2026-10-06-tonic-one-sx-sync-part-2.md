# Tonic One → Tonic UI: `__sx` base-styling + `composeSx` + codemod sync (part 2)

> **For agentic workers:** This plan is executed inline in this session. Steps use checkbox
> (`- [ ]`) syntax for tracking.

**Goal:** Bring Tonic UI to parity with the Tonic One `__sx` base-styling model and the
`style-props-to-sx` codemod, so component base styling structurally loses to consumer overrides
(`sx`), wrappers can override children via `__sx`, and `useSlot` composes an incoming `__sx`
instead of letting it clobber the base.

**Architecture:** Ports Tonic One's PR #506 (`__sx` channel), #507 (component `css`/style-prop →
`__sx` migration) and #515 (codemod improvements, `mergeSx` → `composeSx`) to Tonic UI's own
conventions. Tonic UI is a separate repo: package names (`@tonic-ui/*`), token set, test setup and
docs conventions already exist; the port renames imports and keeps Tonic UI's public API intact.

**Tech Stack:** React 18/19 (`forwardRef`), Emotion via `Box` from `@tonic-ui/react-base`,
`@tonic-ui/utils/internal`'s `composeSx`, jest + `@emotion/jest` + `@tonic-ui/react/test-utils/render`,
jscodeshift for the codemod.

**Source of truth:** Tonic One `main` (`~/Code/trend-common-platform/tonic-one`):
`packages/react/src/{button,input,menu,scrollbar,slot}`, `packages/utils/src/internal/composeSx.js`,
`packages/codemod/src/style-props-to-sx`, `docs/adr/*`, `.claude/skills/tonic-one-*`.

**Branch:** `feat/codemod-style-props-to-sx-part-2` (already created from `main` at `0cc04f995d`).

## Global constraints

- `__sx` is the ONLY channel a component uses for its own base styling. `sx` is consumer-only.
- Fold with **array composition** (`composeSx(a, b)`), never object merge (`{...a, ...b}`) —
  an object merge discards a whole nested key like `&:hover`.
- Canonical call site: destructure inline `const { __sx: __sxProp, ...rest } = useDefaultProps({ props: inProps, name: 'X' })`;
  place `__sx={composeSx(styleProps, __sxProp)}` **after** `{...rest}`.
- A `useSlot`-authored element does not hand-fold `__sx`: put the base in `props.__sx` and let
  `useSlot` compose it under `slotProps.__sx`.
- **Scrollbar is in scope for the `slots` API.** Discovered mid-execution: Tonic UI's own
  `.claude/skills/tonic-ui-slots/SKILL.md` already documented `Scrollbar`'s `scrollView` slot as
  "✅ done", but `packages/react/src/scrollbar/Scrollbar.js` was byte-identical to Tonic One's
  *pre-#507* file and had no `slots` at all. Since the `scrollView` slot is also the case that
  motivated `useSlot`'s `__sx` composition (ADR `2026-06-29-scrollbar-scrollview-slot-and-useslot-sx-composition.md`),
  the slots API + the `scrollViewProps`/`scrollViewRef` deprecations are ported as part of this sync.
  This is the one intentional public-API addition; everything else preserves Tonic UI's existing API.
- Preserve the Tonic UI `MenuButton` fix (the `#507` useCSSVariables hover-color bug fix) — Tonic One
  expresses it as `'&:hover': { color: 'text.primary' }` in `__sx`; Tonic UI currently resolves the
  token manually and routes it through `css`. The port keeps Tonic UI's behavior working via `__sx`.
- Do NOT port: `react-data-grid` changes (package does not exist in Tonic UI), `react-docs`
  Scrollbar slots docs, the `react/v3/import-tonic-one` codemod, `packages/mcp` test changes,
  release/version bumps (#544), and Tonic One-only docs (`CONTEXT.md` is Tonic One's own glossary —
  Tonic UI's equivalent lives in `.claude/skills/tonic-ui-sx/SKILL.md`).
- Tonic UI keeps its own codemod `LAYER2_PROTECTED_PROPS` (it protects strictly more components than
  Tonic One's list — do not shrink it) and its own README wording; only the code-behavior fixes are
  ported.

---

### Task 1: `useSlot` composes `__sx` (foundation)

**Files:**
- Modify: `packages/react/src/slot/useSlot.js`
- Test: `packages/react/src/slot/__tests__/useSlot.test.js`

**Change:** mirror Tonic One `packages/react/src/slot/useSlot.js` — destructure `__sx` from both
`props` and `slotProps`, and when either side provides it, set
`mergedProps.__sx = composeSx(propsSx, slotSx)`; otherwise emit no `__sx` at all (so non-`Box` slots
are unaffected). Import `composeSx` from `@tonic-ui/utils/internal`.

**Acceptance:** a `slotProps.__sx` no longer replaces the component's base `__sx` — both survive in
array-composition order; a slot with no `__sx` on either side receives no `__sx` key.

**Verify:** `cd packages/react && yarn test --testPathPattern="slot"`.

---

### Task 2: `Button` + `ButtonBase` base styling through `__sx`

**Files:** `packages/react/src/button/Button.js`, `packages/react/src/button/ButtonBase.js`
**Change:** `__sx: __sxProp` in the destructure; drop the `{...styleProps}` spread; add
`__sx={composeSx(styleProps, __sxProp)}` after `{...rest}` (Button keeps `{...attributes}` and
`as="button"` first). Two-layer fold: `ButtonBase` folds its reset below the incoming `__sx` so
`Button`'s variant styling wins.
**Verify:** existing snapshots must show a **tier reorder only** (border/color declarations move
from the style-prop block into the `__sx` block of the same Emotion class; no value added/dropped).

---

### Task 3: `Input` family base styling through `__sx`

**Files:** `packages/react/src/input/{Input.js,InputBase.js,InputControl.js,InputGroupAppend.js,InputGroupPrepend.js,styles.js}`
**Change:**
- `styles.js`: rename `getInputGroupCSS` → `getInputGroupSx`, `getInputGroupAppendCSS` →
  `getInputGroupAppendSx`, `getInputGroupPrependCSS` → `getInputGroupPrependSx`,
  `useInputControlBaseCSS` → `getInputControlBaseSx`; return plain style objects instead of
  `sx({...})`; fold the group corner/margin rules into `useInputStyle({ size, variant, inputGroup })`
  (group first, variant last) and into `useInputControlBaseStyle({ ..., inputGroup })`
  (`[baseSx, groupSx?, baseStyleProps]`); drop the module-level `sx` import when unused.
- `Input.js`: fold `useInputStyle({ size, variant, inputGroup })` via `composeSx(styleProps, __sxProp)`;
  stop intercepting consumer `css`.
- `InputControl.js`: root slot takes `__sx: composeSx(baseStyleProps, __sxProp)` in `props`; stop
  intercepting consumer `css`.
- `InputGroupAppend.js` / `InputGroupPrepend.js`: `__sx: __sxProp` + `composeSx(styleProps, __sxProp)`.
**Acceptance:** the `:has()` invalid/focus border rules and the in-group radius/margin rules still
win by specificity; consumer `css`/`sx`/style props override base styling.
**Verify:** `yarn test --testPathPattern="input"` (InputControl snapshot tier reorder only), plus
`--testPathPattern="SearchInput"` and `--testPathPattern="DatePicker"` (both compose `InputControl`
and their snapshots reorder benignly).

---

### Task 4: `MenuButton` child-override via `__sx`

**Files:** `packages/react/src/menu/MenuButton.js`, `packages/react/src/menu/styles.js`
**Change:** fold `useMenuButtonStyle({ variant })` (base layout + variant hover/active override) into
`Button`'s `__sx` via `composeSx(styleProps, __sxProp)` — no `css` interception, no `sx` hand-merge.
`styles.js`: merge `useMenuButtonCSS` back into `useMenuButtonStyle` as `baseStyle` + `variantStyle`
(the Tonic One shape), keeping the hover/active override expressed as a token (`text.primary`) so
color mode and `useCSSVariables` both resolve correctly — this preserves the Tonic UI fix from
`#507` while removing the manual `get(theme.colors, ...)` resolution.
**Verify:** `yarn test --testPathPattern="menu"` — Menu snapshot reorders only; the cascade proof
test (`MenuButton.cascade.test.js`, ported from Tonic One) proves the menu override sits after
Button's base and that consumer `sx` still wins.

---

### Task 5: `Scrollbar` + `ScrollView` base styling through `__sx`

**Files:** `packages/react/src/scrollbar/{Scrollbar.js,ScrollView.js,styles.js}`
**Change:**
- `styles.js`: rename to the `useScrollbar*` namespace (`useScrollbarRootStyle`,
  `useScrollbarScrollViewStyle`, `useScrollbarHorizontalTrackStyle`, `useScrollbarVerticalTrackStyle`,
  `useScrollbarHorizontalThumbStyle`, `useScrollbarVerticalThumbStyle`); fold the
  `::-webkit-scrollbar { display: none }` / `msOverflowStyle` / `scrollbarWidth` base into
  `useScrollbarScrollViewStyle` (which also fixes `-webkit-overflow-scrolling: touch` being dropped
  as a non-forwarded plain prop).
- `ScrollView.js`: becomes a passthrough (Storybook/Emotion `css` interception removed; styling
  arrives via the parent's `__sx`).
- `Scrollbar.js`: ported wholesale from Tonic One `main` (Tonic UI's file was byte-identical to
  Tonic One's pre-#507 revision, so the port is a clean overwrite with only the `@tonic-ui/*` import
  rename): `slots`/`slotProps` for `root`, `scrollView`, `horizontalTrack`, `verticalTrack`,
  `horizontalThumb`, `verticalThumb`; base styles routed through `__sx` (root folds the incoming
  component `__sx` via `composeSx`, the scroll view folds the incoming `scrollViewProps.__sx`); and
  `scrollViewProps`/`scrollViewRef` deprecated (`warnDeprecatedProps`, `willRemove: true`) in favor
  of `slotProps.scrollView` / `slotProps.scrollView.ref`.
- `packages/react-docs/pages/components/scrollbar/{index.page.mdx,faq-react-virtuoso.js}`: adopt
  `slotProps.scrollView` and document the new `slots`/`slotProps` props + the deprecations.
**Verify:** `yarn test --testPathPattern="scrollbar"` — 6 pass (snapshot byte-identical to Tonic One
normalized), including a new test asserting `overflow-x/y: scroll`, `::-webkit-scrollbar { display: none }`,
`scrollbar-width: none`, `-ms-overflow-style: none` and `-webkit-overflow-scrolling: touch` on the scroll
view; plus the ported `Scrollbar.slots.test.js` (element swap + deprecation warnings).

---

### Task 6: Codemod — same-file wrapper resolution, unresolved-wrapper reporting, sx-first rule

**Files:** `packages/codemod/src/style-props-to-sx/{index.js,__tests__/**}`, `packages/codemod/README.md`
**Change:** port from Tonic One: `resolveLocalWrapper` (same-file sibling wrappers, chained hops),
`flagUnresolvedIfStyleLike` (warn on a wrapper that carries style-prop-like attributes but could not
be resolved), the lowercase-intrinsic skip, and the **sx-first** decision that removes
`Box/Flex/Grid/Stack/StackItem/Space` from `LAYER1_EXEMPT_COMPONENTS` (flat style props on layout
primitives convert like any other component; runtime behavior is unchanged). Update the transform's
header comment and README to match. Keep Tonic UI's own `LAYER2_PROTECTED_PROPS` entries; add only
what Tonic One's list has that Tonic UI is missing (`CircularProgress: color`, `Spinner: color`
already exist — verify rather than overwrite).
**Verify:** `cd packages/codemod && yarn test`.

---

### Task 7: Docs & skills parity (Tonic UI wording)

**Files:** `docs/adr/2026-07-03-transition-style-through-sx-channel.md`,
`docs/adr/2026-07-05-sx-regression-test-methodology.md` (new), `docs/plans/2026-07-02-sx-internals-migration.md`,
`.claude/skills/tonic-ui-sx/SKILL.md`, `.claude/skills/tonic-ui-slots/SKILL.md`
**Change:** sync the two ADRs that the skill content depends on (Tonic UI already has
`2026-06-24-box-internal-sx-base-channel.md` and a version of `2026-07-03-...`), refresh the
`tonic-ui-sx` skill body (variadic `composeSx`, `useSlot` `__sx` composition, inline `__sx`
destructure, transition guidance), and update the migration plan's `mergeSx` references to
`composeSx` (the helper was renamed). Do NOT port `docs/adr/2026-07-22-sx-first-authoring-for-consumer-jsx.md`'s
Tonic One-only rationale verbatim — summarize the sx-first rule that Task 6 implements and link the
codemod.
**Verify:** `grep -rn "mergeSx" docs .claude | grep -v "composeSx"` returns nothing in the edited files.

---

### Task 8: Full verification + report

**Result (executed):**
- `packages/react`: **135 suites / 959 tests / 93 snapshots — all pass.**
- `packages/utils`: 9 suites / 180 tests pass. `packages/styled-system`: 27 suites / 166 tests pass.
  `packages/react-base`: 2 suites / 11 tests pass. `packages/codemod`: 3 suites / 35 tests pass.
- `yarn lint` on `react`, `react-base`, `utils`, `styled-system`, `codemod`: **0 errors**
  (react has 12 pre-existing warnings, untouched by this work).
- **Snapshot discipline:** every dirty snapshot was machine-checked by parsing each Emotion class
  block and comparing the *computed* (last-wins) declaration map against `HEAD`. All are
  reorder-only except two deliberate changes, each of which makes the file byte-identical to the
  Tonic One equivalent (normalized for package name):
  - `Scrollbar` — `-webkit-overflow-scrolling: touch` now actually emits (Tonic One fixed this; it
    was previously dropped as a non-forwarded plain prop).
  - `Menu`/`Dropdown`/`Tabs` — new blocks for the `MenuItem` disabled instance (its own class, not
    a value change) plus the menu hover/active override that the old `css`-based path emitted
    differently; both match Tonic One's post-#507 snapshots exactly.
- **Cross-repo parity (normalized):** 13 of 15 ported source files are byte-identical to Tonic One
  `main`. The 3 remaining diffs are all intentional: Tonic UI's larger `LAYER2_PROTECTED_PROPS`
  list + local doc paths (codemod), and one extra clarifying comment (`menu/styles.js`).
- **Smoke (throwaway, deleted after running):** for `Button`, `Input`, `Scrollbar` (root + scroll
  view) and `MenuButton`, a consumer `sx` override provably beats the component's own base styling,
  and the `MenuButton`→`Button` cascade emits the menu override *after* Button's base while the
  consumer's `sx` still lands last. Also ran the codemod end-to-end on a real fixture: converted
  `Button`/`Flex`/a same-file wrapper, and left `Scrollbar.width/height/overflowY` protected with a
  `needs manual review` log — exactly the intended behavior.
- Changeset: add `.changeset/tonic-ui-pr-<PR_NUMBER>.md` **after** the PR exists (repo policy) — do
  not invent a number.
- **Bug caught during verification:** the first pass of the Input rework defined
  `getInputGroupAppendSx`/`getInputGroupPrependSx` but never wired them into
  `useInputGroupAppendStyle`/`useInputGroupPrependStyle`, silently dropping the child
  `first-of-type` radius rules. No existing test renders those components, and a value-level
  snapshot diff would not have flagged it. Fixed to Tonic One's exact shape (child-radius rules
  folded into the hooks, matching `input/styles.js` parity) and closed with a new
  `input/__tests__/InputGroup.sx.test.js` — verified to FAIL when the drop is reintroduced and
  pass with the fix.
- Not done (out of scope): nothing committed, pushed, or opened as a PR.