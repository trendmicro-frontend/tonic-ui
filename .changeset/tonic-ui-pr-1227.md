---
"@tonic-ui/react": patch
"@tonic-ui/react-hooks": patch
---

fix: align `Menu` and `Popover` dismissal, warn for deprecated `closeOnBlur`, and fix Shadow DOM boundaries and iframe cleanup in `useClickOutside`

Keep portalled `DatePicker` calendar interactions internal, and ignore unattached refs when subscribing `useClickOutside` to owner documents.
