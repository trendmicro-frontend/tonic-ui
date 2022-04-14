(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2343],{87111:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var a=n(7896),l=n(59740),o=(n(2784),n(30876)),r=["components"],i={};function p(t){var e=t.components,n=(0,l.Z)(t,r);return(0,o.kt)("wrapper",(0,a.Z)({},i,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",null,"Tooltip"),(0,o.kt)("p",null,"A tooltip is a brief, informative message that appears when a user interacts with an element. Tooltips are usually initiated in one of two ways: through a mouse-hover or keyboard-hover action."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," component follows the ",(0,o.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/wai-aria-practices/#tooltip"},"WAI-ARIA")," Tooltip pattern."),(0,o.kt)("h2",null,"Import"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Tooltip } from '@tonic-ui/react';\n")),(0,o.kt)("h2",null,"Usage"),(0,o.kt)("p",null,"By default, you have to pass a single React element child to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<Tooltip label="This is a tooltip">\n  <Text display="inline-block">This is the text content</Text>\n</Tooltip>\n')),(0,o.kt)("p",null,"If you need to pass more than one child element or non-element children, wrap them in an element or pass the ",(0,o.kt)("inlineCode",{parentName:"p"},"shouldWrapChildren")," prop."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<Tooltip label="This is a tooltip">\n  <>This is the text content</>\n</Tooltip>\n\n<Tooltip label="This is a tooltip" shouldWrapChildren>\n  This is the text content\n</Tooltip>\n\n<Tooltip label="This is a tooltip" shouldWrapChildren>\n  <Icon icon="menu" height="5x" mr="2x" />\n  <Text>This is the text content</Text>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Controlled tooltip"),(0,o.kt)("p",null,"Pass ",(0,o.kt)("inlineCode",{parentName:"p"},"isOpen")," to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," component to control the state of the tooltip."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [on, toggle] = useToggle(false);\n\n  return (\n    <>\n      <Box mb="4x">\n        <Switch checked={on} onChange={toggle} />\n      </Box>\n      <Tooltip\n        label="This is a controlled tooltip"\n        isOpen={on}\n      >\n        <Text display="inline-block">This is the text content</Text>\n      </Tooltip>\n    </>\n  );\n}\n')),(0,o.kt)("h3",null,"Uncontrolled tooltip"),(0,o.kt)("p",null,"Tooltip is uncontrolled by default. You can set ",(0,o.kt)("inlineCode",{parentName:"p"},"defaultIsOpen")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," to have the tooltip open for the first render."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip\n  label="This is an uncontrolled tooltip"\n  defaultIsOpen={true}\n>\n  <Text display="inline-block">This is the text content</Text>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Hide the tooltip"),(0,o.kt)("p",null,"To hide the tooltip, you can pass an empty value (i.e. ",(0,o.kt)("inlineCode",{parentName:"p"},"!value"),") to the ",(0,o.kt)("inlineCode",{parentName:"p"},"label")," prop or use the ",(0,o.kt)("inlineCode",{parentName:"p"},"disabled")," prop."),(0,o.kt)("h4",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"h4"},"label")," prop to hide the tooltip"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="">\n  <Icon icon="search-o" />\n</Tooltip>\n')),(0,o.kt)("h4",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"h4"},"disabled")," prop to hide the tooltip"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="Search" disabled>\n  <Icon icon="search-o" />\n</Tooltip>\n')),(0,o.kt)("h3",null,"Hide the arrow of the tooltip"),(0,o.kt)("p",null,"Pass ",(0,o.kt)("inlineCode",{parentName:"p"},"hideArrow")," to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," component to hide the arrow of the tooltip."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="Search" hideArrow>\n  <Icon icon="search-o" />\n</Tooltip>\n')),(0,o.kt)("h3",null,"Tooltip around disabled button"),(0,o.kt)("p",null,"By default the ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," is not shown when it is around a disabled ",(0,o.kt)("inlineCode",{parentName:"p"},"Button"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="This is a tooltip">\n  <Button disabled>Button</Button>\n</Tooltip>\n')),(0,o.kt)("p",null,"To show the ",(0,o.kt)("inlineCode",{parentName:"p"},"Tooltip")," on a disabled ",(0,o.kt)("inlineCode",{parentName:"p"},"Button"),", pass the ",(0,o.kt)("inlineCode",{parentName:"p"},"shouldWrapChildren")," prop."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="This is a tooltip" shouldWrapChildren>\n  <Button disabled>Button</Button>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Tooltip with focusable content"),(0,o.kt)("p",null,"If the children of the tooltip is a focusable element, the tooltip will show when you focus or hover on the element, and will hide when you blur or move cursor out of the element."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="This is a tooltip">\n  <Button>Button</Button>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Tooltip with non-focusable content"),(0,o.kt)("p",null,"If the tooltip anchor is not a focusable content, just like the text string, you can wrap it with a ",(0,o.kt)("inlineCode",{parentName:"p"},"Text")," component and set ",(0,o.kt)("inlineCode",{parentName:"p"},'tabIndex="0"')," to make it tabbable."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip label="This is a tooltip">\n  <Text display="inline-block" tabIndex="0">This is the text content</Text>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Tooltip with ellipsis text"),(0,o.kt)("p",null,"Text that overflows the container will be truncated and an ellipsis will be added. A tooltip will be shown when you hover or focus on the ellipsis text."),(0,o.kt)("p",null,"Try minimizing the width of the container to see how it behaves."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"function Example() {\n  const textRef = React.useRef();\n  const [isOpen, toggleIsOpen] = useToggle();\n  useEventListener(\n    () => textRef.current,\n    'mouseenter', // It can be either 'mouseenter' or 'pointerenter'\n    React.useCallback((event) => {\n      const isOverflowing = (event.currentTarget.scrollWidth > event.currentTarget.clientWidth);\n      isOverflowing && toggleIsOpen(true);\n    }, [toggleIsOpen]),\n  );\n  useEventListener(\n    () => textRef.current,\n    'mouseleave', // It can be either 'mouseleave' or 'pointerleave'\n    React.useCallback((event) => {\n      toggleIsOpen(false);\n    }, [toggleIsOpen]),\n  );\n\n  return (\n    <Tooltip\n      isOpen={isOpen}\n      label=\"This is a very long text string that might be truncated when exceeding the container width\"\n    >\n      <Truncate ref={textRef}>\n        This is a very long text string that might be truncated when exceeding the container width\n      </Truncate>\n    </Tooltip>\n  );\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"function Example() {\n  const textRef = React.useRef();\n  const [isOpen, toggleIsOpen] = useToggle();\n  useEventListener(\n    () => textRef.current,\n    'mouseenter', // It can be either 'mouseenter' or 'pointerenter'\n    React.useCallback((event) => {\n      const isOverflowing = (event.currentTarget.scrollWidth > event.currentTarget.clientWidth);\n      isOverflowing && toggleIsOpen(true);\n    }, [toggleIsOpen]),\n  );\n  useEventListener(\n    () => textRef.current,\n    'mouseleave', // It can be either 'mouseleave' or 'pointerleave'\n    React.useCallback((event) => {\n      toggleIsOpen(false);\n    }, [toggleIsOpen]),\n  );\n\n  return (\n    <Tooltip\n      isOpen={isOpen}\n      label=\"This is a very long text string that might be truncated when exceeding the container width\"\n    >\n      <Flex alignItems=\"center\" columnGap=\"2x\">\n        <Icon icon=\"menu\" />\n        <Truncate ref={textRef}>\n          This is a very long text string that might be truncated when exceeding the container width\n        </Truncate>\n      </Flex>\n    </Tooltip>\n  );\n}\n")),(0,o.kt)("h3",null,"Tooltip with ",(0,o.kt)("inlineCode",{parentName:"h3"},"Menu")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"function Example() {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const inputRef = React.useRef();\n  const [menuItem, setMenuItem] = React.useState('hostname');\n  const handleMenuClick = (event) => {\n    // [optional] persist `Synthetic Event` for React v16 and earlier versions\n    event.persist();\n\n    const { value } = event.target.attributes.value;\n    setMenuItem(value);\n\n    setTimeout(() => {\n      if (inputRef.current) {\n        inputRef.current.focus();\n      }\n    }, 0);\n  };\n  const buttonText = {\n    'hostname': 'Search by: Endpoint name',\n    'filename': 'Search by: File name',\n  }[menuItem];\n\n  return (\n    <InputGroup>\n      <InputGroupPrepend>\n        <Menu>\n          <MenuButton mr=\"4x\">\n            <Text\n              color={colorMode === 'dark' ? 'white:secondary' : 'black:secondary'}\n            >\n              {buttonText}\n            </Text>\n          </MenuButton>\n          <MenuList\n            onClick={handleMenuClick}\n          >\n            <MenuItem value=\"hostname\">Endpoint name</MenuItem>\n            <MenuItem value=\"filename\">File name</MenuItem>\n          </MenuList>\n        </Menu>\n      </InputGroupPrepend>\n      <Tooltip\n        label=\"Use commas to separate multiple keywords\"\n        backgroundColor={colorStyle.background.secondary}\n        color={colorStyle.color.primary}\n        px=\"2x\"\n        py=\"3x\"\n      >\n        <Input\n          ref={inputRef}\n          borderTopLeftRadius={0}\n          borderBottomLeftRadius={0}\n          placeholder={{\n            'hostname': 'John Doe, Jane',\n            'filename': 'README.md, *.cmd',\n          }[menuItem]}\n        />\n      </Tooltip>\n    </InputGroup>\n  );\n}\n")),(0,o.kt)("h3",null,"Customization"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Tooltip\n  hideArrow\n  label={(\n    <Flex direction="column">\n      <Text fontSize="lg" lineHeight="lg">Tooltip with HTML</Text>\n      <Box><em>{"And here\'s"}</em> <b>{\'some\'}</b> <u>{\'amazing content\'}</u>.{\' \'}</Box>\n      <Text>{"It\'s very engaging. Right?"}</Text>\n    </Flex>\n  )}\n>\n  <Text display="inline-block">\n    Hover Me\n  </Text>\n</Tooltip>\n')),(0,o.kt)("h3",null,"Placement"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"placement")," prop to control the placement of the tooltip."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<Tooltip label="Tooltip" placement="top">\n  Tooltip anchor\n</Tooltip>\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"<Box display=\"inline-block\">\n  <Grid\n    templateColumns=\"repeat(3, minmax(80px,1fr))\"\n    templateRows=\"repeat(4, 80px)\"\n    gap=\"8x\"\n  >\n    {['top-start', 'top', 'top-end',\n      'right-start', 'right', 'right-end',\n      'bottom-start', 'bottom', 'bottom-end',\n      'left-start', 'left', 'left-end'\n    ].map(placement => (\n      <Tooltip\n        key={placement}\n        label=\"Tooltip\"\n        placement={placement}\n      >\n        <Button width=\"100%\">\n          {placement}\n        </Button>\n      </Tooltip>\n    ))}\n  </Grid>\n</Box>\n")),(0,o.kt)("h2",null,"Props"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperComponent"),(0,o.kt)("td",{parentName:"tr",align:"left"},"ElementType"),(0,o.kt)("td",{parentName:"tr",align:"left"},"Popper"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The component used for the popover.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperProps"),(0,o.kt)("td",{parentName:"tr",align:"left"},"object"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Props applied to the Popper component.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperArrowComponent"),(0,o.kt)("td",{parentName:"tr",align:"left"},"ElementType"),(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperArrow"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The component used for the popover arrow.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperArrowProps"),(0,o.kt)("td",{parentName:"tr",align:"left"},"object"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Props applied to the PopoverArrow component.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"TransitionComponent"),(0,o.kt)("td",{parentName:"tr",align:"left"},"ElementType"),(0,o.kt)("td",{parentName:"tr",align:"left"},"Grow"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The component used for the transition.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"TransitionProps"),(0,o.kt)("td",{parentName:"tr",align:"left"},"object"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Props applied to the ",(0,o.kt)("a",{parentName:"td",href:"http://reactcommunity.org/react-transition-group/transition#Transition-props"},"Transition")," element.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"TransitionProps.appear"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"true"),(0,o.kt)("td",{parentName:"tr",align:"left"})),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"arrowAt"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"The position of the arrow. One of: 'left', 'right', 'top', 'bottom'")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"children"),(0,o.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," ({ getTooltipTriggerProps }) => ReactNode"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"})),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"closeOnClick"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", close the tooltip on click.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"closeOnEsc"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", close the tooltip when pressing the escape key.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"closeOnMouseDown"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", close the tooltip while the mouse is down.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"defaultIsOpen"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"Whether the tooltip will be open by default.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", the tooltip will not display.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"enterDelay"),(0,o.kt)("td",{parentName:"tr",align:"left"},"number"),(0,o.kt)("td",{parentName:"tr",align:"left"},"100"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The delay in milliseconds before the tooltip appears.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"hideArrow"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", hide the arrow tip on the tooltip.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"isOpen"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", show the tooltip.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"label"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string ","|"," ReactNode"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"If the tooltip label is a blank or empty string, the tooltip will not display.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"leaveDelay"),(0,o.kt)("td",{parentName:"tr",align:"left"},"number"),(0,o.kt)("td",{parentName:"tr",align:"left"},"0"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The delay in milliseconds before the tooltip disappears.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"onClose"),(0,o.kt)("td",{parentName:"tr",align:"left"},"function"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Callback fired when the tooltip is closed.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"onOpen"),(0,o.kt)("td",{parentName:"tr",align:"left"},"function"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Callback fired when the tooltip is opened.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"placement"),(0,o.kt)("td",{parentName:"tr",align:"left"},"PopperJS.Placement"),(0,o.kt)("td",{parentName:"tr",align:"left"},"'bottom'"),(0,o.kt)("td",{parentName:"tr",align:"left"},"Position the tooltip relative to the trigger element as well as surrounding elements. One of: 'top', 'bottom', 'right', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'right-start', 'right-end', 'left-start', 'left-end'")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"shouldWrapChildren"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", the tooltip will be wrapped in a ",(0,o.kt)("inlineCode",{parentName:"td"},"Box")," component. Otherwise, you have to ensure tooltip has only one child node.")))))}p.isMDXComponent=!0},49082:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/tooltip",function(){return n(87111)}])}},function(t){t.O(0,[9774,2888,179],(function(){return e=49082,t(t.s=e);var e}));var e=t.O();_N_E=e}]);