(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2153],{68895:function(o,n,e){"use strict";e.r(n);var r=e(52322),t=e(45392);function c(o){var n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},(0,t.ah)(),o.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{children:"useColorMode"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"useColorMode"})," is a custom Hook that gives you access to the current color mode, and a function to change the color mode."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"// import\nimport { useColorStyle } from '@tonic-ui/react';\n\n// usage\nconst [colorMode, setColorMode] = useColorMode();\n"})}),"\n",(0,r.jsx)(n.h3,{children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:"Returns an array with the current color mode and a function to change the color mode."}),"\n",(0,r.jsx)(n.h3,{children:"Example"}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"// App.jsx\nimport { css, Global } from '@emotion/react';\nimport { Button, useColorMode } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'\n  const toggleColorMode = () => {\n    const nextColorMode = {\n      'dark': 'light',\n      'light': 'dark',\n    }[colorMode];\n    setColorMode(nextColorMode);\n  };\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root {\n            color-scheme: ${colorMode};\n          }\n        `}\n      />\n      <Button onClick={toggleColorMode}>\n        Toggle Color Mode\n      </Button>\n    </>\n  );\n};\n"})})]})}n.default=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,t.ah)(),o.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},o,{children:(0,r.jsx)(c,o)})):c(o)}},20014:function(o,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-mode/useColorMode",function(){return e(68895)}])}},function(o){o.O(0,[9774,2888,179],function(){return o(o.s=20014)}),_N_E=o.O()}]);