---
name: tonic-ui-slots
description: Author and migrate the slots / slotProps API (the useSlot hook) in this design system's React components — the architecture where slots.x replaces an internal part and slotProps.x merges props into it. Use this whenever you are wiring an internal component part so consumers can swap it via slots.x or configure it via slotProps.x, authoring a slot's props / handler chaining / element resolution, or migrating a component from the deprecated *Component / *Props pairs (TransitionComponent/TransitionProps, PopperComponent/PopperProps, inputComponent/inputProps, arrow, scrollView, etc.) to slots / slotProps. Trigger it even when the user only mentions "slots", "slotProps", "useSlot", "swappable part", "replace the transition/popper/arrow", or "migrate the *Component prop" while working on a React component library — even if they don't name useSlot explicitly.
---

# Tonic UI Slots

The `slots` / `slotProps` API gives consumers granular control over a component's internal parts — **`slots`** replaces the element rendered for a part, **`slotProps`** merges extra props into it — without forking the component. Internally, each slot is wired with the `useSlot` hook.

This skill covers both **authoring slots** on a component and **migrating** the legacy `*Component` / `*Props` prop pairs (e.g. `TransitionComponent` / `TransitionProps`, `PopperComponent` / `PopperProps`) to the slots API.

## When to Use

- Adding slot support to a new or existing component (wire an internal part with `useSlot` so it can be replaced via `slots.x` or configured via `slotProps.x`)
- Authoring the internal `props`, handler chaining, and slot resolution for a slot
- Migrating a component from the deprecated `*Component` / `*Props` pairs to `slots` / `slotProps`.

## Workflow and References

Paths starting with `packages/` are relative to the repository root; component
paths such as `modal/ModalContent.js` are relative to `packages/react/src/`.
The reference links below are relative to this skill directory, not the CWD.

1. Read the component and its existing handler chains before changing it.
2. Read [API and handler authoring](references/api.md) before wiring or reviewing
   a slot. It defines prop merging, composed refs/styles, imports, and warnings.
3. For a legacy-prop migration, also read [migration examples](references/migration.md)
   before editing. Preserve context fallbacks, render-prop children, parent
   threading, deprecation warnings, and explicitly merged arrays.
4. Apply the invariants below, then exercise the changed consumer behavior.

## Current Integration Status

Full `__sx` integration is not complete in this Tonic UI checkout. The current
`packages/react/src/slot/useSlot.js` composes refs but shallowly merges other props.
The style-composition rules below describe the target contract used by the newer
Tonic One implementation, not behavior already provided by this checkout.
Inspect the local hook before relying on automatic `__sx` composition. Do not
silently expand a slot task into a styling integration change.

## API Invariants

- `useSlot` returns `[ElementType, mergedProps]`. Import it as a named export:
  internally `import { useSlot } from '../slot'`; externally from `@tonic-ui/react`.
- Ordinary `slotProps` override internal `props`; refs are composed.
- **Target style contract:** put base styling in `props.__sx`, and let `useSlot`
  compose it below the slot's incoming `__sx`, emitting `__sx` only when supplied.
  This style-composition contract is not yet implemented in this checkout.
- Legacy and new props merge as `{ ...XProps, ...slotProps.x }`; element types
  resolve as `slots.x ?? XComponent ?? Default`. Do not replace legacy props with `??`.
- A new slot with no legacy props accepts `slotProps.x` directly. Undefined
  slot props are valid; only an undefined resolved element causes a dev warning.

## Reference Implementation and Required Behavior

`ModalContent` (`packages/react/src/modal/ModalContent.js`) is the canonical example.

Key rules carried from the migration:
1. `slots.transition` overrides `TransitionComponent` — element resolves by precedence (`slots.transition ?? TransitionComponent ?? Default`)
2. `slotProps.transition` merges over `TransitionProps` — props are merged, new wins (`{ ...TransitionProps, ...slotProps.transition }`)
3. `in` is always set after `{...transitionSlotProps}` — component owns open/close state
4. The component's forwarded `ref` goes inside `props` (`props: { ref: combinedRef, ... }`)
5. Static internal props (ref, aria attrs, role, tabIndex, appear) go in `props`
6. Computed context-derived props (e.g. `direction`, `easing`, `timeout`) go in `props`
7. DOM event handlers go after the spread using `callEventHandlers(transitionSlotProps.handler, internalFn)`
8. Lifecycle callbacks (onExited, onEnter) go after the spread using `callAll(internalFn, transitionSlotProps.handler)`
9. Array props that must merge (e.g. Popper `modifiers`) go after the spread with explicit merge
10. `useSlot` is now exported from the published `react` package (`@tonic-ui/react`); within the `react` package, import from `../slot` (internal path)
