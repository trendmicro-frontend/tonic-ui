(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1845],{8980:function(r,n,o){"use strict";var e=o(3921),t=o(2784),l=o(9769),c=o(2767);function a(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var o=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null==o)return;var e,t,l=[],c=!0,a=!1;try{for(o=o.call(r);!(c=(e=o.next()).done)&&(l.push(e.value),!n||l.length!==n);c=!0);}catch(u){a=!0,t=u}finally{try{c||null==o.return||o.return()}finally{if(a)throw t}}return l}(r,n)||function(r,n){if(!r)return;if("string"===typeof r)return u(r,n);var o=Object.prototype.toString.call(r).slice(8,-1);"Object"===o&&r.constructor&&(o=r.constructor.name);if("Map"===o||"Set"===o)return Array.from(r);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return u(r,n)}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(r,n){(null==n||n>r.length)&&(n=r.length);for(var o=0,e=new Array(n);o<n;o++)e[o]=r[o];return e}n.Z=function(r){var n,o=r.theme,u=(0,e.useTheme)(),i=a((0,e.useColorMode)(),1)[0],d=null!==(n=a((0,e.useColorStyle)({colorMode:i}),1)[0][o])&&void 0!==n?n:u[o];if(!d)return"Theme field not found";"space"!==o&&"sizes"!==o||(d=Object.keys(d).filter((function(r){return!r.toString().match(/[qh]$/)})).reduce((function(r,n){return r[n]=d[n],r}),{}));return t.createElement(e.Box,{mb:"6x"},t.createElement(l.Z,null,"const ".concat(o," = ").concat((0,c.Z)(d,!1))))}},2767:function(r,n){"use strict";n.Z=function(r){return JSON.stringify(r,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},6994:function(r,n,o){"use strict";o.r(n),o.d(n,{default:function(){return i}});o(2784);var e=o(876),t=(o(3921),o(8980)),l=["components"];function c(){return c=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(r[e]=o[e])}return r},c.apply(this,arguments)}function a(r,n){if(null==r)return{};var o,e,t=function(r,n){if(null==r)return{};var o,e,t={},l=Object.keys(r);for(e=0;e<l.length;e++)o=l[e],n.indexOf(o)>=0||(t[o]=r[o]);return t}(r,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);for(e=0;e<l.length;e++)o=l[e],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(r,o)&&(t[o]=r[o])}return t}var u={};function i(r){var n=r.components,o=a(r,l);return(0,e.kt)("wrapper",c({},u,o,{components:n,mdxType:"MDXLayout"}),(0,e.kt)("h1",null,"Radii"),(0,e.kt)("h2",null,"Design Tokens"),(0,e.kt)(t.Z,{theme:"radii",mdxType:"ThemeParser"}),(0,e.kt)("h2",null,"Examples"),(0,e.kt)("h3",null,(0,e.kt)("inlineCode",{parentName:"h3"},'borderRadius="circle"')),(0,e.kt)("pre",null,(0,e.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="circle"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n')),(0,e.kt)("h3",null,(0,e.kt)("inlineCode",{parentName:"h3"},'borderRadius="sm"')),(0,e.kt)("pre",null,(0,e.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="sm"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n')),(0,e.kt)("h3",null,(0,e.kt)("inlineCode",{parentName:"h3"},'borderRadius="md"')),(0,e.kt)("pre",null,(0,e.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="md"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n')),(0,e.kt)("h3",null,(0,e.kt)("inlineCode",{parentName:"h3"},'borderRadius="lg"')),(0,e.kt)("pre",null,(0,e.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="lg"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n')))}i.isMDXComponent=!0},545:function(r,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/radii",function(){return o(6994)}])}},function(r){r.O(0,[9774,2888,179],(function(){return n=545,r(r.s=n);var n}));var n=r.O();_N_E=n}]);