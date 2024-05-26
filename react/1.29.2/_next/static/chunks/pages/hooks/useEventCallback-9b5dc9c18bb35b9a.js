(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6003],{63447:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var a=t(52322),r=t(45392),l=t(16959),o=t(67569),c=t(2784);function i(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var s=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,c.useState)(""))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,r,l,o,c=[],i=!0,s=!1;try{for(l=(t=t.call(e)).next;!(i=(a=l.call(t)).done)&&(c.push(a.value),2!==c.length);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(o=t.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,2)||function(e,n){if(e){if("string"==typeof e)return i(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],a=n[1],r=(0,c.useCallback)(function(e){var n=e.target.value;console.log("prev=".concat(t,", next=").concat(n)),a(n)},[t]),l=(0,c.useRef)(r),s=(0,c.useRef)(0);return l.current!==r&&(l.current=r,s.current++),c.createElement(c.Fragment,null,c.createElement(o.Box,{mb:"2x"},'"onChange" invalidation count: ',s.current),c.createElement(o.Input,{value:t,onChange:r,placeholder:"Enter your text"}))},u=t(49427);function d(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var h=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,c.useState)(""))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,r,l,o,c=[],i=!0,s=!1;try{for(l=(t=t.call(e)).next;!(i=(a=l.call(t)).done)&&(c.push(a.value),2!==c.length);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(o=t.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,2)||function(e,n){if(e){if("string"==typeof e)return d(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],a=n[1],r=(0,u.useEventCallback)(function(e){var n=e.target.value;console.log("prev=".concat(t,", next=").concat(n)),a(n)},[t]),l=(0,c.useRef)(r),i=(0,c.useRef)(0);return l.current!==r&&(l.current=r,i.current++),c.createElement(c.Fragment,null,c.createElement(o.Box,{mb:"2x"},'"onChange" invalidation count: ',i.current),c.createElement(o.Input,{value:t,onChange:r,placeholder:"Enter your text"}))};function f(e){var n=Object.assign({div:"div",h1:"h1",p:"p",a:"a",code:"code",ul:"ul",li:"li",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h4:"h4"},(0,r.ah)(),e.components);return(0,a.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n","\n",(0,a.jsx)(n.h1,{id:"useeventcallback",children:"useEventCallback"}),"\n",(0,a.jsx)(n.p,{children:"A custom Hook to do escape hatch optimization for event callbacks."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://dev.to/yelouafi/a-simple-rule-for-using-callbacks-in-react-4jah",children:"https://dev.to/yelouafi/a-simple-rule-for-using-callbacks-in-react-4jah"})}),"\n",(0,a.jsxs)(n.p,{children:["The general rule is: use ",(0,a.jsx)(n.code,{children:"useEventCallback"})," when doing side effects, and use the built-in ",(0,a.jsx)(n.code,{children:"useCallback"})," when doing render work."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"useEventCallback"})," is more suited for callbacks waiting for some external input, then changing the state of the applicationo."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"useCallback"})," is more suited for callbacks that output something into the external world. In fact ",(0,a.jsx)(n.code,{children:"useCallback"})," is semantically really an alias for ",(0,a.jsx)(n.code,{children:"useMemo"})," since we're treating functions here the same as the values we output from JSX."]}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"import",children:["Import",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"import { useEventCallback } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,a.jsxs)(n.h2,{id:"usage",children:["Usage",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"const memoizedCallback = useEventCallback(fn, dependencies);\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{align:"left",children:"Name"}),(0,a.jsx)(n.th,{align:"left",children:"Type"}),(0,a.jsx)(n.th,{align:"left",children:"Default"}),(0,a.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"fn"}),(0,a.jsx)(n.td,{align:"left",children:(0,a.jsx)(n.code,{children:"(...rest: any[]) => void"})}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"The function to be called."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"dependencies?"}),(0,a.jsx)(n.td,{align:"left",children:"any[]"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"The dependencies of the function."})]})]})]}),"\n",(0,a.jsxs)(n.h3,{id:"returns",children:["Returns",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(n.p,{children:"Returns a memoized version of the event callback."}),"\n",(0,a.jsxs)(n.h2,{id:"demos",children:["Demos",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.p,{children:["Try typing some text in the input fields and see the difference between ",(0,a.jsx)(n.code,{children:"useEventCallback"})," and ",(0,a.jsx)(n.code,{children:"useCallback"}),"."]}),"\n",(0,a.jsxs)(n.h4,{id:"useeventcallback-1",children:["useEventCallback",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#useeventcallback-1",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(l.Z,{component:h,file:{data:"/* eslint-disable react/no-unescaped-entities */\nimport { Box, Input } from '@tonic-ui/react';\nimport { useEventCallback } from '@tonic-ui/react-hooks';\nimport React, { useRef, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState('');\n  const onChange = useEventCallback((event) => {\n    const nextValue = event.target.value;\n    console.log(`prev=${value}, next=${nextValue}`);\n    setValue(nextValue);\n  }, [value]);\n  const prevOnChangeRef = useRef(onChange);\n  const invalidationCountRef = useRef(0);\n  if (prevOnChangeRef.current !== onChange) {\n    prevOnChangeRef.current = onChange;\n    invalidationCountRef.current++;\n  }\n\n  return (\n    <>\n      <Box mb=\"2x\">\"onChange\" invalidation count: {invalidationCountRef.current}</Box>\n      <Input value={value} onChange={onChange} placeholder=\"Enter your text\" />\n    </>\n  );\n};\n\nexport default App;",path:"pages/hooks/useEventCallback.page.mdx"},sandbox:{files:{},raw:"/* eslint-disable react/no-unescaped-entities */\nimport { Box, Input } from '@tonic-ui/react';\nimport { useEventCallback } from '@tonic-ui/react-hooks';\nimport React, { useRef, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState('');\n  const onChange = useEventCallback((event) => {\n    const nextValue = event.target.value;\n    console.log(`prev=${value}, next=${nextValue}`);\n    setValue(nextValue);\n  }, [value]);\n  const prevOnChangeRef = useRef(onChange);\n  const invalidationCountRef = useRef(0);\n  if (prevOnChangeRef.current !== onChange) {\n    prevOnChangeRef.current = onChange;\n    invalidationCountRef.current++;\n  }\n\n  return (\n    <>\n      <Box mb=\"2x\">\"onChange\" invalidation count: {invalidationCountRef.current}</Box>\n      <Input value={value} onChange={onChange} placeholder=\"Enter your text\" />\n    </>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,a.jsxs)(n.h4,{id:"usecallback",children:["useCallback",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usecallback",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(l.Z,{component:s,file:{data:"/* eslint-disable react/no-unescaped-entities */\nimport { Box, Input } from '@tonic-ui/react';\nimport React, { useCallback, useRef, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState('');\n  const onChange = useCallback((event) => {\n    const nextValue = event.target.value;\n    console.log(`prev=${value}, next=${nextValue}`);\n    setValue(nextValue);\n  }, [value]);\n  const prevOnChangeRef = useRef(onChange);\n  const invalidationCountRef = useRef(0);\n  if (prevOnChangeRef.current !== onChange) {\n    prevOnChangeRef.current = onChange;\n    invalidationCountRef.current++;\n  }\n\n  return (\n    <>\n      <Box mb=\"2x\">\"onChange\" invalidation count: {invalidationCountRef.current}</Box>\n      <Input value={value} onChange={onChange} placeholder=\"Enter your text\" />\n    </>\n  );\n};\n\nexport default App;",path:"pages/hooks/useEventCallback.page.mdx"},sandbox:{files:{},raw:"/* eslint-disable react/no-unescaped-entities */\nimport { Box, Input } from '@tonic-ui/react';\nimport React, { useCallback, useRef, useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState('');\n  const onChange = useCallback((event) => {\n    const nextValue = event.target.value;\n    console.log(`prev=${value}, next=${nextValue}`);\n    setValue(nextValue);\n  }, [value]);\n  const prevOnChangeRef = useRef(onChange);\n  const invalidationCountRef = useRef(0);\n  if (prevOnChangeRef.current !== onChange) {\n    prevOnChangeRef.current = onChange;\n    invalidationCountRef.current++;\n  }\n\n  return (\n    <>\n      <Box mb=\"2x\">\"onChange\" invalidation count: {invalidationCountRef.current}</Box>\n      <Input value={value} onChange={onChange} placeholder=\"Enter your text\" />\n    </>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})]})}var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components).wrapper;return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(f,e)})):f(e)}},16959:function(e,n,t){"use strict";t.d(n,{Z:function(){return C}});var a=t(67569),r=t(49427),l=t(5632),o=t(2784),c=t(65245),i=t(16245),s=t(76761),u=t(73205),d=t(98107),h=["size"];function f(){return(f=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var p=(0,o.forwardRef)(function(e,n){var t=e.size,r=function(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}(e,h);return o.createElement(a.SVGIcon,f({size:t,viewBox:"0 0 1024 1024"},r),o.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});p.displayName="CodeSandboxIcon";var x=t(44285);function m(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,r,l,o,c=[],i=!0,s=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(a=l.call(t)).done)&&(c.push(a.value),c.length!==n);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=t.return&&(o=t.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return v(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var g={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},b=function(e){var n=e.component,t=e.file,h=e.sandbox,f=(0,l.useRouter)(),v=m((0,o.useReducer)(function(e){return!e},!1),2),b=v[0],C=v[1],j=m((0,a.useColorMode)(),1)[0],y={dark:s.y,light:s.q}[j],k=m((0,r.useToggle)(!1),2),E=k[0],R=k[1],O=(0,i.Z)(null==t?void 0:t.data),I=O.onCopy,S=O.hasCopied,w=(0,o.useCallback)(function(){I()},[I]),A=(0,o.useCallback)(function(){(0,u.b)(h)},[h]),V=(0,o.useCallback)(function(){C(),R(!1)},[C,R]);return o.createElement(c.nu,{code:null==t?void 0:t.data,disabled:!0,language:"jsx",theme:y},o.createElement(a.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[j],p:"4x"},o.createElement(a.Box,{fontSize:"sm",lineHeight:"sm"},o.createElement(o.Fragment,{key:b},o.createElement(n,null)))),o.createElement(a.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},o.createElement(x.Z,{"data-track":E?"CodeBlock|hide_source|".concat((0,d.Z)({path:f.pathname})):"CodeBlock|show_source|".concat((0,d.Z)({path:f.pathname})),onClick:R},o.createElement(a.Tooltip,{label:E?"Hide the source":"Show the source"},o.createElement(a.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),o.createElement(x.Z,{"data-track":"CodeBlock|copy_source|".concat((0,d.Z)({path:f.pathname})),onClick:w},o.createElement(a.Tooltip,{label:S?"Copied":"Copy the source"},o.createElement(a.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),o.createElement(x.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(f.pathname),onClick:A},o.createElement(a.Tooltip,{label:"Edit in CodeSandbox"},o.createElement(p,{size:{sm:"5x",md:"4x"}}))),o.createElement(x.Z,{"data-track":"CodeBlock|reset|".concat(f.pathname),onClick:V},o.createElement(a.Tooltip,{label:"Reset the demo"},o.createElement(a.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),o.createElement(a.Fade,{in:E},o.createElement(a.Collapse,{in:E,unmountOnExit:!0},o.createElement(c.uz,{style:g}))))};b.displayName="Demo";var C=b},11169:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEventCallback",function(){return t(63447)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=11169)}),_N_E=e.O()}]);