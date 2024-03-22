(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1380],{87669:function(n,e,o){"use strict";o.r(e),o.d(e,{default:function(){return index_page}});var t=o(52322),r=o(45392),i=o(83449),a=o(67569),c=o(57405),l=o(2784);function _slicedToArray(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var o,t,r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var i=[],a=!0,c=!1;try{for(r=r.call(n);!(a=(o=r.next()).done)&&(i.push(o.value),!e||i.length!==e);a=!0);}catch(n){c=!0,t=n}finally{try{a||null==r.return||r.return()}finally{if(c)throw t}}return i}}(n,e)||function(n,e){if(n){if("string"==typeof n)return _arrayLikeToArray(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);if("Object"===o&&n.constructor&&(o=n.constructor.name),"Map"===o||"Set"===o)return Array.from(n);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return _arrayLikeToArray(n,e)}}(n,e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(n,e){(null==e||e>n.length)&&(e=n.length);for(var o=0,t=Array(e);o<e;o++)t[o]=n[o];return t}var s=c.k.map(function(n){var e=c.c.filter(function(e){return e.iconset===n.id});return 0===e.length?null:{group:n,icons:e}}),FlexItem=function(n){return l.createElement(a.Box,n)},search_icons=function(){var n=_slicedToArray((0,l.useState)(""),2),e=n[0],o=n[1],t=_slicedToArray((0,l.useState)(!1),2),r=t[0],i=t[1],c={light:"black:secondary",dark:"white:secondary"}[_slicedToArray((0,a.useColorMode)(),1)[0]],onChecked=function(){i(!r)};return l.createElement(l.Fragment,null,l.createElement(a.Flex,{flexDirection:"row",alignItems:"center",position:"relative"},l.createElement(a.Box,{pl:"4x"},l.createElement(a.SearchInput,{fontSize:"md",placeholder:"Search",onChange:function(n){o(n.target.value)},onClearInput:function(n){o("")},width:430})),l.createElement(a.Box,{position:"absolute",right:"5px"},l.createElement(a.Checkbox,{size:"md",onChange:function(){return onChecked()}},"Display character codes"))),l.createElement(a.Grid,{gap:0,templateRows:"1fr",p:"4x",transition:"all .3s ease-in"},s.map(function(n){var o=n.group,t=n.icons.filter(function(n){n.iconset;var o=n.name;return!e||o.indexOf(e)>=0});return 0===t.length?null:{group:o,icons:t}}).map(function(n){return n?l.createElement(a.Box,{key:n.group.name},l.createElement(FlexItem,{pt:0!==n.group.id&&"2x"},l.createElement(a.Text,{fontSize:"2xl"},n.group.name)),l.createElement(a.Grid,{gap:"2x",templateColumns:"repeat(auto-fill, minmax(300px, 1fr));",p:"4x",pl:"6x",pr:"4x"},n.icons.map(function(n){return l.createElement(a.Flex,{flexDirection:"row",alignItems:"center",pb:0,pr:0,overflow:"hidden",key:n.code},l.createElement(FlexItem,{flex:"initial",pr:"2x"},l.createElement(a.Icon,{icon:n.name})),l.createElement(FlexItem,{flex:"none",pr:"2x"},l.createElement(a.Text,{fontSize:"md",color:c},n.name)),r&&l.createElement(FlexItem,{flex:"none",pr:"1x",color:c},l.createElement(a.Text,{fontSize:"md"},"(&#x".concat(n.code,")"))),l.createElement(FlexItem,{flex:"none",pb:"1x"},n.new&&l.createElement(a.Badge,{backgroundColor:"green",badgeContent:"new"})))}))):null})))},d=o(49427);function animation_arrayLikeToArray(n,e){(null==e||e>n.length)&&(e=n.length);for(var o=0,t=Array(e);o<e;o++)t[o]=n[o];return t}var animation=function(){var n,e=function(n){if(Array.isArray(n))return n}(n=(0,d.useToggle)(!0))||function(n,e){var o,t,r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var i=[],a=!0,c=!1;try{for(r=r.call(n);!(a=(o=r.next()).done)&&(i.push(o.value),!e||i.length!==e);a=!0);}catch(n){c=!0,t=n}finally{try{a||null==r.return||r.return()}finally{if(c)throw t}}return i}}(n,2)||function(n,e){if(n){if("string"==typeof n)return animation_arrayLikeToArray(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);if("Object"===o&&n.constructor&&(o=n.constructor.name),"Map"===o||"Set"===o)return Array.from(n);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return animation_arrayLikeToArray(n,e)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=e[0],t=e[1],r=o?"running":"paused";return l.createElement(l.Fragment,null,l.createElement(a.Flex,{mb:"4x",alignItems:"center"},l.createElement(a.Switch,{size:"md",checked:o,onChange:t}),l.createElement(a.Space,{width:"2x"}),l.createElement(a.Text,null,"Toggle animation")),l.createElement(a.Stack,{direction:"row",spacing:"4x"},l.createElement(a.Icon,{icon:"spinner",size:"6x",spin:!0,animationPlayState:r}),l.createElement(a.Icon,{icon:"spinner",size:"6x",spin:!0,animationDuration:"4s",animationPlayState:r}),l.createElement(a.Icon,{icon:"clock",size:"6x",spin:!0,animationPlayState:r,animationTimingFunction:"steps(8)"}),l.createElement(a.Icon,{icon:"redo",size:"6x",spin:"cw",animationPlayState:r}),l.createElement(a.Icon,{icon:"undo",size:"6x",spin:"ccw",animationPlayState:r})))},basic=function(){return l.createElement(a.Stack,{direction:"row",spacing:"4x",alignItems:"center"},l.createElement(a.Icon,{icon:"face-smile-o"}),l.createElement(a.Icon,{icon:"face-smile-o",size:"6x",color:"red:50"}),l.createElement(a.Icon,{icon:"face-smile-o",size:"8x",color:"yellow:50"}),l.createElement(a.Icon,{icon:"face-smile-o",size:"12x",color:"teal:40"}))};function _createMdxContent(n){var e=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,r.ah)(),n.components);return(0,t.jsxs)(e.div,{className:"main-content",id:"main-content",children:["\n","\n","\n","\n",(0,t.jsx)(e.h1,{id:"icon",children:"Icon"}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"Icon"})," is used to render SVG icons in a more convenient way. You can extend icons by defining icon keys in ",(0,t.jsx)(e.code,{children:"theme.icons"}),"."]}),"\n",(0,t.jsxs)(e.h2,{id:"import",children:["Import",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-js",children:"import { Icon } from '@tonic-ui/react';\n"})}),"\n",(0,t.jsxs)(e.h2,{id:"usage",children:["Usage",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.h3,{id:"basic",children:["Basic",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#basic",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.p,{children:["Use an icon by passing the ",(0,t.jsx)(e.code,{children:"icon"})," prop. This ",(0,t.jsx)(e.code,{children:"icon"})," property value must match an icon key defined in ",(0,t.jsx)(e.code,{children:"theme.icons"}),". By default, the icon inherits the font size and color of its parent."]}),"\n",(0,t.jsx)(i.Z,{component:basic,file:{data:'import {\n  Icon,\n  Stack,\n} from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack direction="row" spacing="4x" alignItems="center">\n      <Icon icon="face-smile-o" />\n      <Icon icon="face-smile-o" size="6x" color="red:50" />\n      <Icon icon="face-smile-o" size="8x" color="yellow:50" />\n      <Icon icon="face-smile-o" size="12x" color="teal:40" />\n    </Stack>\n  );\n};\n\nexport default App;',path:"pages/components/icon/index.page.mdx"},sandbox:{files:{},raw:'import {\n  Icon,\n  Stack,\n} from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack direction="row" spacing="4x" alignItems="center">\n      <Icon icon="face-smile-o" />\n      <Icon icon="face-smile-o" size="6x" color="red:50" />\n      <Icon icon="face-smile-o" size="8x" color="yellow:50" />\n      <Icon icon="face-smile-o" size="12x" color="teal:40" />\n    </Stack>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,t.jsxs)(e.h3,{id:"animating-icons",children:["Animating icons",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#animating-icons",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.p,{children:["Use the ",(0,t.jsx)(e.code,{children:"spin"})," prop to get any icon to rotate either in the clockwise (CW) or counterclockwise (CCW) direction."]}),"\n",(0,t.jsx)(i.Z,{component:animation,file:{data:'import {\n  Flex,\n  Icon,\n  Space,\n  Stack,\n  Switch,\n  Text,\n} from \'@tonic-ui/react\';\nimport {\n  useToggle,\n} from \'@tonic-ui/react-hooks\';\nimport React from \'react\';\n\nconst App = () => {\n  const [checked, toggle] = useToggle(true);\n  const playState = checked ? \'running\' : \'paused\';\n\n  return (\n    <>\n      <Flex mb="4x" alignItems="center">\n        <Switch size="md" checked={checked} onChange={toggle} />\n        <Space width="2x" />\n        <Text>Toggle animation</Text>\n      </Flex>\n      <Stack direction="row" spacing="4x">\n        <Icon icon="spinner" size="6x" spin animationPlayState={playState} />\n        <Icon icon="spinner" size="6x" spin animationDuration="4s" animationPlayState={playState} />\n        <Icon icon="clock" size="6x" spin animationPlayState={playState} animationTimingFunction="steps(8)" />\n        <Icon icon="redo" size="6x" spin="cw" animationPlayState={playState} />\n        <Icon icon="undo" size="6x" spin="ccw" animationPlayState={playState} />\n      </Stack>\n    </>\n  );\n};\n\nexport default App;',path:"pages/components/icon/index.page.mdx"},sandbox:{files:{},raw:'import {\n  Flex,\n  Icon,\n  Space,\n  Stack,\n  Switch,\n  Text,\n} from \'@tonic-ui/react\';\nimport {\n  useToggle,\n} from \'@tonic-ui/react-hooks\';\nimport React from \'react\';\n\nconst App = () => {\n  const [checked, toggle] = useToggle(true);\n  const playState = checked ? \'running\' : \'paused\';\n\n  return (\n    <>\n      <Flex mb="4x" alignItems="center">\n        <Switch size="md" checked={checked} onChange={toggle} />\n        <Space width="2x" />\n        <Text>Toggle animation</Text>\n      </Flex>\n      <Stack direction="row" spacing="4x">\n        <Icon icon="spinner" size="6x" spin animationPlayState={playState} />\n        <Icon icon="spinner" size="6x" spin animationDuration="4s" animationPlayState={playState} />\n        <Icon icon="clock" size="6x" spin animationPlayState={playState} animationTimingFunction="steps(8)" />\n        <Icon icon="redo" size="6x" spin="cw" animationPlayState={playState} />\n        <Icon icon="undo" size="6x" spin="ccw" animationPlayState={playState} />\n      </Stack>\n    </>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"animation"})," prop can be used to override default animation, it is a shorthand property for:"]}),"\n",(0,t.jsxs)(e.p,{children:["• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name",children:"animationName"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration",children:"animationDuration"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function",children:"animationTimingFunction"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay",children:"animationDelay"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count",children:"animationIterationCount"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction",children:"animationDirection"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode",children:"animationFillMode"}),(0,t.jsx)("br",{}),"\n• ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state",children:"animationPlayState"}),(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(e.h3,{id:"adding-custom-icons",children:["Adding custom icons",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#adding-custom-icons",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.p,{children:["First, you have to add custom icons to the theme. Each icon must be an object containing ",(0,t.jsx)(e.code,{children:"path"})," and optional style props passed to ",(0,t.jsx)(e.a,{href:"svgicon",children:"SVGIcon"}),"."]}),"\n",(0,t.jsx)(e.pre,{disabled:!0,noInline:!0,children:(0,t.jsx)(e.code,{className:"language-jsx",children:'const customIcons = {\n  icon1: {\n    path: (\n      <path fill="currentColor" d="..." />\n    ),\n  },\n  icon2: {\n    path: (\n      <g fill="currentColor">\n        <path d="..." />\n      </g>\n    ),\n\n    // optional style props\n    viewBox: \'0 0 48 48\',\n  },\n};\n\nconst customTheme = {\n  ...theme,\n  icons: {\n    ...theme.icons,\n    ...customIcons,\n  },\n};\n'})}),"\n",(0,t.jsxs)(e.p,{children:["After that simply wrap your app into ",(0,t.jsx)(e.code,{children:"ThemeProvider"})," component and pass your theme as a ",(0,t.jsx)(e.code,{children:"theme"})," prop. Just like this:"]}),"\n",(0,t.jsx)(e.pre,{disabled:!0,noInline:!0,children:(0,t.jsx)(e.code,{className:"language-jsx",children:"<ThemeProvider theme={customTheme}>\n  <App />\n</ThemeProvider>\n"})}),"\n",(0,t.jsxs)(e.p,{children:["Pass the icon name as a prop to the ",(0,t.jsx)(e.code,{children:"<Icon>"})," component to render the SVG icon:"]}),"\n",(0,t.jsx)(e.pre,{disabled:!0,noInline:!0,children:(0,t.jsx)(e.code,{className:"language-jsx",children:'<Icon icon="icon1" color="blue:50" />\n'})}),"\n",(0,t.jsxs)(e.h2,{id:"search-icons",children:["Search icons",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#search-icons",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(i.Z,{component:search_icons,file:{data:'import {\n  Badge,\n  Box,\n  Checkbox,\n  Flex,\n  Grid,\n  Icon,\n  SearchInput,\n  Text,\n  useColorMode,\n} from \'@tonic-ui/react\';\nimport * as tmicon from \'@trendmicro/tmicon\';\nimport React, { useState } from \'react\';\n\nconst tmicons = tmicon.iconsets.map(group => {\n  const icons = tmicon.icons.filter(({ iconset }) => iconset === group.id);\n  if (icons.length === 0) {\n    return null;\n  }\n  return { group, icons };\n});\n\nconst getIcons = (keyword) => tmicons.map(({ group, icons }) => {\n    const filteredIcons = icons.filter(({ iconset, name }) => (!keyword || name.indexOf(keyword) >= 0));\n    if (filteredIcons.length === 0) {\n      return null\n    }\n    return { group, icons: filteredIcons }\n  }\n);\n\nconst FlexItem = (props) => (\n  <Box {...props} />\n);\n\nconst renderIconGroup = (iconSet, keyword, showCharCode, color) => {\n  if (!iconSet) {\n    return null;\n  }\n\n  return (\n    <Box key={iconSet.group.name}>\n      <FlexItem pt={iconSet.group.id !== 0 && \'2x\'}>\n        <Text fontSize={"2xl"}>{iconSet.group.name}</Text>    \n      </FlexItem>\n      <Grid\n        gap="2x"\n        templateColumns="repeat(auto-fill, minmax(300px, 1fr));"\n        p="4x"\n        pl="6x"\n        pr="4x"\n      >\n        {iconSet.icons.map(icon => (\n          <Flex flexDirection="row" alignItems="center" pb={0} pr={0} overflow="hidden" key={icon.code}>\n            <FlexItem flex="initial" pr="2x">\n              <Icon icon={icon.name}/>\n            </FlexItem>\n            <FlexItem flex="none" pr="2x">\n              <Text fontSize={"md"} color={color}>\n                {icon.name}\n              </Text>\n            </FlexItem>\n            {showCharCode && <FlexItem flex="none" pr="1x" color={color}>\n              <Text fontSize={"md"}>\n                {`(&#x${icon.code})`}\n              </Text>\n            </FlexItem>\n            }\n            <FlexItem flex="none" pb="1x">\n              {icon.new && <Badge backgroundColor="green" badgeContent={"new"} />}\n            </FlexItem>\n          </Flex>\n        ))}\n      </Grid>\n    </Box>\n  );\n};\n\nconst App = () => {\n  const [keyword, setKeyword] = useState(\'\');\n  const [showCharCode, setShowCharCode] = useState(false);\n  const [colorMode] = useColorMode();\n  const color = {\n    light: \'black:secondary\',\n    dark: \'white:secondary\',\n  }[colorMode];\n\n  const onChange = (e) => {\n    const keyword = e.target.value;\n    setKeyword(keyword);\n  };\n\n  const onClearInput = (e) => {\n    const keyword = \'\';\n    setKeyword(keyword);\n  };\n\n  const onChecked = () => {\n    setShowCharCode(!showCharCode);\n  }\n\n  return (\n    <>\n      <Flex flexDirection="row" alignItems="center" position="relative">\n        <Box pl="4x">\n          <SearchInput\n            fontSize="md"\n            placeholder="Search"\n            onChange={onChange}\n            onClearInput={onClearInput}\n            width={430}\n          />\n        </Box>\n        <Box position="absolute" right="5px">\n          <Checkbox\n            size="md"\n            onChange={() => onChecked()}>\n            Display character codes\n          </Checkbox>\n        </Box>\n      </Flex>\n      <Grid\n        gap={0}\n        templateRows="1fr"\n        p="4x"\n        transition="all .3s ease-in"\n      >\n        {getIcons(keyword).map((iconSet) => renderIconGroup(iconSet, keyword, showCharCode, color))}\n      </Grid>\n    </>\n  );\n};\n\nexport default App;',path:"pages/components/icon/index.page.mdx"},sandbox:{files:{},raw:'import {\n  Badge,\n  Box,\n  Checkbox,\n  Flex,\n  Grid,\n  Icon,\n  SearchInput,\n  Text,\n  useColorMode,\n} from \'@tonic-ui/react\';\nimport * as tmicon from \'@trendmicro/tmicon\';\nimport React, { useState } from \'react\';\n\nconst tmicons = tmicon.iconsets.map(group => {\n  const icons = tmicon.icons.filter(({ iconset }) => iconset === group.id);\n  if (icons.length === 0) {\n    return null;\n  }\n  return { group, icons };\n});\n\nconst getIcons = (keyword) => tmicons.map(({ group, icons }) => {\n    const filteredIcons = icons.filter(({ iconset, name }) => (!keyword || name.indexOf(keyword) >= 0));\n    if (filteredIcons.length === 0) {\n      return null\n    }\n    return { group, icons: filteredIcons }\n  }\n);\n\nconst FlexItem = (props) => (\n  <Box {...props} />\n);\n\nconst renderIconGroup = (iconSet, keyword, showCharCode, color) => {\n  if (!iconSet) {\n    return null;\n  }\n\n  return (\n    <Box key={iconSet.group.name}>\n      <FlexItem pt={iconSet.group.id !== 0 && \'2x\'}>\n        <Text fontSize={"2xl"}>{iconSet.group.name}</Text>    \n      </FlexItem>\n      <Grid\n        gap="2x"\n        templateColumns="repeat(auto-fill, minmax(300px, 1fr));"\n        p="4x"\n        pl="6x"\n        pr="4x"\n      >\n        {iconSet.icons.map(icon => (\n          <Flex flexDirection="row" alignItems="center" pb={0} pr={0} overflow="hidden" key={icon.code}>\n            <FlexItem flex="initial" pr="2x">\n              <Icon icon={icon.name}/>\n            </FlexItem>\n            <FlexItem flex="none" pr="2x">\n              <Text fontSize={"md"} color={color}>\n                {icon.name}\n              </Text>\n            </FlexItem>\n            {showCharCode && <FlexItem flex="none" pr="1x" color={color}>\n              <Text fontSize={"md"}>\n                {`(&#x${icon.code})`}\n              </Text>\n            </FlexItem>\n            }\n            <FlexItem flex="none" pb="1x">\n              {icon.new && <Badge backgroundColor="green" badgeContent={"new"} />}\n            </FlexItem>\n          </Flex>\n        ))}\n      </Grid>\n    </Box>\n  );\n};\n\nconst App = () => {\n  const [keyword, setKeyword] = useState(\'\');\n  const [showCharCode, setShowCharCode] = useState(false);\n  const [colorMode] = useColorMode();\n  const color = {\n    light: \'black:secondary\',\n    dark: \'white:secondary\',\n  }[colorMode];\n\n  const onChange = (e) => {\n    const keyword = e.target.value;\n    setKeyword(keyword);\n  };\n\n  const onClearInput = (e) => {\n    const keyword = \'\';\n    setKeyword(keyword);\n  };\n\n  const onChecked = () => {\n    setShowCharCode(!showCharCode);\n  }\n\n  return (\n    <>\n      <Flex flexDirection="row" alignItems="center" position="relative">\n        <Box pl="4x">\n          <SearchInput\n            fontSize="md"\n            placeholder="Search"\n            onChange={onChange}\n            onClearInput={onClearInput}\n            width={430}\n          />\n        </Box>\n        <Box position="absolute" right="5px">\n          <Checkbox\n            size="md"\n            onChange={() => onChecked()}>\n            Display character codes\n          </Checkbox>\n        </Box>\n      </Flex>\n      <Grid\n        gap={0}\n        templateRows="1fr"\n        p="4x"\n        transition="all .3s ease-in"\n      >\n        {getIcons(keyword).map((iconSet) => renderIconGroup(iconSet, keyword, showCharCode, color))}\n      </Grid>\n    </>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,t.jsxs)(e.h2,{id:"props",children:["Props",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.h3,{id:"icon-1",children:["Icon",(0,t.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#icon-1",children:(0,t.jsx)(e.svg,{children:(0,t.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{align:"left",children:"Name"}),(0,t.jsx)(e.th,{align:"left",children:"Type"}),(0,t.jsx)(e.th,{align:"left",children:"Default"}),(0,t.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{align:"left",children:"icon"}),(0,t.jsx)(e.td,{align:"left",children:"string"}),(0,t.jsx)(e.td,{align:"left"}),(0,t.jsx)(e.td,{align:"left",children:"The name of the icon."})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{align:"left",children:"spin"}),(0,t.jsx)(e.td,{align:"left",children:"boolean | string"}),(0,t.jsx)(e.td,{align:"left",children:"false"}),(0,t.jsxs)(e.td,{align:"left",children:["If ",(0,t.jsx)(e.code,{children:"true"})," or 'cw', it will rotate in the clockwise direction. If 'ccw', it will rotate in the counterclockwise direction. Otherwise, no rotation occurs."]})]})]})]})]})}var index_page=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object.assign({},(0,r.ah)(),n.components).wrapper;return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(_createMdxContent,n)})):_createMdxContent(n)}},83449:function(n,e,o){"use strict";o.d(e,{Z:function(){return f}});var t=o(67569),r=o(49427),i=o(5632),a=o(2784),c=o(65245),l=o(82821),s=o(90622),d=o(52057),m=o(63651),p=["size"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n}).apply(this,arguments)}var x=(0,a.forwardRef)(function(n,e){var o=n.size,r=function(n,e){if(null==n)return{};var o,t,r=function(n,e){if(null==n)return{};var o,t,r={},i=Object.keys(n);for(t=0;t<i.length;t++)o=i[t],e.indexOf(o)>=0||(r[o]=n[o]);return r}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(t=0;t<i.length;t++)o=i[t],!(e.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(n,o)&&(r[o]=n[o])}return r}(n,p);return a.createElement(t.SVGIcon,_extends({size:o,viewBox:"0 0 1024 1024"},r),a.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});x.displayName="CodeSandboxIcon";var h=o(94981);function _slicedToArray(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var o,t,r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var i=[],a=!0,c=!1;try{for(r=r.call(n);!(a=(o=r.next()).done)&&(i.push(o.value),!e||i.length!==e);a=!0);}catch(n){c=!0,t=n}finally{try{a||null==r.return||r.return()}finally{if(c)throw t}}return i}}(n,e)||function(n,e){if(n){if("string"==typeof n)return _arrayLikeToArray(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);if("Object"===o&&n.constructor&&(o=n.constructor.name),"Map"===o||"Set"===o)return Array.from(n);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return _arrayLikeToArray(n,e)}}(n,e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(n,e){(null==e||e>n.length)&&(e=n.length);for(var o=0,t=Array(e);o<e;o++)t[o]=n[o];return t}var u={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},Demo=function(n){var e=n.component,o=n.file,p=n.sandbox,f=(0,i.useRouter)(),g=_slicedToArray((0,a.useReducer)(function(n){return!n},!1),2),y=g[0],S=g[1],I=_slicedToArray((0,t.useColorMode)(),1)[0],k={dark:s.y,light:s.q}[I],b=_slicedToArray((0,r.useToggle)(!1),2),j=b[0],w=b[1],C=(0,l.Z)(null==o?void 0:o.data),v=C.onCopy,T=C.hasCopied,E=(0,a.useCallback)(function(){v()},[v]),z=(0,a.useCallback)(function(){(0,d.b)(p)},[p]),F=(0,a.useCallback)(function(){S(),w(!1)},[S,w]);return a.createElement(c.nu,{code:null==o?void 0:o.data,disabled:!0,language:"jsx",theme:k},a.createElement(t.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[I],p:"4x"},a.createElement(t.Box,{fontSize:"sm",lineHeight:"sm"},a.createElement(a.Fragment,{key:y},a.createElement(e,null)))),a.createElement(t.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},a.createElement(h.Z,{"data-track":j?"CodeBlock|hide_source|".concat((0,m.Z)({path:f.pathname})):"CodeBlock|show_source|".concat((0,m.Z)({path:f.pathname})),onClick:w},a.createElement(t.Tooltip,{label:j?"Hide the source":"Show the source"},a.createElement(t.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),a.createElement(h.Z,{"data-track":"CodeBlock|copy_source|".concat((0,m.Z)({path:f.pathname})),onClick:E},a.createElement(t.Tooltip,{label:T?"Copied":"Copy the source"},a.createElement(t.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),a.createElement(h.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(f.pathname),onClick:z},a.createElement(t.Tooltip,{label:"Edit in CodeSandbox"},a.createElement(x,{size:{sm:"5x",md:"4x"}}))),a.createElement(h.Z,{"data-track":"CodeBlock|reset|".concat(f.pathname),onClick:F},a.createElement(t.Tooltip,{label:"Reset the demo"},a.createElement(t.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),a.createElement(t.Fade,{in:j},a.createElement(t.Collapse,{in:j,unmountOnExit:!0},a.createElement(c.uz,{style:u}))))};Demo.displayName="Demo";var f=Demo},52998:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/icon",function(){return o(87669)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=52998)}),_N_E=n.O()}]);