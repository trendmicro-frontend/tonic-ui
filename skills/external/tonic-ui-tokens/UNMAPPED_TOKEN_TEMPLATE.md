# Unmapped / unconfirmed token review template

Use this when a design name, screenshot, or spec cannot be resolved to a verified token — or
when a design entry exists but the implementation does not. It is a **local report**: never
send it to a designer, an issue tracker, or any external system automatically.

## Fill-in template

```markdown
### <short title — element + role>

- **Element / surface:** <component + part, e.g. "DataGrid row hover background">
- **Role / state:** <e.g. hovered, selected-disabled, disabled, default>
- **Color mode:** <dark | light | both | unknown>
- **Design input:** <exact Figma name/row if any; "screenshot only" otherwise>
- **Implemented candidates:**
  - `<real path>` — status `<verified|family-mapping|source-conflict|design-only|composed|code-only|unresolved-source>`, values dark/light `<…>`, CSS `<…|none>`
  - `<alternative path>` — status `<…>`
- **Missing evidence / decision:** <variable label | new token | draft promotion | alias confirmation | line-height annotation | other attribute>
- **Source version:** contentId `<…>` version `<…>` row `<…>`
- **Affected surfaces:** <components/pages that would change>
- **Interim guidance:** <use an already-verified token for the same intent | do not style until decided | escalate to designer>
- **Review outcome:** <open | confirmed | rejected | deferred>
```

## Rules

1. **No invented paths.** If the theme has no token for the role, the field stays empty and
   the missing decision is named. `path: null` design-only records are the evidence.
2. **Record candidates with their real status.** A `code-only` candidate is real code but not
   a design decision; a `design-only` candidate is a design decision but not code. Do not
   upgrade one into the other.
3. **Mode/state aware.** State which mode and state the report covers; `_fixed`/`_inverse`
   variants mean the answer can differ from the surrounding mode.
4. **One decision per row.** A missing token, a missing state and a missing typography
   attribute are separate decisions; do not bundle them into one ask.
5. **Version the evidence.** Always include the source content ID/version/row so a later
   database revision can be diffed against it.
6. **Continue elsewhere.** A blocked decision does not block the rest of the work — keep the
   verified mappings and mark only the unresolved surfaces.
7. **No placeholder values.** Never write a nearest-match primitive, a made-up CSS variable,
   or a corroboration-only screenshot value as if it were an identity.

## Example (filled — real values)

```markdown
### Promotion toast icon on overlay

- **Element / surface:** toast icon rendered on the promotional overlay
- **Role / state:** promotional status, icon on semi-transparent overlay
- **Color mode:** both
- **Design input:** `$color.status.promotional.on-overlay.icon` (color DB row 69)
- **Implemented candidates:** none — `colors.promotion` has `icon`, `border` and
  `_overlay`, but no `_onOverlay.*` leaves (status `design-only`, path null)
- **Missing evidence / decision:** new tokens or a reviewed alternative for
  promotion on-overlay text/icon
- **Source version:** contentId 1939407344, version 559, row 69
- **Affected surfaces:** toast/banner promotional variant
- **Interim guidance:** do not style the icon until decided; if the toast must ship,
  ask design which existing verified status token pair is acceptable (do not pick one
  unilaterally)
- **Review outcome:** open
```

## Related

- [TOKEN_MAPPING.md](TOKEN_MAPPING.md) — statuses, conflicts and the code-only/design-only lists.
- [TYPOGRAPHY_MAPPING.md](TYPOGRAPHY_MAPPING.md) — missing-attribute (`lineHeight`) and display-size gaps.
- [SCREENSHOT_RULES.md](SCREENSHOT_RULES.md) — candidate evidence grades when the input is an image.
