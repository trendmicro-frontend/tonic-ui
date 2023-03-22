(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6960],{6490:function(e,n,a){"use strict";a.r(n);var c=a(52322),l=a(45392);function r(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,l.ah)(),e.components);return(0,c.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,c.jsx)(n.h1,{id:"checkboxgroup",children:"CheckboxGroup"}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"CheckboxGroup"})," is used to group related checkboxes."]}),"\n",(0,c.jsxs)(n.h2,{id:"import",children:["Import",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-js",children:"import { CheckboxGroup } from '@tonic-ui/react';\n"})}),"\n",(0,c.jsxs)(n.h3,{id:"usage",children:["Usage",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.h4,{id:"uncontrolled-checkbox-group",children:["Uncontrolled checkbox group",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#uncontrolled-checkbox-group",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'<CheckboxGroup defaultValue={["apple"]}>\n  <Stack direction="column" spacing="1x" shouldWrapChildren>\n    <Checkbox value="apple">Apple</Checkbox>\n    <Checkbox value="orange">Orange</Checkbox>\n    <Checkbox value="papaya">Papaya</Checkbox>\n  </Stack>\n</CheckboxGroup>\n'})}),"\n",(0,c.jsxs)(n.h4,{id:"controlled-checkbox-group",children:["Controlled checkbox group",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-checkbox-group",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [value, setValue] = React.useState([\'apple\']);\n\n  return (\n    <CheckboxGroup value={value} onChange={value => setValue(value)}>\n      <Stack direction="column" spacing="1x" shouldWrapChildren>\n        <Checkbox value="apple">Apple</Checkbox>\n        <Checkbox value="orange">Orange</Checkbox>\n        <Checkbox value="papaya">Papaya</Checkbox>\n      </Stack>\n    </CheckboxGroup>\n  );\n}\n'})}),"\n",(0,c.jsxs)(n.h3,{id:"group-orientation",children:["Group orientation",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#group-orientation",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["Make a set of checkboxes appear horizontal stacked rather than vertically, by adding ",(0,c.jsx)(n.code,{children:'flexDirection="row"'})," to the ",(0,c.jsx)(n.code,{children:"Stack"})," component."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'<CheckboxGroup defaultValue={[\'apple\']}>\n  <Stack direction="row" spacing="3x">\n    <Checkbox value="apple">Apple</Checkbox>\n    <Checkbox value="orange">Orange</Checkbox>\n    <Checkbox value="papaya">Papaya</Checkbox>\n  </Stack>\n</CheckboxGroup>\n'})}),"\n",(0,c.jsxs)(n.h3,{id:"colors",children:["Colors",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["Use the ",(0,c.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of the Radio. ",(0,c.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,c.jsx)(n.code,{children:"50"}),"(hover), ",(0,c.jsx)(n.code,{children:"60"}),"(checked) that exist in the ",(0,c.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'<CheckboxGroup variantColor="green" defaultValue={[\'apple\']}>\n  <Stack direction="row" spacing="3x">\n    <Checkbox value="apple">Apple</Checkbox>\n    <Checkbox value="orange">Orange</Checkbox>\n    <Checkbox value="papaya">Papaya</Checkbox>\n  </Stack>\n</CheckboxGroup>\n'})}),"\n",(0,c.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.p,{children:["Use the ",(0,c.jsx)(n.code,{children:"size"})," prop to change the size of the ",(0,c.jsx)(n.code,{children:"CheckboxGroup"}),". You can set the value to ",(0,c.jsx)(n.code,{children:"sm"}),", ",(0,c.jsx)(n.code,{children:"md"}),", or ",(0,c.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="1x" shouldWrapChildren>\n  <CheckboxGroup size="sm" defaultValue={[\'apple\']}>\n    <Stack direction="row" spacing="3x">\n      <Checkbox value="apple">Apple</Checkbox>\n      <Checkbox value="orange">Orange</Checkbox>\n      <Checkbox value="papaya">Papaya</Checkbox>\n    </Stack>\n  </CheckboxGroup>\n  <CheckboxGroup size="md" defaultValue={[\'apple\']}>\n    <Stack direction="row" spacing="3x">\n      <Checkbox value="apple">Apple</Checkbox>\n      <Checkbox value="orange">Orange</Checkbox>\n      <Checkbox value="papaya">Papaya</Checkbox>\n    </Stack>\n  </CheckboxGroup>\n  <CheckboxGroup size="lg" defaultValue={[\'apple\']}>\n    <Stack direction="row" spacing="3x">\n      <Checkbox value="apple">Apple</Checkbox>\n      <Checkbox value="orange">Orange</Checkbox>\n      <Checkbox value="papaya">Papaya</Checkbox>\n    </Stack>\n  </CheckboxGroup>\n</Stack>\n'})}),"\n",(0,c.jsxs)(n.h3,{id:"states",children:["States",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="2x" shouldWrapChildren>\n  <CheckboxGroup defaultValue={[\'apple\']}>\n    <Stack direction="row" spacing="3x">\n      <Checkbox value="apple">Apple</Checkbox>\n      <Checkbox value="orange">Orange</Checkbox>\n      <Checkbox value="papaya">Papaya</Checkbox>\n    </Stack>\n  </CheckboxGroup>\n  <CheckboxGroup disabled defaultValue={[\'apple\']}>\n    <Stack direction="row" spacing="3x">\n      <Checkbox value="apple">Apple</Checkbox>\n      <Checkbox value="orange">Orange</Checkbox>\n      <Checkbox value="papaya">Papaya</Checkbox>\n    </Stack>\n  </CheckboxGroup>\n</Stack>\n'})}),"\n",(0,c.jsxs)(n.h3,{id:"asynchronous-data-loading",children:["Asynchronous data loading",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#asynchronous-data-loading",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [state, setState] = React.useState({\n    state: \'idle\',\n    fruits: [],\n  });\n  const timerRef = React.useRef(null);\n  const fetchData = React.useCallback(() => {\n    setState(prevState => ({ ...prevState, state: \'loading\' }));\n\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n    timerRef.current = setTimeout(() => {\n      setState({\n        state: \'success\',\n        fruits: [\'apple\'],\n      });\n\n      timerRef.current = null;\n    }, 2000);\n  }, []);\n\n  React.useEffect(() => {\n    fetchData();\n  }, [fetchData]);\n\n  return (\n    <>\n      <Box mb="4x">\n        <LinkButton onClick={() => fetchData()}>\n          <Flex alignItems="center">\n            <Icon icon="redo" spin={true} animationPlayState={state.state === \'loading\' ? \'running\' : \'paused\'} />\n            <Space width="2x" />\n            Reload\n          </Flex>\n        </LinkButton>\n      </Box>\n      <CheckboxGroup\n        value={state.fruits}\n        disabled={state.state === \'loading\'}\n        onChange={value => {\n          setState(prevState => ({ ...prevState, fruits: value }));\n        }}\n      >\n        <Stack direction="row" spacing="3x">\n          <Checkbox value="apple">Apple</Checkbox>\n          <Checkbox value="orange">Orange</Checkbox>\n          <Checkbox value="papaya">Papaya</Checkbox>\n        </Stack>\n      </CheckboxGroup>\n    </>\n  );\n}\n'})}),"\n",(0,c.jsxs)(n.h2,{id:"props",children:["Props",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.h3,{id:"checkboxgroup-1",children:["CheckboxGroup",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#checkboxgroup-1",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{align:"left",children:"Name"}),(0,c.jsx)(n.th,{align:"left",children:"Type"}),(0,c.jsx)(n.th,{align:"left",children:"Default"}),(0,c.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"children"}),(0,c.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,c.jsx)(n.code,{children:"(context) => ReactNode"})]}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"A function child can be used intead of a React element. This function is called with the context object."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"defaultValue"}),(0,c.jsx)(n.td,{align:"left",children:"(string|number)[]"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The initial value of the checkbox group."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"disabled"}),(0,c.jsx)(n.td,{align:"left",children:"boolean"}),(0,c.jsx)(n.td,{align:"left",children:"false"}),(0,c.jsxs)(n.td,{align:"left",children:["If ",(0,c.jsx)(n.code,{children:"true"}),", all checkboxes will be disabled."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"name"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"onChange"}),(0,c.jsx)(n.td,{align:"left",children:"(event) => void"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsxs)(n.td,{align:"left",children:["A callback fired when any descendant ",(0,c.jsx)(n.code,{children:"Checkbox"})," is checked or unchecked."]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"size"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left",children:"'md'"}),(0,c.jsx)(n.td,{align:"left",children:"The size (width and height) of the checkbox. One of: 'sm', 'md', 'lg'"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"value"}),(0,c.jsx)(n.td,{align:"left",children:"(string|number)[]"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The value of the checkbox group."})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"variantColor"}),(0,c.jsx)(n.td,{align:"left",children:"string"}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The color of the checkbox when it's checked. This should be one of the color keys in the theme (e.g. 'green', 'red')"})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,c.jsx)(n,Object.assign({},e,{children:(0,c.jsx)(r,e)})):r(e)}},35182:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/checkboxgroup",function(){return a(6490)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=35182)}),_N_E=e.O()}]);