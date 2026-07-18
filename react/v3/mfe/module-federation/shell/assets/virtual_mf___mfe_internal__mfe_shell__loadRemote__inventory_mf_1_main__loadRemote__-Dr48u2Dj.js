import { hostInitPromise } from './hostInit-Cg76o7xS.js';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

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
    
    function __mfStartRemoteLoad() {
      
      const pendingKey = "__mf_pending__inventory/main";
      if (!__mfModuleCache.remote[pendingKey]) {
        __mfModuleCache.remote[pendingKey] = hostInitPromise
          .then((runtime) => {
            
            return runtime.loadRemote("inventory/main");
          })
          .then((mod) => Promise.resolve(mod?.__mf_remote_dependency_pending).then(() => mod))
          .then((mod) => {
            __mfModuleCache.remote["inventory/main"] = mod;
            delete __mfModuleCache.remote[pendingKey];
            return mod;
          })
          .catch((error) => {
            delete __mfModuleCache.remote[pendingKey];
            throw error;
          });
      }
      return __mfModuleCache.remote[pendingKey];
    }
    
    function __mfCreateDeferredRemoteProxy() {
      let pendingPromise;
      const ensurePending = () => {
        pendingPromise ||= __mfStartRemoteLoad();
        return pendingPromise;
      };
      const getModule = () => __mfModuleCache.remote["inventory/main"];
      const proxyTarget = function (...args) {
        pendingPromise ||= __mfStartRemoteLoad();
        const mod = getModule();
        const fn = mod && (mod.default ?? mod);
        if (fn !== undefined && fn !== null) {
          return fn.apply(this, args);
        }
        return null;
      };
      return new Proxy(proxyTarget, {
        get(_target, prop) {
          if (prop === "__mf_is_remote_proxy") return true;
          if (prop === "__esModule") return true;
          if (prop === "then") return undefined;
          if (prop === Symbol.toPrimitive || prop === "toString")
            return () => "[MF remote: pending]";
          const mod = getModule();
          if (mod) {
            return prop in mod ? mod[prop] : mod.default?.[prop];
          }
          pendingPromise ||= __mfStartRemoteLoad();
          if (prop === "default") return proxyTarget;
          throw ensurePending();
        },
        has(_target, prop) {
          const mod = getModule();
          if (mod) return prop in mod;
          return (
            prop === "default" ||
            prop === "__esModule" ||
            prop === "__mf_is_remote_proxy"
          );
        },
        ownKeys() {
          const mod = getModule();
          const keys = new Set(mod ? Reflect.ownKeys(mod) : []);
          for (const k of Reflect.ownKeys(proxyTarget)) {
            const d = Object.getOwnPropertyDescriptor(proxyTarget, k);
            if (d && !d.configurable) keys.add(k);
          }
          return Array.from(keys);
        },
        getOwnPropertyDescriptor(_target, prop) {
          const targetDesc = Object.getOwnPropertyDescriptor(proxyTarget, prop);
          if (targetDesc && !targetDesc.configurable) return targetDesc;
          const mod = getModule();
          if (!mod) return undefined;
          return Object.getOwnPropertyDescriptor(mod, prop) || {
            configurable: true,
            enumerable: true,
            value: mod[prop],
          };
        },
        apply(target, thisArg, args) {
          return target.apply(thisArg, args);
        }
      });
    }
    
    function __mfUnwrapRemoteDefault(mod) {
      if (mod == null) return mod;
      if (mod.__esModule && mod.default != null) return mod.default;
      return mod.default ?? mod;
    }
    let __mfDefaultExport;
    function __mfSyncDefaultExport() {
      __mfDefaultExport = exportModule?.__mf_is_remote_proxy
        ? exportModule
        : __mfUnwrapRemoteDefault(exportModule);
    }
    function __mfAssignRemoteModule(mod) {
      if (mod !== undefined) exportModule = mod;
      __mfSyncDefaultExport();
      return exportModule;
    }
    let __mfRemotePending;
    let exportModule = __mfModuleCache.remote["inventory/main"];
    if (exportModule === undefined) {
      if (typeof window === "undefined") {
      __mfRemotePending = __mfStartRemoteLoad().then(__mfAssignRemoteModule);
    } else {
      exportModule = __mfCreateDeferredRemoteProxy();
    }
    }
    __mfSyncDefaultExport();
__mfRemotePending?.then(__mfSyncDefaultExport, () => {});
const __mf_remote_pending =
  __mfRemotePending ??
  __mfStartRemoteLoad().then(__mfAssignRemoteModule);

const virtual_mf___mfe_internal__mfe_shell__loadRemote__inventory_mf_1_main__loadRemote__ = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  __mf_remote_pending,
  get default () { return __mfDefaultExport; }
}, [exportModule]);

export { virtual_mf___mfe_internal__mfe_shell__loadRemote__inventory_mf_1_main__loadRemote__ as v };
