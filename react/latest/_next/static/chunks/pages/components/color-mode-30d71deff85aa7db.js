(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6474],{8344:function(e,o,n){"use strict";n.r(o),n.d(o,{default:function(){return d}});n(2784);var t=n(876),r=["components"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},l.apply(this,arguments)}function a(e,o){if(null==e)return{};var n,t,r=function(e,o){if(null==e)return{};var n,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],o.indexOf(n)>=0||(r[n]=e[n]);return r}(e,o);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],o.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i={};function d(e){var o=e.components,n=a(e,r);return(0,t.kt)("wrapper",l({},i,n,{components:o,mdxType:"MDXLayout"}),(0,t.kt)("h1",null,"Color Mode"),(0,t.kt)("p",null,"Tonic UI comes with built-in support for managing color modes in your app."),(0,t.kt)("h2",null,"Setup"),(0,t.kt)("p",null,"By using ",(0,t.kt)("inlineCode",{parentName:"p"},"TonicProvider")," at root of your application, it will add ",(0,t.kt)("inlineCode",{parentName:"p"},"ColorModeProvider")," internally to provide the color mode context to all components. The default color mode is ",(0,t.kt)("inlineCode",{parentName:"p"},"light")," if not specified."),(0,t.kt)("p",null,"To get color mode workding correctly, you may have to pass ",(0,t.kt)("inlineCode",{parentName:"p"},"colorMode")," config to ",(0,t.kt)("inlineCode",{parentName:"p"},"TonicProvider")," with ",(0,t.kt)("inlineCode",{parentName:"p"},"defaultValue")," set to ",(0,t.kt)("inlineCode",{parentName:"p"},"dark")," or ",(0,t.kt)("inlineCode",{parentName:"p"},"light"),"."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"import React from 'react';\nimport { Box, TonicProvider } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      /**\n       * The `colorMode` config\n       * @param {'dark'|'light'} defaultValue\n       * @param {'dark'|'light'} value\n       * @param {function} onChange\n       * @param {boolean} useSystemColorMode\n       */\n      colorMode={{\n        defaultValue: 'dark',\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n")),(0,t.kt)("p",null,"The above setup is equivalent to:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<ColorModeProvider defaultValue="dark">\n  <Box {...props} />\n</ColorModeProvider>\n')),(0,t.kt)("h3",null,"The ",(0,t.kt)("inlineCode",{parentName:"h3"},"colorMode")," config"),(0,t.kt)("p",null,"The ",(0,t.kt)("inlineCode",{parentName:"p"},"colorMode")," config has the following options:"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"defaultValue"),": The default value for the color mode. It can be ",(0,t.kt)("inlineCode",{parentName:"li"},"light")," or ",(0,t.kt)("inlineCode",{parentName:"li"},"dark"),". The default value is ",(0,t.kt)("inlineCode",{parentName:"li"},"light")," if not specified."),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"value"),": The current value for the color mode. It can be ",(0,t.kt)("inlineCode",{parentName:"li"},"light")," or ",(0,t.kt)("inlineCode",{parentName:"li"},"dark"),"."),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"onChange(colorMode)"),": A function that is called when the color mode is changed."),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"useSystemColorMode"),": A boolean that determines whether to use the system color mode.")),(0,t.kt)("h3",null,"Color scheme"),(0,t.kt)("p",null,"To opt the entire page into the user's color scheme preferences declare ",(0,t.kt)("inlineCode",{parentName:"p"},"color-scheme")," on the ",(0,t.kt)("inlineCode",{parentName:"p"},":root")," element."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"import { Global, css } from '@emotion/react';\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<Global\n  styles={css`\n    :root {\n      color-scheme: dark;\n    }\n  `}\n/>\n")),(0,t.kt)("h2",null,"Examples"),(0,t.kt)("h3",null,"Use default color mode"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<TonicProvider\n  colorMode={{\n    defaultValue: 'dark',\n  }}\n>\n  {children}\n</TonicProvider>\n")),(0,t.kt)("h3",null,"Use system color mode"),(0,t.kt)("p",null,"This example uses the default color mode for the first render, and then switches to the system color mode for the rest of time."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<TonicProvider\n  colorMode={{\n    defaultValue: 'dark', // optional\n    useSystemColorMode: true, // If `true`, switch to system color mode after the first render.\n  }}\n>\n  {children}\n</TonicProvider>\n")),(0,t.kt)("h3",null,"Controlled color mode"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<TonicProvider\n  colorMode={{\n    value: 'dark',\n  }}\n>\n  {children}\n</TonicProvider>\n")),(0,t.kt)("h3",null,"Controlled color mode with a toggle function"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"function App({ children }) {\n  const [colorMode, toggleColorMode] = useToggle();\n\n  return (\n    <TonicProvider\n      colorMode={{\n        value: colorMode,\n        onChange: toggleColorMode,\n      }}\n    >\n      {children}\n    </TonicProvider>\n  );\n}\n")),(0,t.kt)("h2",null,"Managing Color Mode"),(0,t.kt)("p",null,"To manage color mode in your application, you can use the ",(0,t.kt)("inlineCode",{parentName:"p"},"useColorMode")," hook."),(0,t.kt)("h3",null,"useColorMode Hook"),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"useColorMode")," is a custom Hook that gives you access to the current color mode, and a function to change the color mode."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"// App.jsx\nimport { css, Global } from '@emotion/react';\nimport { Button, useColorMode } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'\n  const toggleColorMode = () => {\n    const nextColorMode = {\n      'dark': 'light',\n      'light': 'dark',\n    }[colorMode];\n    setColorMode(nextColorMode);\n  };\n\n  return (\n    <>\n      <Global\n        styles={css`\n          :root {\n            color-scheme: ${colorMode};\n          }\n        `}\n      />\n      <Button onClick={toggleColorMode}>\n        Toggle Color Mode\n      </Button>\n    </>\n  );\n};\n")),(0,t.kt)("h2",null,"Forcing a Specific Color Mode"),(0,t.kt)("p",null,"To force a specific color mode, wrap your component in ",(0,t.kt)("inlineCode",{parentName:"p"},"LightMode")," or ",(0,t.kt)("inlineCode",{parentName:"p"},"DarkMode"),", it will override the global color mode and set the color scheme to ",(0,t.kt)("inlineCode",{parentName:"p"},"dark")," or ",(0,t.kt)("inlineCode",{parentName:"p"},"light")," respectively."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-jsx"},'<Flex>\n  <DarkMode bg="gray:90" color="white:primary">\n    <Text px="4x" py="3x">\n      This is dark mode\n    </Text>\n  </DarkMode>\n  <Space width="4x" />\n  <LightMode bg="gray:10" color="black:primary">\n    <Text px="4x" py="3x">\n      This is light mode\n    </Text>\n  </LightMode>\n</Flex>\n')))}d.isMDXComponent=!0},6621:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-mode",function(){return n(8344)}])}},function(e){e.O(0,[9774,2888,179],(function(){return o=6621,e(e.s=o);var o}));var o=e.O();_N_E=o}]);