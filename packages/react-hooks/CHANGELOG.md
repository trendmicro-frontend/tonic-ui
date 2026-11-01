# @tonic-ui/react-hooks

## 3.0.0-alpha.2

### Patch Changes

- fix: align `Menu` and `Popover` outside-click dismissal by [@cheton](https://github.com/cheton) in [#1227](https://github.com/trendmicro-frontend/tonic-ui/pull/1227)
  Deprecate `closeOnBlur` on `Menu` and `Popover`: the prop is still accepted and emits a development-only warning once per component instance, but it no longer controls dismissal. Set `closeOnInteractOutside` (default `true`) instead. `onInteractOutside(event)` receives outside clicks while the overlay is open, even when automatic dismissal is disabled; call `event.preventDefault()` to keep it open for that click.
  Outside-click detection uses `useClickOutside` with native `click` events in the document capture phase, matching `Drawer` and `Modal`. Clicks outside the toggle and content dismiss the overlay even when focus does not move, including across `ModalContent` and `DrawerContent` propagation boundaries. Automatic closing is deferred to a later task until the target and bubbling click handlers finish, so a portalled target can complete its action before `onClose` unmounts its subtree; unmounting the overlay cancels a pending close. Portalled `DatePicker` calendar clicks count as internal.
  `useClickOutside` gains a `capture` option, checks the event's composed path so clicks inside an open shadow root count as internal, and refreshes owner-document subscriptions after every render without falling back to the parent document for unattached refs.
  `ResizeHandle` reads touch coordinates from the native `TouchList`, which is array-like rather than an array, including the released touch on `touchend` through `changedTouches`, so `onResizeStart`, `onResize`, and `onResizeEnd` no longer receive `undefined` from native touch events.
  Initialize `Scrollbar` measurement callbacks before the callback that depends on them, avoiding a first-render `ReferenceError` in native ES module builds.
  Expand Chromium E2E coverage against the current React sources in both development and production. Cover outside-dismissal cancellation and callback ordering, portalled target actions before parent unmount, iframe and Shadow DOM boundaries, listener cleanup, and native touch input.
  Move layout- and browser-dependent contracts from mocked unit tests to real-browser scenarios for positioning, component sizing, overflow, scrolling, observers, transitions, color preferences, and resizing. Organize suites under each workspace's `test/e2e/` and consolidate execution through `yarn test:e2e`, with shared configuration and native Playwright tag filtering while retaining reference-application and docs-integration coverage.

## 3.0.0-alpha.1

### Patch Changes

- feat: prepare v3 prerelease by [@cheton](https://github.com/cheton) in [#1168](https://github.com/trendmicro-frontend/tonic-ui/pull/1168)
- Updated dependencies [[`1c1c109`](https://github.com/trendmicro-frontend/tonic-ui/commit/1c1c1092d4d60db97f5b25ec80ca80eadc856ac7)]
  - @tonic-ui/utils@3.0.0-alpha.1

## 3.0.0-alpha.0

### Major Changes

- Begin the Tonic UI v3 development line (3.0.0). First prerelease (alpha) on the `main` branch.

### Patch Changes

- Updated dependencies
  - @tonic-ui/utils@3.0.0-alpha.0

## 2.2.1

### Patch Changes

- chore: update React dependencies to support v19 by [@cheton](https://github.com/cheton) in [#1065](https://github.com/trendmicro-frontend/tonic-ui/pull/1065)

- feat: upgrade Emotion packages to support React 19 compatibility by [@cheton](https://github.com/cheton) in [#1076](https://github.com/trendmicro-frontend/tonic-ui/pull/1076)

## 2.2.0

### Minor Changes

- feat(react-hooks): add SSR-safe `useId` hook with React 18 integration by [@cheton](https://github.com/cheton) in [#1051](https://github.com/trendmicro-frontend/tonic-ui/pull/1051)

### Patch Changes

- Updated dependencies [[`f4e783d`](https://github.com/trendmicro-frontend/tonic-ui/commit/f4e783dd3cac3db3111e876e94b497fc28fccf79)]
  - @tonic-ui/utils@2.2.0

## 2.1.1

### Patch Changes

- fix(react/modal): resolve `closeOnClickOutside` regression for nested modals and modal-drawer scenarios by [@cheton](https://github.com/cheton) in [#1027](https://github.com/trendmicro-frontend/tonic-ui/pull/1027)

## 2.1.0

### Minor Changes

- feat: implement `useClickOutside` hook to support multiple refs by [@cheton](https://github.com/cheton) in [#1017](https://github.com/trendmicro-frontend/tonic-ui/pull/1017)

## 2.0.1

### Patch Changes

- chore: update package description by [@cheton](https://github.com/cheton) in [`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)
- Updated dependencies [[`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)]
  - @tonic-ui/utils@2.1.1
