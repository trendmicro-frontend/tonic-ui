---
"@tonic-ui/react": patch
---

`Portal` now resolves its default container from the root node of the tree it is mounted in (via the native `Node.getRootNode()`) instead of always using `document.body`. Portal-based components (`Modal`, `Drawer`, `Popper`, `PortalManager`, `ToastManager`) render inside a shadow root automatically when the app is mounted there. The iframe and normal-page behavior is unchanged, and an explicit `containerRef` still overrides the default.
