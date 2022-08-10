(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5672],{64765:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var a=t(7896),l=t(59740),o=(t(2784),t(30876)),r=["components"],i={};function p(e){var n=e.components,t=(0,l.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},i,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",null,"Input"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Input")," component is used to get user input in a text field."),(0,o.kt)("h2",null,"Import"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Input } from '@trendmicro/react-styled-ui';\n")),(0,o.kt)("h2",null,"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<>\n  <TextLabel mb="1x">Label:</TextLabel>\n  <Input placeholder="Basic example" />\n  <Text size="xs" mt="1x">Help text for the text input</Text>\n</>\n')),(0,o.kt)("h3",null,"Sizes"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"size")," prop to change the size of the ",(0,o.kt)("inlineCode",{parentName:"p"},"Input"),". You can set the value to ",(0,o.kt)("inlineCode",{parentName:"p"},"sm"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"md"),", or ",(0,o.kt)("inlineCode",{parentName:"p"},"lg"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <Box>\n    <TextLabel mb="1x" size="sm">Label:</TextLabel>\n    <Input size="sm" placeholder="Small size (24px)" />\n  </Box>\n  <Box>\n    <TextLabel mb="1x" size="md">Label:</TextLabel>\n    <Input size="md" placeholder="Default size (32px)" />\n  </Box>\n  <Box>\n    <TextLabel mb="1x" size="lg">Label:</TextLabel>\n    <Input size="lg" placeholder="Large size (40px)" />\n  </Box>\n</Stack>\n')),(0,o.kt)("h3",null,"Variants"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Input")," component comes in 3 variants: ",(0,o.kt)("inlineCode",{parentName:"p"},"outline"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"filled"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"unstyled"),". Pass the ",(0,o.kt)("inlineCode",{parentName:"p"},"variant")," prop and set it to either of these values."),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"outline")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Input variant="outline" placeholder="John Doe" />\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"filled")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Input variant="filled" placeholder="John Doe" />\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"unstyled")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Input variant="unstyled" placeholder="John Doe" />\n')),(0,o.kt)("h3",null,"Attributes"),(0,o.kt)("p",null,"Standard input attributes are supported, e.g., ",(0,o.kt)("inlineCode",{parentName:"p"},"type"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"disabled"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"readOnly"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"required"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"list"),", etc."),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"type")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Grid\n  templateColumns="min-content auto"\n  columnGap="3x"\n  rowGap="3x"\n>\n  <Grid>\n    <TextLabel>Name:</TextLabel>\n  </Grid>\n  <Grid>\n    <Input type="text" placeholder="John Doe" />\n  </Grid>\n  <Grid>\n    <TextLabel>Password:</TextLabel>\n  </Grid>\n  <Grid>\n    <Input type="password" placeholder="Password" />\n  </Grid>\n</Grid>\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"disabled")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack directin="column" spacing="4x">\n  <Input disabled placeholder="Placeholder text" />\n  <Input disabled placeholder="Placeholder text" defaultValue="Disabled" />\n</Stack>\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"readOnly")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack directin="column" spacing="4x">\n  <Input readOnly placeholder="Placeholder text" />\n  <Input readOnly placeholder="Placeholder text" defaultValue="Read-only" />\n</Stack>\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"required")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Input required placeholder="Placeholder text" />\n')),(0,o.kt)("h4",null,(0,o.kt)("inlineCode",{parentName:"h4"},"list")),(0,o.kt)("p",null,"The value of ",(0,o.kt)("inlineCode",{parentName:"p"},"list")," is the id attribute of the ",(0,o.kt)("inlineCode",{parentName:"p"},"<datalist>")," of autocomplete options. The HTML ",(0,o.kt)("inlineCode",{parentName:"p"},"<datalist>")," element contains a set of ",(0,o.kt)("inlineCode",{parentName:"p"},"<option>")," elements that represent the permissible or recommended options available to choose from within other controls."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<>\n  <Flex align="center">\n    <TextLabel htmlFor="browser-choice" mr="2x">\n      Choose a browser from the list:\n    </TextLabel>\n    <Input list="browsers" id="browser-choice" width="auto" />\n  </Flex>\n  <Box as="datalist" id="browsers">\n    <option value="Chrome" />\n    <option value="Firefox" />\n    <option value="Internet Explorer" />\n    <option value="Opera" />\n    <option value="Safari" />\n    <option value="Microsoft Edge" />\n  </Box>\n</>\n')),(0,o.kt)("h3",null,"Adornments"),(0,o.kt)("p",null,"Input adornments can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password."),(0,o.kt)("p",null,"First, you may have to create your input adornment components for convenience. Note that you must use the ",(0,o.kt)("inlineCode",{parentName:"p"},"z-index")," value as mentioned below."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'const InputAdornmentPrepend = (props) => (\n  <Flex\n    align="center"\n    position="absolute"\n    left={0}\n    height="100%"\n    px="3x"\n    // The z-index value should be at least 3 for the prepeneded input adornment\n    zIndex={3}\n    {...props}\n  />\n);\n\nconst InputAdornmentAppend = (props) => (\n  <Flex\n    align="center"\n    position="absolute"\n    right={0}\n    height="100%"\n    px="3x"\n    // The z-index value should be at least 2 for the appended input adornment\n    zIndex={2}\n    {...props}\n  />\n);\n')),(0,o.kt)("p",null,"Take a look at the following examples:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const InputAdornmentPrepend = (props) => (\n  <Flex\n    align="center"\n    position="absolute"\n    left={0}\n    px="3x"\n    // The z-index value should be at least 3 for the prepeneded input adornment\n    zIndex={3}\n    {...props}\n  />\n);\n\nconst InputAdornmentAppend = (props) => (\n  <Flex\n    align="center"\n    position="absolute"\n    right={0}\n    px="3x"\n    // The z-index value should be at least 2 for the appended input adornment\n    zIndex={2}\n    {...props}\n  />\n);\n\nfunction Example() {\n  const [view, setView] = React.useState(false);\n  const toggleView = () => setView(view => !view);\n  const [colorMode] = useColorMode();\n  const adornmentColor = {\n    dark: \'white:tertiary\',\n    light: \'black:tertiary\',\n  }[colorMode];\n  const adornmentIconName = view ? \'view\' : \'view-off\';\n  const inputType = view ? \'text\' : \'password\';\n\n  return (\n    <Stack direction="column" spacing="4x">\n      <Flex position="relative" alignItems="center">\n        <InputAdornmentPrepend>\n          <Icon icon="mobile" color={adornmentColor} />\n        </InputAdornmentPrepend>\n        <Input\n          placeholder="Mobile phone number"\n          px="10x"\n        />\n      </Flex>\n      <Flex position="relative" alignItems="center">\n        <InputAdornmentPrepend>\n          <Text width="4x" textAlign="center" color={adornmentColor}>$</Text>\n        </InputAdornmentPrepend>\n        <Input\n          placeholder="Enter the amount"\n          px="10x"\n        />\n        <InputAdornmentAppend>\n          <Icon icon="check" color="green:50" />\n        </InputAdornmentAppend>\n      </Flex>\n      <Flex position="relative" alignItems="center">\n        <Input\n          type={inputType}\n          defaultValue="Revealed Password"\n          placeholder="Password"\n          pr="10x"\n        />\n        <InputAdornmentAppend>\n          <ButtonBase onClick={toggleView}>\n            <Icon icon={adornmentIconName} color={adornmentColor} />\n          </ButtonBase>\n        </InputAdornmentAppend>\n      </Flex>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,o.kt)("h3",null,"Validation"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"isInvalid")," attribute to indicate that the value entered into an input field does not conform to the format expected by the application. ",(0,o.kt)("inlineCode",{parentName:"p"},"isInvalid")," can also be used to indicate that a required field has not been filled in."),(0,o.kt)("p",null,"Set ",(0,o.kt)("inlineCode",{parentName:"p"},"isInvalid")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," on the fields that have failed validation, otherwise set it to ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," if no errors detected."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const InlineError = (props) => (\n  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />\n);\n\nconst InputField = ({\n  value,\n  onChange,\n  ...props\n}) => {\n  const isInvalid = (value === \'\');\n  let invalidInputStyle = {};\n  if (isInvalid) {\n    invalidInputStyle = {\n      isInvalid: true,\n      pr: \'10x\',\n    };\n  }\n\n  return (\n    <>\n      <Flex position="relative" alignItems="center" mb="1x">\n        <Input\n          placeholder="Enter your name here"\n          value={value}\n          onChange={onChange}\n          {...invalidInputStyle}\n        />\n        {isInvalid && (\n          <Box position="absolute" right={0}>\n            <Icon icon="warning-circle" mx="3x" color="red:50" />\n          </Box>\n        )}\n      </Flex>\n      <Box>\n        {isInvalid && (\n          <InlineError>This is a required field.</InlineError>\n        )}\n      </Box>\n    </>\n  );\n};\n\nfunction Example() {\n  const [value, setValue] = React.useState(\'\');\n  const onChange = (e) => {\n    setValue(e.target.value);\n  };\n\n  return (\n    <InputField value={value} onChange={onChange} />\n  );\n}\n\nrender(<Example />);\n')),(0,o.kt)("h2",null,"Props"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"size"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"},"'md'"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The visual size of the ",(0,o.kt)("inlineCode",{parentName:"td"},"input")," element. One of: ",(0,o.kt)("inlineCode",{parentName:"td"},"'sm'"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"'md'"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"'lg'"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"variant"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"},"'outline'"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The variant of the input style to use. One of: ",(0,o.kt)("inlineCode",{parentName:"td"},"'outline'"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"'filled'"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"'unstyled'"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", the user cannot interact with the control. This sets ",(0,o.kt)("inlineCode",{parentName:"td"},"aria-disabled=true")," and you can style this state by passing the ",(0,o.kt)("inlineCode",{parentName:"td"},"_disabled")," prop.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"readOnly"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", prevents the value of the input from being edited.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"isInvalid"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", the input will indicate an error. You can style this state by passing the ",(0,o.kt)("inlineCode",{parentName:"td"},"_invalid")," prop.")))))}p.isMDXComponent=!0},57388:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/input",function(){return t(64765)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=57388,e(e.s=n);var n}));var n=e.O();_N_E=n}]);