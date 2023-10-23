(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9380],{64824:function(e,n,t){"use strict";t.r(n);var i=t(52322),a=t(45392);function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,a.ah)(),e.components);return(0,i.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,i.jsx)(n.h1,{id:"truncate",children:"Truncate"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"Truncate"})," component will shorten text with an ellipsis. Always add a ",(0,i.jsx)(n.code,{children:"title"})," attribute to the truncated element so the full text can be displayed in a tooltip."]}),"\n",(0,i.jsxs)(n.h2,{id:"import",children:["Import",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { Truncate } from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"usage",children:["Usage",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"default-example",children:["Default example",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#default-example",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.p,{children:"Truncate will prevent text that overflows the container from wrapping."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Box width={240}>\n  <Truncate title="This is a very long text that will be truncated">\n    This is a very long text that will be truncated\n  </Truncate>\n</Box>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["You can also set the width of the truncated text with the ",(0,i.jsx)(n.code,{children:"width"})," prop."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Truncate\n  title="This is a very long text that will be truncated"\n  width={240}\n>\n  This is a very long text that will be truncated\n</Truncate>\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"expandable-example",children:["Expandable example",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#expandable-example",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["You can use the ",(0,i.jsx)(n.code,{children:"_hover"})," prop to control how to expand the truncated text on hover."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Flex direction="column" rowGap="3x">\n      <Box\n        backgroundColor={colorStyle.background.secondary}\n        px="3x"\n        py="2x"\n      >\n        <Truncate\n          title="This is a very long text that will be truncated"\n          width={240}\n          _hover={{\n            width: \'max-content\',\n          }}\n        >\n          This is a very long text that will be truncated\n        </Truncate>\n      </Box>\n      <Box\n        backgroundColor={colorStyle.background.secondary}\n        px="3x"\n        py="2x"\n        width={240}\n      >\n        <Truncate\n          title="This is a very long text that will be truncated"\n          _hover={{\n            overflow: \'visible\',\n          }}\n        >\n          This is a very long text that will be truncated\n        </Truncate>\n      </Box>\n    </Flex>\n  );\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"tooltip-example",children:["Tooltip example",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#tooltip-example",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["You can wrap ",(0,i.jsx)(n.code,{children:"Truncate"})," with a ",(0,i.jsx)(n.code,{children:"Tooltip"})," to display the full text in a tooltip when the text is truncated."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"function Example() {\n  const textRef = React.useRef();\n  const [isOpen, toggleIsOpen] = useToggle();\n  useEventListener(\n    () => textRef.current,\n    'mouseenter', // It can be either 'mouseleave' or 'pointerleave'\n    React.useCallback((event) => {\n      const isOverflowing = (event.currentTarget.scrollWidth > event.currentTarget.clientWidth);\n      isOverflowing && toggleIsOpen(true);\n    }, [toggleIsOpen]),\n  );\n  useEventListener(\n    () => textRef.current,\n    'mouseleave', // It can be either 'mouseleave' or 'pointerleave'\n    React.useCallback((event) => {\n      toggleIsOpen(false);\n    }, [toggleIsOpen]),\n  );\n\n  return (\n    <Box width={240}>\n      <Tooltip\n        isOpen={isOpen}\n        label=\"This is a very long text that will be truncated\"\n      >\n        <Truncate ref={textRef}>\n          This is a very long text that will be truncated\n        </Truncate>\n      </Tooltip>\n    </Box>\n  );\n}\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"commonly-asked-questions",children:["Commonly Asked Questions",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#commonly-asked-questions",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"how-to-truncate-the-text-after-a-specific-number-of-lines",children:["How to truncate the text after a specific number of lines?",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#how-to-truncate-the-text-after-a-specific-number-of-lines",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{expanded:!0,children:(0,i.jsx)(n.code,{className:"language-jsx",children:"<Box width=\"50%\">\n  <Truncate\n    sx={{\n      '--truncate-line-clamp': 3,\n      whiteSpace: 'normal',\n      display: '-webkit-box',\n      WebkitBoxOrient: 'vertical',\n      WebkitLineClamp: 'var(--truncate-line-clamp)',\n    }}\n  >\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut purus vel libero mollis semper nec nec dui. In a ex accumsan, finibus nunc vitae, sodales lacus. Sed est risus, placerat eu lectus in, lacinia elementum nisi. Duis dignissim eros ac risus consectetur, quis gravida mauris pellentesque. Fusce eleifend lobortis nisl. Cras ut massa commodo, pellentesque purus eget, molestie odio. Vestibulum at nisi lectus. Pellentesque orci risus, commodo lobortis nunc a, pharetra mollis velit. Duis molestie diam non massa rhoncus, ut tempor sem lacinia. Nulla scelerisque tempus porttitor.\n  </Truncate>\n</Box>\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"props",children:["Props",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"truncate-1",children:["Truncate",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#truncate-1",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{align:"left",children:"Name"}),(0,i.jsx)(n.th,{align:"left",children:"Type"}),(0,i.jsx)(n.th,{align:"left",children:"Default"}),(0,i.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"children"}),(0,i.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left"})]})})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,a.ah)(),e.components).wrapper;return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},32481:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/truncate",function(){return t(64824)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=32481)}),_N_E=e.O()}]);