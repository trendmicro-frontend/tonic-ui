# Figma variable snapshots

These are location-redacted captures of two Tonic One v4 design libraries. They retain
source library and mode names, collection and variable records, original capture metadata,
values, descriptions and resolved or unresolved aliases. The `fileKey` and `figmaUrl`
fields are `null`; `fileKeySha256` identifies the source without exposing its location.
They are not verbatim mirrors and their applicability to Tonic UI v3 is **unverified**.
They neither establish what the v3 theme implements nor prove current remote design data.

| File | Layer | Variables | Collections |
| --- | --- | ---: | ---: |
| `foundations.json` | primitive | 2,368 | 9 |
| `semantic.json` | semantic | 1,158 | 10 |

`../tokens.json` is generated from the Tonic UI v3 theme and is the implementation
source of truth. `../token-relations.json` is the separate partial correspondence ledger.
The shipped ledger is empty: its variable correspondence is `unreviewed`, not an
assertion of a match or absence.

## Data shape

The schema version 1 document contains `meta` and `variables`. Metadata records the
library, layer, source name, capture and export times, counts, collection modes, alias
statistics and redacted location identity. Each variable has its collection-qualified
`path`, authored `token`, stable `figmaKey`, file-scoped `figmaId`, resolved type,
mode-keyed `values`, optional description and other design metadata. Stable variable and
collection keys are retained for alias joins; the location fingerprint is not a variable key.

Values describe colors, numbers, strings, booleans or aliases. Aliases retain their target
ID and any available target key and name. A resolved `target` identifies its library, path,
collection and stable key; `target: null` means the target was not resolved in these two
captures, not that it is broken. Mode names and values are preserved as captured; some
variables do not have a value in every collection mode.

## Scope and known gaps

- The semantic Color collection includes both v4 and legacy v3 mode names. The legacy v3
  aliases target an older foundations library that is not included in these two captures;
  the original target names are retained without inventing resolutions.
- Some v4 aliases target variables outside the captured libraries and remain unresolved.
  Captured descriptions may also be absent; they are not filled in by the exporter.
- The snapshots capture variables, not all prototype or text styles. They are independent
  design evidence, not a v3 implementation mapping. A similar path, color, mode or
  `codeSyntax` is not a reviewed correspondence.

## Maintenance

The consumer lookup reads these snapshots offline without a checkout, credentials or
capture tools. Contributors separately authorized to refresh captures or review relations
should use the `tonic-ui-tokens-maintenance` skill. Capturing variables does not refresh
the theme inventory or authorize a relation review.
