(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9435],{9755:function(n,e,t){"use strict";t.r(e);var l=t(2322),o=t(5392);function r(n){var e=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),n.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.h1,{children:"InputControl"}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.code,{children:"InputControl"})," is built on top of the native ",(0,l.jsx)(e.code,{children:"Input"})," with the same appearance and behavior, except that it allows you to customize the input in a more convenient way. For example, input adornments can be added to the start, end, or both sides of the input."]}),"\n",(0,l.jsxs)(e.p,{children:["See the ",(0,l.jsx)(e.a,{href:"input",children:"Input"})," component for more information about the native input."]}),"\n",(0,l.jsx)(e.h2,{children:"Import"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-js",children:"import {\n  InputAdornment,\n  InputControl,\n} from '@tonic-ui/react';\n"})}),"\n",(0,l.jsx)(e.h2,{children:"Usage"}),"\n",(0,l.jsx)(e.pre,{noInline:!0,children:(0,l.jsx)(e.code,{className:"language-jsx",children:'const FormGroup = (props) => (\n  <Box mb="4x" {...props} />\n);\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nrender(() => {\n  const [size, changeSizeBy] = useSelection(\'md\');\n  const [variant, changeVariantBy] = useSelection(\'outline\');\n  const [disabled, toggleDisabled] = useToggle(false);\n  const [error, toggleError] = useToggle(false);\n  const [readOnly, toggleReadOnly] = useToggle(false);\n  const [required, toggleRequired] = useToggle(false);\n\n  return (\n    <>\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          InputControl props\n        </Text>\n      </Box>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            size\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'sm\', \'md\', \'lg\'].map(value => (\n            <Button\n              key={value}\n              selected={value === size}\n              onClick={changeSizeBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            variant\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'outline\', \'filled\', \'unstyled\'].map(value => (\n            <Button\n              key={value}\n              selected={value === variant}\n              onClick={changeVariantBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={disabled}\n            onChange={() => toggleDisabled()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">disabled</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={error}\n            onChange={() => toggleError()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">error</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={readOnly}\n            onChange={() => toggleReadOnly()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">readOnly</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={required}\n            onChange={() => toggleRequired()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">required</Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider my="4x" />\n      <InputControl\n        placeholder="Placeholder text"\n        disabled={disabled}\n        error={error}\n        readOnly={readOnly}\n        required={required}\n        size={size}\n        variant={variant}\n      />\n    </>\n  );\n});\n'})}),"\n",(0,l.jsx)(e.h3,{children:"Input adornments"}),"\n",(0,l.jsxs)(e.p,{children:["The main way to prepend or append an input adornment is to use the ",(0,l.jsx)(e.code,{children:"InputAdornment"})," component. This can be used to add a prefix, a suffix, or an action to an input. For instance, you can use an icon button to hide or reveal the password."]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const [view, setView] = React.useState(false);\n  const toggleView = () => setView(view => !view);\n  const iconColor = colorStyle.color.tertiary;\n  const inputType = view ? \'text\' : \'password\';\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <InputControl\n        placeholder="Mobile phone number"\n        startAdornment={(\n          <InputAdornment>\n            <Icon icon="mobile" color={iconColor} />\n          </InputAdornment>\n        )}\n      />\n      <InputControl\n        placeholder="yyyy-MM-dd"\n        defaultValue={new Date().toISOString().substr(0, 10)}\n        startAdornment={(\n          <InputAdornment>\n            <Icon icon="calendar" color={iconColor} />\n          </InputAdornment>\n        )}\n      />\n      <InputControl\n        placeholder="Enter the amount"\n        startAdornment={(\n          <InputAdornment>\n            <Text width="4x" textAlign="center" color={iconColor}>$</Text>\n          </InputAdornment>\n        )}\n        endAdornment={(\n          <InputAdornment>\n            <Icon icon="check" color="green:50" />\n          </InputAdornment>\n        )}\n      />\n      <InputControl\n        type={view ? \'text\' : \'password\'}\n        defaultValue="Revealed Password"\n        placeholder="Password"\n        endAdornment={(\n          <InputAdornment>\n            <ButtonBase onClick={toggleView}>\n              <Icon\n                icon={view ? \'view\' : \'view-off\'}\n                color={iconColor}\n              />\n            </ButtonBase>\n          </InputAdornment>\n        )}\n      />\n    </Flex>\n  );\n}\n'})}),"\n",(0,l.jsx)(e.h2,{children:"Props"}),"\n",(0,l.jsx)(e.h3,{children:"InputAdornment"}),"\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{align:"left",children:"Name"}),(0,l.jsx)(e.th,{align:"left",children:"Type"}),(0,l.jsx)(e.th,{align:"left",children:"Default"}),(0,l.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,l.jsx)(e.tbody,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"children"}),(0,l.jsx)(e.td,{align:"left",children:"ReactNode"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsx)(e.td,{align:"left"})]})})]}),"\n",(0,l.jsx)(e.h3,{children:"InputControl"}),"\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{align:"left",children:"Name"}),(0,l.jsx)(e.th,{align:"left",children:"Type"}),(0,l.jsx)(e.th,{align:"left",children:"Default"}),(0,l.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"disabled"}),(0,l.jsx)(e.td,{align:"left",children:"boolean"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsxs)(e.td,{align:"left",children:["If ",(0,l.jsx)(e.code,{children:"true"}),", the user cannot interact with the control."]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"error"}),(0,l.jsx)(e.td,{align:"left",children:"boolean"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsxs)(e.td,{align:"left",children:["If ",(0,l.jsx)(e.code,{children:"true"}),", the input will display an error state."]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"endAdornment"}),(0,l.jsx)(e.td,{align:"left",children:"ReactNode"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsxs)(e.td,{align:"left",children:["End ",(0,l.jsx)(e.code,{children:"InputAdornment"})," for this component."]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"inputComponent"}),(0,l.jsx)(e.td,{align:"left",children:"ElementType"}),(0,l.jsx)(e.td,{align:"left",children:"InputBase"}),(0,l.jsx)(e.td,{align:"left",children:"The input component to render."})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"inputProps"}),(0,l.jsx)(e.td,{align:"left",children:"object"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsxs)(e.td,{align:"left",children:["Props applied to the ",(0,l.jsx)(e.code,{children:"input"})," element."]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"inputRef"}),(0,l.jsx)(e.td,{align:"left",children:"RefObject"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsx)(e.td,{align:"left",children:"A ref object to access the input element."})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"size"}),(0,l.jsx)(e.td,{align:"left",children:"string"}),(0,l.jsx)(e.td,{align:"left",children:"'md'"}),(0,l.jsxs)(e.td,{align:"left",children:["The visual size of the ",(0,l.jsx)(e.code,{children:"input"})," element. One of: 'sm', 'md', 'lg'"]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"variant"}),(0,l.jsx)(e.td,{align:"left",children:"string"}),(0,l.jsx)(e.td,{align:"left",children:"'outline'"}),(0,l.jsx)(e.td,{align:"left",children:"The variant of the input style to use. One of: 'outline', 'filled', 'unstyled'"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"startAdornment"}),(0,l.jsx)(e.td,{align:"left",children:"ReactNode"}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsxs)(e.td,{align:"left",children:["Start ",(0,l.jsx)(e.code,{children:"InputAdornment"})," for this component."]})]})]})]})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object.assign({},(0,o.ah)(),n.components).wrapper;return e?(0,l.jsx)(e,Object.assign({},n,{children:(0,l.jsx)(r,n)})):r(n)}},9437:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/inputcontrol",function(){return t(9755)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=9437)}),_N_E=n.O()}]);