# Scrollbar adopts the `slots` API (`scrollView`/`root`); `useSlot` composes `__sx`

**Status:** accepted

## Context

`Scrollbar` exposed two ad-hoc props for customizing its scrollable viewport: `scrollViewProps`
(a prop bag spread onto the internal `ScrollView`) and `scrollViewRef` (a ref to it). The
`slots`/`slotProps` migration ([tonic-ui-slots]) had explicitly classified `scrollViewProps` as
**out of scope** — "a standalone `*Props` prop-bag forwarder without a paired `*Component`,
prop forwarding not element-swap."

Two things made us revisit that:

1. The `ScrollView` is not just a styling pass-through. It owns a **ref contract** — `Scrollbar`'s
   `update()` measures `scrollLeft`/`scrollWidth`/`clientHeight`/… off the live DOM node to drive
   the thumbs. An element that consumers may legitimately want to *swap* (e.g. to integrate a
   virtualizer) is a real slot, not a prop bag.
2. Consistency: every other configurable internal part in the library is now a slot
   (`InputControl` has `input` + `root`, Modal/Drawer/Tooltip/Popover/DatePicker have
   `transition`/`popper`/`arrow`). `Scrollbar` was the odd one out.

A second, deeper issue surfaced while implementing: routing a component's base styling through
the internal `__sx` channel and *also* exposing a slot means the base `__sx` and a consumer's
`slotProps.<slot>.__sx` must **compose**, not replace. `useSlot` merged `ref` (via `useMergeRefs`)
but spread every other key — so a `slotProps.__sx` silently *replaced* the base, and each caller
had to hand-strip `__sx` out of the slot props and re-fold it with `composeSx`. That boilerplate was
error-prone and repeated.

## Decision

1. **`Scrollbar` adopts the `slots` API**, reversing the earlier "not in scope" classification:
   - `slots.scrollView` / `slotProps.scrollView` — the scrollable viewport (defaults to the
     internal `ScrollView`). `slots.scrollView` takes effect in **default mode**; in the
     render-prop form the consumer owns the element, and `getScrollViewProps()` carries
     `slotProps.scrollView` into both modes (the `getInputProps()` precedent).
   - `slots.root` / `slotProps.root` — the outer container (defaults to `Box`). Always
     Scrollbar-owned, so it applies in both modes. New slot, no legacy prop.
   - `scrollViewProps` → `slotProps.scrollView` and `scrollViewRef` → `slotProps.scrollView.ref`
     are **deprecated** (`warnDeprecatedProps`, `willRemove: true`); both still work, merged under
     the new slot props.

2. **`useSlot` composes `__sx` as well as `ref`.** The component's base `__sx` (in `props.__sx`)
   stays *below* the caller's `slotProps.__sx`, merged via `composeSx` — never replaced. `__sx` is
   only emitted when at least one side supplies it, so non-Box slot elements (transitions, poppers,
   arrows) receive no spurious `__sx`. Callers no longer strip/fold `__sx` by hand.

3. **`composeSx` is variadic** (`composeSx(...values)`), so composing more than two sx-values reads
   `composeSx(base, a, b)` instead of nesting `composeSx(composeSx(...), ...)`.

## Considered Options

- **`slotProps.scrollView` only, no element-swap (rejected).** Minimal, but inconsistent with the
  rest of the library and forecloses the legitimate swap use case (virtualizers). The ref contract
  the swap must honor already exists for `scrollViewRef`, so element-swap adds no new risk.
- **Keep the per-caller `__sx` strip/fold around `useSlot` (rejected).** Works, but repeats fragile
  boilerplate at every slot and lets `slotProps.__sx` clobber the base whenever a caller forgets.
  Centralizing in `useSlot` (where `ref` is already merged) is the natural home.
- **Break the render-prop API / make `Scrollbar` a compound component now (deferred).** A
  `ScrollbarContext` + compound parts is a larger, breaking change; kept as a future phase. The
  render-prop API stays the compatibility anchor (a facade over whatever the internals become).

## Consequences

- **Non-breaking.** No first-party consumer passed the deprecated props except `DataGrid`
  (migrated to `slotProps.scrollView.ref`). `TableScrollbar` (render-prop) and the default form are
  unchanged; snapshots are identical.
- **`useSlot` behavior change is additive.** Existing slots pass no `__sx`, so the guard leaves them
  untouched; the only observable change is that a `slotProps.__sx` now composes with the base
  instead of replacing it — the safer semantics. Verified across the full `react` suite and
  `react-data-grid`.
- **Deprecation removal is a future major.** `scrollViewProps`/`scrollViewRef` remain until then.
- The `slots` skill's "not in scope" note is updated to record the reversal and the rationale.

[tonic-ui-slots]: ../../.claude/skills/tonic-ui-slots/SKILL.md
