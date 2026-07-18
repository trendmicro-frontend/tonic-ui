import { _ as __vitePreload } from './preload-helper-D00R3Sny.js';

const __mfCacheGlobalKey = "__mf_module_cache__";
globalThis[__mfCacheGlobalKey] ||= { share: {}, remote: {} };
globalThis[__mfCacheGlobalKey].share ||= {};
globalThis[__mfCacheGlobalKey].remote ||= {};
const __mfModuleCache = globalThis[__mfCacheGlobalKey];
for (const __mfShareKey of Object.keys(__mfModuleCache.share)) {
  if (__mfShareKey.startsWith("default:")) {
    const __mfLegacyShareKey = __mfShareKey.slice("default:".length);
    if (__mfModuleCache.share[__mfLegacyShareKey] === undefined) {
      __mfModuleCache.share[__mfLegacyShareKey] = __mfModuleCache.share[__mfShareKey];
    }
  } else if (!__mfShareKey.includes(":")) {
    const __mfDefaultShareKey = "default:" + __mfShareKey;
    if (__mfModuleCache.share[__mfDefaultShareKey] === undefined) {
      __mfModuleCache.share[__mfDefaultShareKey] = __mfModuleCache.share[__mfShareKey];
    }
  }
}

    let hostInitPromise;
    async function initHost() {
      if (!hostInitPromise) {
        hostInitPromise = (async () => {
          
          const remoteEntry = await __vitePreload(() => import('../remoteEntry.js'),true              ?[]:void 0);
          const runtime = await remoteEntry.init();
          const usedShared = {
      "react": {
            version: "19.2.7",
            scope: "default",
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.7",
              strictVersion: false,
              
            }
          },
"react-dom": {
            version: "19.2.7",
            scope: "default",
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.7",
              strictVersion: false,
              
            }
          }
    };
          const __mfGetSharedCacheKey = (pkg, singleton, version, scope) => {
            const normalizedScope = Array.isArray(scope) ? scope[0] : scope;
            const prefix = (normalizedScope || "default") + ":";
            return singleton || !version ? prefix + pkg : prefix + pkg + "@" + version;
          };
          const __mfNormalizeRuntimeShare = (mod) => {
            let current = mod;
            for (let i = 0; i < 5; i++) {
              const defaultExport = current?.default;
              if (!defaultExport || typeof defaultExport !== "object" || Object.keys(defaultExport).length === 0) break;
              const namedValues = Object.keys(current).filter((key) => key !== "default").map((key) => current[key]);
              if (namedValues.length > 0 && namedValues.some((value) => value !== undefined)) break;
              current = defaultExport;
            }
            return current;
          };
          
          for (const [pkg, share] of Object.entries(usedShared)) {
            const cacheKey = __mfGetSharedCacheKey(pkg, share.shareConfig?.singleton, share.version, share.scope);
            if (__mfModuleCache.share[cacheKey] !== undefined) {
              continue;
            }
            await runtime.loadShare(pkg, {
              customShareInfo: { shareConfig: share.shareConfig }
            }).then((factory) => {
              const mod = typeof factory === "function" ? factory() : factory;
              return Promise.resolve(mod).then((resolved) => {
                __mfModuleCache.share[cacheKey] = __mfNormalizeRuntimeShare(resolved);
              });
            });
          }
          
          const __mfRemotePreloads = [];
          await Promise.all(__mfRemotePreloads);
          return runtime;
        })();
      }
      return hostInitPromise;
    }
    hostInitPromise = initHost();

export { hostInitPromise, initHost };
