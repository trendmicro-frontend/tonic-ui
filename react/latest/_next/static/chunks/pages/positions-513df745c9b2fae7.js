(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{58980:function(e,t,n){"use strict";var o=n(12215),r=n(58693),i=(n(2784),n(92582)),s=n(70345),a=n(81436);t.Z=function(e){var t,n=e.theme,l=(0,r.useTheme)(),p=(0,r.useColorMode)(),u=(0,o.Z)(p,1)[0],c=(0,r.useColorStyle)({colorMode:u}),f=null!==(t=(0,o.Z)(c,1)[0][n])&&void 0!==t?t:l[n];if(!f)return"Theme field not found";"space"!==n&&"sizes"!==n||(f=Object.keys(f).filter((function(e){return!e.toString().match(/[qh]$/)})).reduce((function(e,t){return e[t]=f[t],e}),{}));return(0,a.jsx)(r.Box,{mb:"6x"},(0,a.jsx)(i.Z,null,"export const ".concat(n," = ").concat((0,s.Z)(f,!1))))}},70345:function(e,t){"use strict";t.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},14700:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var o=n(7896),r=n(59740),i=(n(2784),n(30876)),s=(n(58693),n(58980)),a=["components"],l={};function p(e){var t=e.components,n=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"Positions"),(0,i.kt)("p",null,"Use these style properties such as ",(0,i.kt)("inlineCode",{parentName:"p"},"zIndex"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"position"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"top"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"right"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"bottom")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"left")," to configure the position of an element."),(0,i.kt)("h2",null,"Z-Index"),(0,i.kt)("p",null,"We provide some zIndex values out of the box to control the stacking order of components."),(0,i.kt)(s.Z,{theme:"zIndices",mdxType:"ThemeParser"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Box position="relative" height="32x">\n  <Box position="absolute" zIndex="popover" top="6x" left="50%" transform="translateX(-50%)" p="4x" bg="gray:80">z-index=popover</Box>\n  <Box position="absolute" zIndex="toast" top="15x" left="50%" transform="translateX(-50%)" p="4x" bg="gray:70">z-index=toast</Box>\n</Box>\n')),(0,i.kt)("h2",null,"Configuration Reference"),(0,i.kt)("p",null,"Except for breakpoints, colors, and spacing, all keys in the theme object map to one of the core themes. All keys can be replaced or extended."),(0,i.kt)("p",null,"For more information, see the complete properties ",(0,i.kt)("a",{href:"https://styled-system.com/table",target:"_blank"},"reference table"),"."))}p.isMDXComponent=!0},85755:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/positions",function(){return n(14700)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=85755,e(e.s=t);var t}));var t=e.O();_N_E=t}]);