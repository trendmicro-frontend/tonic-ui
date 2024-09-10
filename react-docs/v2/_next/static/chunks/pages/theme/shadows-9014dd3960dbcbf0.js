(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4467],{29778:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return y}});var r=t(52322),o=t(45392),l=t(96835),a=t(40596),c=t(85017),i=t(73645),u=t(70758),s=t(2784);function d(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,l,a,c=[],i=!0,u=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=l.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return h(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return h(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var f=function(){var e=d((0,a.Z)(),1)[0],n=d((0,c.Z)({colorMode:e}),1)[0],t=n.background.secondary,r=n.color.secondary;return s.createElement(i.Z,{flexDirection:"row",columnGap:"6x"},["thin","medium","thick"].map(function(e){return s.createElement(i.Z,{key:e,width:256,height:128,backgroundColor:t,color:r,boxShadow:n.shadow[e],alignItems:"center",justifyContent:"center"},s.createElement(u.Z,{fontSize:"md",lineHeight:"md"},e.charAt(0).toUpperCase()+e.slice(1)))}))},m=t(13002);function p(e){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",blockquote:"blockquote",p:"p",code:"code",pre:"pre",h3:"h3"},(0,o.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:["\n","\n","\n",(0,r.jsx)(n.h1,{id:"shadows",children:"Shadows"}),"\n",(0,r.jsxs)(n.h2,{id:"design-tokens",children:["Design Tokens",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(m.Z,{theme:"shadows"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["Shadow colors are defined in the color style object, not in the theme. Use the ",(0,r.jsx)(n.code,{children:"useColorStyle"})," Hook to get the shadow color."]}),"\n"]}),"\n",(0,r.jsxs)(n.h2,{id:"color-style",children:["Color Style",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#color-style",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\n\nconsole.log(colorStyle.shadow.thin);\nconsole.log(colorStyle.shadow.medium);\nconsole.log(colorStyle.shadow.thick);\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"dark-mode",children:["Dark Mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#dark-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',\n}\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"light-mode",children:["Light Mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#light-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',\n}\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"examples",children:["Examples",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(l.Z,Object.assign({},{component:f,file:{data:'import { Flex, Text, useColorMode, useColorStyle } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const backgroundColor = colorStyle.background.secondary;\n  const color = colorStyle.color.secondary;\n  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);\n\n  return (\n    <Flex flexDirection="row" columnGap="6x">\n      {[\'thin\', \'medium\', \'thick\'].map(key => (\n        <Flex\n          key={key}\n          width={256}\n          height={128}\n          backgroundColor={backgroundColor}\n          color={color}\n          boxShadow={colorStyle.shadow[key]}\n          alignItems="center"\n          justifyContent="center"\n        >\n          <Text fontSize="md" lineHeight="md">\n            {capitalizeFirstLetter(key)}\n          </Text>\n        </Flex>\n      ))}\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/theme/shadows/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Text, useColorMode, useColorStyle } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const backgroundColor = colorStyle.background.secondary;\n  const color = colorStyle.color.secondary;\n  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);\n\n  return (\n    <Flex flexDirection="row" columnGap="6x">\n      {[\'thin\', \'medium\', \'thick\'].map(key => (\n        <Flex\n          key={key}\n          width={256}\n          height={128}\n          backgroundColor={backgroundColor}\n          color={color}\n          boxShadow={colorStyle.shadow[key]}\n          alignItems="center"\n          justifyContent="center"\n        >\n          <Text fontSize="md" lineHeight="md">\n            {capitalizeFirstLetter(key)}\n          </Text>\n        </Flex>\n      ))}\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}))]})}var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(p,e)})):p(e)}},26762:function(e,n,t){"use strict";var r=t(85017),o=t(49857),l=t(2784);function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function c(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}n.Z=function(e){var n,t=(function(e){if(Array.isArray(e))return e}(n=(0,r.Z)())||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,l,a,c=[],i=!0,u=!1;try{for(l=(t=t.call(e)).next;!(i=(r=l.call(t)).done)&&(c.push(r.value),1!==c.length);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(n,1)||function(e,n){if(e){if("string"==typeof e)return c(e,1);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,1)}}(n,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return l.createElement(o.Z,a({backgroundColor:t.background.secondary,border:1,borderColor:t.divider,fontFamily:"mono",py:"3x",px:"3x",whiteSpace:"pre"},e))}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return O}});var r=t(27216),o=t(40596),l=t(49857),a=t(73645),c=t(99870),i=t(62272),u=t(14594),s=t(65019),d=t(37384),h=t(99554),f=t(69111),m=t(5632),p=t(2784),y=t(65245);function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var b=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},g=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,p.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,l,a,c=[],i=!0,u=!1;try{for(l=(t=t.call(e)).next;!(i=(r=l.call(t)).done)&&(c.push(r.value),2!==c.length);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(n,2)||function(e,n){if(e){if("string"==typeof e)return x(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=t[0],o=t[1];return{value:e,onCopy:function(){b(e),o(!0),setTimeout(function(){return o(!1)},1500)},hasCopied:r}},v=t(63768),j=t(76761),k=t(73205),S=t(98107),C=t(44285),w=["component","defaultExpanded","expanded","file","sandbox"];function Z(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,l,a,c=[],i=!0,u=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=l.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return E(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return E(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var A=function(e){var n,t=e.component,x=e.defaultExpanded,b=e.expanded,E=e.file,A=e.sandbox;!function(e,n){if(null!=e){var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,w);var O=(0,m.useRouter)(),I=Z((0,p.useReducer)(function(e){return!e},!1),2),M=I[0],z=I[1],F=(0,r.u)(),T=Z((0,o.Z)(),1)[0],_={dark:j.y,light:j.q}[T],N=Z((0,s.Z)(null!=b?b:void 0!==x&&x),2),H=N[0],U=N[1],R=g(null==E?void 0:E.data),$=R.onCopy,D=R.hasCopied,q=(0,p.useCallback)(function(){$()},[$]),B=(0,p.useCallback)(function(){(0,k.b)(A)},[A]),L=(0,p.useCallback)(function(){z(),U(!1)},[z,U]);return((0,p.useEffect)(function(){void 0!==b&&b!==H&&U(b)},[b,H,U]),t)?p.createElement(y.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:_},p.createElement(l.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[T],p:"4x"},p.createElement(l.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:M},p.createElement(t,null)))),p.createElement(a.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(C.Z,{"data-track":H?"CodeBlock|hide_source|".concat((0,S.Z)({path:O.pathname})):"CodeBlock|show_source|".concat((0,S.Z)({path:O.pathname})),onClick:U},p.createElement(c.Z,{label:H?"Hide the source":"Show the source"},p.createElement(d.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|copy_source|".concat((0,S.Z)({path:O.pathname})),onClick:q},p.createElement(c.Z,{label:D?"Copied":"Copy the source"},p.createElement(h.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(O.pathname),onClick:B},p.createElement(c.Z,{label:"Edit in CodeSandbox"},p.createElement(v.Z,null))),p.createElement(C.Z,{"data-track":"CodeBlock|reset|".concat(O.pathname),onClick:L},p.createElement(c.Z,{label:"Reset the demo"},p.createElement(f.Z,null)))),p.createElement(i.Z,{in:H},p.createElement(u.Z,{in:H,unmountOnExit:!0},p.createElement(l.Z,{as:y.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==F?void 0:null===(n=F.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(y.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:_},p.createElement(l.Z,{as:y.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};A.displayName="Demo";var O=A},13002:function(e,n,t){"use strict";var r=t(27216),o=t(40596),l=t(85017),a=t(49857),c=t(2784),i=t(26762),u=t(37428);function s(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,l,a,c=[],i=!0,u=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=l.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return d(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}n.Z=function(e){var n,t=e.theme,d=(0,r.u)(),h=s((0,o.Z)(),1)[0],f=null!==(n=s((0,l.Z)({colorMode:h}),1)[0][t])&&void 0!==n?n:d[t];return f?(("space"===t||"sizes"===t)&&(f=Object.keys(f).filter(function(e){return!e.toString().match(/[qh]$/)}).reduce(function(e,n){return e[n]=f[n],e},{})),c.createElement(a.Z,{mb:"6x"},c.createElement(i.Z,null,"const ".concat(t," = ").concat((0,u.Z)(f,!1))))):"Theme field not found"}},37428:function(e,n){"use strict";n.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},32248:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/shadows",function(){return t(29778)}])},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}}),t(2784);var r=t(75928),o=t(52903),l=(0,r.Z)((0,o.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}}),t(2784);var r=t(75928),o=t(52903),l=(0,r.Z)((0,o.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=32248)}),_N_E=e.O()}]);