# Color token mapping — design name → implemented token

Provenance: the color database is content ID `1939407344`, observed **version 559**
(updated 2026-09-09). The repository's v2-to-v3 color migration guide
(`packages/react-docs/pages/migrations/migrating-color-tokens-from-v2-to-v3/index.page.mdx`)
links this database as the **v3 Semantic Color Token Definitions**, so its use as the color
alias source is confirmed for Tonic UI. The source snapshot's own title was
"Tonic One v4 Semantic Color Token Definitions"; that title is retained as historical
provenance, not as the current target identity. Row numbers below are that database's rows,
also carried per record in `assets/figma-mappings.json`. The Designer Handbook
(`1927774846` v73) and Light Mode guide (`2386166626` v40) are **upstream guidance
snapshots**, not alias tables; their applicability to Tonic UI is **unverified**. Observed
versions are not permanent pins; re-check when a newer source is available.

The implemented side is `assets/tokens.json`, generated from the v3 theme source (plus
retained v2 tokens) at `@tonic-ui/theme@3.0.0-alpha.1`, target revision `a66574e9…`. It holds
**1074** records: 605 public, 469 private, 95 legacy; 542 semantic, 437 primitive, 3 with an
unresolved source reference. Scales: `colors`, `borders`, `breakpoints`, `fontSizes`,
`fontWeights`, `fonts`, `lineHeights`, `outlines`, `radii`, `shadows`, `sizes`, `space`,
`zIndices`.

## Query first, read second

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --figma '$color.text.primary'
node <skill-dir>/scripts/lookup-tokens.mjs --token 'background.low'
node <skill-dir>/scripts/lookup-tokens.mjs --family 'border'
node <skill-dir>/scripts/lookup-tokens.mjs --query 'toast border'
```

Use this file for family rules, exceptions and handoff guidance; do not hard-code alias
lists from this prose when the JSON is available. `--query` is a **literal substring** match
(see SKILL.md) — a two-word phrase works only if it occurs verbatim in a design role/note.

## Statuses

| Status | Count | Meaning | Handling |
| --- | --- | --- | --- |
| `verified` | 163 | Design name → real implemented token. | Use the path/values/CSS variable directly. |
| `family-mapping` | 160 | A design **range** expanded to members (chart families). | Per-family correspondence, not per-member confirmation. |
| `design-only` | 24 | Design defines it; no implementation. | Hand off; do not invent a path or substitute a primitive. |
| `composed` | 16 | Typography compositions (see [TYPOGRAPHY_MAPPING.md](TYPOGRAPHY_MAPPING.md)). | Not a color; listed here only for the total. |
| `source-conflict` | 1 | Design row and code column disagree. | Report both; code wins. |

**364 mappings over 353 distinct design names.** The 11 surplus rows are intentional
duplicates preserved from the source: `$color.text.secondary` (rows 37 and 47),
`$color.chart.sequential.attack-intensity` (10 member rows), and
`$typography.numeric-display.regular.sm~xlg` (rows 24 and 25). Do not deduplicate them.

## Naming and CSS variables

Figma names use a `$` prefix and kebab-case (`$color.text.primary`); inventory paths drop the
prefix and camel-case the semantic segment (`colors.text.primary`,
`colors._foreground.primaryVariant.selectedDisabled`).

CSS-variable names come from the real utility (`toCSSVariable`), and the convention is
**dots → hyphens, colons → underscores**:

| Token | CSS variable |
| --- | --- |
| `colors.text.primary` | `--tonic-colors-text-primary` |
| `colors._component.keyboardFocused.outerFocusRing` | `--tonic-colors-_component-keyboardFocused-outerFocusRing` |
| `colors.blue:60` (legacy) | `--tonic-colors-blue_60` |
| `borders["0.5"]` | `--tonic-borders-0-5` |

11 records have **no** emitted CSS variable (the `breakpoints` array and its members) —
there `cssVariable` is `null` deliberately, not a fabricated name. Decimal keys are real
source keys: their inventory path is bracket-addressed (`borders["0.5"]`), and
`--family borders` includes them.

A CSS variable is emitted by the library's CSS-variables mode; the generator verifies the
name, but a given app must enable the mode. `cssVariable` is the *generated* name — confirm
the app's prefix before quoting it in app CSS.

## Families (design → code)

| Design family | Implemented family | Notes |
| --- | --- | --- |
| `$color.text.*` (rows 35–39, 47) | `colors.text.*` | Row 47 repeats `$color.text.secondary` for subtle links; same target as row 37. |
| `$color.status.negative.text` (row 40) | `colors.error.text` | The only implemented status **text** color; all others are TBD (row 70). |
| `$color.icon.*` (rows 41–45) | `colors.text.*` (same roles) | No separate implemented `icon.*` family; icons pair with the text tokens. |
| `$color.link.*` (row 46) | `colors._link.*` | `_link` is private/unpublished. |
| `$color.background.*` (rows 48–51) | `colors.background.highest/high/medium/low` | Row 49 is a **source conflict** — see below. |
| `$color.border.decorative.*` (rows 52–56) | `colors.border.accent/primary/secondary/tertiary/subtle` | The `decorative` segment does not appear in code. |
| `$color.border.primary.*` (row 57) | `colors.border._primary.*` | 8 states; code uses camelCase state suffixes. |
| `$color.border.negative.*` (row 58) | `colors.border._negative.*` | Raw Figma typo `disbled` preserved (row 58); corrected alias also recorded. |
| `$color.border.promotional.*` (row 59) | `colors.border._promotion.*` | Design says `promotional`; code family is `_promotion`. |
| `$color.state-layer.on-background.*` (rows 60–63) | `colors.actions.*` | `on-background` has no code segment. 8 design members; the `_fixed`/`_inverse` mode variants are code-only. |
| `$color.status.<status>.icon/.border` (rows 64–65) | `colors.success/error/warning/minorWarning/info/neutral/promotion.<part>` | 8 design members vs 7 implemented: `in-progress` has no implemented family. Ordering differs per row — pair by name. |
| `$color.status.<status>.overlay` (row 67) | `colors.<status>._overlay` | `in-progress` unimplemented. |
| `$color.status.<status>.on-overlay.text/.icon` (rows 68–69) | `colors.<status>._onOverlay.text/.icon` | Row 69's code column repeats `.text`; implemented icon paths are `.icon`. `promotion._onOverlay.*` is **not implemented** → design-only. |
| `$color.status.<status>.text` (row 70) | — | All 🚧TBD, no code column; negative is excluded because row 40 already covers it. |
| `$color.alert.risk-level.*.text/.chart` (rows 71–72) | `colors.riskLevel.<level>.text/.chart` | `UTA` (design) → `uta` (code). |
| `$color.alert.risk-level.*.overlay` / `.on-overlay.text` (rows 74–75) | `colors.riskLevel.*._overlay` / `._onOverlay.text` | 4 levels each. |
| `$color.alert.severity.*.text/.chart` (rows 76–77) | `colors.severity.*.text/.chart` | Row code column writes `severity.info.*`; the implemented name is `informational`. |
| `$color.alert.severity.critical/high/medium/low.overlay` / `.on-overlay.text` (rows 79–80) | `colors.severity.*._overlay` / `._onOverlay.text` | `informational` implemented but absent from these rows (code-only). |
| `$color.foreground.primary\|secondary\|negative\|promotional.<state>` (rows 81–82, 86–87, 90–93) | `colors._foreground.primary\|secondary\|negative\|promotion.<state>` | Design `promotional` → code `promotion`; row 87 typo `seconary` preserved. |
| `$color.foreground.primary-variant.*` (rows 83–85) | `colors._foreground.primaryVariant.*` | Row 85 order reversal — see below. |
| `$color.foreground.tertiary.*` (row 88) | `colors._foreground.tertiary.*` | 7 states; row 88 code column has a slash typo for `selectedHovered`. |
| `$color.foreground.subtle.*` (row 89) | `colors._foreground.subtle.*` | Row lists 4 states; `selected*` implemented states are code-only. |
| `$color.overlay.*` (row 94) | `colors._overlay.thinest…thickest` | 7 levels. |
| `$color.shadow.high/medium/low` (rows 95–97) | `colors._shadow.high/medium/low` | Composed `shadows.<level>.main` embeds these; shadow *color* ≠ whole box-shadow. |
| `$color.highlight.foreground` (row 98) | `colors._highlight` | Used by `Mark` (highlight variant). |
| `$color.chart.*` (rows 99–107) | `colors._chart.*` | Expanded by name — see "Charts". |

No design aliases exist for any **primitive** token (0 of 437 mapped): shades like
`colors.gray.700`, `colors.blue.600` are code-only.

## Charts — expand ranges by name, never by position

The database gives ranges (`chart-1~14`, `option-1~4`, `lv-1~10`), and the code column's
hand-written syntax does not always match implemented keys (`{chart_1~14}` vs `chart-1`,
`{lv_1~10}` vs `lv-1`, `{1ColorGroup}{option-1~4}` vs `1ColorGroup.option-1`). The curated
mappings expand each range member by name; no member is invented and no column is zipped
positionally. The range strings themselves are not resolvable by `--figma`.

Implemented families and their design rows:

- `categorical.unpredictable.chart-1…14` (row 99). `chartOther`, `chartEmpty`, and every
  `unpredictable._overlay.<chart>.none/thin/medium/thick` leaf are **code-only**.
- `categorical.predictable.1ColorGroup.option-1…4` (row 100); `2ColorGroup.option-1…4`
  (row 101, **option-5 code-only**); `3ColorGroup.option-1…5` (row 102);
  `4ColorGroup.option-1…3` (row 103); `5ColorGroup.option-1…2` (row 104).
- `sequential.option-1…5.lv-1…10` (row 105, **unstatused**) and
  `sequential.attackIntensity.lv-1…10` (row 106).
- `divergent.option-1…2.lv-1…16` (row 107; 16 levels, not 10).

The `_chart` family is implemented in the theme (219 private leaves), but **this repository
has no chart package**. Upstream source evidence (not a Tonic UI package here) recorded a
chart library selecting `unpredictable.chart-1…14` as its `globalConfig.color` and a
visual-map configuration using `attackIntensity.lv-1…10` in ascending order. Do not present
that configuration as a Tonic UI default, and do not infer that every documented option is
wired into every chart type. Choose a palette only from an explicit requirement.

## Source conflicts, ordering and typos (preserve, do not "fix")

- **Row 49** — Figma `$color.background.high` ↔ code column `background.highest`. The code
  column would collide with row 48's target; the row's own definition (drawer, modal, dock)
  matches the implemented `colors.background.high`. Recorded as `source-conflict`:
  implementation wins for code questions, and the deviation is visible rather than smoothed.
- **Row 85** — Figma column `selected-disabled|disabled` vs code column
  `disabled|selectedDisabled`. Positional zipping pairs the wrong states. The curated mapping
  pairs `$color.foreground.primary-variant.selected-disabled` →
  `colors._foreground.primaryVariant.selectedDisabled`, matching the row definition.
- **Status rows 64/65/67** — `netural` (row 64 raw), `in-progress`/`neutral` swapped in row
  65, and `neutral`/`informational` ordering differs in row 67. Pair by token name only.
- **Typos preserved as keys, corrected aliases added**: `$color.status.netural.icon`,
  `$color.border.negative.disbled`, `$color.foreground.seconary.disabled`,
  `$typography.numeric-display.sublte.md~lg`. Row 88's code column writes
  `_foreground/tertiary.selectedHovered` (slash); the implemented path is
  `_foreground.tertiary.selectedHovered`.
- **Row 69** — the code-syntax column repeats `.text` for both the text and icon members;
  implemented icon paths are `_onOverlay.icon`.
- **Row 76/77 code column** — writes `severity.info.*` for the member the implementation
  names `informational`.

## Draft (`🚧TBD`) and unimplemented design entries

`🚧`/TBD entries are not final: do not use them, and do not invent code paths for them.
Currently design-only:

- `$color.status.<status>.foreground` (row 66) for positive/negative/major-warning/minor-warning.
- `$color.status.<status>.text` (row 70) for positive/major-warning/minor-warning/informational/neutral/in-progress/promotional.
- `$color.alert.risk-level.high.foreground` (row 73) and `$color.alert.severity.critical.foreground` (row 78).
- `in-progress` members (rows 64/65/67/68/69): the design lists a stable status with a code
  column, but no `inProgress` family exists in the theme. This is a **design-ahead-of-code**
  case: ask for a reviewed alternative (e.g. an explicit product decision), never a guess.
- `promotion.on-overlay.text` / `promotion.on-overlay.icon` (rows 68/69): the implemented
  `colors.promotion` family has no `_onOverlay` leaves.
- Typography `numeric-display` categories (rows 23–25, draft) — see
  [TYPOGRAPHY_MAPPING.md](TYPOGRAPHY_MAPPING.md).

## Code-only and private guidance

- `code-only` means implemented, real, and **not** a documented design decision. Use it when
  the code already uses it or an engineer confirms the intent; do not present it as "the
  design token for X". The lookup reports `code-only` when a path has no alias, no
  `source-conflict`, no `verified` and no `family-mapping` row.
- Private families (`_component`, `_foreground`, `_link`, `_overlay`, `_highlight`,
  `_shadow`, `_chart`, `_fixed`/`_inverse` variants, risk/severity private paths) are
  **unpublished API**. A leading `_` marks an internal segment. Using one outside the
  library is a deliberate, reviewable choice: it may change without a deprecation cycle.
- `_component.*` (focus rings, scrollbar, tags) has **no individual design alias** in this
  database (37 records, 0 mapped). The observed implemented focus tokens are
  `colors._component.keyboardFocused.outerFocusRing` / `innerFocusRing`; components compose
  both rings (e.g. Button's `_focusVisible` box-shadow). Report the real path and its private
  status — never claim a Figma alias for it.
- `_overlay._fixed`/`_inverse` and `text._fixed`/`_inverse` are mode variants. The upstream
  Designer Handbook snapshot documents the underscore convention with the `_fixed-light`
  example ("always sticks to light mode, regardless of the current color mode"); `_inverse`
  swaps the mode instead. There are no per-leaf design rows for these variants (a generic
  naming rule only), so they are code-only.
- Legacy **v2** tokens remain in the inventory (`kind: "legacy"`, e.g. `blue:60` →
  `--tonic-colors-blue_60`). They exist for compatibility; prefer v3 semantic tokens for new
  work and never rewrite legacy references merely because a v3 equivalent exists. **No
  v2→v3 migration is a prerequisite for token selection.**

## Common surface roles

These are snapshot-backed defaults and design guidance, not proof of a screenshot's
original variable or of an application's custom overrides. Token selection needs no upgrade.

| Role | Implemented token | Evidence |
| --- | --- | --- |
| Page base | `colors.background.low` | v2→v3 color guide (Background: default page background); theme `background.js`. |
| Widget/card | `colors.background.medium`, with `border.subtle` | v2→v3 color guide (widgets/section containers); theme sources. |
| Modal/drawer panel | `colors.background.high` | v2→v3 color guide (drawers, modals); theme `background.js`. |
| Modal/drawer backdrop | `colors._overlay._fixed.light.thicker` | `packages/react/src/modal/styles.js` and `drawer/styles.js`; 72% black in both modes. |
| Code block background | `colors._overlay.thinner` | `packages/react/src/code/styles.js`. |
| Loading/disable overlay | `colors._overlay.inverse.thick` | Token exists in the theme. The upstream evidence came from a package not present in this repository; the upstream Light Mode guide snapshot spells it `_overlay._inverse.thick`, which does not resolve. No component in this repository references it — verify in the app before use. |

The backdrop and panel are different surfaces. Look up their dark/light values and
emitted CSS variables independently; the underscore-prefixed backdrop is a private token.

## Values, modes and CSS variables

- Each implemented token carries `values.dark` and `values.light`; `_fixed` tokens keep a
  fixed mode, `_inverse` swaps it.
- Many colors are `color-mix(... transparent)` (state layers, scrims, disabled states), not
  opaque hex. Do not read such a value as a flat color.
- CSS variable names derive from the real utility: dots → hyphens (hierarchy), colons →
  underscores (variants). See the table above; do not restate an alternative convention.

## Unresolved source references

`colors.riskLevel.high._gradient.opaque`, `colors.riskLevel.medium._gradient.opaque` and
`colors.riskLevel.low._gradient.opaque` carry raw references (`{alert.riskLevel.*.chart}`)
that the current resolver does not resolve (`resolutionStatus: "unresolved-source"`).
`colors.riskLevel.*._gradient.none` resolve normally. Do not recommend the unresolved ones
as verified colors and do not repair library code from a consuming task — report it.

## Designer handoff fields

When a token/state/mode is missing or unconfirmed, capture (see
[UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md)): the exact element and surface,
its role/state, the color mode, the design name if any, the real code candidates and their
status, what decision is missing (new token, draft promotion, alias confirmation), the
source content version/row, and the affected components. The report is local — never send
it to a designer or an external system automatically.
