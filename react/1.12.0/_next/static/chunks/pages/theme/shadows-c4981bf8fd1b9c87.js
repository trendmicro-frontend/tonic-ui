(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4467],{58980:function(e,n,o){"use strict";var r=o(98922),l=o(2784),t=o(3769),s=o(82767);function c(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var o,r,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var t=[],s=!0,c=!1;try{for(l=l.call(e);!(s=(o=l.next()).done)&&(t.push(o.value),!n||t.length!==n);s=!0);}catch(e){c=!0,r=e}finally{try{s||null==l.return||l.return()}finally{if(c)throw r}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return i(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);if("Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return i(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,n){(null==n||n>e.length)&&(n=e.length);for(var o=0,r=Array(n);o<n;o++)r[o]=e[o];return r}n.Z=function(e){var n,o=e.theme,i=(0,r.useTheme)(),a=c((0,r.useColorMode)(),1)[0],h=null!==(n=c((0,r.useColorStyle)({colorMode:a}),1)[0][o])&&void 0!==n?n:i[o];return h?(("space"===o||"sizes"===o)&&(h=Object.keys(h).filter(function(e){return!e.toString().match(/[qh]$/)}).reduce(function(e,n){return e[n]=h[n],e},{})),l.createElement(r.Box,{mb:"6x"},l.createElement(t.Z,null,l.createElement("div",{className:"js"},"const ".concat(o," = ").concat((0,s.Z)(h,!1)))))):"Theme field not found"}},82767:function(e,n){"use strict";n.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},81007:function(e,n,o){"use strict";o.r(n);var r=o(52322),l=o(45392);o(98922);var t=o(58980);function s(e){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",blockquote:"blockquote",p:"p",code:"code",pre:"pre",h3:"h3",nav:"nav",ul:"ul",li:"li"},(0,l.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n",(0,r.jsx)(n.h1,{id:"shadows",children:"Shadows"}),"\n",(0,r.jsxs)(n.h2,{id:"design-tokens",children:["Design Tokens",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(t.Z,{theme:"shadows"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["Shadow colors are defined in the color style object, not in the theme. Use the ",(0,r.jsx)(n.code,{children:"useColorStyle"})," Hook to get the shadow color."]}),"\n"]}),"\n",(0,r.jsxs)(n.h2,{id:"color-style",children:["Color Style",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#color-style",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\n\nconsole.log(colorStyle.shadow.thin);\nconsole.log(colorStyle.shadow.medium);\nconsole.log(colorStyle.shadow.thick);\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"dark-mode",children:["Dark Mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#dark-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',\n}\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"light-mode",children:["Light Mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#light-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',\n}\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"examples",children:["Examples",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{noInline:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const backgroundColor = colorStyle.background.secondary;\n  const color = colorStyle.color.secondary;\n  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);\n\n  return (\n    <Flex flexDirection="row" columnGap="6x">\n      {[\'thin\', \'medium\', \'thick\'].map(key => (\n        <Flex\n          key={key}\n          width={256}\n          height={128}\n          backgroundColor={backgroundColor}\n          color={color}\n          boxShadow={colorStyle.shadow[key]}\n          alignItems="center"\n          justifyContent="center"\n        >\n          <Text fontSize="md" lineHeight="md">\n            {capitalizeFirstLetter(key)}\n          </Text>\n        </Flex>\n      ))}\n    </Flex>\n  );\n}\n\nrender(<Example />);\n'})})]}),(0,r.jsxs)(n.nav,{className:"toc",id:"toc",children:[(0,r.jsx)(n.div,{className:"toc-heading",children:"Contents"}),(0,r.jsxs)(n.ul,{className:"toc-level toc-level-1",children:[(0,r.jsx)(n.li,{className:"toc-item toc-item-h2",children:(0,r.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#design-tokens",children:"Design Tokens"})}),(0,r.jsxs)(n.li,{className:"toc-item toc-item-h2",children:[(0,r.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#color-style",children:"Color Style"}),(0,r.jsxs)(n.ul,{className:"toc-level toc-level-2",children:[(0,r.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,r.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#dark-mode",children:"Dark Mode"})}),(0,r.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,r.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#light-mode",children:"Light Mode"})})]})]}),(0,r.jsx)(n.li,{className:"toc-item toc-item-h2",children:(0,r.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#examples",children:"Examples"})})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}},19560:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/shadows",function(){return o(81007)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=19560)}),_N_E=e.O()}]);