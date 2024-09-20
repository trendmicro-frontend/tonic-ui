(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9887],{90272:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return w}});var a=t(52322),o=t(45392),r=t(96835),i=t(49857),l=t(17025),c=t(73645),d=t(99293),u=t(47497),s=t(61619),p=t(71107),h=t(69111),f=t(2784);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,a)}return t}function v(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?R(Object(t),!0).forEach(function(n){var a,o;a=n,o=t[n],(a=function(e){var n=function(e,n){if("object"!==m(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var a=t.call(e,n||"default");if("object"!==m(a))return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"===m(n)?n:String(n)}(a))in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var g=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,f.useState)({state:"idle",value:null}))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,o,r,i,l=[],c=!0,d=!1;try{for(r=(t=t.call(e)).next;!(c=(a=r.call(t)).done)&&(l.push(a.value),2!==l.length);c=!0);}catch(e){d=!0,o=e}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(d)throw o}}return l}}(e,2)||function(e,n){if(e){if("string"==typeof e)return x(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],a=n[1],o=(0,f.useRef)(null),r=(0,f.useCallback)(function(){a(function(e){return v(v({},e),{},{state:"loading",value:null})}),o.current&&(clearTimeout(o.current),o.current=null),o.current=setTimeout(function(){a({state:"success",value:"1"}),o.current=null},2e3)},[]);return(0,f.useEffect)(function(){r()},[r]),f.createElement(f.Fragment,null,f.createElement(i.Z,{mb:"4x"},f.createElement(l.Z,{onClick:function(){return r()}},f.createElement(c.Z,{alignItems:"center"},f.createElement(h.Z,{spin:!0,animationPlayState:"loading"===t.state?"running":"paused"}),f.createElement(d.Z,{width:"2x"}),"Reload"))),f.createElement(u.Z,{value:t.value,disabled:"loading"===t.state,onChange:function(e){a(function(n){return v(v({},n),{},{value:e})})}},f.createElement(s.Z,{spacing:"1x",shouldWrapChildren:!0},f.createElement(p.Z,{value:"1"},"First"),f.createElement(p.Z,{value:"2"},"Second"),f.createElement(p.Z,{value:"3"},"Third"))))},b=function(){return f.createElement(s.Z,{direction:"column",spacing:"2x",shouldWrapChildren:!0},f.createElement(u.Z,{defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3"))),f.createElement(u.Z,{disabled:!0,defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3"))))},j=function(){return f.createElement(s.Z,{direction:"column",spacing:"4x",shouldWrapChildren:!0},f.createElement(u.Z,{size:"sm",defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3"))),f.createElement(u.Z,{size:"md",defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3"))),f.createElement(u.Z,{size:"lg",defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3"))))},k=function(){return f.createElement(u.Z,{variantColor:"green",defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2")))},y=function(){return f.createElement(u.Z,{defaultValue:"1"},f.createElement(s.Z,{direction:"row",spacing:"3x"},f.createElement(p.Z,{value:"1"},"Radio 1"),f.createElement(p.Z,{value:"2"},"Radio 2"),f.createElement(p.Z,{value:"3"},"Radio 3")))};function S(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var Z=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,f.useState)("1"))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,o,r,i,l=[],c=!0,d=!1;try{for(r=(t=t.call(e)).next;!(c=(a=r.call(t)).done)&&(l.push(a.value),2!==l.length);c=!0);}catch(e){d=!0,o=e}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(d)throw o}}return l}}(e,2)||function(e,n){if(e){if("string"==typeof e)return S(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],a=n[1];return f.createElement(u.Z,{value:t,onChange:function(e){return a(e)}},f.createElement(s.Z,{spacing:"1x",shouldWrapChildren:!0},f.createElement(p.Z,{value:"1"},"First"),f.createElement(p.Z,{value:"2"},"Second"),f.createElement(p.Z,{value:"3"},"Third")))},E=function(){return f.createElement(u.Z,{defaultValue:"1"},f.createElement(s.Z,{spacing:"1x",shouldWrapChildren:!0},f.createElement(p.Z,{value:"1"},"First"),f.createElement(p.Z,{value:"2"},"Second"),f.createElement(p.Z,{value:"3"},"Third")))};function C(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,a.jsxs)(n.div,{className:"main-content",children:["\n","\n","\n","\n","\n","\n","\n","\n",(0,a.jsx)(n.h1,{id:"radiogroup",children:"RadioGroup"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"RadioGroup"})," is used to group related radio buttons."]}),"\n",(0,a.jsxs)(n.h2,{id:"import",children:["Import",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"import { RadioGroup } from '@tonic-ui/react';\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"usage",children:["Usage",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.h4,{id:"uncontrolled-radio-group",children:["Uncontrolled radio group",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#uncontrolled-radio-group",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:E,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup defaultValue="1">\n    <Stack spacing="1x" shouldWrapChildren>\n      <Radio value="1">First</Radio>\n      <Radio value="2">Second</Radio>\n      <Radio value="3">Third</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup defaultValue="1">\n    <Stack spacing="1x" shouldWrapChildren>\n      <Radio value="1">First</Radio>\n      <Radio value="2">Second</Radio>\n      <Radio value="3">Third</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h4,{id:"controlled-radio-group",children:["Controlled radio group",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-radio-group",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:Z,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React, { useState } from \'react\';\n\nconst App = () => {\n  const [value, setValue] = useState(\'1\');\n\n  return (\n    <RadioGroup value={value} onChange={value => setValue(value)}>\n      <Stack spacing="1x" shouldWrapChildren>\n        <Radio value="1">First</Radio>\n        <Radio value="2">Second</Radio>\n        <Radio value="3">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  );\n};\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React, { useState } from \'react\';\n\nconst App = () => {\n  const [value, setValue] = useState(\'1\');\n\n  return (\n    <RadioGroup value={value} onChange={value => setValue(value)}>\n      <Stack spacing="1x" shouldWrapChildren>\n        <Radio value="1">First</Radio>\n        <Radio value="2">Second</Radio>\n        <Radio value="3">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  );\n};\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h3,{id:"group-orientation",children:["Group orientation",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#group-orientation",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.p,{children:["Make a set of radios appear horizontal stacked rather than vertically, by adding ",(0,a.jsx)(n.code,{children:'flexDirection="row"'})," to the ",(0,a.jsx)(n.code,{children:"Stack"})," component."]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:y,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n      <Radio value="3">Radio 3</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h3,{id:"colors",children:["Colors",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#colors",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.p,{children:["Use the ",(0,a.jsx)(n.code,{children:"variantColor"})," prop to change the color scheme of the Radio. ",(0,a.jsx)(n.code,{children:"variantColor"})," can be any color key with key ",(0,a.jsx)(n.code,{children:"50"}),"(hover), ",(0,a.jsx)(n.code,{children:"60"}),"(checked) that exist in the ",(0,a.jsx)(n.code,{children:"theme.colors"}),"."]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:k,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup variantColor="green" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <RadioGroup variantColor="green" defaultValue="1">\n    <Stack direction="row" spacing="3x">\n      <Radio value="1">Radio 1</Radio>\n      <Radio value="2">Radio 2</Radio>\n    </Stack>\n  </RadioGroup>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h3,{id:"sizes",children:["Sizes",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#sizes",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.p,{children:["Use the ",(0,a.jsx)(n.code,{children:"size"})," prop to change the size of the ",(0,a.jsx)(n.code,{children:"RadioGroup"}),". You can set the value to ",(0,a.jsx)(n.code,{children:"sm"}),", ",(0,a.jsx)(n.code,{children:"md"}),", or ",(0,a.jsx)(n.code,{children:"lg"}),"."]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:j,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="4x" shouldWrapChildren>\n    <RadioGroup size="sm" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup size="md" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup size="lg" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n  </Stack>\n);\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="4x" shouldWrapChildren>\n    <RadioGroup size="sm" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup size="md" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup size="lg" defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h3,{id:"states",children:["States",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#states",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:b,file:{data:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="2x" shouldWrapChildren>\n    <RadioGroup defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup disabled defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n  </Stack>\n);\n\nexport default App;',path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:'import { Radio, RadioGroup, Stack } from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst App = () => (\n  <Stack direction="column" spacing="2x" shouldWrapChildren>\n    <RadioGroup defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n    <RadioGroup disabled defaultValue="1">\n      <Stack direction="row" spacing="3x">\n        <Radio value="1">Radio 1</Radio>\n        <Radio value="2">Radio 2</Radio>\n        <Radio value="3">Radio 3</Radio>\n      </Stack>\n    </RadioGroup>\n  </Stack>\n);\n\nexport default App;',title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h3,{id:"asynchronous-data-loading",children:["Asynchronous data loading",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#asynchronous-data-loading",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsx)(r.Z,Object.assign({},{component:g,file:{data:"import { Box, Flex, LinkButton, Radio, RadioGroup, Space, Stack } from '@tonic-ui/react';\nimport { RedoIcon } from '@tonic-ui/react-icons';\nimport React, { useCallback, useEffect, useRef, useState } from 'react';\n\nconst App = () => {\n  const [state, setState] = useState({\n    state: 'idle',\n    value: null,\n  });\n  const timerRef = useRef(null);\n  const fetchData = useCallback(() => {\n    setState(prevState => ({\n      ...prevState,\n      state: 'loading',\n      value: null,\n    }));\n\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n    timerRef.current = setTimeout(() => {\n      setState({\n        state: 'success',\n        value: '1',\n      });\n\n      timerRef.current = null;\n    }, 2000);\n  }, []);\n\n  useEffect(() => {\n    fetchData();\n  }, [fetchData]);\n\n  return (<>\n    <Box mb=\"4x\">\n      <LinkButton onClick={() => fetchData()}>\n        <Flex alignItems=\"center\">\n          <RedoIcon\n            spin={true}\n            animationPlayState={state.state === 'loading' ? 'running' : 'paused'} />\n          <Space width=\"2x\" />\n          Reload\n        </Flex>\n      </LinkButton>\n    </Box>\n    <RadioGroup\n      value={state.value}\n      disabled={state.state === 'loading'}\n      onChange={nextValue => {\n        setState(prevState => ({ ...prevState, value: nextValue }));\n      }}\n    >\n      <Stack spacing=\"1x\" shouldWrapChildren>\n        <Radio value=\"1\">First</Radio>\n        <Radio value=\"2\">Second</Radio>\n        <Radio value=\"3\">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  </>);\n};\n\nexport default App;",path:"pages/components/radio-group/index.page.mdx"},sandbox:{files:{},raw:"import { Box, Flex, LinkButton, Radio, RadioGroup, Space, Stack } from '@tonic-ui/react';\nimport { RedoIcon } from '@tonic-ui/react-icons';\nimport React, { useCallback, useEffect, useRef, useState } from 'react';\n\nconst App = () => {\n  const [state, setState] = useState({\n    state: 'idle',\n    value: null,\n  });\n  const timerRef = useRef(null);\n  const fetchData = useCallback(() => {\n    setState(prevState => ({\n      ...prevState,\n      state: 'loading',\n      value: null,\n    }));\n\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n    timerRef.current = setTimeout(() => {\n      setState({\n        state: 'success',\n        value: '1',\n      });\n\n      timerRef.current = null;\n    }, 2000);\n  }, []);\n\n  useEffect(() => {\n    fetchData();\n  }, [fetchData]);\n\n  return (<>\n    <Box mb=\"4x\">\n      <LinkButton onClick={() => fetchData()}>\n        <Flex alignItems=\"center\">\n          <RedoIcon\n            spin={true}\n            animationPlayState={state.state === 'loading' ? 'running' : 'paused'} />\n          <Space width=\"2x\" />\n          Reload\n        </Flex>\n      </LinkButton>\n    </Box>\n    <RadioGroup\n      value={state.value}\n      disabled={state.state === 'loading'}\n      onChange={nextValue => {\n        setState(prevState => ({ ...prevState, value: nextValue }));\n      }}\n    >\n      <Stack spacing=\"1x\" shouldWrapChildren>\n        <Radio value=\"1\">First</Radio>\n        <Radio value=\"2\">Second</Radio>\n        <Radio value=\"3\">Third</Radio>\n      </Stack>\n    </RadioGroup>\n  </>);\n};\n\nexport default App;",title:"Tonic UI"}})),"\n",(0,a.jsxs)(n.h2,{id:"props",children:["Props",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.h3,{id:"radiogroup-1",children:["RadioGroup",(0,a.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#radiogroup-1",children:(0,a.jsx)(n.svg,{children:(0,a.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{align:"left",children:"Name"}),(0,a.jsx)(n.th,{align:"left",children:"Type"}),(0,a.jsx)(n.th,{align:"left",children:"Default"}),(0,a.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"children"}),(0,a.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,a.jsx)(n.code,{children:"(context) => ReactNode"})]}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"A function child can be used intead of a React element. This function is called with the context object."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"defaultValue"}),(0,a.jsx)(n.td,{align:"left",children:"string | number"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsxs)(n.td,{align:"left",children:["The default ",(0,a.jsx)(n.code,{children:"input"})," element value. Use when the component is not controlled."]})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"disabled"}),(0,a.jsx)(n.td,{align:"left",children:"boolean"}),(0,a.jsx)(n.td,{align:"left",children:"false"}),(0,a.jsxs)(n.td,{align:"left",children:["If ",(0,a.jsx)(n.code,{children:"true"}),", all radios will be disabled."]})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"name"}),(0,a.jsx)(n.td,{align:"left",children:"string"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"onChange"}),(0,a.jsx)(n.td,{align:"left",children:"function"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"A callback called when the state of the radio changes."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"size"}),(0,a.jsx)(n.td,{align:"left",children:"string"}),(0,a.jsx)(n.td,{align:"left",children:"'md'"}),(0,a.jsx)(n.td,{align:"left",children:"The size (width and height) of the radio. One of: 'sm', 'md', 'lg'"})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"value"}),(0,a.jsx)(n.td,{align:"left",children:"string | number"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"The value to be used in the radio input. This is the value that will be returned on form submission."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{align:"left",children:"variantColor"}),(0,a.jsx)(n.td,{align:"left",children:"string"}),(0,a.jsx)(n.td,{align:"left"}),(0,a.jsx)(n.td,{align:"left",children:"The color of the radio when it's checked. This should be one of the color keys in the theme (e.g. 'green', 'red')."})]})]})]})]})}var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(C,e)})):C(e)}},96835:function(e,n,t){"use strict";t.d(n,{Z:function(){return G}});var a=t(27216),o=t(40596),r=t(49857),i=t(73645),l=t(99870),c=t(62272),d=t(14594),u=t(65019),s=t(37384),p=t(99554),h=t(69111),f=t(5632),m=t(2784),R=t(65245);function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var x=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);var t=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},g=function(e){var n,t=function(e){if(Array.isArray(e))return e}(n=(0,m.useState)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,o,r,i,l=[],c=!0,d=!1;try{for(r=(t=t.call(e)).next;!(c=(a=r.call(t)).done)&&(l.push(a.value),2!==l.length);c=!0);}catch(e){d=!0,o=e}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(d)throw o}}return l}}(n,2)||function(e,n){if(e){if("string"==typeof e)return v(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,2)}}(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=t[0],o=t[1];return{value:e,onCopy:function(){x(e),o(!0),setTimeout(function(){return o(!1)},1500)},hasCopied:a}},b=t(63768),j=t(76761),k=t(73205),y=t(98107),S=t(44285),Z=["component","defaultExpanded","expanded","file","sandbox"];function E(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,o,r,i,l=[],c=!0,d=!1;try{if(r=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;c=!1}else for(;!(c=(a=r.call(t)).done)&&(l.push(a.value),l.length!==n);c=!0);}catch(e){d=!0,o=e}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(d)throw o}}return l}}(e,n)||function(e,n){if(e){if("string"==typeof e)return C(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return C(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}var w=function(e){var n,t=e.component,v=e.defaultExpanded,x=e.expanded,C=e.file,w=e.sandbox;!function(e,n){if(null!=e){var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,Z);var G=(0,f.useRouter)(),A=E((0,m.useReducer)(function(e){return!e},!1),2),O=A[0],I=A[1],T=(0,a.u)(),z=E((0,o.Z)(),1)[0],V={dark:j.y,light:j.q}[z],N=E((0,u.Z)(null!=x?x:void 0!==v&&v),2),P=N[0],_=N[1],B=g(null==C?void 0:C.data),F=B.onCopy,D=B.hasCopied,H=(0,m.useCallback)(function(){F()},[F]),U=(0,m.useCallback)(function(){(0,k.b)(w)},[w]),W=(0,m.useCallback)(function(){I(),_(!1)},[I,_]);return((0,m.useEffect)(function(){void 0!==x&&x!==P&&_(x)},[x,P,_]),t)?m.createElement(R.nu,{code:null==C?void 0:C.data,disabled:!0,language:"jsx",theme:V},m.createElement(r.Z,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[z],p:"4x"},m.createElement(r.Z,{fontSize:"sm",lineHeight:"sm"},m.createElement(m.Fragment,{key:O},m.createElement(t,null)))),m.createElement(i.Z,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},m.createElement(S.Z,{"data-track":P?"CodeBlock|hide_source|".concat((0,y.Z)({path:G.pathname})):"CodeBlock|show_source|".concat((0,y.Z)({path:G.pathname})),onClick:_},m.createElement(l.Z,{label:P?"Hide the source":"Show the source"},m.createElement(s.Z,null))),m.createElement(S.Z,{"data-track":"CodeBlock|copy_source|".concat((0,y.Z)({path:G.pathname})),onClick:H},m.createElement(l.Z,{label:D?"Copied":"Copy the source"},m.createElement(p.Z,null))),m.createElement(S.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(G.pathname),onClick:U},m.createElement(l.Z,{label:"Edit in CodeSandbox"},m.createElement(b.Z,null))),m.createElement(S.Z,{"data-track":"CodeBlock|reset|".concat(G.pathname),onClick:W},m.createElement(l.Z,{label:"Reset the demo"},m.createElement(h.Z,null)))),m.createElement(c.Z,{in:P},m.createElement(d.Z,{in:P,unmountOnExit:!0},m.createElement(r.Z,{as:R.uz,sx:{fontFamily:"mono",fontSize:"md",lineHeight:"md",mb:"4x","& > .prism-code":{padding:"".concat(null==T?void 0:null===(n=T.space)||void 0===n?void 0:n["4x"]," !important"),overflowX:"auto"}}})))):m.createElement(R.nu,{code:null==C?void 0:C.data,disabled:!0,language:"jsx",theme:V},m.createElement(r.Z,{as:R.uz,sx:{fontFamily:"mono",fontSize:"sm","& > .prism-code":{overflowX:"auto"}}}))};w.displayName="Demo";var G=w},83740:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/radio-group",function(){return t(90272)}])},99554:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}}),t(2784);var a=t(75928),o=t(52903),r=(0,a.Z)((0,o.tZ)("path",{d:"M12 0h-6c-0.5 0-1 0.5-1 1v3h-3c-0.5 0-1 0.5-1 1v10c0 0.5 0.5 1 1 1h8c0.5 0 1-0.5 1-1v-3h3c0.5 0 1-0.5 1-1v-8l-3-3zM12 1.4l1.6 1.6h-1.6v-1.6zM10 15h-8v-10h5v3h3v7zM8 7v-1.6l1.6 1.6h-1.6zM14 11h-3v-4l-3-3h-2v-3h5v3h3v7z"}),"FileCopyOIcon")},69111:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}}),t(2784);var a=t(75928),o=t(52903),r=(0,a.Z)((0,o.tZ)("path",{d:"M10 7l1.995-1.995c-0.921-1.215-2.365-1.992-3.99-1.992-2.758 0-4.993 2.235-4.993 4.993s2.235 4.993 4.993 4.993c1.839 0 3.446-0.995 4.313-2.475l0.013-0.024 1.732 1c-1.233 2.111-3.487 3.507-6.068 3.507-3.867 0-7.003-3.135-7.003-7.003s3.135-7.003 7.003-7.003c2.183 0 4.133 0.999 5.417 2.565l0.010 0.012 1.579-1.579v5z"}),"RedoIcon")},17025:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var a=t(53860),o=t(2784),r=t(83513),i=t(98827),l=t(19088),c=t(10130),d=t(52903),u=(0,o.forwardRef)(function(e,n){var t=(0,i.Z)({props:e,name:"LinkButton"}),o=(0,c.u)();return(0,d.tZ)(l.Z,(0,a.Zj)((0,a.Zj)({as:r.Z,ref:n},o),t))});u.displayName="LinkButton";var s=u},71107:function(e,n,t){"use strict";t.d(n,{Z:function(){return k}});var a=t(53860),o=t(20325),r=t(56818),i=t(13409),l=t(2784),c=t(98827),d=t(35353),u="blue",s=t(5081),p=t(40596),h=t(27216),f=t(52903),m=t(49857),R=["size","variantColor","sx"],v=(0,l.forwardRef)(function(e,n){var t,o,i,l,c,d,v,x,g=e.size,b=void 0===g?"md":g,j=e.variantColor,k=void 0===j?u:j,y=e.sx,S=(0,a.Kd)(e,R),Z=(0,h.u)(),E=(0,p.Z)(),C=(0,a.ZQ)(E,1)[0],w={lg:"6x",md:"4x",sm:"3x"}[b],G={lg:"6x",md:"4x",sm:"3x"}[b],A="calc(".concat(null==Z?void 0:null===(v=Z.sizes)||void 0===v?void 0:v[w]," / 2)"),O="calc(".concat(null==Z?void 0:null===(x=Z.sizes)||void 0===x?void 0:x[G]," / 2)"),I=function(e){return'input[type="'.concat("radio",'"]')+(0,s.Zs)(e)+" + &"},T=(0,a.Zj)((0,a._x)((0,a._x)({border:1,borderRadius:"circle",width:w,height:G},I()+"> *",{opacity:0}),I(":checked")+"> *",{opacity:1}),(t=({dark:"".concat(k,":60"),light:"".concat(k,":60")})[C],o=({dark:"".concat(k,":50"),light:"".concat(k,":50")})[C],i=({dark:"".concat(k,":50"),light:"".concat(k,":50")})[C],l=({dark:"gray:60",light:"gray:40"})[C],c=({dark:"".concat(k,":60"),light:"".concat(k,":60")})[C],d=({dark:"".concat(k,":60"),light:"".concat(k,":60")})[C],(0,a._x)((0,a._x)((0,a._x)((0,a._x)((0,a._x)((0,a._x)({borderColor:{dark:"gray:50",light:"gray:40"}[C]},I(":hover"),{borderColor:i}),I(":focus-visible"),{outlineColor:d,outlineStyle:"solid",outlineWidth:"1h"}),I(":disabled"),{borderColor:l,opacity:.28}),I(":checked"),{borderColor:c,color:t}),I(":checked:hover:not(:disabled)"),{borderColor:i,color:o}),I(":checked:disabled"),{borderColor:l,color:{dark:"gray:60",light:"gray:40"}[C],opacity:.28})));return(0,f.tZ)(m.Z,(0,a.Zj)((0,a.Zj)((0,a.Zj)({"aria-hidden":(0,r.Qm)(!0),role:"radio",sx:[T].concat((0,a.u)((0,s.rY)(y)))},{display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,userSelect:"none"}),S),{},{children:(0,f.tZ)(m.Z,{backgroundColor:"currentColor",borderRadius:"circle",display:"inline-flex",width:A,height:O})}))});v.displayName="RadioControlBox";var x=t(84769),g=function(){if(!l.useContext)throw Error("The `useContext` hook is not available with your React version.");return(0,l.useContext)(x.L)},b=["checked","children","defaultChecked","disabled","id","inputProps","inputRef","name","onBlur","onChange","onClick","onFocus","size","value","variantColor"],j=(0,l.forwardRef)(function(e,n){var t,s,p=(0,c.Z)({props:e,name:"Radio"}),h=p.checked,R=p.children,x=p.defaultChecked,j=p.disabled,k=p.id,y=p.inputProps,S=p.inputRef,Z=p.name,E=p.onBlur,C=p.onChange,w=p.onClick,G=p.onFocus,A=p.size,O=p.value,I=p.variantColor,T=(0,a.Kd)(p,b),z=h,V=j,N=Z,P=C,_=A,B=I,F=(0,l.useRef)(),D=(0,o.Z)(S,F),H=g();if(H){var U,W,L,M,X=(0,a.Zj)({},H),$=X.disabled,Q=X.name,K=X.size,Y=X.value,q=X.variantColor,J=X.onChange;void 0!==Y&&(z=Y===O),V=$||V,N=null!=Q?Q:N,P=(0,r.PP)(P,J),_=null!==(U=null!==(W=_)&&void 0!==W?W:K)&&void 0!==U?U:"md",B=null!==(L=null!==(M=B)&&void 0!==M?M:q)&&void 0!==L?L:u}else _=null!==(t=_)&&void 0!==t?t:"md",B=null!==(s=B)&&void 0!==s?s:u;var ee={display:"inline-flex",verticalAlign:"top",alignItems:"center",cursor:V?"not-allowed":"pointer"};return(0,f.BX)(m.Z,(0,a.Zj)((0,a.Zj)((0,a.Zj)({as:"label",ref:n},ee),T),{},{children:[(0,f.tZ)(d.Z,(0,a.Zj)({as:"input",checked:z,defaultChecked:x,disabled:V,id:k,name:N,onBlur:E,onChange:P,onClick:w,onFocus:G,ref:D,type:"radio",value:O},y)),(0,f.tZ)(v,{size:_,variantColor:B}),!(0,i.Rw)(R)&&(0,f.tZ)(m.Z,{ml:"2x",userSelect:"none",opacity:V?.28:1,children:R})]}))});j.displayName="Radio";var k=j},47497:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var a=t(53860),o=t(56818),r=t(92307),i=t.n(r),l=t(2784),c=t(98827),d=t(65204),u=t(20655),s=t(84769),p=t(52903),h=i()(function(e){return(0,a.Zj)({},e)}),f=function(e){var n=(0,c.Z)({props:e,name:"RadioGroup"}),t=n.children,r=n.defaultValue,i=n.disabled,f=n.name,m=n.size,R=n.value,v=n.variantColor,x=n.onChange,g=(0,u.Z)(),b=null!=f?f:"".concat(d.Z.name,":RadioGroup-").concat(g),j=(0,l.useState)({value:null!=R?R:r}),k=(0,a.ZQ)(j,2),y=k[0],S=k[1];(0,l.useEffect)(function(){void 0!==R&&S({value:R})},[R]);var Z=h({disabled:i,name:b,onChange:function(e){var n=e.target.value;void 0!==R?S({value:R}):S({value:n}),"function"==typeof x&&x(n)},size:m,value:y.value,variantColor:v});return(0,p.tZ)(s.L.Provider,{value:Z,children:(0,o.Pu)(t,Z)})};f.displayName="RadioGroup";var m=f},84769:function(e,n,t){"use strict";t.d(n,{L:function(){return a}});var a=(0,t(2784).createContext)()},35353:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var a=t(53860),o=t(2784),r=t(98827),i=t(52903),l=t(49857),c=(0,o.forwardRef)(function(e,n){var t=(0,r.Z)({props:e,name:"VisuallyHidden"});return(0,i.tZ)(l.Z,(0,a.Zj)((0,a.Zj)({ref:n},{position:"absolute",width:1,height:1,padding:0,border:0,overflow:"hidden",clipPath:"inset(50%)",whiteSpace:"nowrap"}),t))});c.displayName="VisuallyHidden";var d=c}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=83740)}),_N_E=e.O()}]);