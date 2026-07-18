import { g as getDefaultExportFromCjs } from './_virtual_mf___mfe_internal__inventory__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-DGw0ZAHT.js';

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

var react = {exports: {}};

var react_production = {};

/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
    isMounted: function () {
      return false;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  assign = Object.assign,
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (
    "object" !== typeof partialState &&
    "function" !== typeof partialState &&
    null != partialState
  )
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
var isArrayImpl = Array.isArray;
function noop() {}
var ReactSharedInternals = { H: null, A: null, T: null, S: null },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function ReactElement(type, key, props) {
  var refProp = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== refProp ? refProp : null,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.props);
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch (
        ("string" === typeof thenable.status
          ? thenable.then(noop, noop)
          : ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            )),
        thenable.status)
      ) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = false;
  if (null === children) invokeCallback = true;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
            break;
          case REACT_LAZY_TYPE:
            return (
              (invokeCallback = children._init),
              mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              )
            );
        }
    }
  if (invokeCallback)
    return (
      (callback = callback(children)),
      (invokeCallback =
        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
      isArrayImpl(callback)
        ? ((escapedPrefix = ""),
          null != invokeCallback &&
            (escapedPrefix =
              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (null == callback.key ||
                (children && children.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                invokeCallback
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children))
    for (var i = 0; i < children.length; i++)
      (nameSoFar = children[i]),
        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if (((i = getIteratorFn(children)), "function" === typeof i))
    for (
      children = i.call(children), i = 0;
      !(nameSoFar = children.next()).done;

    )
      (nameSoFar = nameSoFar.value),
        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " +
        ("[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array) +
        "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function (moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 1), (payload._result = moduleObject);
      },
      function (error) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 2), (payload._result = error);
      }
    );
    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError =
    "function" === typeof reportError
      ? reportError
      : function (error) {
          if (
            "object" === typeof window &&
            "function" === typeof window.ErrorEvent
          ) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message:
                "object" === typeof error &&
                null !== error &&
                "string" === typeof error.message
                  ? String(error.message)
                  : String(error),
              error: error
            });
            if (!window.dispatchEvent(event)) return;
          } else if (
            "object" === typeof process &&
            "function" === typeof process.emit
          ) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        },
  Children = {
    map: mapChildren,
    forEach: function (children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function () {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function (children) {
      var n = 0;
      mapChildren(children, function () {
        n++;
      });
      return n;
    },
    toArray: function (children) {
      return (
        mapChildren(children, function (child) {
          return child;
        }) || []
      );
    },
    only: function (children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
react_production.Activity = REACT_ACTIVITY_TYPE;
react_production.Children = Children;
react_production.Component = Component;
react_production.Fragment = REACT_FRAGMENT_TYPE;
react_production.Profiler = REACT_PROFILER_TYPE;
react_production.PureComponent = PureComponent;
react_production.StrictMode = REACT_STRICT_MODE_TYPE;
react_production.Suspense = REACT_SUSPENSE_TYPE;
react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  ReactSharedInternals;
react_production.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (size) {
    return ReactSharedInternals.H.useMemoCache(size);
  }
};
react_production.cache = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};
react_production.cacheSignal = function () {
  return null;
};
react_production.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign({}, element.props),
    key = element.key;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      !hasOwnProperty.call(config, propName) ||
        "key" === propName ||
        "__self" === propName ||
        "__source" === propName ||
        ("ref" === propName && void 0 === config.ref) ||
        (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, props);
};
react_production.createContext = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};
react_production.createElement = function (type, config, children) {
  var propName,
    props = {},
    key = null;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      hasOwnProperty.call(config, propName) &&
        "key" !== propName &&
        "__self" !== propName &&
        "__source" !== propName &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, props);
};
react_production.createRef = function () {
  return { current: null };
};
react_production.forwardRef = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
react_production.isValidElement = isValidElement;
react_production.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
react_production.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
react_production.startTransition = function (scope) {
  var prevTransition = ReactSharedInternals.T,
    currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  try {
    var returnValue = scope(),
      onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish &&
      onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue &&
      null !== returnValue &&
      "function" === typeof returnValue.then &&
      returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    null !== prevTransition &&
      null !== currentTransition.types &&
      (prevTransition.types = currentTransition.types),
      (ReactSharedInternals.T = prevTransition);
  }
};
react_production.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};
react_production.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
react_production.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};
react_production.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
react_production.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};
react_production.useDebugValue = function () {};
react_production.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};
react_production.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};
react_production.useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};
react_production.useId = function () {
  return ReactSharedInternals.H.useId();
};
react_production.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};
react_production.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};
react_production.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};
react_production.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
react_production.useOptimistic = function (passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
};
react_production.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};
react_production.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};
react_production.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};
react_production.useSyncExternalStore = function (
  subscribe,
  getSnapshot,
  getServerSnapshot
) {
  return ReactSharedInternals.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
react_production.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};
react_production.version = "19.2.7";

{
  react.exports = react_production;
}

var reactExports = react.exports;
const index = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

const __mfPrebuildNamespace = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: index
}, [reactExports]);

const __mfPrebuildExports = __mfPrebuildNamespace;
    const __mf_0$1 = __mfPrebuildExports["Activity"];
    const __mf_1$1 = __mfPrebuildExports["Children"];
    const __mf_2$1 = __mfPrebuildExports["Component"];
    const __mf_3$1 = __mfPrebuildExports["Fragment"];
    const __mf_4$1 = __mfPrebuildExports["Profiler"];
    const __mf_5$1 = __mfPrebuildExports["PureComponent"];
    const __mf_6$1 = __mfPrebuildExports["StrictMode"];
    const __mf_7$1 = __mfPrebuildExports["Suspense"];
    const __mf_8$1 = __mfPrebuildExports["__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE"];
    const __mf_9$1 = __mfPrebuildExports["__COMPILER_RUNTIME"];
    const __mf_10$1 = __mfPrebuildExports["cache"];
    const __mf_11$1 = __mfPrebuildExports["cacheSignal"];
    const __mf_12$1 = __mfPrebuildExports["cloneElement"];
    const __mf_13$1 = __mfPrebuildExports["createContext"];
    const __mf_14$1 = __mfPrebuildExports["createElement"];
    const __mf_15$1 = __mfPrebuildExports["createRef"];
    const __mf_16$1 = __mfPrebuildExports["forwardRef"];
    const __mf_17$1 = __mfPrebuildExports["isValidElement"];
    const __mf_18$1 = __mfPrebuildExports["lazy"];
    const __mf_19$1 = __mfPrebuildExports["memo"];
    const __mf_20$1 = __mfPrebuildExports["startTransition"];
    const __mf_21$1 = __mfPrebuildExports["unstable_useCacheRefresh"];
    const __mf_22$1 = __mfPrebuildExports["use"];
    const __mf_23$1 = __mfPrebuildExports["useActionState"];
    const __mf_24$1 = __mfPrebuildExports["useCallback"];
    const __mf_25$1 = __mfPrebuildExports["useContext"];
    const __mf_26$1 = __mfPrebuildExports["useDebugValue"];
    const __mf_27$1 = __mfPrebuildExports["useDeferredValue"];
    const __mf_28$1 = __mfPrebuildExports["useEffect"];
    const __mf_29$1 = __mfPrebuildExports["useEffectEvent"];
    const __mf_30$1 = __mfPrebuildExports["useId"];
    const __mf_31$1 = __mfPrebuildExports["useImperativeHandle"];
    const __mf_32$1 = __mfPrebuildExports["useInsertionEffect"];
    const __mf_33$1 = __mfPrebuildExports["useLayoutEffect"];
    const __mf_34$1 = __mfPrebuildExports["useMemo"];
    const __mf_35$1 = __mfPrebuildExports["useOptimistic"];
    const __mf_36$1 = __mfPrebuildExports["useReducer"];
    const __mf_37$1 = __mfPrebuildExports["useRef"];
    const __mf_38$1 = __mfPrebuildExports["useState"];
    const __mf_39$1 = __mfPrebuildExports["useSyncExternalStore"];
    const __mf_40$1 = __mfPrebuildExports["useTransition"];
    const __mf_41$1 = __mfPrebuildExports["version"];

const __mfLocalShare = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Activity: __mf_0$1,
  Children: __mf_1$1,
  Component: __mf_2$1,
  Fragment: __mf_3$1,
  Profiler: __mf_4$1,
  PureComponent: __mf_5$1,
  StrictMode: __mf_6$1,
  Suspense: __mf_7$1,
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_8$1,
  __COMPILER_RUNTIME: __mf_9$1,
  cache: __mf_10$1,
  cacheSignal: __mf_11$1,
  cloneElement: __mf_12$1,
  createContext: __mf_13$1,
  createElement: __mf_14$1,
  createRef: __mf_15$1,
  default: __mfPrebuildExports,
  forwardRef: __mf_16$1,
  isValidElement: __mf_17$1,
  lazy: __mf_18$1,
  memo: __mf_19$1,
  startTransition: __mf_20$1,
  unstable_useCacheRefresh: __mf_21$1,
  use: __mf_22$1,
  useActionState: __mf_23$1,
  useCallback: __mf_24$1,
  useContext: __mf_25$1,
  useDebugValue: __mf_26$1,
  useDeferredValue: __mf_27$1,
  useEffect: __mf_28$1,
  useEffectEvent: __mf_29$1,
  useId: __mf_30$1,
  useImperativeHandle: __mf_31$1,
  useInsertionEffect: __mf_32$1,
  useLayoutEffect: __mf_33$1,
  useMemo: __mf_34$1,
  useOptimistic: __mf_35$1,
  useReducer: __mf_36$1,
  useRef: __mf_37$1,
  useState: __mf_38$1,
  useSyncExternalStore: __mf_39$1,
  useTransition: __mf_40$1,
  version: __mf_41$1
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
    let exportModule = __mfModuleCache.share["default:react"];
    if (exportModule === undefined) {
      exportModule = __mfNormalizeShareModule(__mfLocalShare);
      __mfModuleCache.share["default:react"] = exportModule;
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
    const { Activity: __mf_0, Children: __mf_1, Component: __mf_2, Fragment: __mf_3, Profiler: __mf_4, PureComponent: __mf_5, StrictMode: __mf_6, Suspense: __mf_7, __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_8, __COMPILER_RUNTIME: __mf_9, cache: __mf_10, cacheSignal: __mf_11, cloneElement: __mf_12, createContext: __mf_13, createElement: __mf_14, createRef: __mf_15, forwardRef: __mf_16, isValidElement: __mf_17, lazy: __mf_18, memo: __mf_19, startTransition: __mf_20, unstable_useCacheRefresh: __mf_21, use: __mf_22, useActionState: __mf_23, useCallback: __mf_24, useContext: __mf_25, useDebugValue: __mf_26, useDeferredValue: __mf_27, useEffect: __mf_28, useEffectEvent: __mf_29, useId: __mf_30, useImperativeHandle: __mf_31, useInsertionEffect: __mf_32, useLayoutEffect: __mf_33, useMemo: __mf_34, useOptimistic: __mf_35, useReducer: __mf_36, useRef: __mf_37, useState: __mf_38, useSyncExternalStore: __mf_39, useTransition: __mf_40, version: __mf_41 } = exportModule;
  
const __moduleExports = exportModule;

const React = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  Activity: __mf_0,
  Children: __mf_1,
  Component: __mf_2,
  Fragment: __mf_3,
  Profiler: __mf_4,
  PureComponent: __mf_5,
  StrictMode: __mf_6,
  Suspense: __mf_7,
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: __mf_8,
  __COMPILER_RUNTIME: __mf_9,
  cache: __mf_10,
  cacheSignal: __mf_11,
  cloneElement: __mf_12,
  createContext: __mf_13,
  createElement: __mf_14,
  createRef: __mf_15,
  default: __mfDefaultExport,
  forwardRef: __mf_16,
  isValidElement: __mf_17,
  lazy: __mf_18,
  memo: __mf_19,
  startTransition: __mf_20,
  unstable_useCacheRefresh: __mf_21,
  use: __mf_22,
  useActionState: __mf_23,
  useCallback: __mf_24,
  useContext: __mf_25,
  useDebugValue: __mf_26,
  useDeferredValue: __mf_27,
  useEffect: __mf_28,
  useEffectEvent: __mf_29,
  useId: __mf_30,
  useImperativeHandle: __mf_31,
  useInsertionEffect: __mf_32,
  useLayoutEffect: __mf_33,
  useMemo: __mf_34,
  useOptimistic: __mf_35,
  useReducer: __mf_36,
  useRef: __mf_37,
  useState: __mf_38,
  useSyncExternalStore: __mf_39,
  useTransition: __mf_40,
  version: __mf_41
}, [__moduleExports]);

export { React as R, __mfPrebuildNamespace as _, __mf_33 as a, __mf_13 as b, __mf_16 as c, __mf_25 as d, __mf_14 as e, __mf_3 as f, __mf_37 as g, __mf_34 as h, __mf_28 as i, __mf_38 as j, __mfDefaultExport as k, __mf_19 as l, __mf_24 as m, __mf_36 as n, __mf_5 as o, __mfLocalShare as p };
