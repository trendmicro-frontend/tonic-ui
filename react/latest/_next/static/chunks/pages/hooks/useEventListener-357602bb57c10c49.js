(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1749],{5464:function(e,n,t){"use strict";t.r(n);var l=t(2322),s=t(5392);function r(e){var n=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,s.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{children:"useEventListener"}),"\n",(0,l.jsx)(n.p,{children:"A custom Hook to manage browser event listeners."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"// import\nimport { useEventListener } from '@tonic-ui/react-hooks';\n\n// usage\nuseEventListener(target, eventName, eventHandler, [options]);\n"})}),"\n",(0,l.jsx)(n.h3,{children:"Parameters"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{align:"left",children:"Name"}),(0,l.jsx)(n.th,{align:"left",children:"Type"}),(0,l.jsx)(n.th,{align:"left",children:"Default"}),(0,l.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"target"}),(0,l.jsx)(n.td,{align:"left",children:"HTMLElement"}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"The target element to attach the event listener to."})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"eventName"}),(0,l.jsx)(n.td,{align:"left",children:"string"}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"The name of the event to listen for."})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"eventHandler"}),(0,l.jsx)(n.td,{align:"left",children:(0,l.jsx)(n.code,{children:"(event: MouseEvent) => void"})}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"The event handler to call when the event is fired."})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"options?"}),(0,l.jsx)(n.td,{align:"left",children:"object"}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"Optional options to pass to the event handler."})]})]})]}),"\n",(0,l.jsx)(n.h3,{children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  const buttonRef = React.useRef(null);\n\n  const onScroll = (event) => {\n    console.log('document scrolled', event);\n  };\n\n  const onClick = (event) => {\n    console.log('button clicked', event);\n  };\n\n  // example with document based event\n  useEventListener(\n    () => (buttonRef.current.ownerDocument || document),\n    'scroll',\n    onScroll,\n  );\n\n  // example with element based event\n  useEventListener(\n    () => buttonRef.current,\n    'click',\n    onClick,\n  );\n\n  return (\n    <Button ref={buttonRef}>\n      Click Me\n    </Button>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(r,e)})):r(e)}},4737:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useEventListener",function(){return t(5464)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=4737)}),_N_E=e.O()}]);