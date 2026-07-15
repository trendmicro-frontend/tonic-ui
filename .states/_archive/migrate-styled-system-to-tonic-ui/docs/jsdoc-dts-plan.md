# Porting tonic-one's JSDoc → .d.ts System into tonic-ui

## Goal

Bring tonic-one's working "JS source + JSDoc → bundled `.d.ts`" type-definition system
into tonic-ui (branch `feat/semantic-token-css-variables`), where today **no component
package ships any types** (only `packages/mcp`, a TS-source package, does).

tonic-ui's source language already matches tonic-one: all component source is `.js`/`.jsx`,
no `.ts` source, no `.test-d.tsx`. So the *mechanism* ports cleanly; the *cost* is almost
entirely in JSDoc annotation coverage, which is sparse and inconsistent in tonic-ui today.

## Strategy: pipeline first, annotate later

The pipeline does not depend on annotation coverage. `tsc --allowJs --declaration` emits a
`.d.ts` for **every** `.js` file regardless of how much JSDoc it carries — unannotated
components simply emit loose/`any`-ish types. This makes a **pipeline-only first increment
viable and PR-able**: we can ship a `dist/index.d.ts` from whatever JSDoc exists today, get
real type entrypoints wired into every package, and then improve types tranche-by-tranche
without touching the build again.

Recommended sequencing:

1. **Sub-unit A — Generation pipeline (one package).** Validate end-to-end on `@tonic-ui/react-base` (smallest surface).
2. **Sub-unit B — Typedef infrastructure.** Port `global.d.ts` (`ForwardRefComponent`, `StyledFC`, `StyleProps`, `ThemeScales`).
3. **Sub-unit C — Roll pipeline + globals to all 7 component packages.** ← end of "minimal pipeline-only" deliverable.
4. **Sub-unit D — Type-test harness** (`tsconfig.test.json` + `.test-d.tsx`).
5. **Sub-unit E — Annotation tranches** (the long tail).

Sub-units A–C are independently mergeable and deliver working (if loose) types. D–E raise quality.

---

## (a) GENERATION PIPELINE — Sub-unit A  ·  Effort: **S**

Validatable by generating `.d.ts` for exactly ONE package (`@tonic-ui/react-base`).

The pipeline is a two-stage, per-package pattern copied from tonic-one:

- **Stage 1 — `tsc` emits intermediate per-file `.d.ts` into `@types/`** (reads JSDoc from `.js`).
- **Stage 2 — `rollup-plugin-dts` bundles `@types/*.d.ts` into a single `dist/index.d.ts`**, with `global.d.ts` prepended.

### Files to add / change (per package)

1. **Root `tsconfig.base.json`** (new in tonic-ui — does not exist today). Copy from tonic-one:
   ```jsonc
   {
     "compilerOptions": {
       "allowJs": true,          // read JSDoc from .js
       "checkJs": false,         // do not type-check JS, only extract declarations
       "declaration": true,
       "emitDeclarationOnly": true,
       "noEmit": false,
       "skipLibCheck": true,
       "esModuleInterop": true,
       "moduleResolution": "node",
       "jsx": "react-jsx"
     }
   }
   ```

2. **Per-package `tsconfig.json`** (e.g. `packages/react-base/tsconfig.json`):
   ```jsonc
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "rootDir": "src",
       "outDir": "@types",
       "declaration": true,
       "emitDeclarationOnly": true,
       "jsx": "react-jsx",
       "moduleResolution": "node",
       "esModuleInterop": true,
       "strict": true,
       "skipLibCheck": true,
       "typeRoots": ["../../node_modules/@types", "@types"]
     },
     "include": ["src/**/*.ts", "src/**/*.tsx"],
     "exclude": ["node_modules", "**/__tests__/*", "coverage/*", "dist/**/*"]
   }
   ```
   NOTE: tonic-one's `include` only matches `.ts`/`.tsx`, yet `allowJs` makes `tsc` pull in
   the `.js` files transitively reachable from the TS barrel. tonic-one relies on an
   `src/index.ts` barrel as the typed entrypoint (see below). **tonic-ui's `react` entry is
   `src/index.js`, not `.ts`** — this is the single largest porting gap.

3. **A typed barrel `src/index.ts`** per package. tonic-ui ships only `src/index.js` barrels
   (e.g. `packages/react/src/index.js`: 54 `export * from './dir'` lines + 4 deprecated re-exports).
   Two options:
   - **(preferred)** Add a parallel `src/index.ts` that re-exports the same modules, used only
     as the `tsc`/`dts()` input. Keep `src/index.js` as the runtime entry. This matches
     tonic-one, where rollup's JS outputs and the dts input both point at `index.ts`/`index.js`
     deliberately.
   - Or point `tsc`'s `include` directly at `src/**/*.js` and skip the barrel. Simpler, but
     emits a flatter, less-curated public surface. Start with the barrel approach to match tonic-one.

4. **`rollup.config.mjs` third output object** (append to each package's existing two outputs):
   ```js
   {
     input: path.resolve(__dirname, 'src', 'index.ts'),
     output: [{ file: 'dist/index.d.ts', format: 'es' }],
     plugins: [ dts(), injectGlobalTypes() ],
   }
   ```
   plus the `injectGlobalTypes()` helper (reads `global.d.ts`, prepends to chunk) copied verbatim.

5. **`package.json` scripts + wiring** (per package):
   ```jsonc
   "types:build": "tsc",
   "types:clear": "del @types coverage",
   "types": "dist/index.d.ts"
   ```
   and ensure `build` runs `types:build` before rollup so `@types/` is populated, e.g.
   `"build": "yarn types:build && cross-env rollup --config rollup.config.mjs"`.

6. **devDependencies**: add `rollup-plugin-dts` and `typescript` (and `del-cli` if used) to each
   package. tonic-ui's component packages currently have neither.

7. **`.gitignore`**: ignore generated `@types/` and `dist/index.d.ts`.

### Validation for Sub-unit A
```bash
cd packages/react-base
yarn types:build                              # tsc emits @types/*.d.ts
rtk proxy git status                          # confirm only @types/ + dist appear
yarn build                                    # full build incl. dts() bundle
test -f dist/index.d.ts && echo OK            # single bundled file exists
node -e "require('typescript')"               # tsc present
```
Then in a scratch consumer: `import { Box } from '@tonic-ui/react-base'` resolves a type.
`react-base` is the right pilot — tonic-one's `react-base/dist/index.d.ts` is only 3.2 KB and
its `Box` already demonstrates the direct `ForwardRefExoticComponent` spelling.

---

## (b) TYPEDEF INFRASTRUCTURE — Sub-unit B  ·  Effort: **S**

Port the ambient globals that every annotation references. tonic-ui currently has annotations
referencing an **undefined** `ForwardRefComponent` (e.g. `list/List.js:9`, `list/ListItem.js:6`),
so these globals are a hard prerequisite for any annotation to be meaningful.

- Copy `packages/react/global.d.ts` from tonic-one verbatim. It declares (inside `declare global`):
  - `StyleProps = Record<string, any>` — all styled-system props.
  - `ThemeScales = Record<string, any>` — theme token object.
  - `ForwardRefComponent<E, P = {}, R extends Element = HTMLElement>` →
    `React.ForwardRefExoticComponent<StyleProps & Omit<React.ComponentPropsWithoutRef<E>, keyof P> & P & React.RefAttributes<R>>`.
  - `StyledFC<P = {}> = React.FC<StyleProps & P>`.
- Copy the smaller `packages/react-base/global.d.ts` subset for `react-base`.
- These are injected at bundle time by `injectGlobalTypes()` (Sub-unit A), so they are NOT
  imported per-file — components just reference `ForwardRefComponent<...>` in JSDoc.
- Decide per package which `global.d.ts` to inject (react vs react-base subset); `react-hooks`,
  `theme`, `utils`, `styled-system` may need their own minimal globals or none.

Validation: with globals injected, the existing `List`/`ListItem` annotations resolve in the
bundled `dist/index.d.ts` (grep for `ForwardRefComponent` no longer dangling).

---

## (c) ANNOTATION WORK + SCOPE ESTIMATE

### Is a minimal pipeline-only first PR viable?  **Yes.**

Because `tsc --allowJs --declaration` emits a declaration for every `.js` file regardless of
JSDoc, Sub-units A+B+C produce a complete, shippable `dist/index.d.ts` for every package from
**whatever JSDoc exists today** (which in tonic-ui is ~3 `@type`/`@typedef` in `react`, plus
hook/util `@param`/`@returns`). Unannotated components emit permissive types (props collapse
toward `any`/intrinsic-element props), but consumers get working module resolution, named
exports, and ref types. **This is the recommended first PR-able increment.** Annotation quality
then improves incrementally without further pipeline changes.

### Sub-unit C — Roll pipeline to all packages  ·  Effort: **M**

Apply Sub-unit A+B to the remaining 6 component packages (`react`, `react-hooks`, `react-icons`,
`styled-system`, `theme`, `utils`). Per tonic-one's wiring:
- `react`, `react-base`, `react-hooks` → explicit `types:build` (`tsc`) + `dts()`.
- `theme`, `utils` → `"types": "dist/index.d.ts"` via `dts()` resolving `.ts` sources (but
  tonic-ui's theme/utils are `.js`, so they need `allowJs` + the same `tsc` step — a small
  divergence from tonic-one to verify).
- `styled-system` → tonic-one ships **no** `types` field (typed only through injected globals);
  mirror that unless tonic-ui wants explicit styled-system types.
- The bulk cost here is `react`'s `index.ts` barrel (54 dirs) and confirming `tsc` resolves all
  370–406 `.js` source files transitively without crashing.

**End of "minimal pipeline-only" delivery.** Mergeable as 1–3 PRs (A, B+C-react-base, C-rest).

### Sub-unit D — Type-test harness  ·  Effort: **S** (infra) + folds into E (content)

Port tonic-one's `tsconfig.test.json` (`noEmit: true`, `strict: true`, includes only
`src/**/*.test-d.tsx`) and `"test:types": "tsc -p tsconfig.test.json"`. tonic-ui has **zero**
`.test-d.tsx` today (tonic-one has 189). The harness is small; populating it is part of Sub-unit E.

### Sub-unit E — Annotation tranches  ·  Effort: **L** (the long tail)

This is where tonic-one is far ahead: **153 files** with `@type {ForwardRefComponent<...>}`,
**183 files** with `@typedef`, **189** `.test-d.tsx`. tonic-ui has ~3 meaningful component
annotations and the public `forwardRef` wrappers are almost entirely unannotated.

**Scope estimate for full parity:**
- Public component files needing `@type {ForwardRefComponent<...>}` + `@typedef XxxProps`:
  **~50–60 component files** across tonic-ui's 61 top-level dirs (the exported `forwardRef`
  wrappers). This is the headline number.
- Non-forwardRef providers/containers needing `@type {StyledFC<...>}` or `React.FC<...>`: a
  handful (tonic-one uses `StyledFC` in 3 files — Popover, PortalManager, ToastTransitionGroup —
  plus providers like `TonicProvider`).
- Hook return-shape `@typedef`s in `react-hooks` (~10 hooks lack typed return shapes).
- Matching `.test-d.tsx` per annotated component for parity (~50–60, optional but recommended,
  including `// @ts-expect-error` negative cases).

**Suggested tranches (each independently mergeable + verifiable):**
- **E1 — High-traffic primitives** (~8 files): `box`, `button`, `text`, `flex`, `grid`, `stack`,
  `link`, `icon`. Establishes the convention; highest consumer payoff.
- **E2 — Form controls** (~10): `input`, `textarea`, `checkbox`, `radio`, `switch`, `select`,
  `search-input`, `form-control`, `autocomplete`, `slider/resize-handle`.
- **E3 — Overlays/feedback** (~12): `modal`, `drawer`, `popover`, `popper`, `portal`, `tooltip`,
  `toast`, `alert`, `spinner`, `progress`, `skeleton`, `badge`/`tag`.
- **E4 — Navigation/structure** (~12): `accordion`, `tabs`, `menu`, `list`, `table`, `tree`,
  `pagination`, `breadcrumb`, `truncate`, `image`, `visually-hidden`, misc.
- **E5 — Hooks + remaining providers + `.test-d.tsx` backfill**.

Estimate ~50–60 component annotations total + ~10 hook typedefs; with `.test-d.tsx` parity,
roughly double the touch count. Each tranche is S–M; the aggregate is **L**.

---

## (d) VERIFY STEPS

Per package (and in CI via lerna):

1. **Declaration emit**: `yarn types:build` (tsc) exits 0 and populates `@types/`.
2. **Bundle**: `yarn build` produces a single `dist/index.d.ts`; `injectGlobalTypes()` prepended
   the globals (grep `ForwardRefComponent` present, no dangling reference).
3. **Consumer resolution**: scratch project does `import { Button } from '@tonic-ui/react'` and
   `tsc --noEmit` resolves it; hovering shows prop types (loose pre-E, precise post-E).
4. **Type tests** (Sub-unit D/E): `yarn test:types` → `tsc -p tsconfig.test.json` (`noEmit`,
   `strict`) passes, including `// @ts-expect-error` negatives.
5. **No runtime regression**: existing jest suites still pass; `dist/cjs` + `dist/esm` outputs
   unchanged (the dts output is additive).
6. **Lerna ordering**: `lerna exec -- yarn build` runs `types:build` before rollup per package,
   in dependency order.

Use `rtk proxy git ...` for any git inspection during verification.

---

## Effort Summary (S/M/L per sub-unit)

| Sub-unit | What | Effort |
|---|---|---|
| A | Generation pipeline, validated on `react-base` (one package) | **S** |
| B | Typedef infra (`global.d.ts`: `ForwardRefComponent`, `StyledFC`, `StyleProps`, `ThemeScales`) | **S** |
| C | Roll pipeline + globals to all 7 packages (incl. `react` `index.ts` barrel) | **M** |
| D | Type-test harness (`tsconfig.test.json` + script) | **S** |
| E | Annotation tranches: ~50–60 components + ~10 hooks (+ optional ~50–60 `.test-d.tsx`) | **L** |

**Minimal pipeline-only increment = A + B + C** → ships working (loose) types for every
package without any annotation work. Strongly recommended as the first PR(s).

## Key Risks

- **`index.js` vs `index.ts` entrypoint.** tonic-one's dts input is `src/index.ts`; tonic-ui
  has only `src/index.js`. Must add a typed `.ts` barrel (or repoint `tsc` at `src/**/*.js`).
  Highest-likelihood breakage point.
- **`tsc` over 370–406 `.js` files** in `react` may surface JSDoc parse errors or memory/time
  cost not seen in tonic-one's already-clean tree; `checkJs:false` mitigates type errors but not
  syntactic JSDoc issues.
- **Loose first-cut types** (pre-Sub-unit E) may mislead consumers who expect precise props;
  document clearly that types are provisional until tranches land.
- **Per-package globals divergence**: deciding which `global.d.ts` each package injects
  (`react` vs `react-base` subset; whether `theme`/`utils`/`styled-system` need any) is fiddly
  and easy to get inconsistent.
- **`theme`/`utils` are `.js` in tonic-ui** (vs `.ts`-friendly assumption in tonic-one's wiring),
  so they need the `allowJs`+`tsc` path, a small but real divergence to verify.
- **Annotation drift / dangling refs**: existing tonic-ui annotations already reference an
  undefined `ForwardRefComponent`; until Sub-unit B lands, any new annotation is dead. Order B
  before any annotation tranche.
- **devDependency + build-order additions** (`rollup-plugin-dts`, `typescript`) across 7 packages
  must land atomically with the build-script change or CI breaks mid-roll.
