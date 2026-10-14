import { createRoot } from 'react-dom/client';

function getColorMode() {
  return window.$wujie?.props?.colorMode ?? 'light';
}

/**
 * Encapsulates the Wujie sub-app mount/unmount lifecycle boilerplate.
 *
 * Wujie caches the JS sandbox across navigations but recreates the shadow DOM container, so the mount
 * element must be resolved fresh on each mount. The returned `render` wires up `__WUJIE_MOUNT` / `__WUJIE_UNMOUNT`
 * so the sub-app runs correctly both standalone and inside Wujie.
 *
 * @param {() => (HTMLElement | null)} getMountEl - Resolves the current live mount element on each mount.
 * @returns {{ render: (renderFn: (ctx: { colorMode: string }) => React.ReactNode) => void }} The micro-app instance.
 */
export function createMicroApp(getMountEl) {
  return {
    render(renderFn) {
      let rootInstance = null;
      let mountedEl = null;

      const mount = () => {
        // Wujie caches the JS sandbox across navigations but recreates the
        // shadow DOM container, so a captured element would be detached.
        // Call getMountEl() each mount to resolve the current live element.
        const el = getMountEl();
        if (!el) {
          return;
        }
        // Idempotent mount. We call __WUJIE_MOUNT() explicitly below (Vite's
        // async ESM load means Wujie's own lifecycle call lands ~1s+ late), and
        // Wujie ALSO calls __WUJIE_MOUNT() from its lifecycle. Without this guard
        // the second call would createRoot() again on the already-mounted element,
        // tearing down and rebuilding the whole tree — visible as a flash (the grid
        // renders, then blanks and reloads). Skip the duplicate when the same
        // element is already mounted.
        if (rootInstance && mountedEl === el) {
          return;
        }
        // Element was recreated without an intervening unmount: discard the stale root.
        rootInstance?.unmount();
        // Call renderFn fresh each mount so the whole tree (providers, Emotion
        // cache, current colorMode) is rebuilt against the new root.
        rootInstance = createRoot(el);
        mountedEl = el;
        rootInstance.render(renderFn({ colorMode: getColorMode() }));
      };

      const unmount = () => {
        // Wujie calls this on navigate-away. Unmount so component cleanup runs
        // (e.g. ECharts dispose, resize listeners); the next mount() rebuilds.
        rootInstance?.unmount();
        rootInstance = null;
        mountedEl = null;
      };

      window.__WUJIE_MOUNT = mount;
      window.__WUJIE_UNMOUNT = unmount;

      // Vite loads asynchronously, so Wujie cannot guarantee __WUJIE_MOUNT
      // is called at the right time. Call it explicitly when inside Wujie.
      if (window.__POWERED_BY_WUJIE__) {
        window.__WUJIE_MOUNT();
      } else {
        mount();
      }
    },
  };
}
