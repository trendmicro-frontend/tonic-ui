# Tonic UI Internal / External Skills Cutover

> Backport context: This document preserves the upstream design and amendment history, adapted to Tonic UI v2/v3. Historical runtime results and authorizations below are not evidence or authorization for this checkout. The split amendment defines the current six-internal/three-external layout. Current backport results are recorded in `docs/handoffs/tonic-ui-marketplace-backport.json`. Package-specific examples involving DataGrid/charts require a separately available package; they do not establish a Tonic UI package export.

**Approved contract:** Physical internal/external separation and versionless external names remain approved. The latest user instruction supersedes the earlier nine-local-skill workflow: `.agents/skills/` and `.claude/skills/` must expose only the same six internal skills through relative symlinks. External skills remain plugin-only. Prior authorization covered actual add/install verification in temporary isolated settings and caches, not new commits, pushes, publication, or changes to existing client configuration.

## Layout and ownership

- `skills/internal/` owns the six existing `tonic-ui-{patterns,pr,slots,sx,types,version}` skill/resource trees.
- `skills/external/` is the marketplace plugin root. It owns `tonic-ui-tokens`, `tonic-ui-dev`, `tonic-ui-upgrade`, plus one thin `.claude-plugin/plugin.json` that explicitly names the three skill directories and is shared by Claude, Codex and omp. A duplicate `.codex-plugin/plugin.json` was removed after an isolated Codex install proved the shared manifest loads.
- Root catalogs point at `./skills/external`. Root plugin manifests are moved, not retained as nine-skill aliases.
- Native `.agents/skills/<name>` and `.claude/skills/<name>` are direct relative links to `skills/internal/<name>` only. Local discovery exposes six contributor skills; marketplace/plugin loading exposes the three external skills.
- No skill content is copied. Consumer data/scripts remain self-contained and resolve relative to their loaded skill.

Claude Code retains its own native `.claude/skills/` discovery entry points, built the
same way as `.agents/skills/`. Neither directory contains instruction copies or external
skill adapters. Loading the external plugin alongside local internal skills is allowed:
the groups are disjoint, so this no longer creates duplicate external selectors.

### Latest internal-only adapter cutover

1. Remove only `tonic-ui-{dev,tokens,upgrade}` symlinks from both native adapter directories. Keep all six internal links, all physical skill sources, both marketplace catalogs and the shared plugin manifest.
2. Change the validator to require adapters only for `groups.internal` and reject any extra native adapter. Preserve frontmatter/resource/inventory validation for both physical groups and the three-skill plugin boundary.
3. Update the skills catalog, root overview, contributor guidance, resident policy and handoff to distinguish six local skills from three plugin skills.
4. Exercise actual Claude/Codex/omp discovery, including a Claude `.agents`-only versus `.claude` adapter control. Run the Node regression suite, complete validator, inventory check and manifest validation. No new wiring-only unit tests or library package changes are needed.

## Steps

1. Move directories and manifests; replace the old whole-root `.agents/skills` link with per-skill links. Rename external frontmatter, eval IDs, script imports/data paths, references, live indexes and active documentation. Preserve historical baseline outputs unchanged.
2. Broaden the development skill from release-only verification to everyday frontend highlights: surfaces, text/severity contrast, states, overlays, focus, DataGrid layout, widget/provider boundaries and source-specific known issues. Version-delta verification is a conditional subflow, not a development prerequisite. Token resolving and actual app migration stay separate.
3. Update generator/validator to the new physical groups and three-skill plugin boundary. Keep complete live-theme comparison, negative omitted-private/invalid-target checks, source/mapping evidence status and optional MCP absence rules.
4. Reproduce and fix review findings: named properties on arrays must serialize consistently; family-only mappings must not become verified design aliases; family queries must include bracket-addressed decimal keys.
5. Run generator/check, Node behavior suite, complete validator, lookup smoke from a cache-shaped external copy and retained helper positive/negative cases. Validate both Claude manifests and use actual Codex/Claude/omp discovery/read interfaces without changing user registries. Installed/plugin probes must report exactly the three external names and no internal names.
6. Run fresh reference/behavior evaluations and a scoped review; record evidence and capability limits. Update user-facing maintenance documentation. No library package behavior or version is changed; no library Changeset is created.

## Verification invariants

- Internal count six, external count three; each native adapter directory contains exactly the six internal names. External plugin loading contains exactly the three external names.
- External plugin source contains no internal skill content or links escaping its root.
- Unknown tokens and invalid targets fail; unresolved code values cannot acquire verified status via a Figma alias.
- Every source-derived private/public/primitive/semantic/legacy path and both units/modes remain represented.
- Screenshot color is candidate evidence, not proof of original variable identity; typography does not invent composite APIs or design line heights.
- Development does not require an upgrade; upgrade does not modify library release metadata; unexercised visual checks remain UNVERIFIED.

## Approved app-first development workflow

Keep the name `tonic-ui-dev`; MCP access is a capability inside it, not a fourth skill.
The app repositories were read-only validation examples, not implementation targets
or sources of hard-coded app paths/rules in the skill.

1. Start with the requested behavior and actual app imports, wrappers, forms, state
   and relevant installed/locked versions. Do not run a full checklist or release audit.
2. Use `use-docs` to find relevant pages, `fetch-pages` to read their APIs and
   `fetch-codes` to retrieve their referenced examples when needed.
3. Adapt to the existing app architecture, preserving callbacks/value shapes, i18n,
   permission/state behavior and test/analytics attributes. Do not replace wrappers
   merely to match a documentation demo.
4. Verify the changed behavior. Investigate matching changelogs/source only for
   compatibility questions or an explicitly requested package update.

Use existing tools/local evidence first. Only offer setup when needed evidence is
unavailable: a local clone with direct reads requires no dependency installation or
running MCP; local MCP from the checkout is an alternative. Each external/local
setup action still requires authorization. Keep access restrictions unchanged.

Remove copied release/known-issue content from the dev skill. Keep token inventory
and migration resources unchanged. Verify marketplace conformance, real MCP page/
example/changelog retrieval and focused app-first reasoning scenarios. No MCP
runtime change, clone, installation, app edit, commit, push or publication is required.
