(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3606],{45283:function(n,e,l){"use strict";l.r(e);var i=l(52322),t=l(45392);function r(n){var e=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,t.ah)(),n.components);return(0,i.jsxs)(e.div,{className:"main-content",id:"main-content",children:[(0,i.jsx)(e.h1,{id:"scrollbar",children:"Scrollbar"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"Scrollbar"})," component provides a consistent look and feel for scrollbars across multiple platforms and browsers."]}),"\n",(0,i.jsxs)(e.h2,{id:"import",children:["Import",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:"import {\n  Scrollbar,\n} from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(e.h2,{id:"usage",children:["Usage",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"Scrollbar"})," is hidden by default, and it only appears when the user hovers over the scrollable content. You can set the height of the scrollbar using the ",(0,i.jsx)(e.code,{children:"height"})," prop."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:"<Scrollbar\n  height={200}\n>\n  <Lorem count={10} />\n</Scrollbar>\n"})}),"\n",(0,i.jsxs)(e.p,{children:["For more information on bidirectional scrolling, please refer to ",(0,i.jsx)(e.a,{href:"https://adamsilver.io/blog/bidirectional-scrolling-whats-not-to-like/",children:"Bidirectional scrolling: what's not to like?"})]}),"\n",(0,i.jsxs)(e.h3,{id:"scroll-direction",children:["Scroll direction",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scroll-direction",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.p,{children:"The examples below illustrate the different scroll directions. You can try to resize the scrollable content to see how the scrollbar changes."}),"\n",(0,i.jsxs)(e.h4,{id:"vertical-scrolling",children:["Vertical scrolling",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#vertical-scrolling",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.p,{children:"To enable vertical scrolling, set the scrollbar height to a value less than the scrollable content height."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Scrollbar\n  minHeight={100}\n  maxHeight={200}\n  overflow="scroll"\n  resize="vertical"\n>\n  <Lorem count={10} />\n</Scrollbar>\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"horizontal-scrolling",children:["Horizontal scrolling",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#horizontal-scrolling",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.p,{children:"To enable horizontal scrolling, set the scrollbar width to a value less than the scrollable content width."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Scrollbar\n  minWidth="10%"\n  maxWidth="100%"\n  overflow="scroll"\n  resize="horizontal"\n>\n  <Lorem count={6} whiteSpace="nowrap" />\n</Scrollbar>\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"bidirectional-scrolling",children:["Bidirectional scrolling",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#bidirectional-scrolling",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Scrollbar\n  height={200}\n  overflow="scroll"\n  resize="both"\n>\n  <Lorem count={10} whiteSpace="nowrap" />\n</Scrollbar>\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"overflow-control",children:["Overflow control",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#overflow-control",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(e.p,{children:["Use the ",(0,i.jsx)(e.code,{children:"overflow"})," prop to set the overflow of the content. You can set the value to ",(0,i.jsx)(e.code,{children:"auto"}),", ",(0,i.jsx)(e.code,{children:"scroll"}),", or ",(0,i.jsx)(e.code,{children:"hidden"}),"."]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"auto"}),": The scrollbar will be shown if the content overflows and mouse is hovering over the content."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"scroll"}),": The scrollbar is always visible if the content overflows."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"hidden"}),": The scrollbar is never shown."]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["Note: ",(0,i.jsx)(e.code,{children:"overflowX"})," and ",(0,i.jsx)(e.code,{children:"overflowY"})," are also available if you need to set the overflow on both X and Y axis."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Grid\n  templateColumns="repeat(auto-fit, minmax(240px, 1fr))"\n  columnGap="6x"\n  rowGap="4x"\n>\n  <Box>\n    <Text size="xl" marginBottom="2x">\n      overflow="auto"\n    </Text>\n    <Divider orientation="horizontal" mt="2x" mb="4x" />\n    <Scrollbar\n      height={200}\n      overflow="auto"\n    >\n      <Lorem count={10} whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n  <Box>\n    <Text size="xl" marginBottom="2x">\n      overflow="scroll"\n    </Text>\n    <Divider orientation="horizontal" mt="2x" mb="4x" />\n    <Scrollbar\n      height={200}\n      overflow="scroll"\n    >\n      <Lorem count={10} whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n  <Box>\n    <Text size="xl" marginBottom="2x">\n      overflow="hidden"\n    </Text>\n    <Divider orientation="horizontal" mt="2x" mb="4x" />\n    <Scrollbar\n      height={200}\n      overflow="hidden"\n    >\n      <Lorem count={10} whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n</Grid>\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"scrollbar-thumb",children:["Scrollbar thumb",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scrollbar-thumb",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(e.p,{children:["Use the ",(0,i.jsx)(e.code,{children:"minThumbWidth"})," and ",(0,i.jsx)(e.code,{children:"minThumbHeight"})," props to set the minimum size of the thumb (in pixels)."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Grid\n  templateColumns="repeat(auto-fit, minmax(240px, 1fr))"\n  columnGap="6x"\n  rowGap="4x"\n>\n  <Box>\n    <Text size="xl" marginBottom="2x">\n      minThumbHeight=50\n    </Text>\n    <Divider orientation="horizontal" mt="2x" mb="4x" />\n    <Scrollbar\n      height={200}\n      minThumbHeight={50}\n      overflow="scroll"\n    >\n      <Lorem count={10} />\n    </Scrollbar>\n  </Box>\n  <Box>\n    <Text size="xl" marginBottom="2x">\n      minThumbHeight=100\n    </Text>\n    <Divider orientation="horizontal" mt="2x" mb="4x" />\n    <Scrollbar\n      height={200}\n      minThumbHeight={100}\n      overflow="scroll"\n    >\n      <Lorem count={10} />\n    </Scrollbar>\n  </Box>\n</Grid>\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"scroll-indicator",children:["Scroll indicator",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scroll-indicator",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.p,{children:"The scroll indicator can visually indicate the current scroll position of the scrollable element, so that the user knows whether it can be scrolled further."}),"\n",(0,i.jsx)(e.pre,{noInline:!0,children:(0,i.jsx)(e.code,{className:"language-jsx",children:'const ShadowScrollbar = (props) => {\n  const [colorMode] = useColorMode();\n  const topIndicatorRef = React.useRef(null);\n  const bottomIndicatorRef = React.useRef(null);\n  const handleUpdate = ({ values }) => {\n    const { scrollTop, scrollHeight, clientHeight } = values;\n    const topIndicatorOpacity = 1 / 20 * Math.min(scrollTop, 20);\n    const bottomScrollTop = scrollHeight - clientHeight;\n    const bottomIndicatorOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));\n    topIndicatorRef.current.style.opacity = topIndicatorOpacity;\n    bottomIndicatorRef.current.style.opacity = bottomIndicatorOpacity;\n  };\n  const topScrollIndicatorBackground = {\n    dark: \'linear-gradient(to bottom, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)\', \n    light: \'linear-gradient(to bottom, rgba(224, 224, 224, 1) 0%, rgba(255, 255, 255, 0) 100%)\', \n  }[colorMode];\n  const bottomScrollIndicatorBackground = {\n    dark: \'linear-gradient(to top, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)\', \n    light: \'linear-gradient(to top, rgba(224, 224, 224, 1) 0%, rgba(255, 255, 255, 0) 100%)\', \n  }[colorMode];\n\n  return (\n    <Box position="relative">\n      <Scrollbar\n        onUpdate={handleUpdate}\n        {...props}\n      />\n      <Box\n        ref={topIndicatorRef}\n        position="absolute"\n        top="0"\n        left="0"\n        right="0"\n        height="24px"\n        background={topScrollIndicatorBackground}\n      />\n      <Box\n        ref={bottomIndicatorRef}\n        position="absolute"\n        bottom="0"\n        left="0"\n        right="0"\n        height="24px"\n        background={bottomScrollIndicatorBackground}\n      />\n    </Box>\n  );\n}\n\nrender(\n  <ShadowScrollbar\n    height={300}\n  >\n    <Lorem count={10} />\n  </ShadowScrollbar>\n);\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"scrollbar-with-collapsible-content",children:["Scrollbar with collapsible content",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scrollbar-with-collapsible-content",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'function Example() {\n  const [isOpen, onToggle] = useToggle(false);\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <TextLabel display="inline-flex" alignItems="center">\n        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />\n        <Space width="2x" />\n        <Text>Show</Text>\n      </TextLabel>\n      <Scrollbar maxHeight={180} overflowY="scroll">\n        <SkeletonContent>\n          <Stack spacing="4x">\n            <SkeletonBody />\n            <Collapse\n              in={isOpen}\n              unmountOnExit={true}\n            >\n              <Stack spacing="4x">\n                <SkeletonBody />\n                <SkeletonBody />\n                <SkeletonBody />\n                <SkeletonBody />\n              </Stack>\n            </Collapse>\n          </Stack>\n        </SkeletonContent>\n      </Scrollbar>\n    </Flex>\n  );\n}\n'})}),"\n",(0,i.jsxs)(e.h3,{id:"scrollable-menu",children:["Scrollable menu",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scrollable-menu",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:'<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList width="100%">\n    <Scrollbar height={200}>\n      <MenuItem>List item 1</MenuItem>\n      <MenuItem>List item 2</MenuItem>\n      <MenuItem>List item 3</MenuItem>\n      <MenuItem>List item 4</MenuItem>\n      <MenuItem>List item 5</MenuItem>\n      <MenuItem>List item 6</MenuItem>\n      <MenuItem>List item 7</MenuItem>\n      <MenuItem>List item 8</MenuItem>\n      <MenuItem>List item 9</MenuItem>\n      <MenuItem>List item 10</MenuItem>\n      <MenuItem>List item 11</MenuItem>\n      <MenuItem>List item 12</MenuItem>\n    </Scrollbar>\n  </MenuList>\n</Menu>\n'})}),"\n",(0,i.jsxs)(e.h2,{id:"props",children:["Props",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(e.h3,{id:"scrollbar-1",children:["Scrollbar",(0,i.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#scrollbar-1",children:(0,i.jsx)(e.svg,{children:(0,i.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{align:"left",children:"Name"}),(0,i.jsx)(e.th,{align:"left",children:"Type"}),(0,i.jsx)(e.th,{align:"left",children:"Default"}),(0,i.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"children"}),(0,i.jsx)(e.td,{align:"left",children:"ReactNode | function"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The content of the scrollbar."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"width"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left",children:"'auto'"}),(0,i.jsxs)(e.td,{align:"left",children:["The width of the scrollbar. If set to 'auto', you can constrain the width using the ",(0,i.jsx)(e.code,{children:"minWidth"})," and ",(0,i.jsx)(e.code,{children:"maxWidth"})," props."]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"height"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left",children:"'auto'"}),(0,i.jsxs)(e.td,{align:"left",children:["The height of the scrollbar. If set to 'auto', you can constrain the height using the ",(0,i.jsx)(e.code,{children:"minHeight"})," and ",(0,i.jsx)(e.code,{children:"maxHeight"})," props."]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"minWidth"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The minimum width of the scrollbar."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"maxWidth"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The maximum width of the scrollbar."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"minHeight"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The minimum height of the scrollbar."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"maxHeight"}),(0,i.jsx)(e.td,{align:"left",children:"number | string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The maximum height of the scrollbar."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"minThumbWidth"}),(0,i.jsx)(e.td,{align:"left",children:"number"}),(0,i.jsx)(e.td,{align:"left",children:"32"}),(0,i.jsx)(e.td,{align:"left",children:"The minimum width of the thumb in pixels."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"minThumbHeight"}),(0,i.jsx)(e.td,{align:"left",children:"number"}),(0,i.jsx)(e.td,{align:"left",children:"32"}),(0,i.jsx)(e.td,{align:"left",children:"The minimum height of the thumb in pixels."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"onScroll"}),(0,i.jsx)(e.td,{align:"left",children:(0,i.jsx)(e.code,{children:"(event: UIEvent) => void"})}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"A callback function that is called when the scrollbar is scrolled."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"onUpdate"}),(0,i.jsx)(e.td,{align:"left",children:"function"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsxs)(e.td,{align:"left",children:["A callback function that is called when the scroll position or size of the content changes. The function is passed an object containing the following properties: ",(0,i.jsx)(e.code,{children:"left"}),", ",(0,i.jsx)(e.code,{children:"top"}),", ",(0,i.jsx)(e.code,{children:"scrollLeft"}),", ",(0,i.jsx)(e.code,{children:"scrollTop"}),", ",(0,i.jsx)(e.code,{children:"scrollWidth"}),", ",(0,i.jsx)(e.code,{children:"scrollHeight"}),", ",(0,i.jsx)(e.code,{children:"clientWidth"}),", ",(0,i.jsx)(e.code,{children:"clientHeight"}),"."]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"overflow"}),(0,i.jsx)(e.td,{align:"left",children:"string"}),(0,i.jsx)(e.td,{align:"left",children:"'auto'"}),(0,i.jsx)(e.td,{align:"left",children:"The overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"overflowX"}),(0,i.jsx)(e.td,{align:"left",children:"string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The horizontal overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{align:"left",children:"overflowY"}),(0,i.jsx)(e.td,{align:"left",children:"string"}),(0,i.jsx)(e.td,{align:"left"}),(0,i.jsx)(e.td,{align:"left",children:"The vertical overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'."})]})]})]})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object.assign({},(0,t.ah)(),n.components).wrapper;return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(r,n)})):r(n)}},45237:function(n,e,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/scrollbar",function(){return l(45283)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=45237)}),_N_E=n.O()}]);