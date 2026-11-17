---
name: tonic-ui-tokens
description: Use for Tonic UI v3 theme-token paths and values, captured Figma variable identity and reviewed correspondence, wildcard lookup, screenshots or unconfirmed design handoffs. Includes private and legacy tokens, CSS variables and unresolved source values. Not for capturing or regenerating data, upgrading packages, general component development or release verification.
---

# Tonic UI v3 token resolution

Use this skill for app-code and Figma prototype questions in an app already using
`@tonic-ui/react` v3. Match the actual theme inventory or captured variables, report the
evidence and its limits, and leave unavailable design decisions unconfirmed. Token
selection does not require an upgrade or package change.

## Data and boundaries

- `assets/tokens.json` is generated from the Tonic UI v3 theme source and includes public
  and private, primitive, semantic and legacy leaves, mode and unit values, and emitted
  CSS variables. Its metadata identifies the theme version and source revision.
- `assets/figma-variables/` contains location-redacted snapshots of Tonic One v4
  Foundations and Semantic variables, including modes and alias targets. Their
  applicability to Tonic UI v3 is **unverified**. They do not include every prototype or
  text style and are not a live view of Figma.
- `assets/token-relations.json` is a **partial** ledger of reviewed variable-to-theme
  correspondence. The shipped Tonic UI ledger is empty: all endpoints are `unreviewed`,
  not proven matches or absences. Never transplant v4 reviews as v3 evidence.
- `scripts/lookup-tokens.mjs` reads the bundled data offline. It needs no checkout,
  installation, Figma connection, credentials or network.

Query only: do not capture or regenerate snapshots, change relations or Figma files, edit
theme source, or upgrade packages as a side effect. Never infer identity from matching
names, RGB values, screenshots or `codeSyntax` alone. A lookup does not prove what a
component renders.

## Workflow

1. Identify the input: an implemented theme path or short token name, a captured Figma
   variable path or stable key, or a screenshot/prototype without an identifiable label.
2. Match the relevant selector below. For a screenshot, first gather role, state, mode and
   surface; use only actual inventory results as candidates.
3. Report the complete matching paths, mode/unit values and CSS variable when available.
   A path with an `_` segment is private: implemented, but not stable public API. Keep
   retained legacy tokens identified as legacy.
4. Interpret implementation `resolutionStatus` separately from variable
   `correspondence`. An unresolved source reference is not a usable resolved value even
   when its relation is current. Only current positive reviews provide counterparts.
5. Compare snapshot metadata with the app's installed theme version when possible. If a
   prototype style, mode, identity or other evidence is missing, say what remains
   unconfirmed; do not invent a mapping or substitute a visually similar primitive.

## Match selectors

Resolve the command relative to **this skill's directory**, including in a plugin cache:

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'text.primary'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token '_component.keyboardFocused.outerFocusRing'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'borders["0.5"]'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'colors.text.*'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'colors.**.disabled'
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'semantic:Color/text/primary'
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'Color/text/**'
```

Supply exactly one `--theme-token` or `--figma-variable` selector. The output is
`{ meta, results }`; an unknown valid selector returns an empty `results` array and exit
0, not a fallback. Invalid selectors or data fail. There is no free-text, alias or
substring search.

- Theme selectors accept full paths, exact short names such as `text.primary`, decimal
  short names such as `0.5`, private names, and legacy names such as `blue:60`.
- `*` matches any characters within one segment; an entire unquoted `**` segment matches
  zero or more complete segments. Thus `colors.text.*` selects direct leaves, while
  `colors.text.**` also reaches descendants. Quote patterns in a shell.
- Theme segments are separated by dots; bracket-quoted keys remain one segment, and
  quoted stars in bracket keys are literal. Figma paths use slashes; dots in a Figma
  segment are literal. Matching is case-sensitive.
- A Figma selector can be a captured path or stable key. An optional `semantic:` or
  `foundations:` prefix restricts the library; without a prefix, all loaded libraries
  are searched and every match retains its library identity. Wildcards match paths, not
  stable keys.

## Task references

Read only the references relevant to the request; combine routes when it crosses them.
Links are relative to this skill directory.

| Task | Read |
| --- | --- |
| Interpret captured variables, reviewed counterparts, modes or freshness | [Variable relations](references/variable-relations.md) |
| Interpret a screenshot or visual description | [Screenshot rules](SCREENSHOT_RULES.md) |
| Prepare a local handoff for an unconfirmed token, state or attribute | [Unmapped token template](UNMAPPED_TOKEN_TEMPLATE.md) |
| Choose evidence labels and language for an answer | [Language rules](LANGUAGE_RULES.md) |
| Understand captured variable fields, aliases and known gaps | [Figma variables README](assets/figma-variables/README.md) |

The offline snapshot is evidence at its declared revision, not proof of a newer release,
the app's custom theme or the current remote prototype. If the host cannot inspect an
image, say so and request labels or an export while completing reachable lookups.
General component development belongs to `tonic-ui-dev`; upgrades belong to
`tonic-ui-upgrade`. Neither is a prerequisite for token selection.
