# MFE Architecture Design

**Date:** 2026-06-22
**Scope:** `packages/react-docs/mfe/` — Wujie and Module Federation demo apps

---

## Problem

The original `mfe/shared/` directory coupled all MFE demos to a common codebase. The intent is that each app is an independently deployable unit, the way real MFE patterns work.

Additionally, each Wujie sub-app's `main.jsx` mixed several unrelated concerns: the Wujie mount/unmount lifecycle, Emotion cache setup, and `TonicProvider` wiring.

> Note: a small shared module still exists — `mfe/shared/inventory/api.js` — providing the mock device data both strategies' sub-apps import. It is the only remaining cross-boundary import.

---

## Goals

1. Each unit (host, shell, remote, sub-app) is self-contained apart from the shared mock data API.
2. The Wujie lifecycle boilerplate is factored into a single reusable helper (`createMicroApp`) so each sub-app `main.jsx` is small.
3. The MF shell's `main.jsx` knows nothing about lazy loading — that lives in `createRemote.jsx` / `remotes.jsx`.
4. Both MFE strategies share the same host `main.jsx` structure, differing only in their adapter import (`./apps` vs `./remotes`).
5. Each sub-app's `TonicProvider` lives in its `main.jsx` (not inside the component), so the component itself is environment-agnostic.

---

## Directory Structure

```
mfe/
├── shared/
│   └── inventory/
│       └── api.js                ← shared mock device data (imported by both strategies)
├── wujie/
│   ├── host/
│   │   ├── apps.jsx              ← WujieReact adapters (WidgetUpdates, WidgetOS, InventoryView)
│   │   ├── useMicroAppLifecycle.js ← destroyApp(name) on unmount when destroyOnUnmount
│   │   ├── main.jsx              ← composes views; no Wujie-internal code
│   │   ├── Layout.jsx
│   │   ├── GlobalStyles.jsx
│   │   ├── index.html
│   │   └── vite.config.mjs
│   └── apps/
│       ├── micro-app.js          ← createMicroApp(getMountEl) → { render(renderFn) }
│       ├── widget-os/            ← App.jsx, main.jsx, index.html, vite.config.mjs
│       ├── widget-updates/       ← App.jsx, main.jsx, index.html, vite.config.mjs
│       └── inventory/            ← App.jsx, main.jsx, index.html, vite.config.mjs
└── module-federation/
    ├── shell/
    │   ├── createRemote.jsx      ← MF component loader: lazy + Suspense + LoadingSlot
    │   ├── remotes.jsx           ← declares the remotes (3 lines)
    │   ├── main.jsx              ← composes views; no lazy/Suspense
    │   ├── Layout.jsx
    │   ├── GlobalStyles.jsx
    │   ├── index.html
    │   └── vite.config.mjs
    └── remotes/
        ├── inventory/            ← App.jsx, main.jsx, index.html, remote-entry-stub.js, vite.config.mjs
        ├── widget-os/            ← App.jsx, main.jsx, index.html, remote-entry-stub.js, vite.config.mjs
        └── widget-updates/       ← App.jsx, main.jsx, index.html, remote-entry-stub.js, vite.config.mjs
```

---

## Wujie Micro-App Helper (`apps/micro-app.js`)

There is no separate `wujie-loader/` package and no `createShadowCache` / `mountWujieApp` / `createWujieApp`. The Wujie sub-app lifecycle is encapsulated by a single helper, `createMicroApp`.

### `createMicroApp(getMountEl) → { render(renderFn) }`

`getMountEl` is a function that resolves the live mount element on each mount — Wujie caches the JS sandbox across navigations but recreates the shadow DOM container, so a captured element would be detached.

`render(renderFn)` wires up `__WUJIE_MOUNT` / `__WUJIE_UNMOUNT`, then dual-boots: it calls `__WUJIE_MOUNT()` explicitly when inside Wujie (`window.__POWERED_BY_WUJIE__`) and calls `mount()` directly when standalone.

`mount()` is idempotent: if the same element is already mounted it returns early. This guard exists because the sub-app calls `__WUJIE_MOUNT()` explicitly AND Wujie calls it again from its own lifecycle (~1s+ later due to Vite's async ESM load); without the guard the second call would re-`createRoot()` on the already-mounted element, tearing down and rebuilding the tree — visible as a flash.

`renderFn` receives `{ colorMode }`, where `colorMode` is read from `window.$wujie?.props?.colorMode` (defaulting to `'light'`).

```js
import { createRoot } from 'react-dom/client';

function getColorMode() {
  return window.$wujie?.props?.colorMode ?? 'light';
}

export function createMicroApp(getMountEl) {
  return {
    render(renderFn) {
      let rootInstance = null;
      let mountedEl = null;

      const mount = () => {
        const el = getMountEl();
        if (!el) {
          return;
        }
        if (rootInstance && mountedEl === el) {
          return;
        }
        rootInstance?.unmount();
        rootInstance = createRoot(el);
        mountedEl = el;
        rootInstance.render(renderFn({ colorMode: getColorMode() }));
      };

      const unmount = () => {
        rootInstance?.unmount();
        rootInstance = null;
        mountedEl = null;
      };

      window.__WUJIE_MOUNT = mount;
      window.__WUJIE_UNMOUNT = unmount;

      if (window.__POWERED_BY_WUJIE__) {
        window.__WUJIE_MOUNT();
      } else {
        mount();
      }
    },
  };
}
```

### Each sub-app `main.jsx`

The `TonicProvider` and Emotion cache live in `main.jsx`, NOT in the component. The component (`App`) takes no `colorMode` / `rootNode` props. The Emotion cache key is the **bare app id** (`widget-os`, `widget-updates`, `inventory`) — there is no `tonic-` prefix. No `environment` prop is passed: inside the Wujie sandbox iframe, `getRootNode()` resolves to the right realm by default (the `environment` prop was dropped in commit `cf7af3bf5`).

```js
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { TonicProvider } from '@tonic-one/react';
import { createMicroApp } from '../micro-app';
import App from './App';

const microApp = createMicroApp(() => document.getElementById('app-root'));

microApp.render(({ colorMode }) => {
  const cache = createCache({ key: 'widget-os', prepend: true });
  return (
    <CacheProvider value={cache}>
      <TonicProvider colorMode={{ value: colorMode }} useCSSBaseline>
        <App />
      </TonicProvider>
    </CacheProvider>
  );
});
```

The `inventory` and `widget-updates` sub-apps are identical except for the cache key (`'inventory'`, `'widget-updates'`).

---

## Wujie Host (`host/`)

`host/apps.jsx` wraps `WujieReact` in a shared `BaseApp` (`sync={false}`, `degrade={false}`, `props` forwarded) and exports three adapters: `WidgetUpdates`, `WidgetOS`, `InventoryView`. The Wujie `name` values are `widget-updates`, `widget-os`, and `inventory`.

Each adapter calls `useMicroAppLifecycle(name, { destroyOnUnmount })`:

- `WidgetUpdates` / `WidgetOS` → `destroyOnUnmount: false` (keep Wujie's default keep-alive).
- `InventoryView` → `destroyOnUnmount: true`. The inventory grid injects a global `col-resize` cursor style during a column-resize drag; if navigation unmounts the grid mid-drag the style would be orphaned in Wujie's reused shadow head and accumulate across remounts, so the app is destroyed to discard that shadow root entirely.

### `useMicroAppLifecycle(name, { destroyOnUnmount })`

```js
import { useEffect } from 'react';
import { destroyApp } from 'wujie';

const useMicroAppLifecycle = (name, { destroyOnUnmount = false } = {}) => {
  useEffect(() => {
    if (!destroyOnUnmount) {
      return undefined;
    }
    return () => {
      destroyApp(name);
    };
  }, [name, destroyOnUnmount]);
};

export default useMicroAppLifecycle;
```

---

## Sub-App Component Contract

Each Wujie / MF sub-app component is just `App` (default export) in `App.jsx`. It owns no provider and takes no props from the loader (the provider is supplied by `main.jsx`), and is environment-agnostic. Not every app reads color mode: `widget-os` calls `useColorMode()` to theme its chart; `widget-updates` and `inventory` do not (they rely on color tokens / the grid's own theming).

Of the two dashboard widgets, only `widget-os` renders an ECharts `<Charts>` (built from the shared device data); `widget-updates` renders a custom progress-bar breakdown from `Box`/`Flex` and imports no charts library. For example `widget-os/App.jsx` (an inner `OSDistributionWidget` that an outer `App` renders):

```jsx
import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Charts } from '@tonic-one/react-charts';
import { Box, Text, useColorMode } from '@tonic-one/react';
import { inventoryApi } from '../../../shared/inventory/api.js';

function OSDistributionWidget() {
  const [rows, setRows] = useState([]);
  const [colorMode] = useColorMode();
  // ... fetches inventoryApi.getDevices(), builds an ECharts option, renders <Charts /> ...
}

function App() {
  return <OSDistributionWidget />;
}

export default App;
```

The `inventory` sub-app instead renders a `<DataGrid>` (no `useColorMode`) inside a definite-height flex column so `heightMode="fit-container"` can measure:

```jsx
<DataGrid
  heightMode="fit-container"
  columns={columns}
  data={rows}
  getRowId={(row) => row.id}
  isLoading={loading}
  isColumnResizable
  isColumnSortable
  autoSorting
  showPagination
  autoPagination
  pageSizeOptions={[100, 200, 500]}
  initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }}
/>
```

> Note: the Wujie `widget-os/App.jsx` defines an inner `OSDistributionWidget` and exports an `App` that renders it; the MF `widget-os/App.jsx` exports the widget directly as the default `App`. Both default-export `App`.

---

## MF Remote Contract

Each MF remote has both `App.jsx` (the widget) and `main.jsx` (the federated entry, exposed as `./main`). The remote's `main.jsx` owns the Emotion cache + `TonicProvider` and is the component the shell lazy-loads. The cache key is the **bare app id** — no `tonic-` prefix. `useCSSBaseline` is omitted (the shell already applies a global reset to the shared document). No `colorMode` default beyond `'light'`, and no `environment`/`rootNode` (remotes mount into the main document, not a shadow root).

```jsx
// remotes/widget-os/main.jsx
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { TonicProvider } from '@tonic-one/react';
import App from './App.jsx';

const cache = createCache({ key: 'widget-os', prepend: true });

export default function RemoteApp({ colorMode = 'light' }) {
  return (
    <CacheProvider value={cache}>
      <TonicProvider colorMode={{ value: colorMode }}>
        <App />
      </TonicProvider>
    </CacheProvider>
  );
}
```

The federation `name` in `vite.config.mjs` uses the underscore form for the two widgets (`widget_os`, `widget_updates`) because JS module identifiers cannot contain hyphens; `inventory` has no hyphen so it stays `inventory`. The shell's federation name is `mfe_shell`. Each remote also exposes only `./main`, shares `react` / `react-dom` as singletons (the component libraries are intentionally bundled, not shared), and ships a `remote-entry-stub.js` so the remote's own `index.html` has a module to load (the real `remoteEntry.js` is emitted by `@module-federation/vite` from `exposes`).

---

## MF Shell (`shell/`)

`shell/remotes.jsx` declares the three remotes in three lines via `createRemote`:

```jsx
import { createRemote } from './createRemote.jsx';

export const WidgetUpdates = createRemote(() => import('widget_updates/main'));
export const WidgetOS = createRemote(() => import('widget_os/main'));
export const InventoryView = createRemote(() => import('inventory/main'));
```

`createRemote.jsx` wraps `lazy()` + `Suspense` with a `LoadingSlot` (a centered `Spinner`), so callers declare WHAT to load, not HOW to handle loading state:

```jsx
import { Box, Spinner } from '@tonic-one/react';
import { lazy, Suspense } from 'react';

function LoadingSlot() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: '8x' }}>
      <Spinner />
    </Box>
  );
}

export function createRemote(importFactory) {
  const LazyComponent = lazy(importFactory);
  return function RemoteComponent(props) {
    return (
      <Suspense fallback={<LoadingSlot />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
```

---

## Host / Shell `main.jsx` Symmetry

Both hosts are structurally identical. Only the adapter import and the layout label differ; both mount into `#root`.

| | Wujie host | MF shell |
|---|---|---|
| Adapter import | `from './apps'` (WujieReact wrappers) | `from './remotes'` (lazy+Suspense wrappers) |
| Layout label | `"Wujie"` | `"Module Federation"` |
| Root element | `root` | `root` |

`colorMode` is read once at module scope from **`localStorage`** (`'tonic-one-color-mode'`), NOT from a URL param. The docs page remounts the iframe on color-mode change, so the module-scope value is always fresh.

```jsx
import { Box, Flex, TonicProvider, createTheme } from '@tonic-one/react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import GlobalStyles from './GlobalStyles';
import Layout from './Layout';
import { WidgetUpdates, WidgetOS, InventoryView } from './apps'; // or './remotes'

const colorMode = localStorage.getItem('tonic-one-color-mode') === 'dark' ? 'dark' : 'light';

const theme = createTheme();

function DashboardView() {
  return (
    <Flex sx={{ flexWrap: 'wrap', gap: '4x', p: '4x', alignItems: 'flex-start' }}>
      <Box sx={{ flex: '1 1 280px', height: 320 }}>
        <WidgetUpdates colorMode={colorMode} />
      </Box>
      <Box sx={{ flex: '1 1 280px', height: 320 }}>
        <WidgetOS colorMode={colorMode} />
      </Box>
    </Flex>
  );
}

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <TonicProvider theme={theme} colorMode={{ value: colorMode }} useCSSBaseline>
      <GlobalStyles />
      <Layout label="Wujie" activeView={activeView} onSelectView={setActiveView}>
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'inventory' && <InventoryView colorMode={colorMode} />}
      </Layout>
    </TonicProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
```

---

## Page Setup (`index.html`, `GlobalStyles`, `Layout`)

Three pieces of chrome are load-bearing for layout and color mode:

- **`index.html` full-height chain**: every page sets `html, body { height: 100%; margin: 0 }`, and each Wujie sub-app additionally sets `#app-root { height: 100% }`. This definite-height chain is what lets the inventory `DataGrid` (`heightMode="fit-container"`) and the flex layouts resolve a real height instead of collapsing to `auto`.
- **Color-mode flash guard**: each host/shell `index.html` runs a **blocking inline** `<script>` (not `type="module"`, so it runs before first paint) that reads `localStorage['tonic-one-color-mode']` and sets `data-color-scheme` + the `color-scheme` style on `<html>`, with a matching `html[data-color-scheme="dark"]` background rule — preventing a white flash before React mounts in dark mode.
- **`GlobalStyles.jsx`** (`@emotion/react` `<Global>`): sets `#root { height: 100% }`, `:root/:host { color-scheme }`, scrollbar colors, the body `font-size` + `line-height` from theme tokens, and a `:focus:not(:focus-visible) { outline: none }` reset.
- **`Layout.jsx`**: renders the header label plus a fixed-width sidebar nav (Dashboard / Inventory) whose items drive `activeView` via `onSelectView`.

The Wujie host's `apps.jsx` builds each `WujieReact` `url` from `${window.location.origin}${__BASE_PATH__}/mfe-wujie/apps/<app>/index.html` — an **explicit `index.html`** because Next.js serving `public/` does not resolve a trailing-slash directory to `index.html`.

---

## Build & Static Hosting (`vite.config.mjs`)

Every app builds **statically into `packages/react-docs/public/`** (no dev server) and is served by Next.js as a static asset. Each config sets:

- `root: dirname` and `build.outDir` into the matching `public/mfe-*/…` folder, with `base` set to the same-origin path Next serves the app from (`basePath = TONIC_ONE_REACT_DOCS_BASE_PATH`):
  - Wujie host → `${basePath}/mfe-wujie/`
  - Wujie sub-app → `${basePath}/mfe-wujie/apps/<app>/`
  - MF shell → `${basePath}/mfe-module-federation/shell/`
  - MF remote → `${basePath}/mfe-module-federation/<app>/`

  The Wujie host uses `emptyOutDir: false` (it shares `public/mfe-wujie/` with the sub-apps built separately); the others use `emptyOutDir: true`.

MF shell + remotes additionally run `federation()` from `@module-federation/vite`:

- Remotes: `name` (`widget_os` / `widget_updates` / `inventory`), `filename: 'remoteEntry.js'`, `manifest: true`, `dev: false`, `dts: false`, `exposes: { './main': path.resolve(dirname, 'main.jsx') }`, and `shared: { react, 'react-dom' }` as **singletons only** — the component libraries (`@tonic-one/react`, `@tonic-one/react-data-grid`) are intentionally **bundled per remote**, not shared (sharing them as singletons crashed module-eval on a `DataGridCell` binding).
- Build: `target: 'esnext'`, `minify: false`, and `rollupOptions.external: ['vite/module-runner']` (the MF runtime plugin statically references this Vite 8+ subpath but never loads it on Vite 5).
- The shell declares each remote in its own `federation({ remotes })` block, resolved at runtime from base-path-prefixed root-relative URLs (`${TONIC_ONE_REACT_DOCS_BASE_PATH}/mfe-module-federation/<app>/mf-manifest.json`) that resolve same-origin from what Next serves out of `public/`.

---

## Key Conventions

- **`useCSSBaseline`**: on every `TonicProvider` EXCEPT MF remotes' `main.jsx`. Wujie sub-apps use it (shadow boundary blocks host styles); the host/shell `main.jsx` uses it (global reset); MF remotes omit it (shell already applies it to the shared document).
- **App ID == cache key**: the Emotion cache key is the bare app id — `widget-os`, `widget-updates`, `inventory` — in BOTH strategies. There is no `tonic-` prefix and no internal key transformation; each `main.jsx` passes the literal key to `createCache`.
- **Naming per strategy**:

  | app id | Wujie `name` | MF federation `name` | Emotion cache key (both) |
  |---|---|---|---|
  | `widget-os` | `widget-os` | `widget_os` | `widget-os` |
  | `widget-updates` | `widget-updates` | `widget_updates` | `widget-updates` |
  | `inventory` | `inventory` | `inventory` | `inventory` |

  MF federation names replace hyphens with underscores because JS identifiers cannot contain hyphens (`inventory` has none, so it is unchanged).
- **`environment` prop**: not passed in either strategy. Wujie sub-apps rely on `getRootNode()` resolving correctly inside the sandbox iframe (the `environment` prop was removed in commit `cf7af3bf5`); MF remotes mount into the main document.
- **Color mode source**: the host/shell reads `localStorage['tonic-one-color-mode']`; Wujie sub-apps read `window.$wujie.props.colorMode` (forwarded via the `props` prop on `WujieReact`); MF remotes receive `colorMode` as a React prop from the shell.

---

## Deferred Topics

- **Unifying `CacheProvider` into `TonicProvider`**: today each `main.jsx` constructs its own Emotion cache and wraps `TonicProvider` in `CacheProvider`. Folding the cache key into `TonicProvider` (so callers never import `CacheProvider`) is a separate design tracked under `@tonic-one/react`.
