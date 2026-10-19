# Tonic UI Skills Marketplace Design

> Backport context: This document preserves the upstream design and amendment history, adapted to Tonic UI v2/v3. Historical runtime results and authorizations below are not evidence or authorization for this checkout. The split amendment defines the current six-internal/three-external layout. Current backport results are recorded in `docs/handoffs/tonic-ui-marketplace-backport.json`. Package-specific examples involving DataGrid/charts require a separately available package; they do not establish a Tonic UI package export.

Status: Superseded in part by section 0 and the latest split plan. The three-skill marketplace and six-internal-skill native adapters are implemented; isolated client discovery and marketplace installation have been exercised. Image-based token resolution has not been exercised.

## 0. Superseding amendment

The user later required that repository-development skills and app-facing skills be physically separated, and that a marketplace install expose only app-facing skills.

- `skills/internal/` holds `tonic-ui-patterns`, `tonic-ui-pr`, `tonic-ui-slots`, `tonic-ui-sx`, `tonic-ui-types`, `tonic-ui-version`.
- `skills/external/` is the plugin root and holds `tonic-ui-tokens`, `tonic-ui-dev`, `tonic-ui-upgrade`, plus one shared `.claude-plugin/plugin.json` with explicit paths to those three directories.
- The three external names carry no version; supported version scope is stated in the skill content.
- `.agents/skills/` and `.claude/skills/` each contain relative links to only the six internal skills. External skills are plugin-only; catalogs resolve `./skills/external`. This latest instruction supersedes the earlier nine-local-skill workflow.
- `tonic-ui-dev` retains only source-resolution and verification methods, not copied component changes or known issues. Resolve package changelogs and matching implementation evidence at use time. MCP `fetch-pages` is an optional content reader, not an exact-version resolver.

Where later sections say "nine skills", "one root skills body", `tonic-theme-tokens`, `tonic-v3-upgrade`, or `tonic-v3-checklist`, this amendment supersedes them. Plugin-visible verification applies to the three external names only; internal skills remain locally discoverable.

## 1. Goal and confirmed requirements

Build a Tonic UI-owned, skills-only plugin marketplace for Claude Code, Codex, and omp. Separate everyday v3 development from v2-to-v3 migration and v3-to-v3 release verification.

Confirmed user decisions:

- Start with `tonic-theme-tokens`, `tonic-v3-upgrade`, and `tonic-v3-checklist`; additional skills are allowed when they serve a distinct requirement.
- Use both migration pages in `packages/react-docs/pages/migrations/` as the baseline, not the external FEDex skills as authority.
- Cover all implemented public and private tokens, not only the public migration tables.
- Include Figma color and typography correspondence and support screenshot inputs.
- Skill instructions and data must work across Claude Code, Codex, and omp without platform-specific executor dependencies.
- Follow `<reference-superpowers-checkout>` structurally: root `skills/` is the single physical content source; platform folders contain marketplace/plugin metadata or discovery adapters, not skill copies. This is the user's requested redesign after reviewing the rebased `.agents/skills` migration.
- Integrate the six existing skills from `origin/main` into root `skills/`, preserving their names, resources and behavior; make `.agents/skills` and Claude entry points discovery-only adapters.
- Work in `.worktrees/tonic-ui-marketplace`, branch `feat/tonic-ui-marketplace`.
- Remove only this worktree's root `.mcp.json`. Keep `packages/mcp`, `tonic-ui-mcp.config.js`, and manual MCP setup documentation. MCP is an optional documentation capability, not a skill prerequisite.
- Do not commit, push, publish, release, install software, change credentials, or change the active migration worktree.

## 2. Scope and boundaries

Ship one plugin, `tonic-ui`, containing the six retained skills and three independently triggered new skills. The README separates everyday v3 application development, application upgrades (v2-to-v3 and v3-to-v3), and Tonic UI library contribution/release workflows.

| Skill | Purpose | Required inputs | Outputs | Excluded behavior |
| --- | --- | --- | --- | --- |
| `tonic-theme-tokens` | Everyday v3 design-to-code work | Figma variable/style name, screenshot, design specification, or code context; target library version and relevant mode/state | Verified mapping or explicitly inferred candidates, real code/CSS-variable usage, unresolved/design-only records | No v2-upgrade prerequisite; no automatic package upgrades; no assertion that screenshot RGB proves original variable identity |
| `tonic-v3-upgrade` | v2-to-v3 application migration | Application dependencies/lockfile, current code, intended v3 versions | Evidence-backed migration plan, necessary versus optional changes, execution only when requested, verification and unresolved decisions | No stale universal beta pin; no mandatory rewrite of backward-compatible v2 primitive token references |
| `tonic-v3-checklist` | Every v3-to-v3 version update | Exact installed and target package versions, used components, relevant release notes and visual surfaces | Release-specific impact report and verified/manual checks with evidence | No generic v2-migration-only checklist; no automatic application of historical workarounds |

Publish the existing six `tonic-ui-*` skills together with the new skills, as a unified library. Contributor/release skills apply to work on the Tonic UI repository itself; they must not route ordinary consuming-app upgrades into library version bumps, branch/changeset policies or release operations. Keep those persistent repository policies in `AGENTS.md`, not in plugin bootstrap instructions. Clarify trigger boundaries where distribution would otherwise make an existing description ambiguous.

No extra skill is needed initially: typography belongs with theme-token correspondence; light/dark guidance is relevant to development and release verification and can be referenced without creating another overlapping trigger. Add another skill only if implementation exposes a separate user workflow that these boundaries cannot cover.

## 3. Marketplace layout

```text
tonic-ui/
├── README.md                         # existing overview plus marketplace entry
├── .claude-plugin/
│   ├── marketplace.json              # Claude and omp catalog
│   └── plugin.json                   # metadata; root skills/ discovery
├── .codex-plugin/
│   └── plugin.json                   # Codex metadata; skills: ./skills/
├── .agents/
│   ├── plugins/
│   │   └── marketplace.json          # Codex catalog
│   └── skills -> ../skills           # Codex/omp local discovery; not editable content
├── .claude/
│   └── skills/                       # one relative link per skill to ../../skills/<name>
├── skills/
│   ├── README.md                     # groups, installation, selection and evidence policy
│   ├── tonic-ui-patterns/           # retained with its complete resources
│   ├── tonic-ui-pr/
│   ├── tonic-ui-slots/
│   ├── tonic-ui-sx/
│   ├── tonic-ui-types/
│   ├── tonic-ui-version/
│   ├── tonic-theme-tokens/
│   │   ├── SKILL.md
│   │   ├── TOKEN_MAPPING.md
│   │   ├── TYPOGRAPHY_MAPPING.md
│   │   ├── SCREENSHOT_RULES.md
│   │   ├── UNMAPPED_TOKEN_TEMPLATE.md
│   │   ├── LANGUAGE_RULES.md
│   │   ├── assets/
│   │   │   ├── tokens.json            # complete source-derived inventory
│   │   │   └── figma-mappings.json    # aliases, provenance and conflicts
│   │   └── scripts/
│   │       └── lookup-tokens.mjs      # read-only bundled-data query
│   ├── tonic-v3-upgrade/
│   │   ├── SKILL.md
│   │   ├── UPGRADE_RULES.md
│   │   ├── PLAN_TEMPLATE.md
│   │   └── LANGUAGE_RULES.md
│   └── tonic-ui-dev/
│       ├── SKILL.md                 # source-resolution and verification methods
│       └── evals/evals.json         # supplied-source behavior scenarios
└── scripts/skills/
    ├── generate-token-inventory.mjs
    └── validate-marketplace.mjs
```

The catalogs resolve plugin source from the marketplace repository root. Use the installed clients' supported local-source shape; do not blindly copy Superpowers' `source: url` with `url: ./` if the current Codex parser requires a local source object.

The plugin root is the repository root, as in Superpowers. Both compatibility manifests discover the single `./skills/` body, which contains all nine skills; do not use per-platform mirrors or maintain a second `.agents/skills` content tree. Both manifests describe the same plugin identity/version and content. omp reads the Claude-compatible manifest; Codex has its own thin manifest. Do not add another catalog or executor implementation for omp.

Root `.mcp.json` is absent after the approved cutover. Do not declare MCP servers, hooks, model/provider settings, credentials, permissions, or automatic setup commands in this plugin. Keep metadata minimal; do not copy Superpowers' bootstrap hooks, artwork, or OpenAI-owned presentation metadata.

The contributor migration is the rebased baseline, not the final physical layout. Move all six existing skill directories and their resources from `.agents/skills` to root `skills/`, then replace `.agents/skills` with the relative discovery link `../skills`. Repoint existing Claude links directly to `../../skills/<name>` and add the three new skill links. Update the current `AGENTS.md` index, `CONTRIBUTING.md`, README links and active skill/script invocations to the new canonical root; preserve historical migration records as history. No duplicate directories or multi-hop compatibility aliases remain. Verify native and marketplace discovery plus same-file deduplication in fresh clients.

The two retained version scripts currently compute the repository root four levels above `.agents/skills/tonic-ui-version/scripts`. Relocation to `skills/tonic-ui-version/scripts` changes that depth. Update their root resolution and invocation paths rather than leaving silently incorrect parents. For a library-contributor skill loaded from an installed cache, use the actual active Tonic UI checkout as the work repository, not the plugin cache; report a clear prerequisite when no such checkout exists. Preserve the scripts' label/index checks and negative exit behavior.

## 4. Portable skill contract

Use the Agent Skills format: explicit matching `name` and directory name, non-empty description, optional standard `license`, and string-valued `metadata`. Keep `SKILL.md` under 500 lines; load the heavy reference/data files on demand.

Shared instructions describe capabilities and evidence, not specific host tool names. Do not require Claude slash commands, Codex `$` syntax, omp internal URIs, `allowed-tools`, `disable-model-invocation`, a particular model, personal absolute paths, dynamic shell injection, or a platform-specific MCP tool. Put optional native invocation syntax only in the installation README.

Resolve resources relative to the loaded skill directory, not the application's CWD. A consumer may run the skill from a nested application directory or an installed plugin cache without a Tonic UI source checkout.

The bundled snapshot is sufficient for lookup at its declared version. When a checkout or installed library is available, compare versions and use matching authoritative evidence. A newer library or unavailable upstream source must produce an explicit freshness limit, not an invented mapping.

MCP and Figma connectors are optional capability providers. Use available documentation/Figma reading capabilities when present; otherwise use bundled evidence, readable local files, or user-supplied exports. Do not claim a failed or unavailable source was read. If the host cannot inspect an image, request the variable/style labels or a text/export equivalent and continue all reachable work.

Respond in the user's language. Preserve token paths, API identifiers, package names, commands, version strings, and source names verbatim. No language flag is required; explicit user language preferences override the default.

## 5. Complete token inventory

### 5.1 Authority and coverage

The completeness oracle is the actual exported theme, not the public MDX, Confluence database, external FEDex table, or historical JSON.

Generate the inventory from `packages/theme/src/v3`, including its merged legacy tokens, and resolve references/modes with the existing theme utilities. Classify token origin separately as primitive, semantic, or legacy. Preserve all accessible primitive variants, object `main` values, lightening/darkening variants, semantic mode/state variants, chart arrays/groups and shadow values. Include non-color scales relevant to typography and design correspondence.

Use the repository's documented unpublished-token rule: a path with any underscore-prefixed segment is private. `_dark` and `_light` payload fields describe a token's modes; they are not independently recommended style-prop tokens. Do not filter private families from inventory, lookup, or coverage verification.

Required families include all current exports, not a hard-coded closed allowlist: `_component`, `_foreground`, `_link`, `_overlay`, `_highlight`, `_shadow`, `_chart`, public families with private subpaths, `_fixed`/`_inverse` variants, and private risk/severity/status paths. Derive the set mechanically so a newly exported token causes the coverage check to fail until the snapshot is regenerated.

Separate three claims:

1. Every implemented token is inventoried.
2. A target path exists and its values/CSS-variable representation are source-verified.
3. A Figma alias is design-source-verified.

Claim 1 does not imply claim 3. A source-derived token with no Figma counterpart remains present with `code-only` mapping status. A design token absent from implementation is `design-only`, not an invented code path. Private tokens are documented as unpublished/non-stable APIs; complete coverage is not a stability promise.

### 5.2 Data fields

Each inventory record carries:

- Full theme path, style-prop token path when applicable, scale, family, origin and public/private classification.
- Source-relative module and library/package versions; generation provenance tied to source revision/content fingerprints.
- Raw values/references and resolved dark/light values where meaningful; units for non-color tokens.
- Verified CSS-variable names where supported.
- Figma aliases with source content ID, source version and row; mapping status and semantic role/state.
- Legacy correspondence only when supported by documentation/source; explicitly mark contextual or approximate visual correspondence rather than color equality.
- Conflict/review notes. Preserve upstream unresolved references as evidence; do not conceal them behind black/transparent/default-value fallbacks.

Keep current implementation inventory separate from curated design aliases so source generation cannot silently rewrite approved mappings. The validator checks both against the live exported theme. Human tables link directly to machine-readable data and explain how to query a family rather than loading the complete inventory into every prompt.

### 5.3 Design correspondence

Baseline design sources:

- Semantic color database `1939407344`, observed version 559, updated 2026-09-09.
- Typography database `1962606684`, observed version 139, updated 2026-06-01.
- Designer Handbook `1927774846`, observed version 73.
- Light Mode guide `2386166626`, observed version 40.

The color database includes complete tokens, naming fragments, ranges, empty rows, draft rows and discrepancies. Do not treat every row as a complete token. Do not expand Figma/code pipe-separated columns by blind positional zipping: row 85 reverses disabled/selected-disabled order, and status rows also have ordering differences. Chart ranges must resolve to real implementation paths. Preserve evidence for source typos/corrections rather than silently converting all hyphens or underscores.

Known source boundaries to encode explicitly:

- `_component.*` has no individual Figma entries in the observed database.
- Mode variants have a generic naming rule, not per-leaf verified aliases.
- Some subtle-selected and chart auxiliary/overlay leaves lack enumerated design aliases.
- Some design names/code-syntax entries, including `inProgress`, are ahead of the current implementation.
- Some code-syntax rows contain spelling/path inconsistencies. Code-path existence is validated against the actual theme, not the database's string alone.

Retain the user-supplied migration page as the public v2/v3 baseline. `packages/react-docs/pages/migrations/migrating-color-tokens-from-v2-to-v3/index.page.mdx` is useful historical evidence but not the inventory oracle; it includes names absent from the current exported theme.

### 5.4 Typography

Include all complete typography rows, not only color tokens. The current theme has no composite `typography.body.md` semantic API; map design roles to real `fonts`, `fontSizes`, `fontWeights` and `lineHeights` compositions where evidence supports them.

For example, design body-md regular 14px corresponds to `fontSize="sm"` and `fontWeight="normal"`; label-md medium 14px needs `fontWeight="medium"` explicitly. `TextLabel` does not itself establish medium font weight. Do not assume Figma `md` equals code `md`.

The observed typography database has no line-height column. Report code-derived line-height behavior separately from design confirmation. Display sizes 36/44/52px have no current named font-size token; document the gap and, when implementing an explicit design request, use its confirmed literal size rather than inventing a `5xl` token. Do not omit these design entries from the mapping report.

## 6. Screenshot workflow

1. Establish target library version, known Figma library/variable names, component roles, surface elevation, interaction state and color mode from available evidence.
2. Read the relevant token families and design mappings. An exact visible variable name can establish a mapping; a screenshot without such labels supports candidates, not original variable identity.
3. Produce rows identifying the visible element, role/state, actual candidate code path, Figma alias if confirmed, confidence/evidence, mode implications and implementation usage.
4. Use pixels/colors as corroborating evidence. Account for alpha, backdrop compositing, anti-aliasing and fixed/inverse modes. Equal RGB is not proof of equal semantic intent.
5. Flag ambiguous choices, design-only tokens, private stability risks and missing attributes in the Designer review template. Continue with verified portions; do not substitute a guessed primitive color for a missing semantic decision.

The unmapped template includes the exact input/element, available evidence, candidate paths, missing decision, affected modes/states, source version and review outcome. It is a local report; never send it to a designer or external system automatically.

## 7. Upgrade and release verification

### 7.1 v2-to-v3 migration

Read the app's own dependencies, lockfile, custom theme/colorStyle definitions and usage sites. Resolve compatible target versions per package; related package versions are not necessarily identical. Compare the target package's peer requirements with prose guidance and report disagreements.

Cover the guide's provider/global-style setup, slots/slotProps, portalled, SubmenuTrigger, DataGrid height behavior and package compatibility. Supplement the guide with real target-version deprecation and changelog evidence so newer v3 changes are not missed.

Label each action: necessary for the requested target/app, deprecated but still supported, optional adoption, or manual design decision. The public guide says legacy v2 color token references can coexist with v3; preserve that distinction. A removed default colorStyle entry or incompatible package peer is not the same as an optional color syntax migration. Preserve custom mappings where they remain required.

The external FEDex skills are reference material only. Do not reproduce their obsolete universal beta.2 pins, nonexistent `use-theme-tokens` MCP tool, unsupported DataGrid prop claims, or claimed crash from `useColorStyle({ colorMode })` when the target version still supports it.

Default to analysis and a concrete plan. Apply task-scoped changes when execution is explicitly requested. Verify changed API behavior, dependencies, relevant layout/interaction paths, dark/light rendering and user-visible outcomes; record anything not exercised.

### 7.2 App development with optional MCP access

`tonic-ui-dev` follows four steps: understand app context and the requested change;
retrieve relevant official APIs and real examples; integrate with existing app
wrappers/forms/state; verify the affected behavior. Do not start with a release
audit or full checklist. Trace actual imports rather than similarly named components.

MCP is part of this skill, not a separate skill: `use-docs` finds pages, `fetch-pages`
reads them, and `fetch-codes` retrieves referenced examples when needed. Prefer an
existing connected tool or readable checkout. Only offer setup if the task needs
unavailable evidence. A local clone followed by direct reads is valid without
dependency installation or running MCP; local MCP from the checkout is an alternative.
No clone, installation, service start or client configuration change is automatic.

Check relevant intended and installed versions without assuming they match. Only
compatibility questions or an explicit update trigger changelog/source investigation.
Use available `fetch-pages` or local reads; a release delta uses prerelease-aware
`(source, target]` bounds per package. A latest checkout/docs label is not installed
version proof. Report announcement-versus-implementation conflicts with evidence.

Do not embed per-release changes, known-issue copies or app-specific research data
in the skill. The separately scoped token and migration skills are unchanged.

Every check has `PASS`, `FAIL`, `NOT_APPLICABLE`, or `UNVERIFIED` plus evidence. Compilation, successful token lookup, or a static scan cannot establish visual/interaction `PASS`.

## 8. Verification and acceptance criteria

| ID | Acceptance criterion | Evidence |
| --- | --- | --- |
| AC1 | Root `skills/` is the only physical content source; six existing skills and all resources are preserved; `.agents/skills` and Claude entries are relative discovery links | Resource inventory, real paths and loaded source paths |
| AC2 | Catalogs and compatibility manifests resolve the same identity/version and the same nine-skill root | Parser/schema validation and cache-shaped directory inspection |
| AC3 | Claude, Codex and omp discover all nine skills, load their resources, and avoid duplicate same-file skills from native/plugin entries | Fresh runtime traces with executable versions and repo/cache/nested-CWD loaded paths; not agent self-report alone |
| AC4 | Every source-derived public/private primitive, semantic and retained legacy token is represented | Mechanical inventory-to-live-theme set comparison; omission negative check |
| AC5 | Every mapping declared implemented points to a real target; unimplemented design entries and missing aliases remain explicit | Target resolution, mapping-conflict and code-only/design-only checks |
| AC6 | Figma typography rows are covered without inventing composite APIs, missing scales or design-confirmed line heights | Composition lookup scenarios and missing-attribute report |
| AC7 | Screenshot-only lookup yields real, evidence-labelled candidates rather than guaranteed variable identity | Labelled-token, ambiguous screenshot, private-token and design-only scenarios |
| AC8 | Daily v3 lookup does not require or execute migration | Development scenario on an already-v3 app, with no upgrade request |
| AC9 | v2-to-v3 plan distinguishes necessary/deprecated/optional changes and actual custom colorStyle context | Migration scenarios with retained legacy colors, supported API options and incompatible peer versions |
| AC10 | v3-to-v3 checklist is version-specific and does not auto-apply stale workarounds | Release-delta scenario and unresolved visual-check scenario |
| AC11 | Plugin works without Tonic/Figma/Confluence MCP availability at its documented snapshot; missing image capability is explicit | Offline/reference-only scenario and capability-gap scenario |
| AC12 | Root MCP autostart entry is removed only in this worktree; MCP implementation/config/manual setup remain available | Exact-path removal and local server initialize/tools/docs smoke evidence |
| AC13 | No installs, credential reads/writes, registry changes, external writes, commits, pushes or active-migration modifications occur without explicit authorization | Recorded commands, changed-path inventory and scoped runtime probes |
| AC14 | Retained version helpers use the correct active checkout after relocation or cache loading, with existing successful and failing checks preserved | Actual label/index script runs from root and nested checkout CWDs, plus explicit missing-checkout behavior |

Use realistic behavior evaluations with and without the skill guidance before and after authoring. Each skill gets its own baseline and with-skill scenario; a plausible answer or a frontmatter validator alone does not prove usefulness. Keep permanent checks for coverage, invalid mapping targets, uncertainty handling and release applicability rather than source-text or copied-wiring assertions.

Run actual lookup commands and runtime/resource smoke paths after implementation. Do not claim three-runtime execution or installation has passed before it is observed. If a runtime requires an unavailable credential or permission, finish other checks and report the exact missing prerequisite; do not weaken acceptance or alter user configuration.

## 9. Integration and safety

The new worktree has been rebased onto the fetched `origin/main`, which includes the shared-agent-skills migration. The local design specification was preserved, and the approved root `.mcp.json` removal is reapplied after the rebase. Do not copy or modify another worktree's uncommitted state or commit/push on the user's behalf.

Scope changes include moving the six existing skill/resource trees, replacing their native discovery entries, updating active paths/root resolution and task-index documentation, adding the three new skills and marketplace metadata, and the approved root `.mcp.json` removal. Preserve the root README's library overview and the existing contributor/release policies. Do not update unrelated package code, public API behavior, old historical migration records or latent theme bugs merely because research identified them. Surface source conflicts in the new references.

This is not a release of a versioned library package; do not create a Changeset or publish anything. Plugin metadata uses its own initial version and does not bump the library's prerelease versions.

## 10. Source references

Repository sources:

- `packages/react-docs/pages/migrations/migrating-from-v2-to-v3/index.page.mdx`.
- `packages/react-docs/pages/migrations/migrating-color-tokens-from-v2-to-v3/index.page.mdx`.
- `packages/theme/src/v3/index.js`, `primitive/`, `semantic/colors/`, `semantic/shadows/`.
- `packages/utils/src/internal/resolveTheme.js`, `toCSSVariable.js`.
- `packages/react/src/theme/utils/css-vars.js`, `packages/react-docs/components/ThemeTokens.js`.
- `packages/react/src/text/styles.js`, `TextLabel.js`, and theme font primitives.
- Published package manifests/changelogs and target component implementations.

Design sources:

- upstream design snapshot content ID `1927774846` (not a Tonic UI operational link)
- upstream design snapshot content ID `2386166626` (not a Tonic UI operational link)
- https://trendmicro.atlassian.net/wiki/spaces/VO/database/1939407344
- upstream typography snapshot content ID `1962606684` (Tonic UI applicability unconfirmed)

Packaging references:

- User-specified local `<reference-superpowers-checkout>/{skills,.claude-plugin,.codex-plugin,.agents/plugins}`; reference only, not a runtime dependency.
- External `ai-skill-marketplace/plugins/fedex-dev/skills/tonic-v3-*`; reference only.
- https://agentskills.io/specification
- https://code.claude.com/docs/en/plugins-reference
- https://developers.openai.com/plugins/build/plugins
- omp local documentation: `marketplace.md`, `skills.md`, `mcp-config.md`; these are research citations, not dependencies in the authored skills.
