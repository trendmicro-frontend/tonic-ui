(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[362],{72346:function(e,n,a){"use strict";a.r(n);var i=a(52322),l=a(45392);function o(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",nav:"nav",ul:"ul",li:"li"},(0,l.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,i.jsx)(n.h1,{id:"radiogroup",children:"RadioGroup"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"RadioGroup"})," is used to group related radio buttons."]}),"\n",(0,i.jsxs)(n.h2,{id:"import",children:["Import",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { RadioGroup } from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"usage",children:["Usage",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h4,{id:"uncontrolled-radio-group",children:["Uncontrolled radio group",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#uncontrolled-radio-group",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<RadioGroup defaultValue="1">\n  <Stack spacing="1x" shouldWrapChildren>\n    <Radio value="1">First</Radio>\n    <Radio value="2">Second</Radio>\n    <Radio value="3">Third</Radio>\n  </Stack>\n</RadioGroup>\n'})}),"\n",(0,i.jsxs)(n.h4,{id:"controlled-radio-group",children:["Controlled radio group",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-radio-group",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [value, setValue] = React.useState(\'1\');\n\n  return (\n    <RadioGroup value={value} onChange={value => setValue(value)}>\n      <Stack spacing="1x" shouldWrapChildren>\n        <Radio value="1">First</Radio>\n        <Radio value="2">Second</Radio>\n        <Radio value="3">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  );\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"group-orientation",children:["Group orientation",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#group-orientation",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Make a set of radios appear horizontal stacked rather than vertically, by adding ",(0,i.jsx)(n.code,{children:'flexDirection="row"'})," to the ",(0,i.jsx)(n.code,{children:"Stack"})," component."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<RadioGroup defaultValue="1">\n  <Stack direction="row" spacing="3x">\n    <Radio value="1">Radio 1</Radio>\n    <Radio value="2">Radio 2</Radio>\n    <Radio value="3">Radio 3</Radio>\n  </Stack>\n</RadioGroup>\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"colors",children:["Colors",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of the Radio. ",(0,i.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,i.jsx)(n.code,{children:"50"}),"(hover), ",(0,i.jsx)(n.code,{children:"60"}),"(checked) that exist in the ",(0,i.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<RadioGroup variantColor="green" defaultValue="1">\n  <Stack direction="row" spacing="3x">\n    <Radio value="1">Radio 1</Radio>\n    <Radio value="2">Radio 2</Radio>\n  </Stack>\n</RadioGroup>\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"size"})," prop to change the size of the ",(0,i.jsx)(n.code,{children:"RadioGroup"}),". You can set the value to ",(0,i.jsx)(n.code,{children:"sm"}),", ",(0,i.jsx)(n.code,{children:"md"}),", or ",(0,i.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="4x" shouldWrapChildren>\n  <RadioGroup size="sm" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup size="md" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup size="lg" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n</Stack>\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"states",children:["States",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="2x" shouldWrapChildren>\n  <RadioGroup defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup disabled defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n</Stack>\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"asynchronous-data-loading",children:["Asynchronous data loading",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#asynchronous-data-loading",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"function Example() {\n  const [state, setState] = React.useState({\n    state: 'idle',\n    value: null,\n  });\n  const timerRef = React.useRef(null);\n  const fetchData = React.useCallback(() => {\n    setState(prevState => ({\n      ...prevState,\n      state: 'loading',\n      value: null,\n    }));\n\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n    timerRef.current = setTimeout(() => {\n      setState({\n        state: 'success',\n        value: '1',\n      });\n\n      timerRef.current = null;\n    }, 2000);\n  }, []);\n\n  React.useEffect(() => {\n    fetchData();\n  }, [fetchData]);\n\n  return (\n    <>\n      <Box mb=\"4x\">\n        <LinkButton onClick={() => fetchData()}>\n          <Flex alignItems=\"center\">\n            <Icon icon=\"redo\" spin={true} animationPlayState={state.state === 'loading' ? 'running' : 'paused'} />\n            <Space width=\"2x\" />\n            Reload\n          </Flex>\n        </LinkButton>\n      </Box>\n      <RadioGroup\n        value={state.value}\n        disabled={state.state === 'loading'}\n        onChange={nextValue => {\n          setState(prevState => ({ ...prevState, value: nextValue }));\n        }}\n      >\n        <Stack spacing=\"1x\" shouldWrapChildren>\n          <Radio value=\"1\">First</Radio>\n          <Radio value=\"2\">Second</Radio>\n          <Radio value=\"3\">Third</Radio>\n        </Stack>\n      </RadioGroup>\n    </>\n  );\n}\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"props",children:["Props",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"radiogroup-1",children:["RadioGroup",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#radiogroup-1",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{align:"left",children:"Name"}),(0,i.jsx)(n.th,{align:"left",children:"Type"}),(0,i.jsx)(n.th,{align:"left",children:"Default"}),(0,i.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"children"}),(0,i.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,i.jsx)(n.code,{children:"(context) => ReactNode"})]}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A function child can be used intead of a React element. This function is called with the context object."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"defaultValue"}),(0,i.jsx)(n.td,{align:"left",children:"string | number"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["The default ",(0,i.jsx)(n.code,{children:"input"})," element value. Use when the component is not controlled."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"disabled"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left",children:"false"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", all radios will be disabled."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"name"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"onChange"}),(0,i.jsx)(n.td,{align:"left",children:"function"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A callback called when the state of the radio changes."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"size"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left",children:"'md'"}),(0,i.jsx)(n.td,{align:"left",children:"The size (width and height) of the radio. One of: 'sm', 'md', 'lg'"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"value"}),(0,i.jsx)(n.td,{align:"left",children:"string | number"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The value to be used in the radio input. This is the value that will be returned on form submission."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"variantColor"}),(0,i.jsx)(n.td,{align:"left",children:"string"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"The color of the radio when it's checked. This should be one of the color keys in the theme (e.g. 'green', 'red')."})]})]})]})]}),(0,i.jsxs)(n.nav,{className:"toc",id:"toc",children:[(0,i.jsx)(n.div,{className:"toc-heading",children:"Contents"}),(0,i.jsxs)(n.ul,{className:"toc-level toc-level-1",children:[(0,i.jsxs)(n.li,{className:"toc-item toc-item-h2",children:[(0,i.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#import",children:"Import"}),(0,i.jsxs)(n.ul,{className:"toc-level toc-level-2",children:[(0,i.jsxs)(n.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#usage",children:"Usage"}),(0,i.jsxs)(n.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(n.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h4",href:"#uncontrolled-radio-group",children:"Uncontrolled radio group"})}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h4",href:"#controlled-radio-group",children:"Controlled radio group"})})]})]}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#group-orientation",children:"Group orientation"})}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#colors",children:"Colors"})}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#sizes",children:"Sizes"})}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#states",children:"States"})}),(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#asynchronous-data-loading",children:"Asynchronous data loading"})})]})]}),(0,i.jsxs)(n.li,{className:"toc-item toc-item-h2",children:[(0,i.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#props",children:"Props"}),(0,i.jsx)(n.ul,{className:"toc-level toc-level-2",children:(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#radiogroup-1",children:"RadioGroup"})})})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(o,e)})):o(e)}},41796:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/radiogroup",function(){return a(72346)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=41796)}),_N_E=e.O()}]);