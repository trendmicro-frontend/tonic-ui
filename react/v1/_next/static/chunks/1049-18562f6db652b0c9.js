(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1049],{39515:function(e,t,n){var r=n(38761)(n(37772),"DataView");e.exports=r},52760:function(e,t,n){var r=n(38761)(n(37772),"Promise");e.exports=r},2143:function(e,t,n){var r=n(38761)(n(37772),"Set");e.exports=r},37282:function(e,t,n){var r=n(96738),i=n(52842),o=n(52482);function SetCache(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}SetCache.prototype.add=SetCache.prototype.push=i,SetCache.prototype.has=o,e.exports=SetCache},86571:function(e,t,n){var r=n(80235),i=n(15243),o=n(72858),s=n(4417),a=n(8605),l=n(71418);function Stack(e){var t=this.__data__=new r(e);this.size=t.size}Stack.prototype.clear=i,Stack.prototype.delete=o,Stack.prototype.get=s,Stack.prototype.has=a,Stack.prototype.set=l,e.exports=Stack},79162:function(e,t,n){var r=n(37772).Uint8Array;e.exports=r},93215:function(e,t,n){var r=n(38761)(n(37772),"WeakMap");e.exports=r},67552:function(e){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,i=0,o=[];++n<r;){var s=e[n];t(s,n,e)&&(o[i++]=s)}return o}},1634:function(e,t,n){var r=n(36473),i=n(79631),o=n(86152),s=n(73226),a=n(39045),l=n(77598),u=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=o(e),c=!n&&i(e),f=!n&&!c&&s(e),h=!n&&!c&&!f&&l(e),d=n||c||f||h,p=d?r(e.length,String):[],g=p.length;for(var m in e)(t||u.call(e,m))&&!(d&&("length"==m||f&&("offset"==m||"parent"==m)||h&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||a(m,g)))&&p.push(m);return p}},65067:function(e){e.exports=function(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}},87064:function(e){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}},24303:function(e,t,n){var r=n(26548),i=n(92019)(r);e.exports=i},15308:function(e,t,n){var r=n(55463)();e.exports=r},26548:function(e,t,n){var r=n(15308),i=n(90249);e.exports=function(e,t){return e&&r(e,t,i)}},1897:function(e,t,n){var r=n(65067),i=n(86152);e.exports=function(e,t,n){var o=t(e);return i(e)?o:r(o,n(e))}},20187:function(e){e.exports=function(e,t){return null!=e&&t in Object(e)}},88746:function(e,t,n){var r=n(51952),i=n(15125);e.exports=function baseIsEqual(e,t,n,o,s){return e===t||(null!=e&&null!=t&&(i(e)||i(t))?r(e,t,n,o,baseIsEqual,s):e!=e&&t!=t)}},51952:function(e,t,n){var r=n(86571),i=n(74871),o=n(11491),s=n(17416),a=n(70940),l=n(86152),u=n(73226),c=n(77598),f="[object Arguments]",h="[object Array]",d="[object Object]",p=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,g,m,v){var b=l(e),x=l(t),y=b?h:a(e),O=x?h:a(t);y=y==f?d:y,O=O==f?d:O;var I=y==d,S=O==d,w=y==O;if(w&&u(e)){if(!u(t))return!1;b=!0,I=!1}if(w&&!I)return v||(v=new r),b||c(e)?i(e,t,n,g,m,v):o(e,t,y,n,g,m,v);if(!(1&n)){var T=I&&p.call(e,"__wrapped__"),E=S&&p.call(t,"__wrapped__");if(T||E){var M=T?e.value():e,_=E?t.value():t;return v||(v=new r),m(M,_,n,g,v)}}return!!w&&(v||(v=new r),s(e,t,n,g,m,v))}},37036:function(e,t,n){var r=n(86571),i=n(88746);e.exports=function(e,t,n,o){var s=n.length,a=s,l=!o;if(null==e)return!a;for(e=Object(e);s--;){var u=n[s];if(l&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}for(;++s<a;){var c=(u=n[s])[0],f=e[c],h=u[1];if(l&&u[2]){if(void 0===f&&!(c in e))return!1}else{var d=new r;if(o)var p=o(f,h,c,e,t,d);if(!(void 0===p?i(h,f,3,o,d):p))return!1}}return!0}},35522:function(e,t,n){var r=n(53366),i=n(61158),o=n(15125),s={};s["[object Float32Array]"]=s["[object Float64Array]"]=s["[object Int8Array]"]=s["[object Int16Array]"]=s["[object Int32Array]"]=s["[object Uint8Array]"]=s["[object Uint8ClampedArray]"]=s["[object Uint16Array]"]=s["[object Uint32Array]"]=!0,s["[object Arguments]"]=s["[object Array]"]=s["[object ArrayBuffer]"]=s["[object Boolean]"]=s["[object DataView]"]=s["[object Date]"]=s["[object Error]"]=s["[object Function]"]=s["[object Map]"]=s["[object Number]"]=s["[object Object]"]=s["[object RegExp]"]=s["[object Set]"]=s["[object String]"]=s["[object WeakMap]"]=!1,e.exports=function(e){return o(e)&&i(e.length)&&!!s[r(e)]}},68286:function(e,t,n){var r=n(26423),i=n(74716),o=n(23059),s=n(86152),a=n(65798);e.exports=function(e){return"function"==typeof e?e:null==e?o:"object"==typeof e?s(e)?i(e[0],e[1]):r(e):a(e)}},86411:function(e,t,n){var r=n(16001),i=n(54248),o=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return i(e);var t=[];for(var n in Object(e))o.call(e,n)&&"constructor"!=n&&t.push(n);return t}},93401:function(e,t,n){var r=n(24303),i=n(67878);e.exports=function(e,t){var n=-1,o=i(e)?Array(e.length):[];return r(e,function(e,r,i){o[++n]=t(e,r,i)}),o}},26423:function(e,t,n){var r=n(37036),i=n(49882),o=n(73477);e.exports=function(e){var t=i(e);return 1==t.length&&t[0][2]?o(t[0][0],t[0][1]):function(n){return n===e||r(n,e,t)}}},74716:function(e,t,n){var r=n(88746),i=n(72579),o=n(95041),s=n(21401),a=n(28792),l=n(73477),u=n(33812);e.exports=function(e,t){return s(e)&&a(t)?l(u(e),t):function(n){var s=i(n,e);return void 0===s&&s===t?o(n,e):r(t,s,3)}}},23813:function(e,t,n){var r=n(50343),i=n(13324),o=n(68286),s=n(93401),a=n(27095),l=n(47826),u=n(18477),c=n(23059),f=n(86152);e.exports=function(e,t,n){t=t.length?r(t,function(e){return f(e)?function(t){return i(t,1===e.length?e[0]:e)}:e}):[c];var h=-1;return t=r(t,l(o)),a(s(e,function(e,n,i){return{criteria:r(t,function(t){return t(e)}),index:++h,value:e}}),function(e,t){return u(e,t,n)})}},20256:function(e){e.exports=function(e){return function(t){return null==t?void 0:t[e]}}},82952:function(e,t,n){var r=n(13324);e.exports=function(e){return function(t){return r(t,e)}}},27095:function(e){e.exports=function(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}},36473:function(e){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},47826:function(e){e.exports=function(e){return function(t){return e(t)}}},59950:function(e){e.exports=function(e,t){return e.has(t)}},27520:function(e,t,n){var r=n(4795);e.exports=function(e,t){if(e!==t){var n=void 0!==e,i=null===e,o=e==e,s=r(e),a=void 0!==t,l=null===t,u=t==t,c=r(t);if(!l&&!c&&!s&&e>t||s&&a&&u&&!l&&!c||i&&a&&u||!n&&u||!o)return 1;if(!i&&!s&&!c&&e<t||c&&n&&o&&!i&&!s||l&&n&&o||!a&&o||!u)return -1}return 0}},18477:function(e,t,n){var r=n(27520);e.exports=function(e,t,n){for(var i=-1,o=e.criteria,s=t.criteria,a=o.length,l=n.length;++i<a;){var u=r(o[i],s[i]);if(u){if(i>=l)return u;return u*("desc"==n[i]?-1:1)}}return e.index-t.index}},92019:function(e,t,n){var r=n(67878);e.exports=function(e,t){return function(n,i){if(null==n)return n;if(!r(n))return e(n,i);for(var o=n.length,s=t?o:-1,a=Object(n);(t?s--:++s<o)&&!1!==i(a[s],s,a););return n}}},55463:function(e){e.exports=function(e){return function(t,n,r){for(var i=-1,o=Object(t),s=r(t),a=s.length;a--;){var l=s[e?a:++i];if(!1===n(o[l],l,o))break}return t}}},74871:function(e,t,n){var r=n(37282),i=n(87064),o=n(59950);e.exports=function(e,t,n,s,a,l){var u=1&n,c=e.length,f=t.length;if(c!=f&&!(u&&f>c))return!1;var h=l.get(e),d=l.get(t);if(h&&d)return h==t&&d==e;var p=-1,g=!0,m=2&n?new r:void 0;for(l.set(e,t),l.set(t,e);++p<c;){var v=e[p],b=t[p];if(s)var x=u?s(b,v,p,t,e,l):s(v,b,p,e,t,l);if(void 0!==x){if(x)continue;g=!1;break}if(m){if(!i(t,function(e,t){if(!o(m,t)&&(v===e||a(v,e,n,s,l)))return m.push(t)})){g=!1;break}}else if(!(v===b||a(v,b,n,s,l))){g=!1;break}}return l.delete(e),l.delete(t),g}},11491:function(e,t,n){var r=n(50857),i=n(79162),o=n(41225),s=n(74871),a=n(75179),l=n(16909),u=r?r.prototype:void 0,c=u?u.valueOf:void 0;e.exports=function(e,t,n,r,u,f,h){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)break;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":if(e.byteLength!=t.byteLength||!f(new i(e),new i(t)))break;return!0;case"[object Boolean]":case"[object Date]":case"[object Number]":return o(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var d=a;case"[object Set]":var p=1&r;if(d||(d=l),e.size!=t.size&&!p)break;var g=h.get(e);if(g)return g==t;r|=2,h.set(e,t);var m=s(d(e),d(t),r,u,f,h);return h.delete(e),m;case"[object Symbol]":if(c)return c.call(e)==c.call(t)}return!1}},17416:function(e,t,n){var r=n(13483),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,o,s,a){var l=1&n,u=r(e),c=u.length;if(c!=r(t).length&&!l)return!1;for(var f=c;f--;){var h=u[f];if(!(l?h in t:i.call(t,h)))return!1}var d=a.get(e),p=a.get(t);if(d&&p)return d==t&&p==e;var g=!0;a.set(e,t),a.set(t,e);for(var m=l;++f<c;){var v=e[h=u[f]],b=t[h];if(o)var x=l?o(b,v,h,t,e,a):o(v,b,h,e,t,a);if(!(void 0===x?v===b||s(v,b,n,o,a):x)){g=!1;break}m||(m="constructor"==h)}if(g&&!m){var y=e.constructor,O=t.constructor;y!=O&&"constructor"in e&&"constructor"in t&&!("function"==typeof y&&y instanceof y&&"function"==typeof O&&O instanceof O)&&(g=!1)}return a.delete(e),a.delete(t),g}},13483:function(e,t,n){var r=n(1897),i=n(80633),o=n(90249);e.exports=function(e){return r(e,o,i)}},49882:function(e,t,n){var r=n(28792),i=n(90249);e.exports=function(e){for(var t=i(e),n=t.length;n--;){var o=t[n],s=e[o];t[n]=[o,s,r(s)]}return t}},80633:function(e,t,n){var r=n(67552),i=n(30981),o=Object.prototype.propertyIsEnumerable,s=Object.getOwnPropertySymbols,a=s?function(e){return null==e?[]:r(s(e=Object(e)),function(t){return o.call(e,t)})}:i;e.exports=a},70940:function(e,t,n){var r=n(39515),i=n(10326),o=n(52760),s=n(2143),a=n(93215),l=n(53366),u=n(87035),c="[object Map]",f="[object Promise]",h="[object Set]",d="[object WeakMap]",p="[object DataView]",g=u(r),m=u(i),v=u(o),b=u(s),x=u(a),y=l;(r&&y(new r(new ArrayBuffer(1)))!=p||i&&y(new i)!=c||o&&y(o.resolve())!=f||s&&y(new s)!=h||a&&y(new a)!=d)&&(y=function(e){var t=l(e),n="[object Object]"==t?e.constructor:void 0,r=n?u(n):"";if(r)switch(r){case g:return p;case m:return c;case v:return f;case b:return h;case x:return d}return t}),e.exports=y},16001:function(e){var t=Object.prototype;e.exports=function(e){var n=e&&e.constructor;return e===("function"==typeof n&&n.prototype||t)}},28792:function(e,t,n){var r=n(29259);e.exports=function(e){return e==e&&!r(e)}},75179:function(e){e.exports=function(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}},73477:function(e){e.exports=function(e,t){return function(n){return null!=n&&n[e]===t&&(void 0!==t||e in Object(n))}}},54248:function(e,t,n){var r=n(60241)(Object.keys,Object);e.exports=r},4146:function(e,t,n){e=n.nmd(e);var r=n(51242),i=t&&!t.nodeType&&t,o=i&&e&&!e.nodeType&&e,s=o&&o.exports===i&&r.process,a=function(){try{var e=o&&o.require&&o.require("util").types;if(e)return e;return s&&s.binding&&s.binding("util")}catch(e){}}();e.exports=a},60241:function(e){e.exports=function(e,t){return function(n){return e(t(n))}}},52842:function(e){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},52482:function(e){e.exports=function(e){return this.__data__.has(e)}},16909:function(e){e.exports=function(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}},15243:function(e,t,n){var r=n(80235);e.exports=function(){this.__data__=new r,this.size=0}},72858:function(e){e.exports=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}},4417:function(e){e.exports=function(e){return this.__data__.get(e)}},8605:function(e){e.exports=function(e){return this.__data__.has(e)}},71418:function(e,t,n){var r=n(80235),i=n(10326),o=n(96738);e.exports=function(e,t){var n=this.__data__;if(n instanceof r){var s=n.__data__;if(!i||s.length<199)return s.push([e,t]),this.size=++n.size,this;n=this.__data__=new o(s)}return n.set(e,t),this.size=n.size,this}},95041:function(e,t,n){var r=n(20187),i=n(1369);e.exports=function(e,t){return null!=e&&i(e,t,r)}},23059:function(e){e.exports=function(e){return e}},67878:function(e,t,n){var r=n(61049),i=n(61158);e.exports=function(e){return null!=e&&i(e.length)&&!r(e)}},73226:function(e,t,n){e=n.nmd(e);var r=n(37772),i=n(36330),o=t&&!t.nodeType&&t,s=o&&e&&!e.nodeType&&e,a=s&&s.exports===o?r.Buffer:void 0,l=a?a.isBuffer:void 0;e.exports=l||i},77598:function(e,t,n){var r=n(35522),i=n(47826),o=n(4146),s=o&&o.isTypedArray,a=s?i(s):r;e.exports=a},90249:function(e,t,n){var r=n(1634),i=n(86411),o=n(67878);e.exports=function(e){return o(e)?r(e):i(e)}},34498:function(e,t,n){var r=n(23813),i=n(86152);e.exports=function(e,t,n,o){return null==e?[]:(i(t)||(t=null==t?[]:[t]),i(n=o?void 0:n)||(n=null==n?[]:[n]),r(e,t,n))}},65798:function(e,t,n){var r=n(20256),i=n(82952),o=n(21401),s=n(33812);e.exports=function(e){return o(e)?r(s(e)):i(e)}},30981:function(e){e.exports=function(){return[]}},36330:function(e){e.exports=function(){return!1}},88510:function(e,t,n){"use strict";/**
 * react-virtual
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _rollupPluginBabelHelpers_extends(){return(_rollupPluginBabelHelpers_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,{MG:function(){return useVirtualizer}});var r=n(2784),i=n(28316);/**
 * virtual-core
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _virtual_rollupPluginBabelHelpers_extends(){return(_virtual_rollupPluginBabelHelpers_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}/**
 * virtual-core
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function memo(e,t,n){var r,i,o=null!=(r=n.initialDeps)?r:[];return function(){n.key&&null!=n.debug&&n.debug()&&(r=Date.now());var r,s,a=e();if(!(a.length!==o.length||a.some(function(e,t){return o[t]!==e})))return i;if(o=a,n.key&&null!=n.debug&&n.debug()&&(s=Date.now()),i=t.apply(void 0,a),n.key&&null!=n.debug&&n.debug()){var l=Math.round((Date.now()-r)*100)/100,u=Math.round((Date.now()-s)*100)/100,c=u/16,pad=function(e,t){for(e=String(e);e.length<t;)e=" "+e;return e};console.info("%c⏱ "+pad(u,5)+" /"+pad(l,5)+" ms","\n            font-size: .6rem;\n            font-weight: bold;\n            color: hsl("+Math.max(0,Math.min(120-120*c,120))+"deg 100% 31%);",null==n?void 0:n.key)}return null==n||null==n.onChange||n.onChange(i),i}}function notUndefined(e,t){if(void 0!==e)return e;throw Error("Unexpected undefined"+(t?": "+t:""))}/**
 * virtual-core
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var defaultKeyExtractor=function(e){return e},defaultRangeExtractor=function(e){for(var t=Math.max(e.startIndex-e.overscan,0),n=Math.min(e.endIndex+e.overscan,e.count-1),r=[],i=t;i<=n;i++)r.push(i);return r},observeElementRect=function(e,t){var n=e.scrollElement;if(n){var handler=function(e){t({width:Math.round(e.width),height:Math.round(e.height)})};handler(n.getBoundingClientRect());var r=new ResizeObserver(function(e){var t=e[0];if(null!=t&&t.borderBoxSize){var r=t.borderBoxSize[0];if(r){handler({width:r.inlineSize,height:r.blockSize});return}}handler(n.getBoundingClientRect())});return r.observe(n,{box:"border-box"}),function(){r.unobserve(n)}}},observeElementOffset=function(e,t){var n=e.scrollElement;if(n){var handler=function(){t(n[e.options.horizontal?"scrollLeft":"scrollTop"])};return handler(),n.addEventListener("scroll",handler,{passive:!0}),function(){n.removeEventListener("scroll",handler)}}},measureElement=function(e,t,n){if(null!=t&&t.borderBoxSize){var r=t.borderBoxSize[0];if(r)return Math.round(r[n.options.horizontal?"inlineSize":"blockSize"])}return Math.round(e.getBoundingClientRect()[n.options.horizontal?"width":"height"])},elementScroll=function(e,t,n){var r,i,o=t.adjustments,s=t.behavior;null==(r=n.scrollElement)||null==r.scrollTo||r.scrollTo(((i={})[n.options.horizontal?"left":"top"]=e+(void 0===o?0:o),i.behavior=s,i))},Virtualizer=function(e){var t,n,r=this;this.unsubs=[],this.scrollElement=null,this.isScrolling=!1,this.isScrollingTimeoutId=null,this.scrollToIndexTimeoutId=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.pendingMeasuredCacheIndexes=[],this.scrollDirection=null,this.scrollAdjustments=0,this.measureElementCache=new Map,this.observer=(t=null,n=function(){return t||("undefined"!=typeof ResizeObserver?t=new ResizeObserver(function(e){e.forEach(function(e){r._measureElement(e.target,e)})}):null)},{disconnect:function(){var e;return null==(e=n())?void 0:e.disconnect()},observe:function(e){var t;return null==(t=n())?void 0:t.observe(e,{box:"border-box"})},unobserve:function(e){var t;return null==(t=n())?void 0:t.unobserve(e)}}),this.range=null,this.setOptions=function(e){Object.entries(e).forEach(function(t){var n=t[0];void 0===t[1]&&delete e[n]}),r.options=_virtual_rollupPluginBabelHelpers_extends({debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:defaultKeyExtractor,rangeExtractor:defaultRangeExtractor,onChange:function(){},measureElement:measureElement,initialRect:{width:0,height:0},scrollMargin:0,scrollingDelay:150,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1},e)},this.notify=function(e){null==r.options.onChange||r.options.onChange(r,e)},this.maybeNotify=memo(function(){return r.calculateRange(),[r.isScrolling,r.range?r.range.startIndex:null,r.range?r.range.endIndex:null]},function(e){r.notify(e)},{key:!1,debug:function(){return r.options.debug},initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=function(){r.unsubs.filter(Boolean).forEach(function(e){return e()}),r.unsubs=[],r.scrollElement=null},this._didMount=function(){return r.measureElementCache.forEach(r.observer.observe),function(){r.observer.disconnect(),r.cleanup()}},this._willUpdate=function(){var e=r.options.getScrollElement();r.scrollElement!==e&&(r.cleanup(),r.scrollElement=e,r._scrollToOffset(r.scrollOffset,{adjustments:void 0,behavior:void 0}),r.unsubs.push(r.options.observeElementRect(r,function(e){r.scrollRect=e,r.maybeNotify()})),r.unsubs.push(r.options.observeElementOffset(r,function(e){r.scrollAdjustments=0,r.scrollOffset!==e&&(null!==r.isScrollingTimeoutId&&(clearTimeout(r.isScrollingTimeoutId),r.isScrollingTimeoutId=null),r.isScrolling=!0,r.scrollDirection=r.scrollOffset<e?"forward":"backward",r.scrollOffset=e,r.maybeNotify(),r.isScrollingTimeoutId=setTimeout(function(){r.isScrollingTimeoutId=null,r.isScrolling=!1,r.scrollDirection=null,r.maybeNotify()},r.options.scrollingDelay))})))},this.getSize=function(){return r.scrollRect[r.options.horizontal?"width":"height"]},this.memoOptions=memo(function(){return[r.options.count,r.options.paddingStart,r.options.scrollMargin,r.options.getItemKey]},function(e,t,n,i){return r.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:t,scrollMargin:n,getItemKey:i}},{key:!1}),this.getFurthestMeasurement=function(e,t){for(var n=new Map,i=new Map,o=t-1;o>=0;o--){var s=e[o];if(!n.has(s.lane)){var a=i.get(s.lane);if(null==a||s.end>a.end?i.set(s.lane,s):s.end<a.end&&n.set(s.lane,!0),n.size===r.options.lanes)break}}return i.size===r.options.lanes?Array.from(i.values()).sort(function(e,t){return e.end-t.end})[0]:void 0},this.getMeasurements=memo(function(){return[r.memoOptions(),r.itemSizeCache]},function(e,t){var n=e.count,i=e.paddingStart,o=e.scrollMargin,s=e.getItemKey,a=r.pendingMeasuredCacheIndexes.length>0?Math.min.apply(Math,r.pendingMeasuredCacheIndexes):0;r.pendingMeasuredCacheIndexes=[];for(var l=r.measurementsCache.slice(0,a),u=a;u<n;u++){var c=s(u),f=1===r.options.lanes?l[u-1]:r.getFurthestMeasurement(l,u),h=f?f.end:i+o,d=t.get(c),p="number"==typeof d?d:r.options.estimateSize(u),g=h+p,m=f?f.lane:u%r.options.lanes;l[u]={index:u,start:h,size:p,end:g,key:c,lane:m}}return r.measurementsCache=l,l},{key:!1,debug:function(){return r.options.debug}}),this.calculateRange=memo(function(){return[r.getMeasurements(),r.getSize(),r.scrollOffset]},function(e,t,n){return r.range=e.length>0&&t>0?function(e){for(var t=e.measurements,n=e.outerSize,r=e.scrollOffset,i=t.length-1,o=findNearestBinarySearch(0,i,function(e){return t[e].start},r),s=o;s<i&&t[s].end<r+n;)s++;return{startIndex:o,endIndex:s}}({measurements:e,outerSize:t,scrollOffset:n}):null},{key:!1,debug:function(){return r.options.debug}}),this.getIndexes=memo(function(){return[r.options.rangeExtractor,r.calculateRange(),r.options.overscan,r.options.count]},function(e,t,n,r){return null===t?[]:e(_virtual_rollupPluginBabelHelpers_extends({},t,{overscan:n,count:r}))},{key:!1,debug:function(){return r.options.debug}}),this.indexFromElement=function(e){var t=r.options.indexAttribute,n=e.getAttribute(t);return n?parseInt(n,10):(console.warn("Missing attribute name '"+t+"={index}' on measured element."),-1)},this._measureElement=function(e,t){var n=r.measurementsCache[r.indexFromElement(e)];if(!n||!e.isConnected){r.measureElementCache.forEach(function(t,n){t===e&&(r.observer.unobserve(e),r.measureElementCache.delete(n))});return}var i=r.measureElementCache.get(n.key);i!==e&&(i&&r.observer.unobserve(i),r.observer.observe(e),r.measureElementCache.set(n.key,e));var o=r.options.measureElement(e,t,r);r.resizeItem(n,o)},this.resizeItem=function(e,t){var n,i=t-(null!=(n=r.itemSizeCache.get(e.key))?n:e.size);0!==i&&(e.start<r.scrollOffset&&r._scrollToOffset(r.scrollOffset,{adjustments:r.scrollAdjustments+=i,behavior:void 0}),r.pendingMeasuredCacheIndexes.push(e.index),r.itemSizeCache=new Map(r.itemSizeCache.set(e.key,t)),r.notify(!1))},this.measureElement=function(e){e&&r._measureElement(e,void 0)},this.getVirtualItems=memo(function(){return[r.getIndexes(),r.getMeasurements()]},function(e,t){for(var n=[],r=0,i=e.length;r<i;r++){var o=t[e[r]];n.push(o)}return n},{key:!1,debug:function(){return r.options.debug}}),this.getVirtualItemForOffset=function(e){var t=r.getMeasurements();return notUndefined(t[findNearestBinarySearch(0,t.length-1,function(e){return notUndefined(t[e]).start},e)])},this.getOffsetForAlignment=function(e,t){var n=r.getSize();"auto"===t&&(t=e<=r.scrollOffset?"start":e>=r.scrollOffset+n?"end":"start"),"start"===t||("end"===t?e-=n:"center"===t&&(e-=n/2));var i=r.options.horizontal?"scrollWidth":"scrollHeight";return Math.max(Math.min((r.scrollElement?"document"in r.scrollElement?r.scrollElement.document.documentElement[i]:r.scrollElement[i]:0)-r.getSize(),e),0)},this.getOffsetForIndex=function(e,t){void 0===t&&(t="auto"),e=Math.max(0,Math.min(e,r.options.count-1));var n=notUndefined(r.getMeasurements()[e]);if("auto"===t){if(n.end>=r.scrollOffset+r.getSize()-r.options.scrollPaddingEnd)t="end";else{if(!(n.start<=r.scrollOffset+r.options.scrollPaddingStart))return[r.scrollOffset,t];t="start"}}var i="end"===t?n.end+r.options.scrollPaddingEnd:n.start-r.options.scrollPaddingStart;return[r.getOffsetForAlignment(i,t),t]},this.isDynamicMode=function(){return r.measureElementCache.size>0},this.cancelScrollToIndex=function(){null!==r.scrollToIndexTimeoutId&&(clearTimeout(r.scrollToIndexTimeoutId),r.scrollToIndexTimeoutId=null)},this.scrollToOffset=function(e,t){var n=void 0===t?{}:t,i=n.align,o=void 0===i?"start":i,s=n.behavior;r.cancelScrollToIndex(),"smooth"===s&&r.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),r._scrollToOffset(r.getOffsetForAlignment(e,o),{adjustments:void 0,behavior:s})},this.scrollToIndex=function(e,t){var n=void 0===t?{}:t,i=n.align,o=void 0===i?"auto":i,s=n.behavior;e=Math.max(0,Math.min(e,r.options.count-1)),r.cancelScrollToIndex(),"smooth"===s&&r.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");var a=r.getOffsetForIndex(e,o),l=a[0],u=a[1];r._scrollToOffset(l,{adjustments:void 0,behavior:s}),"smooth"!==s&&r.isDynamicMode()&&(r.scrollToIndexTimeoutId=setTimeout(function(){r.scrollToIndexTimeoutId=null,r.measureElementCache.has(r.options.getItemKey(e))&&1>Math.abs(r.getOffsetForIndex(e,u)[0]-r.scrollOffset)||r.scrollToIndex(e,{align:u,behavior:s})}))},this.scrollBy=function(e,t){var n=(void 0===t?{}:t).behavior;r.cancelScrollToIndex(),"smooth"===n&&r.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),r._scrollToOffset(r.scrollOffset+e,{adjustments:void 0,behavior:n})},this.getTotalSize=function(){var e;return((null==(e=r.getMeasurements()[r.options.count-1])?void 0:e.end)||r.options.paddingStart)-r.options.scrollMargin+r.options.paddingEnd},this._scrollToOffset=function(e,t){var n=t.adjustments,i=t.behavior;r.options.scrollToFn(e,{behavior:i,adjustments:n},r)},this.measure=function(){r.itemSizeCache=new Map,r.notify(!1)},this.setOptions(e),this.scrollRect=this.options.initialRect,this.scrollOffset=this.options.initialOffset,this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(function(e){r.itemSizeCache.set(e.key,e.size)}),this.maybeNotify()},findNearestBinarySearch=function(e,t,n,r){for(;e<=t;){var i=(e+t)/2|0,o=n(i);if(o<r)e=i+1;else{if(!(o>r))return i;t=i-1}}return e>0?e-1:0},o="undefined"!=typeof document?r.useLayoutEffect:r.useEffect;function useVirtualizer(e){var t,n,s,a;return t=_rollupPluginBabelHelpers_extends({observeElementRect:observeElementRect,observeElementOffset:observeElementOffset,scrollToFn:elementScroll},e),n=r.useReducer(function(){return{}},{})[1],s=_rollupPluginBabelHelpers_extends({},t,{onChange:function(e,r){r?(0,i.flushSync)(n):n(),null==t.onChange||t.onChange(e,r)}}),(a=r.useState(function(){return new Virtualizer(s)})[0]).setOptions(s),r.useEffect(function(){return a._didMount()},[]),o(function(){return a._willUpdate()}),a}},56827:function(e,t,n){"use strict";n.d(t,{aV:function(){return o},Rp:function(){return arrayMove}});var r=n(2784),i=n(28316);function arrayMove(e,t,n){return(e=e.slice()).splice(n<0?e.length+n:n,0,e.splice(t,1)[0]),e}function getTranslateOffset(e){let t=window.getComputedStyle(e);return Math.max(parseInt(t["margin-top"],10),parseInt(t["margin-bottom"],10))+e.getBoundingClientRect().height}function transformItem(e,t=0,n=0){if(e){if(null===t||null===n){e.style.removeProperty("transform");return}e.style.transform=`translate(${n}px, ${t}px)`}}function setItemTransition(e,t,n){e&&(e.style.transition=`transform ${t}ms${n?` ${n}`:""}`)}let schd=e=>{let t=[],n=null,wrapperFn=(...r)=>{t=r,n||(n=requestAnimationFrame(()=>{n=null,e(...t)}))};return wrapperFn.cancel=()=>{n&&cancelAnimationFrame(n)},wrapperFn};function checkIfInteractive(e,t){let n=["input","textarea","select","option","optgroup","video","audio","button","a"],r=["button","link","checkbox","tab"];for(;e!==t&&!e.getAttribute("data-movable-handle");){if(n.includes(e.tagName.toLowerCase()))return!0;let t=e.getAttribute("role");if(t&&r.includes(t.toLowerCase())||"label"===e.tagName.toLowerCase()&&e.hasAttribute("for"))return!0;e.tagName&&(e=e.parentElement)}return!1}let List=class List extends r.Component{constructor(e){super(e),this.listRef=r.createRef(),this.ghostRef=r.createRef(),this.topOffsets=[],this.itemTranslateOffsets=[],this.initialYOffset=0,this.lastScroll=0,this.lastYOffset=0,this.lastListYOffset=0,this.needle=-1,this.afterIndex=-2,this.state={itemDragged:-1,itemDraggedOutOfBounds:-1,selectedItem:-1,initialX:0,initialY:0,targetX:0,targetY:0,targetHeight:0,targetWidth:0,liveText:"",scrollingSpeed:0,scrollWindow:!1},this.doScrolling=()=>{let{scrollingSpeed:e,scrollWindow:t}=this.state,n=this.listRef.current;window.requestAnimationFrame(()=>{t?window.scrollTo(window.pageXOffset,window.pageYOffset+1.5*e):n.scrollTop+=e,0!==e&&this.doScrolling()})},this.getChildren=()=>this.listRef&&this.listRef.current?Array.from(this.listRef.current.children):(console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"),[]),this.calculateOffsets=()=>{this.topOffsets=this.getChildren().map(e=>e.getBoundingClientRect().top),this.itemTranslateOffsets=this.getChildren().map(e=>getTranslateOffset(e))},this.getTargetIndex=e=>this.getChildren().findIndex(t=>t===e.target||t.contains(e.target)),this.onMouseOrTouchStart=e=>{this.dropTimeout&&this.state.itemDragged>-1&&(window.clearTimeout(this.dropTimeout),this.finishDrop());let t=e.touches&&e.touches.length||e.changedTouches&&e.changedTouches.length;if(!t&&0!==e.button)return;let n=this.getTargetIndex(e);if(-1===n||this.props.values[n]&&this.props.values[n].disabled){-1!==this.state.selectedItem&&(this.setState({selectedItem:-1}),this.finishDrop());return}let r=this.getChildren()[n],i=r.querySelector("[data-movable-handle]");if(!(i&&!i.contains(e.target)||checkIfInteractive(e.target,r))){if(e.preventDefault(),this.props.beforeDrag&&this.props.beforeDrag({elements:this.getChildren(),index:n}),t){let e={passive:!1};r.style.touchAction="none",document.addEventListener("touchend",this.schdOnEnd,e),document.addEventListener("touchmove",this.schdOnTouchMove,e),document.addEventListener("touchcancel",this.schdOnEnd,e)}else{document.addEventListener("mousemove",this.schdOnMouseMove),document.addEventListener("mouseup",this.schdOnEnd);let e=this.getChildren()[this.state.itemDragged];e&&e.style&&(e.style.touchAction="")}this.onStart(r,t?e.touches[0].clientX:e.clientX,t?e.touches[0].clientY:e.clientY,n)}},this.getYOffset=()=>{let e=this.listRef.current?this.listRef.current.scrollTop:0;return window.pageYOffset+e},this.onStart=(e,t,n,r)=>{this.state.selectedItem>-1&&(this.setState({selectedItem:-1}),this.needle=-1);let i=e.getBoundingClientRect(),o=window.getComputedStyle(e);this.calculateOffsets(),this.initialYOffset=this.getYOffset(),this.lastYOffset=window.pageYOffset,this.lastListYOffset=this.listRef.current.scrollTop,this.setState({itemDragged:r,targetX:i.left-parseInt(o["margin-left"],10),targetY:i.top-parseInt(o["margin-top"],10),targetHeight:i.height,targetWidth:i.width,initialX:t,initialY:n})},this.onMouseMove=e=>{e.cancelable&&e.preventDefault(),this.onMove(e.clientX,e.clientY)},this.onTouchMove=e=>{e.cancelable&&e.preventDefault(),this.onMove(e.touches[0].clientX,e.touches[0].clientY)},this.onWheel=e=>{this.state.itemDragged<0||(this.lastScroll=this.listRef.current.scrollTop+=e.deltaY,this.moveOtherItems())},this.onMove=(e,t)=>{if(-1===this.state.itemDragged)return null;transformItem(this.ghostRef.current,t-this.state.initialY,this.props.lockVertically?0:e-this.state.initialX),this.autoScrolling(t),this.moveOtherItems()},this.moveOtherItems=()=>{let e=this.ghostRef.current.getBoundingClientRect(),t=e.top+e.height/2,n=getTranslateOffset(this.getChildren()[this.state.itemDragged]),r=this.getYOffset();this.initialYOffset!==r&&(this.topOffsets=this.topOffsets.map(e=>e-(r-this.initialYOffset)),this.initialYOffset=r),this.isDraggedItemOutOfBounds()&&this.props.removableByMove?this.afterIndex=this.topOffsets.length+1:this.afterIndex=function(e,t){let n,r=0,i=e.length-1;for(;r<=i;){if(!e[(n=Math.floor((i+r)/2))+1]||e[n]<=t&&e[n+1]>=t)return n;e[n]<t&&e[n+1]<t?r=n+1:i=n-1}return -1}(this.topOffsets,t),this.animateItems(-1===this.afterIndex?0:this.afterIndex,this.state.itemDragged,n)},this.autoScrolling=e=>{let{top:t,bottom:n,height:r}=this.listRef.current.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;if(n>i&&i-e<200)this.setState({scrollingSpeed:Math.round((200-(i-e))/10),scrollWindow:!0});else if(t<0&&e<200)this.setState({scrollingSpeed:Math.round(-((200-e)/10)),scrollWindow:!0});else if(this.state.scrollWindow&&0!==this.state.scrollingSpeed&&this.setState({scrollingSpeed:0,scrollWindow:!1}),r+20<this.listRef.current.scrollHeight){let r=0;e-t<200?r=Math.round(-((200-(e-t))/10)):n-e<200&&(r=Math.round((200-(n-e))/10)),this.state.scrollingSpeed!==r&&this.setState({scrollingSpeed:r})}},this.animateItems=(e,t,n,r=!1)=>{this.getChildren().forEach((i,o)=>{if(setItemTransition(i,this.props.transitionDuration),t===o&&r){if(t===e)return transformItem(i,null);transformItem(i,t<e?this.itemTranslateOffsets.slice(t+1,e+1).reduce((e,t)=>e+t,0):-1*this.itemTranslateOffsets.slice(e,t).reduce((e,t)=>e+t,0))}else t<e&&o>t&&o<=e?transformItem(i,-n):o<t&&t>e&&o>=e?transformItem(i,n):transformItem(i,null)})},this.isDraggedItemOutOfBounds=()=>{let e=this.getChildren()[this.state.itemDragged].getBoundingClientRect(),t=this.ghostRef.current.getBoundingClientRect();return Math.abs(e.left-t.left)>t.width?(-1===this.state.itemDraggedOutOfBounds&&this.setState({itemDraggedOutOfBounds:this.state.itemDragged}),!0):(this.state.itemDraggedOutOfBounds>-1&&this.setState({itemDraggedOutOfBounds:-1}),!1)},this.onEnd=e=>{e.cancelable&&e.preventDefault(),document.removeEventListener("mousemove",this.schdOnMouseMove),document.removeEventListener("touchmove",this.schdOnTouchMove),document.removeEventListener("mouseup",this.schdOnEnd),document.removeEventListener("touchup",this.schdOnEnd),document.removeEventListener("touchcancel",this.schdOnEnd);let t=this.props.removableByMove&&this.isDraggedItemOutOfBounds();!t&&this.props.transitionDuration>0&&-2!==this.afterIndex&&schd(()=>{setItemTransition(this.ghostRef.current,this.props.transitionDuration,"cubic-bezier(.2,1,.1,1)"),this.afterIndex<1&&0===this.state.itemDragged?transformItem(this.ghostRef.current,0,0):transformItem(this.ghostRef.current,-(window.pageYOffset-this.lastYOffset)+-(this.listRef.current.scrollTop-this.lastListYOffset)+(this.state.itemDragged<this.afterIndex?this.itemTranslateOffsets.slice(this.state.itemDragged+1,this.afterIndex+1).reduce((e,t)=>e+t,0):-1*this.itemTranslateOffsets.slice(this.afterIndex<0?0:this.afterIndex,this.state.itemDragged).reduce((e,t)=>e+t,0)),0)})(),this.dropTimeout=window.setTimeout(this.finishDrop,t||-2===this.afterIndex?0:this.props.transitionDuration)},this.finishDrop=()=>{let e=this.props.removableByMove&&this.isDraggedItemOutOfBounds();(e||this.afterIndex>-2&&this.state.itemDragged!==this.afterIndex)&&this.props.onChange({oldIndex:this.state.itemDragged,newIndex:e?-1:Math.max(this.afterIndex,0),targetRect:this.ghostRef.current.getBoundingClientRect()}),this.getChildren().forEach(e=>{setItemTransition(e,0),transformItem(e,null),e.style.touchAction=""}),this.setState({itemDragged:-1,scrollingSpeed:0}),this.afterIndex=-2,this.lastScroll>0&&(this.listRef.current.scrollTop=this.lastScroll,this.lastScroll=0)},this.onKeyDown=e=>{let t=this.state.selectedItem,n=this.getTargetIndex(e);if(!checkIfInteractive(e.target,e.currentTarget)&&-1!==n){if(" "===e.key&&(e.preventDefault(),t===n?(t!==this.needle&&(this.getChildren().forEach(e=>{setItemTransition(e,0),transformItem(e,null)}),this.props.onChange({oldIndex:t,newIndex:this.needle,targetRect:this.getChildren()[this.needle].getBoundingClientRect()}),this.getChildren()[this.needle].focus()),this.setState({selectedItem:-1,liveText:this.props.voiceover.dropped(t+1,this.needle+1)}),this.needle=-1):(this.setState({selectedItem:n,liveText:this.props.voiceover.lifted(n+1)}),this.needle=n,this.calculateOffsets())),("ArrowDown"===e.key||"j"===e.key)&&t>-1&&this.needle<this.props.values.length-1){e.preventDefault();let n=getTranslateOffset(this.getChildren()[t]);this.needle++,this.animateItems(this.needle,t,n,!0),this.setState({liveText:this.props.voiceover.moved(this.needle+1,!1)})}if(("ArrowUp"===e.key||"k"===e.key)&&t>-1&&this.needle>0){e.preventDefault();let n=getTranslateOffset(this.getChildren()[t]);this.needle--,this.animateItems(this.needle,t,n,!0),this.setState({liveText:this.props.voiceover.moved(this.needle+1,!0)})}"Escape"===e.key&&t>-1&&(this.getChildren().forEach(e=>{setItemTransition(e,0),transformItem(e,null)}),this.setState({selectedItem:-1,liveText:this.props.voiceover.canceled(t+1)}),this.needle=-1),("Tab"===e.key||"Enter"===e.key)&&t>-1&&e.preventDefault()}},this.schdOnMouseMove=schd(this.onMouseMove),this.schdOnTouchMove=schd(this.onTouchMove),this.schdOnEnd=schd(this.onEnd)}componentDidMount(){this.calculateOffsets(),document.addEventListener("touchstart",this.onMouseOrTouchStart,{passive:!1,capture:!1}),document.addEventListener("mousedown",this.onMouseOrTouchStart)}componentDidUpdate(e,t){t.scrollingSpeed!==this.state.scrollingSpeed&&0===t.scrollingSpeed&&this.doScrolling()}componentWillUnmount(){document.removeEventListener("touchstart",this.onMouseOrTouchStart),document.removeEventListener("mousedown",this.onMouseOrTouchStart),this.dropTimeout&&window.clearTimeout(this.dropTimeout),this.schdOnMouseMove.cancel(),this.schdOnTouchMove.cancel(),this.schdOnEnd.cancel()}render(){let e={userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",boxSizing:"border-box",position:"relative"},t={...e,top:this.state.targetY,left:this.state.targetX,width:this.state.targetWidth,height:this.state.targetHeight,position:"fixed",marginTop:0};return r.createElement(r.Fragment,null,this.props.renderList({children:this.props.values.map((t,n)=>{let r=n===this.state.itemDragged,i=n===this.state.selectedItem,o=this.props.values[n]&&this.props.values[n].disabled,s={key:n,tabIndex:o?-1:0,"aria-roledescription":this.props.voiceover.item(n+1),onKeyDown:this.onKeyDown,style:{...e,visibility:r?"hidden":void 0,zIndex:i?5e3:0}};return this.props.renderItem({value:t,props:s,index:n,isDragged:!1,isSelected:i,isOutOfBounds:!1})}),isDragged:this.state.itemDragged>-1,props:{ref:this.listRef}}),this.state.itemDragged>-1&&i.createPortal(this.props.renderItem({value:this.props.values[this.state.itemDragged],props:{ref:this.ghostRef,style:t,onWheel:this.onWheel},index:this.state.itemDragged,isDragged:!0,isSelected:!1,isOutOfBounds:this.state.itemDraggedOutOfBounds>-1}),this.props.container||document.body),r.createElement("div",{"aria-live":"assertive",role:"log","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",margin:"-1px",border:"0px",padding:"0px",overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"}},this.state.liveText))}};List.defaultProps={transitionDuration:300,lockVertically:!1,removableByMove:!1,voiceover:{item:e=>`You are currently at a draggable item at position ${e}. Press space bar to lift.`,lifted:e=>`You have lifted item at position ${e}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,moved:(e,t)=>`You have moved the lifted item ${t?"up":"down"} to position ${e}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,dropped:(e,t)=>`You have dropped the item. It has moved from position ${e} to ${t}.`,canceled:e=>`You have cancelled the movement. The item has returned to its starting position of ${e}.`}};var o=List}}]);