---
name: tonic-ui-upgrade
description: Use when upgrading a consuming application's Tonic UI packages, planning a v2-to-v3 migration, resolving upgrade peer conflicts, or deciding which API changes are necessary versus deprecated or optional. Not for ordinary frontend development, token selection, or Tonic UI library releases.
---

# Tonic UI v2 → v3 application upgrade

This skill migrates a **consuming application** to Tonic UI v3. It is not a Tonic UI library change and never a library release.

**Do not route a consuming-app upgrade into Tonic UI library release work.** Release work edits this repository's version registry, docs selectors, changelogs and release branches; it is a repository-side concern and is not part of the installed plugin. An app bump only changes the app's own dependencies, lockfile and code.

Default to **analysis and a concrete plan**. Apply task-scoped edits only when execution is explicitly requested.

## Inputs

- The app's `package.json` and lockfile, and its custom theme / `colorStyle` definitions.
- The installed `@tonic-ui/react` version and every other `@tonic-ui/*` package the app uses.
- The intended target version(s) — resolve one per package, not one global pin.
- The app's own source: which components, props, hooks, tokens and global styles it actually uses.

## Ground truth

Read the target version's real source before asserting anything:

1. **Package metadata** — each package's own `peerDependencies`/`dependencies` under `packages/*/package.json` in a Tonic UI checkout at the target revision. Peers differ per package (see [UPGRADE_RULES.md](UPGRADE_RULES.md) group P).
2. **Deprecations** — `warnDeprecatedProps(...)` call sites in `packages/react/src/**`. The call itself, its `alternative`, and its `willRemove` flag are the evidence; a comment mentioning a deprecation is not proof the warning is wired up. Some source comments and JSDoc are the only deprecation evidence (e.g. `SubmenuToggle`); read the declaration directly rather than assuming a runtime warning exists.
3. **Changelogs** — `packages/*/CHANGELOG.md` for the version that introduced a prop, slot or behavior.
4. **The two migration guides** in `packages/react-docs/pages/migrations/` (`migrating-from-v2-to-v3`, `migrating-color-tokens-from-v2-to-v3`) as the public baseline, always cross-checked against current source.

If a checkout is unavailable, use the app's installed package contents and the published docs, and record the freshness limit. Never invent a codemod, MCP tool, prop or version. The optional docs MCP (`use-docs` / `fetch-pages` / `fetch-codes`) is a convenience, not a prerequisite.

**Package availability boundary:** this repository has no `@tonic-ui/react-data-grid` or chart package. Do not present DataGrid or chart packages, peers, props or versions as Tonic UI packages. If an app separately depends on such a package, verify that package's own manifest and source; those rules are outside this repository's evidence. See group D.

## Classification

Label every candidate change. The four labels are defined and evidenced in [UPGRADE_RULES.md](UPGRADE_RULES.md):

| Label | Meaning |
| --- | --- |
| **Necessary** | The requested target/app will not build, install or behave correctly without it. |
| **Deprecated, still supported** | Works in v3; removal is a future release. Many callsites also log a dev-only warning, but some deprecations are documented without a live one — attribute any warning to the actual callsite ([UPGRADE_RULES.md](UPGRADE_RULES.md) group X). |
| **Optional adoption** | New v3 capability the app may adopt; not required to become a working v3 app. |
| **Manual decision** | Needs product/design/architecture judgment (global CSS scope, custom mappings, explicit sizing). |

A deprecation is **not** automatically a compile-breaking removal. Most v3 API changes are additive slots/props; the legacy prop and its replacement are merged, with the new slot winning on conflict. Not every deprecation emits a warning — see [UPGRADE_RULES.md](UPGRADE_RULES.md) group X for which ones do.

## Workflow

1. **Read the app.** List installed versions, peer conflicts, custom theme/`colorStyle`, and every usage site of each changed API.
2. **Resolve target versions** per package from real peer metadata; report where prose guidance disagrees with the manifest.
3. **Draft the plan** using [PLAN_TEMPLATE.md](PLAN_TEMPLATE.md): scope, action table with classifications + evidence, proof steps, manual decisions, out-of-scope.
4. **Execute only on request**, one rule group at a time, smallest necessary patch first. Preserve behavior unless a rule requires otherwise.
5. **Verify** against the plan's proof steps: build/typecheck, then the behavioral and visual checks for each changed surface. Report what was actually exercised and what was not.
6. **Note source conflicts** rather than fixing the library here.

## References

- [UPGRADE_RULES.md](UPGRADE_RULES.md) — target-version rule groups (packages/peers, provider & global CSS, slots, portals, DataGrid/charts availability, color style & tokens, other source-verifiable deprecations), each with classification, evidence and verification.
- [PLAN_TEMPLATE.md](PLAN_TEMPLATE.md) — fill-in migration plan/report.
- [LANGUAGE_RULES.md](LANGUAGE_RULES.md) — output language, evidence labeling and portability rules.
- Token work: the **tonic-ui-tokens** skill owns the implemented-token inventory (`assets/tokens.json`) and lookup helper (`scripts/lookup-tokens.mjs`), relative to that skill's root. Consult it when a migration needs a token path or value; token selection does not require an upgrade.
