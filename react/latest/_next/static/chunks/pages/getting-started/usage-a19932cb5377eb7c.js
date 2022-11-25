(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7390],{1402:function(e,o,n){"use strict";n.r(o);var r=n(2322),t=n(5392);function l(e){var o=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",pre:"pre",code:"code",blockquote:"blockquote",strong:"strong",h3:"h3"},(0,t.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.h1,{children:"Usage"}),"\n",(0,r.jsx)(o.p,{children:"Get started with React and Tonic UI in no time."}),"\n",(0,r.jsxs)(o.p,{children:["You can use any of the components as demonstrated in the documentation. Please refer to each component's ",(0,r.jsx)(o.a,{href:"../components/button",children:"demo page"})," to see how they work."]}),"\n",(0,r.jsx)(o.h2,{children:"Quick Start"}),"\n",(0,r.jsx)(o.p,{children:"Here is a quick example to get you started:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-jsx",children:'<Button variant="primary">\n  Button\n</Button>\n'})}),"\n",(0,r.jsx)(o.h2,{children:"Setup Provider"}),"\n",(0,r.jsxs)(o.p,{children:["For Tonic UI to work, you will need to setup the ",(0,r.jsx)(o.code,{children:"TonicProvder"})," at the root of your application."]}),"\n",(0,r.jsx)(o.p,{children:"Go to the root of your application and do the following:"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"import React from 'react';\nimport {\n  Box,\n  TonicProvider,\n  colorStyle, // [optional] It's required only when you want to customize the color style\n} from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      colorMode={{\n        defaultValue: 'dark', // One of: 'dark', 'light'\n      }}\n      colorStyle={{\n        defaultValue: colorStyle, // Custom color style\n      }}\n      useCSSBaseline={true} // If `true`, apply CSS reset and base styles\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n"})}),"\n",(0,r.jsx)(o.p,{children:"See below for a more complete example:"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"import React from 'react';\nimport {\n  Box,\n  ToastProvider, // [optional] It's required only when you want to use toast notification globally\n  TonicProvider,\n  colorStyle, // [optional] It's required only when you want to customize the color style\n  useColorMode,\n  useTheme,\n} from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      colorMode={{\n        defaultValue: 'dark', // One of: 'dark', 'light'\n      }}\n      colorStyle={{\n        defaultValue: colorStyle, // Custom color style\n      }}\n      useCSSBaseline={true} // If `true`, apply CSS reset and base styles\n    >\n      <ToastProvider>\n        <Layout>\n          <Box {...props} />\n        </Layout>\n      </ToastProvider>\n    </TonicProvider>\n  );\n}\n\nfunction Layout(props) {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const { colors, fontSizes, lineHeights } = useTheme();\n  const backgroundColor = colorStyle.background.primary;\n  const color = colorStyle.color.primary;\n  const scrollbarThumbBackgroundColor = colorStyle.color.disabled;\n  const scrollbarThumbHoverBackgroundColor = colorStyle.color.tertiary;\n  const scrollbarThumbHoverBorderColor = colorStyle.color.secondary;\n  const scrollbarTrackBackgroundColor = {\n    light: 'gray:30',\n    dark: 'gray:70',\n  }[colorMode];\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root {\n            color-scheme: ${colorMode};\n          }\n          :focus:not(:focus-visible) {\n            outline: none;\n          }\n          body {\n            font-size: ${fontSizes.sm};\n            line-height: ${lineHeights.sm};\n          }\n\n          ::-webkit-scrollbar {\n            width: 8px;\n            height: 8px;\n          }\n          ::-webkit-scrollbar-track {\n            background-color: ${colors[scrollbarTrackBackgroundColor]};\n          }\n          ::-webkit-scrollbar-thumb {\n            background-color: ${colors[scrollbarThumbBackgroundColor]};\n          }\n          ::-webkit-scrollbar-thumb:hover {\n            background-color: ${colors[scrollbarThumbHoverBackgroundColor]};\n            border: 1px solid ${colors[scrollbarThumbHoverBorderColor]};\n          }\n        `}\n      />\n      <Box\n        backgroundColor={backgroundColor}\n        color={color}\n        fontSize=\"sm\"\n        lineHeight=\"sm\"\n        height=\"100vh\"\n        {...props}\n      />\n    </>\n  );\n}\n"})}),"\n",(0,r.jsxs)(o.blockquote,{children:["\n",(0,r.jsxs)(o.p,{children:["Learn more about ",(0,r.jsx)(o.a,{href:"../components/color-mode",children:"Color Mode"})," in the documentation."]}),"\n"]}),"\n",(0,r.jsxs)(o.blockquote,{children:["\n",(0,r.jsxs)(o.p,{children:["Learn more about ",(0,r.jsx)(o.a,{href:"../components/color-style",children:"Color Style"})," in the documentation."]}),"\n"]}),"\n",(0,r.jsxs)(o.blockquote,{children:["\n",(0,r.jsxs)(o.p,{children:["For the ",(0,r.jsx)(o.strong,{children:(0,r.jsx)(o.code,{children:"color-scheme"})})," CSS property, see ",(0,r.jsx)(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme",children:"MDN"})," for more information."]}),"\n"]}),"\n",(0,r.jsxs)(o.blockquote,{children:["\n",(0,r.jsxs)(o.p,{children:["For the ",(0,r.jsx)(o.strong,{children:(0,r.jsx)(o.code,{children:":focus-visible"})})," pseudo-class, see ",(0,r.jsx)(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",children:"MDN"})," for more information."]}),"\n"]}),"\n",(0,r.jsx)(o.h2,{children:"CSSBaseline"}),"\n",(0,r.jsxs)(o.p,{children:["Sometimes you may need to apply base CSS styles to your application. Tonic UI provides an optional ",(0,r.jsx)(o.code,{children:"CSSBaseline"})," component that fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements. ",(0,r.jsx)(o.code,{children:"CSSBaseline"})," is recommended to add at the root to ensure all components work correctly."]}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"<TonicProvider useCSSBaseline={true}>\n  <App />\n</TonicProvider>\n"})}),"\n",(0,r.jsxs)(o.blockquote,{children:["\n",(0,r.jsxs)(o.p,{children:["If you are not writing an application, you may want to set ",(0,r.jsx)(o.code,{children:"useCSSBaseline"})," to ",(0,r.jsx)(o.code,{children:"false"})," (or not set it at all) to prevent global styles pollution."]}),"\n"]}),"\n",(0,r.jsx)(o.h2,{children:"Extending the Color Style"}),"\n",(0,r.jsx)(o.p,{children:"Optionally, you can extend the color style by providing a custom color style. This is not required if you are using the default color style."}),"\n",(0,r.jsx)(o.h3,{children:"1. Customizing the color style"}),"\n",(0,r.jsxs)(o.p,{children:["To override default color style, you can create a color style object according to the color mode, and pass the object to ",(0,r.jsx)(o.code,{children:"TonicProvider"})," with either the ",(0,r.jsx)(o.code,{children:"value"})," or the ",(0,r.jsx)(o.code,{children:"defaultValue"})," property."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-js",children:"import { colorStyle } from '@tonic-ui/react';\n\n// Let's say you want to define color style for your components\nconst customColorStyle = {\n  ...colorStyle,\n  dark: {\n    ...colorStyle.dark,\n    component: {\n      header: {},\n      sidebar: {},\n    },\n  },\n  light: {\n    ...colorStyle.light,\n    component: {\n      header: {},\n      sidebar: {},\n    },\n  },\n};\n"})}),"\n",(0,r.jsx)(o.h3,{children:"2. Setting up the provider"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"<TonicProvider\n  colorMode={{\n    defaultValue: 'dark',\n  }}\n  colorStyle={{\n    defaultValue: customColorStyle,\n  }}\n  useCSSBaseline={true}\n>\n  {children}\n</TonicProvider>\n"})}),"\n",(0,r.jsx)(o.h3,{children:"3. Using the color style"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\nconst headerStyle = colorStyle?.component?.header;\nconst sidebarStyle = colorStyle?.component?.sidebar;\n"})}),"\n",(0,r.jsx)(o.h2,{children:"Extending the Theme"}),"\n",(0,r.jsx)(o.p,{children:"Optionally, you can extend the theme object to override the defaults with custom colors, fonts, styles, etc. This is not required if you are using the default theme."}),"\n",(0,r.jsx)(o.h3,{children:"1. Overriding the theme"}),"\n",(0,r.jsxs)(o.p,{children:["Override the theme object and pass it to the ",(0,r.jsx)(o.code,{children:"<ThemeProvider>"})," component."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-js",children:'import { theme } from \'@tonic-ui/react\';\n\n// Let\'s say you want to add more colors\nconst customTheme = {\n  ...theme,\n  colors: {\n    ...theme.colors,\n    brand: {\n      90: "#1a365d",\n      80: "#153e75",\n      70: "#2a69ac",\n    },\n  },\n};\n'})}),"\n",(0,r.jsx)(o.h3,{children:"2. Setting up the provider"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"<TonicProvider theme={customTheme}>\n  {children}\n</TonicProvider>\n"})}),"\n",(0,r.jsx)(o.h3,{children:"3. Using the theme"}),"\n",(0,r.jsx)(o.pre,{disabled:!0,children:(0,r.jsx)(o.code,{className:"language-jsx",children:"const theme = useTheme();\nconst brandColor = theme?.colors?.brand?.[90];\n"})}),"\n",(0,r.jsx)(o.h2,{children:"Versioned Documentation"}),"\n",(0,r.jsxs)(o.p,{children:["This documentation always reflects the latest version of Tonic UI. You can find older versions of the documentation ",(0,r.jsx)(o.a,{href:"versions",children:"here"}),"."]})]})}o.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({},(0,t.ah)(),e.components).wrapper;return o?(0,r.jsx)(o,Object.assign({},e,{children:(0,r.jsx)(l,e)})):l(e)}},1710:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started/usage",function(){return n(1402)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=1710)}),_N_E=e.O()}]);