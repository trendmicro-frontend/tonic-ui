# Tonic UI Slot API and Handler Authoring

Paths starting with `packages/` are relative to the repository root. Component
paths such as `modal/ModalContent.js` are relative to `packages/react/src/`.

## The useSlot API

```js
const [SlotElement, slotProps] = useSlot({
  name,              // Optional — slot name (e.g. 'transition') for dev error messages
  ownerName,         // Optional — parent component displayName for dev error messages
  props,             // Optional — internal component props (include ref here); slotProps take precedence
  slot,              // The resolved element type for this slot
  slotProps,         // The resolved slot props (e.g. { ...TransitionProps, ...slotProps.transition })
});
```

Returns: `[ElementType, mergedProps]`

**Merge order (later wins):** `props` → `slotProps`

**Integration status:** this checkout's `useSlot` composes refs only. The newer
Tonic One implementation also composes `__sx`; that is the target contract below.
Check `packages/react/src/slot/useSlot.js` before relying on that behavior.

**Target contract: `ref` and `__sx` are composed, not replaced.** For every other key, `slotProps` overrides
`props`. But the two stacking channels are merged: `ref` via `useMergeRefs` (component ref +
caller ref both fire) and `__sx` via `composeSx` (the component's base `__sx` in `props` stays
*below* the caller's `slotProps.__sx`). So put a component's base styling in `props.__sx` and
let `useSlot` keep it under any consumer slot `__sx` — never strip or hand-merge `__sx` at the
call site. `__sx` is only emitted when at least one side supplies it (non-Box slot elements
don't get a spurious `__sx`).

**Legacy-prop merge (call site):** the deprecated prop and the new slot prop are **merged**, not replaced — the new API wins on conflict (MUI-style):

```js
slotProps: { ...TransitionProps, ...slotProps.transition }   // ✅ merge — both apply
// NOT: slotProps.transition ?? TransitionProps              // ❌ replace — drops the deprecated prop
```

A consumer mid-migration who sets both the deprecated prop and the new `slotProps` keeps both. The **element** still resolves by precedence (`slots.X ?? XComponent ?? Default`) since an element type cannot be merged.

**Dev warning:** `useSlot` warns (dev-only) only when the resolved `slot` (the element type) is `undefined` — e.g. `useSlot: slots.root is required but was not provided in InputControl.` (or `… slot element is required …` when `name` is omitted). `slotProps` is **optional**: an undefined `slotProps.x` is treated as `{}` and never warns, so a **new slot with no legacy prop** can pass `slotProps: slotProps.x` directly — no `{ ...legacy, ...new }` merge and no `?? {}` guard needed.

> **Package scope.** Code examples below use `@tonic-ui/*` as a placeholder for this design system's published npm scope — substitute the scope used in the repo you're working in. The `useSlot` API, merge semantics, and the internal `'../slot'` path do not depend on the scope.

**Import:** `useSlot` is a **named** export. From the published `react` package externally; within that package itself, from `'../slot'` (the internal path). It is *not* a default export — `import useSlot from '../slot'` will bind `undefined`.

```js
// In components inside packages/react (scope-independent):
import { useSlot } from '../slot';

// In external code (react-docs, user projects):
import { useSlot } from '@tonic-ui/react';
```

## Authoring a Slot: props & handlers

These rules apply to any slot you wire with `useSlot` — both new slots and migrated ones.

### Static internal props → `props`

Non-handler props that the component sets internally:

```js
props: {
  ref: combinedRef,
  appear: !!modalContext,
  'aria-modal': ariaAttr(true),
  role: 'dialog',
  tabIndex,
},
```

This includes **computed props derived from context** (e.g. `direction` in DrawerContent, where the value is derived from `placement`):

```js
const transitionDirection = { left: 'right', right: 'left', top: 'down', bottom: 'up' }[placement];

const [TransitionSlot, transitionSlotProps] = useSlot({
  props: {
    ref: combinedRef,
    appear: !!drawerContext,
    direction: transitionDirection,  // computed from context, not from the user
  },
  slot: slots.transition ?? TransitionComponent ?? Slide,
  slotProps: { ...TransitionProps, ...slotProps.transition },
});
```

This also includes **internal easing/timeout defaults** (e.g. MenuContent, SubmenuContent, DatePickerContent). The user can still override these via `slotProps.transition` because `slotProps` wins over `props`:

```js
props: {
  ref: combinedRef,
  appear: true,
  easing: 'linear',
  timeout: { enter: 133, exit: Math.floor(133 * 0.7) },
},
```

### Coordinated handlers → after the spread on the JSX element

Event handlers that must chain with the user's version are placed **after** `{...transitionSlotProps}` on the element:

- Use **`callAll`** when both handlers must always fire (e.g. lifecycle callbacks like `onExited`)
- Use **`callEventHandlers`** when the chain should stop if `event.preventDefault()` is called (e.g. DOM event handlers like `onClick`, `onKeyDown`)

```jsx
<TransitionSlot
  {...transitionSlotProps}
  in={isOpen}
  onClick={callEventHandlers(transitionSlotProps.onClick, (event) => event.stopPropagation())}
  onKeyDown={callEventHandlers(transitionSlotProps.onKeyDown, (event) => { /* escape */ })}
  onExited={callAll(safeToRemove, transitionSlotProps.onExited)}
/>
```

**Critical rule: preserve original handler chaining exactly.**

| Original code | Slot approach |
|---|---|
| `onExited={callAll(internalFn, TransitionProps?.onExited)}` | After spread: `onExited={callAll(internalFn, transitionSlotProps.onExited)}` |
| `onClick={internalFn}` | After spread: `onClick={callEventHandlers(transitionSlotProps.onClick, internalFn)}` |
| `onKeyDown={internalFn}` | After spread: `onKeyDown={callEventHandlers(transitionSlotProps.onKeyDown, internalFn)}` |
| `appear={!!context}` | `props`: `appear: !!context` |
| `role="dialog"`, `tabIndex`, aria attrs | `props` |
| computed prop (e.g. `direction`) | `props` |
| component's forwarded `ref` | `props`: `ref: combinedRef` |

### Where does `in` go?

Always set explicitly after the spread — the component owns open/close state:

```jsx
<TransitionSlot {...transitionSlotProps} in={isOpen} />
```

