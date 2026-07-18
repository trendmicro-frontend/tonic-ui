import { _ as __vitePreload } from './preload-helper-B-CCBV6A.js';

const cssAssetMap = {};
    const injectedCssHrefs = new Set();
    let exposeLoadQueue = Promise.resolve();

    async function importExposedModule(loader) {
      const currentLoad = exposeLoadQueue.then(loader, loader);
      exposeLoadQueue = currentLoad.then(
        () => undefined,
        () => undefined
      );
      return currentLoad;
    }

    async function injectCssAssets(exposeKey) {
      if (typeof document === "undefined") {
        return;
      }

      // Replaced at build time with expose -> css asset paths.
      const cssAssets = cssAssetMap[exposeKey] || [];

      await Promise.all(
        cssAssets.map((cssAsset) => {
          const href = new URL(cssAsset, import.meta.url).href;

          // Same expose can be resolved multiple times in one page.
          if (injectedCssHrefs.has(href)) {
            return Promise.resolve();
          }
          injectedCssHrefs.add(href);

          const existingLink = document.querySelector(
            `link[rel="stylesheet"][data-mf-href="${href}"]`
          );
          if (existingLink) {
            return Promise.resolve();
          }

          return new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.setAttribute("data-mf-href", href);
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`[Module Federation] Failed to load CSS asset: ${href}`));
            document.head.appendChild(link);
          });
        })
      );
    }

    const virtual_mfExposes___mfe_internal__widget_os__remoteEntry_js = {
    
        "./main": async () => {
          await injectCssAssets("./main");
          const importModule = await importExposedModule(
            () => __vitePreload(() => import('./main-Dx1fLWMH.js'),true              ?[]:void 0)
          );
          const exportModule = {};
          Object.assign(exportModule, importModule);
          Object.defineProperty(exportModule, "__esModule", {
            value: true,
            enumerable: false
          });
          return exportModule
        }
      
  };

export { virtual_mfExposes___mfe_internal__widget_os__remoteEntry_js as default };
