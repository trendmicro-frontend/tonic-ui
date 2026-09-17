# Handoff — Popper first-open `flip` fix

> Date: 2026-09-15
> Branch: `fix/react-popper-flip-on-content-resize`
> Draft PR: https://github.com/trendmicro-frontend/tonic-ui/pull/1207
> Status: implementation, package verification, changeset and draft PR complete. The browser check is the only unverified claim.

## Read these first

- `docs/plans/2026-09-15-popper-flip-rca-fix-plan.md` — the RCA, the design decisions, the consumer-impact table, the execution log, and the verification table. It is the source of truth; this handoff does not repeat it.
- Draft PR #1207 — its description carries the same summary.

## What the branch does

`Popper` measured its own box only during the creation tick, so an enabled `flip` modifier decided against a collapsed popper and never re-decided when the content grew. The branch fixes that and three related defects. Per-file detail is in the plan's Execution log; the short version:

1. `packages/react/src/popper/Popper.js` — internal `observePopperResize` modifier (`useEnvironment().getWindow()` + `useLatestRef`), `cleanupPopper()` on ref detachment, `preferredPlacement` as the only `createPopper()` input, render prop now yields `{ placement, computedPlacement }`, `modifiers = defaultModifiers`.
2. `packages/react/src/popover/PopoverContent.js`, `packages/react/src/tooltip/TooltipContent.js` — `transformOrigin` reads `computedPlacement`.
3. Tests: 8 added to `popper/__tests__/Popper.test.js` (19 total) plus two new consumer files, `popover/__tests__/PopoverContent.placement.test.js` and `tooltip/__tests__/TooltipContent.placement.test.js`.
4. `packages/react-docs` prop tables for `popover`, `tooltip`, `autocomplete`, `menu`, `submenu`, `date-picker` now describe `placement` as the preferred placement.

## Outstanding work

1. **Browser verification — the only unverified claim.** Task 1's RCA gate was waived by the user, so the end-to-end symptom fix is **not confirmed**. The headless attempt failed for environmental reasons, not because of the fixture: against `next dev`, every docs page (including the untouched `/components/button/`) rendered `#__next` with 0 element children, all local chunks returned 200, and there were no page errors — only the HMR `isrManifest` warning. Before retrying, find a harness where a known-good docs page actually hydrates (production static export, or a minimal standalone page), then re-create the Task 1 fixture and check: first open lands above the trigger without scrolling, reopening with room below returns to the bottom placement, at most one placement change during entry, and no `ResizeObserver loop` warning with `matchWidth` on and off.
2. **Review the release note wording.** `computedPlacement` is a new render-prop field, and the instance lifecycle changed (no recreation on a reported placement change; destroy on detach while mounted). Both are consumer-visible and belong in the release note.
3. **Take the PR out of draft** once the browser check passes.

The changeset is already added: `.changeset/tonic-ui-pr-1207.md` (`"@tonic-ui/react": patch`).

## Downstream round-trip (2026-09-18)

This fix was ported **to** Tonic One (PR #550) and a correction was found there and back-ported here:

- **`phase: 'read'` was missing.** popper.js's `orderModifiers` drops any modifier whose `phase` is not one of its nine known phases, so `observePopperResize` never installed its effect — P1 was dead code in both repos. Fixed here with a regression test that runs the **real** popper.js and asserts the modifier survives ordering. Red-green proven.
- **`ownerWindow` naming** applied per review comment `r4022758473` on PR #1207: `const ownerWindow = getWindowRef.current(); const ResizeObserver = ownerWindow.ResizeObserver;`, matching `scrollbar/Scrollbar.js:526-528`.
- `useLatestRef` is still required around `getWindow`; a direct `getWindow()` dependency makes the modifier identity change whenever `EnvironmentProvider`'s `value` is an inline arrow, which recreates the instance. The `should not recreate the popper instance when the environment value changes identity` test pins this.

Both repos now hold byte-identical `Popper.js` apart from the `@tonic-ui/*` vs `@tonic-one/*` package names, verified by normalizing and diffing the two files.

## Decisions already made — do not relitigate

- The `placement` prop and the render-prop `placement` keep meaning the **preferred** placement; the computed value is additive as `computedPlacement`. Renaming the public prop was rejected (`defaultPlacement` collides with the existing private-constant convention in `drawer`, `popover`, `tooltip`, `toast`; `preferredPlacement` would diverge from `@popperjs/core` for no behavioural gain).
- `Popover`/`Tooltip` **do** read `computedPlacement`; the other consumers do not need it. `MenuToggleIcon` direction, `SubmenuContent`'s keyboard close key and `useSubmenuListStyle`'s inline positioning still read the preferred placement, and those are recorded as pre-existing gaps that only surface when a consumer enables `flip` (the defaults disable it).
- P2 stays in this PR.

## Verification already run (do not re-run blindly)

`packages/react`: full suite 120 suites / 831 tests / 90 snapshots green; `yarn lint` 0 errors; `yarn build` OK; `yarn test:types` has 208 pre-existing errors, identical before and after this branch, and none in `Popper.test-d.tsx`. Regression coverage was confirmed by reverting each change and watching the new tests fail. The plan's verification table has the details.

## Gotchas

- `@popperjs/core@2.11.8` is the real dependency. The adjacent `../floating-ui` checkout is that package's source, **not** the Floating UI library; it has no `autoUpdate`.
- `packages/react` tests resolve `@tonic-ui/react-hooks` from `dist/`, so a hook added to that package needs a rebuild before the Popper tests can use it.
- In jsdom there is no overflow and no `ResizeObserver`, so the requested and computed placements always coincide; unit tests cannot prove the geometry fix. That is why the browser check is a release gate.
- `packages/react-docs` uses `pageExtensions: ['page.js', 'page.mdx']`, so demo components are plain `.js` imported through `{render('./demo')}` — a demo file cannot be visited as a route.
- The docs dev server writes `packages/react-docs/build` (gitignored, `distDir` in dev).

## Suggested skills

- `verification-before-completion` before claiming the fix works end to end.
- `systematic-debugging` if the browser check does not reproduce the reported symptom — the RCA in the plan is source-derived, not observed.
- `fedex-git-workflow` (or the repo's own conventions in `AGENTS.md`) for the changeset commit and PR polish.
