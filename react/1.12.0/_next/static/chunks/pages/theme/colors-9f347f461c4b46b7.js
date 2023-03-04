(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6601],{58980:function(e,t,n){"use strict";var r=n(98922),o=n(2784),l=n(3769),c=n(82767);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],c=!0,i=!1;try{for(o=o.call(e);!(c=(n=o.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==o.return||o.return()}finally{if(i)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}t.Z=function(e){var t,n=e.theme,a=(0,r.useTheme)(),s=i((0,r.useColorMode)(),1)[0],u=null!==(t=i((0,r.useColorStyle)({colorMode:s}),1)[0][n])&&void 0!==t?t:a[n];return u?(("space"===n||"sizes"===n)&&(u=Object.keys(u).filter(function(e){return!e.toString().match(/[qh]$/)}).reduce(function(e,t){return e[t]=u[t],e},{})),o.createElement(r.Box,{mb:"6x"},o.createElement(l.Z,null,o.createElement("div",{className:"js"},"const ".concat(n," = ").concat((0,c.Z)(u,!1)))))):"Theme field not found"}},82767:function(e,t){"use strict";t.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},5846:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(52322),o=n(45392),l=n(98922),c=n(5081),i=n(2784);function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var s=function(e){var t=e.hue,n=(0,l.useTheme)(),r=RegExp(t,"g"),o=Object.keys(n.colors).filter(function(e){return e.match(r)}).reduce(function(e,t){return e[t]=n.colors[t],e},{});return i.createElement(l.Flex,{alignItems:"center"},i.createElement(l.Stack,{direction:"column"},Object.keys(o).map(function(e){var t,n=function(e){if(Array.isArray(e))return e}(t=(0,c.Zs)(e).split(":"))||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],c=!0,i=!1;try{for(o=o.call(e);!(c=(n=o.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==o.return||o.return()}finally{if(i)throw r}}return l}}(t,2)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}}(t,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=n[0],s=n[1],u=o[e];return i.createElement(l.Flex,{key:e,justifyContent:"space-between",fontSize:"sm",width:"300px",height:"12x",py:"3x",px:"4x",lineHeight:"lg",fontFamily:"mono",backgroundColor:u,color:s<=50?"black":"white"},i.createElement(l.Box,null,"".concat(r.charAt(0).toUpperCase()).concat(r.slice(1))," ",s),i.createElement(l.Box,null,e))})))},u=n(58980);function h(e){var t=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",p:"p",code:"code",nav:"nav",ul:"ul",li:"li"},(0,o.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.div,{className:"main-content",id:"main-content",children:["\n",(0,r.jsx)(t.h1,{id:"colors",children:"Colors"}),"\n",(0,r.jsxs)(t.h2,{id:"design-tokens",children:["Design Tokens",(0,r.jsx)(t.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,r.jsx)(t.svg,{children:(0,r.jsx)(t.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(u.Z,{theme:"colors"}),"\n",(0,r.jsxs)(t.h2,{id:"color-palette",children:["Color Palette",(0,r.jsx)(t.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#color-palette",children:(0,r.jsx)(t.svg,{children:(0,r.jsx)(t.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(t.p,{children:["The color palette is defined for both dark mode and light mode where ",(0,r.jsx)(t.code,{children:"10"})," - ",(0,r.jsx)(t.code,{children:"50"})," means to pass AA contrast with black text and ",(0,r.jsx)(t.code,{children:"60"})," - ",(0,r.jsx)(t.code,{children:"100"})," means to pass AA contrast with white text."]}),"\n",(0,r.jsxs)(l.Grid,{gap:"6x",templateColumns:"repeat(auto-fit, 300px)",mb:"6x",children:[(0,r.jsx)(s,{hue:"red"}),(0,r.jsx)(s,{hue:"magenta"}),(0,r.jsx)(s,{hue:"purple"}),(0,r.jsx)(s,{hue:"blue"}),(0,r.jsx)(s,{hue:"green"}),(0,r.jsx)(s,{hue:"teal"}),(0,r.jsx)(s,{hue:"cyan"}),(0,r.jsx)(s,{hue:"gray"})]})]}),(0,r.jsxs)(t.nav,{className:"toc",id:"toc",children:[(0,r.jsx)(t.div,{className:"toc-heading",children:"Contents"}),(0,r.jsxs)(t.ul,{className:"toc-level toc-level-1",children:[(0,r.jsx)(t.li,{className:"toc-item toc-item-h2",children:(0,r.jsx)(t.a,{className:"toc-link toc-link-h2",href:"#design-tokens",children:"Design Tokens"})}),(0,r.jsx)(t.li,{className:"toc-item toc-item-h2",children:(0,r.jsx)(t.a,{className:"toc-link toc-link-h2",href:"#color-palette",children:"Color Palette"})})]})]})]})}var d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},(0,o.ah)(),e.components).wrapper;return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(h,e)})):h(e)}},42281:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/colors",function(){return n(5846)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=42281)}),_N_E=e.O()}]);