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

The default runs development and production separately. `E2E_NODE_ENV=development` or `E2E_NODE_ENV=production` selects one mode. The same behavior contracts run in both modes; deprecated-prop warnings are expected only in development. See the [repository E2E guide](../../../../test/e2e/README.md) for all suites, reports, server settings, and debugging.

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

`scenarios/focus-lock.spec.mjs` covers the `react-focus-lock` wrapper that only `Modal` and `Drawer` render: `ensureFocus`, `autoFocus`, `initialFocusRef`, `finalFocusRef`, `returnFocusOnClose`, Tab/Shift+Tab wrapping in the document/open-shadow-root/iframe hosts, and the default where the lock is disabled. `Portal` children and nested dialogs land outside the locked subtree, so they are outside this contract.

## Layout

- `fixtures/index.jsx`: component registry, event log, unmount/remount controls, theme, Emotion cache, and document/open-shadow-root/iframe hosts.
- `fixtures/components/*.jsx`: small real-component fixtures. Each receives `{ params, record }`.
- `helpers.mjs`: navigation, callback-log reading, the Menu/Popover open-and-initial-focus helper, document-listener tracking (`installListenerProbe`, `documentListeners`), and native observer/drag-listener provenance (`installObserverProbe`, `observerProbe`).
- `scenarios/*.spec.mjs`: shared contracts, including outside clicks, environment boundaries, lifecycle, deprecations, and native touch input.
- `scenarios/interact-outside.spec.mjs`: one direct outside-interaction entry, with separate Menu/Popover and Modal/Drawer `describe` groups. Shared naming does not imply identical event, default, or focus contracts.
- `components/*.spec.mjs`: contracts specific to one component.
- `playwright.config.mjs`: native discovery for all specs, using the shared `../../../../test/e2e/config.mjs` factory. Reports write to `packages/react/.e2e/`.
- `server.mjs`: esbuild server in this suite directory, with the fixture entry point and `public/` as its served directory.

The original Menu/Popover cases remain in scenario and component files; there is no duplicate legacy fixture or spec entry point. Projects represent runtime/server targets, not individual components.

## Extend

1. Identify the actual component API and interaction boundary. Do not assume all overlays share dismissal defaults, event types, or focus behavior.
2. Add or extend a small fixture using the real component and callbacks. Render the UI under test with library components (`Button`, `Checkbox`, `Box`, `Text`), not raw HTML; only the page chrome (`public/index.html`) stays plain HTML. Author styling with the `sx` prop rather than flat style props or inline `style`: `sx={{ p: '4x', border: 1 }}`, using spacing tokens (`1x` = 4px, `2x` = 8px, `4x` = 16px, `6x` = 24px, `20x` = 80px), `border: 1` for a hairline border, and literal `width`/`height` values. Keep a flat prop only when the component API defines it (`Scrollbar`/`TableScrollbar` `width`, `height`, `overflow`). Register a new component in `fixtures/index.jsx` only when needed. `packages/react/eslint-rules/tonic-ui.mjs` enforces this for `test/e2e/**/*.jsx` through three rules: `tonic-ui/no-raw-html-elements` rejects `div`, `span`, `button`, `label`, `input`, `select`, `textarea`, `main`, `output`, and `iframe`; `tonic-ui/no-inline-style` rejects the `style` attribute; `tonic-ui/no-flat-style-props` rejects flat style props (names read from `@tonic-ui/styled-system`, with each component's documented props exempt).
3. Put cross-component contracts in `scenarios/`; put unique behavior in `components/`. Add native Playwright component/scenario tags.
4. Use browser clicks, keyboard input, hover, and taps. Wait for initial focus and transition completion before the next interaction. Do not add sleeps, retries, fake callbacks, source-text assertions, or expected-failure markers.
5. When a contract needs visual confirmation, use `test/e2e/screenshots.mjs`: `captureColorModes(page, scenario, case, prepare)` writes the `light`/`dark` pair, `capture(page, scenario, case, { colorMode, reason })` writes one shot. Nothing is written unless `E2E_SCREENSHOTS=1`. Screenshot only after `settleDialog(scope)` — Modal fades its content in and Drawer slides it in, so a shot taken right after `toBeVisible` can show the dialog still transparent or off-screen. The fixture page itself has no `CSSBaseline`, so the page background stays white in both modes; only the Tonic components carry the colour mode.
6. For a boundary change, cover both internal interactions and real outside dismissal. Use open Shadow DOM and the owning iframe document when applicable; after unmount, prove the component's own document listeners are removed (`installListenerProbe`), not just that callbacks stopped firing.
7. Run the affected tag in both modes, then the complete repository entry point. An exposed product defect must remain a failing contract until resolved; do not change the assertion to accept it.

The fixture page accepts `?component=<name>&environment=document|shadow|iframe&colorMode=light|dark` for interactive inspection. Use the component's actual default unless a scenario explicitly changes a prop. The common page controls survive component unmount, so callback logs show whether an unmounted component still reacts. Callback logs alone cannot prove listener cleanup: the listener lifecycle tests call `installListenerProbe(page)` before `visit`, then assert that the document-level `mousedown`/`touchstart` registrations a component created (including in the owning iframe document) are gone after unmount and registered again after remount.

For Menu/Popover, `&boundary=modal|drawer` wraps the fixture and a sibling outside target in real dialog content. The outside-interaction scenarios verify dismissal and cancellation across those propagation boundaries.

`&nestedAction` mounts a portalled child Popover inside Menu/Popover. Its parent unmounts on close. The scenario verifies that the child action completes before automatic closing, cancellation preserves the action, and a target-triggered unmount cancels pending closing.

`&originalOwnerDocument&environment=iframe` selects a separate iframe React root without an explicit provider environment or portal container override. `fixtures/components/OwnerDocument.jsx` covers Menu's `MenuList` with its default portal setting and trigger-open behavior, and Popover's `defaultIsOpen` with portalled content. `scenarios/environments.spec.mjs` checks iframe ownership, portal placement, direct iframe-body dismissal, and Popover internal-click/callback behavior. These browser contracts replace the former `MenuContent.ownerDocument.test.js` and `PopoverContent.environment.test.js` unit tests.

## Unit-to-browser migration inventory

Keep CSS-generation assertions in Jest: padding/margin/width declarations, spacing tokens, responsive rules, and `sx` precedence do not require layout. Basic DOM ownership (`ownerDocument`, `getRootNode`, portal host selection), pure calculations, stable identities, and subscription cleanup also remain unit-test contracts. Pagination's `boundaryCount` is range calculation, not a clipping boundary.

Browser tests use native geometry, scrolling, observers, and media queries. They must not replace those APIs with predetermined dimensions or fake observer results. Thin wrappers may record which window supplied a native API while still delegating to the browser.

The local iframe fixture permits same-origin scripts so native animation frames and input dispatch can complete. It loads only the bundled local fixture, not untrusted content. Keep iframe coordinates local for callback assertions and top-page coordinates for Playwright mouse input.

| Replaced unit contract | Browser coverage |
| :-- | :-- |
| Popper's mocked resize callback and modifier-order assertions | `components/popper.spec.mjs`: real content growth flips inside a clipping boundary, respects its padding, and returns to the original placement after shrinking, in the document and iframe. Missing-observer fallback, environment-change cleanup, and stable-instance unit tests remain. |
| ColorModeProvider's mocked `matchMedia` and fake environment window | `components/color-mode.spec.mjs`: native dark/light preference changes, change notification, controlled mode, and iframe window ownership. |
| Table's synthetic scroll events and callback count | `components/table.spec.mjs`: native horizontal/vertical scrolling, callback coordinates, and header/body geometry alignment, in the document and iframe. |
| PopoverContent's manually reported Popper placement | `components/popover.spec.mjs`: actual viewport flip and trigger-facing transform origin, plus content/trigger geometry. |
| Autocomplete and Dropdown mocked `offsetWidth` / bounding rectangles | `components/autocomplete.spec.mjs` and `components/dropdown.spec.mjs`: measured trigger/list widths, match-width behavior, and content-driven minimum/maximum sizing. Autocomplete also scrolls the highlighted option into view in its owning iframe. |
| OverflowTooltip mocked text widths and client rectangles | `components/tooltip.spec.mjs`: real truncated/fitting text and subpixel overflow through native `Element.getClientRects()` max-content measurements. The fractional render-prop fixture uses clipping without ellipsis and asserts equal integer scroll/client sizes plus no vertical overflow, isolating the width-rectangle branch. |
| Tooltip's fake scroll window, key listener spy, and reported placement | `components/tooltip.spec.mjs`: cursor positioning after iframe scrolling, iframe Escape, and native viewport flip/transform origin. |
| Collapse/Grow mocked heights | `components/transitions.spec.mjs`: native height/opacity/transform transitions, measured resize, collapsed-height boundary, and content-dependent automatic duration. |
| ModalOverlay/Scrollbar fake observer constructors and synthetic scrolling | `components/observers.spec.mjs`: native overflow coverage, resize/mutation thumb geometry, owning-window APIs, iframe thumb drag, scroll clamping, and restored position. |
| ResizeHandle fake document listeners and synthetic coordinate forwarding | `components/resize-handle.spec.mjs`: actual iframe mouse drag and capture across its boundary, native touch coordinates, measured border-box resizing, and post-release parent input isolation. |
| InputControl fake observer window / DateCalendar fake document listeners | `components/input-control.spec.mjs` and `components/date-calendar.spec.mjs`: native validity/observer updates and iframe keydown/keyup focus behavior. |

Table's removed synthetic resize test only wrapped `TableColumnResizeHandle`, which is an exact export alias of `ResizeHandle`; native resize coverage tests that shared implementation. Switch's checked-icon test remains a CSS rule assertion instead of relying on jsdom's partial computed-style cascade.
