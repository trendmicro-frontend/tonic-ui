(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1320],{57291:function(e,n,o){"use strict";o.r(n);var a=o(52322),r=o(45392);function t(e){var n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre"},(0,r.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{children:"PortalManager"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"PortalManager"})," allows you to create and manage portals in your application. A portal is a way to render a component outside of the current component's DOM tree. This can be useful for creating modals, dialogs, and other types of overlay components."]}),"\n",(0,a.jsx)(n.h2,{children:"Setup"}),"\n",(0,a.jsxs)(n.p,{children:["To incorporate with ",(0,a.jsx)(n.code,{children:"PortalManager"}),", wrap your root component with the ",(0,a.jsx)(n.code,{children:"PortalManager"})," component. This provides a context that the ",(0,a.jsx)(n.code,{children:"usePortalManager"})," Hook can access."]}),"\n",(0,a.jsx)(n.pre,{disabled:!0,children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import { TonicProvider, PortalManager } from '@tonic-ui/react';\n\nfunction App() {\n  return (\n    <TonicProvider>\n      <PortalManager>\n        {/* Your app goes here */}\n      </PortalManager>\n    </TonicProvider>\n  );\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Once ",(0,a.jsx)(n.code,{children:"PortalManager"})," is set up, any component can use the ",(0,a.jsx)(n.code,{children:"usePortalManager"})," Hook to create and manage portals."]}),"\n",(0,a.jsx)(n.pre,{disabled:!0,children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import { usePortalManager } from '@tonic-ui/react';\n\nfunction MyComponent() {\n  const portal = usePortalManager();\n  const openModal = () => {\n    portal((close) => (\n      <MyModal onClose={close} />\n    ));\n  };\n\n  return (\n    <Button onClick={openModal}>Open Modal</Button>\n  );\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["In the example above, ",(0,a.jsx)(n.code,{children:"MyModal"})," is a wrapper component that represents the modal you want to render. The ",(0,a.jsx)(n.code,{children:"onClose"})," prop is a function that is passed to the modal component, and can be used to close the modal."]}),"\n",(0,a.jsx)(n.pre,{disabled:!0,children:(0,a.jsx)(n.code,{className:"language-jsx",children:'const MyModal = forwardRef(\n  {\n    onClose,\n    ...rest\n  },\n  ref,\n) => (\n  <Modal\n    ref={ref}\n    closeOnEsc\n    closeOnOutsideClick\n    isOpen\n    onClose={onClose}\n    size="sm"\n    {...rest}\n  >\n    <ModalOverlay />\n    <ModalContent>\n      <ModalHeader>\n        Modal Header\n      </ModalHeader>\n      <ModalBody>\n        Modal Body\n      </ModalBody>\n      <ModalFooter>\n        <Button onClick={onClose}>Close</Button>\n      </ModalFooter>\n    </ModalContent>\n  </Modal>\n));\n'})}),"\n",(0,a.jsxs)(n.p,{children:["To remove a portal, call the callback function passed by the ",(0,a.jsx)(n.code,{children:"portal"})," method."]}),"\n",(0,a.jsx)(n.pre,{disabled:!0,children:(0,a.jsx)(n.code,{className:"language-jsx",children:"const id = portal((close) => (\n  <MyModal onClose={close} />\n));\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Or use the ",(0,a.jsx)(n.code,{children:"remove"})," method by passing the portal's unique id as an argument."]}),"\n",(0,a.jsx)(n.pre,{disabled:!0,children:(0,a.jsx)(n.code,{className:"language-jsx",children:"portal.remove(id);\n"})}),"\n",(0,a.jsx)(n.p,{children:"It is important to note that removing portals is an explicit operation, and if a portal is not removed, it will continue to exist in the DOM tree. Therefore, it is the developer's responsibility to ensure that portals are removed when they are no longer needed."})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components).wrapper;return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(t,e)})):t(e)}},60394:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/portal-manager",function(){return o(57291)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=60394)}),_N_E=e.O()}]);