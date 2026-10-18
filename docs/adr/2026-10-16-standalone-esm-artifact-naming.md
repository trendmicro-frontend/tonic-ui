# Standalone ESM artifact naming

**Date:** 2026-10-16
**Revised:** 2026-10-18
**Status:** Ship full `index.js` and minified `index.min.js`; this supersedes the original `.mjs` recommendation.

## Context

`@tonic-ui/react` builds two standalone ESM artifacts for browser/CDN consumers
using import maps: a full `dist/standalone/index.js` and minified
`dist/standalone/index.min.js`. Rollup bundles non-peer dependencies, while React
and Emotion remain external. The package also builds separate `dist/cjs` and
`dist/esm` distributions for ordinary package consumers.

The standalone artifact is ESM, but `packages/react/package.json` does not declare
`"type": "module"`. This is valid for browser module loading; it does not make the
file's module format explicit to Node and other package tooling.

## Evidence

Primary sources reviewed on 2026-10-16:

| Source | Documented convention | Implication |
| --- | --- | --- |
| [Prettier browser distribution](https://prettier.io/docs/browser) | `standalone.mjs` for ESM; `standalone.js` for UMD | `standalone` is an established distribution label; `.mjs` distinguishes ESM. |
| [Vue browser ESM distribution](https://vuejs.org/guide/quick-start.html#using-the-es-module-build) | `vue.esm-browser.js` | Browser ESM does not require `.mjs`; descriptive `.js` names are also established practice. |
| [Vite library mode](https://vite.dev/guide/build.html#library-mode) | ESM output uses `.js` with `"type": "module"`; otherwise Vite changes it to `.mjs` for Node compatibility | Extension choice should account for package module metadata. |
| [Node module-system rules](https://nodejs.org/api/packages.html#determining-module-system) | `.mjs` explicitly identifies ESM; `.js` interpretation depends on package metadata and, in supported versions, syntax detection | `.mjs` avoids reliance on package scope or syntax detection. |

These sources demonstrate multiple valid conventions, not a universal standalone
filename standard. They support explicit format identification; they do not
mandate a particular directory, basename, or minification suffix.

## Recommendation

Use `dist/standalone/index.js` for the full ESM bundle and
`dist/standalone/index.min.js` for the minified ES2022 bundle. Emit a sibling
source map for each artifact.

- Use the minified file for CDN delivery; keep the full file available for
  debugging and environments that prefer readable output.
- Keep the standalone target ESM-only. Its consumers use browser import maps;
  a separate standalone CJS artifact has no identified requirement.
- Use `standalone`, not `all`, as the distribution label. `all` does not explain
  whether it refers to exports, dependencies, or formats.
- Keep `index` as the basename; `.min` distinguishes the optimized variant.
- `.min.js` is a common naming convention, not a universal standard. Keep `.js`
  to preserve the existing browser/CDN path; `.mjs` would identify ESM more
  explicitly to Node without package metadata.

This revises the 2026-10-16 recommendation, which omitted `.min` while only one
production artifact existed.

Neither `standalone` nor `all` guarantees that every dependency is included.
Document the core artifact as: **“Single-file ESM bundle with React and Emotion
external; consumers supply those dependencies through an import map.”** Add-on
packages must also document any other permitted externals, such as the core
`@tonic-ui/react` package described in the
[standalone roadmap](../plans/2026-10-15-future-packages-standalone-cdn-roadmap.md).

## Implemented dependency contract

The implementation keeps `dist/standalone/index.js` as the full bundle and adds
`dist/standalone/index.min.js` as its minified counterpart. Both bundle runtime
code used from all 13 direct dependencies declared by
`packages/react/package.json`. Rollup tree-shakes the artifacts; they do not copy
each dependency's full package. React, React DOM, and Emotion remain external
peer dependency families supplied by the consumer.

The exact package list, installation guidance, and build contract are recorded
in the [standalone artifact spec](../specs/2026-10-18-react-standalone-esm-artifact.md)
and [`packages/react/README.md`](../../packages/react/README.md).

## Compatibility and implementation boundary

The existing `dist/standalone/index.js` path remains, but now contains the full
bundle instead of the minified one. The CDN example switches to
`dist/standalone/index.min.js`; direct consumers of `index.js` keep a working
path but receive the larger, unminified artifact.

Do not change the package-wide `"type"` solely for this naming decision. Do not
add a standalone CJS build.

## Related build-review evidence

The following observations describe the CLI-based implementation reviewed on
2026-10-16. The minifier script was integrated into Rollup on 2026-10-18; script
failure and dependency findings below are historical.

- `yarn build:standalone` succeeded in the current workspace.
- With the minifier copied into an isolated fixture that had no esbuild
  executable, it exited with status `0` and left `process.env.NODE_ENV` unchanged.
  `spawnSync` can return a null status on launch failure; the current
  `process.exit(result.status)` does not fail that case.
- Neither the root nor React package declares esbuild directly. The inspected
  lockfile supplies it through Vite. The build should declare its tool dependency
  rather than rely on an unrelated transitive dependency.
- An isolated Rollup fixture with an unresolved dynamic import emitted a warning
  and retained `import("unmapped-package")`. The actual minifier then exited with
  status `0`: its static-import regular expressions do not validate dynamic
  imports. Dependency validation must cover these imports too.

The fixtures were removed. These observations are review evidence, not fixes or
permanent regression coverage. Resolve the build issues independently of any
filename migration.

## Related CDN-loading evidence

The browser-facing entry parameters were verified against the published
`@tonic-ui/react@3.0.0-alpha.1` in a headless browser (2026-10-16). Each was
isolated by removing one parameter from an otherwise working fixture:

| Omitted parameter | Observed result |
| --- | --- |
| `external=react,react-dom` | Two React instances; `Cannot read properties of null (reading 'useRef')`; nothing mounts. |
| `standalone` | Multi-file wrapper; transitive `react-focus-lock` throws `TypeError: x is not a function`; nothing mounts. |

With both present, the esm.sh entry mounts and applies theme styles from five map
entries (React family plus Tonic UI), with no Emotion entries needed.

For the published standalone artifact the requirements differ. The artifact
imports `@emotion/react`, `@emotion/react/jsx-runtime`, `@emotion/styled/base`, and
`@emotion/is-prop-valid`, and the manifest must map all four. Mapping only those
four bare specifiers is **not sufficient**: a `?standalone` build of
`@emotion/styled` resolves its `@emotion/react@^11.0.0-rc.0` peer to an absolute
URL, and that URL resolves to the multi-file Emotion build (a different cache
instance) rather than the single-file bundle the bare mapping targets. A/B
isolation against the published artifact: with that range URL mapped to the pinned
build, `Box p="4x"` computed `padding: 16px`; with the single key removed, the same
fixture computed `padding: 0px` and reported no browser error. The `-rc.0` string
is quoted from the peer range and is not a prerelease install; esm.sh resolves it
to 11.14.0.

An incomplete Emotion mapping therefore fails silently as unstyled output, not as
an exception. `scripts/emotion-redirects.mjs` generates the required keys by
reading the artifact and walking the CDN graph.
