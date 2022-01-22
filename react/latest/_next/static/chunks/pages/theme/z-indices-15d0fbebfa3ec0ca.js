(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7634],{58980:function(n,e,o){"use strict";var t=o(12215),r=o(81292),c=(o(2784),o(48828)),l=o(82767),u=o(28165);e.Z=function(n){var e,o=n.theme,i=(0,r.useTheme)(),s=(0,r.useColorMode)(),a=(0,t.Z)(s,1)[0],d=(0,r.useColorStyle)({colorMode:a}),p=null!==(e=(0,t.Z)(d,1)[0][o])&&void 0!==e?e:i[o];if(!p)return"Theme field not found";"space"!==o&&"sizes"!==o||(p=Object.keys(p).filter((function(n){return!n.toString().match(/[qh]$/)})).reduce((function(n,e){return n[e]=p[e],n}),{}));return(0,u.tZ)(r.Box,{mb:"6x"},(0,u.tZ)(c.Z,null,"const ".concat(o," = ").concat((0,l.Z)(p,!1))))}},82767:function(n,e){"use strict";e.Z=function(n){return JSON.stringify(n,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},66121:function(n,e,o){"use strict";o.r(e),o.d(e,{default:function(){return s}});var t=o(7896),r=o(59740),c=(o(2784),o(30876)),l=(o(81292),o(58980)),u=["components"],i={};function s(n){var e=n.components,o=(0,r.Z)(n,u);return(0,c.kt)("wrapper",(0,t.Z)({},i,o,{components:e,mdxType:"MDXLayout"}),(0,c.kt)("h1",null,"zIndices"),(0,c.kt)("h2",null,"Design Tokens"),(0,c.kt)(l.Z,{theme:"zIndices",mdxType:"ThemeParser"}),(0,c.kt)("h2",null,"Examples"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-jsx"},"function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box position=\"relative\" py=\"3x\" px=\"4x\" height={360}>\n      {['dropdown', 'sticky', 'fixed', 'overlay', 'drawer', 'modal', 'popover', 'toast', 'tooltip'].map((name, index) => {\n        const zIndexValue = 1000 + index * 100;\n\n        return (\n          <Box\n            key={name}\n            backgroundColor={colorStyle.background.secondary}\n            boxShadow={colorStyle.shadow.thin}\n            color={colorStyle.color.secondary}\n            position=\"absolute\"\n            top={12 + index * 36}\n            left={12 + index * 16}\n            zIndex={name}\n            width={150}\n            px=\"4x\"\n            py=\"3x\"\n            textAlign=\"center\"\n            transition=\"transform 0.2s ease-in-out\"\n            _hover={{\n              color: colorStyle.color.primary,\n              transform: 'scale(1.1)',\n            }}\n          >\n            {name}={zIndexValue}\n          </Box>\n        );\n      })}\n    </Box>\n  );\n}\n")))}s.isMDXComponent=!0},40705:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/z-indices",function(){return o(66121)}])}},function(n){n.O(0,[9774,2888,179],(function(){return e=40705,n(n.s=e);var e}));var e=n.O();_N_E=e}]);