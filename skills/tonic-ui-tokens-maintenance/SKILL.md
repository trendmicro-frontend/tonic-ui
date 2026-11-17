---
name: tonic-ui-tokens-maintenance
description: Maintain the Tonic UI v3 token inventory, redacted Figma variable snapshots and partial reviewed relations; investigate freshness, generate classified relation reports and inspect release snapshots. Not for consuming-app lookup or ordinary component development.
---

# Token maintenance

Use this contributor-only skill to maintain the bundled theme inventory, captured Figma
variables and reviewed relations, or to generate an offline relation report. It is not an
installable plugin. Repository paths below are root-relative; links under `references/` are
relative to this skill. The installed `tonic-ui-tokens` plugin handles consumer lookup.

## Assets and evidence

| Asset under `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/` | Origin | Rule |
| --- | --- | --- |
| `tokens.json` | Tonic UI v3 theme source and its resolver/CSS-variable utilities | Regenerate only. Never hand-edit. |
| `figma-variables/{foundations,semantic}.json` | Local variables captured from two named Figma libraries | Convert authorized raw captures; inspect changes and affected reviews. |
| `token-relations.json` | Partial reviews of captured variables and implemented theme tokens | Edit only reviewed pairs or reviewed absences with evidence and snapshot digests. The shipped ledger is empty. |

The location-redacted Figma snapshots retain Tonic One v4 library names, modes and
variable identities as design evidence; their applicability to Tonic UI v3 is
unverified. They do not prove that a v3 token or mode exists. Keep `meta.fileKey` and
`meta.figmaUrl` null and preserve the non-location `meta.fileKeySha256` fingerprint.
Do not reconstruct or publish private file locations. The implementation inventory
comes from this checkout's v3 theme source and CSS-variable utilities using the `tonic`
prefix. Never transplant v4 reviews as v3 evidence. Unreviewed is not a reviewed absence.

## Scope, authorization and privacy

- Freshness investigation, theme regeneration, Figma capture, conversion and relation
  review are separately authorized operations. A stale result alone does not authorize
  regeneration or repinning. Report generation is read-only and authorizes neither
  capture nor relation review.
- A capture does not authorize importing a development plugin, reading credentials,
  changing client configuration, changing theme code or reviewing relations. Obtain
  explicit authorization for each applicable operation, including external access or
  writes. Do not install tools or change credentials, settings or configuration without
  exact authorization.
- Do not modify manifests, catalogs, other delivered skill instructions, CI or library
  source as an incidental maintenance effect. If a requested change requires those edits,
  obtain the necessary authorization. No route alone authorizes a version bump, metadata
  sync, commit, push or publication.
- Use operator-supplied authorized sources and access; never publish private links, raw
  file keys or raw captures. Treat `.payloads/` and temporary exports as private local
  input, not deliverables. Never inspect credentials without exact authorization or
  disclose their values.

## Route the request

Read only the references needed for the requested operation; combine routes when
separately authorized work crosses boundaries. Each reference is linked below.

| Request | Reference | When to read |
| --- | --- | --- |
| Generate a classified Figma variable ↔ theme token report | [variable-theme-mapping.md](references/variable-theme-mapping.md) | Before generating or interpreting the read-only report. |
| Capture or convert Figma variables | [figma-variable-capture.md](references/figma-variable-capture.md) | Before separately authorized capture or conversion, including any separately authorized import and access. |
| Review variable-to-theme relations | [variable-theme-mapping.md](references/variable-theme-mapping.md) | Before an authorized review of named variables or theme paths; also use it when separately authorized review is needed after capture or regeneration. |

### Check freshness or investigate a mismatch

Read `scripts/README.md`, the `meta` block of
`plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json`, and the target
theme source that produced it. Then run both read-only checks from the repository root:

```bash
node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs --check
node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs
```

`--check` reports whether the committed inventory matches the current source and exits
nonzero without writing. The validator checks inventory freshness, captured variables,
relations and standalone plugin isolation. Both are offline: neither proves remote design
freshness. Report the mismatch, affected tokens and command; stop unless regeneration or
review is also authorized.

### Regenerate the implementation snapshot

Use only when explicitly asked to regenerate the inventory after a theme or CSS-variable
change. Inspect the source change, run
`node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs`, then validate tokens
and affected suites as described in `scripts/README.md`. Unchanged source-derived content
retains `meta.sourceRevision`; a moved HEAD alone does not change it. This route never
rewrites `token-relations.json` or uses the release snapshot updater. If a relation becomes
stale, report it; do not repin without separate review authorization.

Consult the manual delivery version policy in `scripts/README.md`. If a version bump or
catalog sync is needed, report it; perform it only with separate authorization.

### Investigate release-snapshot automation

Read `.github/workflows/ci-release.yml`, the `ci-version` script in `package.json` and
`plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs` before describing
them. The updater is a file-writing release step invoked after Changesets versioning and
install: it regenerates the implementation snapshot, sets the plugin patch once from the
fixed HEAD when bytes differ, synchronizes catalog metadata and validates. It takes no
arguments and does not commit or push. It is not a read-only checker or the routine path
for a snapshot request. Repeating it from the same HEAD does not accumulate bumps.
Do not execute it or trigger a workflow unless the release operation is authorized.

## Reporting

State the route used, endpoints, modes and evidence reviewed, changes made to each asset,
remaining stale or unreviewed coverage, and exact checks with results. Distinguish offline
integrity, remote freshness and rendered behavior; only checks actually run are evidence.
Do not disclose private locations, raw file keys or credentials. Keep temporary exports in
a unique directory under `$TMPDIR`, and remove only task-owned files when no longer needed.

`scripts/README.md` covers validation, reports and version policy; `skills/README.md`
summarizes the token assets; `CONTRIBUTING.md` covers contributor skill authoring.
