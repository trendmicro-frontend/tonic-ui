(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4820,2987],{42987:function(e,t,r){"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return f}});var n=r(43219),o=n._(r(2784)),i=n._(r(81066)),u={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function _getInitialProps(e){var t=e.res,r=e.err;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}var a={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}},f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(Error,e);var t,r,n,f=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r=_getPrototypeOf(Error);if(t){var n=_getPrototypeOf(this).constructor;e=Reflect.construct(r,arguments,n)}else e=r.apply(this,arguments);return function(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function Error(){return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,Error),f.apply(this,arguments)}return r=[{key:"render",value:function(){var e=this.props,t=e.statusCode,r=e.withDarkMode,n=this.props.title||u[t]||"An unexpected error has occurred";return o.default.createElement("div",{style:a.error},o.default.createElement(i.default,null,o.default.createElement("title",null,t?t+": "+n:"Application error: a client-side exception has occurred")),o.default.createElement("div",{style:a.desc},o.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(void 0===r||r?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),t?o.default.createElement("h1",{className:"next-error-h1",style:a.h1},t):null,o.default.createElement("div",{style:a.wrap},o.default.createElement("h2",{style:a.h2},this.props.title||t?n:o.default.createElement(o.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}],_defineProperties(Error.prototype,r),n&&_defineProperties(Error,n),Object.defineProperty(Error,"prototype",{writable:!1}),Error}(o.default.Component);f.displayName="ErrorPage",f.getInitialProps=_getInitialProps,f.origGetInitialProps=_getInitialProps,("function"==typeof t.default||"object"===_typeof(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},86402:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return n}});var n=r(43219)._(r(2784)).default.createContext({})},70703:function(e,t){"use strict";function isInAmpMode(e){var t=void 0===e?{}:e,r=t.ampFirst,n=t.hybrid,o=t.hasQuery;return void 0!==r&&r||void 0!==n&&n&&void 0!==o&&o}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return isInAmpMode}})},81066:function(e,t,r){"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{defaultHead:function(){return _defaultHead},default:function(){return _default2}});var n=r(43219),o=r(16794)._(r(2784)),i=n._(r(64275)),u=r(86402),a=r(16392),f=r(70703);function _defaultHead(e){void 0===e&&(e=!1);var t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function onlyReactElement(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}r(27918);var c=["name","httpEquiv","charSet","itemProp"];function reduceComponents(e,t){var r,n,i,u,a=t.inAmpMode;return e.reduce(onlyReactElement,[]).reverse().concat(_defaultHead(a).reverse()).filter((r=new Set,n=new Set,i=new Set,u={},function(e){var t=!0,o=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){o=!0;var a=e.key.slice(e.key.indexOf("$")+1);r.has(a)?t=!1:r.add(a)}switch(e.type){case"title":case"base":n.has(e.type)?t=!1:n.add(e.type);break;case"meta":for(var f=0,l=c.length;f<l;f++){var d=c[f];if(e.props.hasOwnProperty(d)){if("charSet"===d)i.has(d)?t=!1:i.add(d);else{var p=e.props[d],s=u[d]||new Set;("name"!==d||!o)&&s.has(p)?t=!1:(s.add(p),u[d]=s)}}}}return t})).reverse().map(function(e,t){var r=e.key||t;if(!a&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){var n;n=r[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e.props||{});return n["data-href"]=n.href,n.href=void 0,n["data-optimized-fonts"]=!0,o.default.cloneElement(e,n)}return o.default.cloneElement(e,{key:r})})}var _default2=function(e){var t=e.children,r=(0,o.useContext)(u.AmpStateContext),n=(0,o.useContext)(a.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:reduceComponents,headManager:n,inAmpMode:(0,f.isInAmpMode)(r)},t)};("function"==typeof t.default||"object"===_typeof(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},64275:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return SideEffect}});var n=r(2784),o=n.useLayoutEffect,i=n.useEffect;function SideEffect(e){var t=e.headManager,r=e.reduceComponentsToState;function emitChange(){if(t&&t.mountedInstances){var o=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(o,e))}}return o(function(){var r;return null==t||null==(r=t.mountedInstances)||r.add(e.children),function(){var r;null==t||null==(r=t.mountedInstances)||r.delete(e.children)}}),o(function(){return t&&(t._pendingUpdate=emitChange),function(){t&&(t._pendingUpdate=emitChange)}}),i(function(){return t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),function(){t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)}}),null}},27918:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return warnOnce}});var warnOnce=function(e){}},50341:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r(42987)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=50341)}),_N_E=e.O()}]);