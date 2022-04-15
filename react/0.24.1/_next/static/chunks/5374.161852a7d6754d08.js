(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5374],{25374:function(e,t,r){"use strict";var n=r(49966),o=n(r(12473)),a=n(r(93382)),u=n(r(12387)),i=n(r(53673)),l=n(r(108));function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=d(r(2784)),f=d(r(2001));function d(e){return e&&e.__esModule?e:{default:e}}var p={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function h(e){var t=e.res,r=e.err;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}var y=function(e){(0,u.default)(r,e);var t=c(r);function r(){return(0,o.default)(this,r),t.apply(this,arguments)}return(0,a.default)(r,[{key:"render",value:function(){var e=this.props.statusCode,t=this.props.title||p[e]||"An unexpected error has occurred";return s.default.createElement("div",{style:v.error},s.default.createElement(f.default,null,s.default.createElement("title",null,e?"".concat(e,": ").concat(t):"Application error: a client-side exception has occurred")),s.default.createElement("div",null,s.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?s.default.createElement("h1",{style:v.h1},e):null,s.default.createElement("div",{style:v.desc},s.default.createElement("h2",{style:v.h2},this.props.title||e?t:s.default.createElement(s.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}]),r}(s.default.Component);y.displayName="ErrorPage",y.getInitialProps=h,y.origGetInitialProps=h,t.default=y;var v={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},32518:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var o=((n=r(2784))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=o},84667:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=u,t.useAmp=function(){return u(o.default.useContext(a.AmpStateContext))};var n,o=(n=r(2784))&&n.__esModule?n:{default:n},a=r(32518);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,o=void 0!==n&&n,a=e.hasQuery,u=void 0!==a&&a;return r||o&&u}},2001:function(e,t,r){"use strict";var n=r(49966)(r(47467));function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=f,t.default=void 0;var a,u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(2784)),i=(a=r(81023))&&a.__esModule?a:{default:a},l=r(32518),c=r(4523),s=r(84667);function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[u.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(u.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===u.default.Fragment?e.concat(u.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var r=u.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(d,[]).reverse().concat(f(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(o){var a=!0,u=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){u=!0;var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var l=0,c=p.length;l<c;l++){var s=p[l];if(o.props.hasOwnProperty(s))if("charSet"===s)r.has(s)?a=!1:r.add(s);else{var f=o.props[s],d=n[s]||new Set;"name"===s&&u||!d.has(f)?(d.add(f),n[s]=d):a=!1}}}return a}}()).reverse().map((function(e,r){var a=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var i=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){(0,n.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,u.default.cloneElement(e,i)}return u.default.cloneElement(e,{key:a})}))}var y=function(e){var t=e.children,r=u.useContext(l.AmpStateContext),n=u.useContext(c.HeadManagerContext);return u.default.createElement(i.default,{reduceComponentsToState:h,headManager:n,inAmpMode:s.isInAmpMode(r)},t)};t.default=y},81023:function(e,t,r){"use strict";var n=r(49966),o=n(r(66563)),a=n(r(12473)),u=n(r(93382)),i=(n(r(23615)),n(r(12387))),l=n(r(53673)),c=n(r(108));function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,c.default)(e);if(t){var o=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,l.default)(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(2784));var d=function(e){(0,i.default)(r,e);var t=s(r);function r(e){var n;return(0,a.default)(this,r),(n=t.call(this,e)).emitChange=function(){n._hasHeadManager&&n.props.headManager.updateHead(n.props.reduceComponentsToState((0,o.default)(n.props.headManager.mountedInstances),n.props))},n._hasHeadManager=n.props.headManager&&n.props.headManager.mountedInstances,n}return(0,u.default)(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(f.Component);t.default=d},6353:function(e,t,r){var n=r(72614);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},76695:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},54069:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},66563:function(e,t,r){var n=r(6353),o=r(76695),a=r(74290),u=r(54069);e.exports=function(e){return n(e)||o(e)||a(e)||u()},e.exports.default=e.exports,e.exports.__esModule=!0}}]);