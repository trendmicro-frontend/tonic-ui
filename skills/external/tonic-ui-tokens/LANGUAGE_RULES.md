# Language and evidence rules

Output conventions for the `tonic-ui-tokens` skill. They keep answers portable across
harnesses and honest about what was verified.

## Language

- **Respond in the user's language.** Match the language of the request; do not force English.
- **Preserve verbatim** — never translate, reformat or "correct": token paths
  (`_foreground.primaryVariant.selectedDisabled`), Figma names including source typos
  (`$color.foreground.seconary.disabled`, `sublte`), CSS variable names, package names and
  versions, component/prop names, file paths, and design DB names (`positive`,
  `major-warning`, `in-progress`).
- When a name looks wrong, keep it and say why (typo, ordering, conflict) instead of silently
  normalizing it.

## Evidence labels

Every actionable statement cites where it came from. Prefer a concrete source over a vague
reference.

- **Inventory** — `assets/tokens.json` (`path`, status, values, CSS variable), e.g.
  `colors._component.keyboardFocused.outerFocusRing` →
  `--tonic-colors-_component-keyboardFocused-outerFocusRing`.
- **Mapping** — `assets/figma-mappings.json` with status and `source.contentId/version/row`.
- **Source** — a repository module/declaration at the snapshot revision
  (`packages/theme/src/v3/...`, `packages/react/src/...`).
- **Guide** — the public migration/theme docs pages under `packages/react-docs/pages/`.
- **Design guidance** — the upstream Designer Handbook / Light Mode guide snapshots. Their
  applicability to Tonic UI is unverified; they are advice, not alias evidence.
- **Inference** — a conclusion not directly observed; mark it explicitly (`[INFERENCE]`) and
  state the basis.

When a guide and the source disagree, report the conflict with both references; the
implementation wins for code answers. Never repair a library/theme discrepancy inside a
consuming-app task.

## Claim discipline

- A **path existing** (resolved token), a **design alias being verified**, and a **component
  actually rendering a token** are three different claims. Do not let one imply another.
- `verified` means the alias maps to one implemented token by name — not that the token is
  the right design choice for a new surface.
- **Public vs private is a precise claim.** `visibility` is `private` exactly when some path
  segment starts with `_` (0 exceptions in the inventory), so `_…` prefixes are the reliable
  marker. In this repository's data, all 469 private records carry an `_` segment and all 605
  public records do not. A private token is implemented but unpublished — say so; do not
  present it as stable public API, and do not imply a deprecation schedule it does not have.
- **Primitive vs semantic vs legacy** are separate `kind` values. Primitive shades
  (`colors.gray.700`) have no design alias; do not present one as "the design token".
- `design-only` means no code exists. Do not substitute a "similar" token, and do not present
  a draft (`🚧`/TBD) entry as final.
- A screenshot RGB value is **corroborating evidence**, never proof of variable identity —
  even if only one candidate fits.
- Do not convert Figma `md`/`lg` size names into code `md`/`lg` by assumption: `body.md` is
  14px (`fontSizes.sm`), not 16px. Likewise do not read a design `md` as a specific size
  without checking the row.

## Capability and portability

- Describe **capabilities**, not host-specific tooling. Do not require slash commands, a
  particular CLI, a specific model/provider, `allowed-tools`, host URIs, or a mandatory MCP
  server.
- The bundled snapshot works offline at its declared revision. When a checkout or installed
  library is present, compare versions and prefer matching evidence; otherwise state the
  freshness limit. Do not present the snapshot as a newer release or as an app's custom theme.
- Figma/Confluence/docs connectors are optional refresh paths. Without them, use the bundled
  files, readable local sources, or the user's exports. If an image cannot be inspected, ask
  for the variable/style labels or a text export and complete the reachable lookup. Never
  claim to have read an image, a Figma file, or a Confluence page the host could not open.
- Reference sibling skills by **name and role** (not absolute machine paths):
  `tonic-ui-dev` for v3 component development and release verification, `tonic-ui-upgrade`
  for v2→v3 migration. **Neither is a prerequisite for token selection**, and no package
  change is needed to answer a token question.

## Honesty about verification

- Report only what was actually checked. A lookup result is not a visual confirmation.
- Do not state a design-confirmed line height, display size, or variable identity that the
  source does not confirm.
- Do not silently normalise source typos, duplicate rows, or conflicts — surface them.
- **Source disagreements are reported, not repaired.** The upstream Light Mode guide snapshot
  names the disable overlay `_overlay._inverse.thick`, but the implemented path is
  `colors._overlay.inverse.thick` (no underscore-internal segment); both references are shown
  and the code decides. The snapshot's applicability to Tonic UI is itself unverified.
- Keep "verified", "candidate", "design-only" and "unknown" distinct in every answer; do not
  fill a gap with plausibility.
- No automatic sends and no external issue creation; record findings.

## Related

- `tonic-ui-dev` — everyday frontend guidance for consuming an app.
- `tonic-ui-upgrade` — planning and executing a package upgrade. Token selection does not
  require an upgrade.
