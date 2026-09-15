# Popper First-Open `flip` RCA and Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `systematic-debugging` for Task 1, `test-driven-development` for Tasks 2–5, and `verification-before-completion` for Task 6. Track each checkbox in order.

**Goal:** Make an enabled Popper `flip` modifier react to popper-content size changes, while preserving the consumer-requested placement as Popper's preferred input.

**Architecture:** First prove the browser timing with a real `Menu` + `Collapse` fixture. Then add popper-element resize observation as an internal Popper modifier, so Popper core owns effect cleanup. Separately correct requested-versus-computed placement state and the unstable empty `modifiers` default.

**Tech Stack:** React 18/19, `@popperjs/core@2.11.8`, `ResizeObserver`, Jest, Testing Library, Tonic UI docs.

**Spec:** This document, especially §1–§3; no separate design document.

**Date:** 2026-09-15

**Status:** P1–P3 **implemented** on branch `fix/react-popper-flip-on-content-resize` and unit-verified. The browser reproduction (Task 1) was **waived by the user** after the headless attempt failed for environmental reasons, and the browser geometry check (Task 3 Step 4 / Task 6 Step 2) remains **unverified**. Treat the end-to-end symptom fix as unconfirmed until a browser check runs.

### Execution log

**Implemented**

- `packages/react/src/popper/Popper.js`
  - internal `observePopperResize` modifier observing `state.elements.popper`, resolved through `useEnvironment().getWindow()`, with the constructor read through `useLatestRef` so `EnvironmentProvider` value churn cannot recreate the instance;
  - `refUpdater` calls `cleanupPopper()` on detachment;
  - `preferredPlacement` feeds `createPopper()`; `placementState` (keyed by the preferred placement) is what the render function receives; the `placementProp !== undefined` short-circuit is gone;
  - `modifiers = defaultModifiers` (module-level array) replaces the per-render `[]` default;
  - JSDoc for `placement`, `PopperChildProps.placement`, and `PopperInstance.update` updated.
- `packages/react/src/popper/__tests__/Popper.test.js` — mock now exposes `update`; 8 tests added (19 total).

**Verified**

| Check | Result |
| :--- | :--- |
| `yarn test --testPathPattern="__tests__/Popper.test.js"` | 19/19 pass |
| Same 19 tests against pre-fix `Popper.js` | 7 of the 8 new tests fail (RED confirmed) |
| `observePopperResize` dep changed from `[getWindowRef]` to `[getWindow]` | identity test fails (`3` instances instead of `1`) — the `useLatestRef` design is load-bearing |
| `yarn test` (whole `packages/react`) | 118 suites, 829 tests, 90 snapshots — all pass, no snapshot updates needed |
| `yarn lint` | 0 errors; no new warnings |
| `yarn test:types` | 208 errors both before and after the change — pre-existing, unchanged; `Popper.test-d.tsx` reports none |
| `yarn build` | `dist/cjs`, `dist/esm`, `dist/index.d.ts` built |

The one new test that passes pre-fix is the `EnvironmentProvider` identity test: it guards the new design rather than reproducing the original bug.

**Browser verification: blocked in this environment**

Attempted with a temporary fixture (`Menu portalled` + `flip` enabled through `slotProps.popper.modifiers`, trigger pinned to the viewport bottom) mounted via `{render('./popper-flip-regression')}` in `pages/components/menu/index.page.mdx`, against `next dev` on `127.0.0.1:3001` driven by Puppeteer.

Result: every docs page — including the untouched `/components/button/` — renders `#__next` with **0** element children, so no DOM exists to measure, and no reproduction was obtained either way. Evidence:

- all local chunks return 200 (`main.js`, `pages/_app.js`, `pages/components/button.js`);
- no `pageerror`, no console errors beyond React DevTools and HMR;
- the only failing requests are third-party (`matomo.xdr.trendmicro.com`, `cdn.jsdelivr.net`); aborting them via request interception changes nothing;
- `[HMR] Invalid message: {"action":"isrManifest",...} TypeError: Cannot read properties of undefined (reading 'components')`;
- `__NEXT_DATA__` reports `nextExport: true, autoExport: true`;
- `document.documentElement.style['color-scheme']` is `light` and `prefers-color-scheme: light` matches, so `_app.page.js`'s `if (!initialColorMode) return null` gate is not obviously the cause.

The fixture and the MDX edit were reverted; `git status` shows no docs changes. A future browser check should first find a harness where a known-good docs page actually hydrates (for example the production static export, or a minimal standalone page), then run Task 1's fixture. The RCA in §1.2 is therefore still **source-derived, not browser-proven**.

## Review verdict / 評估結論

**Feasible after correction. Do not execute the original plan unchanged.**

Material corrections:

1. `createPopper()` queues an initial microtask `update()`; Tonic then calls synchronous `forceUpdate()`. The original “measured exactly once” claim was false.
2. The adjacent `../floating-ui` checkout is actually `@popperjs/core@2.11.8`, not Floating UI. It has no `autoUpdate`, `ResizeObserver`, or `MutationObserver` integration.
3. `MenuContent` always passes a `placement` prop. Current `Popper` treats that as controlled and therefore does **not** feed a flipped placement into React state. Scrolling flips the existing Popper instance; it does not recreate it in the reported dropdown path.
4. P2 was incomplete: it must remove the controlled-placement early return and avoid a prop-change race. A state value keyed by the preferred placement is safer than a passive effect plus `useLatestRef`.
5. Manual observer refs duplicate Popper's modifier lifecycle. An internal modifier `effect` gives automatic cleanup on `destroy()` and `setOptions()`.
6. Ref detachment must call `cleanupPopper()`. Otherwise `unmountOnExit` without a transition, callback-ref replacement, and StrictMode ref replay can leave a detached instance and observer alive. Observer construction must also use the `useEnvironment().getWindow()` realm, not the global window.
7. The referenced dropdown demo exists only on linked branch `feat/dropdown`, not current `main`; that demo currently enables neither `portalled` nor `flip`. Use the explicit temporary fixture in Task 1.
8. P1 covers changes to the popper box. It does not cover reference-only resize or layout shift.
9. P3 stabilizes only Popper's omitted default. Overlay callers still construct merged modifier arrays inline and may recreate the instance on their own renders.
10. `SubmenuContent` keyboard close direction uses the requested context placement, not Popper's render-prop placement. This plan must not claim to fix flipped submenu keyboard direction.
11. P2 changes observable behavior for controlled consumers: today their render-prop `placement` is always the requested value, so `Popover`/`Tooltip` are not affected today; after P2 they receive the computed value. That is the intended fix, and it belongs in the release note.

## Global constraints

- Target production files: `packages/react/src/popper/Popper.js` and `packages/react/src/popper/__tests__/Popper.test.js` only.
- Keep `@popperjs/core@2.11.8`; do not migrate dependencies.
- Keep the explicit synchronous `popperInstance.forceUpdate()`.
- Never pass a computed placement to `createPopper()` or `setOptions()`.
- `placement` prop means the requested/preferred placement. Render-prop `placement` means Popper core's current computed placement.
- `ResizeObserver` remains optional: resolve it from `useEnvironment().getWindow()`, add no global polyfill, and do not fail when the environment window does not provide it.
- Browser reproduction and post-fix geometry checks are release gates. Mock-only tests are insufficient.
- Remove the temporary docs fixture before committing production changes.
- Use a dedicated `fix/<slug>` branch from `main` for the eventual PR.
- `rtk` is an optional local token-reducing wrapper used in this environment's agent instructions. Plain `yarn` and `git` are equivalent; if `rtk` is unavailable, drop the prefix.

---

## 1. Verified evidence and remaining hypothesis

### 1.1 Confirmed source behavior

- `packages/react/src/popper/Popper.js:112-165`
  - `setupPopper()` creates an instance with React state `placement` as the preferred input.
  - Tonic immediately calls synchronous `forceUpdate()`.
- `../floating-ui/src/createPopper.js:64-100,107-178,185`
  - construction calls `setOptions()`, which queues debounced `update()`;
  - `forceUpdate()` synchronously measures `state.rects.popper`;
  - every cycle seeds `state.placement` from `state.options.placement`.
- `../floating-ui/src/utils/debounce.js:3-13`
  - `update()` runs in a coalesced promise microtask.
- `packages/react/src/menu/MenuContent.js:158-172,174-219`
  - Menu disables `flip` by default;
  - a later consumer modifier with the same name can enable it;
  - Menu always passes requested `placement` and uses `Collapse` with `appear: true`.
- `packages/react/src/transitions/Collapse.js:8-31,80-134` and `packages/react/src/menu/MenuList.js:20-28`
  - the `Collapse` child starts with `height: 0` and grows while entering;
  - the measured outer Popper box can still contain `MenuList` padding, so its initial height is “collapsed content plus outer padding,” not necessarily exactly zero.
- `../floating-ui/src/modifiers/eventListeners.js:18-42`
  - Popper core observes ancestor scroll and window resize events, not element resize.
- `../floating-ui/src/modifiers/flip.js:56-64,122-124,161-165`
  - fallback priority derives from `state.options.placement`.

### 1.2 Root-cause hypothesis that Task 1 must prove

On first open, the creation-tick measurement cycles complete before `Collapse` reaches its final non-zero box. Since Popper core does not observe later element resize, `flip` does not run against the final height. A scroll event schedules another update with the real height and flips the existing instance.

This is strongly supported by source, but not browser-proven. The gate was **waived by the user** so that P1–P3 could proceed; the browser repro and the geometry check are still owed. If a future run does not reproduce this sequence, treat P1 as unvalidated and revise the RCA.

### 1.3 Corrected scroll path for Menu/Dropdown

```text
scroll
  → eventListeners schedules instance.update()
  → forceUpdate measures the current non-zero box
  → flip changes state.placement inside the existing instance
  → computeStyles/applyStyles update position and data-popper-placement
```

Because `MenuContent` passes `placement`, current `handlePopperUpdate` returns early. The Menu path does not call `setPlacement()` and does not recreate the instance after the flip.

---

## 2. Intended scope

### P1 — Required root fix

Add an internal Popper modifier whose `effect` observes `state.elements.popper` and calls `instance.update()` on size changes. Return `disconnect()` from the effect so Popper core owns teardown.

Also make callback-ref detachment call `cleanupPopper()`.

### P2 — Required semantic correction, implemented after P1 is proven

Separate:

- `preferredPlacement`: the consumer input passed to `createPopper()`;
- `computedPlacement`: the current core result reported to render-prop children.

Remove the `placementProp !== undefined` early return. Key computed state by the preferred placement so an actual prop change is visible immediately and a stale effect cannot overwrite a new computed result.

### P3 — Small stability correction

Use one module-level `defaultModifiers` array when the prop is omitted. This removes recreation caused only by the default parameter's changing identity.

### Explicitly out of scope

- Reference-element resize and layout-shift observation.
- Stabilizing inline merged modifier arrays in `MenuContent`, `SubmenuContent`, `PopoverContent`, and `TooltipContent`.
- Correcting flipped `SubmenuContent` keyboard close direction.
- Migrating to Floating UI `computePosition()` / `autoUpdate()`.

---

## 3. Acceptance criteria

1. With `portalled` and `flip` enabled, a `Menu` whose trigger is near the viewport bottom opens above it on the first open, without scroll or resize.
2. After closing and moving the trigger where space exists below, reopening chooses the requested bottom placement again.
3. Popper-element size changes call debounced `instance.update()`.
4. Ref detachment destroys the current instance and clears internal/external instance refs.
5. The observer disconnects through the modifier cleanup returned to Popper core.
6. Explicit `placement="bottom-start"` remains the `createPopper()` input even when the computed/rendered placement is `top-start`.
7. Omitted `placement` has the same requested-versus-computed behavior.
8. Changing the placement prop creates one replacement instance with the new preferred input; the previous computed placement is not fed back.
9. Rerendering a raw `Popper` with no `modifiers` prop does not recreate the instance solely because of the default value.
10. No `ResizeObserver loop` warning appears in the browser smoke with `matchWidth` both disabled and enabled.
11. The observer constructor comes from `useEnvironment().getWindow()`, so iframe and shadow-DOM environments do not silently fall back to the global realm.
12. Entry produces at most one `bottom-*` → `top-*` placement change, with no oscillation or blank frame.
13. A controlled consumer that reads the render-prop `placement` receives the computed value; `Popover` and `Tooltip` transform origins follow a flipped placement.

---

### Task 1: Prove the pre-fix browser sequence

**Files:**
- Temporarily create: `packages/react-docs/pages/components/menu/popper-flip-regression.js`
- Temporarily modify: `packages/react-docs/pages/components/menu/index.page.mdx`
- Do not commit either change.

**Interfaces:**
- Consumes: existing `Menu`, `MenuButton`, `MenuList`, `Collapse`, and Popper modifier API.
- Produces: pre-fix trace and geometry evidence; no persistent code.

- [ ] **Step 1: Add a temporary fixture with explicit `portalled` and `flip`**

```js
import { Box, Menu, MenuButton, MenuItem, MenuList } from '@tonic-ui/react';

const traceModifier = {
  name: 'tracePopperCycle',
  enabled: true,
  phase: 'afterWrite',
  fn: ({ state }) => {
    window.__popperFlipTrace = [
      ...(window.__popperFlipTrace ?? []),
      {
        height: state.rects.popper.height,
        placement: state.placement,
      },
    ];
  },
};

const App = () => (
  <Box minHeight="100vh" display="flex" alignItems="flex-end" pb="2x">
    <Menu portalled placement="bottom-start">
      <MenuButton>Open regression fixture</MenuButton>
      <MenuList
        slotProps={{
          popper: {
            modifiers: [
              { name: 'flip', enabled: true },
              traceModifier,
            ],
          },
        }}
      >
        {Array.from({ length: 8 }, (_, index) => (
          <MenuItem key={index}>Item {index + 1}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  </Box>
);

export default App;
```

Add this temporary render call under the Menu usage section:

```mdx
{render('./popper-flip-regression')}
```

- [ ] **Step 2: Start the docs server and reproduce three times**

Run from `packages/react-docs`:

```bash
rtk yarn dev
```

Open `/components/menu/` at a fixed 1280 × 720 viewport. Before each first open, reload the fixture and set `window.__popperFlipTrace = []`.

Required pre-fix evidence on all three runs:

- the settled popper rectangle has non-zero height;
- it still has a `bottom-*` `data-popper-placement` while overflowing the viewport;
- no trace cycle measured the settled height and produced `top-*`;
- a one-pixel scroll causes `data-popper-placement` to become `top-*` and places `popperRect.bottom <= triggerRect.top + 1`.

If the popper already opens above on any clean first run, stop. Capture the trace and revise §1.2; do not implement P1 from assumption.

- [ ] **Step 3: Preserve the pre-fix evidence and keep the fixture**

Record the trace and rectangle values in the implementation notes or PR body. Leave the temporary JS file and its MDX render call in place for Task 3 Step 4; do not commit them. Task 6 removes them.

---

### Task 2: Add failing P1 lifecycle tests

**Files:**
- Modify: `packages/react/src/popper/__tests__/Popper.test.js`

**Interfaces:**
- Consumes: Popper modifier objects passed to mocked `createPopper()`.
- Produces: failing tests for resize scheduling and ref-detach cleanup.

- [ ] **Step 1: Extend the Popper core mock**

Each returned instance must expose fresh `destroy`, `forceUpdate`, and `update` mocks.

```js
jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(() => ({
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
    update: jest.fn(),
  })),
}));
```

- [ ] **Step 2: Test the observer modifier contract in the configured DOM realm**

Import `EnvironmentProvider` from `../../environment`. Render Popper under a provider whose document has a distinct `defaultView.ResizeObserver`.

Use this environment setup:

```js
const observe = jest.fn();
const disconnect = jest.fn();
let resizeCallback;
const EnvResizeObserver = jest.fn((callback) => {
  resizeCallback = callback;
  return { observe, disconnect };
});
const envWindow = { ResizeObserver: EnvResizeObserver };
const envDocument = {
  nodeType: Node.DOCUMENT_NODE,
  defaultView: envWindow,
};

render(
  <EnvironmentProvider value={() => envDocument}>
    <Popper isOpen referenceRef={{ current: anchorEl }}>
      <PopperContent />
    </Popper>
  </EnvironmentProvider>
);
```

Find the `observePopperResize` modifier in `createPopper.mock.calls[0][2].modifiers`, invoke its `effect` with the rendered popper element and the mocked instance, then assert:

- the environment window's observer is constructed; the global observer is not used;
- `observe(popperElement)` runs once;
- invoking the captured `resizeCallback()` calls `instance.update()` once;
- invoking the returned modifier cleanup calls `disconnect()` once;
- when the environment window has no `ResizeObserver`, the effect returns `undefined` and does not throw.

Follow `packages/react/src/modal/__tests__/ModalOverlay.environment.test.js:12-41`; do not mutate or leak a global observer between tests.

- [ ] **Step 4: Test that environment identity churn does not recreate the instance**

Render Popper under an `EnvironmentProvider` whose `value` prop is a new inline function on every render, then rerender twice with unchanged Popper props. Assert `createPopper()` was still called once. This guards the `useLatestRef`-based modifier identity; a direct `[getWindow]` dependency fails this test.

- [ ] **Step 5: Test ref-detach cleanup**

Render an open `Popper` with stable `referenceRef`, `unmountOnExit`, and `willUseTransition={false}`. Rerender it closed. Assert that the current instance is destroyed and `popperRef.current` becomes `null`.
Update the existing placement-prop rerender test to assert that the first instance is destroyed before the replacement is created.

- [ ] **Step 6: Run the tests and confirm RED**

Run from `packages/react`:

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

Expected: the new observer modifier, provider-stability, and ref-detach assertions fail against current `main`; existing tests remain green.

---

### Task 3: Implement P1 with Popper-owned cleanup

**Files:**
- Modify: `packages/react/src/popper/Popper.js`
- Test: `packages/react/src/popper/__tests__/Popper.test.js`

**Interfaces:**
- Consumes: `useEnvironment().getWindow()` and Popper core's modifier-effect cleanup.
- Produces internal modifier `observePopperResize`; no public prop or type change.

- [ ] **Step 1: Add the environment-aware internal modifier**

Import `{ useEnvironment }` from `../environment` and `useLatestRef` from `@tonic-ui/react-hooks`. Inside `Popper`, create a modifier whose identity never changes:

```js
const { getWindow } = useEnvironment();
const getWindowRef = useLatestRef(getWindow);
const observePopperResizeModifier = useMemo(() => ({
  name: 'observePopperResize',
  enabled: true,
  effect: ({ state, instance }) => {
    const ResizeObserver = getWindowRef.current().ResizeObserver;
    if (typeof ResizeObserver !== 'function') {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      instance.update();
    });
    resizeObserver.observe(state.elements.popper);

    return () => {
      resizeObserver.disconnect();
    };
  },
}), [getWindowRef]);
```

Read `getWindow` through `useLatestRef` rather than depending on it directly. `EnvironmentProvider` memoizes its environment object on the identity of the `value` function it receives, so a consumer passing an inline `value={() => node}` gets a new `getWindow` on every render. Depending on it would produce a new modifier object, a new `setupPopper`, and a recreated popper instance on every render. `useLatestRef` returns a stable ref object, so the modifier identity is stable for the component's lifetime.

No `fn` and no `phase` are needed: `createPopper` guards both modifier callbacks with `typeof ... === 'function'` (`../floating-ui/src/createPopper.js:155-161` for `fn`, `:196-201` for `effect`). An `effect`-only modifier is valid and its cleanup is registered.

Insert it in Tonic's default modifier list before consumer modifiers, and include `observePopperResizeModifier` in `setupPopper` dependencies. Do not create a separate observer ref; Popper core already runs modifier-effect cleanup on `destroy()` and `setOptions()`.

- [ ] **Step 2: Clean up on callback-ref detachment**

```js
const refUpdater = useCallback((node) => {
  assignRef(nodeRef, node);
  assignRef(ref, node);

  if (node) {
    setupPopper();
  } else {
    cleanupPopper();
  }
}, [cleanupPopper, ref, setupPopper]);
```

Keep the defensive destroy at the start of `setupPopper()`.

- [ ] **Step 3: Run targeted tests and confirm GREEN**

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

All Task 2 tests must now pass: observer contract, provider identity stability, ref-detach cleanup, and the updated placement-prop rerender test.

- [ ] **Step 4: Repeat Task 1's browser check before P2/P3** — **pending**

Re-create the Task 1 fixture (it was reverted; see the execution log) on a harness where a known-good docs page hydrates. Restart the docs dev server, reload `/components/menu/`, and reset `window.__popperFlipTrace = []` before the first open.

Required result: first open settles at `top-*` without scroll; geometry is above the trigger; moving the trigger to provide room below and reopening returns to `bottom-*`. During entry, placement may change from `bottom-*` to `top-*` at most once; it must not oscillate, overflow after the transition settles, or produce a visible blank frame. Repeat with `matchWidth` enabled and confirm no repeated observer loop warning.

If P1 does not fix the real symptom, revert P1 and return to Task 1. Do not stack P2/P3 onto an unproven fix.

- [ ] **Step 5: Commit the root fix**

```bash
rtk git add packages/react/src/popper/Popper.js packages/react/src/popper/__tests__/Popper.test.js
rtk git commit -m "fix(react/popper): update position after content resize"
```

---

### Task 4: Add and implement requested-versus-computed placement semantics

**Files:**
- Modify: `packages/react/src/popper/Popper.js`
- Test: `packages/react/src/popper/__tests__/Popper.test.js`

**Interfaces:**
- Consumes: Popper core `state.placement`.
- Produces: preferred placement for core input; computed placement for render-prop output.

- [ ] **Step 1: Add failing behavior tests**

Add distinct tests for:

1. omitted `placement`: invoke `handlePopperUpdate.fn()` with `top-start`; child output becomes `top-start`, `createPopper()` input stays `bottom-start`, and the instance count stays one;
2. explicit `placement="bottom-start"`: the same computed `top-start` reaches the child despite the explicit prop;
3. prop change after a computed flip: rerender with `placement="left-start"`; exactly one replacement is created with `left-start`; invoke its modifier with `right-start`; child output becomes `right-start` without another replacement.

Pass the same module- or test-scoped `const stableModifiers = []` to every render in these three tests. This isolates P2 from the separate unstable-default defect handled in Task 5. Use `act()` when invoking modifier functions that update React state.

- [ ] **Step 2: Run and confirm RED**

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

Expected: the explicit-placement test remains at `bottom-start`; the omitted-placement test recreates with the computed placement.

- [ ] **Step 3: Replace the placement state model**

Remove the placement-sync `useEffect` and the controlled-placement early return. Remove the now-unused React `useEffect` import.

```js
const preferredPlacement = placementProp ?? defaultPlacement;
const [placementState, setPlacementState] = useState(() => ({
  preferredPlacement,
  computedPlacement: preferredPlacement,
}));
const placement = (placementState.preferredPlacement === preferredPlacement)
  ? placementState.computedPlacement
  : preferredPlacement;
```

Pass only `preferredPlacement` to `createPopper()` and include it, not reported `placement`, in `setupPopper` dependencies.

Inside `handlePopperUpdate`:

```js
if (nextPlacement) {
  setPlacementState((previous) => {
    if (
      previous.preferredPlacement === preferredPlacement &&
      previous.computedPlacement === nextPlacement
    ) {
      return previous;
    }

    return {
      preferredPlacement,
      computedPlacement: nextPlacement,
    };
  });
}
```

This keyed state prevents a passive prop-sync effect from overwriting the result reported synchronously by the new instance.

- [ ] **Step 4: Run and confirm GREEN**

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

- [ ] **Step 5: Commit the semantic correction**

```bash
rtk git add packages/react/src/popper/Popper.js packages/react/src/popper/__tests__/Popper.test.js
rtk git commit -m "fix(react/popper): separate preferred and computed placement"
```

---

### Task 5: Stabilize the omitted modifiers default

**Files:**
- Modify: `packages/react/src/popper/Popper.js`
- Test: `packages/react/src/popper/__tests__/Popper.test.js`

- [ ] **Step 1: Add the failing stability test**

Rerender a raw Popper with the same stable `referenceRef`, no `modifiers` prop, and unchanged placement. Assert `createPopper()` was called once. Current `modifiers = []` makes this fail because the callback ref changes identity.

- [ ] **Step 2: Add the stable constant**

```js
const defaultModifiers = [];
```

Use `modifiers = defaultModifiers` in prop destructuring.

- [ ] **Step 3: Run and confirm GREEN**

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

- [ ] **Step 4: Commit the stability correction**

```bash
rtk git add packages/react/src/popper/Popper.js packages/react/src/popper/__tests__/Popper.test.js
rtk git commit -m "fix(react/popper): stabilize default modifiers"
```

---

### Task 6: Final verification, cleanup, and release artifact

**Files:**
- Verify: `packages/react/src/popper/Popper.js`
- Verify: `packages/react/src/popper/__tests__/Popper.test.js`
- Create after PR exists: `.changeset/tonic-ui-pr-<PR_NUMBER>.md`

- [ ] **Step 1: Run full package verification**

P2 changes the placement reported to render-prop children for every controlled consumer (`MenuContent`, `SubmenuContent`, `PopoverContent`, `TooltipContent`, `AutocompleteList`, `DatePickerContent`). Run the whole package, not only the Popper suite. From `packages/react`:

```bash
rtk yarn test
rtk yarn lint
rtk yarn test:types
rtk yarn build
```

Expected: the full suite passes. The Popper suite must show the P1/P2/P3 regression tests plus the 11 pre-existing tests. If any `Popover`/`Tooltip`/`Menu` snapshot changes, inspect it: a changed `transformOrigin` or `data-popper-placement` is the intended correction only when a modifier actually reported a different placement. Do not re-pin a snapshot without explaining the change.

- [ ] **Step 2: Run the final browser smoke with the fixture still present**

Repeat Task 1 on the still-present fixture for the final, post-P2/P3 behavior. Capture:

- first-open `data-popper-placement`;
- trigger and popper rectangles;
- reopen placement after room becomes available below;
- console output proving no `ResizeObserver loop` warning with and without `matchWidth`;
- the number of placement changes during entry.

- [ ] **Step 3: Remove the temporary fixture and confirm a clean scope**

Delete `packages/react-docs/pages/components/menu/popper-flip-regression.js` and its MDX render call. Confirm `git status` shows no changes under `packages/react-docs`.

- [ ] **Step 4: Review final scope**

The production diff must contain only Popper implementation/tests. No Floating UI migration, reference observation, overlay modifier memoization, or submenu keyboard change.

- [ ] **Step 5: Push code and open the PR before creating the changeset**

Repository policy requires the PR number in the filename. Do not create a descriptive placeholder changeset filename.

- [ ] **Step 6: Add the patch changeset to the same PR branch**

Create `.changeset/tonic-ui-pr-<PR_NUMBER>.md`:

```md
---
"@tonic-ui/react": patch
---

fix(react/popper): update flipped placement after popper content resizes

- `Popper` now re-runs its update cycle when the popper element changes size, so a `flip`-enabled overlay flips on the first open instead of waiting for a scroll.
- The render-prop `placement` now reports the current computed placement. `Popover` and `Tooltip` transform origins follow the actual placement when a flip occurs. Types are unchanged.
```

The second bullet is a behavior change for consumers that read `placement` from `Popper`'s render prop; keep it in the release note rather than treating it as an internal detail.

Commit and push it after the PR exists.

---

## 中文摘要（重點回顧，非逐句對照）

> 本節只摘要。唯一的實作細節來源是上面的任務清單；修改實作時請只改任務清單，避免雙份文件各自漂移。

**評估結論：可行，但原 plan 不能照抄執行。** 根因方向正確，時序證據錯了一項，重現步驟在 `main` 上不存在。

**必須修正的四點**

1. `createPopper()` 建立 instance 時就會排入一次 microtask `update()`，Tonic 另外同步呼叫 `forceUpdate()`。「只量測一次」的說法不成立；成立的說法是：**量測只發生在建立的那一輪，之後 popper 自己的 box 變大就沒有人再量**。
2. `../floating-ui` 這份 checkout 其實是 `@popperjs/core@2.11.8`，不是 Floating UI。整包沒有 `autoUpdate`、`ResizeObserver`、`MutationObserver` 整合。
3. `MenuContent` 一定會傳 `placement` prop，所以 Popper 走「controlled」分支：翻轉結果**不會**寫回 React state，捲動只是讓既有的 instance 重新計算並改寫樣式，不會 destroy 重建。原 plan 的「捲動 → setPlacement → 重建」鏈在 Tonic 的元件上不會發生。
4. 原 plan 指的 `/components/dropdown/` + `render('./search')` 不存在於 `main`（該 demo 僅存在於 `feat/dropdown` 分支，且沒有開啟 `portalled` 或 `flip`）。因此 Task 1 改用一個明確的臨時 fixture，且**必須先在瀏覽器重現並記錄證據**，才准動 production code。

**修法**

- **P1（根因）**：用一個 internal modifier 的 `effect` 觀察 `state.elements.popper`，尺寸變動時呼叫 `instance.update()`；cleanup 回傳 `disconnect()`，讓 Popper core 在 `destroy()` / `setOptions()` 時自動清理。`ResizeObserver` 由 `useEnvironment().getWindow()` 取得（不是 global），以支援 iframe / shadow DOM 情境。另外補上 ref detach → `cleanupPopper()`，避免節點卸載後 instance 與 observer 仍存活。
- **P2（語意）**：把「要求的 placement」與「算出來的 placement」分離。`createPopper()` 只吃 requested；render prop 回報 computed。移除 `placementProp !== undefined` 的 early return，並用「以 preferred 為 key 的 state」避免 prop 變更時被舊的 computed 值蓋掉。
- **P3（穩定性）**：`modifiers` 的預設值改用 module 級 `defaultModifiers`，消除預設參數每次 render 換 identity 造成的重建。注意：這只修 Popper 自己的預設值；`MenuContent` 等內部元件仍然每次 render 傳新的陣列。

**驗收重點**：第一次開啟就要在上方（不需捲動）、第二次開啟在有空間時回到下方、entry 過程最多只切換一次且不閃爍、`matchWidth` 開與關都不得出現 `ResizeObserver loop` 警告、ref 卸載要完整清理。**單元測試（jsdom 無 `ResizeObserver`、mock 掉 popper core）只能證明 wiring，不能證明幾何修正**；瀏覽器驗證是出貨門檻。

**執行順序**：Task 1 先重現並留下證據（fixture 保留到 Task 3）→ Task 2/3 做 P1 並再次驗證 → Task 4 P2 → Task 5 P3 → Task 6 跑完整 package 測試、最終瀏覽器驗證、移除 fixture、開 PR、補 changeset。

**不在範圍**：reference 元素尺寸變化、layout shift、內部元件 modifiers 陣列 memo 化、submenu 翻轉後的鍵盤方向、遷移到 Floating UI。

---

## Residual risks

- Without `ResizeObserver` on the configured environment window, behavior remains unchanged. The browser support decision is intentional; this plan adds no polyfill.
- A popper-size-writing consumer modifier can produce repeated observer deliveries. `instance.update()` is microtask-debounced, but this does not prove a loop is impossible; the browser console gate covers the supported built-in configuration.
- The observer can change placement partway through the 133 ms `Collapse` animation. ResizeObserver delivery occurs before paint, which limits stale frames but does not prove the motion is visually acceptable; the Task 3 browser gate permits at most one placement transition and rejects oscillation or a blank frame.
- A queued observer callback after teardown is safe because Popper core's destroyed instance makes `forceUpdate()` return early.
- Reference-only resize can still leave position or `matchWidth` stale until an ancestor event causes an update. `matchWidth` refreshes on any later Popper update, but P1 does not create that update for a reference-only change.
- Overlay callers can still recreate Popper by passing a new modifier array identity on rerender. P2 removes recreation caused by computed placement feedback only.
- A flipped submenu can still use the requested direction for its keyboard close key. Handle that in a separate accessibility fix if submenu flip is enabled.

## Alternatives rejected

| Alternative | Reason |
| :--- | :--- |
| One passive `update()` after mount | Timing-dependent and misses later popper-size changes. |
| Transition `onEntered` callback | Couples generic Popper behavior to one transition implementation and misses other content changes. |
| Manual observer ref in `Popper.js` | Duplicates modifier effect lifecycle and made teardown paths easy to miss. |
| Feed computed placement through `setOptions()` | `setOptions()` makes it the next preferred placement and re-runs modifier effects; it does not preserve requested priority. |
| Floating UI `autoUpdate()` | Not present in `@popperjs/core@2.11.8`; migration is a separate dependency/API change. |
