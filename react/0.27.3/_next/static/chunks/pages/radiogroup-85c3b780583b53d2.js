(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4166],{79463:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return d}});var n=t(7896),o=t(59740),i=(t(2784),t(30876)),l=["components"],r={};function d(e){var a=e.components,t=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},r,t,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"RadioGroup"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"RadioGroup")," is used to group related radio buttons."),(0,i.kt)("h2",null,"Import"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { RadioGroup } from '@trendmicro/react-styled-ui';\n")),(0,i.kt)("h3",null,"Usage"),(0,i.kt)("h4",null,"Uncontrolled radio group"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<RadioGroup defaultValue="1">\n  <Stack spacing="1x" shouldWrapChildren>\n    <Radio value="1">First</Radio>\n    <Radio value="2">Second</Radio>\n    <Radio value="3">Third</Radio>\n  </Stack>\n</RadioGroup>\n')),(0,i.kt)("h4",null,"Controlled radio group"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [value, setValue] = React.useState(\'1\');\n\n  return (\n    <RadioGroup value={value} onChange={value => setValue(value)}>\n      <Stack spacing="1x" shouldWrapChildren>\n        <Radio value="1">First</Radio>\n        <Radio value="2">Second</Radio>\n        <Radio value="3">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  );\n}\n')),(0,i.kt)("h3",null,"Group orientation"),(0,i.kt)("p",null,"Make a set of radios appear horizontal stacked rather than vertically, by adding ",(0,i.kt)("inlineCode",{parentName:"p"},'direction="row"')," to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Stack")," component."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<RadioGroup defaultValue="1">\n  <Stack direction="row" spacing="3x">\n    <Radio value="1">Radio 1</Radio>\n    <Radio value="2">Radio 2</Radio>\n    <Radio value="3">Radio 3</Radio>\n  </Stack>\n</RadioGroup>\n')),(0,i.kt)("h3",null,"Colors"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"variantColor")," prop to change the color scheme of the Radio. ",(0,i.kt)("inlineCode",{parentName:"p"},"variantColor")," can be any color key with key ",(0,i.kt)("inlineCode",{parentName:"p"},"50"),"(hover), ",(0,i.kt)("inlineCode",{parentName:"p"},"60"),"(checked) that exist in the ",(0,i.kt)("inlineCode",{parentName:"p"},"theme.colors"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<RadioGroup variantColor="green" defaultValue="1">\n  <Stack direction="row" spacing="3x">\n    <Radio value="1">Radio 1</Radio>\n    <Radio value="2">Radio 2</Radio>\n  </Stack>\n</RadioGroup>\n')),(0,i.kt)("h3",null,"Sizes"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"size")," prop to change the size of the ",(0,i.kt)("inlineCode",{parentName:"p"},"RadioGroup"),". You can set the value to ",(0,i.kt)("inlineCode",{parentName:"p"},"sm"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"md"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"lg"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x" shouldWrapChildren>\n  <RadioGroup size="sm" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup size="md" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup size="lg" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n</Stack>\n')),(0,i.kt)("h3",null,"States"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="2x" shouldWrapChildren>\n  <RadioGroup defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n  <RadioGroup disabled defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n</Stack>\n')),(0,i.kt)("h3",null,"Asynchronous data loading"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"function Example() {\n  const [state, setState] = React.useState({\n    state: 'idle',\n    value: null,\n  });\n  const timerRef = React.useRef(null);\n  const fetchData = React.useCallback(() => {\n    setState(prevState => ({\n      ...prevState,\n      state: 'loading',\n      value: null,\n    }));\n\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n    timerRef.current = setTimeout(() => {\n      setState({\n        state: 'success',\n        value: '1',\n      });\n\n      timerRef.current = null;\n    }, 2000);\n  }, []);\n\n  React.useEffect(() => {\n    fetchData();\n  }, [fetchData]);\n\n  return (\n    <>\n      <Box mb=\"4x\">\n        <LinkButton onClick={() => fetchData()}>\n          <Flex align=\"center\">\n            <Icon icon=\"redo\" spin={true} animationPlayState={state.state === 'loading' ? 'running' : 'paused'} />\n            <Space width=\"2x\" />\n            Reload\n          </Flex>\n        </LinkButton>\n      </Box>\n      <RadioGroup\n        value={state.value}\n        disabled={state.state === 'loading'}\n        onChange={nextValue => {\n          setState(prevState => ({ ...prevState, value: nextValue }));\n        }}\n      >\n        <Stack spacing=\"1x\" shouldWrapChildren>\n          <Radio value=\"1\">First</Radio>\n          <Radio value=\"2\">Second</Radio>\n          <Radio value=\"3\">Third</Radio>\n        </Stack>\n      </RadioGroup>\n    </>\n  );\n}\n")),(0,i.kt)("h2",null,"Props"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"name"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"value"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string ","|"," number"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The value to be used in the radio input. This is the value that will be returned on form submission.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},"false"),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", all radios will be disabled.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"variantColor"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The color of the radio when it's checked. This should be one of the color keys in the theme (e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"'green'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'red'"),").")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"size"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"'md'"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The size (width and height) of the radio. One of: ",(0,i.kt)("inlineCode",{parentName:"td"},"'sm'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'md'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'lg'"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"defaultValue"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string ","|"," number"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The default ",(0,i.kt)("inlineCode",{parentName:"td"},"input")," element value. Use when the component is not controlled.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The children of the radio.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onChange"),(0,i.kt)("td",{parentName:"tr",align:"left"},"function"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"A callback called when the state of the radio changes.")))))}d.isMDXComponent=!0},87784:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/radiogroup",function(){return t(79463)}])}},function(e){e.O(0,[9774,2888,179],(function(){return a=87784,e(e.s=a);var a}));var a=e.O();_N_E=a}]);