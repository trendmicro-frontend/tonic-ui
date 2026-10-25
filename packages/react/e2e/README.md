# React component E2E

Real Chromium interactions against the current `packages/react/src` sources. The esbuild server bundles in memory; no Next.js server or CDN is used. Workspace dependency builds must already be available.

## Run and select

From the repository root:

```bash
yarn test:e2e react
yarn test:e2e react --grep @menu
yarn test:e2e react --grep @interact-outside
yarn test:e2e react --grep '(?=.*@drawer)(?=.*@interact-outside)'
yarn test:e2e react --grep '@tooltip|@overflow-tooltip'
yarn test:e2e react --list
```

The default runs development and production separately. `E2E_NODE_ENV=development` or `E2E_NODE_ENV=production` selects one mode. The same behavior contracts run in both modes; deprecated-prop warnings are expected only in development. See the [repository E2E guide](../../../e2e/README.md) for all suites, reports, server settings, and debugging.

## Contracts, not a uniform overlay API

| Components / tags | Actual contract |
| :-- | :-- |
| `@menu`, `@popover` | Native outside `click` in the document capture phase, including sibling controls inside Modal/Drawer content that stops bubbling; trigger/content are internal, and Menu also excludes live portalled submenu content. Automatic dismissal defaults to `true`. `onInteractOutside` runs before closing and before target/bubbling click handlers. Opt-out and `event.preventDefault()` in `onInteractOutside` prevent dismissal, not notification. Focus-only movement does not dismiss a click-triggered overlay. |
| `@modal` | React click on the real modal container/backdrop, not every document click. Automatic outside dismissal defaults to `false`; notification still runs when disabled, and `event.preventDefault()` cancels dismissal. |
| `@drawer` | Native document `click` outside Drawer content. Automatic outside dismissal defaults to `false`; notification and cancellation use the same public props as Modal, but the boundary and event propagation differ. |
| `@dropdown` | Inherits Menu boundaries and outside-interaction props; selection and submenu behavior use real Dropdown items. |
| `@autocomplete`, `@date-picker` | Shared `useClickOutside` consumers. Their input/content boundaries and portal behavior are tested through their own public selection, open, and close APIs—not an invented `onInteractOutside` prop. |
| `@tooltip`, `@overflow-tooltip` | Hover, focus/blur, Escape, pointer dismissal, disabled behavior, overflow, and portal boundaries. Neither exposes `onInteractOutside`. |
| `@popper` | Positioning and portal ownership primitive. It has no automatic outside dismissal or `onInteractOutside` callback. |

Scenario tags include `@interact-outside`, `@lifecycle`, `@focus`, `@keyboard`, `@portal`, `@deprecation`, `@positioning`, `@hover`, and `@touch`. A component-specific scenario can carry both its component tag and relevant scenario tags.

## Layout

- `fixtures/index.jsx`: component registry, event log, unmount/remount controls, theme, Emotion cache, and document/open-shadow-root/iframe hosts.
- `fixtures/components/*.jsx`: small real-component fixtures. Each receives `{ params, record }`.
- `tests/helpers.mjs`: navigation, callback-log reading, the Menu/Popover open-and-initial-focus helper, and the document-listener probe (`installListenerProbe`, `documentListeners`).
- `tests/scenarios/*.spec.mjs`: shared contracts, including outside clicks, environment boundaries, lifecycle, deprecations, and native touch input.
- `tests/scenarios/interact-outside.spec.mjs`: one direct outside-interaction entry, with separate Menu/Popover and Modal/Drawer `describe` groups. Shared naming does not imply identical event, default, or focus contracts.
- `tests/components/*.spec.mjs`: contracts specific to one component.
- `playwright.config.mjs`: native discovery for all specs, using the shared repository config factory.
- `server.mjs`: existing esbuild server with the fixture entry point.

The original Menu/Popover cases remain in scenario and component files; there is no duplicate legacy fixture or spec entry point. Projects represent runtime/server targets, not individual components.

## Extend

1. Identify the actual component API and interaction boundary. Do not assume all overlays share dismissal defaults, event types, or focus behavior.
2. Add or extend a small fixture using the real component and callbacks. Register a new component in `fixtures/index.jsx` only when needed.
3. Put cross-component contracts in `tests/scenarios/`; put unique behavior in `tests/components/`. Add native Playwright component/scenario tags.
4. Use browser clicks, keyboard input, hover, and taps. Wait for initial focus and transition completion before the next interaction. Do not add sleeps, retries, fake callbacks, source-text assertions, or expected-failure markers.
5. For a boundary change, cover both internal interactions and real outside dismissal. Use open Shadow DOM and the owning iframe document when applicable; after unmount, prove the component's own document listeners are removed (`installListenerProbe`), not just that callbacks stopped firing.
6. Run the affected tag in both modes, then the complete repository entry point. An exposed product defect must remain a failing contract until resolved; do not change the assertion to accept it.

The fixture page accepts `?component=<name>&environment=document|shadow|iframe` for interactive inspection. Use the component's actual default unless a scenario explicitly changes a prop. The common page controls survive component unmount, so callback logs show whether an unmounted component still reacts. Callback logs alone cannot prove listener cleanup: the listener lifecycle tests call `installListenerProbe(page)` before `visit`, then assert that the document-level `mousedown`/`touchstart` registrations a component created (including in the owning iframe document) are gone after unmount and registered again after remount.

For Menu/Popover, `&boundary=modal|drawer` wraps the fixture and a sibling outside target in real dialog content. The outside-interaction scenarios verify dismissal and cancellation across those propagation boundaries.

`&nestedAction` mounts a portalled child Popover inside Menu/Popover. Its parent unmounts on close. The scenario verifies that the child action completes before automatic closing, cancellation preserves the action, and a target-triggered unmount cancels pending closing.
