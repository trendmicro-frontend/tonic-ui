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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;

{
  jsxRuntime.exports = reactJsxRuntime_production;
}

var jsxRuntimeExports = jsxRuntime.exports;
const __mfPrebuildDefault = /*@__PURE__*/getDefaultExportFromCjs(jsxRuntimeExports);

const __mfPrebuildNamespace = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: __mfPrebuildDefault
}, [jsxRuntimeExports]);

const __mfPrebuildExports = __mfPrebuildDefault ?? __mfPrebuildNamespace;
    const Fragment = __mfPrebuildExports.Fragment;
    const jsx = __mfPrebuildExports.jsx;
    const jsxs = __mfPrebuildExports.jsxs;

const __mfLocalShare = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Fragment,
	default: __mfPrebuildExports,
	jsx,
	jsxs
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
    let exportModule = __mfModuleCache.share["default:react/jsx-runtime"];
    if (exportModule === undefined) {
      exportModule = __mfNormalizeShareModule(__mfLocalShare);
      __mfModuleCache.share["default:react/jsx-runtime"] = exportModule;
    }
    (() => {
      let current = exportModule;
      for (let i = 0; i < 5; i++) {
        const defaultExport = current?.default;
        if (!defaultExport || typeof defaultExport !== "object") return defaultExport ?? current;
        current = defaultExport;
      }
      return current;
    })();
    const { Fragment: __mf_0, jsx: __mf_1, jsxs: __mf_2 } = exportModule;

export { __mf_1 as _, __mf_2 as a, __mfLocalShare as b, getDefaultExportFromCjs as g };
