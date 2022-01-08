(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7390],{40606:function(e,o,n){"use strict";n.r(o),n.d(o,{default:function(){return i}});var t=n(7896),r=n(59740),a=(n(2784),n(30876)),l=["components"],s={};function i(e){var o=e.components,n=(0,r.Z)(e,l);return(0,a.kt)("wrapper",(0,t.Z)({},s,n,{components:o,mdxType:"MDXLayout"}),(0,a.kt)("h1",null,"Usage"),(0,a.kt)("p",null,"Get started with React and Tonic UI in no time."),(0,a.kt)("p",null,"You can use any of the components as demonstrated in the documentation. Please refer to each component's ",(0,a.kt)("a",{parentName:"p",href:"../components/button"},"demo page")," to see how they work."),(0,a.kt)("h2",null,"Quick Start"),(0,a.kt)("p",null,"Here is a quick example to get you started:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Button variant="primary">\n  Button\n</Button>\n')),(0,a.kt)("p",null,"For Tonic UI to work, you will need to setup Provider components at the root of your application."),(0,a.kt)("p",null,"Go to the root of your application and do the following:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"import React from 'react';\nimport {\n  Box,\n  ColorModeProvider,\n  ColorStyleProvider,\n  ThemeProvider,\n  ToastProvider,\n  useColorMode,\n  useTheme,\n} from '@tonic-ui/react';\n\nconst App = (props) => {\n  return (\n    <ThemeProvider>\n      <ColorModeProvider>\n        <ColorStyleProvider>\n          <ToastProvider>\n            <Layout>\n              <Box {...props} />\n            </Layout>\n          </ToastProvider>\n        </ColorStyleProvider>\n      </ColorModeProvider>\n    </ThemeProvider>\n  );\n};\n\nconst Layout = (props) => {\n  const [colorMode] = useColorMode(); // One of: 'dark', 'light'\n  const [colorStyle] = useColorStyle({ colorMode });\n  const { fontSizes, lineHeights } = useTheme();\n  const backgroundColor = colorStyle.background.primary;\n  const color = colorStyle.text.primary;\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root {\n            color-scheme: ${colorMode};\n          }\n          :focus:not(:focus-visible) {\n            outline: none;\n          }\n          body {\n            font-size: ${fontSizes.sm};\n            line-height: ${lineHeights.sm};\n          }\n        `}\n      />\n      <Box\n        backgroundColor={backgroundColor}\n        color={color}\n        fontSize=\"sm\"\n        lineHeight=\"sm\"\n        height=\"100vh\"\n        {...props}\n      />\n    </>\n  );\n};\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"For the ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"color-scheme"))," CSS property, see ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme"},"MDN")," for more information.")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"For the ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},":focus-visible"))," pseudo-class, see ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible"},"MDN")," for more information.")),(0,a.kt)("h3",null,"CSSBaseline"),(0,a.kt)("p",null,"Sometimes you may need to apply base CSS styles to your application. Tonic UI provides an optional ",(0,a.kt)("inlineCode",{parentName:"p"},"CSSBaseline")," component that fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements. ",(0,a.kt)("inlineCode",{parentName:"p"},"CSSBaseline")," is recommended to add at the root to ensure all components work correctly."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"disabled",disabled:!0},"import { CSSBaseline } from '@tonic-ui/react';\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<ThemeProvider>\n  <ColorModeProvider value="dark">\n    <ColorStyleProvider>\n      <ToastProvider>\n        <CSSBaseline />\n        <App />\n      </ToastProvider>\n    </ColorStyleProvider>\n  </ColorModeProvider>\n</ThemeProvider>\n')),(0,a.kt)("h3",null,"Extending the theme"),(0,a.kt)("p",null,"Optionally, you can extend the theme object to override the defaults with custom colors, fonts, styles, etc."),(0,a.kt)("p",null,"Override the theme object and pass it to the ",(0,a.kt)("inlineCode",{parentName:"p"},"<ThemeProvider>")," component. This is not required if you are using the default theme."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { theme } from \'@tonic-ui/react\';\n\n// Let\'s say you want to add custom colors\nconst customTheme = {\n  ...theme,\n  colors: {\n    ...theme.colors,\n    brand: {\n      90: "#1a365d",\n      80: "#153e75",\n      70: "#2a69ac",\n    },\n  },\n};\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<ThemeProvider theme={customTheme}>\n  {children}\n</ThemeProvider>\n")),(0,a.kt)("h2",null,"Versioned Documentation"),(0,a.kt)("p",null,"This documentation always reflects the latest version of Tonic UI. You can find older versions of the documentation ",(0,a.kt)("a",{parentName:"p",href:"versions"},"here"),"."))}i.isMDXComponent=!0},72249:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started/usage",function(){return n(40606)}])}},function(e){e.O(0,[9774,2888,179],(function(){return o=72249,e(e.s=o);var o}));var o=e.O();_N_E=o}]);