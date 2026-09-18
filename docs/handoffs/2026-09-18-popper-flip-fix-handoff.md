# Handoff — Popper `flip` fix, and the modifier-array instability

> Date: 2026-09-18
> Branch: `fix/react-popper-flip-on-content-resize` (both repos)
> tonic-ui: https://github.com/trendmicro-frontend/tonic-ui/pull/1207 (draft, HEAD `2758a78593`)
> tonic-one: PR #550 (open, approved, HEAD `f26fd631c`)
> Status: the `flip` fix is complete and browser-verified. **One follow-up is untouched and is tomorrow's job: the modifier-array instability (§Next).**

## Environment dependency update (2026-09-18)

`Popper` now calls `getWindow()` directly in `observePopperResize.effect` and memoizes that modifier with `[getWindow]`. The newly added `useLatestRef` indirection has been removed. `EnvironmentProvider` keeps its existing `useMemo` implementation; no shallow memo is added.

`TonicProvider` spreads `environment` into `EnvironmentProvider`, whose dependency is the inner `value`, not the config object. With an unchanged `value` (including the default `undefined`, a Document, or a stable getter), theme and color-mode updates keep the environment getters and the popper instance stable, provided the other Popper inputs are also stable. Existing inline consumer modifier arrays remain a separate issue.

Changing `value` changes `getWindow`, so Popper destroys the old instance, disconnects its observer, and installs an observer from the new environment window if supported. A newly created inline getter also causes this replacement even if it returns the same window; use a DOM node or a stable getter when this matters. A stable getter whose return value changes does not itself notify context consumers or re-install an existing observer; this change does not add detection for that case.

Tests now check environment/getter reference equality, updates on the same mounted provider, and latest-node reads through a stable getter. Popper tests cover TonicProvider theme/color-mode updates with stable environment values. Real Popper tests cover observer cleanup and re-installation on a value change, including a new environment without ResizeObserver and final unmount cleanup.

## Verification of the environment dependency update (2026-09-18)

- tonic-ui, after rebasing onto the remote PR branch at `eef64610ad`: **130 suites / 924 tests / 93 snapshots** pass (`yarn test --coverage=false --silent`). `yarn build` passes. `yarn lint` reports 0 errors and 6 pre-existing warnings outside changed files; explicit ESLint on the four changed JS files is clean.
- tonic-one: **126 suites / 921 tests / 93 snapshots** pass. Targeted tests: **4 suites / 38 tests** pass. Package lint, explicit changed-JS ESLint, and build pass.
- The real-Popper environment-change test failed before removing the ref: the old observer did not disconnect. After the change, both supported and unsupported replacement windows pass, including final unmount cleanup.
- Both repos pass Chromium checks at 1280 × 768 using a portalled Popover with preferred `bottom-start` and `flip` enabled. First open resolves `top-start` with popper bounds 540–684. A DOM-only height change from 144 to 240 px updates the bounds to 444–684 without a React rerender. Moving the trigger to top 200 px and reopening resolves `bottom-start` with bounds 244–388. The checks pass with `matchWidth` disabled and enabled, without scrolling, placement oscillation, observer loop warnings, or new page exceptions. Temporary fixtures were removed.
- Independent read-only review found no material issue. The four changed JS files match across repos after package-name and portal-class normalization. `git diff --check` passes.

## Read these first

- `docs/plans/2026-09-15-popper-flip-rca-fix-plan.md` — the RCA, the design decisions, the consumer-impact table, the execution log, and the verification table, including the ⚠️ correction notice for the missing `phase`. Source of truth for the shipped fix; this handoff does not repeat it.
- PR #1207 — its description carries the summary, the browser-verification table, and the reviewer notes.
- PR #550 — the downstream sibling; it carries the same `Popper.js` and the original root-cause write-up.

## Next — the modifier-array instability (NOT started)

> **Scope decision (2026-09-18): do NOT fix `TooltipContent`.** Its `[getWindow, ...]` dependency is not where the defect lives. The reproduction below shows the same three-instance behaviour from `PopoverContent`, which has no `getWindow` dependency at all — so patching `TooltipContent` would leave the bug intact everywhere else and add churn. Fix the shared cause in `Popper`, or leave it alone. The consumer sweep is context, not a work list.

**Symptom.** Every `Popper`-based overlay destroys and recreates its popper instance on every render of its parent. A raw `<Popover>` re-rendering three times calls `createPopper` three times.

**Cause — isolated, not guessed.** `setupPopper`'s dependency array (`Popper.js:231`) includes `modifiers`, and every consumer builds that array inline in JSX:

```jsx
modifiers={[
  ...popperModifiers,        // useMemo, stable
  ...ensureArray(...),       // the enclosing [] is a new array every render
]}
```

Controlled experiment against the raw `Popper`, three renders each:

| Input | `createPopper` calls |
| :--- | :--- |
| no `modifiers` prop | **1** |
| `modifiers={[{ name: 'flip', enabled: true }]}` inline | **3** |
| the same array hoisted to a stable const | **1** |

So the array identity alone is the trigger. `getWindow` in a dependency is a separate, narrower instance of the same class of problem, and **not** the one that reproduces.

**Consumers with the same shape (context only, not a fix list).** `TooltipContent`, `PopoverContent`, `MenuContent`, `SubmenuContent`, `DatePickerContent`, `AutocompleteList` all build `modifiers` inline. Only `TooltipContent` also has `getWindow` in a memo dependency; `PopoverContent` reproduces the recreation without it.

**Pre-existing, not a regression.** `Popover` on `main` calls `createPopper` three times for three renders too. Do not attribute it to the flip fix.

**Recommended fix, if taken — repair `Popper`, not the consumers.** Stabilize the array at the one place that consumes it:

```js
import useShallowMemo from '../utils/useShallowMemo';
...
const shallowMemo = useShallowMemo();
const stableModifiers = shallowMemo(ensureArray(modifiers));
// use stableModifiers in setupPopper and in its dependency array
```

`packages/react/src/utils/useShallowMemo.js` already exists (`micro-memoize` with `isKeyItemEqual: 'shallow'`) and is the established pattern here — 30 files use it, including `Popover`, `Menu`, `Modal`, `Table`, `Tabs` and `Accordion`.

Verify: a test that rerenders a raw `Popover` three times and asserts `createPopper` was called **once** (it currently fails with 3 — that is the red state to start from). Then rerun the browser fixture, because stabilising the array changes when the instance is rebuilt.

**Open questions to settle before implementing**

- `micro-memoize@5.1.1` defaults to `maxSize: 1`; the existing hook does not have an unbounded cache.
- Shallow comparison only stabilizes a new outer array containing the same modifier references. It does not stabilize newly created modifier objects such as `{ name: 'flip', enabled: true }`. Do not compare by `name` alone: changes to `enabled`, `options`, `fn`, `effect`, or modifier order must remain effective.
- Apply to both repos in the same change; keep `Popper.js` byte-identical modulo the package scope, as the rest of this branch does.
- Is per-render instance recreation actually worth fixing? It costs modifier-effect re-registration on each parent render, but nothing has been reported as broken by it. Confirm the cost is real before spending the change.

## What shipped (do not re-litigate)

1. `packages/react/src/popper/Popper.js` — internal `observePopperResize` modifier with `phase: 'read'`, `cleanupPopper()` on ref detachment, `preferredPlacement` as the only `createPopper()` input, render prop now yields `{ placement, computedPlacement }`, `modifiers = defaultModifiers`.
2. `packages/react/src/popover/PopoverContent.js`, `packages/react/src/tooltip/TooltipContent.js` — `transformOrigin` reads `computedPlacement`.
3. Tests — 9 added to `popper/__tests__/Popper.test.js` (20 total), plus `popper/__tests__/Popper.ssr.test.js`, `popper/__tests__/Popper.realPopper.test.js`, and the two consumer placement files.
4. Docs — `popover`, `tooltip` and `autocomplete` prop tables describe `placement` as the preferred placement. Those are the only three pages with a `placement` row; `Menu` and `DatePicker` cover it in prose only.

The original `useLatestRef` design and inline-provider identity test have been superseded by §Environment dependency update. `useEventCallback` remains unsuitable because Popper.js installs modifier effects during the ref commit, before that hook initializes its callback in a layout effect. Direct `getWindow()` use does not need that hook.

## Historical verification of the original fix (do not re-run blindly)

- tonic-ui: **122 suites / 834 tests / 90 snapshots** green, `yarn lint` 0 errors, `yarn build` OK.
- tonic-one: **126 suites / 915 tests / 93 snapshots** green, lint clean.
- Browser, real Chromium against `next dev`: a `portalled` `Popover`, `placement="bottom-start"`, `flip` enabled, trigger pinned 40px above a 768px viewport bottom → resolves `top-start` on the first open, popper at 540–684, no overflow, no scrolling, `transformOrigin: 0px 144px`.
- Red-green: deleting `phase: 'read'` drops `observePopperResize` from `state.orderedModifiers` and fails the ordering test; reverting the consumers to `placement` fails both placement tests; swapping in `useEventCallback` fails the real-popper test.

`yarn test:types` reports 208 errors both before and after this branch (pre-existing, none in `Popper.test-d.tsx`).

## Gotchas

- **Local docs dev server.** `next dev` must be launched with the repo-root binary — `packages/react-docs/node_modules` does not exist in this Yarn workspace, so `node_modules/.bin/next` resolves nowhere and exits 127:
  `cd packages/react-docs && . ./tonic-ui.env && exec node ../../node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001`
- **The docs site ships an empty `#__next` server-side** (3950 bytes total) because `pages/_app.page.js:86` returns `null` until a `useEffect` sets the color mode. `waitForSelector('#__next')` therefore passes immediately against an empty node — wait for children or sleep 5–8s. After an HMR edit, open a fresh tab rather than reloading; the stale tab can render an empty `#__next`.
- `@popperjs/core@2.11.8` is the real dependency. The adjacent `../floating-ui` checkout is that package's source, not the Floating UI library; it has no `autoUpdate`.
- `packages/react` tests resolve `@tonic-ui/react-hooks` from `dist/`, so a hook you add to that package needs a rebuild before the Popper tests can use it.
- In jsdom there is no overflow and no `ResizeObserver`, so requested and computed placements always coincide; unit tests cannot prove geometry.
- `packages/react-docs` uses `pageExtensions: ['page.js', 'page.mdx']`, so demo components are plain `.js` pulled in via `{render('./demo')}` — a demo file is not a route.
- A raw `Popper` without a `modifiers` prop already avoids recreation (`defaultModifiers` is module-level); the instability needs an explicit `modifiers` input to appear.

## Suggested skills

- `systematic-debugging` for the modifier-array follow-up — start from the failing three-render test, not from a rewrite.
- `verification-before-completion` before claiming the follow-up fixed recreation; the browser fixture must be rerun.
- `fedex-git-workflow` (or the repo conventions in `AGENTS.md`) for branch, commits and the changeset.
