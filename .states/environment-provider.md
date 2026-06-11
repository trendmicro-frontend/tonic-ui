# Loop: Refactor DOM query functions in packages/react/src to use `useEnvironment` for `document`/`window` access
_Stop when: all units in `## Next` are done, every refactored file accesses `document`/`window` via `useEnvironment()` (not the global), and each touched component's jest suite is green._
_Branch: feat/tonic-ui-425 (existing PR #1088 branch — work committed directly here, NOT a separate loop branch)     Posture: supervised     Budget (run): n/a_

## Context
- `useEnvironment()` (packages/react/src/environment) returns `{ getRootNode, getDocument, getWindow }`.
- Outside `EnvironmentProvider` it falls back to global `document`/`window`, so callers always get a valid value — no extra fallback needed.
- Pattern: in a component/hook, `const { getDocument } = useEnvironment();` then `getDocument().xxx` / `getWindow().xxx`. Capture inside `useCallback`/`useEffect` and add to deps.
- Tests: from `packages/react`, run `yarn jest <path>` (jest --maxWorkers=2).
- No component currently uses `useEnvironment` yet — this loop establishes the pattern.

## Scope decisions
- Refactor component/hook-level global `document`/`window` access to `useEnvironment()`.
- Utils tied to a refactored component (`resize-handle/utils.js` has an explicit TODO; `color-mode/utils.js`) get a window/document param threaded from the component's `useEnvironment()`.
- SKIP `tooltip/TooltipTrigger.js:87` — already environment-aware via `getOwnerDocument(ref.current)` (no global ref).
- SKIP `tooltip/TooltipContent.js:133` — comment only, no real usage.

## Done
- [x] autocomplete/useAutocompleteState.js — `getDocument().getElementById`; jest src/autocomplete 81 passed (536c4a245b)
- [x] menu/MenuContent.js — `getDocument().activeElement`; jest src/menu unchanged vs baseline: 12 PRE-EXISTING failures (focus/jsdom flakiness), 34 passed — no regression from my change (df69068c84)

- [x] popover/PopoverContent.js — `getDocument().activeElement`; jest src/popover 11 passed (e6060dc3b9)
- [x] date-pickers/DateCalendar/DateCalendar.js — `getDocument()` for key listeners + environment test (separate document via EnvironmentProvider, fails on old code / passes on new); jest src/date-pickers 9 passed (8285eae603)
- [x] scrollbar/Scrollbar.js — `getDocument()` for drag listeners + environment test (thumb mousedown → altDoc mousemove/mouseup; fails on old code); jest src/scrollbar 4 passed (39d12939c4)
- [x] resize-handle (ResizeHandle.js + utils.js) — `getDocument()` for listeners; `getIsPassiveListenerSupported(getWindow())` (util now takes window param, default global); env test (mousedown → altDoc listeners; fails on old code); jest src/resize-handle 8 passed (4b3c8e158b)
- [x] color-mode (ColorModeProvider.js + utils.js) — `getWindow()` for matchMedia; `getColorScheme(mode, win)` (util now takes window param, default global); updated existing getColorScheme assertion; env test (fake window via EnvironmentProvider; fails on old code); jest src/color-mode 10 passed (d3a4a8a4b7)
- [x] BACKFILL autocomplete env test — keyboard nav → altDoc.getElementById; fails on pre-refactor (checkout 536c4a245b^); jest 1 passed (62ba6dd03f). NOTE: for committed units, verify fails-on-old via `git checkout <unitcommit>^ -- file`, NOT stash (working tree is clean → stash is a no-op).
- [x] BACKFILL menu env test — open menu, blur w/o relatedTarget → altDoc.activeElement getter accessed; fails on pre-refactor (df69068c84^); jest 1 passed (a5470ec196). NOTE: can't assert global activeElement NOT called — framework reads it thousands of times; assert only the separate doc's getter.
- [x] BACKFILL popover env test — open click-popover, blur w/o relatedTarget → altDoc.activeElement getter accessed; fails on pre-refactor (e6060dc3b9^); jest 1 passed (dc45cb3234).

## In progress

## Testing approach (per user: "mock jsdom to simulate the new behavior change")
PROVEN pattern (DateCalendar): wrap component in `<EnvironmentProvider value={() => node}>` where `node` belongs to a separate `document.implementation.createHTMLDocument()`; spy on that document's method and assert it's used (and the global is NOT). Test fails on pre-refactor code → genuine behavior test.
Each remaining unit's done-criterion now includes an environment test. Technique varies by API:
- addEventListener units (scrollbar, resize-handle): spy altDoc.addEventListener after triggering drag/mousedown.
- activeElement units (menu, popover): spy `jest.spyOn(altDoc, 'activeElement', 'get')`, trigger blur. BACKFILL needed (already committed without test).
- autocomplete getElementById: BACKFILL — open + ArrowDown + flush rAF, assert altDoc.getElementById.
- color-mode getWindow().matchMedia: pass a fake document node (`{ nodeType: 9, defaultView: { matchMedia: jest.fn() } }`) so getWindow returns the fake window; assert its matchMedia consulted.

## Next (FOLLOW-UP: globalThis integration — user requested "All globalThis usages")
Original triage grepped only `window|document` and MISSED `globalThis`. Re-scan found 5 source files.
- [x] tooltip/TooltipTrigger.js — getOwnerDocument(ref)→getDocument(); removed unused import; env test keydown→altDoc; jest src/tooltip 18 passed (4e3a485bba)
- [x] tooltip/TooltipContent.js — globalThis.scrollX/scrollY→getWindow(); getWindow added to popperModifiers deps; env test followCursor→env window scroll getters; jest src/tooltip 19 passed (73ed3775aa). NOTE: can't spy global window.scrollX (data prop not getter) → assert only env getters.
- [x] input/InputControl.js — globalThis.MutationObserver→getWindow(); getWindow in effect deps; env test fake env window spy MutationObserver, typed to trigger; jest src/input 24 passed (672831a87d)
- [x] modal/ModalOverlay.js — globalThis.ResizeObserver→getWindow(); getWindow in effect deps; env test open modal + fake env window spy ResizeObserver; jest src/modal 17 passed (5782ca4cb3)
- [x] scrollbar/Scrollbar.js — globalThis observers→getWindow(); getWindow in deps; env test fake env window spy observers; jest src/scrollbar 5 passed (aecc33bc15)

## Code review (independent reviewer on full diff 178edd4121..HEAD)
- Verdict: mostly clean. Confirmed OK: hook deps, TDZ in ResizeHandle (safe), identity stability, orphaned import removed, genuine tests, no regression for non-iframe consumers.
- IMPORTANT (acted): getIsPassiveListenerSupported module-level cache ignored the `win` param after first call → fixed with WeakMap keyed on window + per-window test (f65f283d5b).
- LOW (no action, by design): TooltipTrigger `() => getDocument()` inline arrow re-subscribes per render — pre-existing pattern (matches line 100), original was also an inline arrow, NOT a regression. Left to match file convention (surgical-changes rule).
- Full touched suites after fix: 233 passed (36 suites). Flaky menu/submenu tests all passed this run.
- INFORMATIONAL (not changed, scope): `requestAnimationFrame` used widely — timing primitive, realm-agnostic, intentionally left. `getComputedStyle` (in @tonic-ui/utils, ModalOverlay) is realm-sensitive but out of packages/react/src scope.

## Completion (first pass — document/window refactor)
- All 7 refactor units + 7 environment behavior tests committed locally to feat/tonic-ui-425. NOT pushed.
- Lint: clean on all changed files (7dcf9cce2c fixed test-file eslint).
- No global `document`/`window` remains in refactored component files; utils take a window param (default global).
- Full suite across touched areas: 168 passed; only Submenu/SubmenuToggle flaky focus tests fail (pre-refactor baseline fails MORE: 11 vs 4) → not a regression.
- `.gitignore` change (STATE.md) left uncommitted on purpose to keep it out of the PR.

## Post-refactor actions (done)
- PR #1088 description updated (action item checked; Refactor + Tests sections added).
- review.md posted as PR comment (later re-posted with CI follow-up section).
- Pushed feat/tonic-ui-425 to origin (with approval). HEAD synced.
- CI "Build & Test" failed in @tonic-ui/react-docs: import/no-duplicates in useEnvironment viewport-size example → fixed (single import), pushed (5abc1f9b40). `yarn build` at repo root passes (11 packages, docs prerender). Two pre-existing lint WARNINGS remain in iframe/shadow-dom example pages (non-blocking).

---

# Initiative 2: Shadow DOM overlay examples (Environment docs) — ❌ ABANDONED 2026-06-11
_DROPPED by user. The 3 commits (5fb3d739e2, 16286566c8, c54fed9b7d) were reset away (`git reset --hard origin/feat/tonic-ui-425`); all unpushed so no trace. Example file deleted, MDX restored to original Shadow DOM + iframe sections._
_WHY DROPPED: a Shadow DOM example CANNOT demonstrate the useEnvironment refactor's value, because shadow DOM shares the MAIN document/window. PROVEN live: `shadowRoot.ownerDocument === document` (true), `.defaultView === window` (true), inner element `.ownerDocument === document` (true); whereas `iframe.contentDocument === document` (FALSE), `iframe.contentWindow === window` (FALSE). The global-vs-environment difference only exists in an iframe (separate realm). → superseded by Initiative 3._
_(Historical detail of the abandoned work retained below for reference.)_
_Branch: feat/tonic-ui-425 (same)_

## Key decisions
- Core trio only (Tooltip, Popover, Menu) — NOT Autocomplete/DatePicker (too complex). Modal example kept as-is.
- SHOWCASE, not an env on/off toggle. FINDING: in Shadow DOM, `useEnvironment().getDocument()/getWindow()` resolve to the MAIN document/window (shadowRoot.ownerDocument IS the main document; no refactored component uses getRootNode). So env on/off shows ~no visible diff in Shadow DOM — containment comes from Emotion cache + Popper/Portal containerRef. (Env refactor's visible payoff is the iframe scenario.)
- New file is self-contained (duplicate scaffold; docs examples are standalone). Theme needs Popper + PortalManager containerRef only.

## Artifacts
- Spec (approved): docs/superpowers/specs/2026-06-11-shadow-dom-overlay-examples-design.md
- Plan: docs/superpowers/plans/2026-06-11-shadow-dom-overlay-examples.md
- (Both left uncommitted, consistent with keeping planning artifacts out of the PR.)

## Done (Initiative 2)
- [x] Unit 1: created `packages/react-docs/pages/components/environment/usage-in-shadow-dom-overlays.js` (Tooltip/Popover/Menu trio; theme = Popper + PortalManager containerRef). eslint 0 errors, 1 consistent-return warning IDENTICAL to reference usage-in-shadow-dom.js (pre-existing convention, non-blocking) (5fb3d739e2).
- [x] Unit 2: MDX subsection "### Rendering overlay components inside Shadow DOM" + render() inserted after existing Shadow DOM example, before iframe; existing examples untouched (16286566c8).

## Done (Initiative 2) — continued
- [x] Unit 3: verify (verification-only, no commit). ALL CHECKS PASSED:
  - Tooltip ✓ — `role="tooltip"`, text correct, Popper-positioned (placement bottom), inside shadow root, NOT leaked to document.body. (real Playwright hover; synthetic events don't trigger React hover.)
  - Popover ✓ — content "This popover is rendered inside the Shadow DOM" inside shadow root, inBody=false, Popper-positioned (placement top, position absolute).
  - Menu ✓ — `role="menu"` + 3 `role="menuitem"` inside shadow root, aria-expanded→true, NOT leaked to body. (NOTE: open Popover intercepts a same-page Menu click via interact-outside dismiss — test each overlay from a fresh page load.)
  - Console: 14 errors ALL pre-existing & page-wide (legacyBehavior Link deprecation; AccordionContent TransitionProps deprecation ×many; useSlot closeButton on Tag). NONE reference the new example → no new errors.
  - Screenshot: ./shadow-dom-overlays-popover.png (popover open inside the bordered shadow box).
  - BUILD GATE ✓ — `yarn build` at repo root → "lerna success exec Executed command in 11 packages" (@tonic-ui/react-docs Next.js build clean, no eslint errors).
  - Dev server bs5kd3fhd stopped (killed).

## Next (Initiative 2)
- (empty — all units done)

## Completion (Initiative 2 — Shadow DOM overlay docs example)
- Final shape (after user iteration): SINGLE styled showcase — Tooltip/Popover/Menu rendered styled & contained inside the Shadow DOM, anchored to triggers. NOT a contained-vs-escaped comparison.
- Commits on feat/tonic-ui-425 (LOCAL, NOT pushed):
  - 5fb3d739e2 — example file `usage-in-shadow-dom-overlays.js` (styled trio, theme Popper+PortalManager containerRef → shadow root).
  - 16286566c8 — MDX subsection render().
  - c54fed9b7d — MDX copy clarified to contrast with the full-viewport Modal example above.
- DETOUR (resolved, no trace in history): briefly built a contained-vs-escaped (unstyled) comparison per user request, committed e23d9168cc, then user reversed ("keep styling applied, not unstyling"). Undid via `git reset --soft HEAD~1` + restored file from 5fb3d739e2 (e23d9168cc unpushed → safe). Final history is clean (3 commits, no add/revert pair).
- VERIFIED (final styled version): Popover contained in shadow root + styled (white bg, 12px pad, boxShadow); 3 buttons present; no new console errors; `yarn build` green (11 pkgs). Screenshot: ./shadow-dom-overlays-styled.png.
- BUILD GOTCHA: a running `yarn dev` on :3000 makes @tonic-ui/mcp integration tests fail (they POST to :3000 and get the docs HTML). STOP the dev server before `yarn build`, restart after.
- AWAITING USER: push to origin/feat/tonic-ui-425 (updates PR #1088)? (outward-facing — needs confirmation, as Initiative 1 push did.)

Posture: supervised. Plan: docs/superpowers/plans/2026-06-11-shadow-dom-overlay-examples.md

## Blocked

## Log
- 2026-06-11 bootstrap: triaged 11 candidate files; 7 refactor units + 2 skips. Branch = feat/tonic-ui-425 (work direct, no separate loop branch). STATE.md added to .gitignore (uncommitted).
- 2026-06-11 refactor complete (17 commits), reviewed, fixed (WeakMap), pushed. PR #1088 description + review comment updated. Docs build fix pushed (5abc1f9b40).
- 2026-06-11 Initiative 2 brainstormed: core trio showcase decided; spec + plan written & approved; awaiting execution-mode choice. dev server running (bg task baal7neit).
- 2026-06-11 resume check: tree clean (only untracked artifacts: .playwright-mcp/, STATE.md, docs/superpowers/, review.md), origin synced (0 ahead), no stale in-progress. Formalized Initiative 2 Next into 3 loop units with done-when criteria. Loop paused at GATE (execution-mode choice).
- 2026-06-11 Initiative 2 executed inline (supervised): Unit 1 file (5fb3d739e2), Unit 2 MDX (16286566c8), Unit 3 Playwright verify (3 overlays contained in shadow root, no new console errors) + `yarn build` green (11 pkgs). Initiative 2 COMPLETE. Commits local on feat/tonic-ui-425, not pushed — awaiting user push approval.
- 2026-06-11 Initiative 2 ABANDONED: user probed why the two shadow-DOM examples look the same; established (with live proof) that shadow DOM shares the main document/window, so it can't show the global-vs-env difference — only an iframe can. User chose to drop the shadow-DOM example and build an iframe with/without-environment demo instead. Reset --hard to origin (2966ae6f6d); 3 commits gone (unpushed). → Initiative 3.

---

# Initiative 3: iframe with/without-environment demo (Environment docs)
_Goal: a docs example that VISIBLY shows the difference the `environment` config makes — a component/probe inside an iframe rendered WITH `environment={{ value: iframeDocument }}` (resolves to the iframe's document/window) vs WITHOUT (falls back to the global/top document/window, the wrong realm)._
_Branch: feat/tonic-ui-425     Posture: supervised_

## Key facts (established)
- iframe IS a separate realm: `iframe.contentDocument !== document`, `iframe.contentWindow !== window` (proven live).
- React content portaled into the iframe still executes in the TOP window's JS realm, so bare `document`/`window` = TOP document/window (wrong realm for the iframe content). `useEnvironment().getDocument()/getWindow()` with `environment={{ value: iframeDocument }}` returns the iframe's objects (right realm).
- Existing `usage-in-iframe.js` ALWAYS sets environment (renders a Modal); it does NOT contrast with/without. It's the scaffold reference for the iframe + Emotion-cache-in-iframe-head + createPortal pattern.

## Design decision PENDING (awaiting user) — how to demonstrate
- Option A (probe): tiny custom component using `useEnvironment().getDocument()/getWindow()` that displays which realm it resolved to (e.g. "getDocument() is the iframe's document: YES/NO"), shown with-env vs without-env. Deterministic, trivially verifiable, directly answers "global vs environment". Less "real-world".
- Option B (real component breakage): a refactored component whose document/window listeners break without env in the iframe (Scrollbar/ResizeHandle drag via getDocument mousemove/mouseup; DateCalendar keydown nav; Menu/Popover close-on-outside via getDocument().activeElement). Real-world but interaction is harder to verify deterministically in an iframe via Playwright.

## Done (Initiative 3)
- [x] Approach confirmed by user: PROBE (option A).
- [x] Built `usage-in-iframe-environment.js` — iframe (reuses usage-in-iframe.js IFrame scaffold) + one TonicProvider (styling/colorMode/baseline) + EnvironmentProbe rendered twice: (1) no env config → inherits default global; (2) wrapped in `<EnvironmentProvider value={frameDocument}>`. Probe compares getDocument()===frameDocument and getWindow()===frameDocument.defaultView, prints ✓/✗. eslint 0 errors, 1 react/jsx-no-leaked-render warning IDENTICAL to reference usage-in-iframe.js (the `{mountNode && createPortal()}` pattern) — acceptable.
- [x] MDX subsection "### Why the environment matters in an iframe" + render() added after the existing iframe example. Commit 52cc2e829f.
- [x] VERIFIED live (Playwright, my iframe title="Environment Context"): WITHOUT env → "✗ getDocument() is not the iframe document / ✗ getWindow() is not the iframe window"; WITH env → "✓ getDocument() is the iframe document / ✓ getWindow() is the iframe window". Sanity: iframe.contentDocument!==top doc, contentWindow!==top win. No new console errors. `yarn build` green (11 pkgs). Screenshot: ./iframe-environment-probe.png.

## Completion (Initiative 3)
- ONE commit on feat/tonic-ui-425, LOCAL, NOT pushed: 52cc2e829f (new example file + MDX subsection). Branch = origin(2966ae6f6d) + 52cc2e829f.
- AWAITING USER: push to origin/feat/tonic-ui-425 (updates PR #1088)?
