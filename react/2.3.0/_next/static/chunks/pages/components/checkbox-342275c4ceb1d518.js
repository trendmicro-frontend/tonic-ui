(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4927],{63349:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var c=t(52322),o=t(45392),r=t(96835),l=t(73645),a=t(1847),i=t(62080),s=t(2784),d=function(){var e=(0,s.useRef)(),n=(0,s.useCallback)(function(){e.current.focus(),console.log(e.current.checked)},[]);return s.createElement(l.Z,{alignItems:"center",columnGap:"6x"},s.createElement(a.Z,{defaultChecked:!0,inputRef:e},"Label"),s.createElement(i.Z,{onClick:n},"Click Me"))},h=t(61619);function u(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,c=Array(n);t<n;t++)c[t]=e[t];return c}var x=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,s.useState)([!0,!1]))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var c,o,r,l,a=[],i=!0,s=!1;try{for(r=(t=t.call(e)).next;!(i=(c=r.call(t)).done)&&(a.push(c.value),2!==a.length);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(e,2)||function(e,n){if(e){if("string"==typeof e)return u(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],c=n[1],o=t.every(Boolean),r=t.some(Boolean)&&!o;return s.createElement(s.Fragment,null,s.createElement(a.Z,{checked:o,indeterminate:r,onChange:function(e){return c([e.target.checked,e.target.checked])}},"Parent"),s.createElement(h.Z,{direction:"column",pl:"6x",mt:"1x",spacing:"1x",shouldWrapChildren:!0},s.createElement(a.Z,{checked:t[0],onChange:function(e){return c([e.target.checked,t[1]])}},"Child 1"),s.createElement(a.Z,{checked:t[1],onChange:function(e){return c([t[0],e.target.checked])}},"Child 2")))},f=function(){return s.createElement(h.Z,{spacing:"6x"},s.createElement(l.Z,{columnGap:"6x"},s.createElement(a.Z,null,"Label"),s.createElement(a.Z,{indeterminate:!0},"Label"),s.createElement(a.Z,{defaultChecked:!0},"Label")),s.createElement(l.Z,{columnGap:"6x"},s.createElement(a.Z,{disabled:!0},"Label"),s.createElement(a.Z,{disabled:!0,indeterminate:!0},"Label"),s.createElement(a.Z,{disabled:!0,defaultChecked:!0},"Label")))},m=function(){return s.createElement(l.Z,{columnGap:"6x"},s.createElement(a.Z,{size:"sm"},"Label"),s.createElement(a.Z,{size:"md"},"Label"),s.createElement(a.Z,{size:"lg"},"Label"))},p=function(){return s.createElement(l.Z,{columnGap:"6x"},s.createElement(a.Z,{variantColor:"red",defaultChecked:!0},"Label"),s.createElement(a.Z,{variantColor:"green",defaultChecked:!0},"Label"))},b=t(49857),k=t(70758),g=function(){return s.createElement(l.Z,{alignItems:"flex-start",columnGap:"2x"},s.createElement(b.Z,{py:"1h"},s.createElement(a.Z,{id:"form-control"})),s.createElement(b.Z,{as:"label",htmlFor:"form-control",sx:{cursor:"pointer",userSelect:"none"}},s.createElement(k.Z,null,"Label"),s.createElement(k.Z,{fontSize:"xs",lineHeight:"xs"},"Helper text")))},C=function(){return s.createElement(a.Z,null,"Label")};function j(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,c.jsxs)(n.div,{className:"main-content",children:["\n","\n","\n","\n","\n","\n","\n","\n",(0,c.jsx)(n.h1,{id:"checkbox",children:"Checkbox"}),"\n",(0,c.jsxs)(n.p,{children:["Use a ",(0,c.jsx)(n.code,{children:"Checkbox"})," in forms when a user needs to select multiple values from a list of options."]}),"\n",(0,c.jsxs)(n.p,{children:["Since native HTML checkboxes are 100% accessible by default, a common ",(0,c.jsx)(n.a,{href:"https://dev.to/lkopacz/create-custom-keyboard-accessible-checkboxes-2036",children:"CSS technique"})," is used to style checkboxes."]}),"\n",(0,c.jsxs)(n.h2,{id:"import",children:["Import",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-js",children:"import { Checkbox } from '@tonic-ui/react';\n"})}),"\n",(0,c.jsxs)(n.h2,{id:"usage",children:["Usage",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:C,file:{data:"import { Checkbox } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Checkbox>\n    Label\n  </Checkbox>\n);\n\nexport default App;",path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:"import { Checkbox } from '@tonic-ui/react';\nimport React from 'react';\n\nconst App = () => (\n  <Checkbox>\n    Label\n  </Checkbox>\n);\n\nexport default App;",title:"Tonic UI"}})),"\n",(0,c.jsx)(n.p,{children:"You can use a flex container to align a checkbox with other components. This allows you to easily control the positioning and spacing of all elements within the container."}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:g,file:{data:'import { Box, Checkbox, Flex, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex alignItems="flex-start" columnGap="2x">\n    <Box py="1h">\n      <Checkbox id="form-control" />\n    </Box>\n    <Box\n      as="label"\n      htmlFor="form-control"\n      sx={{\n        cursor: \'pointer\',\n        userSelect: \'none\',\n      }}\n    >\n      <Text>Label</Text>\n      <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n    </Box>\n  </Flex>\n);\n\nexport default App;',path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:'import { Box, Checkbox, Flex, Text } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex alignItems="flex-start" columnGap="2x">\n    <Box py="1h">\n      <Checkbox id="form-control" />\n    </Box>\n    <Box\n      as="label"\n      htmlFor="form-control"\n      sx={{\n        cursor: \'pointer\',\n        userSelect: \'none\',\n      }}\n    >\n      <Text>Label</Text>\n      <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n    </Box>\n  </Flex>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h3,{id:"colors",children:["Colors",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["Use the ",(0,c.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of the checkbox. ",(0,c.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,c.jsx)(n.code,{children:"50"})," (hover) or ",(0,c.jsx)(n.code,{children:"60"})," (checked, active) that exist in ",(0,c.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:p,file:{data:'import { Checkbox, Flex } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex columnGap="6x">\n    <Checkbox variantColor="red" defaultChecked>\n      Label\n    </Checkbox>\n    <Checkbox variantColor="green" defaultChecked>\n      Label\n    </Checkbox>\n  </Flex>\n);\n\nexport default App;',path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:'import { Checkbox, Flex } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex columnGap="6x">\n    <Checkbox variantColor="red" defaultChecked>\n      Label\n    </Checkbox>\n    <Checkbox variantColor="green" defaultChecked>\n      Label\n    </Checkbox>\n  </Flex>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["Use the ",(0,c.jsx)(n.code,{children:"size"})," prop to change the size of the checkbox. You can set the value to ",(0,c.jsx)(n.code,{children:"sm"}),", ",(0,c.jsx)(n.code,{children:"md"}),", or ",(0,c.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:m,file:{data:'import { Checkbox, Flex } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex columnGap="6x">\n    <Checkbox size="sm">\n      Label\n    </Checkbox>\n    <Checkbox size="md">\n      Label\n    </Checkbox>\n    <Checkbox size="lg">\n      Label\n    </Checkbox>\n  </Flex>\n);\n\nexport default App;',path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:'import { Checkbox, Flex } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Flex columnGap="6x">\n    <Checkbox size="sm">\n      Label\n    </Checkbox>\n    <Checkbox size="md">\n      Label\n    </Checkbox>\n    <Checkbox size="lg">\n      Label\n    </Checkbox>\n  </Flex>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h3,{id:"states",children:["States",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:f,file:{data:'import { Checkbox, Flex, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack spacing="6x">\n    <Flex columnGap="6x">\n      <Checkbox>\n        Label\n      </Checkbox>\n      <Checkbox indeterminate>\n        Label\n      </Checkbox>\n      <Checkbox defaultChecked>\n        Label\n      </Checkbox>\n    </Flex>\n    <Flex columnGap="6x">\n      <Checkbox disabled>\n        Label\n      </Checkbox>\n      <Checkbox disabled indeterminate>\n        Label\n      </Checkbox>\n      <Checkbox disabled defaultChecked>\n        Label\n      </Checkbox>\n    </Flex>\n  </Stack>\n);\n\nexport default App;',path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:'import { Checkbox, Flex, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack spacing="6x">\n    <Flex columnGap="6x">\n      <Checkbox>\n        Label\n      </Checkbox>\n      <Checkbox indeterminate>\n        Label\n      </Checkbox>\n      <Checkbox defaultChecked>\n        Label\n      </Checkbox>\n    </Flex>\n    <Flex columnGap="6x">\n      <Checkbox disabled>\n        Label\n      </Checkbox>\n      <Checkbox disabled indeterminate>\n        Label\n      </Checkbox>\n      <Checkbox disabled defaultChecked>\n        Label\n      </Checkbox>\n    </Flex>\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h3,{id:"indeterminate",children:["Indeterminate",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#indeterminate",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:x,file:{data:'import { Checkbox, Stack } from \'@tonic-ui/react\';\nimport React, { useState } from \'react\';\n\nconst App = () => {\n  const [checkedItems, setCheckedItems] = useState([true, false]);\n  const allChecked = checkedItems.every(Boolean);\n  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;\n\n  return (\n    <>\n      <Checkbox\n        checked={allChecked}\n        indeterminate={isIndeterminate}\n        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}\n      >\n        Parent\n      </Checkbox>\n      <Stack direction="column" pl="6x" mt="1x" spacing="1x" shouldWrapChildren>\n        <Checkbox\n          checked={checkedItems[0]}\n          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}\n        >\n          Child 1\n        </Checkbox>\n        <Checkbox\n          checked={checkedItems[1]}\n          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}\n        >\n          Child 2\n        </Checkbox>\n      </Stack>\n    </>\n  );\n};\n\nexport default App;',path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:'import { Checkbox, Stack } from \'@tonic-ui/react\';\nimport React, { useState } from \'react\';\n\nconst App = () => {\n  const [checkedItems, setCheckedItems] = useState([true, false]);\n  const allChecked = checkedItems.every(Boolean);\n  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;\n\n  return (\n    <>\n      <Checkbox\n        checked={allChecked}\n        indeterminate={isIndeterminate}\n        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}\n      >\n        Parent\n      </Checkbox>\n      <Stack direction="column" pl="6x" mt="1x" spacing="1x" shouldWrapChildren>\n        <Checkbox\n          checked={checkedItems[0]}\n          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}\n        >\n          Child 1\n        </Checkbox>\n        <Checkbox\n          checked={checkedItems[1]}\n          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}\n        >\n          Child 2\n        </Checkbox>\n      </Stack>\n    </>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h2,{id:"accessibility",children:["Accessibility",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#accessibility",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["WAI-ARIA: ",(0,c.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",children:"https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"})]}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",(0,c.jsx)(n.code,{children:"<label>"})," element."]}),"\n",(0,c.jsxs)(n.li,{children:["When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",(0,c.jsx)(n.code,{children:"aria-label"}),", ",(0,c.jsx)(n.code,{children:"aria-labelledby"}),", ",(0,c.jsx)(n.code,{children:"title"}),") via the ",(0,c.jsx)(n.code,{children:"inputProps"})," prop."]}),"\n"]}),"\n",(0,c.jsx)(n.pre,{disabled:!0,children:(0,c.jsx)(n.code,{className:"language-jsx",children:"<Checkbox\n  inputProps={{\n    'aria-label': 'Label',\n  }}\n/>\n"})}),"\n",(0,c.jsxs)(n.h2,{id:"commonly-asked-questions",children:["Commonly Asked Questions",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#commonly-asked-questions",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.h3,{id:"how-to-obtain-and-interact-with-the-input-element",children:["How to obtain and interact with the input element?",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#how-to-obtain-and-interact-with-the-input-element",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["To access the input element within the ",(0,c.jsx)(n.code,{children:"Checkbox"})," component, you can make use of the ",(0,c.jsx)(n.code,{children:"inputRef"})," prop. This prop allows you to acquire a reference to the input element, enabling you to interact with it."]}),"\n",(0,c.jsxs)(n.p,{children:["Once you have obtained the reference to the input element, you can access its properties and methods. For instance, you can use the ",(0,c.jsx)(n.code,{children:"checked"})," property to retrieve the current checked state of the input element. Additionally, if you need to focus on the input element programmatically, you can utilize the ",(0,c.jsx)(n.code,{children:"focus()"})," method available on the input element reference."]}),"\n",(0,c.jsxs)(n.p,{children:["Here's an example of how you can utilize the ",(0,c.jsx)(n.code,{children:"inputRef"})," prop to access the input element and perform actions:"]}),"\n",(0,c.jsx)(r.Z,Object.assign({},{component:d,file:{data:"import { Button, Checkbox, Flex } from '@tonic-ui/react';\nimport React, { useCallback, useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n  const handleClick = useCallback(() => {\n    inputRef.current.focus();\n    console.log(inputRef.current.checked); // => true\n  }, []);\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Checkbox defaultChecked inputRef={inputRef}>\n        Label\n      </Checkbox>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",path:"pages/components/checkbox/index.page.mdx"},sandbox:{files:{},raw:"import { Button, Checkbox, Flex } from '@tonic-ui/react';\nimport React, { useCallback, useRef } from 'react';\n\nconst App = () => {\n  const inputRef = useRef();\n  const handleClick = useCallback(() => {\n    inputRef.current.focus();\n    console.log(inputRef.current.checked); // => true\n  }, []);\n\n  return (\n    <Flex alignItems=\"center\" columnGap=\"6x\">\n      <Checkbox defaultChecked inputRef={inputRef}>\n        Label\n      </Checkbox>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n};\n\nexport default App;",title:"Tonic UI"}})),"\n",(0,c.jsxs)(n.h2,{id:"props",children:["Props",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.h3,{id:"checkbox-1",children:["Checkbox",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#checkbox-1",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{align:"left",children:"Name"}),(0,c.jsx)(n.th,{align:"left",children:"Type"}),(0,c.jsx)(n.th,{align:"left",children:"Default"}),(0,c.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"checked"}),(0,c.jsx)(n.td,{align:"left",children:"boolean"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["If ",(0,c.jsx)(n.code,{children:"true"}),", the checkbox will be selected. Use the ",(0,c.jsx)(n.code,{children:"onChange"})," prop to update the state for a controlled component."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"children"}),(0,c.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The content within the checkbox component."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"defaultChecked"}),(0,c.jsx)(n.td,{align:"left",children:"boolean"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["If ",(0,c.jsx)(n.code,{children:"true"}),", the checkbox will be selected initially."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"disabled"}),(0,c.jsx)(n.td,{align:"left",children:"boolean"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["If ",(0,c.jsx)(n.code,{children:"true"}),", disables the checkbox and prevents user interaction."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"id"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["The ",(0,c.jsx)(n.code,{children:"id"})," attribute of the input field."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"indeterminate"}),(0,c.jsx)(n.td,{align:"left",children:"boolean"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["If ",(0,c.jsx)(n.code,{children:"true"}),", the checkbox will be displayed in an indeterminate state. This only affects the icon shown inside the checkbox."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"inputProps"}),(0,c.jsx)(n.td,{align:"left",children:"object"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"Additional props to be applied to the input element."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"inputRef"}),(0,c.jsx)(n.td,{align:"left",children:"RefObject"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["A ",(0,c.jsx)(n.code,{children:"ref"})," to access the input element."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"name"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The name of the input field in the checkbox. The name is useful for form submissions."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"onBlur"}),(0,c.jsx)(n.td,{align:"left",children:"function"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox loses focus."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"onChange"}),(0,c.jsx)(n.td,{align:"left",children:"function"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"A callback function invoked when the state of the checkbox changes."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"onClick"}),(0,c.jsx)(n.td,{align:"left",children:"function"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox is clicked."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"onFocus"}),(0,c.jsx)(n.td,{align:"left",children:"function"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox receives focus."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"size"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left",children:"'md'"}),(0,c.jsx)(n.td,{align:"left",children:"The size of the checkbox. One of: 'sm', 'md', 'lg'"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"value"}),(0,c.jsx)(n.td,{align:"left",children:"string | number"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The value of the checkbox input. This is the return value for form submissions."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"variantColor"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left",children:"'blue'"}),(0,c.jsx)(n.td,{align:"left",children:"The color of the checkbox when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')"})]})]})]})]})}var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,c.jsx)(n,Object.assign({},e,{children:(0,c.jsx)(j,e)})):j(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return S}});var c=t(27216),o=t(40596),r=t(49857),l=t(73645),a=t(99870),i=t(62272),s=t(14594),d=t(65019),h=t(37384),u=t(99554),x=t(69111),f=t(5632),m=t(2784),p=t(65245);function b(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,c=Array(n);t<n;t++)c[t]=e[t];return c}var k=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},g=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,m.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var c,o,r,l,a=[],i=!0,s=!1;try{for(r=(t=t.call(e)).next;!(i=(c=r.call(t)).done)&&(a.push(c.value),2!==a.length);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(n,2)||function(e,n){if(e){if("string"==typeof e)return b(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return b(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),c=t[0],o=t[1];return{value:e,onCopy:function(){k(e),o(!0),setTimeout(function(){return o(!1)},1500)},hasCopied:c}},C=t(63768),j=t(76761),v=t(73205),y=t(98107),Z=t(44285),w=["component","defaultExpanded","expanded","file","sandbox"];function I(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var c,o,r,l,a=[],i=!0,s=!1;try{if(r=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(c=r.call(t)).done)&&(a.push(c.value),a.length!==n);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return E(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return E(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,c=Array(n);t<n;t++)c[t]=e[t];return c}var A=function(e){var n,t=e.component,b=e.defaultExpanded,k=e.expanded,E=e.file,A=e.sandbox;!function(e,n){if(null!=e){var t,c,o=function(e,n){if(null==e)return{};var t,c,o={},r=Object.keys(e);for(c=0;c<r.length;c++)t=r[c],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(c=0;c<r.length;c++)t=r[c],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,w);var S=(0,f.useRouter)(),R=I((0,m.useReducer)(function(e){return!e},!1),2),F=R[0],z=R[1],L=(0,c.u)(),T=I((0,o.Z)(),1)[0],B={dark:j.y,light:j.q}[T],O=I((0,d.Z)(null!=k?k:void 0!==b&&b),2),_=O[0],N=O[1],H=g(null==E?void 0:E.data),G=H.onCopy,P=H.hasCopied,U=(0,m.useCallback)(function(){G()},[G]),M=(0,m.useCallback)(function(){(0,v.b)(A)},[A]),W=(0,m.useCallback)(function(){z(),N(!1)},[z,N]);return((0,m.useEffect)(function(){void 0!==k&&k!==_&&N(k)},[k,_,N]),t)?m.createElement(p.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:B},m.createElement(r.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[T],p:"4x"},m.createElement(r.Z,{fontSize:"sm",lineHeight:"sm"},m.createElement(m.Fragment,{key:F},m.createElement(t,null)))),m.createElement(l.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},m.createElement(Z.Z,{"data-track":_?"CodeBlock|hide_source|".concat((0,y.Z)({path:S.pathname})):"CodeBlock|show_source|".concat((0,y.Z)({path:S.pathname})),onClick:N},m.createElement(a.Z,{label:_?"Hide the source":"Show the source"},m.createElement(h.Z,null))),m.createElement(Z.Z,{"data-track":"CodeBlock|copy_source|".concat((0,y.Z)({path:S.pathname})),onClick:U},m.createElement(a.Z,{label:P?"Copied":"Copy the source"},m.createElement(u.Z,null))),m.createElement(Z.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(S.pathname),onClick:M},m.createElement(a.Z,{label:"Edit in CodeSandbox"},m.createElement(C.Z,null))),m.createElement(Z.Z,{"data-track":"CodeBlock|reset|".concat(S.pathname),onClick:W},m.createElement(a.Z,{label:"Reset the demo"},m.createElement(x.Z,null)))),m.createElement(i.Z,{in:_},m.createElement(s.Z,{in:_,unmountOnExit:!0},m.createElement(r.Z,{as:p.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==L?void 0:null===(n=L.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):m.createElement(p.nu,{code:null==E?void 0:E.data,disabled:!0,language:"jsx",theme:B},m.createElement(r.Z,{as:p.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};A.displayName="Demo";var S=A},83345:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/checkbox",function(){return t(63349)}])},94581:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var c=t(2784),o=function(e,n){var t=(0,c.useRef)(!1),o=(0,c.useRef)(e);o.current=e,(0,c.useEffect)(function(){n&&!t.current&&("function"==typeof o.current&&o.current(),t.current=!0)},[n])}},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}}),t(2784);var c=t(75928),o=t(52903),r=(0,c.Z)((0,o.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}}),t(2784);var c=t(75928),o=t(52903),r=(0,c.Z)((0,o.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")},1847:function(e,n,t){"use strict";t.d(n,{Z:function(){return I}});var c=t(53860),o=t(20325),r=t(94581),l=t(13409),a=t(56818),i=t(5081),s=t(2784),d=t(98827),h=t(35353),u=t(40596),x=t(27216),f="blue",m=t(52903),p=t(95530),b=function(e){return(0,m.tZ)(p.Z,(0,c.Zj)((0,c.Zj)({viewBox:"0 0 16 16"},e),{},{children:(0,m.tZ)("g",{fill:"currentColor",children:(0,m.tZ)("path",{d:"M6 11.060l-3-3-1 1 4 4 9-9-1-1z"})})}))};b.displayName="IconChecked";var k=function(e){return(0,m.tZ)(p.Z,(0,c.Zj)((0,c.Zj)({viewBox:"0 0 24 24"},e),{},{children:(0,m.tZ)("g",{fill:"currentColor",children:(0,m.tZ)("rect",{height:"18",width:"18",x:"3",y:"3"})})}))};k.displayName="IconIndeterminate";var g=t(49857),C=["indeterminate","size","variantColor","sx"],j=(0,s.forwardRef)(function(e,n){var t,o,r,l,s,d,h,p,j,v,y,Z,w=e.indeterminate,I=e.size,E=void 0===I?"md":I,A=e.variantColor,S=void 0===A?f:A,R=e.sx,F=(0,c.Kd)(e,C),z=(0,x.u)().sizes,L=(0,u.Z)(),T=(0,c.ZQ)(L,1)[0],B={lg:z["6x"],md:z["4x"],sm:z["3x"]}[E],O=function(e){return'input[type="'.concat("checkbox",'"]')+(0,i.Zs)(e)+" + &"},_=(0,c.Zj)((0,c._x)((0,c._x)((0,c._x)({position:"relative",border:1,width:{lg:"6x",md:"4x",sm:"3x"}[E],height:{lg:"6x",md:"4x",sm:"3x"}[E],zIndex:0},O()+"> *",{opacity:0}),O(":checked")+"> *",{opacity:1}),O("[data-indeterminate]")+"> *",{opacity:1}),w?(t=({dark:"".concat(S,":60"),light:"".concat(S,":60")})[T],o=({dark:"".concat(S,":50"),light:"".concat(S,":50")})[T],r=({dark:"".concat(S,":50"),light:"".concat(S,":50")})[T],l=({dark:"".concat(S,":60"),light:"".concat(S,":60")})[T],(0,c._x)((0,c._x)((0,c._x)((0,c._x)({},O("[data-indeterminate]"),{borderColor:{dark:"gray:50",light:"gray:40"}[T],color:t}),O("[data-indeterminate]:hover:not(:disabled)"),{borderColor:r,color:o}),O("[data-indeterminate]:focus-visible"),{outlineColor:l,outlineStyle:"solid",outlineWidth:"1h"}),O("[data-indeterminate]:disabled"),{borderColor:{dark:"gray:60",light:"gray:40"}[T],color:{dark:"gray:60",light:"gray:40"}[T],opacity:.28})):(s=({dark:"white:emphasis",light:"white:emphasis"})[T],d="transparent",h=({dark:"".concat(S,":60"),light:"".concat(S,":60")})[T],p=({dark:"".concat(S,":50"),light:"".concat(S,":50")})[T],j=({dark:"".concat(S,":50"),light:"".concat(S,":50")})[T],v=({dark:"gray:60",light:"gray:40"})[T],y=({dark:"".concat(S,":60"),light:"".concat(S,":60")})[T],Z=({dark:"".concat(S,":60"),light:"".concat(S,":60")})[T],(0,c._x)((0,c._x)((0,c._x)((0,c._x)((0,c._x)((0,c._x)((0,c._x)((0,c._x)({backgroundColor:d,borderColor:{dark:"gray:50",light:"gray:40"}[T],color:s},O(":hover"),{backgroundColor:d,borderColor:j,color:s}),O(":disabled"),{backgroundColor:d,borderColor:v,color:s,opacity:.28}),O(":focus-visible"),{outlineColor:Z,outlineStyle:"solid",outlineWidth:"1h"}),O(":checked"),{backgroundColor:h,borderColor:y,color:s}),O(":checked:hover:not(:disabled)"),{backgroundColor:p,borderColor:j,color:s}),O(":checked:focus-visible"),{backgroundColor:"inherit",borderColor:"transparent",color:s}),O(":checked:focus-visible")+"> div:first-of-type",{backgroundColor:h}),O(":checked:disabled"),{backgroundColor:{dark:"gray:60",light:"gray:40"}[T],borderColor:v,color:{dark:"white:emphasis",light:"black:primary"}[T],opacity:.28})));return(0,m.tZ)(g.Z,(0,c.Zj)((0,c.Zj)((0,c.Zj)({"aria-hidden":(0,a.Qm)(!0),role:"checkbox",sx:[_].concat((0,c.u)((0,i.rY)(R)))},{display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,userSelect:"none"}),F),{},{children:w?(0,m.tZ)(k,{size:B}):(0,m.tZ)(b,{size:B})}))});j.displayName="CheckboxControlBox";var v=t(16301),y=function(){if(!s.useContext)throw Error("The `useContext` hook is not available with your React version.");return(0,s.useContext)(v.w)},Z=["checked","children","defaultChecked","disabled","id","indeterminate","inputProps","inputRef","name","onBlur","onChange","onClick","onFocus","size","value","variantColor"],w=(0,s.forwardRef)(function(e,n){var t,u,x=(0,d.Z)({props:e,name:"Checkbox"}),p=x.checked,b=x.children,k=x.defaultChecked,C=x.disabled,v=x.id,w=x.indeterminate,I=x.inputProps,E=x.inputRef,A=x.name,S=x.onBlur,R=x.onChange,F=x.onClick,z=x.onFocus,L=x.size,T=x.value,B=x.variantColor,O=(0,c.Kd)(x,Z),_=p,N=C,H=A,G=R,P=L,U=B,M=(0,s.useRef)(),W=(0,o.Z)(E,M),q=y(),X="";if(q){var Y,D,Q,$,K,V,J=(0,c.Zj)({},q),ee=J.disabled,en=J.name,et=J.size,ec=J.value,eo=J.variantColor,er=J.onChange;void 0!==ec&&(_=(0,i.rY)(ec).includes(T)),N=null!==(Y=N)&&void 0!==Y?Y:ee,(0,l.Rw)(H)||(0,l.Rw)(en)||H===en||(X='Warning: The `Checkbox` has a `name` prop ("'.concat(H,'") that conflicts with the `CheckboxGroup`\'s `name` prop ("').concat(en,'")')),H=null!==(D=H)&&void 0!==D?D:en,G=(0,a.PP)(G,er),P=null!==(Q=null!==($=P)&&void 0!==$?$:et)&&void 0!==Q?Q:"md",U=null!==(K=null!==(V=U)&&void 0!==V?V:eo)&&void 0!==K?K:f}else P=null!==(t=P)&&void 0!==t?t:"md",U=null!==(u=U)&&void 0!==u?u:f;(0,r.Z)(function(){},[!!X]);var el={display:"inline-flex",verticalAlign:"top",alignItems:"center",cursor:N?"not-allowed":"pointer"};return(0,m.BX)(g.Z,(0,c.Zj)((0,c.Zj)((0,c.Zj)({as:"label",ref:n},el),O),{},{children:[(0,m.tZ)(h.Z,(0,c.Zj)({as:"input",checked:_,"data-indeterminate":(0,a.PB)(w),defaultChecked:k,disabled:N,id:v,name:H,onBlur:S,onChange:G,onClick:F,onFocus:z,ref:W,type:"checkbox",value:T},I)),(0,m.tZ)(j,{indeterminate:w,size:P,variantColor:U}),!(0,l.Rw)(b)&&(0,m.tZ)(g.Z,{ml:"2x",userSelect:"none",opacity:N?.28:1,children:b})]}))});w.displayName="Checkbox";var I=w},16301:function(e,n,t){"use strict";t.d(n,{w:function(){return c}});var c=(0,t(2784).createContext)()},35353:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var c=t(53860),o=t(2784),r=t(98827),l=t(52903),a=t(49857),i=(0,o.forwardRef)(function(e,n){var t=(0,r.Z)({props:e,name:"VisuallyHidden"});return(0,l.tZ)(a.Z,(0,c.Zj)((0,c.Zj)({ref:n},{position:"absolute",width:1,height:1,padding:0,border:0,overflow:"hidden",clipPath:"inset(50%)",whiteSpace:"nowrap"}),t))});i.displayName="VisuallyHidden";var s=i}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=83345)}),_N_E=e.O()}]);