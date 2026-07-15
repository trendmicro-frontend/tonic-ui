# Plan: Introduce `tonic-ui-version.config.js` (mirror tonic-one)

Goal: give tonic-ui a single version registry like tonic-one's
`tonic-one-version.config.js`, so adding/removing a doc version touches one file
instead of four (env file, `Header.js`, versions template, CI YAML). This plan is
**adapted to tonic-ui's existing pipeline** and must NOT change current deploy
behavior (same gh-pages paths, same default version) until each piece is migrated.

> Git note: this repo rewrites `git` via an `rtk` hook. Prefix any raw git with
> `rtk proxy git ...` when running commands.

---

## Context / what differs from tonic-one (read first)

tonic-one's model: two branches `v3` / `main`, label-as-slug, `prerelease` badge,
`ci-branch.yml` looks up the config by `github.ref_name`. Env vars per version are
just `_BRANCH / _CHANGELOG / _DOCUMENTATION / _LABEL / _SOURCE_URL`.

tonic-ui's model is **different and richer** — the config must absorb these or we
break the pipeline:

| Aspect | tonic-one | tonic-ui (current) |
|---|---|---|
| Versions | `v3`, `main`(label v4) | `v0`, `v1`, `v2` |
| Branch CI trigger | matches `github.ref_name` to config | **hardcoded `v2`** in `ci-branch.yml` |
| gh-pages path | `react-docs/<label>/` | `react/<version>/` (note `react/`, not `react-docs/`) |
| Default docs version | `dev` | `v2-dev` |
| Per-version env vars | 5 simple URLs | adds `_TAGNAME`, `_RELEASE_VERSION`, `_RELEASE_DOCUMENTATION`, `_RELEASE_NOTES`, `_SOURCE_CODE` |
| Release tag lookup | none | `git tag --list` per version, **v0 uses a different npm scope** (`@trendmicro/react-styled-ui@0.*`) vs `@tonic-ui/react@N.*` |
| There is NO `v3`/`main` split | n/a | the prompt's "v3/main" context is tonic-one's, not tonic-ui's — do not invent a tonic-ui `main` doc version |

Implication: tonic-ui's config needs a `tagPrefix` (or `npmPackage`) field per
version that tonic-one does not have, and the env-generation loop must preserve the
release-tag/awk logic. This is the single biggest adaptation risk.

---

## (a) The config file to create — `tonic-ui-version.config.js`

Location: repo root `/home/cheton/Code/trendmicro-frontend/tonic-ui/tonic-ui-version.config.js`
(mirrors tonic-one's root placement; `packages/react-docs/` reaches it via `../../`).

Shape (CommonJS `module.exports`, matching tonic-one so the same `node -p` /
`require()` patterns work). Ordered newest-first to match the existing env file:

```js
module.exports = {
  versions: [
    {
      branch: 'v2',
      label: 'v2',
      tagPrefix: '@tonic-ui/react@2.',   // git tag --list glob prefix (append '*')
      current: true,                      // drives ci-branch trigger + default highlight
    },
    {
      branch: 'v1',
      label: 'v1',
      tagPrefix: '@tonic-ui/react@1.',
    },
    {
      branch: 'v0',
      label: 'v0',
      tagPrefix: '@trendmicro/react-styled-ui@0.',  // v0 predates the @tonic-ui scope
    },
  ],
};
```

Field semantics:
- `branch` — git branch the version lives on (`v0`/`v1`/`v2`).
- `label` — URL slug + env-var prefix segment (`TONIC_UI_<LABEL.upper>_*`). For
  tonic-ui label == branch today; keep them separate (like tonic-one) so a future
  `dev`/`next` slug on a branch is possible.
- `tagPrefix` — glob root for `git tag --list '<tagPrefix>*'`. Captures the v0
  scope difference. This is the tonic-ui-specific field with no tonic-one analog.
- `current` — the version `ci-branch.yml` builds/deploys and that `Header.js`
  marks with the checkmark. Replaces tonic-one's "match `github.ref_name`" because
  tonic-ui's branch trigger is a single hardcoded `v2`.

Do NOT add: `prerelease` (no tonic-ui preview docs today — omit until needed),
`basePath`/`docURL`/`changelog` (derived at runtime, same as tonic-one).

Effort: **S** (one file).

---

## (b) `.github/workflows` changes

tonic-ui workflows present: `ci-branch.yml`, `ci-pr.yml`, `ci-tag.yml`,
`ci-release.yml`, `ci-publish.yml`, plus `algolia-search-indexing.yml`,
`codeql-analysis.yml`, `update-yarn-lock-file.yml`.

Only **`ci-branch.yml`** should read the config. Mirror exactly what tonic-one does
(config drives the version label) but keep tonic-ui's `react/` deploy path and the
hardcoded-trigger reality.

### `ci-branch.yml` — the only file to touch (step `step_setup_env`)
Current:
```bash
TONIC_UI_REACT_VERSION=v2
```
Replace with a config lookup of the `current: true` entry (so the label lives in
one place; the `on.push.branches: [v2]` trigger stays as-is for now):
```bash
TONIC_UI_REACT_VERSION=$(node -p "
  const c = require('./tonic-ui-version.config.js');
  const v = c.versions.find(x => x.current) || c.versions[0];
  v.label;
")
if [ -z "$TONIC_UI_REACT_VERSION" ]; then echo 'no current version in config'; exit 1; fi
echo "TONIC_UI_REACT_DOCS_BASE_PATH=/tonic-ui/react/${TONIC_UI_REACT_VERSION}" >> $GITHUB_ENV
echo "TONIC_UI_REACT_DOCS_VERSION=${TONIC_UI_REACT_VERSION}" >> $GITHUB_ENV
echo "TONIC_UI_REACT_DOCS_VERSION=${TONIC_UI_REACT_VERSION}" >> $GITHUB_OUTPUT
```
Net behavior: identical output (`v2`, base path `/tonic-ui/react/v2`). This is a
pure refactor — verify by diffing the resulting env (should be byte-identical).

Optional (do NOT do in the first cut): make `on.push.branches` config-driven. GitHub
Actions cannot evaluate JS in the `on:` trigger, so this would require a generator
script or static list. Leave `branches: [v2]` hardcoded; the prompt explicitly says
do not break the current pipeline.

### Do NOT touch
- `ci-pr.yml` — version is `pr-<number>`, not a registered version. Same as
  tonic-one's ci-pr (config-independent). Leave alone.
- `ci-tag.yml` — version comes from `packages/react/package.json` semver on a
  `@tonic-ui/react@*` tag push. Config-independent (tonic-one's ci-tag is too).
  Leave alone. (The `tagPrefix` field is for the env file, not this workflow.)
- `ci-release.yml`, `ci-publish.yml` — npm/changeset only, no docs version. Leave.

Effort: **S** (one step in one file, behavior-preserving).

---

## (c) `react-docs` changes (env wiring / next.config / version switcher)

Four layers, same pipeline order as tonic-one. The trick is the env loop must keep
tonic-ui's release-tag logic, which tonic-one's loop does not have.

### 1. `packages/react-docs/tonic-ui.env` — replace hardcoded V0/V1/V2 blocks with a config-driven loop
Keep the top stanza (`TONIC_UI_REACT_DOCS_URL`, `TONIC_UI_REACT_DOCS_VERSION:-v2-dev`,
`TONIC_UI_REACT_PACKAGE_VERSION`, `TONIC_UI_REPO_ROOT`) verbatim. Replace the three
hand-written `# v2 / # v1 / # v0` sections with:
```bash
CONFIG_PATH=../../tonic-ui-version.config.js

export TONIC_UI_VERSION_LABELS=$(node -p "require('${CONFIG_PATH}').versions.map(v => v.label).join(' ')")

while IFS='|' read -r label branch tagPrefix; do
  PREFIX="TONIC_UI_$(echo "$label" | tr '[:lower:]' '[:upper:]')"
  TAGNAME=$(git -c 'versionsort.suffix=-' tag --list "${tagPrefix}*" --sort="-version:refname" | head -n 1)
  RELEASE_VERSION=$(echo "$TAGNAME" | awk -F@ '{ print $NF }')
  export "${PREFIX}_BRANCH=${branch}"
  export "${PREFIX}_DOCUMENTATION=${TONIC_UI_REACT_DOCS_URL}/react/${label}"
  export "${PREFIX}_SOURCE_CODE=${TONIC_UI_REPO_ROOT}/tree/${branch}"
  export "${PREFIX}_TAGNAME=${TAGNAME}"
  export "${PREFIX}_RELEASE_VERSION=${RELEASE_VERSION}"
  export "${PREFIX}_RELEASE_DOCUMENTATION=${TONIC_UI_REACT_DOCS_URL}/react/${RELEASE_VERSION}"
  export "${PREFIX}_RELEASE_NOTES=${TONIC_UI_REPO_ROOT}/releases/tag/${TAGNAME}"
done < <(node -p "require('${CONFIG_PATH}').versions.map(v => [v.label, v.branch, v.tagPrefix].join('|')).join('\n')")
```
Note the v0 awk: original uses `$3` for `@trendmicro/react-styled-ui@0.x` and `$3`
for `@tonic-ui/react@2.x` — both have the version in the last `@`-field, so `$NF`
generalizes correctly across both scopes. Verify by sourcing the file and diffing
all `TONIC_UI_*` vars against the current file's output (must match exactly).

### 2. `packages/react-docs/next.config.mjs` — import config, bake per-version env
tonic-ui's `next.config.mjs` is currently a pure env passthrough (no config import).
Add the tonic-one pattern: `await import('../../tonic-ui-version.config.js')`, then
a `buildVersionEnvVars()` that, for each `label`, copies the 7 `TONIC_UI_<LABEL>_*`
vars from `process.env` into the Next `env` block, plus `TONIC_UI_VERSION_LABELS`.
This lets `Header.js` and the template stop depending on hardcoded names. Keep the
existing `dotenv-flow` call and `basePath: process.env.TONIC_UI_REACT_DOCS_BASE_PATH`.

### 3. `packages/react-docs/components/Header.js` — derive `versionMap` from labels
Replace the hardcoded `{ v2, v1, v0 }` object with reconstruction from
`TONIC_UI_VERSION_LABELS`, mirroring tonic-one's `Object.fromEntries(... split(/\s+/) ...)`:
```js
const versionMap = Object.fromEntries(
  ensureString(process.env.TONIC_UI_VERSION_LABELS).split(/\s+/).filter(Boolean).map(label => [
    label,
    { label, url: ensureString(process.env[`TONIC_UI_${label.toUpperCase()}_DOCUMENTATION`]) },
  ])
);
```
`TONIC_UI_REACT_DOCS_VERSION` still drives the checkmark. Because `process.env[...]`
with a dynamic key is NOT inlined by Next's build, this only works if (2) baked each
`_DOCUMENTATION` var explicitly — that is why step 2 must enumerate them.

### 4. versions template + `scripts/update-tonic-ui-vars.mjs`
The template `pages/getting-started/versions/index.page.mdx.template` uses
`__TONIC_UI_V0_*__ / V1 / V2` tokens and `update-tonic-ui-vars.mjs` substitutes any
`__TONIC_UI_*__` token from env. Since the loop in (1) still exports the same
`TONIC_UI_V0_* / V1_* / V2_*` names, **the template and script need no change** for
the current three versions — they keep working. Only when a 4th version is added
would the template need a new row (tonic-one's `__RELEASED_VERSIONS__` table-gen is
a nicer pattern but is out of scope here; note it as a follow-up, do not port now).

Effort: **M** — env loop is the fiddly part (release-tag/awk parity + the `$NF`
generalization + `process.env` dynamic-key/Next-inlining gotcha in 2↔3).

---

## (d) What NOT to port from tonic-one

- `prerelease` field / `<sup>Preview</sup>` badge — tonic-ui has no preview docs.
- `_CHANGELOG` env var — tonic-ui uses `_RELEASE_NOTES` (GitHub release tag) instead
  of a per-branch `CHANGELOG.md` link. Keep tonic-ui's convention.
- `_LABEL` / `_SOURCE_URL` exact names — tonic-ui uses `_SOURCE_CODE`; keep the
  tonic-ui names so the existing template tokens keep resolving.
- `__RELEASED_VERSIONS__` auto-generated table in the versions page — tonic-ui's
  template is row-per-version static; leave it (follow-up only).
- Matching `github.ref_name` in `ci-branch.yml` — tonic-ui's trigger is a single
  hardcoded branch; use `current: true` instead.
- A `main`/`v4`-style preview version — that is tonic-one's branch model; tonic-ui
  has no such doc version. Do not invent one.

---

## Risks

1. **Release-tag awk parity (HIGH).** v0 (`@trendmicro/react-styled-ui@0.x`) and
   v2 (`@tonic-ui/react@2.x`) have different `@`-field counts. The original uses
   `$3` for both; the plan generalizes to `$NF`. Must verify `$NF` yields identical
   `RELEASE_VERSION` for all three before trusting it — otherwise keep per-version
   awk indices in the config (`versionField`).
2. **Next.js dynamic `process.env[key]` not inlined (HIGH).** Header.js step (3)
   reads env by computed key; Next only inlines statically-referenced
   `process.env.FOO`. The `buildVersionEnvVars()` in (2) must explicitly assign each
   name into the `env` block, or the switcher URLs come out empty in the browser
   bundle. Test the built (`next build`) output, not just `next dev`.
3. **CI branch trigger stays hardcoded (MEDIUM).** `on.push.branches: [v2]` cannot
   read the config. The config's `current` and the YAML trigger can drift. Mitigate
   with a comment in both pointing at each other; full sync is a follow-up.
4. **Wrong working tree / branch (MEDIUM).** All edits target the *tonic-ui* repo
   (`/home/cheton/Code/trendmicro-frontend/tonic-ui`), currently on
   `feat/semantic-token-css-variables` — NOT this tonic-one repo. Branch tonic-ui
   first (`rtk proxy git switch -c feat/version-config`). Do not mix the two repos.
5. **gh-pages path is `react/` not `react-docs/` (LOW).** tonic-one deploys to
   `react-docs/<label>/`; tonic-ui to `react/<version>/`. Keep tonic-ui's path —
   changing it would 404 every existing published doc URL.
6. **`fetch-depth: 0` required for tag lookup (LOW).** The env loop's `git tag`
   needs full history; `ci-branch.yml` already sets `fetch-depth: 0`. Local `yarn
   build` works only in a full clone (already the case).

## Verification per part
- (a) `node -p "require('./tonic-ui-version.config.js').versions.length"` == 3.
- (b) Dump `$GITHUB_ENV` lines in a dry run; diff vs current — expect identical.
- (c) `source tonic-ui.env` then `env | grep TONIC_UI_ | sort` before/after — diff
  must be empty (same names/values for v0/v1/v2). Then `next build` and confirm the
  Header version switcher URLs are non-empty in the bundle.
- (d) grep the diff for `prerelease`, `_CHANGELOG`, `_SOURCE_URL`, `__RELEASED_VERSIONS__`
  — expect zero hits.
