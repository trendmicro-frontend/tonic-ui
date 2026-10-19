# Tonic UI Skills Marketplace Implementation Plan

> Backport context: This document preserves the upstream design and amendment history, adapted to Tonic UI v2/v3. Historical runtime results and authorizations below are not evidence or authorization for this checkout. The split amendment defines the current six-internal/three-external layout. Current backport results are recorded in `docs/handoffs/tonic-ui-marketplace-backport.json`. Package-specific examples involving DataGrid/charts require a separately available package; they do not establish a Tonic UI package export.

> **For agentic workers:** Follow the approved specification below. Independent skill-authoring slices can run concurrently with disjoint files; the parent owns source relocation, shared data/scripts, metadata, integration and final verification. Do not run builds, lint, tests or formatters mid-flight in delegated slices. Do not commit or push.

**Goal:** Ship a Superpowers-style Tonic UI plugin with one root `skills/` body, six retained skills and three new portable development/upgrade skills, complete implemented token inventory, evidence-backed Figma correspondence, and Claude/Codex/omp discovery.

**Architecture:** Move existing skill/resource trees without duplication, retain native discovery through relative links, and point both compatibility manifests at `./skills/`. Generate token truth from repository source and resolve it with existing utilities; keep curated design aliases separate. Skill bodies describe capabilities, versions, evidence and uncertainty without executor-specific requirements.

**Tech Stack:** Markdown/Agent Skills, JSON manifests/data, Node.js built-ins. Maintainer source evaluation uses the already available `@babel/core` and CommonJS transform from the repository dependencies; consumer lookup has no npm dependencies.

**Spec:** `docs/specs/2026-10-14-tonic-ui-marketplace-design.md` (approved after the root-skills redesign).

**Current amendments:** [the split plan](../../plans/2026-10-14-tonic-ui-marketplace-split.md)
supersedes the historical layout and checklist-file lists below. The development
skill now keeps methods only and resolves changelogs and known issues from their
sources at use time.

## Global Constraints

- Root `skills/` is the only physical skill content source.
- Preserve all six retained skills, references, scripts and eval resources; no platform content copies.
- `.agents/skills` is a relative discovery link to `../skills`; Claude entries point directly to `../../skills/<name>`.
- Existing contributor policies stay in `AGENTS.md`; distinguish app development, app upgrades and library contribution/release.
- New skills: `tonic-theme-tokens`, `tonic-v3-upgrade`, `tonic-v3-checklist`.
- All implemented public/private primitive, semantic and retained legacy tokens are covered. Missing Figma aliases and unimplemented design entries remain explicit.
- Both color-token and application migration pages are the baseline; actual target-version source/manifests/changelogs resolve implementation facts.
- Confluence color DB 1939407344 v559, typography DB 1962606684 v139, Handbook 1927774846 v73 and Light Mode guide 2386166626 v40 are observed design-source versions, not permanent latest-version pins.
- No `allowed-tools`, platform slash/URI requirements, hidden model/provider controls or mandatory MCP dependency in shared skill bodies.
- No installations, credential inspection/changes, registry changes, external writes, commits or pushes. The approved root `.mcp.json` removal stays applied only in this worktree; retain MCP code/config/manual documentation.
- Do not change library component behavior or repair unrelated upstream theme/doc discrepancies.
- No Changeset: no versioned library package is changed.

## Task 1: Relocate retained skills and update active paths

**Files:** All files currently under `.agents/skills/tonic-ui-{patterns,pr,slots,sx,types,version}` move to matching `skills/` directories. Update `AGENTS.md`, `CONTRIBUTING.md`, retained version skill invocations and the two version scripts. Preserve historical migration documents.

**Interfaces:** Produces root `skills/<name>/SKILL.md` and resources plus native discovery links. Maintainer helpers operate on the active Tonic UI checkout, including when loaded from a plugin cache.

- [ ] Record the existing twelve resource files and source hashes as a throwaway move inventory.
- [ ] Exercise the existing version-label and docs-index scripts before changes; record baseline output without weakening their checks.
- [ ] Move the complete six skill trees with content-preserving moves. Replace the now-obsolete source directory with the relative `.agents/skills -> ../skills` discovery entry. Repoint Claude links directly to root `skills/` and add new links only once new skill directories exist.
- [ ] Update live path references from `.agents/skills/tonic-ui-version/scripts/...` to `skills/tonic-ui-version/scripts/...`; do not rewrite historical plans.
- [ ] Resolve the active work repository from CWD ancestors with `tonic-ui-version.config.js` and the expected docs tree, falling back to the source checkout location when appropriate. Use a clear nonzero missing-checkout error, not the plugin cache as the work repository.

```js
function findCheckout(start) {
  let directory = resolve(start);
  while (true) {
    if (existsSync(join(directory, 'tonic-ui-version.config.js'))
        && existsSync(join(directory, 'packages/react-docs/pages'))) return directory;
    const parent = dirname(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
}
```

- [ ] Update the repository's current skill-source instructions/index and maintenance documentation to root `skills/`, leaving policy content unchanged except ownership/trigger clarifications required by distribution.
- [ ] After integration, verify resources, native links, both helper scripts from root/nested CWDs, and explicit missing-checkout behavior from a cache-shaped copy.

## Task 2: Source-derived token inventory and lookup contract

**Files:** `scripts/skills/{source-theme,generate-token-inventory,validate-marketplace}.mjs`, `skills/tonic-theme-tokens/{assets/tokens.json,scripts/lookup-tokens.mjs}`, `scripts/skills/__tests__/marketplace.test.mjs`.

**Interfaces:**

| Function | Input | Required result |
| --- | --- | --- |
| `loadThemeSources(repoRoot)` | Absolute Tonic UI checkout root | Existing source exports for theme creation, primitive/semantic creation, theme resolution and CSS-variable mapping, with source fingerprints |
| `buildTokenInventory(repoRoot)` | Absolute Tonic UI checkout root | The source-derived inventory JSON contract below |
| `lookupTokens(query, inventory, mappingData)` | An exact token/Figma name or family/keyword query, plus the two bundled JSON documents | Matching implemented/design-only/composed evidence records with provenance; invalid verified targets or unknown queries produce a nonzero CLI result |

JSON inventory contract:

```json
{
  "schemaVersion": 1,
  "meta": {
    "themeVersion": "actual package version",
    "sourceRevision": "actual revision",
    "sourceHashes": {},
    "units": ["px", "rem"]
  },
  "tokens": [
    {
      "path": "colors.text.primary",
      "token": "text.primary",
      "scale": "colors",
      "kind": "semantic",
      "visibility": "public",
      "raw": {"_dark": "source expression", "_light": "source expression"},
      "values": {"dark": "resolved source value", "light": "resolved source value"},
      "cssVariable": "--tonic-colors-text-primary",
      "resolutionStatus": "verified"
    }
  ]
}
```

The illustrative strings above are replaced with source-derived values. Unit-dependent records add px/rem values; unresolved source references are marked explicitly. Each record is a reachable token/base-main alias/variant, not an `_dark` or `_light` payload field.

- [ ] Write behavior tests first and run RED before implementation: a private `_component` lookup must return a real private token; a reversed-order Figma row must map selected-disabled correctly; an unimplemented design token must remain design-only; an unknown token must fail without fabricated color; a coverage checker must reject an inventory with an omitted private path.
- [ ] Implement a cached repository-local CommonJS evaluator using Babel's existing module transform, handling relative `.js`/directory `index.js` imports and the small existing utility alias boundary. Do not parse token objects with regex or reimplement theme reference resolution.
- [ ] Load `packages/theme/src/createTheme.js`, v3 primitive/semantic exports, `packages/utils/src/internal/resolveTheme.js`, `toCSSVariable.js` and the existing CSS-variable mapper. Use `resolveTheme(theme).toColorMode(mode).get(path)` for values and actual `toCSSVariable` for names. In this source, dots become hyphens but colons become underscores; do not repeat the earlier external assumption that both become hyphens.
- [ ] Enumerate all source theme leaves plus `main` aliases. Classify origin using primitive/semantic path sets and the retained legacy remainder. A path segment starting `_` marks private. Preserve array/named breakpoint aliases and shade/state/chart/unit variants. Resolve px/rem and both modes.
- [ ] Record source module fingerprints and package/revision provenance; output deterministic sorted JSON. Save or check the snapshot with the generator's normal/check mode.
- [ ] Implement exact token/Figma lookup and family/keyword lookup. CLI outputs JSON with provenance and evidence status, uses the bundled JSON relative to its own script, and exits nonzero on unknown query/invalid verified target. No silent black/transparent/default-token replacement.
- [ ] The validator compares inventory paths/values/fingerprints to current source, validates mapped targets, manifests/skill metadata/resources and relative native adapters. Controlled omitted/invalid mapping inputs must be rejected with the offending path.
- [ ] Run the actual generator/lookup commands and final behavior tests after all dependent files are complete.

## Task 3: Development-first theme-token skill and curated design mappings

**Files:** `skills/tonic-theme-tokens/{SKILL.md,TOKEN_MAPPING.md,TYPOGRAPHY_MAPPING.md,SCREENSHOT_RULES.md,UNMAPPED_TOKEN_TEMPLATE.md,LANGUAGE_RULES.md,assets/figma-mappings.json,evals/evals.json}`.

**Interfaces:** Consumes Task 2 inventory. Produces this mapping contract:

```json
{
  "schemaVersion": 1,
  "sources": [{"contentId": "1939407344", "version": 559}],
  "mappings": [
    {
      "figma": "$color.text.primary",
      "path": "colors.text.primary",
      "status": "verified",
      "source": {"contentId": "1939407344", "version": 559, "row": "36"},
      "role": "general paragraph/table text",
      "notes": []
    }
  ]
}
```

Statuses include `verified`, `family-mapping`, `source-conflict`, `design-only` and `composed`. Typography composition entries carry real theme paths/properties and missing attributes instead of a fake composite semantic key. Code-only entries remain in the inventory; lookup reports the absence of a design alias.

- [ ] Record a no-skill baseline on labelled Figma, private/code-only, ambiguous screenshot and missing typography-attribute tasks before drafting instructions.
- [ ] Build complete design-row coverage from the two cached/source databases. Exclude naming fragments/empty rows from exact-token claims, preserve their naming guidance separately, and retain all complete/draft design entries with status.
- [ ] Expand real documented chart/state families against Task 2 paths. Do not blindly zip multi-name columns: row 85 and status rows have order discrepancies. Preserve raw source typos and mark corrections/conflicts; never invent an implemented target.
- [ ] Write a short development-first workflow with direct reference links and a working lookup example. No migration prerequisite or package modification when the task is token selection.
- [ ] Cover all private families, source-derived values/CSS names, current code existence, private stability risk, v2 reference optionality and Designer handoff fields.
- [ ] Typography uses actual size/weight compositions, distinguishes code-applied line height from absent design confirmation, and records display-size gaps. Screenshot workflow outputs confirmed aliases or evidence-labelled real candidates, never original identity from RGB alone.
- [ ] Evals cover the behavior and ambiguity boundaries; retain deterministic fixtures/assertions only for consumer-visible errors.

## Task 4: Version-aware v2-to-v3 upgrade skill

**Files:** `skills/tonic-v3-upgrade/{SKILL.md,UPGRADE_RULES.md,PLAN_TEMPLATE.md,LANGUAGE_RULES.md,evals/evals.json}`.

**Interfaces:** App/source/target inputs produce necessary/deprecated/optional/manual actions with file/version evidence. Use the separate token skill's data/reference as needed without making its development workflow a migration prerequisite.

- [ ] Record a no-skill baseline with retained v2 colors, supported `useColorStyle({ colorMode })`, custom severity mapping and mixed package peer versions.
- [ ] Read both full migration guides plus current relevant deprecations and package/changelog evidence. Resolve package versions per package; no universal beta pin or invented codemod/MCP tool.
- [ ] Write a portable analysis/plan/explicit-execution workflow, target-version rule groups and a plan template with scope, proof, manual decisions and required/optional distinctions.
- [ ] Cover provider/global CSS scope, slots, portals/popper behavior, SubmenuTrigger, DataGrid sizing/virtualization and other actual target-version API changes. Preserve existing custom mappings and distinguish removed default colorStyle keys from optional token-syntax adoption.
- [ ] Evals reject incorrect automatic color rewrites, false unsupported-option crash claims and contributor-release routing for a consuming app.

## Task 5: v3-to-v3 release checklist

**Files:** `skills/tonic-v3-checklist/{SKILL.md,COMPONENT_CHANGES.md,KNOWN_ISSUES.md,evals/evals.json}`.

**Interfaces:** Exact per-package source/target versions and app usages produce release-delta checks with PASS/FAIL/NOT_APPLICABLE/UNVERIFIED and actual evidence.

- [ ] Record a no-skill baseline for a v3 release update, a superseded historical workaround and unexercised visual states.
- [ ] Read source/target release notes, package peer changes, actual relevant component implementations and observed Handbook/Light Mode source versions.
- [ ] Write release-specific static and live/manual checks, component-change reference and known-issue applicability records. Do not turn the whole v2 guide into every v3 update's breaking-change list.
- [ ] Cover relevant surfaces/overlays, custom text and alert contrast, ghost icon actions, banner/slider states and changed DataGrid/portal/focus behavior. Preserve the source priority of image assets and absent fixes.
- [ ] Evals prevent compile-only visual PASS, obsolete unconditional workarounds, and missing version bounds.

## Task 6: Marketplace metadata, index and integration

**Files:** `.claude-plugin/{plugin,marketplace}.json`, `.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json`, `skills/README.md`, root `README.md`, current `AGENTS.md`/`CONTRIBUTING.md`, final validator integration.

**Interfaces:** One identity `tonic-ui`, one plugin version `1.0.0`, root `skills/`, no MCP/hooks/settings. Catalogs refer to the repository root using each client's supported local source shape.

- [ ] Create minimal manifests, same identity/version and `skills: ./skills/` where explicit declaration is used. Claude's default root skills scan includes all nine; do not pretend a selected array excludes root contributors.
- [ ] Create Claude/omp and Codex catalogs, validate the installed Codex local-source grammar rather than blindly copying `url: ./`.
- [ ] Add all nine native discovery links and verify unique real paths. A cache-shaped copy must include complete skill resources and not require another repository.
- [ ] Write installation/invocation differences in README only; do not alter personal settings or perform installs. Clearly classify app development, app upgrades and library contributor/release skills. MCP remains explicitly optional.
- [ ] Update current task index and maintenance paths, with contributor-policy meaning preserved.
- [ ] Run `claude plugin validate`, read-only/native discovery probes for Codex and omp, generator/checker/lookup commands and the final Node behavior suite. Use temporary isolated/cache-shaped paths for loader probes; do not write user registries or bypass approvals.

## Task 7: Evaluate, review and deliver

- [ ] Run fresh baseline/with-skill scenarios for each new skill, including a synthetic labelled/ambiguous screenshot fixture where the evaluator supports images. Record actual outcomes; never claim visual verification from text alone.
- [ ] Generate the skill-creator review artifact with outputs and assertion results, clearly distinguishing semantic grading from mechanical checks. Do not upload or publish it.
- [ ] Run retained helper positive/negative smoke cases and all fourteen specification acceptance checks. Record exact runtime versions, loaded paths, command outcomes and any unavailable capability.
- [ ] Request a scoped code/spec review covering structural moves, executable scripts, mapping truth, skill boundaries and metadata. Fix verified findings without broadening scope.
- [ ] Update user-facing maintenance/verification documentation with observed evidence. Remove only task-owned throwaway scaffolds, not user files or unrelated artifacts. No commit/push/release.

## Preflight interface review

| Task pair / task | Shared boundary | Resolution |
| --- | --- | --- |
| 1 / 6 | Physical skill root and native adapters | Parent owns both; root skills/ is canonical, relative links only |
| 2 / 3 | Inventory and curated mappings | Separate files; exact path/status contract above; source generation never overwrites aliases |
| 2 / 4 / 5 | Source truth versus upgrade rules | Generated inventory is implemented-token truth; target-version rule evidence remains in each skill |
| 3 / 4 / 5 | Trigger and report boundaries | Development has no upgrade prerequisite; migration differs from recurring v3 release checks |
| 1 / 7 | Retained script path changes | Actual active checkout and positive/negative script runs required |
| 6 / 7 | Platform compatibility | Metadata validation plus actual fresh loader/resource evidence, not self-report |
| 1 | Relocation and source preservation | No content mirrors; current paths change, historical records stay historical |
| 2 | Tests versus implementation | Real lookup/coverage failure cases, no source-string/wiring-only tests |
| 3 | Design aliases versus inventory | Missing/private/unimplemented entries are explicit, not fabricated aliases |
| 4 | Required versus optional | Actual app/target context controls classification |
| 5 | Workarounds versus release scope | Historical guidance needs applicability evidence |
| 6 | Root default discovery | All nine skills are intentionally published and categorized |
| 7 | Proof versus claims | Tests, semantic evals and runtime/visual evidence are reported separately |
