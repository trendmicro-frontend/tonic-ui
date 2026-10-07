---
"@tonic-ui/react": minor
"@tonic-ui/codemod": minor
---

feat: sync the `__sx` base-styling model and `style-props-to-sx` codemod from Tonic One

Components now author their base styling through the internal `__sx` channel, so a
component's own base styling structurally loses to a consumer override regardless of
which CSS property either touches. `useSlot` composes an incoming `__sx` via `composeSx`
instead of letting `slotProps.__sx` replace the base.

`Scrollbar` gains a `slots`/`slotProps` API for `root`, `scrollView`, `horizontalTrack`,
`verticalTrack`, `horizontalThumb`, and `verticalThumb`; `scrollViewProps` and
`scrollViewRef` are deprecated in favor of `slotProps.scrollView` and
`slotProps.scrollView.ref`. `-webkit-overflow-scrolling: touch` is now emitted correctly.

The `style-props-to-sx` codemod resolves wrappers declared in the same file as their
usage, warns on wrappers it cannot resolve, skips DOM intrinsics, and no longer
whole-component exempts the layout primitives (a tooling change only).
