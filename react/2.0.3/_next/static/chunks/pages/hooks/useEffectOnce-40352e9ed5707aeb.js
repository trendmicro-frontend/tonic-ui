(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8867],{62781:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var r=t(52322),o=t(45392),a=t(96835),l=t(49857),c=t(62080),i=t(10424),u=t(2784);function s(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var d=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,u.useState)(0))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,u=!1;try{for(a=(t=t.call(e)).next;!(i=(r=a.call(t)).done)&&(c.push(r.value),2!==c.length);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(e,2)||function(e,n){if(e){if("string"==typeof e)return s(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],r=n[1];return(0,u.useEffect)(function(){console.log("useEffect is triggered when value changes",{value:t})},[t]),(0,i.Z)(function(){console.log("useEffectOnce is triggered only once",{value:t})}),u.createElement(u.Fragment,null,u.createElement(l.Z,{mb:"2x"},t),u.createElement(c.Z,{onClick:function(){return r(function(e){return e+1})}},"Click Me"))};function f(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:["\n","\n",(0,r.jsx)(n.h1,{id:"useeffectonce",children:"useEffectOnce"}),"\n",(0,r.jsxs)(n.p,{children:["A modified version of the ",(0,r.jsx)(n.code,{children:"useEffect"})," Hook that runs an effect only once."]}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { useEffectOnce } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"useEffectOnce(effect);\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"effect"}),(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"() => void"})}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The effect to run."})]})})]}),"\n",(0,r.jsxs)(n.h2,{id:"demos",children:["Demos",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(a.Z,Object.assign({},{component:d,file:{data:"import { Box, Button } from '@tonic-ui/react';\nimport { useEffectOnce } from '@tonic-ui/react-hooks';\nimport React, { useEffect, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState(0);\n\n  useEffect(() => {\n    console.log('useEffect is triggered when value changes', { value });\n  }, [value]);\n\n  useEffectOnce(() => {\n    console.log('useEffectOnce is triggered only once', { value });\n  });\n\n  return (\n    <>\n      <Box mb=\"2x\">\n        {value}\n      </Box>\n      <Button onClick={() => setValue(value => value + 1)}>\n        Click Me\n      </Button>\n    </>\n  );\n};\n\nexport default App;",path:"pages/hooks/useEffectOnce.page.mdx"},sandbox:{files:{},raw:"import { Box, Button } from '@tonic-ui/react';\nimport { useEffectOnce } from '@tonic-ui/react-hooks';\nimport React, { useEffect, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState(0);\n\n  useEffect(() => {\n    console.log('useEffect is triggered when value changes', { value });\n  }, [value]);\n\n  useEffectOnce(() => {\n    console.log('useEffectOnce is triggered only once', { value });\n  });\n\n  return (\n    <>\n      <Box mb=\"2x\">\n        {value}\n      </Box>\n      <Button onClick={() => setValue(value => value + 1)}>\n        Click Me\n      </Button>\n    </>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}))]})}var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(f,e)})):f(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return w}});var r=t(27216),o=t(40596),a=t(49857),l=t(73645),c=t(99870),i=t(62272),u=t(14594),s=t(65019),d=t(37384),f=t(99554),h=t(69111),m=t(5632),p=t(2784),v=t(65245);function g(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var x=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},y=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,p.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,u=!1;try{for(a=(t=t.call(e)).next;!(i=(r=a.call(t)).done)&&(c.push(r.value),2!==c.length);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(n,2)||function(e,n){if(e){if("string"==typeof e)return g(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=t[0],o=t[1];return{value:e,onCopy:function(){x(e),o(!0),setTimeout(function(){return o(!1)},1500)},hasCopied:r}},b=t(63768),j=t(76761),E=t(73205),k=t(98107),O=t(44285),C=["component","defaultExpanded","expanded","file","sandbox"];function Z(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a,l,c=[],i=!0,u=!1;try{if(a=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=a.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return S(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var A=function(e){var n,t=e.component,g=e.defaultExpanded,x=e.expanded,S=e.file,A=e.sandbox;!function(e,n){if(null!=e){var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,C);var w=(0,m.useRouter)(),I=Z((0,p.useReducer)(function(e){return!e},!1),2),B=I[0],_=I[1],N=(0,r.u)(),M=Z((0,o.Z)(),1)[0],z={dark:j.y,light:j.q}[M],R=Z((0,s.Z)(null!=x?x:void 0!==g&&g),2),T=R[0],H=R[1],F=y(null==S?void 0:S.data),P=F.onCopy,U=F.hasCopied,D=(0,p.useCallback)(function(){P()},[P]),V=(0,p.useCallback)(function(){(0,E.b)(A)},[A]),X=(0,p.useCallback)(function(){_(),H(!1)},[_,H]);return((0,p.useEffect)(function(){void 0!==x&&x!==T&&H(x)},[x,T,H]),t)?p.createElement(v.nu,{code:null==S?void 0:S.data,disabled:!0,language:"jsx",theme:z},p.createElement(a.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[M],p:"4x"},p.createElement(a.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:B},p.createElement(t,null)))),p.createElement(l.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(O.Z,{"data-track":T?"CodeBlock|hide_source|".concat((0,k.Z)({path:w.pathname})):"CodeBlock|show_source|".concat((0,k.Z)({path:w.pathname})),onClick:H},p.createElement(c.Z,{label:T?"Hide the source":"Show the source"},p.createElement(d.Z,null))),p.createElement(O.Z,{"data-track":"CodeBlock|copy_source|".concat((0,k.Z)({path:w.pathname})),onClick:D},p.createElement(c.Z,{label:U?"Copied":"Copy the source"},p.createElement(f.Z,null))),p.createElement(O.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(w.pathname),onClick:V},p.createElement(c.Z,{label:"Edit in CodeSandbox"},p.createElement(b.Z,null))),p.createElement(O.Z,{"data-track":"CodeBlock|reset|".concat(w.pathname),onClick:X},p.createElement(c.Z,{label:"Reset the demo"},p.createElement(h.Z,null)))),p.createElement(i.Z,{in:T},p.createElement(u.Z,{in:T,unmountOnExit:!0},p.createElement(a.Z,{as:v.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==N?void 0:null===(n=N.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(v.nu,{code:null==S?void 0:S.data,disabled:!0,language:"jsx",theme:z},p.createElement(a.Z,{as:v.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};A.displayName="Demo";var w=A},87885:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEffectOnce",function(){return t(62781)}])},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}}),t(2784);var r=t(75928),o=t(52903),a=(0,r.Z)((0,o.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}}),t(2784);var r=t(75928),o=t(52903),a=(0,r.Z)((0,o.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=87885)}),_N_E=e.O()}]);