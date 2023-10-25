(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1845],{75073:function(r,n,e){"use strict";var o=e(98922),l=e(2784),c=e(99566),d=e(82650);function s(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var e,o,l=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=l){var c=[],d=!0,s=!1;try{for(l=l.call(r);!(d=(e=l.next()).done)&&(c.push(e.value),!n||c.length!==n);d=!0);}catch(r){s=!0,o=r}finally{try{d||null==l.return||l.return()}finally{if(s)throw o}}return c}}(r,n)||function(r,n){if(r){if("string"==typeof r)return i(r,n);var e=Object.prototype.toString.call(r).slice(8,-1);if("Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return i(r,n)}}(r,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(r,n){(null==n||n>r.length)&&(n=r.length);for(var e=0,o=Array(n);e<n;e++)o[e]=r[e];return o}n.Z=function(r){var n,e=r.theme,i=(0,o.useTheme)(),a=s((0,o.useColorMode)(),1)[0],t=null!==(n=s((0,o.useColorStyle)({colorMode:a}),1)[0][e])&&void 0!==n?n:i[e];return t?(("space"===e||"sizes"===e)&&(t=Object.keys(t).filter(function(r){return!r.toString().match(/[qh]$/)}).reduce(function(r,n){return r[n]=t[n],r},{})),l.createElement(o.Box,{mb:"6x"},l.createElement(c.Z,null,l.createElement("div",{className:"js"},"const ".concat(e," = ").concat((0,d.Z)(t,!1)))))):"Theme field not found"}},82650:function(r,n){"use strict";n.Z=function(r){return JSON.stringify(r,null,2).replace(/"/g,"'").replace(/'(\d+|[a-z]+)':/g,"$1:")}},44291:function(r,n,e){"use strict";e.r(n);var o=e(52322),l=e(45392);e(98922);var c=e(75073);function d(r){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",h3:"h3",code:"code",pre:"pre"},(0,l.ah)(),r.components);return(0,o.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n",(0,o.jsx)(n.h1,{id:"radii",children:"Radii"}),"\n",(0,o.jsxs)(n.h2,{id:"design-tokens",children:["Design Tokens",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#design-tokens",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(c.Z,{theme:"radii"}),"\n",(0,o.jsxs)(n.h2,{id:"examples",children:["Examples",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#examples",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsxs)(n.h3,{id:"borderradiuscircle",children:[(0,o.jsx)(n.code,{children:'borderRadius="circle"'}),(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#borderradiuscircle",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="circle"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n'})}),"\n",(0,o.jsxs)(n.h3,{id:"borderradiussm",children:[(0,o.jsx)(n.code,{children:'borderRadius="sm"'}),(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#borderradiussm",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="sm"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n'})}),"\n",(0,o.jsxs)(n.h3,{id:"borderradiusmd",children:[(0,o.jsx)(n.code,{children:'borderRadius="md"'}),(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#borderradiusmd",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="md"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n'})}),"\n",(0,o.jsxs)(n.h3,{id:"borderradiuslg",children:[(0,o.jsx)(n.code,{children:'borderRadius="lg"'}),(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#borderradiuslg",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const borderColor = {\n    dark: \'gray:60\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Box\n      border={1}\n      borderColor={borderColor}\n      borderRadius="lg"\n      backgroundColor={colorStyle.background.secondary}\n      color={colorStyle.color.secondary}\n      width="18x"\n      height="18x"\n    />\n  );\n}\n'})})]})}n.default=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),r.components).wrapper;return n?(0,o.jsx)(n,Object.assign({},r,{children:(0,o.jsx)(d,r)})):d(r)}},60545:function(r,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/theme/radii",function(){return e(44291)}])}},function(r){r.O(0,[9774,2888,179],function(){return r(r.s=60545)}),_N_E=r.O()}]);