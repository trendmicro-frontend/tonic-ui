(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2153],{79978:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var o=t(52322),r=t(45392),l=t(96835),a=t(28165),c=t(40596),i=t(62080),s=t(2784);function u(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=Array(n);t<n;t++)o[t]=e[t];return o}var d=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,c.Z)())||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var o,r,l,a,c=[],i=!0,s=!1;try{for(l=(t=t.call(e)).next;!(i=(o=l.call(t)).done)&&(c.push(o.value),2!==c.length);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(s)throw r}}return c}}(e,2)||function(e,n){if(e){if("string"==typeof e)return u(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],o=n[1];return s.createElement(s.Fragment,null,s.createElement(a.xB,{styles:(0,a.iv)(":root,:host{color-scheme:",t,";}","")}),s.createElement(i.Z,{onClick:function(){o({dark:"light",light:"dark"}[t])}},"Toggle Color Mode"))};function m(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3"},(0,r.ah)(),e.components);return(0,o.jsxs)(n.div,{className:"main-content",children:["\n","\n",(0,o.jsx)(n.h1,{id:"usecolormode",children:"useColorMode"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"useColorMode"})," is a custom Hook that gives you access to the current color mode, and a function to change the color mode."]}),"\n",(0,o.jsxs)(n.h2,{id:"import",children:["Import",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"import { useColorStyle } from '@tonic-ui/react';\n"})}),"\n",(0,o.jsxs)(n.h2,{id:"usage",children:["Usage",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{disabled:!0,children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Global, css } from '@emotion/react';\nimport {\n  Button,\n  useColorMode,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'\n  const toggleColorMode = () => {\n    const nextColorMode = {\n      'dark': 'light',\n      'light': 'dark',\n    }[colorMode];\n    setColorMode(nextColorMode);\n  };\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root, :host {\n            color-scheme: ${colorMode};\n          }\n        `}\n      />\n      <Button onClick={toggleColorMode}>\n        Toggle Color Mode\n      </Button>\n    </>\n  );\n};\n\nexport default App;\n"})}),"\n",(0,o.jsxs)(n.h3,{id:"returns",children:["Returns",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.p,{children:"Returns an array with the current color mode and a function to change the color mode."}),"\n",(0,o.jsxs)(n.h2,{id:"demos",children:["Demos",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(l.Z,Object.assign({},{component:d,file:{data:"import { Global, css } from '@emotion/react';\nimport {\n  Button,\n  useColorMode,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'\n  const toggleColorMode = () => {\n    const nextColorMode = {\n      'dark': 'light',\n      'light': 'dark',\n    }[colorMode];\n    setColorMode(nextColorMode);\n  };\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root, :host {\n            color-scheme: ${colorMode};\n          }\n        `}\n      />\n      <Button onClick={toggleColorMode}>\n        Toggle Color Mode\n      </Button>\n    </>\n  );\n};\n\nexport default App;",path:"pages/components/color-mode/useColorMode.page.mdx"},sandbox:{files:{},raw:"import { Global, css } from '@emotion/react';\nimport {\n  Button,\n  useColorMode,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'\n  const toggleColorMode = () => {\n    const nextColorMode = {\n      'dark': 'light',\n      'light': 'dark',\n    }[colorMode];\n    setColorMode(nextColorMode);\n  };\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root, :host {\n            color-scheme: ${colorMode};\n          }\n        `}\n      />\n      <Button onClick={toggleColorMode}>\n        Toggle Color Mode\n      </Button>\n    </>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}))]})}var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components).wrapper;return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(m,e)})):m(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return A}});var o=t(27216),r=t(40596),l=t(49857),a=t(73645),c=t(99870),i=t(62272),s=t(14594),u=t(65019),d=t(37384),m=t(99554),h=t(69111),f=t(5632),p=t(2784),g=t(65245);function y(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=Array(n);t<n;t++)o[t]=e[t];return o}var v=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},b=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,p.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var o,r,l,a,c=[],i=!0,s=!1;try{for(l=(t=t.call(e)).next;!(i=(o=l.call(t)).done)&&(c.push(o.value),2!==c.length);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(s)throw r}}return c}}(n,2)||function(e,n){if(e){if("string"==typeof e)return y(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return y(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=t[0],r=t[1];return{value:e,onCopy:function(){v(e),r(!0),setTimeout(function(){return r(!1)},1500)},hasCopied:o}},x=t(63768),C=t(76761),j=t(73205),k=t(98107),M=t(44285),E=["component","defaultExpanded","expanded","file","sandbox"];function Z(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var o,r,l,a,c=[],i=!0,s=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(o=l.call(t)).done)&&(c.push(o.value),c.length!==n);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(s)throw r}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return O(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return O(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=Array(n);t<n;t++)o[t]=e[t];return o}var S=function(e){var n,t=e.component,y=e.defaultExpanded,v=e.expanded,O=e.file,S=e.sandbox;!function(e,n){if(null!=e){var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)t=l[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)t=l[o],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}}}(e,E);var A=(0,f.useRouter)(),w=Z((0,p.useReducer)(function(e){return!e},!1),2),I=w[0],_=w[1],B=(0,o.u)(),N=Z((0,r.Z)(),1)[0],R={dark:C.y,light:C.q}[N],z=Z((0,u.Z)(null!=v?v:void 0!==y&&y),2),T=z[0],H=z[1],G=b(null==O?void 0:O.data),$=G.onCopy,F=G.hasCopied,U=(0,p.useCallback)(function(){$()},[$]),P=(0,p.useCallback)(function(){(0,j.b)(S)},[S]),X=(0,p.useCallback)(function(){_(),H(!1)},[_,H]);return((0,p.useEffect)(function(){void 0!==v&&v!==T&&H(v)},[v,T,H]),t)?p.createElement(g.nu,{code:null==O?void 0:O.data,disabled:!0,language:"jsx",theme:R},p.createElement(l.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[N],p:"4x"},p.createElement(l.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:I},p.createElement(t,null)))),p.createElement(a.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(M.Z,{"data-track":T?"CodeBlock|hide_source|".concat((0,k.Z)({path:A.pathname})):"CodeBlock|show_source|".concat((0,k.Z)({path:A.pathname})),onClick:H},p.createElement(c.Z,{label:T?"Hide the source":"Show the source"},p.createElement(d.Z,null))),p.createElement(M.Z,{"data-track":"CodeBlock|copy_source|".concat((0,k.Z)({path:A.pathname})),onClick:U},p.createElement(c.Z,{label:F?"Copied":"Copy the source"},p.createElement(m.Z,null))),p.createElement(M.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(A.pathname),onClick:P},p.createElement(c.Z,{label:"Edit in CodeSandbox"},p.createElement(x.Z,null))),p.createElement(M.Z,{"data-track":"CodeBlock|reset|".concat(A.pathname),onClick:X},p.createElement(c.Z,{label:"Reset the demo"},p.createElement(h.Z,null)))),p.createElement(i.Z,{in:T},p.createElement(s.Z,{in:T,unmountOnExit:!0},p.createElement(l.Z,{as:g.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==B?void 0:null===(n=B.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(g.nu,{code:null==O?void 0:O.data,disabled:!0,language:"jsx",theme:R},p.createElement(l.Z,{as:g.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};S.displayName="Demo";var A=S},39261:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-mode/useColorMode",function(){return t(79978)}])},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}}),t(2784);var o=t(75928),r=t(52903),l=(0,o.Z)((0,r.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}}),t(2784);var o=t(75928),r=t(52903),l=(0,o.Z)((0,r.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=39261)}),_N_E=e.O()}]);