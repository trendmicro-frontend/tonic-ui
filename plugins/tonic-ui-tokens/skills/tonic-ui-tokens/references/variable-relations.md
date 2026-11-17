# Captured Figma variable correspondence

Use this route for captured Figma variable identity, reviewed theme counterparts, modes
and freshness. The consumer plugin is read-only and offline; the bundled records are
snapshots, not live Figma or a complete inventory of prototype and text styles. The
location-redacted Tonic One v4 captures have unverified applicability to Tonic UI v3.

## Select and match

Run one selector relative to this skill directory:

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'semantic:Color/text/primary'
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'Color/text/**'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'colors.text.accent'
```

An exact captured path or stable key can be scoped with `semantic:` or `foundations:`.
Without a scope, both loaded libraries are searched; all matches retain their library,
including shared paths or keys. For path patterns, `*` covers one slash-delimited segment
and `**` covers zero or more segments. Wildcards do not search stable keys. Matching is
case-sensitive; quote patterns in the shell.

Valid selectors with no matches return `{ meta, results: [] }` and exit 0. Unknown library
qualifiers or malformed selectors fail. Variable results contain `variable`,
`correspondence`, and `themeTokens` for current positive reviews. Theme results preserve
the inventory record, `correspondence`, and `figmaVariables` for current positive reviews.
Multiple records may connect either endpoint: report all supported counterparts and their
scoped modes, not just the first.

## Interpret evidence and scope

The shipped Tonic UI ledger is empty. Captured variables and implemented tokens are
therefore `unreviewed`, with no inferred counterparts. Similar names, values, modes or
`codeSyntax` do not establish a match or absence, and a captured v4 mode is not proof of
a v3 implementation decision.

- `mapped`: one or more positive reviews are current. Report each exact `modeMap`;
  captured modes do not establish mappings for other modes.
- `figma-only` / `theme-only`: an explicit, current absence review of the endpoint
  against the two named captured libraries and the captured theme, not every Figma file.
- `unreviewed`: the partial ledger has no review for this endpoint.
- `stale`: an endpoint, mode or reviewed snapshot digest changed. Original evidence
  remains visible, but stale edges are not current counterparts. Another current edge can
  still be listed; distinguish it from the stale review.

Correspondence precedence is stale, mapped, reviewed absence, then unreviewed.
Implementation `resolutionStatus` is separate: `verified` means the source value
resolved, not design approval; an unresolved token stays unresolved even if its
correspondence is current. A review states correspondence, not universal value equality.

Each review exposes its reason, date, `sourceRows` historical citations, snapshot digests,
freshness and, for a positive relation, mode map. Historical citations are preserved as
review evidence, not proof of current wiki content. `meta.variableSources` identifies the
captured libraries by fingerprint and capture/export metadata without private locations;
`meta.themeVersion` and `sourceRevision` describe the theme snapshot. A timestamp-only
change does not stale an unchanged positive endpoint. Negative reviews depend on the
entire captured scope, so new endpoints require review. Neither offline integrity nor a
capture proves current Figma data or an app's installed theme version.

For checkout-only report generation or an authorized relation review, use the
[`tonic-ui-tokens-maintenance` relation procedure](https://github.com/trendmicro-frontend/tonic-ui/blob/main/skills/tonic-ui-tokens-maintenance/references/variable-theme-mapping.md).
It is optional for consumers and does not authorize capture or a review by itself.
