(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3733],{60968:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return index_page}});var i=t(52322),l=t(45392),c=t(83449),r=t(67569),a=t(2784),faq_input_element=function(){var e=(0,a.useRef)();return a.createElement(r.Flex,{alignItems:"center",columnGap:"6x"},a.createElement(r.Switch,{defaultChecked:!0,inputRef:e},"Label"),a.createElement(r.Button,{onClick:function(){var n=null==e?void 0:e.current;n&&(n.focus(),window.alert("The switch toggle is "+(n.checked?"on":"off")))}},"Click Me"))},states=function(){return a.createElement(r.Stack,{spacing:"6x"},a.createElement(r.Flex,{columnGap:"6x"},a.createElement(r.Switch,{checked:!1},"Label"),a.createElement(r.Switch,{checked:!0},"Label")),a.createElement(r.Flex,{columnGap:"6x"},a.createElement(r.Switch,{checked:!1,disabled:!0},"Label"),a.createElement(r.Switch,{checked:!0,disabled:!0},"Label")))},sizes=function(){return a.createElement(r.Flex,{columnGap:"6x"},a.createElement(r.Switch,{size:"sm"},"Label"),a.createElement(r.Switch,{size:"md"},"Label"),a.createElement(r.Switch,{size:"lg"},"Label"))},colors=function(){return a.createElement(r.Flex,{columnGap:"6x"},a.createElement(r.Switch,{variantColor:"red",defaultChecked:!0},"Label"),a.createElement(r.Switch,{variantColor:"green",defaultChecked:!0},"Label"))},flex_layout=function(){return a.createElement(r.Flex,{alignItems:"flex-start",columnGap:"2x"},a.createElement(r.Switch,{id:"form-control"}),a.createElement(r.Box,{as:"label",htmlFor:"form-control",sx:{cursor:"pointer",pt:"1x",userSelect:"none"}},a.createElement(r.Text,null,"Label"),a.createElement(r.Text,{fontSize:"xs",lineHeight:"xs"},"Helper text")))},basic=function(){return a.createElement(r.Switch,null,"Label")};function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,l.ah)(),e.components);return(0,i.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n","\n","\n","\n","\n","\n",(0,i.jsx)(n.h1,{id:"switch",children:"Switch"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"Switch"})," component is used as an alternative to the ",(0,i.jsx)(n.a,{href:"checkbox",children:"Checkbox"})," component. You can use it to render a single option that can be turned on or off."]}),"\n",(0,i.jsxs)(n.h2,{id:"import",children:["Import",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { Switch } from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"usage",children:["Usage",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"basic",children:["Basic",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#basic",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(c.Z,{component:basic,file:{data:"import { Switch } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  return (\n    <Switch>\n      Label\n    </Switch>\n  );\n};\n\nexport default App;",path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:"import { Switch } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  return (\n    <Switch>\n      Label\n    </Switch>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,i.jsx)(n.p,{children:"You can use a flex container to align a switch with other components. This allows you to easily control the positioning and spacing of all elements within the container."}),"\n",(0,i.jsx)(c.Z,{component:flex_layout,file:{data:'import { Box, Flex, Switch, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex alignItems="flex-start" columnGap="2x">\n      <Switch id="form-control" />\n      <Box\n        as="label"\n        htmlFor="form-control"\n        sx={{\n          cursor: \'pointer\',\n          pt: \'1x\',\n          userSelect: \'none\',\n        }}\n      >\n        <Text>Label</Text>\n        <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n      </Box>\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Flex, Switch, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex alignItems="flex-start" columnGap="2x">\n      <Switch id="form-control" />\n      <Box\n        as="label"\n        htmlFor="form-control"\n        sx={{\n          cursor: \'pointer\',\n          pt: \'1x\',\n          userSelect: \'none\',\n        }}\n      >\n        <Text>Label</Text>\n        <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n      </Box>\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,i.jsxs)(n.h3,{id:"colors",children:["Colors",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of a radio button. ",(0,i.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,i.jsx)(n.code,{children:"50"})," (hover) or ",(0,i.jsx)(n.code,{children:"60"})," (checked) that exist in ",(0,i.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,i.jsx)(c.Z,{component:colors,file:{data:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex columnGap="6x">\n      <Switch variantColor="red" defaultChecked>\n        Label\n      </Switch>\n      <Switch variantColor="green" defaultChecked>\n        Label\n      </Switch>\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex columnGap="6x">\n      <Switch variantColor="red" defaultChecked>\n        Label\n      </Switch>\n      <Switch variantColor="green" defaultChecked>\n        Label\n      </Switch>\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,i.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"size"})," prop to change the size of the switch. You can set the value to ",(0,i.jsx)(n.code,{children:"sm"}),", ",(0,i.jsx)(n.code,{children:"md"}),", or ",(0,i.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,i.jsx)(c.Z,{component:sizes,file:{data:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n  <Flex columnGap="6x">\n    <Switch size="sm">\n      Label\n    </Switch>\n    <Switch size="md">\n      Label\n    </Switch>\n    <Switch size="lg">\n      Label\n    </Switch>\n  </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n  <Flex columnGap="6x">\n    <Switch size="sm">\n      Label\n    </Switch>\n    <Switch size="md">\n      Label\n    </Switch>\n    <Switch size="lg">\n      Label\n    </Switch>\n  </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,i.jsxs)(n.h3,{id:"states",children:["States",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(c.Z,{component:states,file:{data:'import { Flex, Stack, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack spacing="6x">\n      <Flex columnGap="6x">\n        <Switch checked={false}>\n          Label\n        </Switch>\n        <Switch checked={true}>\n          Label\n        </Switch>\n      </Flex>\n      <Flex columnGap="6x">\n        <Switch checked={false} disabled>\n          Label\n        </Switch>\n        <Switch checked={true} disabled>\n          Label\n        </Switch>\n      </Flex>\n    </Stack>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Stack, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack spacing="6x">\n      <Flex columnGap="6x">\n        <Switch checked={false}>\n          Label\n        </Switch>\n        <Switch checked={true}>\n          Label\n        </Switch>\n      </Flex>\n      <Flex columnGap="6x">\n        <Switch checked={false} disabled>\n          Label\n        </Switch>\n        <Switch checked={true} disabled>\n          Label\n        </Switch>\n      </Flex>\n    </Stack>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,i.jsxs)(n.h2,{id:"accessibility",children:["Accessibility",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#accessibility",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["WAI-ARIA: ",(0,i.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/switch/",children:"https://www.w3.org/WAI/ARIA/apg/patterns/switch/"})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",(0,i.jsx)(n.code,{children:"<label>"})," element."]}),"\n",(0,i.jsxs)(n.li,{children:["When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",(0,i.jsx)(n.code,{children:"aria-label"}),", ",(0,i.jsx)(n.code,{children:"aria-labelledby"}),", ",(0,i.jsx)(n.code,{children:"title"}),") via the ",(0,i.jsx)(n.code,{children:"inputProps"})," prop."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{disabled:!0,children:(0,i.jsx)(n.code,{className:"language-jsx",children:"<Switch\n  inputProps={{\n    'aria-label': 'Label',\n  }}\n/>\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"commonly-asked-questions",children:["Commonly Asked Questions",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#commonly-asked-questions",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"how-to-obtain-and-interact-with-the-input-element",children:["How to obtain and interact with the input element?",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#how-to-obtain-and-interact-with-the-input-element",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["To access the input element within the ",(0,i.jsx)(n.code,{children:"Switch"})," component, you can make use of the ",(0,i.jsx)(n.code,{children:"inputRef"})," prop. This prop allows you to acquire a reference to the input element, enabling you to interact with it."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have obtained the reference to the input element, you can access its properties and methods. For instance, you can use the ",(0,i.jsx)(n.code,{children:"checked"})," property to retrieve the current checked state of the input element. Additionally, if you need to focus on the input element programmatically, you can utilize the ",(0,i.jsx)(n.code,{children:"focus()"})," method available on the input element reference."]}),"\n",(0,i.jsxs)(n.p,{children:["Here's an example of how you can utilize the ",(0,i.jsx)(n.code,{children:"inputRef"})," prop to access the input element and perform actions:"]}),"\n",(0,i.jsx)(c.Z,{component:faq_input_element,file:{data:"import { Button, Flex, Switch } from '@tonic-ui/react';\nimport React, { useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n\n  const handleClick = () => {\n    const inputEl = inputRef?.current;\n    if (inputEl) {\n      inputEl.focus();\n      window.alert('The switch toggle is ' + (inputEl.checked ? 'on' : 'off'));\n    }\n  };\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Switch defaultChecked inputRef={inputRef}>\n        Label\n      </Switch>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:"import { Button, Flex, Switch } from '@tonic-ui/react';\nimport React, { useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n\n  const handleClick = () => {\n    const inputEl = inputRef?.current;\n    if (inputEl) {\n      inputEl.focus();\n      window.alert('The switch toggle is ' + (inputEl.checked ? 'on' : 'off'));\n    }\n  };\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Switch defaultChecked inputRef={inputRef}>\n        Label\n      </Switch>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",title:"Tonic UI"}}),"\n",(0,i.jsxs)(n.h2,{id:"props",children:["Props",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"switch-1",children:["Switch",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#switch-1",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{align:"left",children:"Name"}),(0,i.jsx)(n.th,{align:"left",children:"Type"}),(0,i.jsx)(n.th,{align:"left",children:"Default"}),(0,i.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"checked"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", the switch will be selected. Use the ",(0,i.jsx)(n.code,{children:"onChange"})," prop to update the state for a controlled component."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"children"}),(0,i.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The content within the switch component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"defaultChecked"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", the switch will be selected initially."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"disabled"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", disables the switch and prevents user interaction."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"id"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["The ",(0,i.jsx)(n.code,{children:"id"})," attribute of the input field."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"inputProps"}),(0,i.jsx)(n.td,{align:"left",children:"object"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"Additional props to be applied to the input element."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"inputRef"}),(0,i.jsx)(n.td,{align:"left",children:"RefObject"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A ref object to access the input element."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"name"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The name of the switch input when used within a form."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onBlur"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch loses focus."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onChange"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the state of the switch changes."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onClick"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch is clicked."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onFocus"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch receives focus."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"size"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left",children:"'md'"}),(0,i.jsx)(n.td,{align:"left",children:"The size of the switch. One of: 'sm', 'md', 'lg'"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"value"}),(0,i.jsx)(n.td,{align:"left",children:"string | boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The value of the switch input. This is the return value for form submissions."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"variantColor"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left",children:"'blue'"}),(0,i.jsx)(n.td,{align:"left",children:"The color of the switch when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')"})]})]})]})]})}var index_page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},83449:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var i=t(67569),l=t(49427),c=t(5632),r=t(2784),a=t(85175),o=t(82821),s=t(90622),d=t(52057),h=t(63651),x=["size"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e}).apply(this,arguments)}var u=(0,r.forwardRef)(function(e,n){var t=e.size,l=function(e,n){if(null==e)return{};var t,i,l=function(e,n){if(null==e)return{};var t,i,l={},c=Object.keys(e);for(i=0;i<c.length;i++)t=c[i],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(i=0;i<c.length;i++)t=c[i],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}(e,x);return r.createElement(i.SVGIcon,_extends({size:t,viewBox:"0 0 1024 1024"},l),r.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});u.displayName="CodeSandboxIcon";var p=t(94981);function _slicedToArray(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t,i,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var c=[],r=!0,a=!1;try{for(l=l.call(e);!(r=(t=l.next()).done)&&(c.push(t.value),!n||c.length!==n);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw i}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _arrayLikeToArray(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=Array(n);t<n;t++)i[t]=e[t];return i}var f={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},Demo=function(e){var n=e.component,t=e.file,x=e.sandbox,m=(0,c.useRouter)(),j=_slicedToArray((0,r.useReducer)(function(e){return!e},!1),2),g=j[0],w=j[1],b=_slicedToArray((0,i.useColorMode)(),1)[0],k={dark:s.y,light:s.q}[b],S=_slicedToArray((0,l.useToggle)(!1),2),y=S[0],v=S[1],C=(0,o.Z)(null==t?void 0:t.data),E=C.onCopy,A=C.hasCopied,F=(0,r.useCallback)(function(){E()},[E]),L=(0,r.useCallback)(function(){(0,d.b)(x)},[x]),T=(0,r.useCallback)(function(){w(),v(!1)},[w,v]);return r.createElement(a.nu,{code:null==t?void 0:t.data,disabled:!0,language:"jsx",theme:k},r.createElement(i.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[b],p:"4x"},r.createElement(i.Box,{fontSize:"sm",lineHeight:"sm"},r.createElement(r.Fragment,{key:g},r.createElement(n,null)))),r.createElement(i.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},r.createElement(p.Z,{"data-track":y?"CodeBlock|hide_source|".concat((0,h.Z)({path:m.pathname})):"CodeBlock|show_source|".concat((0,h.Z)({path:m.pathname})),onClick:v},r.createElement(i.Tooltip,{label:y?"Hide the source":"Show the source"},r.createElement(i.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),r.createElement(p.Z,{"data-track":"CodeBlock|copy_source|".concat((0,h.Z)({path:m.pathname})),onClick:F},r.createElement(i.Tooltip,{label:A?"Copied":"Copy the source"},r.createElement(i.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),r.createElement(p.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(m.pathname),onClick:L},r.createElement(i.Tooltip,{label:"Edit in CodeSandbox"},r.createElement(u,{size:{sm:"5x",md:"4x"}}))),r.createElement(p.Z,{"data-track":"CodeBlock|reset|".concat(m.pathname),onClick:T},r.createElement(i.Tooltip,{label:"Reset the demo"},r.createElement(i.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),r.createElement(i.Fade,{in:y},r.createElement(i.Collapse,{in:y,unmountOnExit:!0},r.createElement(a.uz,{style:f}))))};Demo.displayName="Demo";var m=Demo},20501:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/switch",function(){return t(60968)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=20501)}),_N_E=e.O()}]);