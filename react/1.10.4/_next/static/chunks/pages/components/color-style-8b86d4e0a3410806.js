(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5545],{70018:function(e,r){"use strict";r.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},25530:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return A}});var o=n(52322),l=n(45392),t=n(98922),i=n(2773),c=n(5081),s=n(72579),a=n.n(s),d=n(93352),h=n.n(d),x=n(2784),u=["colorLabel","colorType","colorKey","colorTokens","colorValues"];function y(){return(y=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function j(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n,o,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var t=[],i=!0,c=!1;try{for(l=l.call(e);!(i=(n=l.next()).done)&&(t.push(n.value),!r||t.length!==r);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==l.return||l.return()}finally{if(c)throw o}}return t}}(e,r)||function(e,r){if(e){if("string"==typeof e)return p(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,r)}}(e,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,o=Array(r);n<r;n++)o[n]=e[n];return o}var g=function(e){var r,n,o=e.colorLabel,l=e.colorType,i=(e.colorKey,e.colorTokens),c=e.colorValues,s=function(e,r){if(null==e)return{};var n,o,l=function(e,r){if(null==e)return{};var n,o,l={},t=Object.keys(e);for(o=0;o<t.length;o++)n=t[o],r.indexOf(n)>=0||(l[n]=e[n]);return l}(e,r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(o=0;o<t.length;o++)n=t[o],!(r.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}(e,u),a=j((0,t.useColorMode)(),1)[0],d=j((0,t.useColorStyle)({colorMode:a}),1)[0],h=null==d?void 0:null===(r=d.color)||void 0===r?void 0:r.primary,p=null==d?void 0:null===(n=d.color)||void 0===n?void 0:n.secondary,g=function(){var e={};if("gradient"===l){var r=j(c,2),n=r[0],o=r[1];return e.background="linear-gradient(45deg, ".concat(n,", ").concat(o,")"),e}return"shadow"===l?(e.backgroundColor=({dark:"gray:90",light:"white"})[a],e.boxShadow=c[0],e):(e.backgroundColor=c[0],({dark:"gray:100",light:"white:emphasis"})[a]===i[0]&&(e.border=1,e.borderColor=({dark:"gray:70",light:"gray:20"})[a]),e)}();return x.createElement(t.Box,s,x.createElement(t.Box,y({maxWidth:120,height:120,px:"3x",mb:"4x"},g)),x.createElement(t.Box,{mb:"3x"},o&&x.createElement(t.Text,{color:h,fontSize:"md",lineHeight:"md",fontWeight:"semibold"},o)),i.length>0&&x.createElement(x.Fragment,null,x.createElement(t.Stack,{direction:"row",spacing:"2x"},i.map(function(e){return e?x.createElement(t.Tag,{key:e,variant:"solid",fontFamily:"mono",fontSize:"sm",lineHeight:"sm",mb:"1x"},e):null})),x.createElement(t.Stack,{direction:"row",spacing:"2x",mb:"1x"},c.map(function(e){return x.createElement(t.Text,{key:e,color:p,fontFamily:"mono",fontSize:"sm",lineHeight:"sm"},e)}))))},m=["colorStyle","colorType"];function f(){return(f=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function b(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n,o,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var t=[],i=!0,c=!1;try{for(l=l.call(e);!(i=(n=l.next()).done)&&(t.push(n.value),!r||t.length!==r);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==l.return||l.return()}finally{if(c)throw o}}return t}}(e,r)||function(e,r){if(e){if("string"==typeof e)return v(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,r)}}(e,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,o=Array(r);n<r;n++)o[n]=e[n];return o}var S=function(e){var r,n=e.colorStyle,o=void 0===n?{}:n,l=e.colorType,i=function(e,r){if(null==e)return{};var n,o,l=function(e,r){if(null==e)return{};var n,o,l={},t=Object.keys(e);for(o=0;o<t.length;o++)n=t[o],r.indexOf(n)>=0||(l[n]=e[n]);return l}(e,r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(o=0;o<t.length;o++)n=t[o],!(r.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}(e,m),s=(0,t.useTheme)(),d=b((0,t.useColorMode)(),1)[0],u=b((0,t.useColorStyle)({colorMode:d}),1)[0],y=null!==(r=a()(o,l))&&void 0!==r?r:a()(u,l),j=Object.keys(y).map(function(e){var r,n,t=Array.isArray(y)?"":(r=e,(r=(0,c.Zs)(r)).charAt(0).toUpperCase()+r.slice(1)),i=null!==(n=a()(o,"".concat(l,".").concat(e)))&&void 0!==n?n:a()(u,"".concat(l,".").concat(e)),d=(0,c.rY)(i).map(function(e){return h()(s,["colors",e])?e:null}),x=(0,c.rY)(i).map(function(e){var r;return null!==(r=a()(s,["colors",e]))&&void 0!==r?r:e});return Array.isArray(y)&&(e="#"+(Number(e)+1)),{colorLabel:t,colorType:l,colorKey:e,colorTokens:d,colorValues:x}});return x.createElement(t.Grid,f({rowGap:"8x",columnGap:"12x",templateColumns:"repeat(auto-fill, minmax(".concat(120,"px, 1fr))")},i),j.map(function(e){var r=e.colorLabel,n=e.colorType,o=e.colorKey,l=e.colorTokens,t=e.colorValues;return x.createElement(g,{key:o,colorLabel:r,colorType:n,colorKey:o,colorTokens:l,colorValues:t})}))};function w(){return(w=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function T(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,o=Array(r);n<r;n++)o[n]=e[n];return o}var k=function(e){var r,n=(function(e){if(Array.isArray(e))return e}(r=(0,t.useColorMode)())||function(e,r){var n,o,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var t=[],i=!0,c=!1;try{for(l=l.call(e);!(i=(n=l.next()).done)&&(t.push(n.value),!r||t.length!==r);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==l.return||l.return()}finally{if(c)throw o}}return t}}(r,1)||function(e,r){if(e){if("string"==typeof e)return T(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(e,r)}}(r,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return x.createElement(t.Box,w({px:"10x",py:"8x"},{dark:{backgroundColor:"gray:100",border:1,borderColor:"gray:70"},light:{backgroundColor:"white:emphasis",border:1,borderColor:"gray:20"}}[n],e))};function O(){return(O=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function C(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n,o,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var t=[],i=!0,c=!1;try{for(l=l.call(e);!(i=(n=l.next()).done)&&(t.push(n.value),!r||t.length!==r);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==l.return||l.return()}finally{if(c)throw o}}return t}}(e,r)||function(e,r){if(e){if("string"==typeof e)return I(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return I(e,r)}}(e,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,o=Array(r);n<r;n++)o[n]=e[n];return o}var M=function(e){var r,n=C((0,t.useColorMode)(),1)[0],o=C((0,t.useColorStyle)({colorMode:n}),1)[0],l=null==o?void 0:null===(r=o.color)||void 0===r?void 0:r.primary;return x.createElement(t.Box,O({mb:"5x",color:l},e))},z=n(70018);function D(e){var r=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",pre:"pre",h3:"h3",ul:"ul",li:"li",a:"a"},(0,l.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{children:"Color Style"}),"\n",(0,o.jsx)(r.p,{children:"Tonic UI comes with a color style system that defines functional color values."}),"\n",(0,o.jsx)(r.h2,{children:"Setup"}),"\n",(0,o.jsxs)(r.p,{children:["By using ",(0,o.jsx)(r.code,{children:"TonicProvider"})," at root of your application, it will add ",(0,o.jsx)(r.code,{children:"ColorStyleProvider"})," internally to provide the color style context to all components. The default color style will be added automatically."]}),"\n",(0,o.jsx)(r.pre,{disabled:!0,children:(0,o.jsx)(r.code,{className:"language-jsx",children:"import React from 'react';\nimport { Box, TonicProvider } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      /**\n       * The `colorStyle` config\n       * @param {object} defaultValue\n       * @param {object} value\n       * @param {function} onChange\n       */\n      colorStyle={{\n        // You can omit color style settings if using the default values\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n"})}),"\n",(0,o.jsx)(r.p,{children:"The above setup is equivalent to:"}),"\n",(0,o.jsx)(r.pre,{disabled:!0,children:(0,o.jsx)(r.code,{className:"language-jsx",children:"<ColorStyleProvider>\n  <Box {...props} />\n</ColorStyleProvider>\n"})}),"\n",(0,o.jsxs)(r.h3,{children:["The ",(0,o.jsx)(r.code,{children:"colorStyle"})," config"]}),"\n",(0,o.jsxs)(r.p,{children:["The ",(0,o.jsx)(r.code,{children:"colorStyle"})," config has the following options:"]}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.code,{children:"defaultValue"}),": The default value for the color style."]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.code,{children:"value"}),": The current value for the color style."]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.code,{children:"onChange(colorStyle)"}),": A function that is called when the color style is changed."]}),"\n"]}),"\n",(0,o.jsx)(r.h2,{children:"Default Color Style"}),"\n",(0,o.jsx)(r.h3,{children:"Import"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-js",children:"import { colorStyle } from '@tonic-ui/react';\n"})}),"\n",(0,o.jsx)(r.h3,{children:"Color style settings"}),"\n",(0,o.jsx)(t.Box,{mb:"6x",children:(0,o.jsx)(i.Z,{children:(0,z.Z)(t.colorStyle)})}),"\n",(0,o.jsx)(r.h2,{children:"Override Default Color Style"}),"\n",(0,o.jsxs)(r.p,{children:["To override default color style, you can create a color style object in accordance to the color mode, and pass the object to ",(0,o.jsx)(r.code,{children:"TonicProvider"})," with either the ",(0,o.jsx)(r.code,{children:"value"})," or the ",(0,o.jsx)(r.code,{children:"defaultValue"})," property."]}),"\n",(0,o.jsx)(r.pre,{disabled:!0,children:(0,o.jsx)(r.code,{className:"language-jsx",children:"import React from 'react';\nimport { Box, TonicProvider, colorStyle } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      colorStyle={{\n        value: customColorStyle,\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n\nconst customColorStyle = {\n  ...colorStyle,\n   dark: {\n    ...colorStyle.dark,\n    color: {\n      emphasis: 'white:emphasis',\n      primary: 'white:primary',\n      secondary: 'white:secondary',\n      tertiary: 'white:tertiary',\n      disabled: 'white:disabled',\n      success: 'green:40',\n      info: 'blue:40',\n      warning: 'orange:50',\n      error: 'red:50',\n    },\n  },\n  light: {\n    ...colorStyle.light,\n    color: {\n      emphasis: 'black:emphasis',\n      primary: 'black:primary',\n      secondary: 'black:secondary',\n      tertiary: 'black:tertiary',\n      disabled: 'black:disabled',\n      success: 'green:50',\n      info: 'blue:60',\n      warning: 'orange:50',\n      error: 'red:60',\n    },\n  },\n};\n"})}),"\n",(0,o.jsx)(r.h2,{children:"Managing Color Style"}),"\n",(0,o.jsxs)(r.p,{children:["To manage color style in your application, you can use the ",(0,o.jsx)(r.a,{href:"color-style/useColorStyle",children:"useColorStyle"})," hook."]}),"\n",(0,o.jsx)(r.h2,{children:"Color Values"}),"\n",(0,o.jsx)(r.h3,{children:"Background"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"background"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"background"})]})})]}),"\n",(0,o.jsx)(r.h3,{children:"Color"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"color"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"color"})]})})]}),"\n",(0,o.jsx)(r.h3,{children:"Text"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"text"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"text"})]})})]}),"\n",(0,o.jsx)(r.h3,{children:"Shadow"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"shadow",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"shadow",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))"})]})})]}),"\n",(0,o.jsx)(r.h3,{children:"Severity"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"severity"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"severity"})]})})]}),"\n",(0,o.jsx)(r.h3,{children:"Chart"}),"\n",(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.DarkMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"moon",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Dark Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"chart.classic.colors"})]})}),(0,o.jsx)(t.LightMode,{children:(0,o.jsxs)(k,{children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(t.Flex,{alignItems:"center",children:[(0,o.jsx)(t.Icon,{icon:"sun",size:"6x",color:"yellow:50"}),(0,o.jsx)(t.Space,{width:"2x"}),(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Light Mode"})})]}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorType:"chart.classic.colors"})]})})]}),"\n",(0,o.jsx)(r.h2,{children:"Gradient Color Values"}),"\n",(0,o.jsxs)(r.p,{children:["Gradient color values are not defined in the color style system, you can set ",(0,o.jsx)(r.code,{children:"gradient"})," with below values when necessary."]}),"\n",(0,o.jsx)(i.Z,{children:(0,z.Z)({gradient:{severity:{high:["purple:60","red:50"],medium:["red:50","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:40"]},others:{1:["purple:50","magenta:40"],2:["purple:60","blue:50"],3:["blue:50","teal:40"],4:["cyan:40","teal:30"],5:["blue:60","teal:40"],6:["green:40","cyan:30"],7:["magenta:60","red:40"],8:["magenta:50","blue:60"]}}})}),"\n",(0,o.jsxs)(k,{display:"flex",flexDirection:"column",rowGap:"8x",children:[(0,o.jsxs)(t.Box,{children:[(0,o.jsxs)(M,{children:[(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Gradient - Severity"})}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorStyle:{gradient:{high:["purple:60","red:50"],medium:["red:50","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:40"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))"})]}),(0,o.jsxs)(t.Box,{children:[(0,o.jsxs)(M,{children:[(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Gradient - Others"})}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorStyle:{gradient:{1:["purple:50","magenta:40"],2:["purple:60","blue:50"],3:["blue:50","teal:40"],4:["cyan:40","teal:30"],5:["blue:60","teal:40"],6:["green:40","cyan:30"],7:["magenta:60","red:40"],8:["magenta:50","blue:60"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))"})]})]}),"\n",(0,o.jsx)(r.h2,{children:"Blindness Color Values"}),"\n",(0,o.jsxs)(r.p,{children:["Blindness color values are not defined in the color style system, you can set ",(0,o.jsx)(r.code,{children:"blindness"})," with below values when necessary."]}),"\n",(0,o.jsx)(i.Z,{children:(0,z.Z)({blindness:{severity:{high:"magenta:60",medium:"orange:50",low:"yellow:50",safe:"green:30",info:"gray:50",unknown:"gray:50"},chart:{classic:{colors:["gray:50","blue:30","green:30","orange:50","cyan:30","magenta:60","purple:50","teal:40","purple:30","cyan:70","yellow:50"]}},gradient:{severity:{high:["purple:60","magenta:60"],medium:["magenta:60","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:30"]}}}})}),"\n",(0,o.jsxs)(k,{display:"flex",flexDirection:"column",rowGap:"8x",children:[(0,o.jsxs)(t.Box,{children:[(0,o.jsxs)(M,{children:[(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Blindness - Severity"})}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorStyle:{severity:{high:"magenta:60",medium:"orange:50",low:"yellow:50",safe:"green:30",info:"gray:50",unknown:"gray:50"}},colorType:"severity"})]}),(0,o.jsxs)(t.Box,{children:[(0,o.jsxs)(M,{children:[(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Blindness - Chart"})}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorStyle:{chart:{classic:{colors:["gray:50","blue:30","green:30","orange:50","cyan:30","magenta:60","purple:50","teal:40","purple:30","cyan:70","yellow:50"]}}},colorType:"chart.classic.colors"})]}),(0,o.jsxs)(t.Box,{children:[(0,o.jsxs)(M,{children:[(0,o.jsx)(t.Text,{fontSize:"lg",lineHeight:"lg",children:(0,o.jsx)(r.p,{children:"Blindness - Gradient"})}),(0,o.jsx)(t.Divider,{my:"2x"})]}),(0,o.jsx)(S,{colorStyle:{gradient:{high:["purple:60","magenta:60"],medium:["magenta:60","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:30"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))"})]})]})]})}var A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=Object.assign({},(0,l.ah)(),e.components).wrapper;return r?(0,o.jsx)(r,Object.assign({},e,{children:(0,o.jsx)(D,e)})):D(e)}},17880:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-style",function(){return n(25530)}])}},function(e){e.O(0,[6123,9774,2888,179],function(){return e(e.s=17880)}),_N_E=e.O()}]);