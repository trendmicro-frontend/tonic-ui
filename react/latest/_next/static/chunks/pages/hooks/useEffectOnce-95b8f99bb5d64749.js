(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8867],{7371:function(e,n,t){"use strict";t.r(n);var c=t(2322),s=t(5392);function l(e){var n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,s.ah)(),e.components);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{children:"useEffectOnce"}),"\n",(0,c.jsxs)(n.p,{children:["A modified version of the ",(0,c.jsx)(n.code,{children:"useEffect"})," Hook that runs an effect only once."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-js",children:"// import\nimport { useEffectOnce } from '@tonic-ui/react-hooks';\n\n// usage\nuseEffectOnce(effect);\n"})}),"\n",(0,c.jsx)(n.h3,{children:"Parameters"}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{align:"left",children:"Name"}),(0,c.jsx)(n.th,{align:"left",children:"Type"}),(0,c.jsx)(n.th,{align:"left",children:"Default"}),(0,c.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,c.jsx)(n.tbody,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"effect"}),(0,c.jsx)(n.td,{align:"left",children:(0,c.jsx)(n.code,{children:"() => void"})}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The effect to run."})]})})]}),"\n",(0,c.jsx)(n.h3,{children:"Example"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  const [value, setValue] = React.useState(0);\n\n  React.useEffect(() => {\n    console.log('useEffect is triggered when value changes', { value });\n  }, [value]);\n\n  useEffectOnce(() => {\n    console.log('useEffectOnce is triggered only once', { value });\n  });\n\n  return (\n    <>\n      <Box mb=\"2x\">\n        {value}\n      </Box>\n      <Button onClick={() => setValue(value => value + 1)}>\n        Click Me\n      </Button>\n    </>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?(0,c.jsx)(n,Object.assign({},e,{children:(0,c.jsx)(l,e)})):l(e)}},531:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEffectOnce",function(){return t(7371)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=531)}),_N_E=e.O()}]);