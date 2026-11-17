# Unmapped / unconfirmed token review template

Use this local report when a theme token, captured-variable counterpart, prototype style,
state or attribute cannot be confirmed. Never send it to a designer, issue tracker or
external system automatically.

```markdown
### <element + role>

- **Element / surface:** <component and part>
- **Role / state:** <default | hovered | selected-disabled | other>
- **Color mode:** <dark | light | both | unknown>
- **Design input:** <exact variable/style label, stable key, export, or screenshot only>
- **Captured variable:** <library and path/key | not captured | unconfirmed>
- **Implemented candidates:**
  - `<real theme path>` — resolution `<verified|unresolved-source>`, visibility `<public|private>`, values `<…>`, CSS `<…|none>`
- **Correspondence:** <mapped | figma-only | theme-only | unreviewed | stale>, review/modes/freshness `<…|none>`
- **Missing evidence / decision:** <label | reviewed counterpart | state | line height | other>
- **Snapshot evidence:** <theme version/revision; variable library and capture time>
- **Affected surfaces:** <components or pages>
- **Interim guidance:** <already established choice for the same intent | do not style until decided | request review>
- **Review outcome:** <open | confirmed | rejected | deferred>
```

## Rules

1. Use only real inventory paths and values; an empty result is not proof of universal
   absence and never justifies a fabricated CSS variable or nearest-color substitute.
2. `unreviewed` is not an absence review. Report `figma-only` or `theme-only` only for an
   explicit current review and its captured scope. Stale reviews are not current edges.
3. State the mode and state. `_fixed` and `_inverse` variants may differ from the surrounding
   mode. Treat every missing token, state or typography attribute as a separate decision.
4. Cite the snapshot and any actually observed label/export. Captured Tonic One v4
   variables have unverified applicability to Tonic UI v3 and do not include every
   prototype or text style; a screenshot color cannot identify a token.
5. Continue confirmed work elsewhere; preserve private/legacy and unresolved-source
   qualifications rather than promoting candidates to confirmed choices.

See [screenshot rules](SCREENSHOT_RULES.md) for evidence grades and
[variable relations](references/variable-relations.md) for correspondence and freshness.
