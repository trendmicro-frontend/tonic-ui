(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4467],{8980:function(e,n,o){"use strict";var t=o(2215),r=o(3921),l=(o(2784),o(8491)),a=o(2767),c=o(8165);n.Z=function(e){var n,o=e.theme,s=(0,r.useTheme)(),u=(0,r.useColorMode)(),i=(0,t.Z)(u,1)[0],p=(0,r.useColorStyle)({colorMode:i}),d=null!==(n=(0,t.Z)(p,1)[0][o])&&void 0!==n?n:s[o];if(!d)return"Theme field not found";"space"!==o&&"sizes"!==o||(d=Object.keys(d).filter((function(e){return!e.toString().match(/[qh]$/)})).reduce((function(e,n){return e[n]=d[n],e}),{}));return(0,c.tZ)(r.Box,{mb:"6x"},(0,c.tZ)(l.Z,null,"const ".concat(o," = ").concat((0,a.Z)(d,!1))))}},2767:function(e,n){"use strict";n.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},2453:function(e,n,o){"use strict";o.r(n),o.d(n,{default:function(){return u}});var t=o(7896),r=o(9740),l=(o(2784),o(876)),a=(o(3921),o(8980)),c=["components"],s={};function u(e){var n=e.components,o=(0,r.Z)(e,c);return(0,l.kt)("wrapper",(0,t.Z)({},s,o,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",null,"Shadows"),(0,l.kt)("h2",null,"Design Tokens"),(0,l.kt)(a.Z,{theme:"shadows",mdxType:"ThemeParser"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Shadow colors are defined in the color style object, not in the theme. Use the ",(0,l.kt)("inlineCode",{parentName:"p"},"useColorStyle")," Hook to get the shadow color.")),(0,l.kt)("h2",null,"Color Style"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\n\nconsole.log(colorStyle.shadow.thin);\nconsole.log(colorStyle.shadow.medium);\nconsole.log(colorStyle.shadow.thick);\n")),(0,l.kt)("h3",null,"Dark Mode"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',\n}\n")),(0,l.kt)("h3",null,"Light Mode"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"shadow: {\n  thin: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',\n  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',\n  thick: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',\n}\n")),(0,l.kt)("h2",null,"Examples"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const backgroundColor = colorStyle.background.secondary;\n  const color = colorStyle.color.secondary;\n  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);\n\n  return (\n    <Flex flexDirection="row" columnGap="6x">\n      {[\'thin\', \'medium\', \'thick\'].map(key => (\n        <Flex\n          key={key}\n          width={256}\n          height={128}\n          backgroundColor={backgroundColor}\n          color={color}\n          boxShadow={colorStyle.shadow[key]}\n          alignItems="center"\n          justifyContent="center"\n        >\n          <Text fontSize="md" lineHeight="md">\n            {capitalizeFirstLetter(key)}\n          </Text>\n        </Flex>\n      ))}\n    </Flex>\n  );\n}\n\nrender(<Example />);\n')))}u.isMDXComponent=!0},9560:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/shadows",function(){return o(2453)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=9560,e(e.s=n);var n}));var n=e.O();_N_E=n}]);