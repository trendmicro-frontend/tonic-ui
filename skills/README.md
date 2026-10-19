# Tonic UI AI skills

One repository, two skill groups. `skills/internal/` is for developing the Tonic UI library itself. `skills/external/` is the app-facing group and is the **marketplace plugin root** — installing the `tonic-ui` plugin exposes only these three skills.

| Group | Skill | Use it for |
| --- | --- | --- |
| external | [tonic-ui-tokens](external/tonic-ui-tokens/SKILL.md) | Resolving Figma color/typography names or a screenshot to real public/private tokens, values and CSS variables; handoff when something is unimplemented |
| external | [tonic-ui-dev](external/tonic-ui-dev/SKILL.md) | Understand app context, retrieve official APIs/examples, integrate with existing wrappers/forms/state, and verify the requested behavior; includes optional MCP/local-source access and on-demand compatibility investigation |
| external | [tonic-ui-upgrade](external/tonic-ui-upgrade/SKILL.md) | Upgrading a consuming app's Tonic UI packages; current guidance covers the v2-to-v3 migration |
| internal | [tonic-ui-patterns](internal/tonic-ui-patterns/SKILL.md) | Repository component structure, hooks, exports and conventions |
| internal | [tonic-ui-pr](internal/tonic-ui-pr/SKILL.md) | Library PR descriptions, commit-message drafts and changesets; no publication authorization |
| internal | [tonic-ui-slots](internal/tonic-ui-slots/SKILL.md) | `slots`, `slotProps`, `useSlot` and legacy component/props migration |
| internal | [tonic-ui-sx](internal/tonic-ui-sx/SKILL.md) | `sx`, `__sx`, `composeSx` and consumer override precedence |
| internal | [tonic-ui-types](internal/tonic-ui-types/SKILL.md) | React component JSDoc and props types |
| internal | [tonic-ui-version](internal/tonic-ui-version/SKILL.md) | This library's version registry, prereleases, docs labels and maintenance branches; never an app dependency bump |

Resolving a token in an already-v3 app does not require an upgrade. Library repository policies do not become policies for consuming applications.

## Layout

```text
skills/
├── internal/                     # repository-development skills
├── external/                     # app-facing skills; marketplace plugin root
│   ├── tonic-ui-tokens/
│   ├── tonic-ui-dev/
│   ├── tonic-ui-upgrade/
│   └── .claude-plugin/plugin.json  # shared manifest; Codex and omp read it too
└── README.md                     # this catalog
```

`.agents/skills/<name>` and `.claude/skills/<name>` each contain the same six relative links to `skills/internal/<name>`. Claude Code keeps its own `.claude/skills/` discovery entry points; Codex and omp use `.agents/skills/`. Neither directory contains instruction copies or external skill links. Edit the physical source group directory, never an adapter.

## Use a local checkout without installation

Start the client from the Tonic UI checkout or a subdirectory. Native discovery
exposes only the six **internal contributor skills**:

- **Claude Code:** `.claude/skills/<name>`; for example `/tonic-ui-patterns`.
- **Codex:** `.agents/skills/<name>`; for example `$tonic-ui-patterns`.
- **omp:** the native adapters; for example `skill://tonic-ui-patterns`.

The three external skills are plugin-only. Install the marketplace plugin below, or
use `claude --plugin-dir <repo>/skills/external` for a session-only load. Internal
native skills and external plugin skills are disjoint, so loading both does not
create duplicate external selectors.

## Marketplace installation

These change the client's marketplace/plugin registry; this repository does not run them for you.

```bash
claude plugin marketplace add /absolute/path/to/tonic-ui && claude plugin install tonic-ui@tonic-ui
codex plugin marketplace add /absolute/path/to/tonic-ui && codex plugin add tonic-ui@tonic-ui
omp plugin marketplace add /absolute/path/to/tonic-ui && omp plugin install tonic-ui@tonic-ui
```

Claude and omp read `.claude-plugin/marketplace.json`; Codex reads `.agents/plugins/marketplace.json`. Both catalogs resolve the plugin at `./skills/external`, so a marketplace install exposes exactly the three external skills — the internal skills stay out of consuming apps. The plugin declares those three directories explicitly in its single `.claude-plugin/plugin.json`; that manifest is shared with Codex and omp, which also read it, and no separate `.codex-plugin/` copy is needed. Use the client's plugin-qualified selector if it namespaces skills; the skill bodies do not depend on that syntax. For Git-based marketplace sources, point the client at `https://github.com/trendmicro-frontend/tonic-ui.git`.

The upstream implementation exercised isolated installs on Claude Code 2.1.259, Codex 0.155.1 and omp 18.10.4. Those results are historical, not proof for this Tonic UI port; current verification is recorded in [the backport ledger](../docs/handoffs/tonic-ui-marketplace-backport.json).

## Token evidence and freshness

`external/tonic-ui-tokens/assets/tokens.json` is generated from the real theme exports plus the existing resolver and CSS-variable utilities, not from the public migration table alone. Its metadata names the theme version, source revision/fingerprints, and both px/rem units and dark/light modes.

- Public, private, primitive, semantic, retained legacy, state, chart, `main` and decimal-key paths are included. Private tokens are implemented but are not stable public API.
- Figma aliases carry database version/row provenance. Missing aliases stay **code-only**; unimplemented designs stay **design-only**; typography uses real property compositions instead of an invented composite token API.
- Source conflicts and unresolved values stay explicit. A verified design label does not make an unresolved code reference a usable color.
- RGB alone cannot identify the original Figma variable. Report real role/state/mode candidates with confidence and confirm identity from variable/style labels or an export.
- The snapshot works offline. Compare it against the app's installed package version when available; do not present it as proof of a newer release or of an app's custom theme.

Curated sources: the [color database](https://trendmicro.atlassian.net/wiki/spaces/VO/database/1939407344), typography snapshot (content ID `1962606684`; Tonic UI design applicability requires confirmation), upstream handbook snapshot (content ID `1927774846`; not Tonic UI-specific guidance) and upstream light-mode snapshot (content ID `2386166626`; verify applicability). Their versions are observed snapshots, not permanent latest-version pins.

### Read-only lookup

Resolve the script relative to the **loaded skill directory**, including in a plugin cache. It needs no Tonic UI checkout and no npm dependency:

```bash
node <skill-dir>/scripts/lookup-tokens.mjs --token '_component.keyboardFocused.outerFocusRing'
node <skill-dir>/scripts/lookup-tokens.mjs --figma '$color.foreground.primary-variant.selected-disabled'
node <skill-dir>/scripts/lookup-tokens.mjs --family '_chart'
```

JSON output includes code paths, values, CSS-variable names where actually emitted, design provenance and evidence status. Use exactly one of `--token`, `--figma`, `--family` or `--query`. Unknown names exit non-zero instead of falling back to black/transparent.

Each Figma result includes its matching `designSource` snapshot (content ID,
version and title), plus applicability or historical-title metadata when supplied.
Source identity includes both content ID and version. Missing applicability is
not proof that a design source applies; provenance never promotes unresolved
code values or unverified design guidance to verified behavior.

## Development evidence resolution

`tonic-ui-dev` follows app context → relevant documentation and actual examples →
integration with existing app conventions → verification. Its MCP method uses
`use-docs`, `fetch-pages` and, when needed, `fetch-codes`; there is no separate MCP skill.
It contains no bundled changelog or known-issue snapshot. Changelog/source investigation
is conditional on compatibility questions or an explicit update, not every app task.

Reuse available MCP tools or a readable local checkout first. Only suggest setup
when needed evidence is unavailable: cloning followed by direct local reads is valid
without installing dependencies or starting MCP. Running MCP from that checkout is
another optional path. See the skill's [connection methods](external/tonic-ui-dev/references/mcp-and-local-sources.md).
No clone, installation, service start or client configuration change is automatic.
Sources must still be relevant to the app's version; missing evidence stays `UNVERIFIED`.

## Optional capabilities

Figma, Confluence and Tonic documentation connectors can refresh evidence when present. They are not prerequisites. Token lookup can use its declared bundled data; development guidance requires retrieved or supplied source evidence, not a release snapshot embedded in the skill. If the client cannot inspect an image, request variable/style labels or a text export and finish the reachable work.

The plugin declares no MCP servers, hooks, provider settings, credentials or automatic setup. Root `.mcp.json` is removed; `packages/mcp`, `tonic-ui-mcp.config.js` and the [manual MCP setup guide](../packages/react-docs/pages/getting-started/mcp/index.page.mdx) remain for explicit setup.

## Maintain and verify

Edit only `skills/internal/<name>/` or `skills/external/<name>/`; keep resources inside the skill directory. Keep local checkouts symlink-preserving; never replace a link with an edited copy.

```bash
node scripts/skills/generate-token-inventory.mjs --check
node scripts/skills/validate-marketplace.mjs
node --test scripts/skills/__tests__/*.test.mjs
claude plugin validate .claude-plugin/marketplace.json
claude plugin validate skills/external/.claude-plugin/plugin.json
node skills/internal/tonic-ui-version/scripts/check-version-sync.mjs
node skills/internal/tonic-ui-version/scripts/audit-llms.mjs
```

### Backport coverage

The [60-record ledger](../docs/handoffs/tonic-ui-marketplace-backport.json) records
every upstream addition, modification, deletion and rename, with target paths,
adaptation notes, verification evidence and reviewed SHA-256 fingerprints.
Recheck the exact upstream commit and reviewed target content with:

```bash
node scripts/skills/verify-backport.mjs --source <upstream-checkout>
```

The check requires the upstream commit in the supplied checkout's Git history.
It rejects omitted/duplicate records, changed reviewed content, wrong file types,
obsolete physical skill copies and upstream-specific repository URLs. Content
fingerprints detect later drift; the ledger's review notes explain semantic
adaptations and do not replace the behavior checks above.

After a theme change, regenerate `skills/external/tonic-ui-tokens/assets/tokens.json` with `node scripts/skills/generate-token-inventory.mjs`; generation never overwrites the curated Figma aliases. A successful build or static scan is not a visual/interaction PASS.

The marketplace validator checks source coverage, linked resources and discovery boundaries. It also copies the external package to a temporary directory and runs the bundled lookup there, so missing assets or repository-only executable dependencies fail. Harmless mentions of repository-side identifiers in prose are not dependency errors.

The version helpers need a real Tonic UI checkout: they prefer the active CWD's checkout, work from nested folders, and fail clearly when a cache-loaded helper has no checkout.
The sync checker requires all four duplicated-label files and root `README.md`;
a missing file or missing `(current)` version-table marker fails rather than skips.

Skill-only edits do not bump library packages. Changes to a versioned package follow the repository's separate Changeset policy; when the PR number is unknown, provide a content draft without creating a placeholder file. Plugin metadata has its own initial `1.0.0` version. See [CONTRIBUTING.md](../CONTRIBUTING.md#shared-agent-skills) for authoring rules.