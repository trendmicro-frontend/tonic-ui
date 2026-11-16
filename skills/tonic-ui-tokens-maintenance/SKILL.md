---
name: tonic-ui-tokens-maintenance
description: Maintain this repository's Tonic UI v3 token inventory, redacted Figma variable snapshots, curated design mappings and reviewed variable relations, including freshness checks and release-snapshot investigation. Not for consuming-app lookup or ordinary component development.
---

# Token maintenance

Use this contributor-only skill to maintain the bundled theme inventory, captured Figma variables, curated design mappings, reviewed variable relations and their provenance. It is not an installable plugin, and no plugin depends on it. Repository paths below are relative to the repository root; links under `references/` are relative to this skill.

The installed `tonic-ui-tokens` plugin is the consumer lookup. Answer ordinary token questions through its local resources; do not require this skill, a checkout or remote access.

## Asset rules

| Asset under `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/` | Origin | Rule |
| --- | --- | --- |
| `tokens.json` | Tonic UI v3 theme source and its resolver/CSS-variable utilities | Regenerate only. Never hand-edit. |
| `figma-variables/{foundations,semantic}.json` | Local variables captured from the two named Figma libraries | Convert validated raw captures; inspect changes and affected relation reviews. |
| `figma-mappings.json` `sources` and `mappings` | Curated design rows with content ID, version and row provenance | Compare authorized sources and edit checked records with evidence. Never regenerate from theme names. |
| `figma-mappings.json` `variableRelations`, when present | Scoped reviews of captured variables and implemented theme tokens | Edit only reviewed pairs or reviewed absences with evidence and snapshot digests. Coverage is partial. |

The location-redacted Figma snapshots retain Tonic One v4 library names, modes and variable identities as design evidence; their applicability to Tonic UI v3 is unverified. They are not proof that a v3 token or mode exists. Keep `meta.fileKey` and `meta.figmaUrl` null and preserve the non-location `meta.fileKeySha256` fingerprint. Do not reconstruct or publish private file locations. The implementation inventory comes from this checkout's `packages/theme/src/v3/primitive/index.js`, `packages/theme/src/v3/semantic/index.js` and target CSS-variable utilities, using the `tonic` prefix.

Curated rows and the variable-relation ledger are independent: theme names cannot reconstruct a curated alias, and absent relations do not establish absent counterparts. The v3 semantic color database's applicability is confirmed by the repository migration guide; the retained upstream typography and guidance snapshots remain unverified for Tonic UI unless independently established. An absent ledger is valid and means `unreviewed`, not an absent counterpart. Never transplant v4 reviews as v3 evidence.

## Scope, authorization and privacy

- Freshness investigation, theme regeneration, curated-source refresh, Figma capture, conversion and variable-relation review are separately authorized operations. A request may authorize more than one by naming them; a stale result alone does not authorize regeneration or repinning. Local checks needed to verify an authorized edit are not permission for another refresh or a write.
- A design refresh covers only the sources and families named in the request. Unnamed sources keep their recorded provenance. Report any newly discovered external source for separate authorization.
- A capture does not authorize importing a development plugin, reading credentials, changing client configuration, refreshing curated sources, changing theme code or reviewing relations. Obtain explicit authorization for each applicable operation, including external access or writes, before acting. Do not install tools or change credentials, settings or configuration without exact authorization.
- Do not modify manifests, catalogs, other delivered skill instructions, CI or library source as an incidental maintenance effect. If a requested change requires those edits, report them and obtain the necessary authorization. No route alone authorizes a version bump, metadata sync, commit, push or publication.
- Use operator-supplied authorized sources and access; never publish private links, raw file keys or raw captures. Treat `.payloads/` and temporary exports as private local input, not deliverable resources. Do not inspect credentials unless that exact access is explicitly authorized, and never disclose their values.

## Route the request

Read only the references needed for the requested operation; combine routes when separately authorized work crosses boundaries. Each reference is directly linked below.

| Request | Reference | When to read |
| --- | --- | --- |
| Refresh curated design sources | [design-source-refresh.md](references/design-source-refresh.md) | Before touching requested sources or mapping records. |
| Capture or convert Figma variables | [figma-variable-capture.md](references/figma-variable-capture.md) | Before separately authorized capture or conversion, including any separately authorized import and access. |
| Review variable-to-theme relations | [variable-theme-mapping.md](references/variable-theme-mapping.md) | Before an authorized review of named variables or theme paths; also use it when separately authorized review is needed after capture or regeneration. |

### Check freshness or investigate a mismatch

Read `scripts/README.md`, the `meta` block of `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json`, and the target theme source that produced it. Then run both read-only checks from the repository root:

```bash
node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs --check
node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs
```

`--check` reports whether the committed inventory matches the current source and exits nonzero without writing. The validator checks inventory freshness, mapping provenance and targets, variable evidence and standalone plugin isolation. Both are offline: neither proves that a remote design source is current. Report the mismatch, affected tokens and command that produced the evidence. Stop unless regeneration is also authorized.

### Regenerate the implementation snapshot

Use this route only when the user explicitly asks to regenerate the inventory after a theme or CSS-variable change.

1. Inspect the source change so you can explain what will differ.
2. Run `node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs` from the repository root. It loads the checked-out v3 theme source, including uncommitted changes and private tokens, and preserves `meta.sourceRevision` when nothing else changed, so a moved HEAD alone does not create a diff.
3. Run `node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs` and the relevant token suites under `plugins/tonic-ui-tokens/scripts/__tests__/` to verify the authorized change.
4. Consult the manual delivery version policy in `scripts/README.md`. If a version bump or catalog sync is needed, report it; perform it only with separate authorization.

This route never rewrites `figma-mappings.json`, refreshes design source versions or uses the release snapshot updater. If validation reports a mapped target that the new source removed, report the exact affected aliases. Do not invent replacements, edit library source or weaken the validator; if the required mapping decision is not authorized, report the work as incomplete.

### Investigate release-snapshot automation

Read `.github/workflows/ci-release.yml`, the `ci-version` script in `package.json` and `plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs` before describing them. The updater is a file-writing release step invoked by `ci-version` after Changesets versioning and install: it regenerates the implementation snapshot, sets the plugin patch once from the fixed HEAD when bytes differ, synchronizes catalog metadata and validates. It takes no arguments and does not commit or push. It is not a read-only checker, a design refresh or the routine path for a snapshot request. Repeating it from the same HEAD does not accumulate bumps.

Explain behavior on request. Do not execute the updater or trigger a workflow unless the request explicitly authorizes that release operation.

## Status vocabulary

Persisted mapping records use `verified`, `family-mapping`, `source-conflict`, `design-only` and `composed`. `code-only` and `unresolved-source` are lookup outcomes, not persisted mapping statuses. Unimplemented entries keep `path: null`. Typography compositions use real `properties`, confirmed `literalProperties` and `missingAttributes`; there is no composite `$typography.*` API. A verified design label never makes an unresolved code reference a usable color, and code-applied line height is not design-confirmed evidence.

Variable relations are a separate partial-coverage axis: `mapped`, reviewed `figma-only` or `theme-only`, `unreviewed`, and `stale`. A missing relation is not a reviewed absence.

## Reporting

State the route used, sources or rows reviewed with content IDs and versions, changes made to each asset, preserved conflicts and missing coverage, and the exact checks with results. Distinguish offline integrity, remote freshness and rendered behavior; only checks actually run are evidence. Do not disclose private locations, raw file keys or credentials. Keep temporary exports in a unique directory under `$TMPDIR`, and remove only task-owned files when no longer needed.

## Related repository documents

- `scripts/README.md` — validation commands, environment inputs, version policy and release automation.
- `skills/README.md` — token asset maintenance summary and curated source list.
- `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/TOKEN_MAPPING.md` and `TYPOGRAPHY_MAPPING.md` — curated guidance shown to consumers.
- `CONTRIBUTING.md` — contributor skill authoring rules.
