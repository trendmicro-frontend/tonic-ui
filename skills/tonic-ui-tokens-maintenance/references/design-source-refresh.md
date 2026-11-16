# Design source refresh

Ordered procedure for refreshing curated design mappings in `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-mappings.json`. Paths starting with `assets/`, `TOKEN_MAPPING.md` or `TYPOGRAPHY_MAPPING.md` are relative to `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/`; all other repository paths are relative to the repository root. This route requires explicit authorization for the named sources and families; it does not authorize capture, relation review or theme regeneration.

## 1. Establish the requested scope

Read the `sources` array and affected `mappings` records, the `meta` block of `assets/tokens.json`, and `TOKEN_MAPPING.md` and `TYPOGRAPHY_MAPPING.md` next to the assets.

Match a source by content ID **and** version, not by title. Titles change while identity does not. The target records distinguish these source roles:

| Source | Content ID | Kind and v3 applicability |
| --- | --- | --- |
| Semantic color database | `1939407344` | Alias table; the repository's v2-to-v3 migration guide confirms its v3 semantic color provenance. |
| Typography database | `1962606684` | Alias table; applicability to Tonic UI v3 is unverified. |
| Designer Handbook snapshot | `1927774846` | Upstream guidance, not an alias table; v3 applicability is unverified. |
| Light Mode guide snapshot | `2386166626` | Upstream guidance, not an alias table; v3 applicability is unverified. |

Recorded versions are observations from the last review, not permanent latest-version pins. Review only sources and families named by the user. Do not expand a scoped refresh to other sources; report a newly discovered source for separate authorization. Do not treat Tonic One v4 snapshots or matching names as proof of Tonic UI v3 applicability.

## 2. Read the actual source

Start with local curated records and an operator-supplied authorized source or export. Read database rows and page bodies, not only metadata. A version number, update timestamp or title alone is not content evidence. Do not publish or reconstruct private source locations; external access must be separately authorized.

Compare an export only when its content ID and version are known; otherwise state that freshness cannot be established. If the source or access is missing, preserve existing data, report exactly which source could not be read, and do not install tools, change settings, inspect credentials or claim the refresh is complete.

## 3. Record what was observed

For each source actually read, capture the content ID, observed version, update time when returned, retrieval date and rows covered by the comparison. Compare against current records:

- added, removed and renamed rows;
- role, state, mode and target changes;
- draft or `To be confirmed` status;
- conflicting rows that already coexist in the data.

A newer version alone does not establish approval or release applicability. Keep intentional duplicate rows, the raw design spelling beside any existing corrected alias and unresolved conflicts. Do not deduplicate by design name or zip two row lists positionally.

## 4. Verify targets

Check every candidate target against the v3 implementation inventory in `assets/tokens.json` and, when needed, this checkout's theme source.

- Keep unimplemented designs at `path: null` with the `design-only` status.
- Keep persisted statuses exactly as defined in `plugins/tonic-ui-tokens/scripts/validate-tokens.mjs`: `verified`, `family-mapping`, `source-conflict`, `design-only`, `composed`.
- Typography compositions point at real token paths in `properties`. Confirmed literals go in `literalProperties`; unconfirmed attributes stay in `missingAttributes`.
- Do not promote a code-applied line height or any other theme value into design-confirmed evidence, or treat an unresolved source reference as a usable color.
- Preserve the applicability limit of each source unless independent evidence justifies a specifically authorized change. Do not change theme implementation as a side effect of a data refresh.

## 5. Edit only checked records

Update mapping records whose rows were actually compared. Change related prose in `TOKEN_MAPPING.md` or `TYPOGRAPHY_MAPPING.md` only when that change is authorized and the curated guidance genuinely changed.

Provenance rules:

- Unreviewed records keep their existing `(contentId, version)` declaration untouched.
- Reviewed rows get the newly observed source version added to `sources`; do not bulk-repin the whole file to one version.
- Remove an old source-version entry only when no mapping references it and it has no retained guidance role.
- For a partial review, scope prose provenance to the reviewed sections and say which coverage was not rechecked. Do not replace a whole-document version claim you did not verify.
- Take every count from the resulting data. Never copy a fixed count from existing prose.

When comparison establishes that a row was removed, report it. Delete the curated row only when the authorized comparison establishes the removal; otherwise keep the difference as unresolved evidence rather than guessing a replacement.

## 6. Verify

Exercise the lookup for affected aliases from the repository root, for example:

```bash
node plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs --figma '$color.foreground.primary-variant.selected-disabled'
```

Compare source identity, targets, statuses and dark/light values or typography properties as applicable. Then verify the authorized edits:

```bash
node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs
node --test plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs plugins/tonic-ui-tokens/scripts/__tests__/token-validation.test.mjs plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/__tests__/lookup-provenance.test.mjs
```

A routine data refresh needs no new script, schema or test. If the requested source cannot be represented by the existing contract, report the concrete gap instead of inventing a schema or relaxing a check.

## 7. Delivery and report

A mapping change is a delivered plugin change. Consult the version policy in `scripts/README.md`: patch for a compatible correction, minor for a compatible capability, major for an incompatible instruction, output or CLI contract. A version bump or `node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write` requires separate explicit authorization; otherwise report the required delivery work rather than performing it. If separately authorized, follow that policy and validate with the repository gate. Contributor-only edits need no changeset. Validation without a baseline is not proof of historical version compliance; report it as such. Never commit, push, publish or write to a remote system without that exact authorization.

Report sources and rows reviewed with content IDs, versions and retrieval date; changes written to each asset; conflicts preserved and coverage not rechecked; and checks actually run with results. Separate offline integrity from remote freshness and rendered behavior. Do not disclose private locations, file keys, credentials or raw captures. Keep temporary exports in a unique directory under `$TMPDIR` and remove only files this task created.
