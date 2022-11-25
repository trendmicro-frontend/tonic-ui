(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8996],{4539:function(e,n,t){"use strict";t.r(n);var l=t(2322),s=t(5392);function i(e){var n=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,s.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{children:"useToggle"}),"\n",(0,l.jsx)(n.p,{children:"A custom Hook that toggles between boolean values. It also accepts a toggle function that can be used to change the value."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"// import\nimport { useToggle } from '@tonic-ui/react-hooks';\n\n// usage\nconst [value, toggleValue] = useToggle(initialValue, [toggleReducer]);\n"})}),"\n",(0,l.jsx)(n.h3,{children:"Parameters"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{align:"left",children:"Name"}),(0,l.jsx)(n.th,{align:"left",children:"Type"}),(0,l.jsx)(n.th,{align:"left",children:"Default"}),(0,l.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"initialValue"}),(0,l.jsx)(n.td,{align:"left",children:"boolean"}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"The initial value of the toggle."})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"toggleReducer?"}),(0,l.jsx)(n.td,{align:"left",children:(0,l.jsx)(n.code,{children:"(state: boolean, nextValue: boolean) => boolean"})}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"An optional reducer function that can be used to determine the next value."})]})]})]}),"\n",(0,l.jsx)(n.h3,{children:"Returns"}),"\n",(0,l.jsx)(n.p,{children:"Returns an array with the current value and a function to toggle the value."}),"\n",(0,l.jsx)(n.p,{children:"If a boolean value is explicitly passed to the toggle function, it will be used instead of negating the current value."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"const defaultToggleReducer = (state, nextValue) => {\n  return (typeof nextValue === 'boolean') ? nextValue : !state;\n};\n"})}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{align:"left",children:"Toggle Function"}),(0,l.jsx)(n.th,{align:"left",children:"Previous Value"}),(0,l.jsx)(n.th,{align:"left",children:"Next Value"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsxs)(n.td,{align:"left",children:["toggle()",(0,l.jsx)("br",{}),"toggle(event: MouseEvent)"]}),(0,l.jsx)(n.td,{align:"left",children:"true"}),(0,l.jsx)(n.td,{align:"left",children:"false"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsxs)(n.td,{align:"left",children:["toggle()",(0,l.jsx)("br",{}),"toggle(event: MouseEvent)"]}),(0,l.jsx)(n.td,{align:"left",children:"false"}),(0,l.jsx)(n.td,{align:"left",children:"true"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"toggle(false)"}),(0,l.jsx)(n.td,{align:"left",children:"true | false"}),(0,l.jsx)(n.td,{align:"left",children:"false"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"toggle(true)"}),(0,l.jsx)(n.td,{align:"left",children:"true | false"}),(0,l.jsx)(n.td,{align:"left",children:"true"})]})]})]}),"\n",(0,l.jsx)(n.h3,{children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"function Switch() {\n  const [value, toggleValue] = useToggle(false);\n\n  return (\n    <Button onClick={toggleValue}>\n      {value ? 'ON' : 'OFF'}\n    </Button>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(i,e)})):i(e)}},5082:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useToggle",function(){return t(4539)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=5082)}),_N_E=e.O()}]);