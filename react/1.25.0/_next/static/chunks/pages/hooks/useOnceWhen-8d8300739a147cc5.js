(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5388],{56575:function(n,e,s){"use strict";s.r(e);var l=s(52322),c=s(45392);function a(n){var e=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,c.ah)(),n.components);return(0,l.jsxs)(e.div,{className:"main-content",id:"main-content",children:[(0,l.jsx)(e.h1,{id:"useoncewhen",children:"useOnceWhen"}),"\n",(0,l.jsx)(e.p,{children:"A custom Hook that runs a callback at most once when a condition becomes true."}),"\n",(0,l.jsxs)(e.h2,{id:"import",children:["Import",(0,l.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,l.jsx)(e.svg,{children:(0,l.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-js",children:"import { useOnceWhen } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,l.jsxs)(e.h2,{id:"usage",children:["Usage",(0,l.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,l.jsx)(e.svg,{children:(0,l.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-js",children:"useOnceWhen(callback, when);\n"})}),"\n",(0,l.jsxs)(e.h3,{id:"parameters",children:["Parameters",(0,l.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,l.jsx)(e.svg,{children:(0,l.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{align:"left",children:"Name"}),(0,l.jsx)(e.th,{align:"left",children:"Type"}),(0,l.jsx)(e.th,{align:"left",children:"Default"}),(0,l.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"callback"}),(0,l.jsx)(e.td,{align:"left",children:(0,l.jsx)(e.code,{children:"() => void"})}),(0,l.jsx)(e.td,{align:"left"}),(0,l.jsx)(e.td,{align:"left",children:"The callback to run."})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{align:"left",children:"when"}),(0,l.jsx)(e.td,{align:"left",children:"boolean"}),(0,l.jsx)(e.td,{align:"left",children:"false"}),(0,l.jsx)(e.td,{align:"left",children:"The condition to run the callback."})]})]})]}),"\n",(0,l.jsxs)(e.h2,{id:"demos",children:["Demos",(0,l.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,l.jsx)(e.svg,{children:(0,l.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-jsx",children:"function Component() {\n  const [value, setValue] = React.useState(0);\n  const ref = React.useRef(0);\n\n  useOnceWhen(() => {\n    console.log('This will run only once when clicked');\n    ref.current++;\n  }, (value > 0));\n\n  return (\n    <>\n      <Box mb=\"4x\">\n        Callback called: {ref.current}\n      </Box>\n      <Button onClick={() => setValue(value => value + 1)}>\n        Click Me\n      </Button>\n    </>\n  );\n}\n"})})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object.assign({},(0,c.ah)(),n.components).wrapper;return e?(0,l.jsx)(e,Object.assign({},n,{children:(0,l.jsx)(a,n)})):a(n)}},45641:function(n,e,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useOnceWhen",function(){return s(56575)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=45641)}),_N_E=n.O()}]);