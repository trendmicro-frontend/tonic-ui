(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6901],{79916:function(e,n,o){"use strict";o.r(n);var r=o(52322),l=o(45392);function s(e){var n=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",a:"a",svg:"svg",use:"use",code:"code",pre:"pre",h3:"h3"},(0,l.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:[(0,r.jsx)(n.h1,{id:"color-mode",children:"Color Mode"}),"\n",(0,r.jsx)(n.p,{children:"Tonic UI comes with built-in support for managing color modes in your app."}),"\n",(0,r.jsxs)(n.h2,{id:"setup",children:["Setup",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#setup",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["By using ",(0,r.jsx)(n.code,{children:"TonicProvider"})," at root of your application, it will add ",(0,r.jsx)(n.code,{children:"ColorModeProvider"})," internally to provide the color mode context to all components. The default color mode is ",(0,r.jsx)(n.code,{children:"light"})," if not specified."]}),"\n",(0,r.jsxs)(n.p,{children:["To get color mode working correctly, you may have to pass ",(0,r.jsx)(n.code,{children:"colorMode"})," config to ",(0,r.jsx)(n.code,{children:"TonicProvider"})," with ",(0,r.jsx)(n.code,{children:"defaultValue"})," set to ",(0,r.jsx)(n.code,{children:"dark"})," or ",(0,r.jsx)(n.code,{children:"light"}),"."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { Box, TonicProvider } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      /**\n       * The `colorMode` config\n       * @param {'dark'|'light'} defaultValue The default value for the color mode. It can be `light` or `dark`. The default value is `light` if not specified.\n       * @param {'dark'|'light'} value The current value for the color mode. It can be `light` or `dark`.\n       * @param {function} onChange(colorMode) A function that is called when the color mode is changed.\n       * @param {boolean} useSystemColorMode A boolean that determines whether to use the system color mode.\n       */\n      colorMode={{\n        defaultValue: 'dark',\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"The above setup is equivalent to:"}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<ColorModeProvider defaultValue="dark">\n  <Box {...props} />\n</ColorModeProvider>\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"color-scheme",children:["Color scheme",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#color-scheme",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["To opt the entire page into the user's color scheme preferences declare ",(0,r.jsx)(n.code,{children:"color-scheme"})," on the document's root element."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Global, css } from '@emotion/react';\n"})}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Global\n  styles={css`\n    :root, :host {\n      color-scheme: dark;\n    }\n  `}\n/>\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"examples",children:["Examples",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"use-default-color-mode",children:["Use default color mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#use-default-color-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<TonicProvider\n  colorMode={{\n    defaultValue: 'dark',\n  }}\n>\n  {children}\n</TonicProvider>\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"use-system-color-mode",children:["Use system color mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#use-system-color-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"This example uses the default color mode for the first render, and then switches to the system color mode for the rest of time."}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<TonicProvider\n  colorMode={{\n    defaultValue: 'dark', // optional\n    useSystemColorMode: true, // If `true`, switch to system color mode after the first render.\n  }}\n>\n  {children}\n</TonicProvider>\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"controlled-color-mode",children:["Controlled color mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-color-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<TonicProvider\n  colorMode={{\n    value: 'dark',\n  }}\n>\n  {children}\n</TonicProvider>\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"controlled-color-mode-with-a-toggle-function",children:["Controlled color mode with a toggle function",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-color-mode-with-a-toggle-function",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function App({ children }) {\n  const [colorMode, toggleColorMode] = useToggle();\n\n  return (\n    <TonicProvider\n      colorMode={{\n        value: colorMode,\n        onChange: toggleColorMode,\n      }}\n    >\n      {children}\n    </TonicProvider>\n  );\n}\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"managing-color-mode",children:["Managing Color Mode",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#managing-color-mode",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["To manage color mode in your application, you can use the ",(0,r.jsx)(n.a,{href:"../components/color-mode/useColorMode",children:"useColorMode"})," hook."]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}},36943:function(e,n,o){"use strict";o.r(n);var r=o(52322),l=o(45392),s=o(79916);function c(e){var n=Object.assign({div:"div"},(0,l.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:["\n",(0,r.jsx)(s.default,{})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(c,e)})):c(e)}},70285:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started/color-mode",function(){return o(36943)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=70285)}),_N_E=e.O()}]);