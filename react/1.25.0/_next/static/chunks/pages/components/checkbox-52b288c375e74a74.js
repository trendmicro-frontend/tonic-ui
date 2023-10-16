(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4927],{13818:function(e,n,l){"use strict";l.r(n);var t=l(52322),i=l(45392);function c(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,i.ah)(),e.components);return(0,t.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,t.jsx)(n.h1,{id:"checkbox",children:"Checkbox"}),"\n",(0,t.jsxs)(n.p,{children:["Use a ",(0,t.jsx)(n.code,{children:"Checkbox"})," in forms when a user needs to select multiple values from a list of options."]}),"\n",(0,t.jsxs)(n.p,{children:["Since native HTML checkboxes are 100% accessible by default, a common ",(0,t.jsx)(n.a,{href:"https://dev.to/lkopacz/create-custom-keyboard-accessible-checkboxes-2036",children:"CSS technique"})," is used to style checkboxes."]}),"\n",(0,t.jsxs)(n.h2,{id:"import",children:["Import",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { Checkbox } from '@tonic-ui/react';\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"usage",children:["Usage",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"<Checkbox>\n  Label\n</Checkbox>\n"})}),"\n",(0,t.jsx)(n.p,{children:"You can use a flex container to align a checkbox with other components. This allows you to easily control the positioning and spacing of all elements within the container."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Flex alignItems="flex-start" columnGap="2x">\n  <Box py="1h">\n    <Checkbox id="form-control" />\n  </Box>\n  <Box\n    as="label"\n    htmlFor="form-control"\n    sx={{\n      cursor: \'pointer\',\n      userSelect: \'none\',\n    }}\n  >\n    <Text>Label</Text>\n    <Text fontSize="xs" lineHeight="xs">Helper text</Text>\n  </Box>\n</Flex>\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"colors",children:["Colors",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["Use the ",(0,t.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of the checkbox. ",(0,t.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,t.jsx)(n.code,{children:"50"})," (hover) or ",(0,t.jsx)(n.code,{children:"60"})," (checked, active) that exist in ",(0,t.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Flex columnGap="6x">\n  <Checkbox variantColor="red" defaultChecked>\n    Label\n  </Checkbox>\n  <Checkbox variantColor="green" defaultChecked>\n    Label\n  </Checkbox>\n</Flex>\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["Use the ",(0,t.jsx)(n.code,{children:"size"})," prop to change the size of the checkbox. You can set the value to ",(0,t.jsx)(n.code,{children:"sm"}),", ",(0,t.jsx)(n.code,{children:"md"}),", or ",(0,t.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Flex columnGap="6x">\n  <Checkbox size="sm">\n    Label\n  </Checkbox>\n  <Checkbox size="md">\n    Label\n  </Checkbox>\n  <Checkbox size="lg">\n    Label\n  </Checkbox>\n</Flex>\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"states",children:["States",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Stack spacing="6x">\n  <Flex columnGap="6x">\n    <Checkbox>\n      Label\n    </Checkbox>\n    <Checkbox indeterminate>\n      Label\n    </Checkbox>\n    <Checkbox defaultChecked>\n      Label\n    </Checkbox>\n  </Flex>\n  <Flex columnGap="6x">\n    <Checkbox disabled>\n      Label\n    </Checkbox>\n    <Checkbox disabled indeterminate>\n      Label\n    </Checkbox>\n    <Checkbox disabled defaultChecked>\n      Label\n    </Checkbox>\n  </Flex>\n</Stack>\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"indeterminate",children:["Indeterminate",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#indeterminate",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'function IndeterminateExample() {\n  const [checkedItems, setCheckedItems] = React.useState([true, false]);\n  const allChecked = checkedItems.every(Boolean);\n  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;\n\n  return (\n    <>\n      <Checkbox\n        checked={allChecked}\n        indeterminate={isIndeterminate}\n        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}\n      >\n        Parent\n      </Checkbox>\n      <Stack direction="column" pl="6x" mt="1x" spacing="1x" shouldWrapChildren>\n        <Checkbox\n          checked={checkedItems[0]}\n          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}\n        >\n          Child 1\n        </Checkbox>\n        <Checkbox\n          checked={checkedItems[1]}\n          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}\n        >\n          Child 2\n        </Checkbox>\n      </Stack>\n    </>\n  );\n}\n'})}),"\n",(0,t.jsxs)(n.h2,{id:"accessibility",children:["Accessibility",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#accessibility",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["WAI-ARIA: ",(0,t.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",children:"https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",(0,t.jsx)(n.code,{children:"<label>"})," element."]}),"\n",(0,t.jsxs)(n.li,{children:["When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",(0,t.jsx)(n.code,{children:"aria-label"}),", ",(0,t.jsx)(n.code,{children:"aria-labelledby"}),", ",(0,t.jsx)(n.code,{children:"title"}),") via the ",(0,t.jsx)(n.code,{children:"inputProps"})," prop."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{disabled:!0,children:(0,t.jsx)(n.code,{className:"language-jsx",children:"<Checkbox\n  inputProps={{\n    'aria-label': 'Label',\n  }}\n/>\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"commonly-asked-questions",children:["Commonly Asked Questions",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#commonly-asked-questions",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.h3,{id:"how-to-obtain-and-interact-with-the-input-element",children:["How to obtain and interact with the input element?",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#how-to-obtain-and-interact-with-the-input-element",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["To access the input element within the ",(0,t.jsx)(n.code,{children:"Checkbox"})," component, you can make use of the ",(0,t.jsx)(n.code,{children:"inputRef"})," prop. This prop allows you to acquire a reference to the input element, enabling you to interact with it."]}),"\n",(0,t.jsxs)(n.p,{children:["Once you have obtained the reference to the input element, you can access its properties and methods. For instance, you can use the ",(0,t.jsx)(n.code,{children:"checked"})," property to retrieve the current checked state of the input element. Additionally, if you need to focus on the input element programmatically, you can utilize the ",(0,t.jsx)(n.code,{children:"focus()"})," method available on the input element reference."]}),"\n",(0,t.jsxs)(n.p,{children:["Here's an example of how you can utilize the ",(0,t.jsx)(n.code,{children:"inputRef"})," prop to access the input element and perform actions:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const inputRef = React.useRef();\n\n  const handleClick = () => {\n    inputRef.current.focus();\n    console.log(inputRef.current.checked); // => true\n  };\n\n  return (\n    <Flex alignItems="center" columnGap="6x">\n      <Checkbox defaultChecked inputRef={inputRef}>\n        Label\n      </Checkbox>\n      <Button onClick={handleClick}>\n        Click Me\n      </Button>\n    </Flex>\n  );\n}\n'})}),"\n",(0,t.jsxs)(n.h2,{id:"props",children:["Props",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.h3,{id:"checkbox-1",children:["Checkbox",(0,t.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#checkbox-1",children:(0,t.jsx)(n.svg,{children:(0,t.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"checked"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", the checkbox will be selected. Use the ",(0,t.jsx)(n.code,{children:"onChange"})," prop to update the state for a controlled component."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"The content within the checkbox component."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"defaultChecked"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", the checkbox will be selected initially."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"disabled"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", disables the checkbox and prevents user interaction."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"id"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["The ",(0,t.jsx)(n.code,{children:"id"})," attribute of the input field."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"indeterminate"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", the checkbox will be displayed in an indeterminate state. This only affects the icon shown inside the checkbox."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"inputProps"}),(0,t.jsx)(n.td,{align:"left",children:"object"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"Additional props to be applied to the input element."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"inputRef"}),(0,t.jsx)(n.td,{align:"left",children:"RefObject"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A ref object to access the input element."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"name"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"The name of the input field in the checkbox. The name is useful for form submissions."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"onBlur"}),(0,t.jsx)(n.td,{align:"left",children:"function"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox loses focus."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"onChange"}),(0,t.jsx)(n.td,{align:"left",children:"function"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A callback function invoked when the state of the checkbox changes."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"onClick"}),(0,t.jsx)(n.td,{align:"left",children:"function"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox is clicked."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"onFocus"}),(0,t.jsx)(n.td,{align:"left",children:"function"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A callback function invoked when the checkbox receives focus."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"size"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left",children:"'md'"}),(0,t.jsx)(n.td,{align:"left",children:"The size of the checkbox. One of: 'sm', 'md', 'lg'"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"value"}),(0,t.jsx)(n.td,{align:"left",children:"string | number"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"The value of the checkbox input. This is the return value for form submissions."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"variantColor"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left",children:"'blue'"}),(0,t.jsx)(n.td,{align:"left",children:"The color of the checkbox when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')"})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,i.ah)(),e.components).wrapper;return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(c,e)})):c(e)}},44692:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/checkbox",function(){return l(13818)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=44692)}),_N_E=e.O()}]);