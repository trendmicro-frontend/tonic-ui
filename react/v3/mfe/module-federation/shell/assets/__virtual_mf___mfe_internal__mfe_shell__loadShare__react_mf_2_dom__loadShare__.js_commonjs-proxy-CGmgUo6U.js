import { a as __mfPrebuildNamespace } from './_virtual_mf___mfe_internal__mfe_shell__loadShare__react_mf_2_dom__loadShare__.js-CAVWYVvg.js';

const __mfPrebuildExports = __mfPrebuildNamespace;
    const __mf_0$1 = __mfPrebuildExports["__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE"];
    const __mf_1$1 = __mfPrebuildExports["createPortal"];
    const __mf_2$1 = __mfPrebuildExports["flushSync"];
    const __mf_3$1 = __mfPrebuildExports["preconnect"];
    const __mf_4$1 = __mfPrebuildExports["prefetchDNS"];
    const __mf_5$1 = __mfPrebuildExports["preinit"];
    const __mf_6$1 = __mfPrebuildExports["preinitModule"];
    const __mf_7$1 = __mfPrebuildExports["preload"];
    const __mf_8$1 = __mfPrebuildExports["preloadModule"];
    const __mf_9$1 = __mfPrebuildExports["requestFormReset"];
    const __mf_10$1 = __mfPrebuildExports["unstable_batchedUpdates"];
    const __mf_11$1 = __mfPrebuildExports["useFormState"];
    const __mf_12$1 = __mfPrebuildExports["useFormStatus"];
    const __mf_13$1 = __mfPrebuildExports["version"];

const __mfLocalShare = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_0$1,
  createPortal: __mf_1$1,
  default: __mfPrebuildExports,
  flushSync: __mf_2$1,
  preconnect: __mf_3$1,
  prefetchDNS: __mf_4$1,
  preinit: __mf_5$1,
  preinitModule: __mf_6$1,
  preload: __mf_7$1,
  preloadModule: __mf_8$1,
  requestFormReset: __mf_9$1,
  unstable_batchedUpdates: __mf_10$1,
  useFormState: __mf_11$1,
  useFormStatus: __mf_12$1,
  version: __mf_13$1
}, Symbol.toStringTag, { value: 'Module' }));

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

    const __mfNormalizeShareModule = (mod) => {
      let current = mod;
      for (let i = 0; i < 5; i++) {
        const defaultExport = current?.default;
        if (!defaultExport || typeof defaultExport !== "object") break;
        const namedValues = Object.keys(current).filter((key) => key !== "default").map((key) => current[key]);
        if (namedValues.length > 0 && namedValues.some((value) => value !== undefined)) break;
        current = defaultExport;
      }
      return current;
    };
    let exportModule = __mfModuleCache.share["default:react-dom"];
    if (exportModule === undefined) {
      exportModule = __mfNormalizeShareModule(__mfLocalShare);
      __mfModuleCache.share["default:react-dom"] = exportModule;
    }
    const __mfDefaultExport = (() => {
      let current = exportModule;
      for (let i = 0; i < 5; i++) {
        const defaultExport = current?.default;
        if (!defaultExport || typeof defaultExport !== "object") return defaultExport ?? current;
        current = defaultExport;
      }
      return current;
    })();
    const { __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_0, createPortal: __mf_1, flushSync: __mf_2, preconnect: __mf_3, prefetchDNS: __mf_4, preinit: __mf_5, preinitModule: __mf_6, preload: __mf_7, preloadModule: __mf_8, requestFormReset: __mf_9, unstable_batchedUpdates: __mf_10, useFormState: __mf_11, useFormStatus: __mf_12, version: __mf_13 } = exportModule;

export { __mfDefaultExport as _ };
