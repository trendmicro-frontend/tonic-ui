(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8867],{97371:function(e,n,s){"use strict";s.r(n);var c=s(52322),i=s(45392);function t(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,i.ah)(),e.components);return(0,c.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,c.jsx)(n.h1,{id:"useeffectonce",children:"useEffectOnce"}),"\n",(0,c.jsxs)(n.p,{children:["A modified version of the ",(0,c.jsx)(n.code,{children:"useEffect"})," Hook that runs an effect only once."]}),"\n",(0,c.jsxs)(n.h2,{id:"import",children:["Import",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-js",children:"import { useEffectOnce } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,c.jsxs)(n.h2,{id:"usage",children:["Usage",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-js",children:"useEffectOnce(effect);\n"})}),"\n",(0,c.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{align:"left",children:"Name"}),(0,c.jsx)(n.th,{align:"left",children:"Type"}),(0,c.jsx)(n.th,{align:"left",children:"Default"}),(0,c.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,c.jsx)(n.tbody,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{align:"left",children:"effect"}),(0,c.jsx)(n.td,{align:"left",children:(0,c.jsx)(n.code,{children:"() => void"})}),(0,c.jsx)(n.td,{align:"left"}),(0,c.jsx)(n.td,{align:"left",children:"The effect to run."})]})})]}),"\n",(0,c.jsxs)(n.h2,{id:"demos",children:["Demos",(0,c.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,c.jsx)(n.svg,{children:(0,c.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  const [value, setValue] = React.useState(0);\n\n  React.useEffect(() => {\n    console.log('useEffect is triggered when value changes', { value });\n  }, [value]);\n\n  useEffectOnce(() => {\n    console.log('useEffectOnce is triggered only once', { value });\n  });\n\n  return (\n    <>\n      <Box mb=\"2x\">\n        {value}\n      </Box>\n      <Button onClick={() => setValue(value => value + 1)}>\n        Click Me\n      </Button>\n    </>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,i.ah)(),e.components).wrapper;return n?(0,c.jsx)(n,Object.assign({},e,{children:(0,c.jsx)(t,e)})):t(e)}},10531:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEffectOnce",function(){return s(97371)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=10531)}),_N_E=e.O()}]);