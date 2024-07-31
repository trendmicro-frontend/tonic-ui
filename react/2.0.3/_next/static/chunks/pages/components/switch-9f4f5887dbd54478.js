(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3733],{87558:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return w}});var i=t(52322),l=t(45392),c=t(96835),r=t(73645),a=t(99291),o=t(62080),s=t(2784),d=function(){var e=(0,s.useRef)(),n=(0,s.useCallback)(function(){var n=null==e?void 0:e.current;n&&(n.focus(),window.alert("The switch toggle is "+(n.checked?"on":"off")))},[]);return s.createElement(r.Z,{alignItems:"center",columnGap:"6x"},s.createElement(a.Z,{defaultChecked:!0,inputRef:e},"Label"),s.createElement(o.Z,{onClick:n},"Click Me"))},h=t(61619),u=function(){return s.createElement(h.Z,{spacing:"6x"},s.createElement(r.Z,{columnGap:"6x"},s.createElement(a.Z,{checked:!1},"Label"),s.createElement(a.Z,{checked:!0},"Label")),s.createElement(r.Z,{columnGap:"6x"},s.createElement(a.Z,{checked:!1,disabled:!0},"Label"),s.createElement(a.Z,{checked:!0,disabled:!0},"Label")))},f=function(){return s.createElement(r.Z,{columnGap:"6x"},s.createElement(a.Z,{size:"sm"},"Label"),s.createElement(a.Z,{size:"md"},"Label"),s.createElement(a.Z,{size:"lg"},"Label"))},x=function(){return s.createElement(r.Z,{columnGap:"6x"},s.createElement(a.Z,{variantColor:"red",defaultChecked:!0},"Label"),s.createElement(a.Z,{variantColor:"green",defaultChecked:!0},"Label"))},p=t(49857),m=t(70758),g=function(){return s.createElement(r.Z,{alignItems:"flex-start",columnGap:"2x"},s.createElement(a.Z,{id:"form-control"}),s.createElement(p.Z,{as:"label",htmlFor:"form-control",sx:{cursor:"pointer",pt:"1x",userSelect:"none"}},s.createElement(m.Z,null,"Label"),s.createElement(m.Z,{fontSize:"xs",lineHeight:"xs"},"Helper text")))},j=function(){return s.createElement(a.Z,null,"Label")};function b(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,l.ah)(),e.components);return(0,i.jsxs)(n.div,{className:"main-content",children:["\n","\n","\n","\n","\n","\n","\n",(0,i.jsx)(n.h1,{id:"switch",children:"Switch"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"Switch"})," component is used as an alternative to the ",(0,i.jsx)(n.a,{href:"checkbox",children:"Checkbox"})," component. You can use it to render a single option that can be turned on or off."]}),"\n",(0,i.jsxs)(n.h2,{id:"import",children:["Import",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { Switch } from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"usage",children:["Usage",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"basic",children:["Basic",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#basic",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:j,file:{data:"import { Switch } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  return (\n    <Switch>\n      Label\n    </Switch>\n  );\n};\n\nexport default App;",path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:"import { Switch } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => {\n  return (\n    <Switch>\n      Label\n    </Switch>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})),"\n",(0,i.jsx)(n.p,{children:"You can use a flex container to align a switch with other components. This allows you to easily control the positioning and spacing of all elements within the container."}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:g,file:{data:'import { Box, Flex, Switch, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex alignItems="flex-start" columnGap="2x">\n      <Switch id="form-control" />\n      <Box\n        as="label"\n        htmlFor="form-control"\n        sx={{\n          cursor: \'pointer\',\n          pt: \'1x\',\n          userSelect: \'none\',\n        }}\n      >\n        <Text>Label</Text>\n        <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n      </Box>\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Flex, Switch, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex alignItems="flex-start" columnGap="2x">\n      <Switch id="form-control" />\n      <Box\n        as="label"\n        htmlFor="form-control"\n        sx={{\n          cursor: \'pointer\',\n          pt: \'1x\',\n          userSelect: \'none\',\n        }}\n      >\n        <Text>Label</Text>\n        <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n      </Box>\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,i.jsxs)(n.h3,{id:"colors",children:["Colors",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of a radio button. ",(0,i.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,i.jsx)(n.code,{children:"50"})," (hover) or ",(0,i.jsx)(n.code,{children:"60"})," (checked) that exist in ",(0,i.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:x,file:{data:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex columnGap="6x">\n      <Switch variantColor="red" defaultChecked>\n        Label\n      </Switch>\n      <Switch variantColor="green" defaultChecked>\n        Label\n      </Switch>\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Flex columnGap="6x">\n      <Switch variantColor="red" defaultChecked>\n        Label\n      </Switch>\n      <Switch variantColor="green" defaultChecked>\n        Label\n      </Switch>\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,i.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"size"})," prop to change the size of the switch. You can set the value to ",(0,i.jsx)(n.code,{children:"sm"}),", ",(0,i.jsx)(n.code,{children:"md"}),", or ",(0,i.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:f,file:{data:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n  <Flex columnGap="6x">\n    <Switch size="sm">\n      Label\n    </Switch>\n    <Switch size="md">\n      Label\n    </Switch>\n    <Switch size="lg">\n      Label\n    </Switch>\n  </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n  <Flex columnGap="6x">\n    <Switch size="sm">\n      Label\n    </Switch>\n    <Switch size="md">\n      Label\n    </Switch>\n    <Switch size="lg">\n      Label\n    </Switch>\n  </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,i.jsxs)(n.h3,{id:"states",children:["States",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:u,file:{data:'import { Flex, Stack, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack spacing="6x">\n      <Flex columnGap="6x">\n        <Switch checked={false}>\n          Label\n        </Switch>\n        <Switch checked={true}>\n          Label\n        </Switch>\n      </Flex>\n      <Flex columnGap="6x">\n        <Switch checked={false} disabled>\n          Label\n        </Switch>\n        <Switch checked={true} disabled>\n          Label\n        </Switch>\n      </Flex>\n    </Stack>\n  );\n};\n\nexport default App;',path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:'import { Flex, Stack, Switch } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => {\n  return (\n    <Stack spacing="6x">\n      <Flex columnGap="6x">\n        <Switch checked={false}>\n          Label\n        </Switch>\n        <Switch checked={true}>\n          Label\n        </Switch>\n      </Flex>\n      <Flex columnGap="6x">\n        <Switch checked={false} disabled>\n          Label\n        </Switch>\n        <Switch checked={true} disabled>\n          Label\n        </Switch>\n      </Flex>\n    </Stack>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,i.jsxs)(n.h2,{id:"accessibility",children:["Accessibility",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#accessibility",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["WAI-ARIA: ",(0,i.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/switch/",children:"https://www.w3.org/WAI/ARIA/apg/patterns/switch/"})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",(0,i.jsx)(n.code,{children:"<label>"})," element."]}),"\n",(0,i.jsxs)(n.li,{children:["When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",(0,i.jsx)(n.code,{children:"aria-label"}),", ",(0,i.jsx)(n.code,{children:"aria-labelledby"}),", ",(0,i.jsx)(n.code,{children:"title"}),") via the ",(0,i.jsx)(n.code,{children:"inputProps"})," prop."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{disabled:!0,children:(0,i.jsx)(n.code,{className:"language-jsx",children:"<Switch\n  inputProps={{\n    'aria-label': 'Label',\n  }}\n/>\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"commonly-asked-questions",children:["Commonly Asked Questions",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#commonly-asked-questions",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"how-to-obtain-and-interact-with-the-input-element",children:["How to obtain and interact with the input element?",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#how-to-obtain-and-interact-with-the-input-element",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["To access the input element within the ",(0,i.jsx)(n.code,{children:"Switch"})," component, you can make use of the ",(0,i.jsx)(n.code,{children:"inputRef"})," prop. This prop allows you to acquire a reference to the input element, enabling you to interact with it."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have obtained the reference to the input element, you can access its properties and methods. For instance, you can use the ",(0,i.jsx)(n.code,{children:"checked"})," property to retrieve the current checked state of the input element. Additionally, if you need to focus on the input element programmatically, you can utilize the ",(0,i.jsx)(n.code,{children:"focus()"})," method available on the input element reference."]}),"\n",(0,i.jsxs)(n.p,{children:["Here's an example of how you can utilize the ",(0,i.jsx)(n.code,{children:"inputRef"})," prop to access the input element and perform actions:"]}),"\n",(0,i.jsx)(c.Z,Object.assign({},{component:d,file:{data:"import { Button, Flex, Switch } from '@tonic-ui/react';\nimport React, { useCallback, useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n  const handleClick = useCallback(() => {\n    const inputEl = inputRef?.current;\n    if (inputEl) {\n      inputEl.focus();\n      window.alert('The switch toggle is ' + (inputEl.checked ? 'on' : 'off'));\n    }\n  }, []);\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Switch defaultChecked inputRef={inputRef}>\n        Label\n      </Switch>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",path:"pages/components/switch/index.page.mdx"},sandbox:{files:{},raw:"import { Button, Flex, Switch } from '@tonic-ui/react';\nimport React, { useCallback, useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n  const handleClick = useCallback(() => {\n    const inputEl = inputRef?.current;\n    if (inputEl) {\n      inputEl.focus();\n      window.alert('The switch toggle is ' + (inputEl.checked ? 'on' : 'off'));\n    }\n  }, []);\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Switch defaultChecked inputRef={inputRef}>\n        Label\n      </Switch>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})),"\n",(0,i.jsxs)(n.h2,{id:"props",children:["Props",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"switch-1",children:["Switch",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#switch-1",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{align:"left",children:"Name"}),(0,i.jsx)(n.th,{align:"left",children:"Type"}),(0,i.jsx)(n.th,{align:"left",children:"Default"}),(0,i.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"checked"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", the switch will be selected. Use the ",(0,i.jsx)(n.code,{children:"onChange"})," prop to update the state for a controlled component."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"children"}),(0,i.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The content within the switch component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"defaultChecked"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", the switch will be selected initially."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"disabled"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", disables the switch and prevents user interaction."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"id"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["The ",(0,i.jsx)(n.code,{children:"id"})," attribute of the input field."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"inputProps"}),(0,i.jsx)(n.td,{align:"left",children:"object"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"Additional props to be applied to the input element."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"inputRef"}),(0,i.jsx)(n.td,{align:"left",children:"RefObject"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["A ",(0,i.jsx)(n.code,{children:"ref"})," to access the input element."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"name"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The name of the switch input when used within a form."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onBlur"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch loses focus."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onChange"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the state of the switch changes."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onClick"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch is clicked."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onFocus"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback function invoked when the switch receives focus."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"size"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left",children:"'md'"}),(0,i.jsx)(n.td,{align:"left",children:"The size of the switch. One of: 'sm', 'md', 'lg'"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"value"}),(0,i.jsx)(n.td,{align:"left",children:"string | boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The value of the switch input. This is the return value for form submissions."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"variantColor"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left",children:"'blue'"}),(0,i.jsx)(n.td,{align:"left",children:"The color of the switch when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')"})]})]})]})]})}var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(b,e)})):b(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return R}});var i=t(27216),l=t(40596),c=t(49857),r=t(73645),a=t(99870),o=t(62272),s=t(14594),d=t(65019),h=t(37384),u=t(99554),f=t(69111),x=t(5632),p=t(2784),m=t(65245);function g(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=Array(n);t<n;t++)i[t]=e[t];return i}var j=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},b=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,p.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var i,l,c,r,a=[],o=!0,s=!1;try{for(c=(t=t.call(e)).next;!(o=(i=c.call(t)).done)&&(a.push(i.value),2!==a.length);o=!0);}catch(e){s=!0,l=e}finally{try{if(!o&&null!=t.return&&(r=t.return(),Object(r)!==r))return}finally{if(s)throw l}}return a}}(n,2)||function(e,n){if(e){if("string"==typeof e)return g(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),i=t[0],l=t[1];return{value:e,onCopy:function(){j(e),l(!0),setTimeout(function(){return l(!1)},1500)},hasCopied:i}},w=t(63768),k=t(76761),v=t(73205),y=t(98107),S=t(44285),Z=["component","defaultExpanded","expanded","file","sandbox"];function C(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var i,l,c,r,a=[],o=!0,s=!1;try{if(c=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;o=!1}else for(;!(o=(i=c.call(t)).done)&&(a.push(i.value),a.length!==n);o=!0);}catch(e){s=!0,l=e}finally{try{if(!o&&null!=t.return&&(r=t.return(),Object(r)!==r))return}finally{if(s)throw l}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return E(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return E(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=Array(n);t<n;t++)i[t]=e[t];return i}var A=function(e){var n,t=e.component,g=e.defaultExpanded,j=e.expanded,E=e.file,A=e.sandbox;!function(e,n){if(null!=e){var t,i,l=function(e,n){if(null==e)return{};var t,i,l={},c=Object.keys(e);for(i=0;i<c.length;i++)t=c[i],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(i=0;i<c.length;i++)t=c[i],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}}}(e,Z);var R=(0,x.useRouter)(),F=C((0,p.useReducer)(function(e){return!e},!1),2),I=F[0],z=F[1],L=(0,i.u)(),T=C((0,l.Z)(),1)[0],O={dark:k.y,light:k.q}[T],_=C((0,d.Z)(null!=j?j:void 0!==g&&g),2),B=_[0],N=_[1],H=b(null==E?void 0:E.data),G=H.onCopy,U=H.hasCopied,M=(0,p.useCallback)(function(){G()},[G]),P=(0,p.useCallback)(function(){(0,v.b)(A)},[A]),X=(0,p.useCallback)(function(){z(),N(!1)},[z,N]);return((0,p.useEffect)(function(){void 0!==j&&j!==B&&N(j)},[j,B,N]),t)?p.createElement(m.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:O},p.createElement(c.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[T],p:"4x"},p.createElement(c.Z,{fontSize:"sm",lineHeight:"sm"},p.createElement(p.Fragment,{key:I},p.createElement(t,null)))),p.createElement(r.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},p.createElement(S.Z,{"data-track":B?"CodeBlock|hide_source|".concat((0,y.Z)({path:R.pathname})):"CodeBlock|show_source|".concat((0,y.Z)({path:R.pathname})),onClick:N},p.createElement(a.Z,{label:B?"Hide the source":"Show the source"},p.createElement(h.Z,null))),p.createElement(S.Z,{"data-track":"CodeBlock|copy_source|".concat((0,y.Z)({path:R.pathname})),onClick:M},p.createElement(a.Z,{label:U?"Copied":"Copy the source"},p.createElement(u.Z,null))),p.createElement(S.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(R.pathname),onClick:P},p.createElement(a.Z,{label:"Edit in CodeSandbox"},p.createElement(w.Z,null))),p.createElement(S.Z,{"data-track":"CodeBlock|reset|".concat(R.pathname),onClick:X},p.createElement(a.Z,{label:"Reset the demo"},p.createElement(f.Z,null)))),p.createElement(o.Z,{in:B},p.createElement(s.Z,{in:B,unmountOnExit:!0},p.createElement(c.Z,{as:m.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==L?void 0:null===(n=L.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):p.createElement(m.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:O},p.createElement(c.Z,{as:m.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};A.displayName="Demo";var R=A},20501:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/switch",function(){return t(87558)}])},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}}),t(2784);var i=t(75928),l=t(52903),c=(0,i.Z)((0,l.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}}),t(2784);var i=t(75928),l=t(52903),c=(0,i.Z)((0,l.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")},99291:function(e,n,t){"use strict";t.d(n,{Z:function(){return w}});var i=t(53860),l=t(20325),c=t(13409),r=t(2784),a=t(81522),o=t(56818),s=t(83377),d=t(5081),h=t(40596),u="blue",f=t(27216),x=t(52903),p=t(49857),m=["size","variantColor","sx"],g=(0,r.forwardRef)(function(e,n){var t,l=e.size,c=void 0===l?"md":l,r=e.variantColor,a=void 0===r?u:r,g=e.sx,j=(0,i.Kd)(e,m),b=(0,f.u)(),w=(0,h.Z)(),k=(0,i.ZQ)(w,1)[0],v={sm:32,md:48,lg:64}[c],y={sm:16,md:24,lg:32}[c],S=v+6,Z=y+6,C=function(e){return'input[type="'.concat("checkbox",'"]')+(0,d.Zs)(e)+" + &"},E=function(e){return C(e)+"> [data-switch] > [data-switch-outer-border]"},A=function(e){return C(e)+"> [data-switch] > [data-switch-inner-border]"},R=function(e){return C(e)+"> [data-switch] > [data-switch-track]"},F=function(e){return C(e)+"> [data-switch] > [data-switch-thumb]"},I=function(e){var n,t;return null!==(n=null==b?void 0:null===(t=b.colors)||void 0===t?void 0:t[e])&&void 0!==n?n:e},z=(t={width:S,height:Z},(0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)((0,i._x)(t,C(":disabled"),{opacity:.28}),E(),{fill:"none"}),E(":focus-visible"),{fill:I({dark:"".concat(a,":60"),light:"".concat(a,":60")}[k])}),A(),{fill:"none"}),A(":focus-visible"),{fill:I({dark:"black",light:"white"}[k])}),R(),{fill:I({dark:"gray:60",light:"gray:30"}[k])}),R(":checked"),{fill:I({dark:"".concat(a,":60"),light:"".concat(a,":60")}[k])}),R(":hover:not(:disabled)"),{fill:I({dark:"gray:50",light:"gray:20"}[k])}),R(":checked:hover:not(:disabled)"),{fill:I({dark:"".concat(a,":50"),light:"".concat(a,":50")}[k])}),F(),{fill:I({dark:"white",light:"white"}[k])}),(0,i._x)(t,F(":checked"),{transform:"translateX(".concat(y,"px)")}));return(0,x.tZ)(p.Z,(0,i.Zj)((0,i.Zj)((0,i.Zj)({"aria-hidden":(0,o.Qm)(!0),role:"switch",sx:[z].concat((0,i.u)((0,d.rY)(g)))},{display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,userSelect:"none"}),j),{},{children:(0,x.BX)(p.Z,{as:"svg","data-switch":!0,width:"100%",height:"100%",viewBox:"0 0 ".concat(S," ").concat(Z),children:[(0,x.tZ)(p.Z,{as:"rect","data-switch-outer-border":!0,x:0,y:0,width:S,height:Z,rx:"".concat(Z/2),strokeWidth:0}),(0,x.tZ)(p.Z,{as:"rect","data-switch-inner-border":!0,x:2,y:2,width:S-4,height:Z-4,rx:(Z-4)/2,strokeWidth:0}),(0,x.tZ)(p.Z,{as:"rect","data-switch-track":!0,x:3,y:3,width:v,height:y,rx:y/2,pointerEvents:"all"}),(0,x.tZ)(p.Z,{as:"circle","data-switch-thumb":!0,cx:Z/2,cy:Z/2,r:{sm:6,md:9,lg:12}[c],transform:"translateX(0)",transformBox:"fill-box",transition:(0,s.zx)(["transform"],{duration:250})})]})}))});g.displayName="SwitchControlBox";var j=["checked","children","defaultChecked","disabled","id","inputProps","inputRef","name","onBlur","onChange","onClick","onFocus","size","value","variantColor"],b=(0,r.forwardRef)(function(e,n){var t=e.checked,o=e.children,s=e.defaultChecked,d=e.disabled,h=e.id,f=e.inputProps,m=e.inputRef,b=e.name,w=e.onBlur,k=e.onChange,v=e.onClick,y=e.onFocus,S=e.size,Z=e.value,C=e.variantColor,E=void 0===C?u:C,A=(0,i.Kd)(e,j),R=(0,r.useRef)(),F=(0,l.Z)(m,R);return(0,x.BX)(p.Z,(0,i.Zj)((0,i.Zj)((0,i.Zj)({as:"label",ref:n},{display:"inline-flex",verticalAlign:"top",alignItems:"center",cursor:d?"not-allowed":"pointer"}),A),{},{children:[(0,x.tZ)(a.Z,(0,i.Zj)({as:"input",checked:t,defaultChecked:s,disabled:d,id:h,name:b,onBlur:w,onChange:k,onClick:v,onFocus:y,ref:F,role:"switch",type:"checkbox",value:Z},f)),(0,x.tZ)(g,{size:void 0===S?"md":S,variantColor:E}),!(0,c.Rw)(o)&&(0,x.tZ)(p.Z,{ml:"2x",userSelect:"none",opacity:d?.28:1,children:o})]}))});b.displayName="Switch";var w=b},81522:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var i=t(53860),l=t(2784),c=t(52903),r=t(49857),a=(0,l.forwardRef)(function(e,n){return(0,c.tZ)(r.Z,(0,i.Zj)({ref:n,position:"absolute",width:1,height:1,padding:0,border:0,overflow:"hidden",clipPath:"inset(50%)",whiteSpace:"nowrap"},e))});a.displayName="VisuallyHidden";var o=a}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=20501)}),_N_E=e.O()}]);