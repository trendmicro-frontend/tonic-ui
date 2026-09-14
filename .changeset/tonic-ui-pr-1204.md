---
"@tonic-ui/react": patch
---

fix(react/button): align `secondary` variant hover/active border color with Figma spec

`Button`'s `secondary` variant no longer switches `border-color` to `border._primary.hovered`/`border._primary.active` (blue) on hover/active — per the Figma spec, the border stays `border._primary.enabled` across normal, hover, and active states, with only the background color changing.
