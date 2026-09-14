---
"@tonic-ui/react": minor
---

feat(autocomplete): migrate `AutocompleteList` to `slots` / `slotProps`

`AutocompleteList` now follows the library-wide slots convention: `slots.popper` /
`slots.transition` swap the Popper / transition components, and `slotProps.popper` /
`slotProps.transition` forward props to them. The legacy `PopperComponent`, `PopperProps`,
`TransitionComponent`, and `TransitionProps` props are deprecated (still work; dev-only
deprecation warning). `<Autocomplete>` forwards non-`content` `slotProps` keys and `slots`
down to the list; nested `slots` / `slotProps` keys inside `slotProps.content` are dropped
(dev-only warning).
