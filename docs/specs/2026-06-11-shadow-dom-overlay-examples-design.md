# Shadow DOM overlay examples — Environment docs

**Date:** 2026-06-11
**Page:** `packages/react-docs/pages/components/environment/`
**Status:** Design approved (pending spec review)

## Goal

Add a new example to the **Environment** docs page demonstrating that anchored
overlay components — **Tooltip, Popover, Menu** — render and position correctly
*inside* a Shadow DOM boundary, opening in-place rather than as a full-viewport
overlay. This complements the existing modal example, which stays unchanged.

## Context / findings

- The existing `usage-in-shadow-dom.js` example renders a single **Modal**
  (full-viewport backdrop) portalled into a shadow root. It is kept as-is.
- Shadow-DOM containment of overlays is driven by the **Emotion cache** (styles)
  + the **Popper/Portal `containerRef`** (where the portal mounts) + the
  `environment` config working together — all already wired in the example's
  scaffold.
- Note: in Shadow DOM, `useEnvironment().getDocument()/getWindow()` resolve to
  the **main** document/window (a shadow root's `ownerDocument` *is* the main
  document, and no refactored component uses `getRootNode()`). So an
  "environment on/off" toggle would show ~no visible difference in Shadow DOM —
  which is why this is a **showcase**, not a before/after comparison. (The
  environment refactor's visible effect lives in the iframe scenario.)

## Scope

**In scope**
- One new self-contained example file showcasing Tooltip + Popover + Menu in a
  shadow-DOM host.
- One new MDX subsection rendering it.

**Out of scope**
- Changing the existing modal example.
- Autocomplete / DatePicker (deferred — keeps the example simple).
- Non-overlay refactored components (Scrollbar, ResizeHandle, InputControl,
  ColorMode).
- Any env on/off toggle, and any change to the iframe example.

## Design

### New file: `usage-in-shadow-dom-overlays.js`

Self-contained, mirroring the existing example's scaffold (docs examples are
standalone copy-paste units, so the scaffold is duplicated, not shared):

- `createCache` (Emotion) with `container: shadowRoot`, `prepend: true`, `nonce`.
- `createTheme` with `cssVariables` scoped to `:host`, and
  `components.Popper.defaultProps.portalProps.containerRef` +
  `components.PortalManager.defaultProps.containerRef` set to the shadow-root
  element (Tooltip, Popover, and Menu all position via `Popper`).
- `ShadowDOMContainer` (host element + `attachShadow` + `createRoot`) renders
  `CacheProvider` → `TonicProvider` (with `environment={{ value: shadowRoot }}`,
  `colorMode`, `theme`) → `PortalManager` → content.
- Content: one `BorderedBox` containing three triggers laid out in a `Stack`/`Grid`:
  - **Tooltip** — `<Tooltip label="…"><Button>Hover me</Button></Tooltip>`
  - **Popover** — `PopoverTrigger` (Button) + `PopoverContent` (a line of text)
  - **Menu** — `MenuButton` + `MenuList` with 2–3 `MenuItem`s
- A short caption (e.g. "Overlay components rendered inside Shadow DOM").

### MDX: `index.page.mdx`

Keep `### Usage with Shadow DOM` (modal) unchanged. Insert a new subsection
immediately after it (before `### Usage with iframe`):

```
### Rendering overlay components inside Shadow DOM

<one sentence: Tooltip, Popover, and Menu open and position within the shadow boundary>

{render('./usage-in-shadow-dom-overlays')}
```

## Acceptance criteria

1. The new example compiles and lints clean (`yarn build` in repo root passes,
   matching the docs CI gate).
2. In the running docs site, each of Tooltip / Popover / Menu opens **inside the
   shadow-DOM box** (overlay does not escape to the main `document.body`,
   styles applied, positioned at its trigger).
3. No new console errors on the page.
4. The existing modal and iframe examples are unchanged and still work.
5. Verified visually via Playwright screenshots of each opened overlay.

## Verification

- `yarn build` at repo root (full pipeline, includes the docs Next.js build).
- `yarn dev` in `packages/react-docs` + Playwright: open each overlay, screenshot,
  confirm containment and zero console errors.
