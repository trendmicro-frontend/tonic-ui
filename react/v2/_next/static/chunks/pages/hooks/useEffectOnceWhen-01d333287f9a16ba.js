(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3731],{88530:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var r=t(52322),o=t(45392),a=t(96835),l=t(62080),c=t(94581),i=t(2784);function s(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var u=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,i.useState)("idle"))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,s=!1;try{for(a=(t=t.call(e)).next;!(i=(r=a.call(t)).done)&&(c.push(r.value),2!==c.length);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return c}}(e,2)||function(e,n){if(e){if("string"==typeof e)return s(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],r=n[1];return(0,c.Z)(function(){setTimeout(function(){r("loaded")},3e3)},"loading"===t),i.createElement(i.Fragment,null,"idle"===t&&i.createElement(l.Z,{onClick:function(){return r("loading")}},"Click To Run"),"loading"===t&&"Loading component (will be gone in 3 seconds)...","loaded"===t&&"Component loaded!")};function d(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:["\n","\n",(0,r.jsx)(n.h1,{id:"useeffectoncewhen",children:"useEffectOnceWhen"}),"\n",(0,r.jsxs)(n.p,{children:["A custom Hook similar to ",(0,r.jsx)(n.code,{children:"useEffectOnce"}),", but only runs once when a condition is met."]}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { useEffectOnceWhen } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"useEffectOnceWhen(effect, when);\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"effect"}),(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"() => void"})}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The effect to run."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"when"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"false"}),(0,r.jsx)(n.td,{align:"left",children:"The condition to run the effect."})]})]})]}),"\n",(0,r.jsxs)(n.h2,{id:"demos",children:["Demos",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(a.Z,Object.assign({},{component:u,file:{data:"import { Button } from '@tonic-ui/react';\nimport { useEffectOnceWhen } from '@tonic-ui/react-hooks';\nimport React, { useState } from 'react';\n\nconst App = () => {\n  const [state, setState] = useState('idle');\n\n  useEffectOnceWhen(() => {\n    setTimeout(() => {\n      setState('loaded');\n    }, 3000); // Countdown for 3 seconds\n  }, (state === 'loading'));\n\n  return (\n    <>\n      {state === 'idle' && (\n        <Button onClick={() => setState('loading')}>\n          Click To Run\n        </Button>\n      )}\n      {state === 'loading' && 'Loading component (will be gone in 3 seconds)...'}\n      {state === 'loaded' && 'Component loaded!'}\n    </>\n  );\n};\n\nexport default App;",path:"pages/hooks/useEffectOnceWhen.page.mdx"},sandbox:{files:{},raw:"import { Button } from '@tonic-ui/react';\nimport { useEffectOnceWhen } from '@tonic-ui/react-hooks';\nimport React, { useState } from 'react';\n\nconst App = () => {\n  const [state, setState] = useState('idle');\n\n  useEffectOnceWhen(() => {\n    setTimeout(() => {\n      setState('loaded');\n    }, 3000); // Countdown for 3 seconds\n  }, (state === 'loading'));\n\n  return (\n    <>\n      {state === 'idle' && (\n        <Button onClick={() => setState('loading')}>\n          Click To Run\n        </Button>\n      )}\n      {state === 'loading' && 'Loading component (will be gone in 3 seconds)...'}\n      {state === 'loaded' && 'Component loaded!'}\n    </>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}))]})}var f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(d,e)})):d(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return A}});var r=t(27216),o=t(40596),a=t(49857),l=t(73645),c=t(99870),i=t(62272),s=t(14594),u=t(65019),d=t(37384),f=t(99554),h=t(69111),m=t(5632),p=t(2784),g=t(65245);function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var y=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},b=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,p.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,s=!1;try{for(a=(t=t.call(e)).next;!(i=(r=a.call(t)).done)&&(c.push(r.value),2!==c.length);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return c}}(n,2)||function(e,n){if(e){if("string"==typeof e)return x(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=t[0],o=t[1];return{value:e,onCopy:function(){y(e),o(!0),setTimeout(function(){return o(!1)},1500)},hasCopied:r}},v=t(63768),j=t(76761),E=t(73205),k=t(98107),C=t(44285),S=["component","defaultExpanded","expanded","file","sandbox"];function O(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,s=!1;try{if(a=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=a.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return Z(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Z(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var w=function(e){var n,t=e.component,x=e.defaultExpanded,y=e.expanded,Z=e.file,w=e.sandbox;!function(e,n){if(null!=e){var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,S);var A=(0,m.useRouter)(),I=O((0,p.useReducer)(function(e){return!e},!1),2),_=I[0],T=I[1],N=(0,r.u)(),R=O((0,o.Z)(),1)[0],z={dark:j.y,light:j.q}[R],B=O((0,u.Z)(null!=y?y:void 0!==x&&x),2),M=B[0],W=B[1],H=b(null==Z?void 0:Z.data),F=H.onCopy,P=H.hasCopied,U=(0,p.useCallback)(function(){F()},[F]),D=(0,p.useCallback)(function(){(0,E.b)(w)},[w]),X=(0,p.useCallback)(function(){T(),W(!1)},[T,W]);return((0,p.useEffect)(function(){void 0!==y&&y!==M&&W(y)},[y,M,W]),t)?p.createElement(g.nu,{code:null==Z?void 0:Z.data,disabled:!0,language:"jsx",theme:z},p.createElement(a.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[R],p:"4x"},p.createElement(a.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:_},p.createElement(t,null)))),p.createElement(l.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(C.Z,{"data-track":M?"CodeBlock|hide_source|".concat((0,k.Z)({path:A.pathname})):"CodeBlock|show_source|".concat((0,k.Z)({path:A.pathname})),onClick:W},p.createElement(c.Z,{label:M?"Hide the source":"Show the source"},p.createElement(d.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|copy_source|".concat((0,k.Z)({path:A.pathname})),onClick:U},p.createElement(c.Z,{label:P?"Copied":"Copy the source"},p.createElement(f.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(A.pathname),onClick:D},p.createElement(c.Z,{label:"Edit in CodeSandbox"},p.createElement(v.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|reset|".concat(A.pathname),onClick:X},p.createElement(c.Z,{label:"Reset the demo"},p.createElement(h.Z,null)))),p.createElement(i.Z,{in:M},p.createElement(s.Z,{in:M,unmountOnExit:!0},p.createElement(a.Z,{as:g.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==N?void 0:null===(n=N.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(g.nu,{code:null==Z?void 0:Z.data,disabled:!0,language:"jsx",theme:z},p.createElement(a.Z,{as:g.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};w.displayName="Demo";var A=w},11568:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEffectOnceWhen",function(){return t(88530)}])},94581:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var r=t(2784),o=function(e,n){var t=(0,r.useRef)(!1),o=(0,r.useRef)(e);o.current=e,(0,r.useEffect)(function(){n&&!t.current&&("function"==typeof o.current&&o.current(),t.current=!0)},[n])}},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}}),t(2784);var r=t(75928),o=t(52903),a=(0,r.Z)((0,o.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}}),t(2784);var r=t(75928),o=t(52903),a=(0,r.Z)((0,o.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=11568)}),_N_E=e.O()}]);