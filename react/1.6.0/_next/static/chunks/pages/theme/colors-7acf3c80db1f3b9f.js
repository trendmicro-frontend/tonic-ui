(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6601],{58980:function(e,t,n){"use strict";var o=n(12215),r=n(5294),l=(n(2784),n(8128)),u=n(82767),a=n(28165);t.Z=function(e){var t,n=e.theme,c=(0,r.useTheme)(),i=(0,r.useColorMode)(),s=(0,o.Z)(i,1)[0],p=(0,r.useColorStyle)({colorMode:s}),m=null!==(t=(0,o.Z)(p,1)[0][n])&&void 0!==t?t:c[n];if(!m)return"Theme field not found";"space"!==n&&"sizes"!==n||(m=Object.keys(m).filter((function(e){return!e.toString().match(/[qh]$/)})).reduce((function(e,t){return e[t]=m[t],e}),{}));return(0,a.tZ)(r.Box,{mb:"6x"},(0,a.tZ)(l.Z,null,"const ".concat(n," = ").concat((0,u.Z)(m,!1))))}},82767:function(e,t){"use strict";t.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},76299:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var o=n(7896),r=n(59740),l=(n(2784),n(30876)),u=n(5294),a=n(12215),c=n(5081),i=n(28165),s=function(e){var t=e.hue,n=(0,u.useTheme)(),o=RegExp(t,"g"),r=Object.keys(n.colors).filter((function(e){return e.match(o)})).reduce((function(e,t){return e[t]=n.colors[t],e}),{});return(0,i.tZ)(u.Flex,{alignItems:"center"},(0,i.tZ)(u.Stack,{direction:"column"},Object.keys(r).map((function(e){var t=(0,c.ensureString)(e).split(":"),n=(0,a.Z)(t,2),o=n[0],l=n[1],s=r[e],p=l<=50?"black":"white";return(0,i.tZ)(u.Flex,{key:e,justifyContent:"space-between",fontSize:"sm",width:"300px",height:"12x",py:"3x",px:"4x",lineHeight:"lg",fontFamily:"mono",backgroundColor:s,color:p},(0,i.tZ)(u.Box,null,"".concat(o.charAt(0).toUpperCase()).concat(o.slice(1))," ",l),(0,i.tZ)(u.Box,null,e))}))))},p=n(58980),m=["components"],d={};function h(e){var t=e.components,n=(0,r.Z)(e,m);return(0,l.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",null,"Colors"),(0,l.kt)("h2",null,"Design Tokens"),(0,l.kt)(p.Z,{theme:"colors",mdxType:"ThemeParser"}),(0,l.kt)("h2",null,"Color Palette"),(0,l.kt)("p",null,"The color palette is defined for both dark mode and light mode where ",(0,l.kt)("inlineCode",{parentName:"p"},"10")," - ",(0,l.kt)("inlineCode",{parentName:"p"},"50")," means to pass AA contrast with black text and ",(0,l.kt)("inlineCode",{parentName:"p"},"60")," - ",(0,l.kt)("inlineCode",{parentName:"p"},"100")," means to pass AA contrast with white text."),(0,l.kt)(u.Grid,{gap:"6x",templateColumns:"repeat(auto-fit, 300px)",mb:"6x",mdxType:"Grid"},(0,l.kt)(s,{hue:"red",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"magenta",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"purple",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"blue",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"green",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"teal",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"cyan",mdxType:"ColorPalette"}),(0,l.kt)(s,{hue:"gray",mdxType:"ColorPalette"})))}h.isMDXComponent=!0},42281:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/colors",function(){return n(76299)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=42281,e(e.s=t);var t}));var t=e.O();_N_E=t}]);