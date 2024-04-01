(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8367],{81579:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return index_page}});var r=t(52322),a=t(45392),o=t(83449),l=t(67569),i=t(49427),c=t(2784),s=["value","onChange"];function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var InlineError=function(e){return c.createElement(l.Text,_extends({fontSize:"sm",lineHeight:"sm",color:"red:50"},e))},d=(0,c.forwardRef)(function(e,n){var t=e.value,r=e.onChange;!function(e,n){if(null!=e){var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}}}(e,s);var a=(0,c.useRef)(),o=(0,i.useMergeRefs)(a,n),d=""===t?"Please fill out this field":null;return(0,c.useEffect)(function(){var e=a.current,n=d||"";e.setCustomValidity(n)},[d]),c.createElement(c.Fragment,null,c.createElement(l.Flex,{position:"relative",alignItems:"center",mb:"1x"},c.createElement(l.Input,{ref:o,placeholder:"Placeholder text",value:t,onChange:r,error:d,pr:d?"10x":void 0}),d&&c.createElement(l.Box,{position:"absolute",right:0},c.createElement(l.Icon,{icon:"warning-circle",mx:"3x",color:"red:50"}))),c.createElement(l.Box,null,d&&c.createElement(InlineError,null,d)))});d.displayName="TextField";var validation=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=c.useState(""))||function(e,n){var t,r,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],l=!0,i=!1;try{for(a=a.call(e);!(l=(t=a.next()).done)&&(o.push(t.value),!n||o.length!==n);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(i)throw r}}return o}}(e,2)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _arrayLikeToArray(e,n)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],r=n[1];return c.createElement(d,{value:t,onChange:function(e){r(e.target.value)}})},attribute_list=function(){return c.createElement(c.Fragment,null,c.createElement(l.Flex,{alignItems:"center"},c.createElement(l.TextLabel,{htmlFor:"browser-choice",mr:"2x"},"Choose a browser from the list:"),c.createElement(l.Input,{list:"browsers",id:"browser-choice",width:"auto"})),c.createElement(l.Box,{as:"datalist",id:"browsers"},c.createElement("option",{value:"Chrome"}),c.createElement("option",{value:"Firefox"}),c.createElement("option",{value:"Internet Explorer"}),c.createElement("option",{value:"Opera"}),c.createElement("option",{value:"Safari"}),c.createElement("option",{value:"Microsoft Edge"})))},attribute_required=function(){return c.createElement(l.Input,{required:!0,placeholder:"Placeholder text"})},attribute_readonly=function(){return c.createElement(l.Stack,{directin:"column",spacing:"4x"},c.createElement(l.Input,{readOnly:!0,placeholder:"Placeholder text"}),c.createElement(l.Input,{readOnly:!0,placeholder:"Placeholder text",defaultValue:"Read-only"}))},attribute_disabled=function(){return c.createElement(l.Stack,{directin:"column",spacing:"4x"},c.createElement(l.Input,{disabled:!0,placeholder:"Placeholder text"}),c.createElement(l.Input,{disabled:!0,placeholder:"Placeholder text",defaultValue:"Disabled"}))},attribute_type=function(){return c.createElement(l.Grid,{templateColumns:"min-content auto",columnGap:"3x",rowGap:"3x"},c.createElement(l.Grid,null,c.createElement(l.TextLabel,null,"Name:")),c.createElement(l.Grid,null,c.createElement(l.Input,{type:"text",placeholder:"John Doe"})),c.createElement(l.Grid,null,c.createElement(l.TextLabel,null,"Password:")),c.createElement(l.Grid,null,c.createElement(l.Input,{type:"password",placeholder:"Password"})))},variant_unstyled=function(){return c.createElement(l.Input,{variant:"unstyled",placeholder:"John Doe"})},variant_flush=function(){return c.createElement(l.Input,{variant:"flush",placeholder:"John Doe"})},variant_filled=function(){return c.createElement(l.Input,{variant:"filled",placeholder:"John Doe"})},variant_outline=function(){return c.createElement(l.Input,{variant:"outline",placeholder:"John Doe"})},sizes=function(){return c.createElement(l.Stack,{direction:"column",spacing:"4x"},c.createElement(l.Box,null,c.createElement(l.TextLabel,{mb:"1x",size:"sm"},"Label:"),c.createElement(l.Input,{size:"sm",placeholder:"Small size (24px)"})),c.createElement(l.Box,null,c.createElement(l.TextLabel,{mb:"1x",size:"md"},"Label:"),c.createElement(l.Input,{size:"md",placeholder:"Default size (32px)"})),c.createElement(l.Box,null,c.createElement(l.TextLabel,{mb:"1x",size:"lg"},"Label:"),c.createElement(l.Input,{size:"lg",placeholder:"Large size (40px)"})))},basic=function(){return c.createElement(c.Fragment,null,c.createElement(l.TextLabel,{mb:"1x"},"Label:"),c.createElement(l.Input,{placeholder:"Basic example"}),c.createElement(l.Text,{size:"xs",mt:"1x"},"Help text for the text input"))};function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,a.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n","\n","\n","\n","\n","\n","\n","\n","\n","\n","\n","\n",(0,r.jsx)(n.h1,{id:"input",children:"Input"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Input"})," component is used to get user input in a text field."]}),"\n",(0,r.jsxs)(n.p,{children:["Check out the ",(0,r.jsx)(n.a,{href:"input-control",children:"InputControl"})," component if you want to do more advanced stuff with the input."]}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { Input } from '@tonic-ui/react';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:basic,file:{data:'import { Input, Text, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <>\n    <TextLabel mb="1x">Label:</TextLabel>\n    <Input placeholder="Basic example" />\n    <Text size="xs" mt="1x">Help text for the text input</Text>\n  </>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Input, Text, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <>\n    <TextLabel mb="1x">Label:</TextLabel>\n    <Input placeholder="Basic example" />\n    <Text size="xs" mt="1x">Help text for the text input</Text>\n  </>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["Use the ",(0,r.jsx)(n.code,{children:"size"})," prop to change the size of the ",(0,r.jsx)(n.code,{children:"Input"}),". You can set the value to ",(0,r.jsx)(n.code,{children:"sm"}),", ",(0,r.jsx)(n.code,{children:"md"}),", or ",(0,r.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,r.jsx)(o.Z,{component:sizes,file:{data:'import { Box, Input, Stack, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="4x">\n    <Box>\n      <TextLabel mb="1x" size="sm">Label:</TextLabel>\n      <Input size="sm" placeholder="Small size (24px)" />\n    </Box>\n    <Box>\n      <TextLabel mb="1x" size="md">Label:</TextLabel>\n      <Input size="md" placeholder="Default size (32px)" />\n    </Box>\n    <Box>\n      <TextLabel mb="1x" size="lg">Label:</TextLabel>\n      <Input size="lg" placeholder="Large size (40px)" />\n    </Box>\n  </Stack>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Input, Stack, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="4x">\n    <Box>\n      <TextLabel mb="1x" size="sm">Label:</TextLabel>\n      <Input size="sm" placeholder="Small size (24px)" />\n    </Box>\n    <Box>\n      <TextLabel mb="1x" size="md">Label:</TextLabel>\n      <Input size="md" placeholder="Default size (32px)" />\n    </Box>\n    <Box>\n      <TextLabel mb="1x" size="lg">Label:</TextLabel>\n      <Input size="lg" placeholder="Large size (40px)" />\n    </Box>\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h3,{id:"variants",children:["Variants",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#variants",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Input"})," component comes in 3 variants: ",(0,r.jsx)(n.code,{children:"outline"}),", ",(0,r.jsx)(n.code,{children:"filled"}),", ",(0,r.jsx)(n.code,{children:"flush"}),", and ",(0,r.jsx)(n.code,{children:"unstyled"}),". Pass the ",(0,r.jsx)(n.code,{children:"variant"})," prop and set it to either of these values."]}),"\n",(0,r.jsxs)(n.h4,{id:"outline",children:[(0,r.jsx)(n.code,{children:"outline"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#outline",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:variant_outline,file:{data:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"outline\" placeholder=\"John Doe\" />\n);\n\nexport default App;",path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"outline\" placeholder=\"John Doe\" />\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"filled",children:[(0,r.jsx)(n.code,{children:"filled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#filled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:variant_filled,file:{data:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"filled\" placeholder=\"John Doe\" />\n);\n\nexport default App;",path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"filled\" placeholder=\"John Doe\" />\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"flush",children:[(0,r.jsx)(n.code,{children:"flush"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#flush",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:variant_flush,file:{data:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"flush\" placeholder=\"John Doe\" />\n);\n\nexport default App;",path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"flush\" placeholder=\"John Doe\" />\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"unstyled",children:[(0,r.jsx)(n.code,{children:"unstyled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#unstyled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:variant_unstyled,file:{data:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"unstyled\" placeholder=\"John Doe\" />\n);\n\nexport default App;",path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input variant=\"unstyled\" placeholder=\"John Doe\" />\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h3,{id:"attributes",children:["Attributes",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#attributes",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["Standard input attributes are supported, e.g., ",(0,r.jsx)(n.code,{children:"type"}),", ",(0,r.jsx)(n.code,{children:"disabled"}),", ",(0,r.jsx)(n.code,{children:"readOnly"}),", ",(0,r.jsx)(n.code,{children:"required"}),", ",(0,r.jsx)(n.code,{children:"list"}),", etc."]}),"\n",(0,r.jsxs)(n.h4,{id:"type",children:[(0,r.jsx)(n.code,{children:"type"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#type",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:attribute_type,file:{data:'import { Grid, Input, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Grid\n    templateColumns="min-content auto"\n    columnGap="3x"\n    rowGap="3x"\n  >\n    <Grid>\n      <TextLabel>Name:</TextLabel>\n    </Grid>\n    <Grid>\n      <Input type="text" placeholder="John Doe" />\n    </Grid>\n    <Grid>\n      <TextLabel>Password:</TextLabel>\n    </Grid>\n    <Grid>\n      <Input type="password" placeholder="Password" />\n    </Grid>\n  </Grid>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Grid, Input, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Grid\n    templateColumns="min-content auto"\n    columnGap="3x"\n    rowGap="3x"\n  >\n    <Grid>\n      <TextLabel>Name:</TextLabel>\n    </Grid>\n    <Grid>\n      <Input type="text" placeholder="John Doe" />\n    </Grid>\n    <Grid>\n      <TextLabel>Password:</TextLabel>\n    </Grid>\n    <Grid>\n      <Input type="password" placeholder="Password" />\n    </Grid>\n  </Grid>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"disabled",children:[(0,r.jsx)(n.code,{children:"disabled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#disabled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:attribute_disabled,file:{data:'import { Input, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack directin="column" spacing="4x">\n    <Input disabled placeholder="Placeholder text" />\n    <Input disabled placeholder="Placeholder text" defaultValue="Disabled" />\n  </Stack>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Input, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack directin="column" spacing="4x">\n    <Input disabled placeholder="Placeholder text" />\n    <Input disabled placeholder="Placeholder text" defaultValue="Disabled" />\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"readonly",children:[(0,r.jsx)(n.code,{children:"readOnly"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#readonly",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:attribute_readonly,file:{data:'import { Input, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack directin="column" spacing="4x">\n    <Input readOnly placeholder="Placeholder text" />\n    <Input readOnly placeholder="Placeholder text" defaultValue="Read-only" />\n  </Stack>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Input, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack directin="column" spacing="4x">\n    <Input readOnly placeholder="Placeholder text" />\n    <Input readOnly placeholder="Placeholder text" defaultValue="Read-only" />\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"required",children:[(0,r.jsx)(n.code,{children:"required"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#required",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(o.Z,{component:attribute_required,file:{data:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input required placeholder=\"Placeholder text\" />\n);\n\nexport default App;",path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:"import { Input } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Input required placeholder=\"Placeholder text\" />\n);\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h4,{id:"list",children:[(0,r.jsx)(n.code,{children:"list"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#list",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The value of ",(0,r.jsx)(n.code,{children:"list"})," is the id attribute of the ",(0,r.jsx)(n.code,{children:"<datalist>"})," of autocomplete options. The HTML ",(0,r.jsx)(n.code,{children:"<datalist>"})," element contains a set of ",(0,r.jsx)(n.code,{children:"<option>"})," elements that represent the permissible or recommended options available to choose from within other controls."]}),"\n",(0,r.jsx)(o.Z,{component:attribute_list,file:{data:'import { Box, Flex, Input, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <>\n    <Flex alignItems="center">\n      <TextLabel htmlFor="browser-choice" mr="2x">\n        Choose a browser from the list:\n      </TextLabel>\n      <Input list="browsers" id="browser-choice" width="auto" />\n    </Flex>\n    <Box as="datalist" id="browsers">\n      <option value="Chrome" />\n      <option value="Firefox" />\n      <option value="Internet Explorer" />\n      <option value="Opera" />\n      <option value="Safari" />\n      <option value="Microsoft Edge" />\n    </Box>\n  </>\n);\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Flex, Input, TextLabel } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <>\n    <Flex alignItems="center">\n      <TextLabel htmlFor="browser-choice" mr="2x">\n        Choose a browser from the list:\n      </TextLabel>\n      <Input list="browsers" id="browser-choice" width="auto" />\n    </Flex>\n    <Box as="datalist" id="browsers">\n      <option value="Chrome" />\n      <option value="Firefox" />\n      <option value="Internet Explorer" />\n      <option value="Opera" />\n      <option value="Safari" />\n      <option value="Microsoft Edge" />\n    </Box>\n  </>\n);\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h3,{id:"validation",children:["Validation",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#validation",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Input"})," component provides a built-in validation mechanism that can be used to indicate when a field is not valid. When the ",(0,r.jsx)(n.code,{children:"error"})," prop is set to true, a red border is displayed around the input field, allowing you to provide user-friendly form validation feedback."]}),"\n",(0,r.jsxs)(n.p,{children:["In addition to the built-in validation mechanism, you can use the native ",(0,r.jsx)(n.code,{children:"setCustomValidity()"})," method to set a custom validation message for the input. This method is available on the input element and allows you to set a custom error message that will be displayed when the field is invalid."]}),"\n",(0,r.jsx)(o.Z,{component:validation,file:{data:'import { Box, Flex, Icon, Input, Text } from \'@tonic-ui/react\';\nimport { useMergeRefs } from \'@tonic-ui/react-hooks\';\nimport React, { forwardRef, useEffect, useRef } from \'react\';\n\nconst InlineError = (props) => (\n  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />\n);\n\nconst TextField = forwardRef((\n  {\n    value,\n    onChange,\n    ...rest\n  },\n  ref,\n) => {\n  const nodeRef = useRef();\n  const combinedRef = useMergeRefs(nodeRef, ref);\n  const error = (value === \'\') ? \'Please fill out this field\' : null;\n\n  // Optional\n  useEffect(() => {\n    const el = nodeRef.current;\n    const errorMessage = error || \'\';\n    el.setCustomValidity(errorMessage);\n  }, [error]);\n\n  return (\n    <>\n      <Flex position="relative" alignItems="center" mb="1x">\n        <Input\n          ref={combinedRef}\n          placeholder="Placeholder text"\n          value={value}\n          onChange={onChange}\n          error={error}\n          pr={error ? \'10x\' : undefined}\n        />\n        {error && (\n          <Box position="absolute" right={0}>\n            <Icon icon="warning-circle" mx="3x" color="red:50" />\n          </Box>\n        )}\n      </Flex>\n      <Box>\n        {error && (\n          <InlineError>{error}</InlineError>\n        )}\n      </Box>\n    </>\n  );\n});\nTextField.displayName = \'TextField\';\n\nconst App = () => {\n  const [value, setValue] = React.useState(\'\');\n  const onChange = (e) => {\n    setValue(e.target.value);\n  };\n\n  return (\n    <TextField value={value} onChange={onChange} />\n  );\n};\n\nexport default App;',path:"pages/components/input/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Flex, Icon, Input, Text } from \'@tonic-ui/react\';\nimport { useMergeRefs } from \'@tonic-ui/react-hooks\';\nimport React, { forwardRef, useEffect, useRef } from \'react\';\n\nconst InlineError = (props) => (\n  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />\n);\n\nconst TextField = forwardRef((\n  {\n    value,\n    onChange,\n    ...rest\n  },\n  ref,\n) => {\n  const nodeRef = useRef();\n  const combinedRef = useMergeRefs(nodeRef, ref);\n  const error = (value === \'\') ? \'Please fill out this field\' : null;\n\n  // Optional\n  useEffect(() => {\n    const el = nodeRef.current;\n    const errorMessage = error || \'\';\n    el.setCustomValidity(errorMessage);\n  }, [error]);\n\n  return (\n    <>\n      <Flex position="relative" alignItems="center" mb="1x">\n        <Input\n          ref={combinedRef}\n          placeholder="Placeholder text"\n          value={value}\n          onChange={onChange}\n          error={error}\n          pr={error ? \'10x\' : undefined}\n        />\n        {error && (\n          <Box position="absolute" right={0}>\n            <Icon icon="warning-circle" mx="3x" color="red:50" />\n          </Box>\n        )}\n      </Flex>\n      <Box>\n        {error && (\n          <InlineError>{error}</InlineError>\n        )}\n      </Box>\n    </>\n  );\n});\nTextField.displayName = \'TextField\';\n\nconst App = () => {\n  const [value, setValue] = React.useState(\'\');\n  const onChange = (e) => {\n    setValue(e.target.value);\n  };\n\n  return (\n    <TextField value={value} onChange={onChange} />\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h2,{id:"props",children:["Props",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"input-1",children:["Input",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#input-1",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"disabled"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the input is disabled and the user cannot interact with it."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"error"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the input displays a red border to indicate an error."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"readOnly"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the value of the input cannot be edited."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"size"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left",children:"'md'"}),(0,r.jsxs)(n.td,{align:"left",children:["The visual size of the ",(0,r.jsx)(n.code,{children:"input"})," element. One of: 'sm', 'md', 'lg'"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"variant"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left",children:"'outline'"}),(0,r.jsx)(n.td,{align:"left",children:"The variant of the input style to use. One of: 'outline', 'filled', 'flush', 'unstyled'"})]})]})]})]})}var index_page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,a.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},83449:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var r=t(67569),a=t(49427),o=t(5632),l=t(2784),i=t(65245),c=t(82821),s=t(90622),d=t(52057),p=t(63651),u=["size"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var x=(0,l.forwardRef)(function(e,n){var t=e.size,a=function(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,u);return l.createElement(r.SVGIcon,_extends({size:t,viewBox:"0 0 1024 1024"},a),l.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});x.displayName="CodeSandboxIcon";var h=t(94981);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t,r,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],l=!0,i=!1;try{for(a=a.call(e);!(l=(t=a.next()).done)&&(o.push(t.value),!n||o.length!==n);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(i)throw r}}return o}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var m={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},Demo=function(e){var n=e.component,t=e.file,u=e.sandbox,f=(0,o.useRouter)(),b=_slicedToArray((0,l.useReducer)(function(e){return!e},!1),2),g=b[0],j=b[1],v=_slicedToArray((0,r.useColorMode)(),1)[0],I={dark:s.y,light:s.q}[v],y=_slicedToArray((0,a.useToggle)(!1),2),k=y[0],E=y[1],T=(0,c.Z)(null==t?void 0:t.data),w=T.onCopy,L=T.hasCopied,A=(0,l.useCallback)(function(){w()},[w]),C=(0,l.useCallback)(function(){(0,d.b)(u)},[u]),R=(0,l.useCallback)(function(){j(),E(!1)},[j,E]);return l.createElement(i.nu,{code:null==t?void 0:t.data,disabled:!0,language:"jsx",theme:I},l.createElement(r.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[v],p:"4x"},l.createElement(r.Box,{fontSize:"sm",lineHeight:"sm"},l.createElement(l.Fragment,{key:g},l.createElement(n,null)))),l.createElement(r.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},l.createElement(h.Z,{"data-track":k?"CodeBlock|hide_source|".concat((0,p.Z)({path:f.pathname})):"CodeBlock|show_source|".concat((0,p.Z)({path:f.pathname})),onClick:E},l.createElement(r.Tooltip,{label:k?"Hide the source":"Show the source"},l.createElement(r.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),l.createElement(h.Z,{"data-track":"CodeBlock|copy_source|".concat((0,p.Z)({path:f.pathname})),onClick:A},l.createElement(r.Tooltip,{label:L?"Copied":"Copy the source"},l.createElement(r.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),l.createElement(h.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(f.pathname),onClick:C},l.createElement(r.Tooltip,{label:"Edit in CodeSandbox"},l.createElement(x,{size:{sm:"5x",md:"4x"}}))),l.createElement(h.Z,{"data-track":"CodeBlock|reset|".concat(f.pathname),onClick:R},l.createElement(r.Tooltip,{label:"Reset the demo"},l.createElement(r.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),l.createElement(r.Fade,{in:k},l.createElement(r.Collapse,{in:k,unmountOnExit:!0},l.createElement(i.uz,{style:m}))))};Demo.displayName="Demo";var f=Demo},86795:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/input",function(){return t(81579)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=86795)}),_N_E=e.O()}]);