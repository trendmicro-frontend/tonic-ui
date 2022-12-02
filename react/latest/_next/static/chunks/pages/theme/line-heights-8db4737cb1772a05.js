(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7754],{16395:function(e,t,n){"use strict";var r=n(15945),i=n(2784),s=n(79778),c=n(70018);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var s=[],c=!0,d=!1;try{for(i=i.call(e);!(c=(n=i.next()).done)&&(s.push(n.value),!t||s.length!==t);c=!0);}catch(l){d=!0,r=l}finally{try{c||null==i.return||i.return()}finally{if(d)throw r}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}t.Z=function(e){var t,n=e.theme,l=(0,r.useTheme)(),o=d((0,r.useColorMode)(),1)[0],h=null!==(t=d((0,r.useColorStyle)({colorMode:o}),1)[0][n])&&void 0!==t?t:l[n];return h?(("space"===n||"sizes"===n)&&(h=Object.keys(h).filter(function(e){return!e.toString().match(/[qh]$/)}).reduce(function(e,t){return e[t]=h[t],e},{})),i.createElement(r.Box,{mb:"6x"},i.createElement(s.Z,null,i.createElement("div",{className:"js"},"const ".concat(n," = ").concat((0,c.Z)(h,!1)))))):"Theme field not found"}},70018:function(e,t){"use strict";t.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},90625:function(e,t,n){"use strict";n.r(t);var r=n(52322),i=n(45392);n(15945);var s=n(16395);function c(e){var t=Object.assign({h1:"h1",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre",code:"code"},(0,i.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:"Line Heights"}),"\n",(0,r.jsx)(t.h2,{children:"Design Tokens"}),"\n",(0,r.jsx)(s.Z,{theme:"lineHeights"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Name"}),(0,r.jsx)(t.th,{children:"Line height"}),(0,r.jsx)(t.th,{children:"Pixels"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"xs"}),(0,r.jsx)(t.td,{children:"1.125rem"}),(0,r.jsx)(t.td,{children:"18px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"sm"}),(0,r.jsx)(t.td,{children:"1.25rem"}),(0,r.jsx)(t.td,{children:"20px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"md"}),(0,r.jsx)(t.td,{children:"1.375rem"}),(0,r.jsx)(t.td,{children:"22px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"lg"}),(0,r.jsx)(t.td,{children:"1.5rem"}),(0,r.jsx)(t.td,{children:"24px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"xl"}),(0,r.jsx)(t.td,{children:"1.75rem"}),(0,r.jsx)(t.td,{children:"28px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"2xl"}),(0,r.jsx)(t.td,{children:"2rem"}),(0,r.jsx)(t.td,{children:"32px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"3xl"}),(0,r.jsx)(t.td,{children:"2.25rem"}),(0,r.jsx)(t.td,{children:"36px"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"4xl"}),(0,r.jsx)(t.td,{children:"2.5rem"}),(0,r.jsx)(t.td,{children:"40px"})]})]})]}),"\n",(0,r.jsx)(t.h2,{children:"Examples"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-jsx",children:'<Stack direction="row" spacing="12x">\n  <Box width="324px" lineHeight="sm">\n    <Box>Line height 1.25rem</Box>\n    <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>\n  </Box>\n  <Box width="324px" lineHeight="lg">\n    <Box>Line height 1.5rem</Box>\n    <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>\n  </Box>\n  <Box width="324px" lineHeight="2xl">\n    <Box>Line height 2rem</Box>\n    <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>\n  </Box>\n</Stack>\n'})})]})}t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},(0,i.ah)(),e.components).wrapper;return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(c,e)})):c(e)}},49174:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/line-heights",function(){return n(90625)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=49174)}),_N_E=e.O()}]);