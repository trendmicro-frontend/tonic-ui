(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8560],{41790:function(n,i,r){"use strict";var l=r(98922),t=r(2784),e=r(9941),x=r(82650);function d(n,i){return function(n){if(Array.isArray(n))return n}(n)||function(n,i){var r,l,t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var e=[],x=!0,d=!1;try{for(t=t.call(n);!(x=(r=t.next()).done)&&(e.push(r.value),!i||e.length!==i);x=!0);}catch(n){d=!0,l=n}finally{try{x||null==t.return||t.return()}finally{if(d)throw l}}return e}}(n,i)||function(n,i){if(n){if("string"==typeof n)return h(n,i);var r=Object.prototype.toString.call(n).slice(8,-1);if("Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r)return Array.from(n);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(n,i)}}(n,i)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(n,i){(null==i||i>n.length)&&(i=n.length);for(var r=0,l=Array(i);r<i;r++)l[r]=n[r];return l}i.Z=function(n){var i,r=n.theme,h=(0,l.useTheme)(),s=d((0,l.useColorMode)(),1)[0],c=null!==(i=d((0,l.useColorStyle)({colorMode:s}),1)[0][r])&&void 0!==i?i:h[r];return c?(("space"===r||"sizes"===r)&&(c=Object.keys(c).filter(function(n){return!n.toString().match(/[qh]$/)}).reduce(function(n,i){return n[i]=c[i],n},{})),t.createElement(l.Box,{mb:"6x"},t.createElement(e.Z,null,t.createElement("div",{className:"js"},"const ".concat(r," = ").concat((0,x.Z)(c,!1)))))):"Theme field not found"}},82650:function(n,i){"use strict";i.Z=function(n){return JSON.stringify(n,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},78229:function(n,i,r){"use strict";r.r(i);var l=r(52322),t=r(45392),e=r(98922),x=r(41790);function d(n){var i=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",p:"p",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre"},(0,t.ah)(),n.components);return(0,l.jsxs)(i.div,{className:"main-content",id:"main-content",children:["\n",(0,l.jsx)(i.h1,{id:"space",children:"Space"}),"\n",(0,l.jsxs)(i.h2,{id:"design-tokens",children:["Design Tokens",(0,l.jsx)(i.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,l.jsx)(i.svg,{children:(0,l.jsx)(i.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(x.Z,{theme:"space"}),"\n",(0,l.jsxs)(i.p,{children:["By default, the values are proportional. Therefore, a ",(0,l.jsx)(i.code,{children:"1x"})," spacing unit is equal to ",(0,l.jsx)(i.code,{children:"0.25rem"}),", which translates to ",(0,l.jsx)(i.code,{children:"4px"})," by default in common browsers."]}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{align:"right",children:"Name"}),(0,l.jsx)(i.th,{align:"right",children:"Relative Length Unit (rem)"}),(0,l.jsx)(i.th,{align:"right",children:"Absolute Length Unit (px)"}),(0,l.jsx)(i.th,{align:"left",children:"Example"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"0"}),(0,l.jsx)(i.td,{align:"right",children:"0"}),(0,l.jsx)(i.td,{align:"right",children:"0px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:0})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"1x"}),(0,l.jsx)(i.td,{align:"right",children:".25rem"}),(0,l.jsx)(i.td,{align:"right",children:"4px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"1x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"2x"}),(0,l.jsx)(i.td,{align:"right",children:".5rem"}),(0,l.jsx)(i.td,{align:"right",children:"8px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"2x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"3x"}),(0,l.jsx)(i.td,{align:"right",children:".75rem"}),(0,l.jsx)(i.td,{align:"right",children:"12px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"3x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"4x"}),(0,l.jsx)(i.td,{align:"right",children:"1rem"}),(0,l.jsx)(i.td,{align:"right",children:"16px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"4x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"5x"}),(0,l.jsx)(i.td,{align:"right",children:"1.25rem"}),(0,l.jsx)(i.td,{align:"right",children:"20px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"5x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"6x"}),(0,l.jsx)(i.td,{align:"right",children:"1.5rem"}),(0,l.jsx)(i.td,{align:"right",children:"24px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"6x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"7x"}),(0,l.jsx)(i.td,{align:"right",children:"1.75rem"}),(0,l.jsx)(i.td,{align:"right",children:"28px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"7x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"8x"}),(0,l.jsx)(i.td,{align:"right",children:"2rem"}),(0,l.jsx)(i.td,{align:"right",children:"32px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"8x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"9x"}),(0,l.jsx)(i.td,{align:"right",children:"2.25rem"}),(0,l.jsx)(i.td,{align:"right",children:"36px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"9x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"10x"}),(0,l.jsx)(i.td,{align:"right",children:"2.5rem"}),(0,l.jsx)(i.td,{align:"right",children:"40px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"10x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"11x"}),(0,l.jsx)(i.td,{align:"right",children:"2.75rem"}),(0,l.jsx)(i.td,{align:"right",children:"44px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"11x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"12x"}),(0,l.jsx)(i.td,{align:"right",children:"3rem"}),(0,l.jsx)(i.td,{align:"right",children:"48px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"12x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"13x"}),(0,l.jsx)(i.td,{align:"right",children:"3.25rem"}),(0,l.jsx)(i.td,{align:"right",children:"52px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"13x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"14x"}),(0,l.jsx)(i.td,{align:"right",children:"3.5rem"}),(0,l.jsx)(i.td,{align:"right",children:"56px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"14x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"15x"}),(0,l.jsx)(i.td,{align:"right",children:"3.75rem"}),(0,l.jsx)(i.td,{align:"right",children:"60px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"15x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"16x"}),(0,l.jsx)(i.td,{align:"right",children:"4rem"}),(0,l.jsx)(i.td,{align:"right",children:"64px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"16x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"17x"}),(0,l.jsx)(i.td,{align:"right",children:"4.25rem"}),(0,l.jsx)(i.td,{align:"right",children:"68px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"17x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"18x"}),(0,l.jsx)(i.td,{align:"right",children:"4.5rem"}),(0,l.jsx)(i.td,{align:"right",children:"72px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"18x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"19x"}),(0,l.jsx)(i.td,{align:"right",children:"4.75rem"}),(0,l.jsx)(i.td,{align:"right",children:"76px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"19x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"20x"}),(0,l.jsx)(i.td,{align:"right",children:"5rem"}),(0,l.jsx)(i.td,{align:"right",children:"80px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"20x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"24x"}),(0,l.jsx)(i.td,{align:"right",children:"6rem"}),(0,l.jsx)(i.td,{align:"right",children:"96px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"24x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"32x"}),(0,l.jsx)(i.td,{align:"right",children:"8rem"}),(0,l.jsx)(i.td,{align:"right",children:"128px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"32x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"40x"}),(0,l.jsx)(i.td,{align:"right",children:"10rem"}),(0,l.jsx)(i.td,{align:"right",children:"160px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"40x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"48x"}),(0,l.jsx)(i.td,{align:"right",children:"12rem"}),(0,l.jsx)(i.td,{align:"right",children:"192px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"48x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"56x"}),(0,l.jsx)(i.td,{align:"right",children:"14rem"}),(0,l.jsx)(i.td,{align:"right",children:"224px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"56x"})})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{align:"right",children:"64x"}),(0,l.jsx)(i.td,{align:"right",children:"16rem"}),(0,l.jsx)(i.td,{align:"right",children:"256px"}),(0,l.jsx)(i.td,{align:"left",children:(0,l.jsx)(e.Box,{bg:"teal:50",h:"4x",w:"64x"})})]})]})]}),"\n",(0,l.jsxs)(i.h2,{id:"examples",children:["Examples",(0,l.jsx)(i.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,l.jsx)(i.svg,{children:(0,l.jsx)(i.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const backgroundColor = colorStyle.background.secondary;\n\n  return (\n    <Flex flexDirection="column" rowGap="4x">\n      <Flex columnGap="1x">\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n      </Flex>\n      <Flex columnGap="2x">\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n      </Flex>\n      <Flex columnGap="4x">\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />\n      </Flex>\n    </Flex>\n  );\n}\n'})})]})}i.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=Object.assign({},(0,t.ah)(),n.components).wrapper;return i?(0,l.jsx)(i,Object.assign({},n,{children:(0,l.jsx)(d,n)})):d(n)}},50139:function(n,i,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/space",function(){return r(78229)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=50139)}),_N_E=n.O()}]);