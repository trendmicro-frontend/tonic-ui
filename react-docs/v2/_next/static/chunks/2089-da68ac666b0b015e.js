"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2089],{96835:function(e,t,n){n.d(t,{Z:function(){return M}});var l=n(27216),r=n(40596),c=n(49857),o=n(73645),a=n(99870),u=n(62272),i=n(14594),d=n(65019),m=n(37384),f=n(99554),s=n(69111),v=n(5632),p=n(2784),h=n(65245);function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}var g=function(e){var t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);var n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select(),document.execCommand("copy"),document.body.removeChild(t),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n))},b=function(e){var t,n=function(e){if(Array.isArray(e))return e}(t=(0,p.useState)(!1))||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var l,r,c,o,a=[],u=!0,i=!1;try{for(c=(n=n.call(e)).next;!(u=(l=c.call(n)).done)&&(a.push(l.value),2!==a.length);u=!0);}catch(e){i=!0,r=e}finally{try{if(!u&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(i)throw r}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return y(e,2);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(e,2)}}(t,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),l=n[0],r=n[1];return{value:e,onCopy:function(){g(e),r(!0),setTimeout(function(){return r(!1)},1500)},hasCopied:l}},Z=n(63768),C=n(76761),E=n(73205),w=n(98107),x=n(44285),k=["component","defaultExpanded","expanded","file","sandbox"];function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var l,r,c,o,a=[],u=!0,i=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(l=c.call(n)).done)&&(a.push(l.value),a.length!==t);u=!0);}catch(e){i=!0,r=e}finally{try{if(!u&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(i)throw r}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return S(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}var z=function(e){var t,n=e.component,y=e.defaultExpanded,g=e.expanded,S=e.file,z=e.sandbox;!function(e,t){if(null!=e){var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},c=Object.keys(e);for(l=0;l<c.length;l++)n=c[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(l=0;l<c.length;l++)n=c[l],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}}}(e,k);var M=(0,v.useRouter)(),j=A((0,p.useReducer)(function(e){return!e},!1),2),O=j[0],R=j[1],I=(0,l.u)(),G=A((0,r.Z)(),1)[0],_={dark:C.y,light:C.q}[G],F=A((0,d.Z)(null!=g?g:void 0!==y&&y),2),T=F[0],B=F[1],q=b(null==S?void 0:S.data),N=q.onCopy,H=q.hasCopied,P=(0,p.useCallback)(function(){N()},[N]),U=(0,p.useCallback)(function(){(0,E.b)(z)},[z]),X=(0,p.useCallback)(function(){R(),B(!1)},[R,B]);return((0,p.useEffect)(function(){void 0!==g&&g!==T&&B(g)},[g,T,B]),n)?p.createElement(h.nu,{code:null==S?void 0:S.data,disabled:!0,language:"jsx",theme:_},p.createElement(c.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[G],p:"4x"},p.createElement(c.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:O},p.createElement(n,null)))),p.createElement(o.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(x.Z,{"data-track":T?"CodeBlock|hide_source|".concat((0,w.Z)({path:M.pathname})):"CodeBlock|show_source|".concat((0,w.Z)({path:M.pathname})),onClick:B},p.createElement(a.Z,{label:T?"Hide the source":"Show the source"},p.createElement(m.Z,null))),p.createElement(x.Z,{"data-track":"CodeBlock|copy_source|".concat((0,w.Z)({path:M.pathname})),onClick:P},p.createElement(a.Z,{label:H?"Copied":"Copy the source"},p.createElement(f.Z,null))),p.createElement(x.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(M.pathname),onClick:U},p.createElement(a.Z,{label:"Edit in CodeSandbox"},p.createElement(Z.Z,null))),p.createElement(x.Z,{"data-track":"CodeBlock|reset|".concat(M.pathname),onClick:X},p.createElement(a.Z,{label:"Reset the demo"},p.createElement(s.Z,null)))),p.createElement(u.Z,{in:T},p.createElement(i.Z,{in:T,unmountOnExit:!0},p.createElement(c.Z,{as:h.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==I?void 0:null===(t=I.space)||void 0===t?void 0:t["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(h.nu,{code:null==S?void 0:S.data,disabled:!0,language:"jsx",theme:_},p.createElement(c.Z,{as:h.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};z.displayName="Demo";var M=z},10525:function(e,t,n){n.d(t,{Z:function(){return r}});var l=n(2784),r=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=(0,l.useRef)(!1);t&&!n.current&&("function"==typeof e&&e(),n.current=!0)}},43116:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M15 9h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"}),"AddIcon")},50397:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M6 14h4c0 1.105-0.895 2-2 2s-2-0.895-2-2v0zM15 12c-1.237-1.248-2.001-2.967-2.001-4.863 0-0.048 0-0.096 0.001-0.144l-0 0.007v-1c0-0 0-0.001 0-0.001 0-2.407-1.701-4.417-3.967-4.893l-0.033-0.006s0-0.1 0-0.1c0-0.552-0.448-1-1-1s-1 0.448-1 1v0s0 0.070 0 0.1c-2.299 0.482-4 2.492-4 4.899 0 0 0 0.001 0 0.001v-0 1c0.001 0.041 0.001 0.089 0.001 0.137 0 1.897-0.764 3.615-2.002 4.864l0.001-0.001v1h14v-1z"}),"AlertIcon")},99554:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},86299:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M1 9v-2h14v2h-14z"}),"MinusIcon")},69111:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")},64940:function(e,t,n){n.d(t,{Z:function(){return c}}),n(2784);var l=n(75928),r=n(52903),c=(0,l.Z)((0,r.tZ)("path",{d:"M4.687 8.398c-0.001 0.024-0.001 0.052-0.001 0.080 0 1.249 0.69 2.336 1.71 2.902l0.017 0.009c-0.087 0.491-0.295 0.923-0.592 1.278l0.003-0.004c-1.521-0.802-2.539-2.372-2.539-4.181 0-0.074 0.002-0.147 0.005-0.22v0.010c0.139-0.025 0.3-0.040 0.463-0.040 0.335 0 0.657 0.061 0.953 0.173l-0.019-0.006zM6.273 5.65c0.492-0.304 1.088-0.485 1.726-0.485s1.235 0.18 1.741 0.493l-0.014-0.008c0.359-0.3 0.637-0.687 0.802-1.128l0.006-0.019c-0.717-0.464-1.594-0.74-2.535-0.74s-1.817 0.276-2.553 0.751l0.019-0.011c0.171 0.46 0.449 0.846 0.804 1.143l0.004 0.003zM14.975 13.209l-0.123-0.071c-0.014-0.008-0.032-0.013-0.050-0.013-0.030 0-0.057 0.013-0.076 0.034v0c-0.612 0.678-1.493 1.102-2.474 1.102-1.838 0-3.328-1.49-3.328-3.328 0-0.512 0.116-0.998 0.323-1.431l-0.009 0.020c0.005-0.011 0.008-0.024 0.008-0.038 0-0.033-0.018-0.062-0.044-0.077v0l-0.441-0.254c-0.016-0.009-0.034-0.015-0.054-0.015-0.028 0-0.054 0.011-0.073 0.028v0c-0.055 0.050-0.116 0.095-0.183 0.131l-0.005 0.002-0.016 0.008c-0.019 0.010-0.038 0.019-0.057 0.028l-0.009 0.004c-0.022 0.009-0.043 0.018-0.066 0.025l-0.003 0.001c-0.041 0.014-0.091 0.027-0.142 0.036l-0.006 0.001-0.005 0.001q-0.035 0.005-0.069 0.008l-0.020 0.001c-0.018 0.001-0.037 0.002-0.055 0.002l-0.039-0.001-0.035-0.002c-0.018-0.002-0.037-0.004-0.055-0.007l-0.019-0.003c-0.021-0.003-0.042-0.008-0.063-0.013l-0.012-0.003c-0.021-0.005-0.042-0.011-0.063-0.018l-0.013-0.004c-0.019-0.007-0.038-0.014-0.057-0.022l-0.018-0.007c-0.017-0.007-0.034-0.016-0.050-0.024l-0.023-0.012c-0.070-0.039-0.131-0.083-0.186-0.133l0.001 0.001c-0.019-0.017-0.044-0.028-0.072-0.028-0.020 0-0.039 0.005-0.055 0.015v0l-0.441 0.254c-0.027 0.016-0.045 0.044-0.045 0.077 0 0.014 0.003 0.027 0.009 0.038v-0.001c0.198 0.413 0.314 0.899 0.314 1.411 0 1.838-1.49 3.328-3.328 3.328-0.981 0-1.862-0.424-2.472-1.099l-0.003-0.003c-0.019-0.021-0.046-0.034-0.076-0.034-0.019 0-0.036 0.005-0.051 0.014v0l-0.123 0.071c-0.022 0.012-0.037 0.035-0.037 0.062 0 0.016 0.005 0.030 0.014 0.042v0c0.845 1.050 2.13 1.716 3.57 1.716 1.363 0 2.586-0.596 3.424-1.542l0.004-0.005c0.842 0.95 2.065 1.546 3.428 1.546 1.441 0 2.725-0.666 3.564-1.707l0.007-0.009c0.009-0.012 0.014-0.026 0.014-0.042 0-0.027-0.015-0.050-0.037-0.062v0zM13.714 6.499c-0.398-0.234-0.86-0.415-1.351-0.517l-0.030-0.005c0.151-0.434 0.238-0.935 0.238-1.456 0-2.282-1.672-4.174-3.858-4.517l-0.026-0.003c-0.002 0-0.005-0.001-0.008-0.001-0.039 0-0.070 0.031-0.070 0.070 0 0.001 0 0.002 0 0.002v0 0.142c0 0.049 0.035 0.089 0.081 0.099h0.001c1.518 0.33 2.638 1.662 2.638 3.255 0 1.738-1.332 3.164-3.030 3.315l-0.013 0.001c-0.046 0.004-0.081 0.042-0.081 0.089 0 0 0 0 0 0v0 0.509c0 0 0 0 0 0 0 0.048 0.031 0.089 0.075 0.103h0.001c0.080 0.025 0.149 0.058 0.213 0.098l-0.004-0.002 0.015 0.009c0.018 0.011 0.035 0.023 0.052 0.036l0.008 0.006c0.019 0.014 0.037 0.029 0.055 0.044l0.002 0.002c0.038 0.034 0.073 0.070 0.104 0.108l0.001 0.002 0.003 0.004q0.022 0.027 0.042 0.056l0.011 0.016c0.010 0.015 0.020 0.031 0.029 0.047l0.018 0.034 0.016 0.032c0.008 0.017 0.015 0.034 0.022 0.051l0.008 0.019c0.008 0.020 0.014 0.040 0.020 0.060l0.004 0.012c0.006 0.021 0.011 0.042 0.015 0.063l0.003 0.013c0.004 0.020 0.007 0.040 0.009 0.060l0.003 0.019c0.002 0.018 0.003 0.037 0.004 0.055l0.001 0.026c0 0.007 0 0.015 0 0.023 0 0.072-0.008 0.143-0.024 0.21l0.001-0.006c-0.002 0.007-0.002 0.015-0.002 0.023 0 0.040 0.022 0.075 0.054 0.093h0.001l0.441 0.255c0.013 0.008 0.028 0.012 0.045 0.012 0.030 0 0.057-0.015 0.073-0.038v0c0.609-0.865 1.604-1.423 2.729-1.423 1.838 0 3.328 1.49 3.328 3.328 0 0.368-0.060 0.722-0.17 1.053l0.007-0.024c-0.003 0.010-0.005 0.021-0.005 0.032 0 0.037 0.020 0.070 0.050 0.088v0l0.123 0.071c0.011 0.007 0.023 0.011 0.037 0.011 0.029 0 0.053-0.017 0.064-0.042v0c0.198-0.493 0.314-1.065 0.314-1.664 0-1.683-0.909-3.154-2.264-3.947l-0.022-0.012zM9.587 11.388c0.087 0.491 0.295 0.923 0.592 1.278l-0.003-0.004c1.521-0.802 2.539-2.372 2.539-4.18 0-0.074-0.002-0.147-0.005-0.22v0.010c-0.139-0.025-0.3-0.040-0.463-0.040-0.335 0-0.656 0.061-0.953 0.173l0.019-0.006c0.001 0.024 0.001 0.052 0.001 0.080 0 1.249-0.69 2.336-1.71 2.902l-0.017 0.009zM2.084 8.051c0.477-0.28 1.051-0.446 1.664-0.446 1.125 0 2.12 0.558 2.722 1.413l0.007 0.011c0.016 0.023 0.043 0.038 0.073 0.038 0.016 0 0.032-0.004 0.045-0.012v0l0.441-0.255c0.033-0.019 0.054-0.054 0.054-0.094 0-0.008-0.001-0.016-0.003-0.024v0.001c-0.014-0.061-0.022-0.131-0.022-0.204 0-0.009 0-0.018 0-0.027v0.001l0.001-0.017c0.001-0.021 0.002-0.042 0.005-0.064l0.001-0.010c0.003-0.023 0.006-0.046 0.011-0.069l0.001-0.003c0.005-0.025 0.011-0.049 0.018-0.073v0q0.011-0.037 0.024-0.072l0.002-0.005c0.008-0.022 0.017-0.043 0.027-0.064l0.009-0.018c0.008-0.016 0.016-0.032 0.026-0.048l0.021-0.033 0.019-0.030c0.011-0.015 0.022-0.030 0.033-0.045l0.012-0.015c0.014-0.017 0.028-0.033 0.042-0.048l0.008-0.009c0.015-0.016 0.031-0.030 0.047-0.045l0.010-0.009c0.015-0.013 0.031-0.026 0.047-0.038l0.016-0.012c0.015-0.011 0.030-0.021 0.046-0.031l0.022-0.014c0.060-0.037 0.128-0.069 0.201-0.092l0.007-0.002c0.044-0.014 0.075-0.055 0.075-0.103 0 0 0 0 0 0v0-0.509c0 0 0 0 0 0 0-0.047-0.036-0.085-0.081-0.089v0c-1.711-0.151-3.043-1.578-3.043-3.315 0-1.593 1.12-2.925 2.615-3.251l0.022-0.004c0.047-0.010 0.081-0.051 0.081-0.099v-0.142c0-0.001 0-0.001 0-0.002 0-0.039-0.031-0.070-0.070-0.070-0.003 0-0.006 0-0.009 0.001v0c-2.212 0.346-3.884 2.238-3.884 4.52 0 0.521 0.087 1.022 0.248 1.488l-0.010-0.032c-2.106 0.437-3.666 2.278-3.666 4.482 0 0.599 0.115 1.17 0.324 1.694l-0.011-0.031c0.011 0.025 0.036 0.042 0.064 0.042 0.014 0 0.027-0.004 0.037-0.011v0l0.123-0.071c0.030-0.018 0.050-0.051 0.050-0.088 0-0.011-0.002-0.022-0.005-0.033v0.001c-0.103-0.307-0.163-0.661-0.163-1.029 0-1.225 0.662-2.296 1.648-2.874l0.016-0.008z"}),"VirusIcon")},6194:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(53860),r=n(2784),c=n(52903),o=n(49857),a=["gap","rowGap","columnGap","column","row","area","autoFlow","autoRows","autoColumns","templateRows","templateColumns","templateAreas"],u=(0,r.forwardRef)(function(e,t){var n=e.gap,r=e.rowGap,u=e.columnGap,i=e.column,d=e.row,m=e.area,f=e.autoFlow,s=e.autoRows,v=e.autoColumns,p=e.templateRows,h=e.templateColumns,y=e.templateAreas,g=(0,l.Kd)(e,a);return(0,c.tZ)(o.Z,(0,l.Zj)({ref:t,display:"grid",gridGap:n,gridRowGap:r,gridColumnGap:u,gridColumn:i,gridRow:d,gridArea:m,gridAutoFlow:f,gridAutoRows:s,gridAutoColumns:v,gridTemplateRows:p,gridTemplateColumns:h,gridTemplateAreas:y},g))});u.displayName="Grid";var i=u}}]);