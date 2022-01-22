(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5545],{32726:function(e){var o=Object.prototype.hasOwnProperty;e.exports=function(e,t){return null!=e&&o.call(e,t)}},1369:function(e,o,t){var l=t(17297),r=t(79631),n=t(86152),a=t(39045),i=t(61158),d=t(33812);e.exports=function(e,o,t){for(var c=-1,y=(o=l(o,e)).length,p=!1;++c<y;){var m=d(o[c]);if(!(p=null!=e&&t(e,m)))break;e=e[m]}return p||++c!=y?p:!!(y=null==e?0:e.length)&&i(y)&&a(m,y)&&(n(e)||r(e))}},93352:function(e,o,t){var l=t(32726),r=t(1369);e.exports=function(e,o){return null!=e&&r(e,o,l)}},82767:function(e,o){"use strict";o.Z=function(e){return JSON.stringify(e,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},90165:function(e,o,t){"use strict";t.r(o),t.d(o,{default:function(){return w}});var l=t(7896),r=t(59740),n=t(2784),a=t(30876),i=t(81292),d=t(48828),c=t(12215),y=t(5081),p=t(72579),m=t.n(p),x=t(93352),s=t.n(x),u=t(28165),k=["colorLabel","colorType","colorKey","colorTokens","colorValues"],g=function(e){var o,t,a=e.colorLabel,d=e.colorType,y=(e.colorKey,e.colorTokens),p=e.colorValues,m=(0,r.Z)(e,k),x=(0,i.useColorMode)(),s=(0,c.Z)(x,1)[0],g=(0,i.useColorStyle)({colorMode:s}),T=(0,c.Z)(g,1)[0],h=null===T||void 0===T||null===(o=T.color)||void 0===o?void 0:o.primary,S=null===T||void 0===T||null===(t=T.color)||void 0===t?void 0:t.secondary,C=function(){var e={},o={dark:"gray:100",light:"white:emphasis"}[s],t={dark:"gray:70",light:"gray:20"}[s];if("gradient"===d){var l=(0,c.Z)(p,2),r=l[0],n=l[1];return e.background="linear-gradient(45deg, ".concat(r,", ").concat(n,")"),e}return"shadow"===d?(e.backgroundColor={dark:"gray:90",light:"white"}[s],e.boxShadow=p[0],e):(e.backgroundColor=p[0],o===y[0]&&(e.border=1,e.borderColor=t),e)}();return(0,u.tZ)(i.Box,m,(0,u.tZ)(i.Box,(0,l.Z)({maxWidth:120,height:120,px:"3x",mb:"4x"},C)),(0,u.tZ)(i.Box,{mb:"3x"},a&&(0,u.tZ)(i.Text,{color:h,fontSize:"md",lineHeight:"md",fontWeight:"semibold"},a)),y.length>0&&(0,u.tZ)(n.Fragment,null,(0,u.tZ)(i.Stack,{direction:"row",spacing:"2x"},y.map((function(e){return e?(0,u.tZ)(i.Tag,{key:e,variant:"solid",fontFamily:"mono",fontSize:"sm",lineHeight:"sm",mb:"1x"},e):null}))),(0,u.tZ)(i.Stack,{direction:"row",spacing:"2x",mb:"1x"},p.map((function(e){return(0,u.tZ)(i.Text,{key:e,color:S,fontFamily:"mono",fontSize:"sm",lineHeight:"sm"},e)})))))},T=["colorStyle","colorType"],h=function(e){var o,t=e.colorStyle,n=void 0===t?{}:t,a=e.colorType,d=(0,r.Z)(e,T),p=(0,i.useTheme)(),x=(0,i.useColorMode)(),k=(0,c.Z)(x,1)[0],h=(0,i.useColorStyle)({colorMode:k}),S=(0,c.Z)(h,1)[0],C=null!==(o=m()(n,a))&&void 0!==o?o:m()(S,a),f=Object.keys(C).map((function(e){var o,t,l=Array.isArray(C)?"":(t=e,(t=(0,y.Zs)(t)).charAt(0).toUpperCase()+t.slice(1)),r=null!==(o=m()(n,"".concat(a,".").concat(e)))&&void 0!==o?o:m()(S,"".concat(a,".").concat(e)),i=(0,y.rY)(r).map((function(e){return s()(p,["colors",e])?e:null})),d=(0,y.rY)(r).map((function(e){var o;return null!==(o=m()(p,["colors",e]))&&void 0!==o?o:e}));return Array.isArray(C)&&(e="#"+(Number(e)+1)),{colorLabel:l,colorType:a,colorKey:e,colorTokens:i,colorValues:d}}));return(0,u.tZ)(i.Grid,(0,l.Z)({rowGap:"8x",columnGap:"12x",templateColumns:"repeat(auto-fill, minmax(".concat(120,"px, 1fr))")},d),f.map((function(e){var o=e.colorLabel,t=e.colorType,l=e.colorKey,r=e.colorTokens,n=e.colorValues;return(0,u.tZ)(g,{key:l,colorLabel:o,colorType:t,colorKey:l,colorTokens:r,colorValues:n})})))},S=function(e){var o=(0,i.useColorMode)(),t={dark:{backgroundColor:"gray:100",border:1,borderColor:"gray:70"},light:{backgroundColor:"white:emphasis",border:1,borderColor:"gray:20"}}[(0,c.Z)(o,1)[0]];return(0,u.tZ)(i.Box,(0,l.Z)({px:"10x",py:"8x"},t,e))},C=function(e){var o,t=(0,i.useColorMode)(),r=(0,c.Z)(t,1)[0],n=(0,i.useColorStyle)({colorMode:r}),a=(0,c.Z)(n,1)[0],d=null===a||void 0===a||null===(o=a.color)||void 0===o?void 0:o.primary;return(0,u.tZ)(i.Box,(0,l.Z)({mb:"5x",color:d},e))},f=t(82767),v=["components"],b={};function w(e){var o=e.components,t=(0,r.Z)(e,v);return(0,a.kt)("wrapper",(0,l.Z)({},b,t,{components:o,mdxType:"MDXLayout"}),(0,a.kt)("h1",null,"Color Style"),(0,a.kt)("p",null,"Tonic UI comes with a color style system that defines functional color values."),(0,a.kt)("h2",null,"Setup"),(0,a.kt)("p",null,"By using ",(0,a.kt)("inlineCode",{parentName:"p"},"TonicProvider")," at root of your application, it will add ",(0,a.kt)("inlineCode",{parentName:"p"},"ColorStyleProvider")," internally to provide the color style context to all components. The default color style will be added automatically."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"import React from 'react';\nimport { Box, TonicProvider } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      /**\n       * The `colorStyle` config\n       * @param {object} defaultValue\n       * @param {object} value\n       * @param {function} onChange\n       */\n      colorStyle={{\n        // You can omit color style settings if using the default values\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n")),(0,a.kt)("p",null,"The above setup is equivalent to:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"<ColorStyleProvider>\n  <Box {...props} />\n</ColorStyleProvider>\n")),(0,a.kt)("h3",null,"The ",(0,a.kt)("inlineCode",{parentName:"h3"},"colorStyle")," config"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"colorStyle")," config has the following options:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"defaultValue"),": The default value for the color style."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"value"),": The current value for the color style."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"onChange(colorStyle)"),": A function that is called when the color style is changed.")),(0,a.kt)("h2",null,"Default Color Style"),(0,a.kt)("h3",null,"Import"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { colorStyle } from '@tonic-ui/react';\n")),(0,a.kt)("h3",null,"Color style settings"),(0,a.kt)(i.Box,{mb:"6x",mdxType:"Box"},(0,a.kt)(d.Z,{mdxType:"CodeBlock"},(0,f.Z)(i.colorStyle))),(0,a.kt)("h2",null,"Override Default Color Style"),(0,a.kt)("p",null,"To override default color style, you can create a color style object in accordance to the color mode, and pass the object to ",(0,a.kt)("inlineCode",{parentName:"p"},"TonicProvider")," with either the ",(0,a.kt)("inlineCode",{parentName:"p"},"value")," or the ",(0,a.kt)("inlineCode",{parentName:"p"},"defaultValue")," property."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"import React from 'react';\nimport { Box, TonicProvider, colorStyle } from '@tonic-ui/react';\n\nfunction App(props) {\n  return (\n    <TonicProvider\n      colorStyle={{\n        value: customColorStyle,\n      }}\n    >\n      <Box {...props} />\n    </TonicProvider>\n  );\n}\n\nconst customColorStyle = {\n  ...colorStyle,\n   dark: {\n    ...colorStyle.dark,\n    color: {\n      emphasis: 'white:emphasis',\n      primary: 'white:primary',\n      secondary: 'white:secondary',\n      tertiary: 'white:tertiary',\n      disabled: 'white:disabled',\n      success: 'green:40',\n      info: 'blue:40',\n      warning: 'orange:50',\n      error: 'red:50',\n    },\n  },\n  light: {\n    ...colorStyle.light,\n    color: {\n      emphasis: 'black:emphasis',\n      primary: 'black:primary',\n      secondary: 'black:secondary',\n      tertiary: 'black:tertiary',\n      disabled: 'black:disabled',\n      success: 'green:50',\n      info: 'blue:60',\n      warning: 'orange:50',\n      error: 'red:60',\n    },\n  },\n};\n")),(0,a.kt)("h2",null,"Managing Color Style"),(0,a.kt)("p",null,"To manage color style in your application, you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"useColorStyle")," hook."),(0,a.kt)("h3",null,"useColorStyle Hook"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"useColorStyle")," is a custom Hook that gives you access to the color style object of the current color mode."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"const [colorMode] = useColorMode();\nconst [colorStyle, setColorStyle] = useColorStyle({ colorMode });\nconst { colors } = useTheme();\n\nconsole.log(colorMode);\n// => 'dark' / 'light'\nconsole.log(colorStyle.color.primary);\n// => 'white:primary' / 'black:primary'\nconsole.log(colorStyle.background.primary);\n// => 'gray:100' / 'white:emphasis'\nconsole.log(colors[colorStyle.color.primary]);\n// => 'rgba(255, 255, 255, .92)' / 'rgba(0, 0, 0, .92)'\nconsole.log(colors[colorStyle.background.primary]);\n// => '#151515' / 'rgba(255, 255, 255, 1.0)'\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle, setColorStyle] = useColorStyle({ colorMode });\n  const [colorVariant, setColorVariant] = React.useState(\'primary\');\n  const backgroundColor = colorStyle.background[colorVariant];\n  const color = colorStyle.color[colorVariant];\n  const changeColorVariant = (colorVariant) => (event) => {\n    setColorVariant(colorVariant);\n  };\n\n  return (\n    <>\n      <Box mb="4x">\n        <Button onClick={changeColorVariant(\'primary\')}>\n          Use primary color\n        </Button>\n        <Space width="2x" />\n        <Button onClick={changeColorVariant(\'secondary\')}>\n          Use secondary color\n        </Button>\n        <Space width="2x" />\n        <Button onClick={changeColorVariant(\'tertiary\')}>\n          Use tertiary color\n        </Button>\n      </Box>\n      <Box backgroundColor={backgroundColor} p="4x">\n        <Text color={color} size="lg">\n          To change the color mode, click the <b>toggle color mode</b> button at the top right corner.\n        </Text>\n      </Box>\n    </>\n  );\n};\n')),(0,a.kt)("h2",null,"Color Values"),(0,a.kt)("h3",null,"Background"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"background",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"background",mdxType:"ColorStyleBody"})))),(0,a.kt)("h3",null,"Color"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"color",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"color",mdxType:"ColorStyleBody"})))),(0,a.kt)("h3",null,"Text"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"text",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"text",mdxType:"ColorStyleBody"})))),(0,a.kt)("h3",null,"Shadow"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"shadow",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"shadow",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))",mdxType:"ColorStyleBody"})))),(0,a.kt)("h3",null,"Severity"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"severity",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"severity",mdxType:"ColorStyleBody"})))),(0,a.kt)("h3",null,"Chart"),(0,a.kt)(n.Fragment,null,(0,a.kt)(i.DarkMode,{mdxType:"DarkMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"moon",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Dark Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"chart.classic.colors",mdxType:"ColorStyleBody"}))),(0,a.kt)(i.LightMode,{mdxType:"LightMode"},(0,a.kt)(S,{mdxType:"ColorStyleContent"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Flex,{alignItems:"center",mdxType:"Flex"},(0,a.kt)(i.Icon,{icon:"sun",size:"6x",color:"yellow:50",mdxType:"Icon"}),(0,a.kt)(i.Space,{width:"2x",mdxType:"Space"}),(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Light Mode")),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorType:"chart.classic.colors",mdxType:"ColorStyleBody"})))),(0,a.kt)("h2",null,"Gradient Color Values"),(0,a.kt)("p",null,"Gradient color values are not defined in the color style system, you can set ",(0,a.kt)("inlineCode",{parentName:"p"},"gradient")," with below values when necessary."),(0,a.kt)(d.Z,{mdxType:"CodeBlock"},(0,f.Z)({gradient:{severity:{high:["purple:60","red:50"],medium:["red:50","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:40"]},others:{1:["purple:50","magenta:40"],2:["purple:60","blue:50"],3:["blue:50","teal:40"],4:["cyan:40","teal:30"],5:["blue:60","teal:40"],6:["green:40","cyan:30"],7:["magenta:60","red:40"],8:["magenta:50","blue:60"]}}})),(0,a.kt)(S,{display:"flex",flexDirection:"column",rowGap:"8x",mdxType:"ColorStyleContent"},(0,a.kt)(i.Box,{mdxType:"Box"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Gradient - Severity"),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorStyle:{gradient:{high:["purple:60","red:50"],medium:["red:50","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:40"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))",mdxType:"ColorStyleBody"})),(0,a.kt)(i.Box,{mdxType:"Box"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Gradient - Others"),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorStyle:{gradient:{1:["purple:50","magenta:40"],2:["purple:60","blue:50"],3:["blue:50","teal:40"],4:["cyan:40","teal:30"],5:["blue:60","teal:40"],6:["green:40","cyan:30"],7:["magenta:60","red:40"],8:["magenta:50","blue:60"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))",mdxType:"ColorStyleBody"}))),(0,a.kt)("h2",null,"Blindness Color Values"),(0,a.kt)("p",null,"Blindness color values are not defined in the color style system, you can set ",(0,a.kt)("inlineCode",{parentName:"p"},"blindness")," with below values when necessary."),(0,a.kt)(d.Z,{mdxType:"CodeBlock"},(0,f.Z)({blindness:{severity:{high:"magenta:60",medium:"orange:50",low:"yellow:50",safe:"green:30",info:"gray:50",unknown:"gray:50"},chart:{classic:{colors:["gray:50","blue:30","green:30","orange:50","cyan:30","magenta:60","purple:50","teal:40","purple:30","cyan:70","yellow:50"]}},gradient:{severity:{high:["purple:60","magenta:60"],medium:["magenta:60","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:30"]}}}})),(0,a.kt)(S,{display:"flex",flexDirection:"column",rowGap:"8x",mdxType:"ColorStyleContent"},(0,a.kt)(i.Box,{mdxType:"Box"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Blindness - Severity"),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorStyle:{severity:{high:"magenta:60",medium:"orange:50",low:"yellow:50",safe:"green:30",info:"gray:50",unknown:"gray:50"}},colorType:"severity",mdxType:"ColorStyleBody"})),(0,a.kt)(i.Box,{mdxType:"Box"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Blindness - Chart"),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorStyle:{chart:{classic:{colors:["gray:50","blue:30","green:30","orange:50","cyan:30","magenta:60","purple:50","teal:40","purple:30","cyan:70","yellow:50"]}}},colorType:"chart.classic.colors",mdxType:"ColorStyleBody"})),(0,a.kt)(i.Box,{mdxType:"Box"},(0,a.kt)(C,{mdxType:"ColorStyleHeader"},(0,a.kt)(i.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"Blindness - Gradient"),(0,a.kt)(i.Divider,{my:"2x",mdxType:"Divider"})),(0,a.kt)(h,{colorStyle:{gradient:{high:["purple:60","magenta:60"],medium:["magenta:60","orange:50"],low:["orange:50","yellow:50"],safe:["teal:50","green:30"]}},colorType:"gradient",templateColumns:"repeat(auto-fill, minmax(240px, 1fr))",mdxType:"ColorStyleBody"}))))}w.isMDXComponent=!0},31952:function(e,o,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-style",function(){return t(90165)}])}},function(e){e.O(0,[9774,2888,179],(function(){return o=31952,e(e.s=o);var o}));var o=e.O();_N_E=o}]);