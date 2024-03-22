(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7634],{67140:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return index_page}});var t=r(52322),o=r(45392),a=r(83449),l=r(67569),i=r(2784);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r,t,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!n||a.length!==n);l=!0);}catch(e){i=!0,t=e}finally{try{l||null==o.return||o.return()}finally{if(i)throw t}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}var z_indices=function(){var e=_slicedToArray((0,l.useColorMode)(),1)[0],n=_slicedToArray((0,l.useColorStyle)({colorMode:e}),1)[0];return i.createElement(l.Box,{position:"relative",py:"3x",px:"4x",height:360},["dropdown","sticky","fixed","overlay","drawer","modal","popover","toast","tooltip"].map(function(e,r){return i.createElement(l.Box,{key:e,backgroundColor:n.background.secondary,boxShadow:n.shadow.thin,color:n.color.secondary,position:"absolute",top:12+36*r,left:12+16*r,zIndex:e,width:150,px:"4x",py:"3x",textAlign:"center",transition:"transform 0.2s ease-in-out",_hover:{color:n.color.primary,transform:"scale(1.1)"}},e,"=",1e3+100*r)}))},c=r(401);function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use"},(0,o.ah)(),e.components);return(0,t.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n","\n",(0,t.jsx)(n.h1,{id:"zindices",children:"zIndices"}),"\n",(0,t.jsxs)(n.h2,{id:"design-tokens",children:["Design Tokens",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(c.Z,{theme:"zIndices"}),"\n",(0,t.jsxs)(n.h2,{id:"examples",children:["Examples",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(a.Z,{component:z_indices,file:{data:"import { Box, useColorMode, useColorStyle } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box position=\"relative\" py=\"3x\" px=\"4x\" height={360}>\n      {['dropdown', 'sticky', 'fixed', 'overlay', 'drawer', 'modal', 'popover', 'toast', 'tooltip'].map((name, index) => {\n        const zIndexValue = 1000 + index * 100;\n\n        return (\n          <Box\n            key={name}\n            backgroundColor={colorStyle.background.secondary}\n            boxShadow={colorStyle.shadow.thin}\n            color={colorStyle.color.secondary}\n            position=\"absolute\"\n            top={12 + index * 36}\n            left={12 + index * 16}\n            zIndex={name}\n            width={150}\n            px=\"4x\"\n            py=\"3x\"\n            textAlign=\"center\"\n            transition=\"transform 0.2s ease-in-out\"\n            _hover={{\n              color: colorStyle.color.primary,\n              transform: 'scale(1.1)',\n            }}\n          >\n            {name}={zIndexValue}\n          </Box>\n        );\n      })}\n    </Box>\n  );\n};\n\nexport default App;",path:"pages/theme/z-indices/index.page.mdx"},sandbox:{files:{},raw:"import { Box, useColorMode, useColorStyle } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box position=\"relative\" py=\"3x\" px=\"4x\" height={360}>\n      {['dropdown', 'sticky', 'fixed', 'overlay', 'drawer', 'modal', 'popover', 'toast', 'tooltip'].map((name, index) => {\n        const zIndexValue = 1000 + index * 100;\n\n        return (\n          <Box\n            key={name}\n            backgroundColor={colorStyle.background.secondary}\n            boxShadow={colorStyle.shadow.thin}\n            color={colorStyle.color.secondary}\n            position=\"absolute\"\n            top={12 + index * 36}\n            left={12 + index * 16}\n            zIndex={name}\n            width={150}\n            px=\"4x\"\n            py=\"3x\"\n            textAlign=\"center\"\n            transition=\"transform 0.2s ease-in-out\"\n            _hover={{\n              color: colorStyle.color.primary,\n              transform: 'scale(1.1)',\n            }}\n          >\n            {name}={zIndexValue}\n          </Box>\n        );\n      })}\n    </Box>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})]})}var index_page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},83449:function(e,n,r){"use strict";r.d(n,{Z:function(){return x}});var t=r(67569),o=r(49427),a=r(5632),l=r(2784),i=r(65245),c=r(82821),s=r(90622),u=r(52057),d=r(63651),m=["size"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}var y=(0,l.forwardRef)(function(e,n){var r=e.size,o=function(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],!(n.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,m);return l.createElement(t.SVGIcon,_extends({size:r,viewBox:"0 0 1024 1024"},o),l.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});y.displayName="CodeSandboxIcon";var f=r(94981);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r,t,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!n||a.length!==n);l=!0);}catch(e){i=!0,t=e}finally{try{l||null==o.return||o.return()}finally{if(i)throw t}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}var p={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},Demo=function(e){var n=e.component,r=e.file,m=e.sandbox,x=(0,a.useRouter)(),h=_slicedToArray((0,l.useReducer)(function(e){return!e},!1),2),b=h[0],v=h[1],g=_slicedToArray((0,t.useColorMode)(),1)[0],k={dark:s.y,light:s.q}[g],_=_slicedToArray((0,o.useToggle)(!1),2),C=_[0],S=_[1],A=(0,c.Z)(null==r?void 0:r.data),E=A.onCopy,j=A.hasCopied,w=(0,l.useCallback)(function(){E()},[E]),T=(0,l.useCallback)(function(){(0,u.b)(m)},[m]),z=(0,l.useCallback)(function(){v(),S(!1)},[v,S]);return l.createElement(i.nu,{code:null==r?void 0:r.data,disabled:!0,language:"jsx",theme:k},l.createElement(t.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[g],p:"4x"},l.createElement(t.Box,{fontSize:"sm",lineHeight:"sm"},l.createElement(l.Fragment,{key:b},l.createElement(n,null)))),l.createElement(t.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},l.createElement(f.Z,{"data-track":C?"CodeBlock|hide_source|".concat((0,d.Z)({path:x.pathname})):"CodeBlock|show_source|".concat((0,d.Z)({path:x.pathname})),onClick:S},l.createElement(t.Tooltip,{label:C?"Hide the source":"Show the source"},l.createElement(t.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),l.createElement(f.Z,{"data-track":"CodeBlock|copy_source|".concat((0,d.Z)({path:x.pathname})),onClick:w},l.createElement(t.Tooltip,{label:j?"Copied":"Copy the source"},l.createElement(t.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),l.createElement(f.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(x.pathname),onClick:T},l.createElement(t.Tooltip,{label:"Edit in CodeSandbox"},l.createElement(y,{size:{sm:"5x",md:"4x"}}))),l.createElement(f.Z,{"data-track":"CodeBlock|reset|".concat(x.pathname),onClick:z},l.createElement(t.Tooltip,{label:"Reset the demo"},l.createElement(t.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),l.createElement(t.Fade,{in:C},l.createElement(t.Collapse,{in:C,unmountOnExit:!0},l.createElement(i.uz,{style:p}))))};Demo.displayName="Demo";var x=Demo},401:function(e,n,r){"use strict";var t=r(67569),o=r(2784),a=r(30169),l=r(53733);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r,t,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!n||a.length!==n);l=!0);}catch(e){i=!0,t=e}finally{try{l||null==o.return||o.return()}finally{if(i)throw t}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}n.Z=function(e){var n,r=e.theme,i=(0,t.useTheme)(),c=_slicedToArray((0,t.useColorMode)(),1)[0],s=null!==(n=_slicedToArray((0,t.useColorStyle)({colorMode:c}),1)[0][r])&&void 0!==n?n:i[r];return s?(("space"===r||"sizes"===r)&&(s=Object.keys(s).filter(function(e){return!e.toString().match(/[qh]$/)}).reduce(function(e,n){return e[n]=s[n],e},{})),o.createElement(t.Box,{mb:"6x"},o.createElement(a.Z,null,o.createElement("div",{className:"js"},"const ".concat(r," = ").concat((0,l.Z)(s,!1)))))):"Theme field not found"}},53733:function(e,n){"use strict";n.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},10125:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/z-indices",function(){return r(67140)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=10125)}),_N_E=e.O()}]);