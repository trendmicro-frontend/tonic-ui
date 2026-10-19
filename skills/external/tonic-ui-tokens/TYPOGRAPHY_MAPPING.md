# Typography mapping — design roles → real theme properties

Provenance: typography database content ID `1962606684`, observed **version 139**
(updated 2026-06-01). Row numbers are that database's rows, also carried in
`assets/figma-mappings.json`. The observed source title was "Tonic One v4 Typography Token
Definitions"; that title is retained as historical provenance. The repository does **not**
independently confirm that this typography snapshot is the Tonic UI v3 design source, so its
applicability to Tonic UI is **unverified**. The rows are preserved because dropping them
would lose design evidence; treat each as upstream design provenance, not as a
target-confirmed design decision. Implemented values come from `assets/tokens.json`
(`@tonic-ui/theme@3.0.0-alpha.1`).

## There is no composite `$typography.*` API

The theme exports `fonts`, `fontSizes`, `fontWeights` and `lineHeights` primitives and the
style props that consume them (`fontSize`, `fontFamily`, `fontWeight`, `lineHeight`). No
`typography.body.md` token exists in the theme. Each design role is therefore expressed as
a **composition** of real property tokens; the curated mapping records them under
`properties` (style prop → theme path), not as a fabricated composite key.

The observed design rows also have **no line-height column**. Where the code applies a line
height, that pairing is engine behavior, not design confirmation. Every composed record marks
`missingAttributes: ["lineHeight"]`.

All 16 stable typography rows are `composed`; the 4 `numeric-display` rows are `design-only`
(draft, unimplemented). Every composed row is missing a design-confirmed `lineHeight`.

## Compositions

| Design row | Figma style | Composition (`properties`) | Notes |
| --- | --- | --- | --- |
| 10 | `$typography.body.md` | `fontSize: fontSizes.sm` (14px), `fontWeight: fontWeights.normal` (400) | `<Text size="sm">` also applies `lineHeights.sm` (20px) — code-derived. Upstream design-side v3 `regular.body-1`; bold-optional for `heading.heading-5`. |
| 11 | `$typography.body.lg` | `fontSize: fontSizes.md` (16px), `fontWeight: fontWeights.normal` | `<Text size="md">` applies `lineHeights.md` (22px). Upstream design-side v3 `regular.body-2`; bold-optional for `heading.heading-6`. |
| 12 | `$typography.label.sm` | `fontSize: fontSizes.xs` (12px), `fontWeight: fontWeights.medium` (500) | `TextLabel` does **not** set medium — pass `fontWeight="medium"` explicitly. `<Text size="xs">` applies `lineHeights.xs` (18px). |
| 13 | `$typography.label.md` | `fontSize: fontSizes.sm` (14px), `fontWeight: fontWeights.medium` | The common button/checkbox/tab label and form/table sub-label. Explicit `medium` required. `<Text size="sm">` → `lineHeights.sm`. |
| 14 | `$typography.label.lg` | `fontSize: fontSizes.md` (16px), `fontWeight: fontWeights.medium` | Explicit `medium` required. `<Text size="md">` → `lineHeights.md`. |
| 15 | `$typography.heading.xsm` | `fontSize: fontSizes.md` (16px), `fontWeight: fontWeights.semibold` (600) | Docs use `<Text size=… fontWeight="semibold">`; weight is not a default. |
| 16 | `$typography.heading.sm` | `fontSize: fontSizes.xl` (20px), `fontWeight: fontWeights.semibold` | Section titles (H2), drawer/modal titles. `<Text size="xl">` → `lineHeights.xl` (28px). |
| 17 | `$typography.heading.md` | `fontSize: fontSizes.2xl` (24px), `fontWeight: fontWeights.semibold` | Page title (H1). `<Text size="2xl">` → `lineHeights.2xl` (32px). |
| 18 | `$typography.heading.lg` | `fontSize: fontSizes.3xl` (28px), `fontWeight: fontWeights.semibold` | Design notes: currently no primary use case. |
| 19 | `$typography.heading.xlg` | `fontSize: fontSizes.4xl` (32px), `fontWeight: fontWeights.semibold` | Design notes: currently no primary use case. |
| 20 | `$typography.display.sm` | `fontWeight: fontWeights.bold` + `literalProperties: {fontSize: "36px"}` | No named size token at 36px — use the confirmed literal. |
| 21 | `$typography.display.md` | `fontWeight: fontWeights.bold` + `literal: 44px` | Upstream design-side v3 `heading.display-3`. |
| 22 | `$typography.display.lg` | `fontWeight: fontWeights.bold` + `literal: 52px` | Largest display. |
| 26 | `$typography.supporting.md` | `fontSize: fontSizes.xs` (12px), `fontWeight: fontWeights.normal` | Caption/supporting. `<Text size="xs">` → `lineHeights.xs`. |
| 27 | `$typography.code.md` | `fontSize: fontSizes.sm` (14px), `fontWeight: fontWeights.normal`, `fontFamily: fonts.mono` | `Code` applies `fonts.mono`, `_overlay.thinner` and `text.primary` only; it sets no size. Set 14px explicitly. No code-applied line height. |
| 28 | `$typography.superscript.md` | `fontSize: fontSizes.sm` (14px), `fontWeight: fontWeights.normal` | Preview-badge text only. The docs example adds positioning/`75%`/italic styling that is not part of the row. |

Resolution shape for a composed record (real lookup output for `$typography.display.sm`):

```json
{
  "figma": "$typography.display.sm",
  "path": null,
  "status": "composed",
  "properties": { "fontWeight": "fontWeights.bold" },
  "literalProperties": { "fontSize": "36px" },
  "missingAttributes": ["lineHeight"]
}
```

`fontSizes` and `fontWeights` are public primitives; the lookup resolves each `properties`
entry to its real value (e.g. `fontSize: { path: "fontSizes.sm", values: { dark: "14px", light: "14px" } }`).

## Line height: code-applied vs design-confirmed

`lineHeights` in code: `xs 18px`, `sm 20px`, `md 22px`, `lg 24px`, `xl 28px`,
`2xl 32px`, `3xl 36px`, `4xl 40px` (px theme; rem equivalents exist). `lineHeights.base`
is `1.5`, and `lineHeights.normal` is `normal`.

- `<Text size="…">` applies both `fontSize` and the same-named `lineHeight` — a code
  pairing, verified by the `Text` implementation (`useTextStyle` reads
  `fontSizes[size]` and `lineHeights[size]`).
- Components commonly use an explicit `lineHeight`: Tag uses `1` (sm), `'xs'` (md) and
  `'md'` (lg); Badge uses `1`; menu items, tooltips and inputs use `'sm'`.
- The **design database does not specify line height**; treat any quoted design line height
  as unconfirmed (`missingAttributes`) unless a designer supplies one. Do not silently
  convert a code line height into a design fact.
- Display sizes have no named size token *and* no code-applied line height; do not pair
  `lineHeights.4xl` with a 36/44/52px literal automatically.
- `$typography.code.md` gets no code-applied line height either.

## Display-size and draft gaps

- 36px, 44px and 52px display sizes have **no** named `fontSizes` token (the scale stops at
  `4xl` = 32px, and there is no `5xl`). Implement an explicit design request with the
  confirmed literal size; do not invent `5xl` or reuse `4xl`.
- `numeric-display` (rows 23–25) is **draft** (no `Status`) and unimplemented. The categories
  are subtle (14–16px medium, row 23), regular (20–32px medium, rows 24/25) and prominent
  (size range not independently confirmed, row 23 cell + row 25 definition). Two source
  quirks are preserved verbatim rather than corrected:
  - the typo `sublte` in the Figma name (row 23), and
  - row 25 repeating row 24's Figma string (`$typography.numeric-display.regular.sm~xlg`)
    while its definition names the **prominent** category — so
    `$typography.numeric-display.regular.sm~xlg` appears twice (rows 24 and 25).
  These are the only typography rows with **no status**. Report them as design-only draft
  rows; do not invent a `numeric-display` token.

## Upstream v3 font-style references are design-side only

Several rows note a corresponding upstream v3 Figma font style (e.g.
`regular.body-1|heading.heading-5`, `heading.display-3`). That is a design-side
cross-reference for designers, not a code token path, and it does not confirm that this
typography snapshot is the Tonic UI v3 design source.

## Code API reminders

- Style-prop value forms: `fontSize="sm"` / `lineHeight="sm"` / `fontWeight="medium"` /
  `fontFamily="mono"` resolve through the theme; `<Text size="…">` sets fontSize+lineHeight.
- `TextLabel` sets the label **color** (`text.secondary`), not the weight — see row 13.
- `Code` sets `fontFamily: mono`, `_overlay.thinner` background and `text.primary`; a 14px
  size and a line height must be supplied by the caller.
- Prefer the token (`fontSizes.*`) over a literal when a token exists; use CSS-variable
  names only when the app enables the CSS variables mode (names derive from the real
  utility: dots → hyphens).

## Handoff

If a design role lacks a size/weight/line-height decision, record it with
[UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md): role, the composition that *is*
confirmed, the missing attribute, affected surfaces, and the source row/version.

## Related

- [TOKEN_MAPPING.md](TOKEN_MAPPING.md) — color side, and the shared status table.
- [UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md) — handoff format for design-only
  rows and missing attributes.
