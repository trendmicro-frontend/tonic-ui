# useSlot Migration Implementation Plan

> **For agentic workers:** Each task below is dispatched to a **fresh Sonnet subagent**. Every subagent MUST invoke the `/tonic-ui-use-slot` skill first — it is the authoritative implementation spec. This plan documents per-component deltas, the required tests, and verification. Each task is **test-first** (write failing acceptance tests → migrate → green). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate 11 Tonic UI components from the deprecated `TransitionComponent`/`TransitionProps` (and `PopperComponent`/`PopperProps`) API to the `useSlot` hook with `slots`/`slotProps`.

**Architecture:** Each component resolves its slot inline (`slots.transition ?? TransitionComponent ?? Default`), passes internal/computed props through `useSlot`'s `props` (slotProps win), and chains coordinated handlers + `in` after the spread. This is a **behavior-preserving refactor** — existing tests and snapshots must stay green. `ModalContent` (`packages/react/src/modal/ModalContent.js`) is the already-migrated canonical reference.

**Tech Stack:** React, `@tonic-ui/react`, `useSlot` (`../utils/useSlot`), jest + React Testing Library + snapshot tests, eslint.

## Acceptance criteria (per component) — validated by TESTS, not by inspection

1. **New API works:** a custom `slots.transition` element is rendered, and `slotProps.transition` is forwarded onto it. (Popper components: same for `slots.popper` / `slotProps.popper`.)
2. **Precedence:** `slotProps.transition` overrides the component's internal defaults — a user-supplied value (e.g. `data-*`, `timeout`, `className`) reaches the slot.
3. **Backward compatible + deprecation:** passing the deprecated `TransitionComponent`/`TransitionProps` (and `PopperComponent`/`PopperProps`) still works AND fires a one-time deprecation warning via `warnDeprecatedProps` with the correct `prefix`/`alternative`.
4. **Behavior preserved:** all pre-existing tests for the component remain green; rendered output (snapshots) is unchanged.

A task is **done** only when: the new acceptance tests pass, the pre-existing suite stays green, the snapshot diff is empty (or explainably trivial), and lint has no new errors.

---

## Conventions every subagent follows

1. **First action:** invoke `/tonic-ui-use-slot`. Then read `packages/react/src/modal/ModalContent.js` (reference impl) and the existing test file for the component.
2. **Working dir for jest/eslint:** `packages/react`.
3. **Precedence / merge:** element resolves by precedence `slots.X ?? XComponent ?? Default`; props are **merged** MUI-style `{ ...XProps, ...slotProps.X }` (new wins on conflict, both apply) — NOT `??` replace.
4. **`in` always goes after the spread** — the component owns open/close state, even if the original code spread `TransitionProps` last.
5. **Imports:** `import useSlot from '../utils/useSlot';` (internal, NOT from react-hooks). Add `warnDeprecatedProps` from `@tonic-ui/utils`, `useOnceWhen` from `@tonic-ui/react-hooks`, and `callAll`/`callEventHandlers` only if actually used.
6. **Deprecation block** for every migrated prop (`TransitionComponent`, `TransitionProps`, and where present `PopperComponent`, `PopperProps`) — copy the exact pattern from the skill.
7. **Lint:** fix eslint **errors** only; leave warnings (e.g. `dot-notation`) untouched.
8. **Do not** touch unrelated code, refactor adjacent logic, or change behavior. Out of scope: `AccordionToggleIcon`, `MenuToggleIcon`, `TreeItemToggleIcon`, `PopoverArrowComponent`/`PopoverArrowProps` (leave as-is).

---

## Test recipe (reuse for every task)

**Migration tests live in a SEPARATE, dedicated file** — do NOT add them to the component's existing `*.test.js`. Create one file per migrated component:

```
packages/react/src/<dir>/__tests__/<Component>.slots.test.js
```

(e.g. `modal/__tests__/ModalOverlay.slots.test.js`, `drawer/__tests__/DrawerContent.slots.test.js`.) This keeps the migration's `slots`/`slotProps`/deprecation coverage isolated, parallel-safe across tasks, and easy to identify. Leave the pre-existing component test files untouched. Each new file contains a `describe('slots / slotProps', ...)` block and a `describe('deprecated props', ...)` block. Templates below — adapt the component name, the public wrapper used to render it, and the prop names. Existing references: `src/highlight/__tests__/Highlight.test.js` (slot override pattern) and `src/modal/__tests__/Modal.test.js` (deprecation pattern).

**Mock `warnDeprecatedProps` at the top of the NEW test file (each file needs its own mock):**
```js
import { warnDeprecatedProps } from '@tonic-ui/utils';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));
```

**A. New API — `slots.transition` renders a custom transition:**
```js
it('should render a custom transition via slots.transition', () => {
  // A pass-through transition stand-in: renders children immediately so we can assert on the DOM.
  const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
    <div ref={ref} data-testid="custom-transition" {...rest}>{children}</div>
  ));

  render(/* component rendered open, with slots={{ transition: CustomTransition }} */);

  expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
});
```

**B. Precedence — `slotProps.transition` is forwarded and wins:**
```js
it('should forward slotProps.transition to the transition element', () => {
  const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
    <div ref={ref} data-testid="custom-transition" {...rest}>{children}</div>
  ));

  render(/* slots={{ transition: CustomTransition }} slotProps={{ transition: { 'data-foo': 'bar' } }} */);

  expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
});
```

**C. Backward compatible — deprecated `TransitionComponent` still works AND warns:**
```js
describe('deprecated props', () => {
  it('should still render with TransitionComponent and warn', () => {
    const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
      <div ref={ref} data-testid="legacy-transition" {...rest}>{children}</div>
    ));

    render(/* TransitionComponent={CustomTransition} */);

    expect(screen.getByTestId('legacy-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: '<ComponentDisplayName>:',
      alternative: 'slots.transition',
      willRemove: true,
    });
  });

  it('should warn when TransitionProps is used', () => {
    render(/* TransitionProps={{}} */);
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: '<ComponentDisplayName>:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});
```

**For Popper components (Tasks 6–9), add the same A/B/C trio for the `popper` slot** (`slots.popper` renders custom popper, `slotProps.popper` forwarded, `PopperComponent`/`PopperProps` warn with `alternative: 'slots.popper'` / `'slotProps.popper'`). A custom popper stand-in must invoke its render-prop child so the transition still mounts:
```js
const CustomPopper = React.forwardRef(({ children, ...rest }, ref) => (
  <div ref={ref} data-testid="custom-popper" {...rest}>
    {typeof children === 'function'
      ? children({ placement: 'bottom', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </div>
));
```

> Each subagent must render the component through its **public API** the same way the existing tests do (e.g. wrap in the provider/parent the existing tests use, set the open/expanded state). Read the existing test file first and mirror its render setup — do not invent a new harness.

---

## Verification (run for every task, from `packages/react`)

```bash
# 1. New acceptance tests + pre-existing suite both pass
yarn jest src/<dir> --watchAll=false

# 2. No UNINTENDED snapshot churn — a migration should not change rendered output
git diff -- 'src/<dir>/__tests__/__snapshots__'

# 3. Lint the changed file(s) — zero new errors
yarn eslint src/<dir>/<File>.js src/<dir>/__tests__/<Test>.js
```

---

## Parallelization & dispatch order

All 11 components live in independent files, so tasks are **fully parallelizable** — with one constraint: **components in the same directory share a `__snapshots__` folder and test file**, so a single subagent must own each directory to avoid write conflicts. Tasks are grouped accordingly.

Recommended waves (simple → complex, so review calibrates on easy ones first):

- **Wave 1 (Pattern A, trivial):** Task 1 (modal), Task 2 (drawer)
- **Wave 2 (Pattern A, special cases):** Task 3 (accordion), Task 4 (tree), Task 5 (toast)
- **Wave 3 (Pattern B, Popper+Transition):** Task 6 (menu), Task 7 (tooltip), Task 8 (popover), Task 9 (date-pickers)

Within a wave, dispatch all tasks concurrently.

---

## Task 1: modal/ModalOverlay (Pattern A — trivial)

**Files:**
- Modify: `packages/react/src/modal/ModalOverlay.js`
- Test: `packages/react/src/modal/__tests__/Modal.test.js` (extend; `warnDeprecatedProps` already mocked there)

Default transition: `Fade`. Mirror `ModalContent` closely (same directory, same `useAnimatePresence`/`safeToRemove`/`modalContext` shape).

**`props` (internal):** `ref: combinedRef`, `appear: !!modalContext`.
**After spread:** `{...styleProps} {...rest} in={modalContext ? isOpen : true} onExited={callAll(safeToRemove, transitionSlotProps.onExited)}`.

Note: the current file builds an `overlayProps` object (`ref`, `...styleProps`, `...rest`) and spreads it onto `<TransitionComponent>`. Decompose that into the `props`/after-spread split above; drop the intermediate `overlayProps` object if it no longer carries its weight.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `Modal.test.js`; add recipe tests A/B/C for `ModalOverlay` (render an open `<Modal>` and assert on the overlay). Prefix = `ModalOverlay:`.
- [ ] Run `yarn jest src/modal --watchAll=false` → new tests FAIL (slots not supported yet)
- [ ] Add `slots`/`slotProps` to destructure; add deprecation block; replace `<TransitionComponent>` with `useSlot` + `<TransitionSlot>`; update imports (add `useOnceWhen`, `warnDeprecatedProps`; keep `callAll`)
- [ ] Run `yarn jest src/modal --watchAll=false` → all PASS; then snapshot diff + lint (Verification, `<dir>` = `modal`)
- [ ] Commit: `feat(react): migrate ModalOverlay to slots/slotProps API`

---

## Task 2: drawer/DrawerContent + drawer/DrawerOverlay (Pattern A)

**One subagent owns both files (shared `drawer/__snapshots__` + `Drawer.test.js`).**

**Files:**
- Modify: `packages/react/src/drawer/DrawerContent.js`, `packages/react/src/drawer/DrawerOverlay.js`
- Test: `packages/react/src/drawer/__tests__/Drawer.test.js` (extend; `warnDeprecatedProps` already mocked there)

### DrawerContent — default `Slide`, **computed `direction`**
The drawer computes a transition `direction` from `placement` (e.g. `{ left: 'right', right: 'left', top: 'down', bottom: 'up' }[placement]`). Context-derived → put in `props`, NOT after the spread:
```js
props: { ref: combinedRef, appear: !!drawerContext, direction: transitionDirection },
```
`in` after spread (`in={drawerContext ? isOpen : true}` — match the file's existing logic).

### DrawerOverlay — default `Fade` (same shape as ModalOverlay)
`props: { ref: combinedRef, appear: !!drawerContext }`; `onExited={callAll(safeToRemove, transitionSlotProps.onExited)}` after spread.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + both drawer files + `Drawer.test.js`; add recipe tests A/B/C for **both** `DrawerContent` (prefix `DrawerContent:`) and `DrawerOverlay` (prefix `DrawerOverlay:`)
- [ ] Run `yarn jest src/drawer --watchAll=false` → new tests FAIL
- [ ] Migrate `DrawerContent` (computed `direction` → `props`); migrate `DrawerOverlay`; update imports in both
- [ ] Run `yarn jest src/drawer --watchAll=false` → all PASS; snapshot diff + lint (`<dir>` = `drawer`)
- [ ] Commit: `feat(react): migrate DrawerContent and DrawerOverlay to slots/slotProps API`

---

## Task 3: accordion/AccordionContent (Pattern A — context-optional fallback)

**Files:**
- Modify: `packages/react/src/accordion/AccordionContent.js`
- Test: `packages/react/src/accordion/__tests__/Accordion.test.js` (extend; add the `warnDeprecatedProps` mock if not present)

Default transition: `Collapse`. Renders a plain `<Box>` when there is **no** accordion context — leave that fallback branch UNCHANGED. Migrate only the context-present branch. See the skill's "Context-optional fallback" section.

**`props`:** `ref`, `appear: false`, `'aria-hidden': ariaAttr(!context?.isExpanded)`, `'aria-labelledby': context?.accordionToggleId`, `id: context?.accordionContentId`, `role: 'region'` (match the actual attrs in the file).
**After spread:** `{...rest} in={context.isExpanded}`.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `AccordionContent.js` + the accordion test file; add recipe tests A/B/C (render an expanded `<Accordion>` with context). Prefix = `AccordionContent:`. Also add one assertion that the **no-context fallback still renders a `<Box>`** (regression guard).
- [ ] Run `yarn jest src/accordion --watchAll=false` → new tests FAIL
- [ ] Add `slots`/`slotProps` + deprecation block; call `useSlot` BEFORE the `if (!context) return <Box .../>` early return (hooks run unconditionally); leave the fallback `<Box>` untouched; replace the context-present `<TransitionComponent>` with `<TransitionSlot>`; update imports
- [ ] Run `yarn jest src/accordion --watchAll=false` → all PASS; snapshot diff + lint (`<dir>` = `accordion`)
- [ ] Commit: `feat(react): migrate AccordionContent to slots/slotProps API`

---

## Task 4: tree/TreeItem (Pattern A — wraps expandable children only)

**Files:**
- Modify: `packages/react/src/tree/TreeItem.js`
- Test: `packages/react/src/tree/__tests__/Tree.test.js` (extend; add the `warnDeprecatedProps` mock if not present)

Default transition: `Collapse`. The `<TransitionComponent>` wraps only the expandable children (inside `<Descendant>`), NOT the whole component. The outer `<Box role="treeitem">` is untouched.

**Current state (read carefully):** TreeItem does NOT yet destructure `slots`/`slotProps` and has NO deprecation block — add both. Current JSX:
```jsx
<TransitionComponent appear={false} in={isExpanded} role="group" unmountOnExit={true} {...TransitionProps}>
```
The original spreads `TransitionProps` **last**, letting the user override `in`. Per skill rule, the migrated version puts `in` **after** the spread (component owns state).

**`props`:** `appear: false`, `role: 'group'`, `unmountOnExit: true`. (No internal `ref`/`combinedRef` is passed to the transition here — `combinedRef` belongs to the outer Box. Do not invent one.)
**After spread:** `in={isExpanded}`.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `TreeItem.js` + the tree test file; add recipe tests A/B/C for a `<TreeItem>` that has children (so the expandable branch renders). Prefix = `TreeItem:`.
- [ ] Run `yarn jest src/tree --watchAll=false` → new tests FAIL
- [ ] Add `slots = {}`, `slotProps = {}` to destructure; remove `TransitionComponent = Collapse` default and resolve via `slots.transition ?? TransitionComponent ?? Collapse`; add deprecation block (`prefix = ${TreeItem.displayName}:`); replace the `<TransitionComponent>` inside `<Descendant>` with `<TransitionSlot>` (keep `in` after spread); update imports (add `useOnceWhen`, `warnDeprecatedProps`)
- [ ] Run `yarn jest src/tree --watchAll=false` → all PASS; snapshot diff + lint (`<dir>` = `tree`)
- [ ] Commit: `feat(react): migrate TreeItem to slots/slotProps API`

---

## Task 5: toast/ToastManager (Pattern A — transition inside `.map`)

**Files:**
- Modify: `packages/react/src/toast/ToastManager.js`
- Test: `packages/react/src/toast/__tests__/ToastManager.test.js` (extend; add the `warnDeprecatedProps` mock if not present)

Default transition: `ToastTransition` (currently `TransitionComponent = ToastTransition` default at the destructure, ~line 50). The transition renders **inside a nested `toasts.map(...)`** (~lines 240–257), wrapped by `<ToastTransitionGroup>`. There is **no `useAnimatePresence`** here and **`in` is effectively always `true`** per toast (the transition group controls mount/unmount).

**Key sizing note:** `useSlot` is a hook — call it ONCE at the top level (near the other hooks) to get `[TransitionSlot, transitionSlotProps]`; do NOT call it inside `.map`. Inside the map, use `<TransitionSlot {...transitionSlotProps} ...>` with per-toast props (`key`, `in`, the toast's data/handlers) applied after the spread.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `ToastManager.js` (esp. lines 40–60, 225–262) + the existing test (note it already renders with `state`/toasts and uses a `data-testid="custom-container"` pattern); add recipe tests A/B/C — render `ToastManager` with at least one toast so the map produces a transition. Prefix = `ToastManager:`.
- [ ] Run `yarn jest src/toast --watchAll=false` → new tests FAIL
- [ ] Add `slots`/`slotProps`; resolve `slots.transition ?? TransitionComponent ?? ToastTransition` (remove the `= ToastTransition` default); add deprecation block; call `useSlot` at top level; replace `<TransitionComponent>` in the map with `<TransitionSlot>` (per-toast props after spread); update imports
- [ ] Run `yarn jest src/toast --watchAll=false` → all PASS; snapshot diff + lint (`<dir>` = `toast`)
- [ ] Commit: `feat(react): migrate ToastManager to slots/slotProps API`

---

## Task 6: menu/MenuContent + menu/SubmenuContent (Pattern B — Popper + Transition)

**One subagent owns both files (shared `menu/__snapshots__` + test files). They follow the SAME pattern.**

**Files:**
- Modify: `packages/react/src/menu/MenuContent.js`, `packages/react/src/menu/SubmenuContent.js`
- Test: `packages/react/src/menu/__tests__/` (extend the relevant test file; add the `warnDeprecatedProps` mock if not present)

Both have BOTH a Popper slot and a Transition slot. Default transition: `Collapse`; default popper: `Popper`. See the skill's "Popper + Transition" section.

**Two deprecation blocks** each: `TransitionComponent`/`TransitionProps` → `slots.transition`/`slotProps.transition`, AND `PopperComponent`/`PopperProps` → `slots.popper`/`slotProps.popper`.

**Popper slot `props`:** the existing internal popper props (`ref`, `aria-labelledby`, `id`, `isOpen`, `placement`, `referenceRef`, `role`, `tabIndex`, `unmountOnExit`, `usePortal: false`, `willUseTransition`, `zIndex`) — copy from the file.
**Transition slot `props`:** `ref: combinedRef`, `appear: true`, plus internal `easing`/`timeout` defaults (e.g. `easing: 'linear'`, `timeout: { enter: 133, exit: Math.floor(133 * 0.7) }`) — copy the actual values from the file. These stay overridable because `slotProps` wins.

**CRITICAL — `modifiers` merge after spread** (cannot go in `props`, base value is memoized):
```jsx
<PopperSlot
  {...popperSlotProps}
  modifiers={[...popperModifiers, ...ensureArray(popperSlotProps?.modifiers)]}
  onBlur={callEventHandlers(onBlurProp, eventHandler.onBlur)}
  onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
  {...styleProps}
  {...rest}
>
  {({ placement, transition }) => {
    const { in: inProp, onEnter, onExited } = transition;
    return (
      <TransitionSlot
        {...transitionSlotProps}
        in={inProp}
        onEnter={callAll(onEnter, transitionSlotProps.onEnter)}
        onExited={callAll(onExited, transitionSlotProps.onExited)}
      >
        {children}
      </TransitionSlot>
    );
  }}
</PopperSlot>
```
Preserve the original handler chaining exactly (match the variable names in each file). Use whatever `ensureArray` source the repo already uses (`@tonic-ui/utils` or `ensure-type`).

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + both menu files + the menu test file; add the **transition** recipe trio (A/B/C) AND the **popper** recipe trio (custom popper stand-in must invoke its render-prop child — see recipe) for `MenuContent`. Prefixes = `MenuContent:`. (SubmenuContent: at minimum add the deprecation-warning tests with prefix `SubmenuContent:`; replicate slot tests if the existing harness makes it practical.)
- [ ] Run `yarn jest src/menu --watchAll=false` → new tests FAIL
- [ ] Migrate `MenuContent`: popper slot + transition slot, two deprecation blocks, explicit `modifiers` merge; migrate `SubmenuContent` identically; update imports in both (`useSlot`, `useOnceWhen`, `warnDeprecatedProps`, `callAll`, `callEventHandlers`, `ensureArray`)
- [ ] Run `yarn jest src/menu --watchAll=false` → all PASS; snapshot diff + lint (`<dir>` = `menu`)
- [ ] Commit: `feat(react): migrate MenuContent and SubmenuContent to slots/slotProps API`

---

## Task 7: tooltip/TooltipContent (Pattern B — render-prop children + `arrow` slot)

**Files:**
- Modify: `packages/react/src/tooltip/TooltipContent.js`
- Modify: `packages/react/src/tooltip/Tooltip.js` (parent threading — see below)
- Test: `packages/react/src/tooltip/__tests__/TooltipContent.slots.test.js` (separate migration test file)

Same Popper + Transition structure as Task 6. Default transition: `Grow`. **Difference:** children are a **render function** `(state, { ref, style }) => <Box ... />`, not React nodes — passes through `useSlot` transparently (skill's "Render-prop children" section). Keep the render-prop body intact; only the wrapper element type + merged props change.

**`arrow` slot:** TooltipContent also renders `<TooltipArrowComponent {...TooltipArrowProps} />`. Migrate it to `slots.arrow ?? TooltipArrowComponent ?? TooltipArrow` / `slotProps.arrow ?? TooltipArrowProps` (no internal `props` to inject), add the two deprecation warnings, and remove the `= TooltipArrow` default from the destructure. See the skill's "The `arrow` slot" section.

**Parent threading:** `Tooltip.js` renders `TooltipContent` internally and forwards the deprecated props. Drop its `TooltipArrowComponent = TooltipArrow` (and the now-unused `TooltipArrow` import); `slots`/`slotProps` are already threaded so the `arrow` slot flows through.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `TooltipContent.js` + `Tooltip.js` + the tooltip test file; add transition trio + popper trio + **arrow trio** (custom popper stand-in must call its render-prop child; arrow defaults on). Render a visible/open tooltip. Prefix = `TooltipContent:`.
- [ ] Run `yarn jest src/tooltip --watchAll=false` → new tests FAIL
- [ ] Migrate popper + transition + arrow slots (default transition `Grow`); three deprecation blocks (transition/popper/arrow); explicit `modifiers` merge; preserve render-prop children; thread `Tooltip.js`; update imports
- [ ] Run `yarn jest src/tooltip --watchAll=false` → all PASS; snapshot diff (`<dir>` = `tooltip`)
- [ ] Commit: `feat(react): migrate TooltipContent to slots/slotProps API` (+ `feat(react): add arrow slot to TooltipContent` if done as a follow-up)

---

## Task 8: popover/PopoverContent (Pattern B — render-prop children + `arrow` slot)

**Files:**
- Modify: `packages/react/src/popover/PopoverContent.js`
- Test: `packages/react/src/popover/__tests__/PopoverContent.slots.test.js` (separate migration test file)

Same as Task 7 (default transition `Grow`, render-prop children). **`arrow` slot:** PopoverContent renders `<PopoverArrowComponent {...PopoverArrowProps} />`. Migrate it to `slots.arrow ?? PopoverArrowComponent ?? PopoverArrow` / `slotProps.arrow ?? PopoverArrowProps`, add the two deprecation warnings, and drop the `= PopoverArrow` default. **No parent threading needed** — `PopoverContent` is a user-facing child (not rendered internally by `Popover`), so `slots`/`slotProps`/deprecated props reach it directly.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `PopoverContent.js` + the popover test file; add transition trio + popper trio + **arrow trio** (custom popper stand-in calls render-prop child; arrow defaults on). Render an open popover. Prefix = `PopoverContent:`.
- [ ] Run `yarn jest src/popover --watchAll=false` → new tests FAIL
- [ ] Migrate popper + transition + arrow slots (default transition `Grow`); three deprecation blocks; explicit `modifiers` merge; preserve render-prop children; update imports
- [ ] Run `yarn jest src/popover --watchAll=false` → all PASS; snapshot diff (`<dir>` = `popover`)
- [ ] Commit: `feat(react): migrate PopoverContent to slots/slotProps API` (+ `feat(react): add arrow slot to PopoverContent` if done as a follow-up)

---

## Task 9: date-pickers/DatePicker/DatePickerContent (Pattern B)

**Files:**
- Modify: `packages/react/src/date-pickers/DatePicker/DatePickerContent.js`
- Test: **create** `packages/react/src/date-pickers/__tests__/DatePicker.test.js` (no test dir exists yet) — include the `warnDeprecatedProps` mock and the recipe trios. Mirror the render setup of another DatePicker story/usage; if rendering the full open calendar is impractical in this harness, at minimum cover acceptance criteria 1–3 (slots render, slotProps forwarded, deprecation warnings) by rendering the open content.

Same Popper + Transition structure as Task 6 (default transition `Collapse`). **Difference:** this file already imports/uses `useEventCallback` (from `@tonic-ui/react-hooks`) for `onKeyDown`, and does NOT currently import `useOnceWhen` — **add `useOnceWhen` to the existing react-hooks import**. Keep the `useEventCallback` handler logic; route it through `callEventHandlers` after the spread if it was previously passed directly to the Popper.

- [ ] **Test first:** Invoke `/tonic-ui-use-slot`; read `ModalContent.js` + `DatePickerContent.js`; create the test file with transition trio + popper trio (custom popper stand-in calls render-prop child). Prefix = `DatePickerContent:`.
- [ ] Run `yarn jest src/date-pickers --watchAll=false` → new tests FAIL
- [ ] Migrate popper slot + transition slot; two deprecation blocks (add `useOnceWhen` to the react-hooks import); explicit `modifiers` merge; preserve `useEventCallback` handlers; update imports
- [ ] Run `yarn jest src/date-pickers --watchAll=false` → all PASS; lint (`yarn eslint` the component + new test)
- [ ] Commit: `feat(react): migrate DatePickerContent to slots/slotProps API`

---

## Final integration check (after all tasks merge)

From `packages/react`:
```bash
yarn jest --watchAll=false                    # full suite green
git diff --stat -- 'src/**/__snapshots__'     # review every snapshot change deliberately
yarn eslint --ext .js,.jsx,.mjs src/{modal,drawer,accordion,tree,toast,menu,tooltip,popover,date-pickers}
```
Confirm all components have tests proving: (a) `slots`/`slotProps` render + forward, (b) deprecated props still work and warn once, (c) identical rendered output (no behavioral snapshot churn).

---

## Task 10: input/InputControl (`input` + `root` slots) — ✅ done

A full sweep of the package for `*Component` / `*Props` injection pairs found one more genuine candidate beyond transition/popper/arrow:

- **`InputControl` (`input/InputControl.js`)** — deprecated `inputComponent` (= `InputBase`) + deprecated `inputProps` → `slots.input` / `slotProps.input`; plus a **new `root` slot** (`slots.root ?? Box` / `slotProps.root`) for the outer `<Box>`, matching MUI's `InputBase` which exposes both `root` and `input`.

**Public Export:** `useSlot` has been moved from the internal `utils/useSlot.js` to `slot/index.js` and is now exported publicly from `@tonic-ui/react`. Within the `react` package itself, components import it from `'../slot'` (the internal path). External code (react-docs, user projects) imports it via `import { useSlot } from '@tonic-ui/react'`.

Both `inputComponent` and `inputProps` are deprecated and fire deprecation warnings. The merge pattern remains the same (`{ ...inputProps, ...slotProps.input }`), with `slotProps.input` winning on conflict, and both sets of props apply to the slot element.

Different from the mechanical recipe because `getInputProps()` is a **public contract** (render-prop form `children({ getInputProps })`) and the focus-state handlers chain the user's handlers:
- `const resolvedInputProps = useMemo(() => ({ ...inputProps, ...slotProps.input }), [inputProps, slotProps.input])` feeds the `input` slot's `slotProps` and the four `handleClick/Blur/Change/Focus` handlers (`resolvedInputProps?.onX`).
- `getInputProps()` spreads the resolved `input` slot props, then re-applies the forced `onBlur/onChange/onFocus` (component-owned, chaining inside).
- Root slot's coordinated `onClick` after the spread: `callEventHandlers(rootSlotProps.onClick, handleClick)`.
- Tests (`input/__tests__/InputControl.slots.test.js`): input A/B/C, root D/E, **merge F** (legacy `inputProps` + `slotProps.input` both apply, new wins), handler-chaining G, render-prop H.

Not candidates: `WrappedComponent` (HOC internal in `form-control/withFormControl.js`); standalone `*Props` prop-bag forwarders with no paired `*Component` (`scrollViewProps`, `selectProps`, `portalProps`, `linearProgressBarProps`, `circularProgressRootProps`, `datePickerToggleProps`, `treeItemProps`, …) — prop forwarding, not element swaps. (`Radio`/`Checkbox`/`Switch` expose their own `inputProps` for a hidden input but have no `inputComponent` — a possible future `slots.input`, separate decision.)
