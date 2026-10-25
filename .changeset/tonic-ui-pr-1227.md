---
"@tonic-ui/react": patch
"@tonic-ui/react-hooks": patch
---

fix: align `Menu` and `Popover` dismissal, warn for deprecated `closeOnBlur`, and fix Shadow DOM boundaries and iframe cleanup in `useClickOutside`

Keep portalled `DatePicker` calendar interactions internal. Refresh `useClickOutside` owner-document subscriptions after renders without a fallback for unattached refs, and support capture-phase listeners so `Menu` and `Popover` dismiss across `ModalContent` and `DrawerContent` click propagation boundaries. Cancel dismissal in `onInteractOutside` before target and bubbling click handlers run.

Defer automatic outside-click closing until target click handlers finish, so a parent overlay's `onClose` cannot discard a portalled child's action. Cancel pending closing when the overlay unmounts.
