# Future Packages Roadmap: Standalone Artifacts and the Shared CDN Runtime

**Date:** 2026-10-15
**Status:** 📋 FUTURE PLAN for the listed add-on packages (not yet implemented). The core precedent — `@tonic-ui/react`'s standalone artifact — is implemented in `packages/react` (see §6).
**Packages covered:** `@tonic-ui/react-data-grid`, `@tonic-ui/charts`, `@tonic-ui/react-charts`
**Related:** the CDN-first shared runtime demos in `examples/cdn-without-fallback` and `examples/cdn-with-fallback`, with their shared bootstrap in `examples/cdn-shared` (the reference apps this design serves)

---

## 1. Context: why standalone artifacts exist

The shared runtime reference apps load Tonic from a CDN at browser runtime using an import map:

- `react` / `react-dom` / `react/jsx-runtime` → esm.sh builds
- `@tonic-ui/react` → a **single self-contained ESM file** served raw from `raw.esm.sh` (npm tarball path: `application/javascript` MIME, CORS `*`, immutable 1-year cache)
- `@emotion/*` → the entries the demos' build scripts generate: the standalone file's **bare specifiers** (read from the built file) or the esm.sh build's URL graph (walked from the live CDN wrapper), each mapped at its `?standalone` single-file build

A single-file artifact is needed because esm.sh does **not** inline the Emotion family (it is a peer dependency — the README states `?standalone` excludes `peerDependencies`), so a plain esm.sh build of the multi-file `dist/esm` leaves ~30 small waterfall requests behind. Our own prebuilt file has no emotion subgraph to waterfall.

**Placement rule (decided):** the artifact is a build target **inside its own package** — `dist/standalone/index.js` — not a new `*-standalone` package. `files: ["dist"]` ships it automatically, the raw URL keeps the package's own version (no version skew between the file and the API it exposes), and `main`/`module`/`exports` stay untouched (regular bundler consumers keep the multi-file `dist/esm` with peers external).

**Naming evidence (2026-10-16):** See the [standalone ESM artifact naming ADR](../adr/2026-10-16-standalone-esm-artifact-naming.md). It recommends `dist/standalone/index.mjs` for new public paths, with React and Emotion explicitly documented as external. The `.js` paths in this roadmap describe the current implementation; no rename is implemented, and any migration must first establish the existing CDN path's compatibility obligations.

**Emotion single-instance invariant (decided):** `@emotion/react` and `@emotion/styled` are peer dependencies of **every** Tonic package (confirmed for `@tonic-ui/react`: `^11.0.0` for both) and therefore stay **external in every standalone file**. The import map provides exactly one shared Emotion instance for the whole document. The only module that must never exist twice per document is Emotion (its style cache); theme values flow through `:root` CSS variables, which are global, so no other module in the family carries instance-splitting risk.

## 2. The one rule for every Tonic package

> A package's `dist/standalone/index.js` = its normal source, bundled to one minified ESM file.
> **External:** the React family (`react`, `react-dom`, `react/*`), the Emotion family (`@emotion/*`), **and `@tonic-ui/react` if — and only if — the package's source imports it**. Everything else is inlined.
> **Build assertion (CI):** the emitted file's bare import specifiers ⊆ the external set; otherwise fail the build. This catches any future dependency drift the moment a package is added or its dependency list changes.

Rationale for the external set:

- **React family** — peer; the consumer's import map provides one instance (mandatory for hooks/state identity).
- **Emotion family** — peer everywhere; the import map provides one shared instance (see invariant above). Keeping it external in *add-on* packages is what prevents a second style cache when a consumer loads both `@tonic-ui/react` and an add-on.
- **`@tonic-ui/react` (conditional)** — context identity. If an add-on consumes the core's `TonicProvider` theme/color-mode contexts, it must import the *same* context objects the provider uses, so the core stays external and resolves through the import map to the one shared core file. If an add-on does not import the core (self-contained components), do **not** externalize it (there is nothing to share, and an unneeded external would break consumers who do not map the core).

Sibling utility packages (`@tonic-ui/react-hooks`, `@tonic-ui/react-icons`, `@tonic-ui/utils`, …) that a package imports as regular dependencies are **inlined, not externalized**:

- Rollup tree-shakes them to the per-file subset actually used (measured: the full icon library is a 4.2 MB dist, but only a handful of icons survive into a given file — a few kB, not the library).
- Both copies (one per file) register into the *same* shared Emotion cache, so class dedup still works and no style cache splits.
- The import map stays stable: consumers map the family's package names, never the utility internals.

## 3. Per-package notes

### 3.1 `@tonic-ui/react-data-grid`

Reference dependency profile (from `@tonic-one/react-data-grid` v4):

| Dependency | Standalone treatment |
|---|---|
| `@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | inlined (regular deps; `react` stays external) |
| `@tanstack/react-table`, `@tanstack/react-virtual` | inlined |
| `@tonic-ui/react-hooks`, `@tonic-ui/react-icons`, `@tonic-ui/utils` | inlined (per §2) |
| `ensure-type`, `micro-memoize` | inlined |
| `react` / `react-dom` | external (peer) |
| `@emotion/*` | external (peer) |
| `@tonic-ui/react` | external **iff** the source imports it — the v4 reference profile does not list it (self-contained grid); confirm against the actual v3 source at implementation time |

Verification requirements beyond the standard suite:

1. Build assertion (§2) passes.
2. **CJS interop:** dnd-kit and tanstack packages ship CJS/ESM mixes; the rollup commonjs config of the standalone target must be validated, not assumed.
3. **Browser E2E:** a throwaway page (same pattern as the `raw.esm.sh` feasibility probe) loading the grid file + import-mapped React/Emotion: render rows, exercise row drag-sort (dnd-kit) and virtual scrolling (tanstack), confirm theme follows the provider's `data-color-scheme`.

### 3.2 `@tonic-ui/charts` / `@tonic-ui/react-charts`

Two names are in play; the split (a framework-agnostic charting core `@tonic-ui/charts` plus a React wrapper `@tonic-ui/react-charts`, versus a single React package) is **undecided** — settle it when the package lands. The standalone treatment is identical either way:

| Dependency class | Standalone treatment |
|---|---|
| Chart rendering engine (e.g. canvas/svg library) | inlined |
| `@tonic-ui/*` siblings it imports | inlined (per §2) |
| `react` (wrapper only) | external (peer) |
| `@emotion/*` (only if the source uses Emotion) | external (peer) |
| `@tonic-ui/react` | external iff imported (provider theming) |

Charts are the most likely package to **not** use Emotion at all (canvas/SVG rendering); in that case the Emotion external set is simply empty for it, and the file needs only the React map entry.

## 4. CDN / import-map consequences (consumer side)

Per family package the shared runtime demos add **one** import map entry:

```jsonc
{
  "imports": {
    "react": "https://esm.sh/react@…",            // family, esm.sh
    "react-dom": "…", "react-dom/client": "…",
    "react/jsx-runtime": "…", "react/jsx-dev-runtime": "…",
    "@emotion/react": "…?standalone",             // the 4 entries the demos'
    "@emotion/react/jsx-runtime": "…?standalone", // build scripts generate,
    "@emotion/styled/base": "…?standalone",       // one per Emotion specifier
    "@emotion/is-prop-valid": "…?standalone",     // the Tonic file imports
    "@tonic-ui/react": "https://raw.esm.sh/@tonic-ui/react@<ver>/dist/standalone/index.js",
    "@tonic-ui/react-data-grid": "https://raw.esm.sh/@tonic-ui/react-data-grid@<ver>/dist/standalone/index.js"
  }
}
```

Scaling: **N family packages → 1 (core) + N (add-ons) + 7 Emotion files** (immutable, cached for a year — paid once). One core instance, one Emotion instance, N self-contained files. The existing fallback machinery (CDN probe failure → `__local` reload → same-origin bundles) covers every package identically: a 404/timeout on any raw URL degrades that package's family to local, nothing else.

## 5. Open items (resolve at implementation time, not before)

- [ ] Confirm whether `@tonic-ui/react-data-grid` (v3 line) imports `@tonic-ui/react` — decides that package's external set.
- [ ] Settle the `@tonic-ui/charts` vs `@tonic-ui/react-charts` package split.
- [ ] dnd-kit / tanstack CJS interop in the standalone rollup target (build + browser E2E).
- [x] Explicit `es2022` transpile step — resolved: the `build:standalone` minify pass runs esbuild with `--target=es2022`, so the shipped file is transpiled regardless of the repo's babel output.

## 6. Precedent

The core precedent for this pattern (feasibility-probe results, 2026-10-15):

- `packages/react` ships `dist/standalone/index.js`: the full library in one minified ESM file (512 kB raw / 141 kB gzip, versus 560 kB for the esm.sh build), importing only the React and Emotion families, which the consumer's import map provides as one shared instance each.
- Browser E2E: the file + import-mapped React/Emotion rendered Tonic components identically to the esm.sh path (single shared Emotion cache, `data-color-scheme` set before mount — the one behavioral precondition the demos' bootstraps already satisfy). The demos' build scripts switch to the artifact automatically once the installed package ships it (bare-specifier import map entries, `raw.esm.sh` CDN URL).
