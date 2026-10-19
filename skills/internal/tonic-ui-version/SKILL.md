---
name: tonic-ui-version
description: Which files to update when cutting a new Tonic UI version — a new major (e.g. v2 → v3), a prerelease (entering/exiting alpha), or a new maintenance branch — and how to confirm scope, branch, and fold in deprecations along the way. Use this whenever the user mentions bumping a Tonic UI version, "transition from v2 to v3", cutting a release branch, entering or exiting alpha/prerelease mode, updating the docs version selector, the MCP config's `version` field, `tonic-ui-version.config.js`, `llms.txt`'s version heading, deprecating a component or API as part of a version bump, or asks "what needs updating for the new version" / "did I miss a file". Also use it proactively before committing any version bump, since the version label is duplicated across four files that silently drift apart when only one is edited.
---

# Tonic UI version transitions

This repo is mostly **config-driven**: one registry file fans out to the docs version selector, CI deploy paths, and env vars. The failure mode isn't forgetting the registry — it's the handful of places where a version label is *duplicated as a literal string* and drifts.

Nothing enforces agreement between these copies, and nothing fails loudly when they drift: `tonic-ui-mcp.config.js` still parses and the server still starts even if its label is stale, so a leftover old label after a bump just means MCP clients silently get stale-labelled docs served from the new branch.

So the ordering that matters: **confirm scope and branch, then edit the registry, then hunt the duplicated literals, then verify.**

Examples below use `v2` → `v3` as the illustrative bump — substitute whichever labels `tonic-ui-version.config.js` actually has for the real thing.

## Step 0: Confirm scope, and branch for major bumps

This step is about *doing* a bump, not *explaining* one — if the user is just asking what a bump would touch, answer from the steps below without gating on any of this.

When the user asks you to actually perform a version-related change, first confirm what kind it is, since the rest of this doc branches on it:

- A **major bump** (main moves from one label to the next, e.g. `v2` → `v3`) — the biggest case, touches the registry, the duplicated label, README, potentially deprecations, and a migration doc.
- A **prerelease enter/exit** — a couple of `changeset pre` commands (Step 7).
- **Maintenance-branch-only edits** — fixing something on an existing release branch, not moving any label.

Ask if it's ambiguous. For a **major bump**, also ask before touching files whether to isolate the work on its own local branch — it touches enough files (Steps 2–6) that a dedicated branch is worth it, but don't assume a branch-name prefix. This repo uses prefixed branches (e.g. `chore/`, `feat/`, `fix/`) without a rigid rule for which fits version-plumbing work, so propose a name and let the user confirm or correct it rather than guessing silently. Create it locally (`git checkout -b <name>`); nothing gets pushed until asked.

This local branch is *not* the same thing as cutting the new maintenance branch itself (e.g. `v3`) (see "Branch-cut order" near the end) — that's a permanent, pushed release branch, not a scratch branch for staging edits.

## Step 1: Run the sync checker first

Before editing anything, see what's already out of sync:

```bash
node skills/internal/tonic-ui-version/scripts/check-version-sync.mjs
```

It resolves the expected label from `tonic-ui-version.config.js`, then requires all four duplicated-literal files plus `README.md` and its expected `(current)` marker, comparing each label against it. Run it again at the end — it's the verification step, and it exits non-zero on mismatch or a missing required file/marker so it works in a pre-commit hook.

It prints how it resolved the label, which is worth a glance before trusting the result:

- **exact branch match** — HEAD is a branch listed in the registry. In this checkout `ci-branch.yml` only runs on `main` and resolves its deploy label from `versions.find((x) => x.current) || versions[0]`, so this path is mainly a local-check convenience rather than the CI lookup.
- **descends from `<branch>`** — HEAD is a feature branch; it found the release line HEAD branched off. A branch off `v2` resolves to `v2` when that is the only matching release line; if older release branches are also ancestors, the checker reports ambiguity and requires `--label=<vN>`.
- **fallback: entry tracking main** — no ancestry match (shallow clone, missing remotes, detached HEAD). Treat the result with suspicion here; pass `--label` when the line is known.

If it guesses wrong or reports ambiguity, name the line explicitly:

```bash
node skills/internal/tonic-ui-version/scripts/check-version-sync.mjs --label=v3
```

## Step 2: The version registry — edit this first

`tonic-ui-version.config.js` (repo root) is the single source of truth, e.g.:

```js
module.exports = {
  versions: [
    {
      branch: 'main',
      label: 'v3',
      prerelease: true,
    },
    {
      branch: 'v2',
      label: 'v2',
    },
    {
      branch: 'v1',
      label: 'v1',
    },
  ],
};
```

Cutting v4 means: main's entry becomes `{ prerelease: true, branch: 'main', label: 'v4' }`, and the outgoing version gets a stable entry `{ branch: 'v3', label: 'v3' }` pointing at its new maintenance branch.

This registry has no `current` flag: `ci-branch.yml` looks for one and otherwise falls back to `versions[0]`, so keep main's entry first.

**The schema can differ on older maintenance branches.** This checkout's main entry uses `prerelease: true` and a concrete label; read the file before editing rather than pattern-matching from memory. When writing tooling against it, identify "the entry that tracks main" by `branch === 'main'` — that holds across schema variants, whereas the flags don't.

Editing this one file automatically updates:

| Derived thing | How |
|---|---|
| Docs version selector | `packages/react-docs/components/Header.js` reads `TONIC_UI_VERSION_LABELS` |
| `TONIC_UI_V*_{BRANCH,CHANGELOG,DOCUMENTATION,LABEL,SOURCE_URL}` env vars | `packages/react-docs/tonic-ui.env` loops over the config |
| Versions page table (incl. the `Prerelease` tag from `prerelease: true`) | `packages/react-docs/scripts/update-tonic-ui-vars.mjs` expands `__RELEASED_VERSIONS__` |
| Docs deploy path `/tonic-ui-docs/<label>` | `.github/workflows/ci-branch.yml` uses the `current` entry, falling back to the first registry entry |

Don't hand-edit any of those.

## Step 3: The duplicated version label — four files, one string

The MCP docs-package label has no single source. All four files are required and must exist and match, and only the first is load-bearing:

1. `tonic-ui-mcp.config.js` → `version: 'v3'` — the real config the MCP server loads
2. `packages/react-docs/pages/llms.txt` → line 1 heading, `# @tonic-ui/react v3`
3. `packages/react-docs/pages/getting-started/mcp/index.page.mdx` → the sample-config code block (documented as a verbatim copy of file 1)
4. `packages/mcp/README.md` → the same sample-config code block again

Files 3 and 4 are prose copies, so nothing breaks when they go stale — which is exactly why they get missed. The checker in Step 1 requires all four and fails if any is missing.

`version` is a free-form label, not a semver string; the MCP server just concatenates it into the package selector `@tonic-ui/react@v3` that the `use-docs` / `fetch-pages` tools match against (`packages/mcp/src/server.ts`).

## Step 4: README.md

Two spots, both hand-maintained:

- The **Documentation version table** — add a row for the new version and move the required `(current)` marker, since it tracks which label main currently builds. `README.md` and the marker are required; the checker fails when either is missing.
- The **Contributing link**, which hardcodes `/v3/contributing`.

## Step 5: Deprecating a component or API (major bump only)

A major bump is the natural point to fold in deprecations, since consumers already expect breaking changes. Don't do this research from scratch each time — the real mechanisms already exist in the codebase:

- **Code-level**: a `@deprecated` JSDoc tag naming the replacement; for whole components (not just a prop), the existing pattern moves the old implementation under a `deprecated/` subfolder and keeps exporting it. For a runtime warning, use the shared `warnDeprecatedProps` / `warnRemovedProps` helpers (`packages/utils/src/shared.js`) rather than a bespoke `console.error` — they already no-op in production and pair with `useOnce`/`useOnceWhen` so the warning fires once per mount, not once per render.
- **Docs-level**: a whole-page deprecation is a short stub page pointing at the replacement; a prop-level deprecation is a bolded note inline in that component's existing props table.
- **Migration guide**: give it a subsection under `## Component upgrades` in the Step 6 migration doc — see the existing precedent there for the shape (before/after code, one subsection per deprecated API), plus a line in the final checklist.
- **Changeset bump type**: check recent `.changeset/*.md` files for this repo's current convention before assuming — bump types have not always mapped onto strict semver — and this repo is in changesets prerelease mode besides, so any of these roll into the current alpha line regardless.

## Step 6: Migration docs (new major only)

A major bump needs a migration guide, and adding the page is only half of it — a page that isn't registered in both indexes is invisible to humans *and* to the MCP server:

1. Create `packages/react-docs/pages/migrations/migrating-from-v2-to-v3/index.page.mdx` — following that pattern with whatever labels this bump actually uses, not necessarily `v2`/`v3` literally (that exact page already exists; it's the naming shape that matters). Breaking design-token changes have historically warranted a second dedicated page — check for existing `migrating-color-tokens-from-*` precedent when tokens move.
2. Register in `packages/react-docs/config/sidebar-routes.js` under Migrations (the existing entries carry a `NEW` tag via `render`).
3. Register in `llms.txt` under `## Migrations`.

Then confirm nothing was missed:

```bash
node skills/internal/tonic-ui-version/scripts/audit-llms.mjs
```

This cross-checks `llms.txt` against the pages on disk in both directions. Broken links matter more than they look: renaming or removing a page without updating its `llms.txt` entry leaves a link that silently costs the MCP server a page, with nothing in the build to catch it.

The audit reports three things, and two of them are usually fine:
- **Pages missing from llms.txt** — real gaps to fix, *except* stub redirect pages like `components/svg-icon`, which exists only to point at `icons/svg-icon`. Nothing to index.
- **Broken links** — always real. Fix these.
- **Duplicate links** — normally intentional cross-listings (`components/color-mode` appears once under Getting started and once as its section's Overview). Leave them.

It counts `index.page.mdx.template` as a real route, because several pages are generated at build time and won't exist on a clean checkout.

## Step 7: Prerelease mode — driven by changesets, not by hand

`.changeset/pre.json` records prerelease state (`mode`, `tag: "alpha"`, plus per-package `initialVersions`). Let the CLI own it:

```bash
# This checkout is already `mode: "pre"` with `tag: "alpha"`.
yarn changeset pre enter alpha  # only when starting a new prerelease line
yarn changeset pre exit         # graduate the current prerelease line to stable
```

Hand-editing `pre.json` desynchronizes `initialVersions` from the actual `package.json` files, and changesets then computes the next version from a baseline that never existed.

## What you must never hand-edit

These are all generated, and manual edits get clobbered:

- `packages/*/package.json` version fields and `packages/*/CHANGELOG.md` — owned by `yarn changeset version`, run by `.github/workflows/ci-release.yml` (changesets/action), which opens the `chore(release): version packages` PR
- `packages/react-docs/pages/getting-started/versions/index.page.mdx` — generated from the adjacent `.mdx.template` (the generated file is gitignored; edit the template)
- `packages/react-docs/pages/styled-system/style-props/` and `pseudo-style-props/` — same template pattern
- `.github/workflows/*` branch triggers — inspect the active triggers before assuming a new release branch is matched; `ci-pr-preview.yml` documents the intended `v[1-9]` globs but they are commented out in this checkout

## Verify before committing

```bash
node skills/internal/tonic-ui-version/scripts/check-version-sync.mjs   # labels agree
node skills/internal/tonic-ui-version/scripts/audit-llms.mjs           # docs index intact
node -e "require('./tonic-ui-mcp.config.js')"                         # config still parses
```

Report honestly which of these you actually ran. A version bump touches release plumbing, so a silent mistake surfaces as a bad published artifact rather than a failing test.

## Branch-cut order

When main graduates from prerelease to stable and starts the next major, sequence matters — the maintenance branch must be cut *before* main's labels move, or the new branch inherits the wrong label:

1. Cut the maintenance branch (e.g. `v3`) from main.
2. On that branch, verify `tonic-ui-version.config.js` still resolves its own label (`check-version-sync.mjs` on the branch confirms this).
3. On main, bump the registry to the next label (`v4`), then work through Steps 3–6 (this is also when Step 0's local working branch gets created, if it wasn't already).

A pitfall worth stating plainly, because it's easy to do by reflex and hard to notice: **don't carry a main-only label bump onto a maintenance branch.** Bumping the label meant for main onto an older maintenance branch makes the MCP server serve that branch's older content under the newer label. If a bump was authored on the wrong branch, move it rather than merging it — the llms.txt *content* fixes usually belong on both branches, but the label bump belongs only on the one whose docs it actually describes.
