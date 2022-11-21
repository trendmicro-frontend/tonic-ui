(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1809],{4615:function(t,o,e){"use strict";e.r(o),e.d(o,{default:function(){return i}});e(2784);var n=e(876),r=["components"];function l(){return l=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},l.apply(this,arguments)}function a(t,o){if(null==t)return{};var e,n,r=function(t,o){if(null==t)return{};var e,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)e=l[n],o.indexOf(e)>=0||(r[e]=t[e]);return r}(t,o);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)e=l[n],o.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}var c={};function i(t){var o=t.components,e=a(t,r);return(0,n.kt)("wrapper",l({},c,e,{components:o,mdxType:"MDXLayout"}),(0,n.kt)("h1",null,"useColorStyle"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"useColorStyle")," is a custom Hook that gives you access to the color style object of the current color mode."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"// import\nimport { useColorStyle } from '@tonic-ui/react';\n\n// usage\nconst [colorStyle, setColorStyle] = useColorStyle({\n  colorMode: 'dark', // One of 'light' or 'dark'\n});\n")),(0,n.kt)("h3",null,"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"options"),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"object")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"{}")),(0,n.kt)("td",{parentName:"tr",align:"left"},"Options object")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"options.colorMode"),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:"left"},"undefined"),(0,n.kt)("td",{parentName:"tr",align:"left"},"The color mode to use.")))),(0,n.kt)("h3",null,"Returns"),(0,n.kt)("p",null,"Returns an array with the color style object and a function to set the color style object."),(0,n.kt)("h3",null,"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\nconst { colors } = useTheme();\n\nconsole.log(colorMode);\n// => 'dark' / 'light'\nconsole.log(colorStyle.color.primary);\n// => 'white:primary' / 'black:primary'\nconsole.log(colorStyle.background.primary);\n// => 'gray:100' / 'white:emphasis'\nconsole.log(colors[colorStyle.color.primary]);\n// => 'rgba(255, 255, 255, .92)' / 'rgba(0, 0, 0, .92)'\nconsole.log(colors[colorStyle.background.primary]);\n// => '#151515' / 'rgba(255, 255, 255, 1.0)'\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle, setColorStyle] = useColorStyle({ colorMode });\n  const [colorVariant, setColorVariant] = React.useState(\'primary\');\n  const backgroundColor = colorStyle.background[colorVariant];\n  const color = colorStyle.color[colorVariant];\n  const changeColorVariant = (colorVariant) => (event) => {\n    setColorVariant(colorVariant);\n  };\n\n  return (\n    <>\n      <Box mb="4x">\n        <Button onClick={changeColorVariant(\'primary\')}>\n          Use primary color\n        </Button>\n        <Space width="2x" />\n        <Button onClick={changeColorVariant(\'secondary\')}>\n          Use secondary color\n        </Button>\n        <Space width="2x" />\n        <Button onClick={changeColorVariant(\'tertiary\')}>\n          Use tertiary color\n        </Button>\n      </Box>\n      <Box backgroundColor={backgroundColor} p="4x">\n        <Text color={color} size="lg">\n          To change the color mode, click the <b>toggle color mode</b> button at the top right corner.\n        </Text>\n      </Box>\n    </>\n  );\n};\n')))}i.isMDXComponent=!0},4967:function(t,o,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/color-style/useColorStyle",function(){return e(4615)}])}},function(t){t.O(0,[9774,2888,179],(function(){return o=4967,t(t.s=o);var o}));var o=t.O();_N_E=o}]);