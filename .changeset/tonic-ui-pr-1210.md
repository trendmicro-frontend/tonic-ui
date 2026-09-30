---
"@tonic-ui/react": minor
---

fix(react/popper): stabilize modifiers across Popper-based overlays

`AutocompleteList`, `DatePickerContent`, `MenuContent`, `SubmenuContent`,
`PopoverContent`, and `TooltipContent` now preserve their merged Popper
modifier arrays while both the component defaults and consumer-supplied
modifiers remain unchanged. Custom Popper slots therefore receive stable
modifier references during unrelated parent renders.

`Popper` also retains a structural fallback for direct consumers and inline
modifier arrays. Fresh arrays and plain objects with equal values reuse the
previous modifier source, while real changes to values, order, functions, DOM
nodes, and class instances still recreate the Popper instance as required.

Together, these layers provide a consistent modifier-stability contract across
Dropdown, Menu, Submenu, Autocomplete, DatePicker, Popover, Tooltip, and
OverflowTooltip without changing their placement, portal, transition, or
modifier policies.