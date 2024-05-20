(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4283],{4903:function(e,n,i){"use strict";i.r(n);var r=i(52322),l=i(45392);function a(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",ul:"ul",li:"li",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,l.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,r.jsx)(n.h1,{id:"textarea",children:"Textarea"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Textarea"})," component allows you to create a multi-line text input."]}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { Textarea } from '@tonic-ui/react';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<>\n  <TextLabel mb="1x">Label:</TextLabel>\n  <Textarea placeholder="Basic example" />\n  <Text size="xs" mt="1x">Help text for the text input</Text>\n</>\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"sizing",children:["Sizing",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizing",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"rows"})," and ",(0,r.jsx)(n.code,{children:"cols"})," properties allow you to specify an exact size for the ",(0,r.jsx)(n.code,{children:"<Textarea>"})," to take. Setting these is a good idea for consistency, as browser defaults can differ."]}),"\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"maxLength"})," property specifies a maximum number of characters that the ",(0,r.jsx)(n.code,{children:"Textarea"})," is allowed to contain."]}),"\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"minLength"})," property specifies a minimum length that is considered valid. ",(0,r.jsx)(n.code,{children:"Textarea"})," will not submit (and is invalid) if it is empty, using the ",(0,r.jsx)(n.code,{children:"required"})," attribute."]}),"\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"resize"})," property to set whether the ",(0,r.jsx)(n.code,{children:"Textarea"})," is resizable, and if so, in which directions. You can set the value to ",(0,r.jsx)(n.code,{children:"none"}),", ",(0,r.jsx)(n.code,{children:"both"}),", ",(0,r.jsx)(n.code,{children:"horizontal"}),", or ",(0,r.jsx)(n.code,{children:"vertical"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'\nfunction Example() {\n  const [resize, setResize] = React.useState(\'both\');\n\n  return (\n    <>\n      <Flex alignItems="center" mb="5x">\n        <TextLabel>resize =</TextLabel>\n        <Space width="2x" />\n        <Stack direction="row" spacing="2x">\n          {[\'none\', \'both\', \'horizontal\', \'vertical\'].map(value => (\n            <Button\n              key={value}\n              variant={resize === value ? \'primary\' : \'secondary\'}\n              onClick={() => setResize(value)}\n            >\n              {value}\n            </Button>\n          ))}\n        </Stack>\n      </Flex>\n      <Textarea\n        defaultValue="Placeholder text"\n        width="auto"\n        resize={resize}\n        rows="3"\n        cols="12"\n        minLength={4}\n        maxLength={16}\n        transition="none"\n      />\n    </>\n  );\n}\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"variants",children:["Variants",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#variants",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Textarea"})," component comes in 3 variants: ",(0,r.jsx)(n.code,{children:"outline"}),", ",(0,r.jsx)(n.code,{children:"filled"}),", and ",(0,r.jsx)(n.code,{children:"unstyled"}),". Pass the ",(0,r.jsx)(n.code,{children:"variant"})," prop and set it to either of these values."]}),"\n",(0,r.jsxs)(n.h4,{id:"outline",children:[(0,r.jsx)(n.code,{children:"outline"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#outline",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Textarea variant="outline" placeholder="John Doe" />\n'})}),"\n",(0,r.jsxs)(n.h4,{id:"filled",children:[(0,r.jsx)(n.code,{children:"filled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#filled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Textarea variant="filled" placeholder="John Doe" />\n'})}),"\n",(0,r.jsxs)(n.h4,{id:"unstyled",children:[(0,r.jsx)(n.code,{children:"unstyled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#unstyled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Textarea variant="unstyled" placeholder="John Doe" />\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"attributes",children:["Attributes",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#attributes",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["General form input attributes are supported, such as ",(0,r.jsx)(n.code,{children:"disabled"}),", ",(0,r.jsx)(n.code,{children:"readOnly"}),", ",(0,r.jsx)(n.code,{children:"required"}),", etc."]}),"\n",(0,r.jsxs)(n.h4,{id:"disabled",children:[(0,r.jsx)(n.code,{children:"disabled"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#disabled",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Stack directin="column" spacing="4x">\n  <Textarea disabled placeholder="Placeholder text" />\n  <Textarea disabled placeholder="Placeholder text" defaultValue="Disabled" />\n</Stack>\n'})}),"\n",(0,r.jsxs)(n.h4,{id:"readonly",children:[(0,r.jsx)(n.code,{children:"readOnly"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#readonly",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Stack directin="column" spacing="4x">\n  <Textarea readOnly placeholder="Placeholder text" />\n  <Textarea readOnly placeholder="Placeholder text" defaultValue="Read-only" />\n</Stack>\n'})}),"\n",(0,r.jsxs)(n.h4,{id:"required",children:[(0,r.jsx)(n.code,{children:"required"}),(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#required",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Textarea required placeholder="Placeholder text" />\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"validation",children:["Validation",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#validation",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Textarea"})," component provides a built-in validation mechanism that can be used to indicate when a field is not valid. When the ",(0,r.jsx)(n.code,{children:"error"})," prop is set to true, a red border is displayed around the input field, allowing you to provide user-friendly form validation feedback."]}),"\n",(0,r.jsxs)(n.p,{children:["In addition to the built-in validation mechanism, you can use the native ",(0,r.jsx)(n.code,{children:"setCustomValidity()"})," method to set a custom validation message for the textarea. This method is available on the textarea element and allows you to set a custom error message that will be displayed when the field is invalid."]}),"\n",(0,r.jsx)(n.pre,{noInline:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'const InlineError = (props) => (\n  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />\n);\n\nconst MultilineTextField = React.forwardRef((\n  {\n    value,\n    onChange,\n    ...rest\n  },\n  ref,\n) => {\n  const nodeRef = React.useRef();\n  const combinedRef = useMergeRefs(nodeRef, ref);\n  const error = (value === \'\') ? \'Please fill out this field\' : null;\n\n  // Optional\n  React.useEffect(() => {\n    const el = nodeRef.current;\n    const errorMessage = !!error ? error : \'\';\n    el.setCustomValidity(errorMessage);\n  }, [error]);\n\n  return (\n    <>\n      <Flex position="relative" alignItems="center" mb="1x">\n        <Textarea\n          ref={combinedRef}\n          resize="none"\n          rows="3"\n          placeholder="Placeholder text"\n          value={value}\n          onChange={onChange}\n          error={error}\n          pr={error ? \'10x\' : undefined}\n        />\n        {error && (\n          <Box position="absolute" right="3x" top="2x">\n            <Icon icon="warning-circle" color="red:50" />\n          </Box>\n        )}\n      </Flex>\n      <Box>\n        {error && (\n          <InlineError>{error}</InlineError>\n        )}\n      </Box>\n    </>\n  );\n});\n\nrender(() => {\n  const [value, setValue] = React.useState(\'\');\n  const onChange = (e) => {\n    setValue(e.target.value);\n  };\n\n  return (\n    <MultilineTextField value={value} onChange={onChange} />\n  );\n});\n'})}),"\n",(0,r.jsxs)(n.h2,{id:"props",children:["Props",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"textarea-1",children:["Textarea",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#textarea-1",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"rows"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Specifies the number of visible lines in a textarea."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"cols"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Specifies the visible width of a textarea."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"maxLength"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Specifies the maximum number of characters allowed in the textarea."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"minLength"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Specifies the minimum number of characters required for the textarea to be considered valid."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"resize"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The resize behavior of the textarea. One of: 'none', 'both', 'horizontal', 'vertical'"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"variant"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left",children:"'outline'"}),(0,r.jsx)(n.td,{align:"left",children:"The variant of the textarea style to use. One of: 'outline', 'filled', 'unstyled'"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"disabled"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the textarea is disabled and the user cannot interact with it."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"error"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the textarea displays a red border to indicate an error."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"readOnly"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the value of the textarea cannot be edited."]})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(a,e)})):a(e)}},36514:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/textarea",function(){return i(4903)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=36514)}),_N_E=e.O()}]);