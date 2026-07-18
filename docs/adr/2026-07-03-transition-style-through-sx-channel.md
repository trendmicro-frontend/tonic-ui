# Transition-authored style flows through `__sx` in both render modes

Transition components (`transitions/{Fade,Collapse,Grow,Scale,Slide,Zoom}`, `toast/ToastTransition`,
and the `Transition`-consuming toggle icons `accordion/AccordionToggleIcon`, `menu/MenuToggleIcon`,
`tree/TreeItemToggleIcon`) author *animation state values* — `opacity`/`transform`/`transition`/
`visibility` keyed by the transition state — historically as flat `Box` props on their own-render
branch and as a merged raw `style` object in their function-child handoff. We decided both render
modes follow the one channel convention from
[2026-06-29-sx-as-universal-base-channel](./2026-06-29-sx-as-universal-base-channel.md):

1. **Animation state is not exempt from `__sx`.** Everything a transition component authors for a
   `Box` it renders folds into `__sx` via `mergeSx(ownPersistentBase, animationStyleProps, __sxProp)`
   — incoming last. Precedence-by-origin applies to every property: a consumer or wrapper that
   deliberately targets an animated property (e.g. `opacity` on a `Fade`) wins, animation included.
2. **The function-child handoff carries `__sx`, and `style` shrinks to the caller's passthrough.**
   The handoff props become `{ ...childProps, ref, __sx: mergeSx(...same fold...), style: callerStyle }`.
   The child is required (documented in the JSDoc contract) to render a `Box`-based element — every
   known consumer already does (`TooltipContent`/`PopoverContent`, both `Box`).
3. **Dynamically calculated (DOM-measured) values stay on inline `style`.** `Collapse` and
   `ToastTransition` sample the wrapper's `offsetHeight` at the animation boundary; `Grow` embeds a
   measured auto-duration in its `transition` string when `timeout='auto'`. Each distinct
   measurement serialized through `__sx` would mint a new cached stylesheet class with no garbage
   collection — unbounded for arbitrary content (e.g. toasts). Inline `style` is a direct DOM write
   with no stylesheet cost. The split is by **how the value is computed** (enum + static config →
   `__sx`; includes a DOM measurement → inline `style`), not by how often it changes.

## Considered options

- **Exempt transitions (keep flat props / raw `style`)** — animation values would silently out-rank
  injected `__sx` bases via the flat-prop tier. Rejected: the protection was an accidental
  side-effect of tier ordering (the `ModalContent`→`Fade` slot injection actually relies on
  no-property-overlap, not precedence), and it splits the codebase into two rules.
- **Additive handoff (`style` keeps the animation values, `__sx` duplicates them)** — nothing
  breaks, but a consumer spreading the whole bag gets the animation as inline `style`, which
  out-ranks every channel and defeats the override goal the `__sx` copy was added for. Rejected as
  the worst of both.

## Consequences

- A function-child that renders a native element (not `Box`-based) loses its animation. No such
  consumer exists in-repo or in the docs examples; the requirement is now part of the contract.
- `TooltipContent.js`/`PopoverContent.js` must stop flat-spreading the handoff (`{...transitionStyle}`)
  and fold the handoff's `__sx` instead — atomically with the `Grow` migration (their default
  transition slot), or the tooltip/popover animation breaks in between.
- Inline-styled measured values out-rank every styling channel for those specific properties.
  Deliberate: mid-animation geometry (a collapsing element's measured height) is functional state,
  not a customization surface.
