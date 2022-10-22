(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[317],{249:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var a=n(7896),r=n(9740),l=(n(2784),n(876)),o=["components"],i={};function s(e){var t=e.components,n=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",null,"Drawer"),(0,l.kt)("p",null,"A drawer dialog is a window overlaid on either the primary window or another dialog\nwindow. Contents behind a drawer dialog are ",(0,l.kt)("strong",{parentName:"p"},"inert")," meaning that users cannot\ninteract with content behind the dialog."),(0,l.kt)("h2",null,"Import"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Drawer"),": A ",(0,l.kt)("inlineCode",{parentName:"li"},"Provider")," component that provides the context to the components it wraps."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DrawerOverlay"),": The overlay of the drawer."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DrawerContent"),": The content of the drawer."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DrawerHeader"),": The header of the drawer."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DrawerBody"),": The body of the drawer."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DrawerFooter"),": The footer of the drawer.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Drawer,\n  DrawerOverlay,\n  DrawerContent,\n  DrawerHeader,\n  DrawerBody,\n  DrawerFooter,\n  useDrawer,\n} from '@tonic-ui/react';\n")),(0,l.kt)("h2",null,"Usage"),(0,l.kt)("p",null,"Click the button below to toggle a drawer. The drawer will show up on either side of the screen."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const CodeBlock = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.secondary}\n      border={1}\n      borderColor={colorStyle.divider}\n      fontFamily="mono"\n      py="3x"\n      px="3x"\n      whiteSpace="pre"\n      {...props}\n    />\n  );\n};\n\nconst FormGroup = (props) => (\n  <Box mb="4x" {...props} />\n);\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nconst bodyScrollLockCode = `\n// import\nimport { Global } from \'@emotion/react\';\n\n// example\n<Drawer>\n  <Global\n    styles={css\\`\n      body {\n        overflow: hidden;\n      }\n    \\`}\n  />\n  <DrawerOverlay />\n  <DrawerContent>\n    <DrawerHeader />\n    <DrawerBody />\n    <DrawerFooter />\n  </DrawerContent>\n</Drawer>\n`.trim();\n\nfunction Example() {\n  const initialFocusRef = React.useRef();\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const iconColor = colorStyle.color.tertiary;\n  const [isOpen, toggleDrawer] = useToggle(false);\n  const [placement, changePlacementBy] = useSelection(\'right\');\n  const [size, changeSizeBy] = useSelection(\'auto\');\n  const [autoFocus, toggleAutoFocus] = useToggle(true);\n  const [backdrop, toggleBackdrop] = useToggle(true);\n  const [closeOnEsc, toggleCloseOnEsc] = useToggle(true);\n  const [closeOnOutsideClick, toggleCloseOnOutsideClick] = useToggle(true);\n  const [ensureFocus, toggleEnsureFocus] = useToggle(true);\n  const [isClosable, toggleIsClosable] = useToggle(true);\n  const [isOverlayVisible, toggleIsOverlayVisible] = useToggle(true);\n  const [isHeaderVisible, toggleIsHeaderVisible] = useToggle(true);\n  const [isBodyVisible, toggleIsBodyVisible] = useToggle(true);\n  const [isFooterVisible, toggleIsFooterVisible] = useToggle(true);\n  const [isAlertVisible, toggleIsAlertVisible] = useToggle(true);\n  const [enableBodyScrollLock, toggleBodyScrollLock] = useToggle(true);\n\n  return (\n    <>\n      <Box>\n        <Button onClick={() => toggleDrawer(true)}>\n          Launch drawer\n        </Button>\n      </Box>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Drawer props\n        </Text>\n      </Box>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            placement\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'left\', \'right\', \'top\', \'bottom\'].map(value => (\n            <Button\n              key={value}\n              selected={value === placement} \n              onClick={changePlacementBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            size\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'auto\', \'sm\', \'md\', \'lg\', \'full\'].map(value => (\n            <Button\n              key={value}\n              selected={value === size}\n              onClick={changeSizeBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={autoFocus}\n            disabled={!ensureFocus}\n            onChange={() => toggleAutoFocus()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">autoFocus</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={backdrop}\n            onChange={(e) => {\n              const nextBackdrop = !backdrop;\n              if (!nextBackdrop) {\n                toggleCloseOnOutsideClick(false);\n                toggleIsOverlayVisible(false);\n              }\n\n              toggleBackdrop();\n            }}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">backdrop</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={closeOnEsc}\n            disabled={!isClosable && !closeOnOutsideClick}\n            onChange={() => toggleCloseOnEsc()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">closeOnEsc</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={closeOnOutsideClick}\n            disabled={(!isClosable && !closeOnEsc) || !backdrop}\n            onChange={() => toggleCloseOnOutsideClick()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">closeOnOutsideClick</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={ensureFocus}\n            onChange={() => toggleEnsureFocus()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">ensureFocus</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={isClosable}\n            disabled={!closeOnEsc && !closeOnOutsideClick}\n            onChange={() => toggleIsClosable()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">isClosable</Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Drawer composition\n        </Text>\n      </Box>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={isOverlayVisible}\n            disabled={!backdrop}\n            onChange={() => toggleIsOverlayVisible()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerOverlay</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isHeaderVisible} onChange={() => toggleIsHeaderVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerHeader</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isBodyVisible} onChange={() => toggleIsBodyVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerBody</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isFooterVisible} onChange={() => toggleIsFooterVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerFooter</Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Extra drawer setup\n        </Text>\n      </Box>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center" mb="3x">\n          <Checkbox\n            checked={enableBodyScrollLock}\n            onChange={() => toggleBodyScrollLock()}\n          />\n          <Space width="2x" />\n          <Text>\n            Enable body scroll locking\n          </Text>\n        </TextLabel>\n        <Box ml="6x">\n          <Box mb="4x">\n            <Text mb="2x">\n              You can use <strong>Body Scroll Locking</strong> to prevent the user from scrolling the page while the drawer is open.\n            </Text>\n            <Text mb="2x">\n              <strong>Body Scroll Locking</strong> is currently not available with default setup, you can follow the instructions below to append global styles to the body to prevent scrolling.\n            </Text>\n          </Box>\n          <CodeBlock>\n            {bodyScrollLockCode}\n          </CodeBlock>\n        </Box>\n      </FormGroup>\n      <Drawer\n        autoFocus={autoFocus}\n        backdrop={backdrop}\n        closeOnEsc={closeOnEsc}\n        closeOnOutsideClick={closeOnOutsideClick}\n        ensureFocus={ensureFocus}\n        initialFocusRef={initialFocusRef}\n        isClosable={isClosable}\n        isOpen={isOpen}\n        onClose={() => toggleDrawer(false)}\n        placement={placement}\n        size={size}\n      >\n        {enableBodyScrollLock && (\n          <Global\n            styles={css`\n              body {\n                overflow: hidden;\n              }\n            `}\n          />\n        )}\n        {isOverlayVisible && (\n          <DrawerOverlay />\n        )}\n        <DrawerContent>\n          {isHeaderVisible && (\n            <DrawerHeader>\n              {size === \'auto\' && <Text>Auto-sized Drawer</Text>}\n              {size === \'sm\' && <Text>Small Drawer</Text>}\n              {size === \'md\' && <Text>Medium Drawer</Text>}\n              {size === \'lg\' && <Text>Large Drawer</Text>}\n              {size === \'full\' && <Text>Full-width Drawer</Text>}\n            </DrawerHeader>\n          )}\n          {isBodyVisible && (\n            <DrawerBody>\n              {isAlertVisible && (\n                <Alert variant="outline" severity="info" mb="4x" isClosable onClose={() => toggleIsAlertVisible()}>\n                  <Text>This is an info alert</Text>\n                </Alert>\n              )}\n              <Tabs>\n                <TabList mb="4x">\n                  <Tab>Tab 1</Tab>\n                  <Tab>Tab 2</Tab>\n                </TabList>\n                <TabPanels>\n                  <TabPanel>\n                    <SkeletonBody mb="4x" />\n                    <Grid\n                      templateColumns="auto 1fr"\n                      rowGap="2x"\n                      columnGap="3x"\n                      alignItems="center"\n                      mb="4x"\n                    >\n                      <Icon icon="user" color={iconColor} />\n                      <Input ref={initialFocusRef} placeholder="User name" />\n                      <Icon icon="email" color={iconColor} />\n                      <Input placeholder="Email address" />\n                    </Grid>\n                  </TabPanel>\n                  <TabPanel>\n                    <Box\n                      backgroundColor={colorStyle.background.tertiary}\n                      minHeight={1000}\n                      px="3x"\n                      py="2x"\n                    >\n                      <Text>\n                        This is a very long content that will overflow the modal\n                      </Text>\n                    </Box>\n                  </TabPanel>\n                </TabPanels>\n              </Tabs>\n            </DrawerBody>\n          )}\n          {isFooterVisible && (\n            <DrawerFooter>\n              <Grid\n                templateColumns="1fr 1fr"\n                columnGap="2x"\n              >\n                <Button variant="primary" onClick={() => toggleDrawer(false)}>\n                  OK\n                </Button>\n                <Button onClick={() => toggleDrawer(false)}>\n                  Cancel\n                </Button>\n              </Grid>\n            </DrawerFooter>\n          )}\n        </DrawerContent>\n      </Drawer>\n    </>\n  );\n}\n\nrender(<Example />);\n')),(0,l.kt)("h2",null,"Props"),(0,l.kt)("h3",null,"Drawer"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"autoFocus"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," and ",(0,l.kt)("inlineCode",{parentName:"td"},"ensureFocus")," is ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," and ",(0,l.kt)("inlineCode",{parentName:"td"},"initialFocusRef")," is not set, it will automatically set focus on the first focusable element.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"backdrop"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", it will wrap components with a backdrop to provide a click area for dismissing when clicking outside the drawer.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," (context) => ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"A function child can be used intead of a React element. This function is called with the context object.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"closeOnEsc"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", close the drawer when the ",(0,l.kt)("inlineCode",{parentName:"td"},"esc")," key is pressed.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"closeOnOutsideClick"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", close the drawer when click outside of the drawer. Note that this value will not have any effect when ",(0,l.kt)("inlineCode",{parentName:"td"},"backdrop")," is set to ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"ensureFocus"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", it will always bring the focus back to the ",(0,l.kt)("inlineCode",{parentName:"td"},"Drawer")," descendants, which does not allow the focus to escape while open.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"finalFocusRef"),(0,l.kt)("td",{parentName:"tr",align:"left"},"RefObject"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"The ",(0,l.kt)("inlineCode",{parentName:"td"},"ref")," of element to receive focus when the drawer closes.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"initialFocusRef"),(0,l.kt)("td",{parentName:"tr",align:"left"},"RefObject"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"The ",(0,l.kt)("inlineCode",{parentName:"td"},"ref")," of the element to receive focus when the drawer opens.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"isClosable"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", a close button will appear on the right side.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"isOpen"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", the drawer is shown.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"onClose"),(0,l.kt)("td",{parentName:"tr",align:"left"},"function"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"Callback fired when the drawer closes.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"placement"),(0,l.kt)("td",{parentName:"tr",align:"left"},"string"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'right'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Change the placement of the drawer. One of: 'left', 'right', 'top', 'bottom'")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"size"),(0,l.kt)("td",{parentName:"tr",align:"left"},"string"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'auto'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Change the size of the drawer. One of: 'auto', 'sm', 'md', 'lg', 'full'")))),(0,l.kt)("h3",null,"DrawerOverlay"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionComponent"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ElementType"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Fade"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The component used for the transition.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionProps"),(0,l.kt)("td",{parentName:"tr",align:"left"},"object"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"Props applied to the ",(0,l.kt)("a",{parentName:"td",href:"http://reactcommunity.org/react-transition-group/transition#Transition-props"},"Transition")," element.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionProps.appear"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"true"),(0,l.kt)("td",{parentName:"tr",align:"left"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"})))),(0,l.kt)("h3",null,"DrawerContent"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionComponent"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ElementType"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Slide"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The component used for the transition.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionProps"),(0,l.kt)("td",{parentName:"tr",align:"left"},"object"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"Props applied to the ",(0,l.kt)("a",{parentName:"td",href:"http://reactcommunity.org/react-transition-group/transition#Transition-props"},"Transition")," element.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"TransitionProps.appear"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"true"),(0,l.kt)("td",{parentName:"tr",align:"left"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"})))),(0,l.kt)("h3",null,"DrawerHeader"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"})))),(0,l.kt)("h3",null,"DrawerBody"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"})))),(0,l.kt)("h3",null,"DrawerFooter"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"})))))}s.isMDXComponent=!0},2652:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/drawer",function(){return n(249)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=2652,e(e.s=t);var t}));var t=e.O();_N_E=t}]);