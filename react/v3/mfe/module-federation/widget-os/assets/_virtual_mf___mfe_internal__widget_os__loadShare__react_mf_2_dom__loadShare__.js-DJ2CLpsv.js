import { g as getDefaultExportFromCjs } from './_virtual_mf___mfe_internal__widget_os__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-DJVUU5ri.js';
import { _ as __mfDefaultExport$1 } from './__virtual_mf___mfe_internal__widget_os__loadShare__react__loadShare__.js_commonjs-proxy-CUxbQ29s.js';

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

var reactDom = {exports: {}};

var reactDom_production = {};

/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = __mfDefaultExport$1;
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function noop() {}
var Internals = {
    d: {
      f: noop,
      r: function () {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  },
  REACT_PORTAL_TYPE = Symbol.for("react.portal");
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function getCrossOriginStringAs(as, input) {
  if ("font" === as) return "";
  if ("string" === typeof input)
    return "use-credentials" === input ? input : "";
}
reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  Internals;
reactDom_production.createPortal = function (children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (
    !container ||
    (1 !== container.nodeType &&
      9 !== container.nodeType &&
      11 !== container.nodeType)
  )
    throw Error(formatProdErrorMessage(299));
  return createPortal$1(children, container, null, key);
};
reactDom_production.flushSync = function (fn) {
  var previousTransition = ReactSharedInternals.T,
    previousUpdatePriority = Internals.p;
  try {
    if (((ReactSharedInternals.T = null), (Internals.p = 2), fn)) return fn();
  } finally {
    (ReactSharedInternals.T = previousTransition),
      (Internals.p = previousUpdatePriority),
      Internals.d.f();
  }
};
reactDom_production.preconnect = function (href, options) {
  "string" === typeof href &&
    (options
      ? ((options = options.crossOrigin),
        (options =
          "string" === typeof options
            ? "use-credentials" === options
              ? options
              : ""
            : void 0))
      : (options = null),
    Internals.d.C(href, options));
};
reactDom_production.prefetchDNS = function (href) {
  "string" === typeof href && Internals.d.D(href);
};
reactDom_production.preinit = function (href, options) {
  if ("string" === typeof href && options && "string" === typeof options.as) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
      integrity =
        "string" === typeof options.integrity ? options.integrity : void 0,
      fetchPriority =
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0;
    "style" === as
      ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin: crossOrigin,
            integrity: integrity,
            fetchPriority: fetchPriority
          }
        )
      : "script" === as &&
        Internals.d.X(href, {
          crossOrigin: crossOrigin,
          integrity: integrity,
          fetchPriority: fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
  }
};
reactDom_production.preinitModule = function (href, options) {
  if ("string" === typeof href)
    if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        );
        Internals.d.M(href, {
          crossOrigin: crossOrigin,
          integrity:
            "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    } else null == options && Internals.d.M(href);
};
reactDom_production.preload = function (href, options) {
  if (
    "string" === typeof href &&
    "object" === typeof options &&
    null !== options &&
    "string" === typeof options.as
  ) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
    Internals.d.L(href, as, {
      crossOrigin: crossOrigin,
      integrity:
        "string" === typeof options.integrity ? options.integrity : void 0,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
      type: "string" === typeof options.type ? options.type : void 0,
      fetchPriority:
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0,
      referrerPolicy:
        "string" === typeof options.referrerPolicy
          ? options.referrerPolicy
          : void 0,
      imageSrcSet:
        "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
      imageSizes:
        "string" === typeof options.imageSizes ? options.imageSizes : void 0,
      media: "string" === typeof options.media ? options.media : void 0
    });
  }
};
reactDom_production.preloadModule = function (href, options) {
  if ("string" === typeof href)
    if (options) {
      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
      Internals.d.m(href, {
        as:
          "string" === typeof options.as && "script" !== options.as
            ? options.as
            : void 0,
        crossOrigin: crossOrigin,
        integrity:
          "string" === typeof options.integrity ? options.integrity : void 0
      });
    } else Internals.d.m(href);
};
reactDom_production.requestFormReset = function (form) {
  Internals.d.r(form);
};
reactDom_production.unstable_batchedUpdates = function (fn, a) {
  return fn(a);
};
reactDom_production.useFormState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useFormState(action, initialState, permalink);
};
reactDom_production.useFormStatus = function () {
  return ReactSharedInternals.H.useHostTransitionStatus();
};
reactDom_production.version = "19.2.7";

function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production;
}

var reactDomExports = reactDom.exports;
const index = /*@__PURE__*/getDefaultExportFromCjs(reactDomExports);

const __mfPrebuildNamespace = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: index
}, [reactDomExports]);

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
  
const __moduleExports = exportModule;

const _virtual_mf___mfe_internal__widget_os__loadShare__react_mf_2_dom__loadShare__ = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_0,
  createPortal: __mf_1,
  default: __mfDefaultExport,
  flushSync: __mf_2,
  preconnect: __mf_3,
  prefetchDNS: __mf_4,
  preinit: __mf_5,
  preinitModule: __mf_6,
  preload: __mf_7,
  preloadModule: __mf_8,
  requestFormReset: __mf_9,
  unstable_batchedUpdates: __mf_10,
  useFormState: __mf_11,
  useFormStatus: __mf_12,
  version: __mf_13
}, [__moduleExports]);

export { _virtual_mf___mfe_internal__widget_os__loadShare__react_mf_2_dom__loadShare__ as _, __mfLocalShare as a };
