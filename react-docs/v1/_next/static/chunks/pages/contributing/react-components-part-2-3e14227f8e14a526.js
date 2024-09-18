(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7190],{84770:function(e,n,t){"use strict";t.r(n);var r=t(52322),o=t(45392);function s(e){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",p:"p",h3:"h3",code:"code",pre:"pre",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,r.jsxs)(n.h1,{id:"contributing-to-react-components-part-2",children:["Contributing to React Components ",(0,r.jsx)("sup",{children:"PART 2"})]}),"\n",(0,r.jsxs)(n.h2,{id:"coding-style",children:["Coding Style",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#coding-style",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"The coding style guideline is provided here to help maintain consistency across the codebase. You can refer to the examples below for various types of components."}),"\n",(0,r.jsxs)(n.h3,{id:"basic-component",children:["Basic Component",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#basic-component",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["A basic component should be a functional component that is wrapped in ",(0,r.jsx)(n.code,{children:"forwardRef"}),". The ",(0,r.jsx)(n.code,{children:"displayName"})," is set for easier debugging and inspection."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import React, { forwardRef } from 'react';\nimport { useComponentStyle } from './styles';\n\nconst Component = forwardRef((props, ref) => {\n  const styleProps = useComponentStyle();\n\n  return (\n    <Box\n      ref={ref}\n      {...styleProps}\n      {...props}\n    />\n  );\n});\n\nComponent.displayName = 'Component';\n\nexport default Component;\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"function-as-child-component-facc",children:["Function as Child Component (FaCC)",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#function-as-child-component-facc",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["For components that accept a function as a child, use the ",(0,r.jsx)(n.code,{children:"runIfFn"})," utility to ensure that the child function is executed correctly."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { runIfFn } from '@tonic-ui/utils';\nimport React, { forwardRef } from 'react';\nimport { useComponentStyle } from './styles';\n\nconst Component = forwardRef((\n  {\n    children,\n    variant,\n    ...rest\n  },\n  ref,\n) => {\n  const styleProps = useComponentStyle({ variant });\n\n  return (\n    <Box\n      ref={ref}\n      {...styleProps}\n      {...rest}\n    >\n      {runIfFn(children)}\n    </Box>\n  );\n});\n\nComponent.displayName = 'Component';\n\nexport default Component;\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"context-provider",children:["Context Provider",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#context-provider",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["When creating components that share state or methods via context, memoize the state to avoid unnecessary re-renders. You can use either ",(0,r.jsx)(n.code,{children:"micro-memoize"})," or ",(0,r.jsx)(n.code,{children:"useMemo"})," to achieve this. ",(0,r.jsx)(n.code,{children:"micro-memoize"})," does not require specifying dependencies, making the code cleaner."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { runIfFn } from '@tonic-ui/utils';\nimport memoize from 'micro-memoize';\nimport React, { forwardRef } from 'react';\nimport { ComponentContext } from './context';\nimport { useComponentStyle } from './styles';\n\nconst getMemoizedState = memoize(state => ({ ...state }));\n\nconst Component = forwardRef((\n  {\n    children,\n    variant,\n    ...rest\n  },\n  ref,\n) => {\n  const context = getMemoizedState({ variant }); // or `useMemo`\n  const styleProps = useComponentStyle({ variant });\n\n  return (\n    <ComponentContext.Provider value={context}>\n      <Box\n        ref={ref}\n        {...styleProps}\n        {...rest}\n      >\n        {runIfFn(children, context)}\n      </Box>\n    </ComponentContext.Provider>\n  );\n});\n\nComponent.displayName = 'Component';\n\nexport default Component;\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"controlled-and-uncontrolled-component",children:["Controlled and Uncontrolled Component",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#controlled-and-uncontrolled-component",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"For components that manage their own state but can also be controlled externally, use a reducer and effect hooks to synchronize state changes."}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { runIfFn } from '@tonic-ui/utils';\nimport memoize from 'micro-memoize';\nimport React, { forwardRef, useEffect, useReducer } from 'react';\nimport { ComponentContext } from './context';\nimport { useComponentStyle } from './styles';\n\nconst getMemoizedState = memoize(state => ({ ...state }));\n\nconst stateReducer = (prevState, nextState) => ({\n  ...prevState,\n  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),\n});\n\nconst Component = forwardRef((\n  {\n    children,\n    defaultValue = 0,\n    onChange,\n    value: valueProp,\n    variant,\n    ...rest\n  },\n  ref,\n) => {\n  const [state, setState] = useReducer(stateReducer, {\n    value: valueProp ?? defaultValue,\n  });\n\n  useEffect(() => {\n    const isControlled = (valueProp !== undefined);\n    if (isControlled) {\n      setState({ value: valueProp });\n    }\n  }, [valueProp]);\n\n  const handleChange = (nextValue) => {\n    const isControlled = (valueProp !== undefined);\n    if (!isControlled) {\n      setState({ value: nextValue });\n    }\n\n    if (typeof onChange === 'function') {\n      onChange(nextValue);\n    }\n  };\n\n  const styleProps = useComponentStyle({ variant });\n  const context = getMemoizedState({\n    onChange: handleChange,\n    value: state.value,\n    variant,\n  });\n\n  return (\n    <ComponentContext.Provider value={context}>\n      <Box\n        ref={ref}\n        {...styleProps}\n        {...rest}\n      >\n        {runIfFn(children, context)}\n      </Box>\n    </ComponentContext.Provider>\n  );\n});\n\nComponent.displayName = 'Component';\n\nexport default Component;\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"naming-convention",children:["Naming Convention",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#naming-convention",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"ground-rules",children:["Ground rules",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#ground-rules",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Prefix boolean types with ",(0,r.jsx)(n.code,{children:"is"}),". For example: ",(0,r.jsx)(n.code,{children:"isClosable"}),", ",(0,r.jsx)(n.code,{children:"isOpen"}),". However, maintain the default naming convention for ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes",children:"global attributes"})," or ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes",children:"element attributes"})," like ",(0,r.jsx)(n.code,{children:"checked"}),", ",(0,r.jsx)(n.code,{children:"disabled"}),", ",(0,r.jsx)(n.code,{children:"error"}),", ",(0,r.jsx)(n.code,{children:"readOnly"}),", ",(0,r.jsx)(n.code,{children:"required"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"Use singular form for non-array types and plural form for arrays."}),"\n",(0,r.jsxs)(n.li,{children:["Use the ",(0,r.jsx)(n.code,{children:"value"})," and ",(0,r.jsx)(n.code,{children:"defaultValue"})," pattern to support both controlled and uncontrolled usage. For instance, ",(0,r.jsx)(n.code,{children:"value"})," with ",(0,r.jsx)(n.code,{children:"defaultValue"}),", ",(0,r.jsx)(n.code,{children:"isOpen"})," with ",(0,r.jsx)(n.code,{children:"defaultIsOpen"}),", ",(0,r.jsx)(n.code,{children:"checked"})," with ",(0,r.jsx)(n.code,{children:"defaultChecked"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.h3,{id:"the-severity-prop",children:["The ",(0,r.jsx)(n.code,{children:"severity"})," prop",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#the-severity-prop",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"severity"})," prop indicates the state of the component with the following values: ",(0,r.jsx)(n.code,{children:"success"}),", ",(0,r.jsx)(n.code,{children:"info"}),", ",(0,r.jsx)(n.code,{children:"warning"}),", ",(0,r.jsx)(n.code,{children:"error"}),", and optionally ",(0,r.jsx)(n.code,{children:"none"})," if the state is not meaningful. Each state corresponds to specific icon and color combinations."]}),"\n",(0,r.jsxs)(n.h3,{id:"the-size-prop",children:["The ",(0,r.jsx)(n.code,{children:"size"})," prop",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#the-size-prop",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"size"})," prop typically accepts values like ",(0,r.jsx)(n.code,{children:"xs"}),", ",(0,r.jsx)(n.code,{children:"sm"}),", ",(0,r.jsx)(n.code,{children:"md"}),", ",(0,r.jsx)(n.code,{children:"lg"}),", ",(0,r.jsx)(n.code,{children:"xl"}),", etc., for adjusting component dimensions."]}),"\n",(0,r.jsxs)(n.h3,{id:"the-variant-prop",children:["The ",(0,r.jsx)(n.code,{children:"variant"})," prop",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#the-variant-prop",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"variant"})," prop offers various styles tailored to specific component needs. Here are the commonly used types:"]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Variant"}),(0,r.jsx)(n.th,{align:"left",children:"Description"}),(0,r.jsx)(n.th,{align:"left",children:"Used In"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"solid"})}),(0,r.jsx)(n.td,{align:"left",children:"The background and the border are filled with the same color."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/alert",children:"Alert"}),", ",(0,r.jsx)(n.a,{href:"../components/badge",children:"Badge"}),", ",(0,r.jsx)(n.a,{href:"../components/divider",children:"Divider"}),", ",(0,r.jsx)(n.a,{href:"../components/tag",children:"Tag"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"filled"})}),(0,r.jsx)(n.td,{align:"left",children:"The background and the border are filled with different colors."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/input",children:"Input"}),", ",(0,r.jsx)(n.a,{href:"../components/input-control",children:"InputControl"}),", ",(0,r.jsx)(n.a,{href:"../components/select",children:"Select"}),", ",(0,r.jsx)(n.a,{href:"../components/tabs",children:"Tabs"}),", ",(0,r.jsx)(n.a,{href:"../components/search-input",children:"SearchInput"}),", ",(0,r.jsx)(n.a,{href:"../components/textarea",children:"Textarea"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"flush"})}),(0,r.jsx)(n.td,{align:"left",children:"Only the bottom bordered is rendered."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/input",children:"Input"}),", ",(0,r.jsx)(n.a,{href:"../components/input-control",children:"InputControl"}),", ",(0,r.jsx)(n.a,{href:"../components/search-input",children:"SearchInput"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"outline"})}),(0,r.jsx)(n.td,{align:"left",children:"Only the border is filled."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/alert",children:"Alert"}),", ",(0,r.jsx)(n.a,{href:"../components/input",children:"Input"}),", ",(0,r.jsx)(n.a,{href:"../components/input-control",children:"InputControl"}),", ",(0,r.jsx)(n.a,{href:"../components/search-input",children:"SearchInput"}),", ",(0,r.jsx)(n.a,{href:"../components/select",children:"Select"}),", ",(0,r.jsx)(n.a,{href:"../components/table",children:"Table"}),", ",(0,r.jsx)(n.a,{href:"../components/tag",children:"Tag"}),", ",(0,r.jsx)(n.a,{href:"../components/textarea",children:"Textarea"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"unstyled"})}),(0,r.jsx)(n.td,{align:"left",children:"No style is applied."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/input",children:"Input"}),", ",(0,r.jsx)(n.a,{href:"../components/input-control",children:"InputControl"}),", ",(0,r.jsx)(n.a,{href:"../components/search-input",children:"SearchInput"}),", ",(0,r.jsx)(n.a,{href:"../components/select",children:"Select"}),", ",(0,r.jsx)(n.a,{href:"../components/tabs",children:"Tabs"}),", ",(0,r.jsx)(n.a,{href:"../components/textarea",children:"Textarea"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"default"})}),(0,r.jsx)(n.td,{align:"left",children:"The component's default style."}),(0,r.jsxs)(n.td,{align:"left",children:[(0,r.jsx)(n.a,{href:"../components/button",children:"Button"}),", ",(0,r.jsx)(n.a,{href:"../components/table",children:"Table"}),", ",(0,r.jsx)(n.a,{href:"../components/tabs",children:"Tabs"})]})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}},28459:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contributing/react-components-part-2",function(){return t(84770)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=28459)}),_N_E=e.O()}]);