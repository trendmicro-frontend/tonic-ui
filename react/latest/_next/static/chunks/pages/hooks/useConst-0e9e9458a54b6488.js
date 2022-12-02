(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5929],{90987:function(e,n,t){"use strict";t.r(n);var s=t(52322),i=t(45392);function a(e){var n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,i.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{children:"useConst"}),"\n",(0,s.jsx)(n.p,{children:"A custom Hook that creates a constant value over the lifecycle of a component."}),"\n",(0,s.jsxs)(n.p,{children:["Unlike ",(0,s.jsx)(n.code,{children:"React.useMemo"}),", this is guaranteed to always return the same value (and if the initializer is a function, only call it once). This is similar to setting a private member in a class constructor."]}),"\n",(0,s.jsxs)(n.p,{children:["If the value should ever change based on dependencies, use ",(0,s.jsx)(n.code,{children:"React.useMemo"})," instead."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"// import\nimport { useConst } from '@tonic-ui/react-hooks';\n\n// usage\nconst value = useConst(initialValue);\n"})}),"\n",(0,s.jsx)(n.h3,{children:"Parameters"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{align:"left",children:"Name"}),(0,s.jsx)(n.th,{align:"left",children:"Type"}),(0,s.jsx)(n.th,{align:"left",children:"Default"}),(0,s.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"initialValue"}),(0,s.jsxs)(n.td,{align:"left",children:["any | ",(0,s.jsx)(n.code,{children:"() => any"})]}),(0,s.jsx)(n.td,{align:"left"}),(0,s.jsxs)(n.td,{align:"left",children:["Initial value, or function to get the initial value. Similar to ",(0,s.jsx)(n.code,{children:"useState"}),", only the value/function passed in the first time this is called is respected."]})]})})]}),"\n",(0,s.jsx)(n.h3,{children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:"The value. This is the same value that is returned by the initializer."}),"\n",(0,s.jsx)(n.h3,{children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'function Component() {\n  const mountTime = useConst(() => new Date().toTimeString());\n  const randomValue = useConst(Math.random());\n\n  return (\n    <Box display="flex" flexDirection="column" rowGap="2x">\n      <Box>Mount time: {mountTime}</Box>\n      <Box>Random value: {randomValue}</Box>\n    </Box>\n  )\n}\n'})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,i.ah)(),e.components).wrapper;return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(a,e)})):a(e)}},87658:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useConst",function(){return t(90987)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=87658)}),_N_E=e.O()}]);