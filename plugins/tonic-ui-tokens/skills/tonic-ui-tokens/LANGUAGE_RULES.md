# Language and evidence rules

These conventions keep `tonic-ui-tokens` answers portable and honest about what was
actually checked.

## Language

- Respond in the user's language. Preserve exact theme paths, Figma paths and names,
  stable keys, CSS variables, package versions, component/prop names and file paths.
  Do not silently correct spelling or casing.
- Describe capabilities rather than requiring a particular host, model, connector,
  slash command or MCP server. The bundled snapshot works offline.

## Evidence labels

- **Theme inventory** — `assets/tokens.json`, including `path`, `resolutionStatus`, values
  and CSS variable. Cite its Tonic UI v3 theme version and source revision when relevant.
- **Figma capture** — the named library and variable record in `assets/figma-variables/`;
  record mode and capture freshness. These location-redacted Tonic One v4 captures have
  unverified applicability to Tonic UI v3, do not cover all prototype or text styles and
  do not establish current remote state.
- **Reviewed relation** — `assets/token-relations.json`, with correspondence status,
  review date, reason, mode map and freshness. Its `sourceRows` are historical citations,
  not proof of current wiki content. The shipped Tonic UI ledger contains no reviews.
- **Source** — a repository module, declaration or app code at the checked revision.
- **Inference** — a conclusion not directly observed; label it `[INFERENCE]` and explain
  its basis.

A theme path existing, a captured variable being identified, a current reviewed relation
and a component rendering that token are different claims. State which was established.
`resolutionStatus: verified` describes implementation resolution, not design approval;
an unresolved source value is not made usable by a current relation.

## Claim discipline

- `visibility: private` means an `_`-prefixed path segment. Private tokens are implemented
  but unpublished and not stable public API. Distinguish primitive, semantic and legacy
  `kind` values.
- Missing matches return an empty result; they do not establish that a design concept or
  token is absent everywhere. `unreviewed` means no relation review, not a reviewed
  absence. `figma-only` and `theme-only` require an explicit current scoped review.
- Do not infer correspondence from spelling, `codeSyntax`, RGB, identical values or an
  image. A Figma variable/style label identifies only what it actually names; a theme
  counterpart needs separate current relation or other explicit evidence.
- Do not guess typography pairings, line height or other prototype attributes. Match
  implemented property tokens individually and distinguish code-applied behavior from
  design-confirmed evidence.
- Preserve stale reviews as historical evidence, not current counterpart edges. Report
  contradictions or unresolved source values instead of silently repairing library data.
- Compare snapshot and installed package versions when available; do not represent the
  snapshot as a newer release or an app's custom theme. If an image or source cannot be
  inspected, say so, ask for labels or an export, and complete reachable work.
- Record handoff findings locally. Do not send messages or create external issues
  automatically.

`tonic-ui-dev` covers component development; `tonic-ui-upgrade` covers migrations.
Neither is a prerequisite for choosing a token.
