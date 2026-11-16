# Captured Figma variable correspondence

Read this reference for a captured variable's identity or its relationship to an implemented
Tonic UI theme token. Lookup is read-only and offline; the installed skill needs no checkout,
network access or credentials. The captured libraries describe Tonic One v4 design data,
whose applicability to the Tonic UI v3 implementation is unverified.

## Select and look up

Run exactly one selector relative to this skill directory:

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --variable 'semantic:Color/text/primary'
node <skill-dir>/scripts/lookup-tokens.mjs --token 'colors.text.accent'
```

`--variable` accepts an exact stable key, `semantic:<key>` or `foundations:<key>`, or an
exact qualified path such as `semantic:Color/text/primary`. A bare path must be qualified;
a bare key is accepted only when unique across both libraries. Unknown and ambiguous
selectors fail. This selector addresses a captured variable; `--figma` searches the
separately curated design alias rows.

A variable result includes its captured `variable`, `correspondence` and any current
reviewed `themeTokens`. An implemented token result keeps its original alias `status`,
values, CSS variable and `resolutionStatus`, and adds `correspondence` and any current
reviewed `figmaVariables`. Composed typography exposes correspondence separately on each
resolved property; a composite variable identity is not implied.

## Interpret the evidence

The shipped target mapping has **no variable-relation ledger**. Captured variables and
implemented tokens are therefore `unreviewed`, with no inferred counterparts. A similar
name, value, mode or `codeSyntax` does not establish a match or absence. In particular,
a captured v4 mode is not proof of a v3 implementation decision.

The lookup also understands separately reviewed relations if supplied with the required
snapshots and evidence:

- `mapped`: one or more positive reviews are current. Report all current counterparts and
  each review's exact `modeMap`; modes and values remain separate, not universally equal.
- `figma-only` / `theme-only`: an explicit current absence review within the captured
  libraries and theme snapshot, not a claim about every Figma file or theme version.
- `unreviewed`: no review establishes a relationship or absence for that endpoint.
- `stale`: an endpoint, reviewed mode or evidence digest changed. Stale evidence remains
  visible but is not returned as a current counterpart; other current edges may remain.

Each review carries its reason, review date, optional exact curated source rows, digests,
freshness and, for mapped relations, the reviewed mode map. `meta.variableSources` reports
library fingerprints, capture/export metadata and counts, never private file locations.
`meta.themeVersion` and `sourceRevision` describe the separate implementation snapshot.
A timestamp-only change does not stale unchanged positive endpoints; absence reviews depend
on the entire captured scope. None of these checks establishes current remote design data or
the version installed in a consuming app.

A curated alias marked `code-only` is not a reviewed absence of a Figma variable. A
`design-only` row is not automatically a reviewed absence in either captured library. An
unresolved theme token remains unresolved even if a separate variable review is current.
