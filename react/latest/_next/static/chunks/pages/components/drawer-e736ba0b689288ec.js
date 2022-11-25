(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[317],{7045:function(e,n,l){"use strict";l.r(n);var t=l(2322),r=l(5392);function o(e){var n=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a"},(0,r.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:"Drawer"}),"\n",(0,t.jsxs)(n.p,{children:["A drawer dialog is a window overlaid on either the primary window or another dialog\nwindow. Contents behind a drawer dialog are ",(0,t.jsx)(n.strong,{children:"inert"})," meaning that users cannot\ninteract with content behind the dialog."]}),"\n",(0,t.jsx)(n.h2,{children:"Import"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Drawer"}),": A ",(0,t.jsx)(n.code,{children:"Provider"})," component that provides the context to the components it wraps."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DrawerOverlay"}),": The overlay of the drawer."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DrawerContent"}),": The content of the drawer."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DrawerHeader"}),": The header of the drawer."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DrawerBody"}),": The body of the drawer."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DrawerFooter"}),": The footer of the drawer."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {\n  Drawer,\n  DrawerOverlay,\n  DrawerContent,\n  DrawerHeader,\n  DrawerBody,\n  DrawerFooter,\n  useDrawer,\n} from '@tonic-ui/react';\n"})}),"\n",(0,t.jsx)(n.h2,{children:"Usage"}),"\n",(0,t.jsx)(n.p,{children:"Click the button below to toggle a drawer. The drawer will show up on either side of the screen."}),"\n",(0,t.jsx)(n.pre,{noInline:!0,children:(0,t.jsx)(n.code,{className:"language-jsx",children:'const CodeBlock = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.secondary}\n      border={1}\n      borderColor={colorStyle.divider}\n      fontFamily="mono"\n      py="3x"\n      px="3x"\n      whiteSpace="pre"\n      {...props}\n    />\n  );\n};\n\nconst FormGroup = (props) => (\n  <Box mb="4x" {...props} />\n);\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nconst bodyScrollLockCode = `\n// import\nimport { Global } from \'@emotion/react\';\n\n// example\n<Drawer>\n  <Global\n    styles={css\\`\n      body {\n        overflow: hidden;\n      }\n    \\`}\n  />\n  <DrawerOverlay />\n  <DrawerContent>\n    <DrawerHeader />\n    <DrawerBody />\n    <DrawerFooter />\n  </DrawerContent>\n</Drawer>\n`.trim();\n\nfunction Example() {\n  const initialFocusRef = React.useRef();\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const iconColor = colorStyle.color.tertiary;\n  const [isOpen, toggleDrawer] = useToggle(false);\n  const [placement, changePlacementBy] = useSelection(\'right\');\n  const [size, changeSizeBy] = useSelection(\'auto\');\n  const [autoFocus, toggleAutoFocus] = useToggle(true);\n  const [backdrop, toggleBackdrop] = useToggle(true);\n  const [closeOnEsc, toggleCloseOnEsc] = useToggle(true);\n  const [closeOnOutsideClick, toggleCloseOnOutsideClick] = useToggle(true);\n  const [ensureFocus, toggleEnsureFocus] = useToggle(true);\n  const [isClosable, toggleIsClosable] = useToggle(true);\n  const [isOverlayVisible, toggleIsOverlayVisible] = useToggle(true);\n  const [isHeaderVisible, toggleIsHeaderVisible] = useToggle(true);\n  const [isBodyVisible, toggleIsBodyVisible] = useToggle(true);\n  const [isFooterVisible, toggleIsFooterVisible] = useToggle(true);\n  const [isAlertVisible, toggleIsAlertVisible] = useToggle(true);\n  const [enableBodyScrollLock, toggleBodyScrollLock] = useToggle(true);\n\n  return (\n    <>\n      <Box>\n        <Button onClick={() => toggleDrawer(true)}>\n          Launch drawer\n        </Button>\n      </Box>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Drawer props\n        </Text>\n      </Box>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            placement\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'left\', \'right\', \'top\', \'bottom\'].map(value => (\n            <Button\n              key={value}\n              selected={value === placement} \n              onClick={changePlacementBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            size\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'auto\', \'sm\', \'md\', \'lg\', \'full\'].map(value => (\n            <Button\n              key={value}\n              selected={value === size}\n              onClick={changeSizeBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={autoFocus}\n            disabled={!ensureFocus}\n            onChange={() => toggleAutoFocus()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">autoFocus</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={backdrop}\n            onChange={(e) => {\n              const nextBackdrop = !backdrop;\n              if (!nextBackdrop) {\n                toggleCloseOnOutsideClick(false);\n                toggleIsOverlayVisible(false);\n              }\n\n              toggleBackdrop();\n            }}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">backdrop</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={closeOnEsc}\n            disabled={!isClosable && !closeOnOutsideClick}\n            onChange={() => toggleCloseOnEsc()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">closeOnEsc</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={closeOnOutsideClick}\n            disabled={(!isClosable && !closeOnEsc) || !backdrop}\n            onChange={() => toggleCloseOnOutsideClick()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">closeOnOutsideClick</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={ensureFocus}\n            onChange={() => toggleEnsureFocus()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">ensureFocus</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={isClosable}\n            disabled={!closeOnEsc && !closeOnOutsideClick}\n            onChange={() => toggleIsClosable()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">isClosable</Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Drawer composition\n        </Text>\n      </Box>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={isOverlayVisible}\n            disabled={!backdrop}\n            onChange={() => toggleIsOverlayVisible()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerOverlay</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isHeaderVisible} onChange={() => toggleIsHeaderVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerHeader</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isBodyVisible} onChange={() => toggleIsBodyVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerBody</Text>\n        </TextLabel>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox checked={isFooterVisible} onChange={() => toggleIsFooterVisible()} />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">DrawerFooter</Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider my="4x" />\n      <Box mb="4x">\n        <Text fontSize="lg" lineHeight="lg">\n          Extra drawer setup\n        </Text>\n      </Box>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center" mb="3x">\n          <Checkbox\n            checked={enableBodyScrollLock}\n            onChange={() => toggleBodyScrollLock()}\n          />\n          <Space width="2x" />\n          <Text>\n            Enable body scroll locking\n          </Text>\n        </TextLabel>\n        <Box ml="6x">\n          <Box mb="4x">\n            <Text mb="2x">\n              You can use <strong>Body Scroll Locking</strong> to prevent the user from scrolling the page while the drawer is open.\n            </Text>\n            <Text mb="2x">\n              <strong>Body Scroll Locking</strong> is currently not available with default setup, you can follow the instructions below to append global styles to the body to prevent scrolling.\n            </Text>\n          </Box>\n          <CodeBlock>\n            {bodyScrollLockCode}\n          </CodeBlock>\n        </Box>\n      </FormGroup>\n      <Drawer\n        autoFocus={autoFocus}\n        backdrop={backdrop}\n        closeOnEsc={closeOnEsc}\n        closeOnOutsideClick={closeOnOutsideClick}\n        ensureFocus={ensureFocus}\n        initialFocusRef={initialFocusRef}\n        isClosable={isClosable}\n        isOpen={isOpen}\n        onClose={() => toggleDrawer(false)}\n        placement={placement}\n        size={size}\n      >\n        {enableBodyScrollLock && (\n          <Global\n            styles={css`\n              body {\n                overflow: hidden;\n              }\n            `}\n          />\n        )}\n        {isOverlayVisible && (\n          <DrawerOverlay />\n        )}\n        <DrawerContent>\n          {isHeaderVisible && (\n            <DrawerHeader>\n              {size === \'auto\' && <Text>Auto-sized Drawer</Text>}\n              {size === \'sm\' && <Text>Small Drawer</Text>}\n              {size === \'md\' && <Text>Medium Drawer</Text>}\n              {size === \'lg\' && <Text>Large Drawer</Text>}\n              {size === \'full\' && <Text>Full-width Drawer</Text>}\n            </DrawerHeader>\n          )}\n          {isBodyVisible && (\n            <DrawerBody>\n              {isAlertVisible && (\n                <Alert variant="outline" severity="info" mb="4x" isClosable onClose={() => toggleIsAlertVisible()}>\n                  <Text>This is an info alert</Text>\n                </Alert>\n              )}\n              <Tabs>\n                <TabList mb="4x">\n                  <Tab>Tab 1</Tab>\n                  <Tab>Tab 2</Tab>\n                </TabList>\n                <TabPanels>\n                  <TabPanel>\n                    <SkeletonBody mb="4x" />\n                    <Grid\n                      templateColumns="auto 1fr"\n                      rowGap="2x"\n                      columnGap="3x"\n                      alignItems="center"\n                      mb="4x"\n                    >\n                      <Icon icon="user" color={iconColor} />\n                      <Input ref={initialFocusRef} placeholder="User name" />\n                      <Icon icon="email" color={iconColor} />\n                      <Input placeholder="Email address" />\n                    </Grid>\n                  </TabPanel>\n                  <TabPanel>\n                    <Box\n                      backgroundColor={colorStyle.background.tertiary}\n                      minHeight={1000}\n                      px="3x"\n                      py="2x"\n                    >\n                      <Text>\n                        This is a very long content that will overflow the modal\n                      </Text>\n                    </Box>\n                  </TabPanel>\n                </TabPanels>\n              </Tabs>\n            </DrawerBody>\n          )}\n          {isFooterVisible && (\n            <DrawerFooter>\n              <Grid\n                templateColumns="1fr 1fr"\n                columnGap="2x"\n              >\n                <Button variant="primary" onClick={() => toggleDrawer(false)}>\n                  OK\n                </Button>\n                <Button onClick={() => toggleDrawer(false)}>\n                  Cancel\n                </Button>\n              </Grid>\n            </DrawerFooter>\n          )}\n        </DrawerContent>\n      </Drawer>\n    </>\n  );\n}\n\nrender(<Example />);\n'})}),"\n",(0,t.jsx)(n.h2,{children:"Props"}),"\n",(0,t.jsx)(n.h3,{children:"Drawer"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"autoFocus"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"})," and ",(0,t.jsx)(n.code,{children:"ensureFocus"})," is ",(0,t.jsx)(n.code,{children:"true"})," and ",(0,t.jsx)(n.code,{children:"initialFocusRef"})," is not set, it will automatically set focus on the first focusable element."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"backdrop"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", it will wrap components with a backdrop to provide a click area for dismissing when clicking outside the drawer."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,t.jsx)(n.code,{children:"(context) => ReactNode"})]}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"A function child can be used intead of a React element. This function is called with the context object."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"closeOnEsc"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", close the drawer when the ",(0,t.jsx)(n.code,{children:"esc"})," key is pressed."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"closeOnOutsideClick"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", close the drawer when click outside of the drawer. Note that this value will not have any effect when ",(0,t.jsx)(n.code,{children:"backdrop"})," is set to ",(0,t.jsx)(n.code,{children:"true"}),"."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"ensureFocus"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", it will always bring the focus back to the ",(0,t.jsx)(n.code,{children:"Drawer"})," descendants, which does not allow the focus to escape while open."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"finalFocusRef"}),(0,t.jsx)(n.td,{align:"left",children:"RefObject"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["The ",(0,t.jsx)(n.code,{children:"ref"})," of element to receive focus when the drawer closes."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"initialFocusRef"}),(0,t.jsx)(n.td,{align:"left",children:"RefObject"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["The ",(0,t.jsx)(n.code,{children:"ref"})," of the element to receive focus when the drawer opens."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"isClosable"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", a close button will appear on the right side."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"isOpen"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"false"}),(0,t.jsxs)(n.td,{align:"left",children:["If ",(0,t.jsx)(n.code,{children:"true"}),", the drawer is shown."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"onClose"}),(0,t.jsx)(n.td,{align:"left",children:"function"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left",children:"Callback fired when the drawer closes."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"placement"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left",children:"'right'"}),(0,t.jsx)(n.td,{align:"left",children:"Change the placement of the drawer. One of: 'left', 'right', 'top', 'bottom'"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"size"}),(0,t.jsx)(n.td,{align:"left",children:"string"}),(0,t.jsx)(n.td,{align:"left",children:"'auto'"}),(0,t.jsx)(n.td,{align:"left",children:"Change the size of the drawer. One of: 'auto', 'sm', 'md', 'lg', 'full'"})]})]})]}),"\n",(0,t.jsx)(n.h3,{children:"DrawerOverlay"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionComponent"}),(0,t.jsx)(n.td,{align:"left",children:"ElementType"}),(0,t.jsx)(n.td,{align:"left",children:"Fade"}),(0,t.jsx)(n.td,{align:"left",children:"The component used for the transition."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionProps"}),(0,t.jsx)(n.td,{align:"left",children:"object"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["Props applied to the ",(0,t.jsx)(n.a,{href:"http://reactcommunity.org/react-transition-group/transition#Transition-props",children:"Transition"})," element."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionProps.appear"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"true"}),(0,t.jsx)(n.td,{align:"left"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})]})]}),"\n",(0,t.jsx)(n.h3,{children:"DrawerContent"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionComponent"}),(0,t.jsx)(n.td,{align:"left",children:"ElementType"}),(0,t.jsx)(n.td,{align:"left",children:"Slide"}),(0,t.jsx)(n.td,{align:"left",children:"The component used for the transition."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionProps"}),(0,t.jsx)(n.td,{align:"left",children:"object"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsxs)(n.td,{align:"left",children:["Props applied to the ",(0,t.jsx)(n.a,{href:"http://reactcommunity.org/react-transition-group/transition#Transition-props",children:"Transition"})," element."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"TransitionProps.appear"}),(0,t.jsx)(n.td,{align:"left",children:"boolean"}),(0,t.jsx)(n.td,{align:"left",children:"true"}),(0,t.jsx)(n.td,{align:"left"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})]})]}),"\n",(0,t.jsx)(n.h3,{children:"DrawerHeader"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,t.jsx)(n.h3,{children:"DrawerBody"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,t.jsx)(n.h3,{children:"DrawerFooter"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{align:"left",children:"Name"}),(0,t.jsx)(n.th,{align:"left",children:"Type"}),(0,t.jsx)(n.th,{align:"left",children:"Default"}),(0,t.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{align:"left",children:"children"}),(0,t.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,t.jsx)(n.td,{align:"left"}),(0,t.jsx)(n.td,{align:"left"})]})})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components).wrapper;return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(o,e)})):o(e)}},2652:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/drawer",function(){return l(7045)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=2652)}),_N_E=e.O()}]);