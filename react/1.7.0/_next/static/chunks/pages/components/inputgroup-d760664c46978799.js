(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3543],{9467:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return l}});var p=e(7896),a=e(9740),r=(e(2784),e(876)),u=["components"],o={};function l(n){var t=n.components,e=(0,a.Z)(n,u);return(0,r.kt)("wrapper",(0,p.Z)({},o,e,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"InputGroup"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"InputGroup")," is used to group related add-ons and inputs."),(0,r.kt)("h2",null,"Import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  InputGroup,\n  InputGroupAddon,\n  InputGroupAppend,\n  InputGroupPrepend,\n} from '@tonic-ui/react';\n")),(0,r.kt)("h2",null,"Usage"),(0,r.kt)("p",null,"Use ",(0,r.kt)("inlineCode",{parentName:"p"},"InputGroup")," to place an ",(0,r.kt)("inlineCode",{parentName:"p"},"InputGroupAddon")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Button")," on either side of an ",(0,r.kt)("inlineCode",{parentName:"p"},"Input"),". You may also place one on both sides of an ",(0,r.kt)("inlineCode",{parentName:"p"},"Input"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <InputGroup>\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">@</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Username" />\n  </InputGroup>\n  <InputGroup>\n    <Input placeholder="Recipient\'s username" />\n    <InputGroupAppend>\n      <InputGroupAddon variant="filled">@example.com</InputGroupAddon>\n    </InputGroupAppend>\n  </InputGroup>\n  <InputGroup>\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">$</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Recipient\'s username" />\n    <InputGroupAppend>\n      <InputGroupAddon variant="filled">.00</InputGroupAddon>\n    </InputGroupAppend>\n  </InputGroup>\n</Stack>\n')),(0,r.kt)("h3",null,"Sizes"),(0,r.kt)("p",null,"Use the ",(0,r.kt)("inlineCode",{parentName:"p"},"size")," prop to change the size of the input group. You can set the value to ",(0,r.kt)("inlineCode",{parentName:"p"},"sm"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"md"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"lg"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <InputGroup size="sm">\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">sm</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Small size (24px)" />\n  </InputGroup>\n  <InputGroup size="md">\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">md</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Default size (32px)" />\n  </InputGroup>\n  <InputGroup size="lg">\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">lg</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Large size (40px)" />\n  </InputGroup>\n</Stack>\n')),(0,r.kt)("h3",null,"Variants"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"InputGroup")," component comes in 3 variants: ",(0,r.kt)("inlineCode",{parentName:"p"},"outline"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"filled"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"unstyled"),". Pass the ",(0,r.kt)("inlineCode",{parentName:"p"},"variant")," prop and set it to either of these values."),(0,r.kt)("h4",null,(0,r.kt)("inlineCode",{parentName:"h4"},"outline")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <InputGroup variant="outline">\n    <InputGroupPrepend>\n      <InputGroupAddon>@</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Username" />\n  </InputGroup>\n  <InputGroup variant="outline">\n    <InputGroupPrepend>\n      <InputGroupAddon>@</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input variant="filled" placeholder="Username" />\n  </InputGroup>\n</Stack>\n')),(0,r.kt)("h4",null,(0,r.kt)("inlineCode",{parentName:"h4"},"filled")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <InputGroup variant="filled">\n    <InputGroupPrepend>\n      <InputGroupAddon>@</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input variant="outline" placeholder="Username" />\n  </InputGroup>\n  <InputGroup variant="filled">\n    <InputGroupPrepend>\n      <InputGroupAddon>@</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input placeholder="Username" />\n  </InputGroup>\n</Stack>\n')),(0,r.kt)("h4",null,(0,r.kt)("inlineCode",{parentName:"h4"},"unstyled")),(0,r.kt)("p",null,"For an unstyled input group that doesn't have border and padding spaces, it is not necessary to place an ",(0,r.kt)("inlineCode",{parentName:"p"},"InputGroupPrepend")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"InputGroupAppend")," on either side of an ",(0,r.kt)("inlineCode",{parentName:"p"},"Input"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InputGroup variant="unstyled">\n  <InputGroupAddon pr="1x">@</InputGroupAddon>\n  <Input placeholder="Username" />\n</InputGroup>\n')),(0,r.kt)("h3",null,"Multiple add-ons"),(0,r.kt)("p",null,"Multiple add-ons are supported and can be mixed with checkbox and radio input components."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <InputGroup>\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">$</InputGroupAddon>\n    </InputGroupPrepend>\n    <InputGroupPrepend>\n      <InputGroupAddon variant="filled">0.00</InputGroupAddon>\n    </InputGroupPrepend>\n    <Input />\n  </InputGroup>\n  <InputGroup>\n    <Input />\n    <InputGroupAppend>\n      <InputGroupAddon variant="filled">$</InputGroupAddon>\n    </InputGroupAppend>\n    <InputGroupAppend>\n      <InputGroupAddon variant="filled">0.00</InputGroupAddon>\n    </InputGroupAppend>\n  </InputGroup>\n</Stack>\n')),(0,r.kt)("h3",null,"Multiple inputs"),(0,r.kt)("p",null,"While multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"<Input />"),"s are supported visually, validation styles are only available for input groups with a single ",(0,r.kt)("inlineCode",{parentName:"p"},"<Input />"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InputGroup>\n  <InputGroupPrepend>\n    <InputGroupAddon variant="filled" whiteSpace="nowrap">First and last name</InputGroupAddon>\n  </InputGroupPrepend>\n  <Input placeholder="First name" defaultValue="John" required />\n  <Input placeholder="Last name" defaultValue="Doe" required />\n</InputGroup>\n')),(0,r.kt)("h3",null,"Date inputs"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InputGroup variant="unstyled">\n  <Input\n    placeholder="YYYY"\n    borderBottom={1}\n    textAlign="center"\n    width="12x"\n  />\n  <Text px="2x">\u2013</Text>\n  <Input\n    placeholder="MM"\n    borderBottom={1}\n    textAlign="center"\n    width="8x"\n  />\n  <Text px="2x">\u2013</Text>\n  <Input\n    placeholder="DD"\n    borderBottom={1}\n    textAlign="center"\n    width="8x"\n  />\n</InputGroup>\n')),(0,r.kt)("h3",null,"Button add-ons"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'function Example() {\n  const [colorMode] = useColorMode();\n  const dividerColor ={\n    dark: \'gray:70\',\n    light: \'gray:30\',\n  }[colorMode];\n\n  return (\n    <Stack direction="column" spacing="4x">\n      <InputGroup>\n        <InputGroupPrepend>\n          <Button variant="secondary">\n            Action\n          </Button>\n        </InputGroupPrepend>\n        <Input />\n      </InputGroup>\n      <InputGroup>\n        <Input />\n        <InputGroupAppend>\n          <Button variant="secondary">\n            Action\n          </Button>\n        </InputGroupAppend>\n      </InputGroup>\n      <InputGroup>\n        <InputGroupPrepend>\n          <Button variant="secondary">\n            Host name\n            <Space width="1x" />\n            <Icon icon="angle-down" />\n          </Button>\n        </InputGroupPrepend>\n        <Input />\n        <InputGroupAppend>\n          <Button>\n            Action\n          </Button>\n        </InputGroupAppend>\n      </InputGroup>\n      <InputGroup>\n        <Input />\n        <ButtonGroup>\n          <Button borderRadius={0}>\n            Action\n          </Button>\n          <Divider orientation="vertical" color={dividerColor} />\n          <Button>\n            <Icon icon="settings" />\n          </Button>\n        </ButtonGroup>\n      </InputGroup>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,r.kt)("h2",null,"Props"),(0,r.kt)("h3",null,"InputGroup"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," (context) => ReactNode"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A function child can be used intead of a React element. This function is called with the context object.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"size"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'md'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The relative size to the input group itself. One of: 'sm', 'md', 'lg'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"variant"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'outline'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The variant of the input style to use. One of: 'outline', 'filled', 'unstyled'")))),(0,r.kt)("h3",null,"InputGroupAddon"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"size"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'md'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The relative size to the input group itself. One of: 'sm', 'md', 'lg'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"variant"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'outline'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The variant of the input style to use. One of: 'outline', 'filled', 'unstyled'")))),(0,r.kt)("h3",null,"InputGroupAppend"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})))),(0,r.kt)("h3",null,"InputGroupPrepend"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})))))}l.isMDXComponent=!0},3549:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/inputgroup",function(){return e(9467)}])}},function(n){n.O(0,[9774,2888,179],(function(){return t=3549,n(n.s=t);var t}));var t=n.O();_N_E=t}]);