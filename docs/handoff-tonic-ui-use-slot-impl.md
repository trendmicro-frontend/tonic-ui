# Handoff: tonic-ui useSlot migration — start implementation

## What was done this session

Reviewed and expanded the `tonic-ui-use-slot` skill to be implementation-ready.

**Commit:** `d63694e838` on branch `feat/slot`
**Skill file:** `.claude/skills/tonic-ui-use-slot/index.md`

The skill now covers every component that needs migration, every pattern variation, and every edge case. It is the authoritative guide — read it before writing any code.

---

## Repo context

- **Repo:** `/home/cheton/Code/trendmicro-frontend/tonic-ui`
- **Branch:** `feat/slot` (branch off of `master`)
- **Reference implementation:** `packages/react/src/modal/ModalContent.js` — already migrated, canonical example

---

## Migration scope

Full table is in the skill. Summary by pattern:

### Pattern A — simple transition-only (no Popper)

| Component | Default transition | Notable detail |
|---|---|---|
| `modal/ModalOverlay.js` | `Fade` | — |
| `drawer/DrawerContent.js` | `Slide` | `direction` prop computed from `placement` → goes in `props` |
| `drawer/DrawerOverlay.js` | `Fade` | — |
| `accordion/AccordionContent.js` | `Collapse` | fallback `<Box>` when no context; aria props in `props` |
| `tree/TreeItem.js` | `Collapse` | wraps expandable children, not the whole component |
| `toast/ToastManager.js` | `ToastTransition` | no `useAnimatePresence`; `in` is always `true` per toast |

### Pattern B — Popper + Transition

| Component | Default transition | Notable detail |
|---|---|---|
| `menu/MenuContent.js` | `Collapse` | `easing`/`timeout` defaults in `props`; `modifiers` merged after spread |
| `menu/SubmenuContent.js` | `Collapse` | same as MenuContent |
| `tooltip/TooltipContent.js` | `Grow` | render-prop children `(state, { ref, style }) => <Box/>` |
| `popover/PopoverContent.js` | `Grow` | render-prop children; also has `PopoverArrowComponent`/`PopoverArrowProps` (leave as-is for now) |
| `date-pickers/DatePicker/DatePickerContent.js` | `Collapse` | same as MenuContent; uses `useEventCallback` not `useOnceWhen` |

### Not in scope

`AccordionToggleIcon`, `MenuToggleIcon`, `TreeItemToggleIcon` — use `react-transition-group`'s `Transition` directly; do not expose `TransitionComponent` as an injectable prop.

---

## Key rules (from the skill)

1. New API takes precedence: `slots.transition ?? TransitionComponent ?? Default`
2. `in` always goes **after** the spread
3. Computed/internal props (`direction`, `easing`, `timeout`, aria attrs, `role`, `ref`) → `props`
4. DOM event handlers after spread: `callEventHandlers(slotProps.handler, internalFn)`
5. Lifecycle callbacks after spread: `callAll(internalFn, slotProps.handler)`
6. Popper `modifiers` → merged explicitly after spread: `[...base, ...ensureArray(popperSlotProps?.modifiers)]`
7. `useSlot` import: `import useSlot from '../utils/useSlot'` (internal, not from react-hooks)

---

## Suggested next steps

Implement in this order (simple → complex):

1. `ModalOverlay` and `DrawerOverlay` (trivial, no special cases)
2. `DrawerContent` (computed `direction` prop)
3. `AccordionContent` (fallback pattern)
4. `TreeItem` (need to read full file — only first 80 lines were read this session)
5. `ToastManager` (need to read full file — TransitionComponent is used inside `map`)
6. `MenuContent` (Popper slot + easing/timeout defaults)
7. `SubmenuContent` and `DatePickerContent` (same as MenuContent)
8. `TooltipContent` (render-prop children)
9. `PopoverContent` (render-prop children; leave `PopoverArrowComponent` as-is)

---

## Suggested skills

- `/tonic-ui-use-slot` — **invoke first**, it is the implementation spec
- `/superpowers:writing-plans` — if you want to produce a formal step-by-step plan before touching code
- `/superpowers:verification-before-completion` — run before claiming each component is done
- `/commit-commands:commit` — commit after each component or logical batch
