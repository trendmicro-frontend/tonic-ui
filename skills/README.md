# Tonic UI AI skills

Eight contributor skills support work on the Tonic UI library. Three separate
plugins provide application-facing skills; each can be installed independently.

| Group | Skill | Use it for |
| --- | --- | --- |
| plugin | [tonic-ui-tokens](../plugins/tonic-ui-tokens/skills/tonic-ui-tokens/SKILL.md) | Matching theme tokens or captured Figma variables, values and CSS variables; evidence-labelled screenshots and unconfirmed handoffs |
| plugin | [tonic-ui-dev](../plugins/tonic-ui-dev/skills/tonic-ui-dev/SKILL.md) | Understand app context, retrieve official APIs/examples, integrate with existing wrappers/forms/state, and verify the requested behavior; includes optional MCP/local-source access and on-demand compatibility investigation |
| plugin | [tonic-ui-upgrade](../plugins/tonic-ui-upgrade/skills/tonic-ui-upgrade/SKILL.md) | Upgrading a consuming app's Tonic UI packages; current guidance covers the v2-to-v3 migration |
| contributor | [tonic-ui-patterns](tonic-ui-patterns/SKILL.md) | Repository component structure, hooks, exports and conventions |
| contributor | [tonic-ui-plan](tonic-ui-plan/SKILL.md) | Planning library changes, acceptance tests, PR preparation, and delivery |
| contributor | [tonic-ui-pr](tonic-ui-pr/SKILL.md) | Library PR descriptions, commit-message drafts and changesets; no publication authorization |
| contributor | [tonic-ui-slots](tonic-ui-slots/SKILL.md) | `slots`, `slotProps`, `useSlot` and legacy component/props migration |
| contributor | [tonic-ui-sx](tonic-ui-sx/SKILL.md) | `sx`, `__sx`, `composeSx` and consumer override precedence |
| contributor | [tonic-ui-tokens-maintenance](tonic-ui-tokens-maintenance/SKILL.md) | Token capture, freshness, regeneration, classified relation reports and correspondence review |
| contributor | [tonic-ui-types](tonic-ui-types/SKILL.md) | React component JSDoc and props types |
| contributor | [tonic-ui-version](tonic-ui-version/SKILL.md) | This library's version registry, prereleases, docs labels and maintenance branches; never an app dependency bump |

Resolving a token in an already-v3 app does not require an upgrade. Library repository policies do not become policies for consuming applications.

## Layout

```text
skills/tonic-ui-<contributor>/               # eight contributor skills
plugins/tonic-ui-<plugin>/                  # dev, tokens, or upgrade
├── .claude-plugin/plugin.json
└── skills/tonic-ui-<plugin>/               # one matching application skill
.agents/skills/ and .claude/skills/         # contributor symlink adapters
```

`.agents/skills/<name>` and `.claude/skills/<name>` each contain the same eight relative links to `skills/<name>`. Claude Code keeps its own `.claude/skills/` discovery entry points; Codex and omp use `.agents/skills/`. Neither directory contains instruction copies or plugin skill links. Edit the physical source directory, never an adapter.

## Use a local checkout without installation

Start the client from the Tonic UI checkout or a subdirectory. Native discovery
exposes only the eight **contributor skills**:

- **Claude Code:** `.claude/skills/<name>`; for example `/tonic-ui-patterns`.
- **Codex:** `.agents/skills/<name>`; for example `$tonic-ui-patterns`.
- **omp:** the native adapters; for example `skill://tonic-ui-patterns`.

The three application skills are plugin-only. Install the desired plugins below,
or use `claude --plugin-dir <repo>/plugins/tonic-ui-dev` for a session-only load
of that plugin (substitute another plugin directory as needed). Contributor native
skills and plugin skills are disjoint, so loading both does not duplicate selectors.

## Marketplace installation

These change the client's marketplace/plugin registry; this repository does not run them for you.

```bash
claude plugin marketplace add /absolute/path/to/tonic-ui
claude plugin install tonic-ui-dev@tonic-ui
claude plugin install tonic-ui-tokens@tonic-ui
claude plugin install tonic-ui-upgrade@tonic-ui

codex plugin marketplace add /absolute/path/to/tonic-ui
codex plugin add tonic-ui-dev@tonic-ui
codex plugin add tonic-ui-tokens@tonic-ui
codex plugin add tonic-ui-upgrade@tonic-ui

omp plugin marketplace add /absolute/path/to/tonic-ui
omp plugin install tonic-ui-dev@tonic-ui
omp plugin install tonic-ui-tokens@tonic-ui
omp plugin install tonic-ui-upgrade@tonic-ui
```

Choose only the plugins you need; none installs another. Claude and omp read
`.claude-plugin/marketplace.json`; Codex reads `.agents/plugins/marketplace.json`.
Both catalogs point to the three individual plugin directories. Each plugin's
`.claude-plugin/plugin.json` lists only its own skill; there is no separate
client-specific manifest or bundled contributor skill. Use the client's
plugin-qualified selector if it namespaces skills; the skill bodies do not depend
on that syntax. For Git-based marketplace sources, use the public repository
`https://github.com/trendmicro-frontend/tonic-ui.git`.

Filesystem and validation checks do not by themselves prove client discovery or
installation. Installing plugins or changing client configuration is explicit.

## Token evidence and freshness

`plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json` is generated from the real v3 theme exports plus the existing resolver and CSS-variable utilities, not from the public migration table alone. Its metadata names the theme version, source revision/fingerprints, and both px/rem units and dark/light modes.

- Public, private, primitive, semantic, retained legacy, state, chart, `main` and decimal-key paths are included. Private tokens are implemented but are not stable public API.
- Source-resolution status is distinct from design correspondence: `verified` describes a resolved implementation value, not design approval; unresolved source values remain explicit.
- RGB alone cannot identify the original Figma variable. Report real role/state/mode candidates with confidence and confirm identity from labels or an export, without inferring a theme counterpart.
- The snapshot works offline. Compare it against the app's installed package version when available; do not present it as proof of a newer release or of an app's custom theme.

The bundled Foundations and Semantic variable documents are location-redacted
snapshots of Tonic One v4 design libraries, not evidence that their variables are
implemented by Tonic UI v3. Their location fields are null and their fingerprints
identify the source libraries without exposing file locations. The partial
[`token-relations.json`](../plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/token-relations.json)
ledger ships empty: captured variables and theme tokens are unreviewed, not proven
matches or absences. Captures contain variables, not every prototype or text style.

### Read-only lookup

Resolve the script relative to the **loaded skill directory**, including in a plugin cache. It needs no Tonic UI checkout and no npm dependency:

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token '_component.keyboardFocused.outerFocusRing'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'borders["0.5"]'
node <skill-dir>/scripts/lookup-tokens.mjs --theme-token 'colors.text.*'
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'semantic:Color/text/primary'
node <skill-dir>/scripts/lookup-tokens.mjs --figma-variable 'Color/text/**'
```

Supply exactly one selector. JSON output includes inventory records or captured variables
and their separate correspondence status. Theme results preserve values and emitted CSS
variables; Figma results retain their library. `*` matches within one path segment and
`**` matches zero or more complete segments. Matching is case-sensitive, and patterns
should be shell-quoted. Bare Figma paths and exact keys search all libraries; a
`semantic:` or `foundations:` prefix narrows scope. Wildcards match Figma paths, not keys.
Unknown valid selectors return `{ meta, results: [] }` with exit 0, not a guessed fallback.
Malformed selectors fail. There is no free-text or curated alias search.

### Checkout-only relation report

From the repository root, run
`node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs` to write the offline
classified report to stdout. It is a contributor maintenance tool, not an installed
consumer-plugin command. See the [token relations report guide](../scripts/README.md#token-relations-report)
for `--help`, redirection, classifications, grouping and privacy.

## Development evidence resolution

`tonic-ui-dev` follows app context → relevant documentation and actual examples →
integration with existing app conventions → verification. Its MCP method uses
`use-docs`, `fetch-pages` and, when needed, `fetch-codes`; there is no separate MCP skill.
It contains no bundled changelog or known-issue snapshot. Changelog/source investigation
is conditional on compatibility questions or an explicit update, not every app task.

Reuse available MCP tools or a readable local checkout first. Only suggest setup
when needed evidence is unavailable: cloning followed by direct local reads is valid
without installing dependencies or starting MCP. Running MCP from that checkout is
another optional path. See the skill's [connection methods](../plugins/tonic-ui-dev/skills/tonic-ui-dev/references/mcp-and-local-sources.md).
No clone, installation, service start or client configuration change is automatic.
Sources must still be relevant to the app's version; missing evidence stays `UNVERIFIED`.

## Optional capabilities

Figma, Confluence and Tonic documentation connectors can refresh evidence when present and separately authorized; they are not prerequisites. Token lookup can use its declared bundled data; development guidance requires retrieved or supplied source evidence, not a release snapshot embedded in the skill. If the client cannot inspect an image, request variable/style labels or a text export and finish the reachable work.

The plugins declare no MCP servers, hooks, provider settings, credentials or automatic setup. Root `.mcp.json` is removed; `packages/mcp`, `tonic-ui-mcp.config.js` and the [manual MCP setup guide](../packages/react-docs/pages/getting-started/mcp/index.page.mdx) remain for explicit setup.

## Maintain and verify

Edit contributor skills in `skills/<name>/` and application skills in `plugins/<name>/skills/<name>/`; keep resources inside the skill directory. Plugin skill-directory symlinks must resolve inside their own plugin. Keep local checkouts symlink-preserving; never replace a link with an edited copy.

```bash
yarn test:ai-tooling
yarn validate-ai-tooling
node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs --check
node scripts/plugins/sync-plugin-marketplace-metadata.mjs
node scripts/validate-public-links.mjs
claude plugin validate .claude-plugin/marketplace.json
claude plugin validate plugins/tonic-ui-dev/.claude-plugin/plugin.json
claude plugin validate plugins/tonic-ui-tokens/.claude-plugin/plugin.json
claude plugin validate plugins/tonic-ui-upgrade/.claude-plugin/plugin.json
```

The composed validation checks contributor skills, plugins, marketplace catalogs,
token data, version synchronization, the documentation index and public-link
privacy. It runs all checks even if one fails. `PLUGIN_BASE_REF` supplies an
optional historical plugin comparison; an invalid explicit baseline fails.
`VALIDATION_BRANCH` selects the documentation branch, and `VALIDATION_MCP=1`
selects MCP template mode for the documentation index instead of physical-page
mode. Validation does not update tracked assets or plugin metadata. Claude's
manifest validation is optional when its CLI is
already available.

After a theme change, regenerate the v3 implementation snapshot with
`node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs`. Generation
does not overwrite the partial relation ledger, and unchanged content retains its
existing source revision. Metadata synchronization is check-only unless
`node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write` is explicitly
requested. The validation and isolation suites check packaged resources and run
the token lookup outside the checkout; a successful static check is not a
visual/interaction PASS.

Capture, freshness checking, regeneration and correspondence review are separate
actions; each write or remote capture needs its own authorization. Generating the
report is read-only and authorizes neither capture nor review. Raw variable captures
can contain private locations and must remain in operator-owned temporary storage or
the ignored local cache, not in delivered resources. Do not reconstruct or publish
private source links.

The version helpers need a real Tonic UI checkout: they prefer the active CWD's checkout, work from nested folders, and fail clearly when a cache-loaded helper has no checkout.
The sync checker requires all four duplicated-label files and root `README.md`;
a missing file or missing `(current)` version-table marker fails rather than skips.

Skill-only edits do not bump library packages. Changes to a versioned package follow the repository's separate Changeset policy; when the PR number is unknown, provide a content draft without creating a placeholder file. Plugin metadata has its own initial `1.0.0` version. See [CONTRIBUTING.md](../CONTRIBUTING.md#shared-agent-skills) for authoring rules.