# Handoff: Five-Configuration CDN Comparison Page

**Date:** 2026-11-01
**Page:** `packages/react-docs/pages/integrations/cdn-with-fallback/index.page.mdx`
**Status:** Implementation partially complete and consistent. One configuration cannot be
measured until a release is published. Resume after `@tonic-ui/react@3.0.0-alpha.2` is on npm.

---

## 1. Goal

Compare how Tonic UI JavaScript reaches the browser, in a form a developer can act on:

- Two build strategies: **bundle built by the CDN** vs **bundle built by Tonic UI**.
- Five delivery configurations: esm.sh Default ESM, esm.sh Standalone bundle, jsDelivr `+esm`,
  jsDelivr Standalone artifact, Self-hosted Standalone artifact.
- Each configuration measured in real Chromium: request count, transferred bytes, decoded
  JavaScript, timeline, largest modules.

The reader should decide which configuration to use before reading implementation detail.

---

## 2. What is already done

| Area | State |
| :--- | :--- |
| Measurement script | Rewritten for the five canonical configurations plus failure variants. Version is read from `packages/react/package.json`, falling back to the npm `latest` tag. |
| Availability probe | Before running, the script probes each raw-file entry URL and records `status: "unavailable"` with the HTTP code when the file is not published. |
| Data file | `packages/react-docs/pages/integrations/cdn-with-fallback/cdn-benchmark-data.json` regenerated 2026-11-01 with `provider`, `build`, and `status` fields. |
| Comparison components | `StrategyOverview` (strategy cards + provider-grouped rows), `PerformanceOverview` (five cards), `NetworkCost` (shared scale, dashed "not measured" row), `BundleComposition` (five rows), `RequestTimeline`, `LargestModules` (selector over measured configurations only). |
| Provider colour | `providerColors(theme)` in `network-comparison/shared.js`: esm.sh, jsDelivr, Self-hosted. |
| Verification so far | Page rendered in Chromium at 1280 px and 420 px; ESLint clean on `network-comparison/`; screenshots reviewed for layout. |

Files touched:

```
packages/react-docs/scripts/measure-cdn-strategies.mjs
packages/react-docs/pages/integrations/cdn-with-fallback/cdn-benchmark-data.json
packages/react-docs/pages/integrations/cdn-with-fallback/network-comparison/{data,shared,index,StrategyOverview,PerformanceOverview,NetworkCost,BundleComposition,RequestTimeline,LargestModules}.js
```

`index.page.mdx` was **not** rewritten. Its prose still describes "three loading strategies".
That mismatch is the first thing to fix on resume.

---

## 3. Measured facts (2026-11-01, Chromium, cold cache, 3 runs, median)

Package: `@tonic-ui/react@3.0.0-alpha.1`. React/React DOM pinned to 19.2.7.
Success test: a button in the DOM, computed padding of `Box p="4x"` is `16px`, `useColorMode` returns a value.

| Configuration | Runs | Requests | Transferred | Decoded | Largest file | Span |
| :--- | :--- | ---: | ---: | ---: | ---: | ---: |
| esm.sh · Default ESM | fails (`x is not a function`) | 420 | 484.9 KiB | 1,148.2 KiB | 334.2 KiB (29%) | 923 ms |
| esm.sh · Standalone bundle | ok | 46 | 300.3 KiB | 789.1 KiB | 547.6 KiB (69%) | 294 ms |
| jsDelivr · `+esm` bundle | ok | 61 | 322.1 KiB | 1,071.5 KiB | 269.7 KiB (25%) | 500 ms |
| jsDelivr · Standalone artifact | **not measurable** — HTTP 404 | — | — | — | — | — |
| Self-hosted · Standalone artifact | ok | 49 | 220.8 KiB | 746.8 KiB | 500.8 KiB (67%) | 954 ms |

Failure variants kept in the data file for the "setups that fail" table:
esm.sh Default ESM + map (412 req, 1,148.9 KiB), esm.sh `?standalone` without peer map
(50 req, 2 React instances), jsDelivr `+esm` without map (75 req, 6 React instances),
standalone artifact with no import map (1 req, specifier never resolves),
esm.sh entry + jsDelivr React (41 req, 277.5 KiB).

---

## 4. Why the jsDelivr row is empty (verified, not assumed)

- npm `@tonic-ui/react@3.0.0-alpha.1` was published **2026-09-19**. The standalone build landed
  in `main` on **2026-10-20** (`feat: add standalone CDN builds and integration examples` #1214).
- The published tarball contains `dist/cjs`, `dist/esm`, `dist/index.d.ts` only. Zero
  `standalone` paths.
- Probes: `https://cdn.jsdelivr.net/npm/@tonic-ui/react@3.0.0-alpha.1/dist/standalone/index.min.js`
  → 404. `https://raw.esm.sh/@tonic-ui/react@3.0.0-alpha.1/dist/standalone/index.min.js` → 404.
- The CDN path itself is fine: the same host serves `…/dist/esm/index.js` with HTTP 200
  (`application/javascript`, 13,351 bytes). jsDelivr and raw.esm.sh serve any file that is
  actually inside the published tarball.
- The artifact exists locally and runs: `packages/react/dist/standalone/index.min.js`
  (512,854 bytes) renders correctly in the self-hosted configuration.
- `packages/react/package.json` has `files: ["dist"]` and `prepublishOnly: yarn run build`;
  `rollup.config.mjs` adds the standalone target to every plain build
  (`export default standaloneOnly ? [standaloneTarget] : [...targets, standaloneTarget]`).
  So the next release ships the file. Release PR: **#1212** (`3.0.0-alpha.2`).

**Conclusion:** the comparison "esm.sh `?standalone` vs npm `dist/standalone/index.min.js`"
cannot be measured until a version containing the artifact is published. Publishing is not
authorized in this session; it requires an explicit decision from the maintainers.

---

## 5. Remaining work

### Phase 1 — publish, then re-measure (blocking)

1. Publish `3.0.0-alpha.2` (merge #1212 or the team's chosen release path).
2. Re-run the measurement:

   ```bash
   yarn build                                    # repository root, so dist/standalone exists
   node packages/react-docs/scripts/measure-cdn-strategies.mjs
   ```

3. Acceptance: the `jsdelivr-standalone` row reports `status: "measured"` with non-null
   requests/transferred/decoded, and `renders: true`. If it still 404s, the artifact is not
   in the tarball — check `npm view @tonic-ui/react@3.0.0-alpha.2 dist/standalone/index.min.js`
   path presence before blaming the CDN.

### Phase 2 — rewrite the prose around the five configurations

- Replace "three loading strategies" framing with: decision first, then the comparison, then
  the working code, then fallback.
- Move the copy-paste import maps next to each configuration row, not in a later section.
- Keep the failure table (it is the evidence for why the import map is not optional).
- Keep the runtime inspector demo (`{render('./usage')}`) and the fallback section.
- Acceptance: a reader can pick a configuration in the first two screens without scrolling to
  an implementation section.

### Phase 3 — responsive and dark-mode checks

- `LargestModules` uses a `minWidth: 1000px` table; at 420 px it overflows its container
  (measured right edge 1,017 px). Add a narrow variant: drop the Family column, or render a
  compact list.
- Dependency-family legend at 420 px: verify the two-column grid does not overflow.
- Verify dark mode (header colour-mode toggle) — panels use theme tokens, but the dashed
  "not measured" bar and `color-mix` chips need a visual check.

### Phase 4 — tests

- `packages/react-docs/test/e2e/integrations/cdn-with-fallback.spec.mjs` covers the demo, not
  the comparison panels. Add checks that the five rows render, that the metric tabs change the
  scale, and that the unmeasured row shows the probe status.
- Run: `yarn test:e2e docs` (from the repository root).

---

## 6. Commands used to verify the current state

```bash
# measurement (11 configurations, 3 runs each, ~2.5 minutes)
node packages/react-docs/scripts/measure-cdn-strategies.mjs

# lint the comparison components
cd packages/react-docs && npx eslint pages/integrations/cdn-with-fallback/network-comparison

# render the page
cd packages/react-docs && . ./tonic-ui.env && node scripts/dev.mjs --port 3111
# then open http://localhost:3111/integrations/cdn-with-fallback/
```

---

## 7. Decisions already made (do not re-litigate)

1. The comparison is grouped by **provider**, and each row carries its **build strategy**.
   Provider colour is consistent across every chart.
2. An unmeasured configuration is displayed as "not measured" with the probe status, never as
   a zero. A zero would read as "costs nothing".
3. Bars share one absolute scale (`max` across measured configurations), so a shorter bar is
   genuinely cheaper.
4. The timeline and largest-modules tables only offer measured configurations; an empty graph
   would render a meaningless chart.
5. esm.sh `?standalone` is **not** the npm artifact. The page must say this explicitly; the
   file is built by esm.sh, not by Tonic UI.

---

## 8. Risks

- CDN bundles are generated on demand. Numbers drift when a peer range resolves to a new
  version. Re-measure after each release; the script already tracks the version.
- jsDelivr `+esm` alias map is tied to the URLs the CDN emits. The map is regenerated by the
  script (`discoverJsDelivrAliases`); hand-written maps go stale.
- Emotion duplication: the self-hosted run still fetches `@emotion/is-prop-valid` twice (1.2.2
  from the map, 1.4.0 from the `@emotion/react` chain). Duplicate Emotion does not throw; it
  splits the style cache.
- Publishing is a maintainer decision. Nothing in this handoff authorizes a release.
