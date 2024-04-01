(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8996],{19253:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return useToggle_page}});var r=t(52322),l=t(45392),a=t(83449),o=t(67569),i=t(49427),s=t(2784);function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var useToggle=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,i.useToggle)(!1))||function(e,n){var t,r,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a=[],o=!0,i=!1;try{for(l=l.call(e);!(o=(t=l.next()).done)&&(a.push(t.value),!n||a.length!==n);o=!0);}catch(e){i=!0,r=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw r}}return a}}(e,2)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _arrayLikeToArray(e,n)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],r=n[1];return s.createElement(o.Button,{onClick:r},t?"ON":"OFF")};function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,l.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n",(0,r.jsx)(n.h1,{id:"usetoggle",children:"useToggle"}),"\n",(0,r.jsx)(n.p,{children:"A custom Hook that toggles between boolean values. It also accepts a toggle function that can be used to change the value."}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { useToggle } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const [value, toggleValue] = useToggle(initialValue, [toggleReducer]);\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"initialValue"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The initial value of the toggle."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"toggleReducer?"}),(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"(state: boolean, nextValue: boolean) => boolean"})}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"An optional reducer function that can be used to determine the next value."})]})]})]}),"\n",(0,r.jsxs)(n.h3,{id:"returns",children:["Returns",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"Returns an array with the current value and a function to toggle the value."}),"\n",(0,r.jsx)(n.p,{children:"If a boolean value is explicitly passed to the toggle function, it will be used instead of negating the current value."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const defaultToggleReducer = (state, nextValue) => {\n  return (typeof nextValue === 'boolean') ? nextValue : !state;\n};\n"})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Toggle Function"}),(0,r.jsx)(n.th,{align:"left",children:"Previous Value"}),(0,r.jsx)(n.th,{align:"left",children:"Next Value"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{align:"left",children:["toggle()",(0,r.jsx)("br",{}),"toggle(event: MouseEvent)"]}),(0,r.jsx)(n.td,{align:"left",children:"true"}),(0,r.jsx)(n.td,{align:"left",children:"false"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{align:"left",children:["toggle()",(0,r.jsx)("br",{}),"toggle(event: MouseEvent)"]}),(0,r.jsx)(n.td,{align:"left",children:"false"}),(0,r.jsx)(n.td,{align:"left",children:"true"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"toggle(false)"}),(0,r.jsx)(n.td,{align:"left",children:"true | false"}),(0,r.jsx)(n.td,{align:"left",children:"false"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"toggle(true)"}),(0,r.jsx)(n.td,{align:"left",children:"true | false"}),(0,r.jsx)(n.td,{align:"left",children:"true"})]})]})]}),"\n",(0,r.jsxs)(n.h2,{id:"demos",children:["Demos",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(a.Z,{component:useToggle,file:{data:"import { Button } from '@tonic-ui/react';\nimport { useToggle } from '@tonic-ui/react-hooks';\nimport React from 'react';\n\nconst App = () => {\n  const [value, toggleValue] = useToggle(false);\n\n  return (\n    <Button onClick={toggleValue}>\n      {value ? 'ON' : 'OFF'}\n    </Button>\n  );\n};\n\nexport default App;",path:"pages/hooks/useToggle.page.mdx"},sandbox:{files:{},raw:"import { Button } from '@tonic-ui/react';\nimport { useToggle } from '@tonic-ui/react-hooks';\nimport React from 'react';\n\nconst App = () => {\n  const [value, toggleValue] = useToggle(false);\n\n  return (\n    <Button onClick={toggleValue}>\n      {value ? 'ON' : 'OFF'}\n    </Button>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})]})}var useToggle_page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},83449:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var r=t(67569),l=t(49427),a=t(5632),o=t(2784),i=t(65245),s=t(82821),c=t(90622),d=t(52057),u=t(63651),h=["size"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var g=(0,o.forwardRef)(function(e,n){var t=e.size,l=function(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}(e,h);return o.createElement(r.SVGIcon,_extends({size:t,viewBox:"0 0 1024 1024"},l),o.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});g.displayName="CodeSandboxIcon";var f=t(94981);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t,r,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a=[],o=!0,i=!1;try{for(l=l.call(e);!(o=(t=l.next()).done)&&(a.push(t.value),!n||a.length!==n);o=!0);}catch(e){i=!0,r=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw r}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var x={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},Demo=function(e){var n=e.component,t=e.file,h=e.sandbox,m=(0,a.useRouter)(),p=_slicedToArray((0,o.useReducer)(function(e){return!e},!1),2),j=p[0],y=p[1],b=_slicedToArray((0,r.useColorMode)(),1)[0],v={dark:c.y,light:c.q}[b],k=_slicedToArray((0,l.useToggle)(!1),2),T=k[0],E=k[1],_=(0,s.Z)(null==t?void 0:t.data),C=_.onCopy,A=_.hasCopied,O=(0,o.useCallback)(function(){C()},[C]),w=(0,o.useCallback)(function(){(0,d.b)(h)},[h]),I=(0,o.useCallback)(function(){y(),E(!1)},[y,E]);return o.createElement(i.nu,{code:null==t?void 0:t.data,disabled:!0,language:"jsx",theme:v},o.createElement(r.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[b],p:"4x"},o.createElement(r.Box,{fontSize:"sm",lineHeight:"sm"},o.createElement(o.Fragment,{key:j},o.createElement(n,null)))),o.createElement(r.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},o.createElement(f.Z,{"data-track":T?"CodeBlock|hide_source|".concat((0,u.Z)({path:m.pathname})):"CodeBlock|show_source|".concat((0,u.Z)({path:m.pathname})),onClick:E},o.createElement(r.Tooltip,{label:T?"Hide the source":"Show the source"},o.createElement(r.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),o.createElement(f.Z,{"data-track":"CodeBlock|copy_source|".concat((0,u.Z)({path:m.pathname})),onClick:O},o.createElement(r.Tooltip,{label:A?"Copied":"Copy the source"},o.createElement(r.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),o.createElement(f.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(m.pathname),onClick:w},o.createElement(r.Tooltip,{label:"Edit in CodeSandbox"},o.createElement(g,{size:{sm:"5x",md:"4x"}}))),o.createElement(f.Z,{"data-track":"CodeBlock|reset|".concat(m.pathname),onClick:I},o.createElement(r.Tooltip,{label:"Reset the demo"},o.createElement(r.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),o.createElement(r.Fade,{in:T},o.createElement(r.Collapse,{in:T,unmountOnExit:!0},o.createElement(i.uz,{style:x}))))};Demo.displayName="Demo";var m=Demo},53411:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useToggle",function(){return t(19253)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=53411)}),_N_E=e.O()}]);