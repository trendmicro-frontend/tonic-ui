---
name: tonic-ui-tokens
description: Use when a designer hands over a "$color."/"$typography." Figma name, a screenshot or visual description, or a design spec that needs the real Tonic UI v3 token — resolving color/typography names to implemented code paths, dark and light values and emitted CSS variable names, including private tokens, code-only tokens, design-only entries and unresolved source conflicts. Also use for token paths that "resolve to nothing", for typography compositions (which font-size/weight pair a style uses), and for a handoff list of design entries with no code counterpart. Not for upgrading packages (that is tonic-ui-upgrade) and not for general component development or release verification (that is tonic-ui-dev).
---

# Tonic UI v3 token resolution

Everyday design-to-code work in an app that already uses `@tonic-ui/react` v3: turn a
design name, a screenshot, or a design spec into **real implemented tokens** — or into an
explicit "this is not implemented / not confirmed" answer.

Token selection does **not** require an upgrade or any package change. Do not route a
color/typography question into `tonic-ui-upgrade`; do not bump dependencies to answer it.

The bundled data is **generated from the theme source**, not copied from a design table, so
every implemented leaf is present (public and private). "The design table says X" is not the
authority here; the source-derived inventory is, and the curated Figma aliases are the bridge
to design names.

- `assets/tokens.json` — the complete source-derived token inventory (public + private,
  primitive/semantic/legacy, dark/light values, CSS variable names). 1074 records, 469 private.
- `assets/figma-mappings.json` — curated design aliases with status and database/row provenance.
- `scripts/lookup-tokens.mjs` — read-only lookup for both files (no install, no checkout needed).

The color database (`1939407344`) is confirmed as the v3 semantic color definitions by the
repository's v2-to-v3 color migration guide. The typography database (`1962606684`) and the
Designer Handbook / Light Mode guide snapshots are retained as upstream design provenance;
their applicability to Tonic UI is **unverified** (see [TOKEN_MAPPING.md](TOKEN_MAPPING.md)).

## Workflow

1. **Classify the query.** Exact Figma name (`$color.text.primary`), exact code token
   (`text.primary`, `_foreground.primaryVariant.selectedDisabled`, legacy `blue:60`), a
   family (`_component`, `background`, `_chart`), or a visual description (screenshot,
   "the row hover background", "the disabled toggle fill").
2. **Look it up** (step "Lookup" below) instead of guessing a path.
3. **Read the result status** — `verified`, `family-mapping`, `source-conflict`,
   `design-only`, `composed`, `code-only`, or `unresolved-source` — and the provenance
   (design row + content version).
4. **Answer with the real path and value.** Give `path`, dark/light values, and the CSS
   variable name when the lookup includes it. Private (`_…`) tokens are real but
   unpublished; say so rather than presenting them as stable public API.
5. **If evidence is missing, say so and continue with the rest.** Use
   [UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md) for a designer handoff when a
   token, state, mode, or attribute (typically line height) is unconfirmed. Never invent a
   path, never substitute a "close" primitive color for a missing semantic decision.

## Lookup

Run the bundled helper with Node, resolved relative to **this skill's directory** (in a
plugin cache the skill directory is not the repository root):

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --token 'text.primary'
node <skill-dir>/scripts/lookup-tokens.mjs --token '_component.keyboardFocused.outerFocusRing'
node <skill-dir>/scripts/lookup-tokens.mjs --figma '$color.status.negative.text'
node <skill-dir>/scripts/lookup-tokens.mjs --figma '$color.foreground.primary-variant.selected-disabled'
node <skill-dir>/scripts/lookup-tokens.mjs --family '_chart'
node <skill-dir>/scripts/lookup-tokens.mjs --query 'toast border'
```

- Exactly one of `--token`, `--figma`, `--family`, `--query`.
- JSON output: `{meta, results}`. Each result carries the code path, `kind`,
  `visibility`, dark/light values, `cssVariable` (when the source emits one), the mapping
  status, and design provenance.
- Unknown names **fail with a nonzero exit** — no fabricated black/transparent fallback.
- `design-only` results have `path: null` and no CSS value; `composed` typography results
  resolve `properties` to real token paths.
- Each `--figma` result carries `designSource` with the content ID, version, title,
  `applicability`, and any historical source title. An `unverified` applicability is a
  provenance limit, not a code-resolution failure; do not present the row as a
  target-confirmed design decision.

Query mechanics, so you can phrase them correctly:

- `--token` accepts a full inventory path (`colors.text.primary`), a bare token name
  (`text.primary`), a bracket-addressed decimal key (`borders["0.5"]`, quoted), or a legacy
  name (`blue:60`).
- `--family` returns a whole prefix, including bracket-addressed decimal keys — use it to
  enumerate a group instead of guessing member names.
- `--query` is a **literal, case-insensitive substring match**, not fuzzy, and it is compared
  against each token path and each design alias's name/role/notes. A multiword query must
  appear **verbatim** somewhere: `--query 'table text'` and `--query 'toast border'` match
  because those phrases occur in a role string, but `--query 'selected disabled'` and
  `--query 'disabled text'` fail because no single string contains them. Prefer one keyword
  (`--query disabled`) or a phrase copied from the design wording.
- The design ranges in the source (`chart-1~14`, `option-1~4`, `lv-1~10`) are **not**
  themselves resolvable by `--figma`; each member is recorded individually (`chart-1`,
  `option-1.chart-1`, …) so the range is expanded **by name**, never by position.
- For a chart range, explain that the brace/range notation is not literal lookup input.
  Separate the requested palette from any chart library's default color selection. This
  repository has no chart package; `_chart` tokens are theme data, not proof of a consumer
  default. Do not imply predictable options are defaults.

When no checkout is available this bundled snapshot is sufficient at its declared version.
When a checkout or installed library exists, prefer it for version-sensitive answers and
state the freshness limit: the snapshot's `meta.themeVersion`/`sourceRevision` are printed in
the lookup output, and the app's installed `@tonic-ui/react`/`@tonic-ui/theme` may be a
different version.

## Reading the statuses

| Status | Meaning |
| --- | --- |
| `verified` | The design alias maps to exactly one implemented token, matched by name against its database row. |
| `family-mapping` | One design entry covers a range (e.g. `chart-1~14`, `lv-1~10`); implemented members are expanded by name from the row. |
| `source-conflict` | The database row disagrees with the implemented theme (name, order or target); the conflict is recorded and the implementation wins for code. |
| `design-only` | The design entry has no implemented token — do not invent one or silently substitute another family. |
| `composed` | A typography role expressed as real property tokens (`fontSize`, `fontWeight`, `fontFamily`) rather than an invented composite API. |
| `code-only` | An implemented token with no design alias (or an alias whose row omits it); it is real code, not a design decision. |
| `unresolved-source` | The source reference itself does not resolve (e.g. `colors.riskLevel.*._gradient.opaque`); a verified-looking design alias must not present it as a usable color. |

`status` (design correspondence) is separate from the inventory's `resolutionStatus`: a
confirmed design alias can never upgrade an unresolved code value to `verified`.

## References

- [TOKEN_MAPPING.md](TOKEN_MAPPING.md) — design→code families, ordering/typo/conflict
  exceptions, draft entries, private and code-only guidance, Designer handoff fields.
- [TYPOGRAPHY_MAPPING.md](TYPOGRAPHY_MAPPING.md) — typography roles as real
  size/weight compositions, code-applied vs design-confirmed line height, display-size gaps.
- [SCREENSHOT_RULES.md](SCREENSHOT_RULES.md) — screenshot workflow and how to report
  candidate tokens without claiming identity from RGB.
- [UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md) — review template for missing
  tokens/states/attributes (local report; never sent automatically).
- [LANGUAGE_RULES.md](LANGUAGE_RULES.md) — output language and evidence labelling.

## Boundaries

- This skill answers **token questions**. General v3 component development and release
  verification belong to **`tonic-ui-dev`**; a v2→v3 application migration belongs to
  **`tonic-ui-upgrade`**.
- Do not edit library theme source in a consuming app's task; report a source conflict
  instead. Do not upgrade packages, generate new token snapshots, or change a Figma file.
- A successful lookup is evidence about the token, not proof that a component renders it;
  visual claims still need rendered inspection.
