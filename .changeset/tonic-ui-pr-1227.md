---
"@tonic-ui/react": patch
"@tonic-ui/react-hooks": patch
---

fix: align `Menu` and `Popover` outside-click dismissal

Deprecate `closeOnBlur` on `Menu` and `Popover`: the prop is still accepted and emits a development-only warning once per component instance, but it no longer controls dismissal. Set `closeOnInteractOutside` (default `true`) instead. `onInteractOutside(event)` receives outside clicks while the overlay is open, even when automatic dismissal is disabled; call `event.preventDefault()` to keep it open for that click.

Outside-click detection uses `useClickOutside` with native `click` events in the document capture phase, matching `Drawer` and `Modal`. Clicks outside the toggle and content dismiss the overlay even when focus does not move, including across `ModalContent` and `DrawerContent` propagation boundaries. Automatic closing is deferred to a later task until the target and bubbling click handlers finish, so a portalled target can complete its action before `onClose` unmounts its subtree; unmounting the overlay cancels a pending close. Portalled `DatePicker` calendar clicks count as internal.

`useClickOutside` gains a `capture` option, checks the event's composed path so clicks inside an open shadow root count as internal, and refreshes owner-document subscriptions after every render without falling back to the parent document for unattached refs.

`ResizeHandle` reads touch coordinates from the native `TouchList`, which is array-like rather than an array, including the released touch on `touchend` through `changedTouches`, so `onResizeStart`, `onResize`, and `onResizeEnd` no longer receive `undefined` from native touch events.

Initialize `Scrollbar` measurement callbacks before the callback that depends on them, avoiding a first-render `ReferenceError` in native ES module builds.
