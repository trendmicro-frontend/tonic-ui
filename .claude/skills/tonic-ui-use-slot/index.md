# useSlot Migration Skill

Migrate Tonic UI components from `TransitionComponent`/`TransitionProps` (and `PopperComponent`/`PopperProps`) to the `useSlot` hook with `slots`/`slotProps` API.

## When to Use

- Migrating a component that uses `TransitionComponent` / `TransitionProps`
- Migrating a component that uses `PopperComponent` / `PopperProps`
- Adding slot support to a new component

## The useSlot API

```js
const [SlotElement, slotProps] = useSlot({
  name,              // Optional — slot name (e.g. 'transition') for dev error messages
  ownerDisplayName,  // Optional — parent component displayName for dev error messages
  props,             // Optional — internal component props (include ref here); slotProps take precedence
  slot,              // The resolved element type for this slot
  slotProps,         // The resolved slot props from the consumer (e.g. slotProps.transition ?? TransitionProps)
});
```

Returns: `[ElementType, mergedProps]`

**Merge order (later wins):** `props` → `slotProps`

**Import:** `useSlot` lives in `'../utils/useSlot'` — it is internal to the `react` package, not exported from `@tonic-ui/react-hooks`.

```js
import useSlot from '../utils/useSlot';
```

## Handler Placement

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
| component's forwarded `ref` | `props`: `ref: combinedRef` |

### Where does `in` go?

Always set explicitly after the spread — the component owns open/close state:

```jsx
<TransitionSlot {...transitionSlotProps} in={isOpen} />
```

## Step-by-Step Migration

### 1. Accept new props, deprecate old ones

```js
const {
  TransitionComponent, // deprecated
  TransitionProps,     // deprecated
  slots = {},
  slotProps = {},
  children,
  ...rest
} = useDefaultProps({ props: inProps, name: 'ComponentName' });

{ // deprecation warning
  const prefix = `${ComponentName.displayName}:`;
  useOnceWhen(() => {
    warnDeprecatedProps('TransitionComponent', {
      prefix,
      alternative: 'slots.transition',
      willRemove: true,
    });
  }, TransitionComponent !== undefined);
  useOnceWhen(() => {
    warnDeprecatedProps('TransitionProps', {
      prefix,
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  }, TransitionProps !== undefined);
}
```

### 2. Replace TransitionComponent JSX with useSlot

Resolve `slot` and `slotProps` inline — new API takes precedence over deprecated props:

**Before:**
```jsx
<TransitionComponent
  appear={true}
  {...TransitionProps}
  ref={combinedRef}
  in={isOpen}
  onExited={callAll(safeToRemove, TransitionProps?.onExited)}
>
  {children}
</TransitionComponent>
```

**After:**
```jsx
const [TransitionSlot, transitionSlotProps] = useSlot({
  name: 'transition',
  ownerDisplayName: ComponentName.displayName,
  props: {
    ref: combinedRef,
    appear: true,
    // other non-coordinated internal props
  },
  slot: slots.transition ?? TransitionComponent ?? DefaultTransition,
  slotProps: slotProps.transition ?? TransitionProps,
});

return (
  <TransitionSlot
    {...transitionSlotProps}
    in={isOpen}
    onExited={callAll(safeToRemove, transitionSlotProps.onExited)}
  >
    {children}
  </TransitionSlot>
);
```

### 3. For Popper + Transition components (Menu, Tooltip, Popover)

The Popper's `onEnter`/`onExited` come from its render prop. Chain them with the user's transition handlers after the spread:

```jsx
const [TransitionSlot, transitionSlotProps] = useSlot({
  name: 'transition',
  ownerDisplayName: ComponentName.displayName,
  props: {
    ref: combinedRef,
    appear: true,
  },
  slot: slots.transition ?? TransitionComponent ?? DefaultTransition,
  slotProps: slotProps.transition ?? TransitionProps,
});

// Inside Popper render prop:
<PopperComponent ...>
  {({ transition }) => {
    const { in: inProp, onEnter: popperOnEnter, onExited: popperOnExited } = transition;
    return (
      <TransitionSlot
        {...transitionSlotProps}
        in={inProp}
        onEnter={callAll(popperOnEnter, transitionSlotProps.onEnter)}
        onExited={callAll(popperOnExited, transitionSlotProps.onExited)}
      >
        {children}
      </TransitionSlot>
    );
  }}
</PopperComponent>
```

### 4. Update imports

```js
// Internal useSlot — NOT from react-hooks
import useSlot from '../utils/useSlot';

// Add to react-hooks import (only what's actually used)
import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';

// Add to utils import (only what's actually used)
import { callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
```

## Components to Migrate

| Component | File | Slots needed |
|---|---|---|
| ModalContent | `modal/ModalContent.js` | `transition` ✅ done |
| DrawerContent | `drawer/DrawerContent.js` | `transition` |
| AccordionContent | `accordion/AccordionContent.js` | `transition` |
| MenuContent | `menu/MenuContent.js` | `transition`, `popper` |
| TooltipContent | `tooltip/TooltipContent.js` | `transition`, `popper` |
| PopoverContent | `popover/PopoverContent.js` | `transition`, `popper` |

## Reference Implementation

`ModalContent` (`packages/react/src/modal/ModalContent.js`) is the canonical example.

Key rules carried from the migration:
1. `slots.transition` overrides `TransitionComponent` — new API takes precedence (`slots.transition ?? TransitionComponent ?? Default`)
2. `slotProps.transition` overrides `TransitionProps` — new API takes precedence (`slotProps.transition ?? TransitionProps`)
3. `in` is always set after `{...transitionSlotProps}` — component owns open/close state
4. The component's forwarded `ref` goes inside `props` (`props: { ref: combinedRef, ... }`)
5. Static internal props (ref, aria attrs, role, tabIndex, appear) go in `props`
6. DOM event handlers go after the spread using `callEventHandlers(transitionSlotProps.handler, internalFn)`
7. Lifecycle callbacks (onExited, onEnter) go after the spread using `callAll(internalFn, transitionSlotProps.handler)`
8. `useSlot` is an internal utility (`../utils/useSlot`), not exported from `@tonic-ui/react-hooks`
