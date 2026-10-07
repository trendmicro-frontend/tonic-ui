# Tonic UI Slot Migration Examples

Paths starting with `packages/` are relative to the repository root. Component
paths such as `modal/ModalContent.js` are relative to `packages/react/src/`.

## Migration

Migrate a component from the deprecated `*Component` / `*Props` pairs to the `slots` / `slotProps` API. Resolve `slot` by precedence (`slots.x ?? XComponent ?? Default`) and `slotProps` by merge (`{ ...XProps, ...slotProps.x }`) inline, so a consumer mid-migration who still passes the deprecated prop keeps working.

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

For components that also have `PopperComponent`/`PopperProps`, add the same deprecation block:

```js
const {
  PopperComponent,    // deprecated
  PopperProps,        // deprecated
  TransitionComponent, // deprecated
  TransitionProps,     // deprecated
  slots = {},
  slotProps = {},
  ...
} = useDefaultProps({ ... });

{ // deprecation warning
  // ... TransitionComponent / TransitionProps warnings above ...
  useOnceWhen(() => {
    warnDeprecatedProps('PopperComponent', {
      prefix,
      alternative: 'slots.popper',
      willRemove: true,
    });
  }, PopperComponent !== undefined);
  useOnceWhen(() => {
    warnDeprecatedProps('PopperProps', {
      prefix,
      alternative: 'slotProps.popper',
      willRemove: true,
    });
  }, PopperProps !== undefined);
}
```

### 2. Replace TransitionComponent JSX with useSlot

Resolve `slot` and `slotProps` inline — the element resolves by precedence (`??`), the props are merged (`{ ...legacy, ...new }`):

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
  ownerName: ComponentName.displayName,
  props: {
    ref: combinedRef,
    appear: true,
    // other non-coordinated internal props
  },
  slot: slots.transition ?? TransitionComponent ?? DefaultTransition,
  slotProps: { ...TransitionProps, ...slotProps.transition },
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

#### Context-optional fallback (AccordionContent pattern)

Some components render a plain `<Box>` when no context is present. The migration applies only to the context-present branch; the fallback is untouched. Note that `in` goes after the spread — the component owns the open/close state.

```js
const [TransitionSlot, transitionSlotProps] = useSlot({
  name: 'transition',
  ownerName: ComponentName.displayName,
  props: {
    ref,           // no combinedRef needed when there is no internal contentRef
    appear: false,
    'aria-hidden': ariaAttr(!context?.isExpanded),
    'aria-labelledby': context?.accordionToggleId,
    id: context?.accordionContentId,
    role: 'region',
  },
  slot: slots.transition ?? TransitionComponent ?? Collapse,
  slotProps: { ...TransitionProps, ...slotProps.transition },
});

if (!context) {
  return <Box ref={ref} {...rest} />;  // unchanged
}

return (
  <TransitionSlot
    {...transitionSlotProps}
    {...rest}
    in={context.isExpanded}
  />
);
```

### 3. For Popper + Transition components (Menu, Tooltip, Popover)

Migrate both the Popper and the Transition to slots. The `modifiers` array **must** be merged explicitly after the spread — it cannot go in `props` because the base value is memoized and computed at render time.

```jsx
const [PopperSlot, popperSlotProps] = useSlot({
  name: 'popper',
  ownerName: ComponentName.displayName,
  props: {
    ref: menuContentRef,
    'aria-labelledby': menuToggleId,
    id: menuId,
    isOpen,
    placement,
    referenceRef: menuToggleRef,
    role: 'menu',
    tabIndex,
    unmountOnExit: true,
    usePortal: false,
    willUseTransition: true,
    zIndex: 'dropdown',
  },
  slot: slots.popper ?? PopperComponent ?? Popper,
  slotProps: { ...PopperProps, ...slotProps.popper },
});

const [TransitionSlot, transitionSlotProps] = useSlot({
  name: 'transition',
  ownerName: ComponentName.displayName,
  props: {
    ref: combinedRef,
    appear: true,
    easing: 'linear',
    timeout: { enter: 133, exit: Math.floor(133 * 0.7) },
  },
  slot: slots.transition ?? TransitionComponent ?? DefaultTransition,
  slotProps: { ...TransitionProps, ...slotProps.transition },
});

return (
  <PopperSlot
    {...popperSlotProps}
    modifiers={[
      ...popperModifiers,
      ...ensureArray(popperSlotProps?.modifiers),  // merge, not replace
    ]}
    onBlur={callEventHandlers(onBlurProp, eventHandler.onBlur)}
    onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
    {...styleProps}
    {...rest}
  >
    {({ placement, transition }) => {
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
  </PopperSlot>
);
```

#### Render-prop children (TooltipContent / PopoverContent)

TooltipContent and PopoverContent pass children as a render function `(state, { ref, style }) => <Box/>` rather than as React nodes. This works transparently — `useSlot` only affects the element type and merged props; children (including render-prop functions) pass through unchanged. The `ref` in `props` propagates to the DOM node via the transition's render-prop mechanism.

```jsx
<TransitionSlot
  {...transitionSlotProps}
  in={inProp}
  onEnter={callAll(popperOnEnter, transitionSlotProps.onEnter)}
  onExited={callAll(popperOnExited, transitionSlotProps.onExited)}
>
  {(state, { ref, style: transitionStyle }) => (
    <Box ref={ref} {...styleProps} {...transitionStyle} {...rest}>
      {children}
    </Box>
  )}
</TransitionSlot>
```

#### The `arrow` slot (TooltipContent / PopoverContent)

TooltipContent and PopoverContent also render an arrow element (`TooltipArrowComponent`/`TooltipArrowProps`, `PopoverArrowComponent`/`PopoverArrowProps`). Migrate these to an `arrow` slot exactly like the others. The arrow has no internal `props` to inject (no ref/aria), so the `useSlot` call omits `props`:

```jsx
const [ArrowSlot, arrowSlotProps] = useSlot({
  name: 'arrow',
  ownerName: TooltipContent.displayName,
  slot: slots.arrow ?? TooltipArrowComponent ?? TooltipArrow,
  slotProps: slotProps.arrow ?? TooltipArrowProps,
});
```

Call `useSlot` at the top level (with the popper/transition slots), then render `<ArrowSlot {...arrowSlotProps} />` where the arrow was rendered inside the render-prop `<Box>`:

```jsx
{!!arrow && (
  <ArrowSlot {...arrowSlotProps} />
)}
```

Add the two deprecation warnings (`...ArrowComponent` → `slots.arrow`, `...ArrowProps` → `slotProps.arrow`), and remove the `= TooltipArrow`/`= PopoverArrow` defaults from the destructure (resolve via `?? TooltipArrow`/`?? PopoverArrow` in the `useSlot` call instead). Keep the `TooltipArrow`/`PopoverArrow` imports — they remain the fallback.

**Parent threading (Tooltip only):** `Tooltip.js` renders `TooltipContent` internally and forwards the deprecated arrow props. Drop the `TooltipArrowComponent = TooltipArrow` default there too (and remove the now-unused `TooltipArrow` import) so a defined value is forwarded ONLY when the user passes one — otherwise the deprecation warning fires on every tooltip. `slots`/`slotProps` are already threaded, so the `arrow` slot flows through automatically. `Popover` does not render `PopoverContent` internally (it is a user-facing child), so no parent change is needed.

#### The `input` and `root` slots (InputControl)

`InputControl` exposes a swappable input element (`inputComponent`/`inputProps`) and renders an outer `<Box>` root. Both become slots:

- **`input` slot:** `slots.input ?? inputComponent ?? InputBase` / merge `{ ...inputProps, ...slotProps.input }`. Deprecate `inputComponent` → `slots.input` and `inputProps` → `slotProps.input` (fires a deprecation warning during the merge).
- **`root` slot:** `slots.root ?? Box` / `slotProps.root`. This is a **new** slot with no legacy prop, so no deprecation and nothing to merge.

Two things make `InputControl` different from transition/popper/arrow:

1. **`getInputProps()` is a public contract** (the render-prop form `children({ getInputProps })`). Keep it — it now spreads the resolved `input` slot props, then re-applies the forced/chained handlers:
   ```js
   const getInputProps = () => ({
     ...inputSlotProps,
     onBlur: handleBlur,     // component-owned; each handler chains resolvedInputProps?.onX inside
     onChange: handleChange,
     onFocus: handleFocus,
   });
   ```
2. **Handlers chain the merged props.** Compute `const resolvedInputProps = useMemo(() => ({ ...inputProps, ...slotProps.input }), [inputProps, slotProps.input])`, pass it as the `input` slot's `slotProps`, and have `handleClick/Blur/Change/Focus` call `resolvedInputProps?.onX` (replacing the old `inputProps?.onX`).

The root slot's coordinated `onClick` goes after the spread: `onClick={callEventHandlers(rootSlotProps.onClick, handleClick)}`.

### 4. Update imports

Scope shown as the `@tonic-ui/*` placeholder — substitute your repo's npm scope. The internal `'../slot'` import is scope-independent.

```js
// Internal useSlot — named import from '../slot' (moved from '../utils/useSlot')
import { useSlot } from '../slot';

// Add to react-hooks import (only what's actually used)
import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';

// Add to utils import (only what's actually used)
import { callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
```

### Components to migrate

| Component | File | Slots needed | Status |
|---|---|---|---|
| ModalContent | `modal/ModalContent.js` | `transition` | ✅ done |
| ModalOverlay | `modal/ModalOverlay.js` | `transition` | ✅ done |
| DrawerContent | `drawer/DrawerContent.js` | `transition` | ✅ done |
| DrawerOverlay | `drawer/DrawerOverlay.js` | `transition` | ✅ done |
| AccordionContent | `accordion/AccordionContent.js` | `transition` | ✅ done |
| MenuContent | `menu/MenuContent.js` | `transition`, `popper` | ✅ done |
| SubmenuContent | `menu/SubmenuContent.js` | `transition`, `popper` | ✅ done |
| TooltipContent | `tooltip/TooltipContent.js` | `transition`, `popper`, `arrow` | ✅ done |
| PopoverContent | `popover/PopoverContent.js` | `transition`, `popper`, `arrow` | ✅ done |
| DatePickerContent | `date-pickers/DatePicker/DatePickerContent.js` | `transition`, `popper` | ✅ done |
| TreeItem | `tree/TreeItem.js` | `transition` | ✅ done |
| ToastManager | `toast/ToastManager.js` | `transition` | ✅ done |
| InputControl | `input/InputControl.js` | `input`, `root` | ✅ done |
| Scrollbar | `scrollbar/Scrollbar.js` | `scrollView` | ✅ done (deprecates `scrollViewProps`/`scrollViewRef`) |
| AutocompleteList | `autocomplete/AutocompleteList.js` | `transition`, `popper` | ✅ done (deprecates `PopperComponent`/`PopperProps`/`TransitionComponent`/`TransitionProps`) |

`Tooltip.js` is also modified (parent threading for the `popper`/`transition`/`arrow` slots — see the arrow-slot section).
`Autocomplete.js` is also modified: it splits `slotProps` — `content` flattens onto the list (historical contract) while the remaining keys and `slots` thread down; nested `slots`/`slotProps` inside `content` are dropped (dev-only warning).

**Not in scope:**
- `AccordionToggleIcon`, `MenuToggleIcon`, `TreeItemToggleIcon` — use `react-transition-group`'s `Transition` directly for icon rotation; no injectable `TransitionComponent` prop.
- Standalone `*Props` prop-bag forwarders without a paired `*Component` (e.g. `selectProps`, `portalProps`, `linearProgressBarProps`) — prop forwarding, not element-swap slots. (`Radio`/`Checkbox`/`Switch` each expose their own `inputProps` for a hidden input but have no `inputComponent` — a possible future `slots.input`, separate decision.)

  **Reversed for `Scrollbar`:** `scrollViewProps` was originally listed here as a pure prop-bag. It is now a `scrollView` **slot** (`slots.scrollView` / `slotProps.scrollView`), because the `ScrollView` is a meaningful swappable element — it owns a ref contract (Scrollbar's `update()` measures `scrollLeft`/`scrollWidth`/… off it) that justifies element-swap, not just prop forwarding. `scrollViewProps` → `slotProps.scrollView` and `scrollViewRef` → `slotProps.scrollView.ref` are deprecated (`willRemove: true`). `slots.scrollView` takes effect in default mode; in the render-prop form the consumer owns the element, and `getScrollViewProps()` carries `slotProps.scrollView` into both modes.

**Done (beyond transition/popper/arrow):** `InputControl` (`input/InputControl.js`) now has `input` (deprecated `inputComponent`/`inputProps` → `slots.input`/`slotProps.input`) and `root` slots — see "The `input` and `root` slots" section.

