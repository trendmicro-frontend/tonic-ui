(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9440],{54132:function(e,n,t){"use strict";t.r(n);var o=t(52322),r=t(45392);function l(e){var n=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,r.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{children:"Portal"}),"\n",(0,o.jsx)(n.p,{children:"A declarative component that allows you to render children into a DOM node that exists outside the DOM hierarchy of the parent component."}),"\n",(0,o.jsx)(n.h2,{children:"Import"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"import { Portal } from '@tonic-ui/react';\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Usage"}),"\n",(0,o.jsx)(n.p,{children:"Portal is used to transport any component or element to the end of the document body, and renders the children into it. This is useful for components that need to be rendered above other elements, such as drawers, modals, popovers, etc."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <>\n      <Portal>\n        <VisuallyHidden>\n          {/* Open developer tool to inspect elements inside the body tag */}\n          <Box bg={colorStyle.background.tertiary} px="3x" py="2x">\n            Portal - This is transported to the end of the document body\n          </Box>\n        </VisuallyHidden>\n      </Portal>\n      <Box bg={colorStyle.background.secondary} px="3x" py="2x">\n        I\'m the container\n      </Box>\n    </>\n  );\n}\n'})}),"\n",(0,o.jsx)(n.h3,{children:"Using a custom container"}),"\n",(0,o.jsxs)(n.p,{children:["Pass the ",(0,o.jsx)(n.code,{children:"containerRef"})," prop and its value to the ",(0,o.jsx)(n.code,{children:"ref"})," of the container that you want to render the children into."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const ref = React.useRef();\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <>\n      <Portal containerRef={ref}>\n        <Box bg={colorStyle.background.tertiary} px="3x" py="2x">\n          Portal - This is transported to the container\n        </Box>\n      </Portal>\n      <Flex flexDirection="column" rowGap="2x">\n        <Box ref={ref} bg={colorStyle.background.secondary} px="3x" py="2x">\n          I\'m the container\n        </Box>\n      </Flex>\n    </>\n  );\n}\n'})}),"\n",(0,o.jsx)(n.h3,{children:"Nested portals"}),"\n",(0,o.jsxs)(n.p,{children:["You can nest portals inside a portal. Pass ",(0,o.jsx)(n.code,{children:"appendToParentPortal={true}"})," to the nested portal to append the children to the container of the parent portal."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const ref = React.useRef();\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <>\n      <Portal containerRef={ref}>\n        <Box bg={colorStyle.background.tertiary} px="3x" py="2x" mb="2x">\n          Parent portal - This is transported to the container\n          <Portal appendToParentPortal={true}>\n            <Box bg={colorStyle.background.tertiary} px="3x" py="2x" mb="2x">\n              Child portal - This is attached to its parent portal\n            </Box>\n          </Portal>\n        </Box>\n      </Portal>\n      <Box ref={ref} bg={colorStyle.background.secondary} px="3x" py="2x">\n        I\'m the container\n      </Box>\n    </>\n  );\n}\n'})}),"\n",(0,o.jsx)(n.h2,{children:"Props"}),"\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{align:"left",children:"Name"}),(0,o.jsx)(n.th,{align:"left",children:"Type"}),(0,o.jsx)(n.th,{align:"left",children:"Default"}),(0,o.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{align:"left",children:"appendToParentPortal"}),(0,o.jsx)(n.td,{align:"left",children:"boolean"}),(0,o.jsx)(n.td,{align:"left",children:"false"}),(0,o.jsxs)(n.td,{align:"left",children:["If ",(0,o.jsx)(n.code,{children:"true"}),", the portal will check if it is within a parent portal and append itself to the parent's portal node."]})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{align:"left",children:"children"}),(0,o.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,o.jsx)(n.td,{align:"left"}),(0,o.jsx)(n.td,{align:"left"})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{align:"left",children:"containerRef"}),(0,o.jsx)(n.td,{align:"left",children:"RefObject"}),(0,o.jsx)(n.td,{align:"left"}),(0,o.jsxs)(n.td,{align:"left",children:["The ",(0,o.jsx)(n.code,{children:"ref"})," to the component where the portal will be rendered."]})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components).wrapper;return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(l,e)})):l(e)}},76568:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/portal",function(){return t(54132)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=76568)}),_N_E=e.O()}]);