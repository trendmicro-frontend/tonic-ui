# Popper First-Open `flip` RCA and Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `systematic-debugging` for Task 1, `test-driven-development` for Tasks 2–5, and `verification-before-completion` for Task 6. Track each checkbox in order.

**Goal:** Make an enabled Popper `flip` modifier react to popper-content size changes, while preserving the consumer-requested placement as Popper's preferred input.

**Architecture:** First prove the browser timing with a real `Menu` + `Collapse` fixture. Then add popper-element resize observation as an internal Popper modifier, so Popper core owns effect cleanup. Separately correct requested-versus-computed placement state and the unstable empty `modifiers` default.

**Tech Stack:** React 18/19, `@popperjs/core@2.11.8`, `ResizeObserver`, Jest, Testing Library, Tonic UI docs.

**Spec:** This document, especially §1–§3; no separate design document.

**Date:** 2026-09-15

**Status:** P1–P3 **implemented** on branch `fix/react-popper-flip-on-content-resize` (draft PR #1207), with `.changeset/tonic-ui-pr-1207.md` added, and unit-verified. The browser reproduction (Task 1) was **waived by the user** after the headless attempt failed for environmental reasons, and the browser geometry check (Task 3 Step 4 / Task 6 Step 2) remains **unverified**. Treat the end-to-end symptom fix as unconfirmed until a browser check runs.

> ## ⚠️ Correction (2026-09-18) — P1 as first written was dead code
>
> The `observePopperResize` modifier originally declared **no `phase`**. popper.js's `orderModifiers` (`@popperjs/core@2.11.8`, `lib/utils/orderModifiers.js`) keeps only modifiers whose `phase` is one of its nine known phases, so the modifier was **dropped from `state.orderedModifiers` before `runModifierEffects()` could call its `effect`**. The `ResizeObserver` was never constructed, no popper element was observed, and no re-measure happened — the P1 mechanism did not exist at runtime.
>
> **Fix:** declare `phase: 'read'`. The modifier has no `fn`, so it adds no per-cycle work beyond effect registration.
>
> **Proof (tonic-ui, this branch):** the new `should pass modifiers that popper.js keeps in its ordered modifiers` test runs the **real** popper.js and asserts `observePopperResize` is in `instance.state.orderedModifiers`. Red-green verified by deleting and restoring the `phase` line — without it the ordered list is
> `["popperOffsets", "offset", "flip", "preventOverflow", "arrow", "hide", "computeStyles", "eventListeners", "applyStyles", "handlePopperUpdate"]` (no `observePopperResize`) and the test fails; with it the full Popper suite is 20/20.
>
> **Why the other resize test did not catch it:** `should re-run the update cycle when the popper element changes size` invokes `modifier.effect` by hand, so it verifies the effect body, not that popper.js runs it. It passed while the modifier was being discarded.
>
> **Also corrected:** the §1.2 "measure-once / zero-height" analysis below is a real characteristic of the code, but it was not what broke first-open flipping first; the dropped modifier was. This correction was found downstream in Tonic One (PR #550) and back-ported here together with the `ownerWindow` naming.

### Execution log

**Implemented**

- `packages/react/src/popper/Popper.js`
  - internal `observePopperResize` modifier observing `state.elements.popper`, declared with `phase: 'read'` (see the correction notice above), resolving the constructor through `useEnvironment().getWindow()` read via `useLatestRef` so `EnvironmentProvider` value churn cannot recreate the instance;
  - `refUpdater` calls `cleanupPopper()` on detachment;
  - `preferredPlacement` is the only `createPopper()` input. The render function receives `{ placement: preferredPlacement, computedPlacement }`; `computedPlacement` comes from the keyed `placementState`. This keeps the pre-existing meaning of the render-prop `placement` and exposes the computed value additively;
  - the `placementProp !== undefined` short-circuit is gone, so a computed placement is never fed back as the preferred input;
  - `modifiers = defaultModifiers` (module-level array) replaces the per-render `[]` default;
  - JSDoc for `placement`, `PopperChildProps`, and `PopperInstance.update` updated.
- `packages/react/src/popover/PopoverContent.js` and `packages/react/src/tooltip/TooltipContent.js` — the render function now reads `computedPlacement` for `transformOrigin`, so the scale origin follows the side the popper actually sits on.
- `packages/react/src/popper/__tests__/Popper.test.js` — mock now exposes `update`; 9 tests added (20 total), including one that runs the real popper.js to assert `observePopperResize` survives `orderModifiers`; JSX uses `Box` rather than a raw `div`, matching the component library convention.
- `packages/react/src/popover/__tests__/PopoverContent.placement.test.js` and `packages/react/src/tooltip/__tests__/TooltipContent.placement.test.js` — new files that mock `@popperjs/core`, report a flipped placement through `handlePopperUpdate`, and assert the grow origin follows it. They are separate files because a file-scoped popper mock would disturb the existing snapshot suites.
- `packages/react-docs/pages/components/{popover,tooltip,autocomplete,menu,date-pickers/date-picker}/index.page.mdx` — the `placement` prop tables now state that it is the preferred placement and that Popper.js may choose a different one when `flip` is enabled. `Popper` itself has no docs page, so its JSDoc is the contract.

**Consumer impact (verified)**

Only `Popover`/`Tooltip` read a placement-dependent style, and only for `transformOrigin` (`transformOrigin` appears nowhere else in `packages/react/src`). `Grow` animates `opacity` and `transform` only and never changes layout size, so the popper's box is final on the first measurement and `flip` decides before the enter transition starts; reading `computedPlacement` therefore makes the grow direction correct from the first frame, whereas the preferred value is wrong exactly when a flip fires.

| Consumer | Passes to Popper | Placement-dependent use | Effect of this change |
| :--- | :--- | :--- | :--- |
| `popover/PopoverContent.js:277,311` | context placement (preferred) | `transformOrigin` | reads `computedPlacement`; grow origin follows a flip |
| `tooltip/TooltipContent.js:248,263` | context placement (preferred) | `transformOrigin` | same as Popover |
| `menu/MenuContent.js:183,225` | context placement (preferred) | none in the popper (render-prop `placement` destructured, unused) | none |
| `menu/Menu.js:206,211` | context placement (preferred) | `mapPlacementToDirection` → `direction` → `MenuToggleIcon` | none; still the preferred placement |
| `menu/SubmenuContent.js:133,207,249` | context placement (preferred) | keyboard close key | none; still the preferred placement |
| `menu/SubmenuList.js:22` → `menu/styles.js:157-181` | — | inline absolute positioning of the non-portalled submenu | none; still the preferred placement |
| `date-pickers/DatePicker/DatePickerContent.js:144` | context placement (preferred) | none (no `placement` in its styles) | none |
| `autocomplete/AutocompleteList.js:98` | context placement (preferred); `flip` disabled (`:46-49`) | none | none |

No consumer writes the reported value back into a `placement` prop or context, so there is no feedback loop. `data-popper-placement` continues to be written imperatively by popper.js on the popper element and by `handlePopperUpdate` on the arrow; React re-renders do not overwrite it because the consumer's rendered value is unchanged, so arrow styling is unaffected.

**Known gaps left in place (pre-existing, only reachable when a consumer enables `flip`)**

`Menu` and `Submenu` disable `flip` by default (`MenuContent.js:160-163`, `SubmenuContent.js:174-179`), so these only surface if a consumer opts in through `slotProps.popper.modifiers`:

- `MenuToggleIcon` direction is derived from the preferred placement in `Menu.js:206`, and the icon lives in the toggle, outside the popper. Fixing it would require lifting `computedPlacement` back into the menu context, re-rendering the whole menu subtree on every flip.
- `SubmenuContent`'s keyboard close key (`:133`) and `useSubmenuListStyle`'s inline positioning (`menu/styles.js:157-181`) also read the preferred placement.

**Verified**

| Check | Result |
| :--- | :--- |
| `yarn test --testPathPattern="__tests__/Popper.test.js"` | 20/20 pass |
| `should pass modifiers that popper.js keeps in its ordered modifiers` with `phase: 'read'` deleted | fails — `observePopperResize` absent from `instance.state.orderedModifiers` (RED proven) |
| Same tests against `main`'s `Popper.js` | 7 of the 8 added tests fail (RED confirmed against `cd71567145`) |
| `observePopperResize` dep changed from `[getWindowRef]` to `[getWindow]` | identity test fails (`3` instances instead of `1`) — the `useLatestRef` design is load-bearing |
| `yarn test` (whole `packages/react`) | 120 suites, 832 tests, 90 snapshots — all pass, no snapshot updates needed |
| `PopoverContent`/`TooltipContent` origin tests reverted to read `placement` | both fail (`Expected` vs. the centred origin) — the consumer wiring is covered |
| `yarn lint` | 0 errors; no new warnings |
| `yarn test:types` | 208 errors both before and after the change — pre-existing, unchanged; `Popper.test-d.tsx` reports none |
| `yarn build` | `dist/cjs`, `dist/esm`, `dist/index.d.ts` built |
| Independent review: placement state machine (races, batching, close/reopen, loops, dep array) | no defect found; the keyed-state invariant, the destroyed-instance `forceUpdate` early return, and the reference-equality bail-out all hold |
| Independent review: consumer impact across all six Popper-based components | only `Popover`/`Tooltip` read the argument; no feedback loop; no snapshot pins the old behavior |

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
11. Render-prop naming, as decided: `placement` keeps its meaning (the preferred placement) and the computed placement is exposed additively as `computedPlacement`. P2's remaining behavior change is for an uncontrolled `<Popper>`, which no longer feeds the computed placement back as the preferred input and therefore no longer recreates the instance on a flip. `Popover`/`Tooltip` now read `computedPlacement` for `transformOrigin`, which is the one placement-dependent visual in the library.

## Global constraints

- Production files: `packages/react/src/popper/Popper.js`, `packages/react/src/popover/PopoverContent.js`, `packages/react/src/tooltip/TooltipContent.js`, plus their tests. Nothing else.
- Keep `@popperjs/core@2.11.8`; do not migrate dependencies.
- Keep the explicit synchronous `popperInstance.forceUpdate()`.
- Never pass a computed placement to `createPopper()` or `setOptions()`.
- `placement` prop means the preferred placement and is the only `createPopper()` input. Render-prop `placement` means the same preferred placement; the placement computed by Popper.js is exposed additively as `computedPlacement`.
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
- `computedPlacement`: the current core result, exposed to render-prop children.

The render function receives `{ placement: preferredPlacement, computedPlacement }`. Keeping `placement` on the preferred value preserves the pre-existing contract for every consumer, and `computedPlacement` carries the value that a `flip` or `preventOverflow` produced. Remove the `placementProp !== undefined` early return. Key computed state by the preferred placement so an actual prop change is visible immediately and a stale report cannot overwrite a new computed result.

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
6. Explicit `placement="bottom-start"` remains the `createPopper()` input, and the render function still receives it as `placement`.
7. The render function receives the placement computed by Popper.js as `computedPlacement`.
8. Changing the placement prop creates one replacement instance with the new preferred input; the previous computed placement is not fed back.
9. Rerendering a raw `Popper` with no `modifiers` prop does not recreate the instance solely because of the default value.
10. No `ResizeObserver loop` warning appears in the browser smoke with `matchWidth` both disabled and enabled.
11. The observer constructor comes from `useEnvironment().getWindow()`, so iframe and shadow-DOM environments do not silently fall back to the global realm.
12. Entry produces at most one `bottom-*` → `top-*` placement change, with no oscillation or blank frame.
13. `Popover` and `Tooltip` grow from the edge that faces the trigger, including when a flip moves the popper to the other side.

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
- Produces: `preferredPlacement` for the core input; render-prop children receive `{ placement: preferredPlacement, computedPlacement }`.

- [ ] **Step 1: Add failing behavior tests**

Add distinct tests for:

1. omitted `placement`: invoke `handlePopperUpdate.fn()` with `top-start`; `placement` stays `bottom-start`, `computedPlacement` becomes `top-start`, the `createPopper()` input stays `bottom-start`, and the instance count stays one;
2. explicit `placement="bottom-start"`: same assertions with the prop set;
3. prop change after a computed flip: rerender with `placement="left-start"`; exactly one replacement is created with `left-start`, and both `placement` and `computedPlacement` are `left-start`; invoke the new instance's modifier with `right-start`; `placement` stays `left-start` and `computedPlacement` becomes `right-start`, with no further replacement.

Render the two values into separate test nodes (`popper-placement`, `popper-computed-placement`) using `Box`, and pass the same module- or test-scoped `const stableModifiers = []` to every render in these three tests. This isolates P2 from the separate unstable-default defect handled in Task 5. Use `act()` when invoking modifier functions that update React state.

- [ ] **Step 2: Run and confirm RED**

```bash
rtk yarn test --testPathPattern="__tests__/Popper.test.js"
```

Expected: `computedPlacement` is `undefined`, and the omitted-placement case recreates the instance with the computed placement.

- [ ] **Step 3: Replace the placement state model**

Remove the placement-sync `useEffect` and the controlled-placement early return. Remove the now-unused React `useEffect` import.

```js
const preferredPlacement = placementProp ?? defaultPlacement;
const [placementState, setPlacementState] = useState(() => ({
  preferredPlacement,
  computedPlacement: preferredPlacement,
}));
const computedPlacement = (placementState.preferredPlacement === preferredPlacement)
  ? placementState.computedPlacement
  : preferredPlacement;
```

Report both values to the render function:

```js
const childProps = { placement: preferredPlacement, computedPlacement };
```

Pass only `preferredPlacement` to `createPopper()` and include it, not `computedPlacement`, in `setupPopper` dependencies.

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

`Popover`/`Tooltip` read `computedPlacement`, and `Popper`'s render prop gained a field, so run the whole package rather than the Popper suite alone. From `packages/react`:

```bash
rtk yarn test
rtk yarn lint
rtk yarn test:types
rtk yarn build
```

Expected: the full suite passes — 120 suites, 831 tests, 90 snapshots. The Popper suite must show the 8 regression tests plus the 11 pre-existing tests (19 total). If any `Popover`/`Tooltip`/`Menu` snapshot changes, inspect it; under jsdom no overflow exists, so the requested and computed placements coincide and no snapshot should move.

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

The production diff must contain only `popper/Popper.js`, `popover/PopoverContent.js`, `tooltip/TooltipContent.js` and their tests. No Floating UI migration, reference observation, overlay modifier memoization, submenu keyboard change, or `MenuToggleIcon` change.

- [ ] **Step 5: Push code and open the PR before creating the changeset**

Repository policy requires the PR number in the filename. Do not create a descriptive placeholder changeset filename.

- [ ] **Step 6: Add the patch changeset to the same PR branch**

Create `.changeset/tonic-ui-pr-<PR_NUMBER>.md`:

```md
---
"@tonic-ui/react": patch
---

fix(react/popper): update the position after the popper content resizes

- `Popper` re-runs its update cycle when the popper element changes size, so a `flip`-enabled overlay flips on the first open instead of waiting for a scroll.
- `Popper`'s render function also receives `computedPlacement`, the placement Popper.js actually used. The `placement` prop and the render-prop `placement` keep meaning the preferred placement. `Popover` and `Tooltip` use `computedPlacement` so they grow from the edge facing the trigger.
- `Popper` no longer recreates its instance when Popper.js reports a different placement, and it now destroys the instance when the popper element is detached while the component stays mounted.
```

The `computedPlacement` addition and the changed instance lifecycle are what external consumers need to know; keep both in the release note rather than treating them as internal details.

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
- **P2（語意）**：把「要求的 placement」與「算出來的 placement」分離。`createPopper()` 只吃 requested；render prop 同時給 `placement`（= 要求值，維持原語意）與 `computedPlacement`（= popper 實際算出來的值）。移除 `placementProp !== undefined` 的 early return，並用「以 preferred 為 key 的 state」避免 prop 變更時被舊的 computed 值蓋掉。Popover/Tooltip 的 `transformOrigin` 改讀 `computedPlacement`：那是全庫唯一「跟實際方位有關的視覺樣式」，而 Grow 不改 layout 尺寸 → 動畫開始前 flip 就已決定，讀 computed 才會在第一幀就從正確的那一邊長出來（讀要求值時，貼近視窗邊緣的彈窗會從錯的邊長出來）。Menu 的 `MenuToggleIcon` 方向、submenu 的關閉鍵與 inline 定位仍讀要求值，但那些元件預設停用 flip，屬既有議題、另案處理。
- **P3（穩定性）**：`modifiers` 的預設值改用 module 級 `defaultModifiers`，消除預設參數每次 render 換 identity 造成的重建。注意：這只修 Popper 自己的預設值；`MenuContent` 等內部元件仍然每次 render 傳新的陣列。

**驗收重點**：第一次開啟就要在上方（不需捲動）、第二次開啟在有空間時回到下方、entry 過程最多只切換一次且不閃爍、`matchWidth` 開與關都不得出現 `ResizeObserver loop` 警告、ref 卸載要完整清理。**單元測試（jsdom 無 `ResizeObserver`、mock 掉 popper core）只能證明 wiring，不能證明幾何修正**；瀏覽器驗證是出貨門檻。

**執行順序**：Task 1 先重現並留下證據（fixture 保留到 Task 3）→ Task 2/3 做 P1 並再次驗證 → Task 4 P2 → Task 5 P3 → Task 6 跑完整 package 測試、最終瀏覽器驗證、移除 fixture、開 PR、補 changeset。

**不在範圍**：reference 元素尺寸變化、layout shift、內部元件 modifiers 陣列 memo 化、submenu 翻轉後的鍵盤方向、遷移到 Floating UI。

---

## Residual risks

- Without `ResizeObserver` on the configured environment window, behavior remains unchanged. The browser support decision is intentional; this plan adds no polyfill.
- A popper-size-writing consumer modifier can produce repeated observer deliveries. `instance.update()` is microtask-debounced, but this does not prove a loop is impossible; the browser console gate covers the supported built-in configuration.
- The observer can change placement partway through the 133 ms `Collapse` animation. ResizeObserver delivery occurs before paint, which limits stale frames but does not prove the motion is visually acceptable; the Task 3 browser gate permits at most one placement transition and rejects oscillation or a blank frame.
- `Popover`/`Tooltip` `transformOrigin` now follows `computedPlacement`. The origin is not animated, so content that resizes *during* the enter transition can still re-anchor the scale origin once; in the normal case the box size is final before the transition starts, so there is no change mid-flight.
- `MenuToggleIcon` direction, `SubmenuContent`'s keyboard close key, and `useSubmenuListStyle`'s inline submenu positioning still read the preferred placement. They only mislead when a consumer enables `flip` on those components, which the defaults disable.
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
