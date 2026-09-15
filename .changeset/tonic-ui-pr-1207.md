---
"@tonic-ui/react": patch
---

fix(react/popper): update the popper position after its content resizes

- `Popper` re-runs its update cycle when the popper element changes size, so a `flip`-enabled overlay flips on the first open instead of waiting for a scroll.
- `Popper`'s render function also receives `computedPlacement`, the placement Popper.js actually used. The `placement` prop and the render-prop `placement` keep meaning the preferred placement.
- `Popover` and `Tooltip` use `computedPlacement`, so they grow from the edge that faces the trigger.
- `Popper` no longer recreates its instance when Popper.js reports a different placement, and it now destroys the instance when the popper element is detached while the component stays mounted.
