(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9688],{11562:function(e,n,t){"use strict";t.r(n);var s=t(52322),i=t(45392);function r(e){var n=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",h3:"h3",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,i.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{children:"Alert"}),"\n",(0,s.jsx)(n.p,{children:"An alert is used to convey important information to the user through the use of contextual types, icons, and colors."}),"\n",(0,s.jsx)(n.h2,{children:"Import"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { Alert } from '@tonic-ui/react';\n"})}),"\n",(0,s.jsx)(n.h2,{children:"Usage"}),"\n",(0,s.jsx)(n.h3,{children:"Variants"}),"\n",(0,s.jsxs)(n.p,{children:["You can use the ",(0,s.jsx)(n.code,{children:"variant"})," prop to change the appearance of the alert. The variants come in two variations: ",(0,s.jsx)(n.code,{children:"solid"})," and ",(0,s.jsx)(n.code,{children:"outline"}),"."]}),"\n",(0,s.jsx)(n.h4,{children:"Solid"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"solid"})," variant is used to indicate an important message."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Alert variant="solid" severity="info">\n  <Text>This is an important message.</Text>\n</Alert>\n'})}),"\n",(0,s.jsx)(n.h4,{children:"Outline"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"outline"})," variant is useful for displaying a contextual alert that is not a part of the primary flow of the application."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Alert variant="outline" severity="info">\n  <Text>This is a contextual alert.</Text>\n</Alert>\n'})}),"\n",(0,s.jsx)(n.h3,{children:"Severity levels"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"severity"})," prop can be used to specify the severity level of the alert. The severity levels are: ",(0,s.jsx)(n.code,{children:"success"}),", ",(0,s.jsx)(n.code,{children:"info"}),", ",(0,s.jsx)(n.code,{children:"warning"}),", and ",(0,s.jsx)(n.code,{children:"error"}),". The default severity level is ",(0,s.jsx)(n.code,{children:"success"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="6x">\n  <Stack direction="column" spacing="2x">\n    <Alert variant="solid" severity="success">\n      <Text>This is a success alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="info">\n      <Text>This is an info alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="warning">\n      <Text>This is a warning alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="error">\n      <Text>This is an error alert.</Text>\n    </Alert>\n  </Stack>\n  <Stack direction="column" spacing="2x">\n    <Alert variant="outline" severity="success">\n      <Text>This is a success alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="info">\n      <Text>This is an info alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="warning">\n      <Text>This is a warning alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="error">\n      <Text>This is an error alert.</Text>\n    </Alert>\n  </Stack>\n</Stack>\n'})}),"\n",(0,s.jsxs)(n.h3,{children:[(0,s.jsx)(n.code,{children:"icon"})," prop"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"icon"})," prop allows you to specify an icon to be displayed in the alert.\nIf not specified, the default icon will be used based on the ",(0,s.jsx)(n.code,{children:"severity"})," prop."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="6x">\n  <Stack direction="column" spacing="2x">\n    <Alert variant="solid" severity="success" isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="solid" severity="success" icon="success" isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="solid" severity="success" icon={<Icon icon="check-circle-o" />} isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="solid" severity="success" icon={false} isClosable>\n      This is a success alert.\n    </Alert>\n  </Stack>\n  <Stack direction="column" spacing="2x">\n    <Alert variant="outline" severity="success" isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="outline" severity="success" icon="success" isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="outline" severity="success" icon={<Icon icon="check-circle-o" />} isClosable>\n      This is a success alert.\n    </Alert>\n    <Alert variant="outline" severity="success" icon={false} isClosable>\n      This is a success alert.\n    </Alert>\n  </Stack>\n</Stack>\n'})}),"\n",(0,s.jsxs)(n.h3,{children:[(0,s.jsx)(n.code,{children:"isClosable"})," prop"]}),"\n",(0,s.jsxs)(n.p,{children:["Set ",(0,s.jsx)(n.code,{children:"isClosable"})," to ",(0,s.jsx)(n.code,{children:"true"})," to make the alert closable. The default value is ",(0,s.jsx)(n.code,{children:"false"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="6x">\n  <Stack direction="column" spacing="2x">\n    <Alert variant="solid" severity="success" isClosable>\n      <Text>This is a success alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="info" isClosable>\n      <Text>This is an info alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="warning" isClosable>\n      <Text>This is a warning alert.</Text>\n    </Alert>\n    <Alert variant="solid" severity="error" isClosable>\n      <Text>This is an error alert.</Text>\n    </Alert>\n  </Stack>\n  <Stack direction="column" spacing="2x">\n    <Alert variant="outline" severity="success" isClosable>\n      <Text>This is a success alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="info" isClosable>\n      <Text>This is an info alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="warning" isClosable>\n      <Text>This is a warning alert.</Text>\n    </Alert>\n    <Alert variant="outline" severity="error" isClosable>\n      <Text>This is an error alert.</Text>\n    </Alert>\n  </Stack>\n</Stack>\n'})}),"\n",(0,s.jsx)(n.h3,{children:"Alert actions"}),"\n",(0,s.jsx)(n.p,{children:"An alert action is a button or link to trigger an action. It is used to provide additional context to the user."}),"\n",(0,s.jsxs)(n.p,{children:["The action button is usually aligned to the right of the alert. You can use ",(0,s.jsx)(n.code,{children:"justifyContent"})," to align the action button to the right."]}),"\n",(0,s.jsx)(n.pre,{noInline:!0,children:(0,s.jsx)(n.code,{className:"language-jsx",children:'const ActionButton = React.forwardRef((props, ref) => (\n  <Button\n    ref={ref}\n    variant="secondary"\n    borderColor="black:primary"\n    color="black:primary"\n    css={sx({\n      \':active\': {\n        color: \'black:primary\',\n      },\n      \':focus\': {\n        color: \'black:primary\',\n      },\n      \':hover\': {\n        background: \'rgba(0, 0, 0, 0.12)\',\n        color: \'black:primary\',\n      },\n      \':hover:not(:focus)\': {\n        boxShadow: \'none\',\n      },\n    })}\n    {...props}\n  />\n));\n\nfunction Example() {\n  return (\n    <Stack direction="column" spacing="6x">\n      <Stack direction="column" spacing="2x">\n        <Alert variant="solid" severity="warning">\n          <Flex justifyContent="space-between">\n            <Text>This is a warning alert.</Text>\n            <LinkButton>Learn More</LinkButton>\n          </Flex>\n        </Alert>\n        <Alert variant="solid" severity="error">\n          <Flex justifyContent="space-between" mt={-1} mb={-2}>\n            <Text>This is an error alert.</Text>\n            <ActionButton\n              // See above for the ActionButton component\n              size="sm"\n            >\n              Action Button\n            </ActionButton>\n          </Flex>\n        </Alert>\n      </Stack>\n      <Stack direction="column" spacing="2x">\n        <Alert variant="outline" severity="warning">\n          <Flex justifyContent="space-between">\n            <Text>This is a warning alert.</Text>\n            <LinkButton>Learn More</LinkButton>\n          </Flex>\n        </Alert>\n        <Alert variant="outline" severity="error">\n          <Flex justifyContent="space-between" mt={-1} mb={-2}>\n            <Text>This is an error alert.</Text>\n            <Button size="sm" variant="secondary">\n              Action Button\n            </Button>\n          </Flex>\n        </Alert>\n      </Stack>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n'})}),"\n",(0,s.jsx)(n.h3,{children:"Formatted text"}),"\n",(0,s.jsxs)(n.p,{children:["You can use the ",(0,s.jsx)(n.code,{children:"Text"})," component to format text."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'<Stack direction="column" spacing="2x">\n  <Alert isClosable severity="success">\n    <Box mb="1x">\n      <Text fontWeight="bold">Success</Text>\n    </Box>\n    <Text mr={-36}>\n      This is a success alert.\n    </Text>\n  </Alert>\n  <Alert isClosable severity="info">\n    <Box mb="1x">\n      <Text fontWeight="bold">Info</Text>\n    </Box>\n    <Text mr={-36}>\n      This is an info alert.\n    </Text>\n  </Alert>\n  <Alert isClosable severity="warning">\n    <Box mb="1x">\n      <Text fontWeight="bold">Warning</Text>\n    </Box>\n    <Text mr={-36}>\n      This is a warning alert.\n    </Text>\n  </Alert>\n  <Alert isClosable severity="error">\n    <Box mb="1x">\n      <Text fontWeight="bold">Error</Text>\n    </Box>\n    <Text mr={-36}>\n      This is an error alert.\n    </Text>\n  </Alert>\n</Stack>\n'})}),"\n",(0,s.jsx)(n.h3,{children:"Pagination"}),"\n",(0,s.jsx)(n.p,{children:"For some use cases, you may want to display a list of alerts using pagination to reduce the number of visible alerts on the screen."}),"\n",(0,s.jsx)(n.pre,{noInline:!0,children:(0,s.jsx)(n.code,{className:"language-jsx",children:"const alerts = [\n  { variant: 'solid', severity: 'success', icon: 'check-circle-o', message: 'This is a success alert' },\n  { variant: 'solid', severity: 'info', icon: 'info', message: 'This is an info alert' },\n  { variant: 'solid', severity: 'warning', icon: 'warning-triangle', message: 'This is a warning alert' },\n  { variant: 'solid', severity: 'error', icon: 'error', message: 'This is an error alert' },\n];\nconst pageMin = alerts.length > 0 ? 1 : 0;\nconst pageMax = alerts.length > 0 ? alerts.length : 0;\n\nconst IconButton = (props) => (\n  <ButtonBase\n    color=\"black:secondary\"\n    _disabled={{\n      color: 'black:disabled',\n    }}\n    _hover={{\n      color: 'black:primary',\n    }}\n    {...props}\n  />\n);\n\nfunction Example() {\n  const [page, setPage] = React.useState(pageMin);\n  const alert = alerts[page - 1] || {};\n\n  return (\n    <Alert\n      variant={alert.variant}\n      severity={alert.severity}\n      icon={alert.icon}\n      isClosable\n    >\n      <Flex justifyContent=\"space-between\">\n        <Text>{alert.message}</Text>\n        <Flex columnGap=\"2x\" alignItems=\"center\">\n          <IconButton\n            disabled={page <= pageMin}\n            onClick={() => setPage(Math.max(pageMin, page - 1))}\n          >\n            <Icon icon=\"chevron-up\" />\n          </IconButton>\n          <Text>{page}/{pageMax}</Text>\n          <IconButton\n            disabled={page >= pageMax}\n            onClick={() => setPage(Math.min(pageMax, page + 1))}\n          >\n            <Icon icon=\"chevron-down\" />\n          </IconButton>\n        </Flex>\n      </Flex>\n    </Alert>\n  );\n}\n\nrender(<Example />);\n"})}),"\n",(0,s.jsx)(n.h3,{children:"Transition effects"}),"\n",(0,s.jsx)(n.p,{children:"To animate the alert, you can use a transition component to apply an animation effect."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [isOpen, setIsOpen] = React.useState(true);\n  const handleOpen = () => setIsOpen(true);\n  const handleClose = () => setIsOpen(false);\n\n  return (\n    <>\n      <Collapse in={isOpen}>\n        <Alert isClosable severity="info" onClose={handleClose}>\n          Click the close button on the right side.\n        </Alert>\n      </Collapse>\n      <Box mt="4x">\n        <Button onClick={handleOpen} disabled={isOpen}>\n          Reopen\n        </Button>\n      </Box>\n    </>\n  );\n}\n'})}),"\n",(0,s.jsx)(n.h2,{children:"Props"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{align:"left",children:"Name"}),(0,s.jsx)(n.th,{align:"left",children:"Type"}),(0,s.jsx)(n.th,{align:"left",children:"Default"}),(0,s.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"isClosable"}),(0,s.jsx)(n.td,{align:"left",children:"boolean"}),(0,s.jsx)(n.td,{align:"left"}),(0,s.jsxs)(n.td,{align:"left",children:["If ",(0,s.jsx)(n.code,{children:"true"}),", a close button will appear on the right side."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"onClose"}),(0,s.jsx)(n.td,{align:"left",children:"function"}),(0,s.jsx)(n.td,{align:"left"}),(0,s.jsx)(n.td,{align:"left",children:"A callback called when the close button is clicked."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"variant"}),(0,s.jsx)(n.td,{align:"left",children:"string"}),(0,s.jsx)(n.td,{align:"left",children:"'solid'"}),(0,s.jsx)(n.td,{align:"left",children:"The variant to use. One of: 'solid', 'outline'"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"severity"}),(0,s.jsx)(n.td,{align:"left",children:"string"}),(0,s.jsx)(n.td,{align:"left",children:"'success'"}),(0,s.jsx)(n.td,{align:"left",children:"The severity level to use. One of: 'success', 'info', 'warning', 'error'"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{align:"left",children:"icon"}),(0,s.jsx)(n.td,{align:"left",children:"string | ReactNode | false"}),(0,s.jsx)(n.td,{align:"left"}),(0,s.jsxs)(n.td,{align:"left",children:["Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the ",(0,s.jsx)(n.code,{children:"severity"})," prop."]})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,i.ah)(),e.components).wrapper;return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(r,e)})):r(e)}},74214:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/alert",function(){return t(11562)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=74214)}),_N_E=e.O()}]);