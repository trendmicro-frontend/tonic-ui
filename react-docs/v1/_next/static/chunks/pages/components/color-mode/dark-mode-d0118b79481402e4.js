(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4555],{64874:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return m}});var t=r(52322),o=r(45392),l=r(16959),a=r(67569),c=r(2784);function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,o,l,a,c=[],i=!0,s=!1;try{if(l=(r=r.call(e)).next,0===n){if(Object(r)!==r)return;i=!1}else for(;!(i=(t=l.call(r)).done)&&(c.push(t.value),c.length!==n);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return s(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}var d=function(){var e=i((0,a.useColorMode)(),1)[0],n=i((0,a.useColorStyle)({colorMode:e}),1)[0];return c.createElement(a.Box,{backgroundColor:n.background.secondary,color:n.color.primary},c.createElement(a.Text,{px:"4x",py:"3x"},"The color mode is set to ",e))},u=function(){return c.createElement(a.DarkMode,null,c.createElement(d,null))};function h(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,t.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n",(0,t.jsx)(n.h1,{id:"darkmode",children:"DarkMode"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"DarkMode"})," component enables you to render its children in dark mode. It will override current color mode and set the color scheme to ",(0,t.jsx)(n.code,{children:"dark"}),"."]}),"\n",(0,t.jsxs)(n.h2,{id:"import",children:["Import",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { DarkMode } from '@tonic-ui/react';\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"usage",children:["Usage",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(l.Z,{component:u,file:{data:"import {\n  Box,\n  DarkMode,\n  Text,\n  useColorMode,\n  useColorStyle,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst Component = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.primary}\n    >\n      <Text px=\"4x\" py=\"3x\">\n        The color mode is set to {colorMode}\n      </Text>\n    </Box>\n  );\n};\n\nconst App = () => (\n  <DarkMode>\n    <Component />\n  </DarkMode>\n);\n\nexport default App;",path:"pages/components/color-mode/dark-mode.page.mdx"},sandbox:{files:{},raw:"import {\n  Box,\n  DarkMode,\n  Text,\n  useColorMode,\n  useColorStyle,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst Component = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.primary}\n    >\n      <Text px=\"4x\" py=\"3x\">\n        The color mode is set to {colorMode}\n      </Text>\n    </Box>\n  );\n};\n\nconst App = () => (\n  <DarkMode>\n    <Component />\n  </DarkMode>\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,t.jsxs)(n.h2,{id:"props",children:["Props",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.h3,{id:"darkmode-1",children:["DarkMode",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#darkmode-1",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})})]})]})}var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(h,e)})):h(e)}},16959:function(e,n,r){"use strict";r.d(n,{Z:function(){return g}});var t=r(67569),o=r(49427),l=r(5632),a=r(2784),c=r(65245),i=r(16245),s=r(76761),d=r(73205),u=r(98107),h=["size"];function m(){return(m=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}var f=(0,a.forwardRef)(function(e,n){var r=e.size,o=function(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},l=Object.keys(e);for(t=0;t<l.length;t++)r=l[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)r=l[t],!(n.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,h);return a.createElement(t.SVGIcon,m({size:r,viewBox:"0 0 1024 1024"},o),a.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});f.displayName="CodeSandboxIcon";var p=r(44285);function x(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,o,l,a,c=[],i=!0,s=!1;try{if(l=(r=r.call(e)).next,0===n){if(Object(r)!==r)return;i=!1}else for(;!(i=(t=l.call(r)).done)&&(c.push(t.value),c.length!==n);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return y(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}var b={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},j=function(e){var n=e.component,r=e.file,h=e.sandbox,m=(0,l.useRouter)(),y=x((0,a.useReducer)(function(e){return!e},!1),2),j=y[0],g=y[1],k=x((0,t.useColorMode)(),1)[0],v={dark:s.y,light:s.q}[k],C=x((0,o.useToggle)(!1),2),E=C[0],M=C[1],S=(0,i.Z)(null==r?void 0:r.data),O=S.onCopy,T=S.hasCopied,w=(0,a.useCallback)(function(){O()},[O]),I=(0,a.useCallback)(function(){(0,d.b)(h)},[h]),_=(0,a.useCallback)(function(){g(),M(!1)},[g,M]);return a.createElement(c.nu,{code:null==r?void 0:r.data,disabled:!0,language:"jsx",theme:v},a.createElement(t.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[k],p:"4x"},a.createElement(t.Box,{fontSize:"sm",lineHeight:"sm"},a.createElement(a.Fragment,{key:j},a.createElement(n,null)))),a.createElement(t.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},a.createElement(p.Z,{"data-track":E?"CodeBlock|hide_source|".concat((0,u.Z)({path:m.pathname})):"CodeBlock|show_source|".concat((0,u.Z)({path:m.pathname})),onClick:M},a.createElement(t.Tooltip,{label:E?"Hide the source":"Show the source"},a.createElement(t.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),a.createElement(p.Z,{"data-track":"CodeBlock|copy_source|".concat((0,u.Z)({path:m.pathname})),onClick:w},a.createElement(t.Tooltip,{label:T?"Copied":"Copy the source"},a.createElement(t.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),a.createElement(p.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(m.pathname),onClick:I},a.createElement(t.Tooltip,{label:"Edit in CodeSandbox"},a.createElement(f,{size:{sm:"5x",md:"4x"}}))),a.createElement(p.Z,{"data-track":"CodeBlock|reset|".concat(m.pathname),onClick:_},a.createElement(t.Tooltip,{label:"Reset the demo"},a.createElement(t.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),a.createElement(t.Fade,{in:E},a.createElement(t.Collapse,{in:E,unmountOnExit:!0},a.createElement(c.uz,{style:b}))))};j.displayName="Demo";var g=j},3993:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-mode/dark-mode",function(){return r(64874)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=3993)}),_N_E=e.O()}]);