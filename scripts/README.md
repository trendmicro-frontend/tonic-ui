# Skills and plugin maintenance scripts

Run these commands from the repository root with the existing dependencies installed. The scripts use Node.js and require no additional installation. Skill content rules live in `scripts/skills/`; plugin and catalog rules live in `scripts/plugins/`. Token and documentation checkers stay with their owning plugin or skill. Token plugin `scripts/` are checkout-only maintenance tools; the installed lookup and all its runtime dependencies remain inside the declared skill directory.

The three independent consumer plugins are `tonic-ui-dev`, `tonic-ui-tokens`, and `tonic-ui-upgrade`. Contributor skills live under `skills/` and are linked by the native adapters. `packages/mcp` and `tonic-ui-mcp.config.js` remain available for explicit MCP setup; installing a plugin does not start MCP or modify client settings.

## Composition entry point

`yarn validate-ai-tooling` runs all seven checks below, reports failures without stopping at the first one, and exits nonzero if any check fails. Local validation and CI use the same entry point. The checks do not regenerate tracked assets, change plugin versions, synchronize metadata, commit, push, or fetch design sources. The isolation check uses its own temporary plugin copy.

| Check | Direct command | Responsibility |
| --- | --- | --- |
| Skills | `node scripts/skills/validate-skills.mjs` | Contributor and plugin skill frontmatter, names, descriptions, content limits, resource links, contributor adapters, and old skill-group residue. |
| Plugins | `node scripts/plugins/validate-plugins.mjs` | Plugin identities and capabilities, declared versus packaged skills, resource containment, optional MCP retention, and version policy. |
| Marketplace | `node scripts/plugins/validate-plugin-marketplace.mjs` | Both catalogs, independent entries and sources, and catalog-versus-manifest metadata. |
| Tokens | `node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs` | Source-derived inventory freshness, captured variable and relation integrity, and standalone lookup isolation. Accepts `--inventory <path>` and `--relations <path>`. |
| Documentation versions | `node skills/tonic-ui-version/scripts/check-mcp-version.mjs` | Registry-derived version labels, required duplicates, and the README version table's `(current)` marker. Accepts `--label=<label>`. |
| Documentation index | `node skills/tonic-ui-version/scripts/check-mcp-llms.mjs` | `llms.txt` page coverage and malformed links; `--mcp` additionally requires physical MDX pages. |
| Public locations | `node scripts/validate-public-links.mjs` | Rejects private locations and nonempty snapshot location fields in scoped AI-tooling resources and active documentation. Diagnostics identify the file, line, and kind without printing the location. |

| Environment variable | Meaning |
| --- | --- |
| `PLUGIN_BASE_REF` | Optional commit-ish for the plugin version baseline. When unset, only historical bump comparison is skipped; all static checks still run. An invalid explicit baseline fails. The plugins checker's `--base <ref>` takes precedence. |
| `VALIDATION_BRANCH` | Optional branch resolved through `tonic-ui-version.config.js`; `--label=<label>` takes precedence. Suffixed release branches resolve to their tracked release line; untracked branches fail. Without a branch, the checker resolves the local release line. |
| `VALIDATION_MCP` | `1` runs the documentation index checker with `--mcp` for physical-page validation. Any other value or unset uses source/template mode. |

The composition forwards the environment and passes `--mcp` only when requested. Run an individual checker directly for its other options. The registry maps `main` to `v3` and retains the `v2` and `v1` release lines; do not substitute design library versions for implementation labels.

```bash
# Static validation without historical plugin comparison.
yarn validate-ai-tooling

# Full PR validation using the actual base and target branch.
PLUGIN_BASE_REF=<pr-base-ref> VALIDATION_BRANCH=<base-branch> VALIDATION_MCP=1 yarn validate-ai-tooling

# Focused checks.
node scripts/plugins/validate-plugins.mjs --base <pr-base-ref>
node skills/tonic-ui-version/scripts/check-mcp-version.mjs --label=v3
node skills/tonic-ui-version/scripts/check-mcp-llms.mjs --mcp
node scripts/plugins/sync-plugin-marketplace-metadata.mjs
node scripts/validate-public-links.mjs
```

## Ownership and metadata

Skill compliance and obsolete `skills/internal` or `skills/external` groups belong to the skills checker. Plugin declarations, resource boundaries, old root manifests, duplicate client manifests, and MCP autostart belong to the plugins checker. The marketplace checker owns catalog structure and metadata agreement, not skill content. Privacy validation scans the delivered AI-tooling scope and the active root documents, not unrelated repository areas; it does not follow directory symlinks or inspect ignored raw caches.

Plugin manifests own version, description, and author. `node scripts/plugins/sync-plugin-marketplace-metadata.mjs` checks alignment by default; add `--write` only when intentionally synchronizing those fields into the Claude catalog. Invalid input or differing plugin-name sets fail before a write. The second marketplace catalog still has its own schema and is checked by the marketplace validator.

With an explicit baseline, plugin version validation compares delivery changes with the merge base and compares versions against the named base commit. Changed delivered skills, references, assets, and scripts require a version above the base; test paths and plugin-root `README.md`, `CHANGELOG.md`, and `LICENSE` do not trigger a bump. A new plugin needs a valid initial version rather than an additional bump. The checker returns review guidance and candidate versions, but an author must choose patch for compatible fixes, minor for backward-compatible capabilities, or major for incompatible instructions, outputs, or CLI contracts. Plugin versions are independent of library package versions.

## Tokens and Figma captures

`plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs` derives the implementation snapshot from the Tonic UI v3 theme and utilities. Use `--check` to compare without writing, or `--output <path>` for an alternate destination. Unchanged source-derived content preserves `sourceRevision`. The snapshot's theme version must equal the current theme package version; it is not proof of publication.

The partial `token-relations.json` ledger is separate reviewed correspondence, not generated theme source. It ships empty, so captured variables and theme tokens are `unreviewed`, not proven matches or absences. The Foundations and Semantic variable snapshots preserve the captured Tonic One v4 names and modes with location fields removed and identity fingerprints retained. Their applicability to Tonic UI v3 is unverified. No correspondence is implied by matching names or values. Regenerating the implementation snapshot does not authorize a relation review.

Figma variable capture tools live in `scripts/figma-variables/`. The development plugin downloads raw JSON for `convert-figma-variables.mjs`. Raw downloads and the ignored `.payloads/` cache may contain private keys and must remain in operator-controlled temporary storage, never published. See the [capture instructions](figma-variables/README.md) and [maintenance references](../skills/tonic-ui-tokens-maintenance/references/) for separate capture, regeneration and relation-review authorizations. Final outputs are checked for private locations before writing; token values are not silently altered to pass privacy validation.

For a source-derived token change that requires regeneration:

```bash
node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs
# Select the affected plugin version in its manifest after reviewing compatibility.
node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write
PLUGIN_BASE_REF=<pr-base-ref> VALIDATION_BRANCH=<base-branch> yarn validate-ai-tooling
yarn test:ai-tooling
```

### Token relations report

From the repository root, run the checkout-only report generator:

```bash
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs --help
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs > "$TMPDIR/tonic-tonic-ui-relations.md"
```

The first command writes deterministic Markdown to stdout and does not create a file.
For example, stdout begins with:

```markdown
# Figma variable ↔ theme token relations
```

It uses the local theme inventory and Figma variable snapshots plus the partial
`token-relations.json` ledger as its source of truth; it does not query live Figma.
The Tonic One v4 captures have unverified applicability to Tonic UI v3. The shipped
Tonic UI ledger is empty, so every endpoint is listed as unreviewed. The report has
six ordered classifications:

- **Mapped** — current positive relation reviews.
- **Stale reviews** — reviews whose endpoint, mode or snapshot evidence has changed;
  their original status remains visible, but they are not current counterpart edges.
- **Reviewed Figma-only** — explicit current scoped reviews that found no theme counterpart.
- **Reviewed theme-only** — explicit current scoped reviews that found no captured Figma counterpart.
- **Unreviewed Figma variables** — captured variables with no review.
- **Unreviewed theme tokens** — inventory tokens with no review.

Unreviewed is not a reviewed absence. Review sections are grouped by Figma library and
collection when a Figma endpoint exists, otherwise by theme scale; missing endpoints have
a separate group. Unreviewed variables are grouped by library/collection and unreviewed
tokens by scale. Counts count rows, not distinct endpoints: each review appears once,
so one-to-many and other multiple reviews can repeat an endpoint; each unreviewed
endpoint appears once. Empty sections say `None.`.

Report generation is read-only and does not authorize capture or relation review.
Output may contain internal token names or review reasons; do not publish without
authorization. Remove only task-owned redirected files when no longer needed.

## Release snapshot flow

The target `ci-version` package script runs Changesets versioning, updates the lockfile, and then invokes `plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs`. The updater accepts no arguments and stops at the first failing phase:

1. Generate the implementation snapshot.
2. If its bytes differ from fixed HEAD, set the tokens plugin version to the HEAD patch plus one.
3. Explicitly synchronize marketplace metadata with `--write`.
4. Validate tokens.
5. Validate plugins against HEAD.
6. Validate the marketplace.

A rerun from the same HEAD does not accumulate bumps; interrupted reruns use the same fixed baseline. The updater does not refresh Figma captures or relation reviews, commit, or push. It requires the independent tokens manifest at HEAD; exercise release behavior in isolated fixture repositories rather than running the updater against a pre-backport HEAD.

## Tests

Root `yarn test` runs the AI-tooling phase, prints the workspace package tests heading, then runs the existing workspace test scripts. `yarn test:ai-tooling` discovers `*.test.mjs` under `scripts/__tests__/`, `scripts/figma-variables/__tests__/`, `scripts/skills/__tests__/`, `scripts/plugins/__tests__/`, `test/__tests__/`, `skills/*/scripts/__tests__/`, and recursively under plugin `__tests__/` directories. Hidden entries and `node_modules` are skipped, and directory symlinks are not followed. Place tests with the scripts or skills they exercise.

The Node test runner retains scheduling and exit-status control. `test/test-reporter.mjs` groups suite results by scope, shows file names and counts, expands failure diagnostics, and preserves stdout and stderr. Interactive terminals show a clipped progress spinner; CI, redirected output, and dumb terminals use static output. `NO_COLOR` disables colors. For per-case output, use `node --test --test-reporter=spec <test-file>`.

The suites cover shared validators and composition, Figma conversion and export, contributor/version scripts, plugin packaging and metadata, token inventory and provenance, isolation, release snapshot phases, public-link enforcement, discovery, and the reporter. Temporary fixtures remove their own files; fixture Git commits are confined to isolated temporary repositories. These tests verify tooling and data contracts, not AI response quality.
