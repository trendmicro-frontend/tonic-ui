(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1186],{51818:function(n,e,o){"use strict";o.r(e);var r=o(52322),s=o(45392);function t(n){var e=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",blockquote:"blockquote",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,s.ah)(),n.components);return(0,r.jsxs)(e.div,{className:"main-content",id:"main-content",children:[(0,r.jsx)(e.h1,{id:"buttonbase",children:"ButtonBase"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"ButtonBase"})," does not have appearance settings including default border, color, outline, and padding. It aims to be a simple building block for creating a button."]}),"\n",(0,r.jsxs)(e.h2,{id:"import",children:["Import",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"import { ButtonBase } from '@tonic-ui/react';\n"})}),"\n",(0,r.jsxs)(e.h2,{id:"usage",children:["Usage",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"<ButtonBase>Click Me</ButtonBase>\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"attributes",children:["Attributes",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#attributes",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(e.p,{children:["Standard button attributes are supported, e.g., ",(0,r.jsx)(e.code,{children:"type"}),", ",(0,r.jsx)(e.code,{children:"disabled"}),", etc."]}),"\n",(0,r.jsxs)(e.h4,{id:"disabled",children:[(0,r.jsx)(e.code,{children:"disabled"}),(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#disabled",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"<ButtonBase\n  disabled\n  _disabled={{\n    opacity: 0.28, // dark: 0.28, light: 0.3\n    cursor: 'not-allowed',\n  }}\n>\n  Button is disabled\n</ButtonBase>\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"icon-button",children:["Icon button",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#icon-button",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(e.p,{children:["You can use ",(0,r.jsx)(e.code,{children:"ButtonBase"})," to compose an icon button. An icon button is a button that contains only an icon."]}),"\n",(0,r.jsx)(e.pre,{noInline:!0,children:(0,r.jsx)(e.code,{className:"language-jsx",children:"const IconButton = React.forwardRef((props, ref) => {\n  const [colorMode] = useColorMode();\n  const { colors } = useTheme();\n  const color = {\n    dark: 'white:secondary',\n    light: 'black:secondary',\n  }[colorMode];\n  const hoverColor = {\n    dark: 'white:primary',\n    light: 'black:primary',\n  }[colorMode];\n  const activeColor = color;\n  const focusColor = color;\n  const focusHoverColor = hoverColor;\n  const focusActiveColor = activeColor;\n  const focusBorderColor = colors['blue:60'];\n\n  return (\n    <ButtonBase\n      ref={ref}\n      border={1}\n      borderColor=\"transparent\"\n      color={color}\n      transition=\"all .2s\"\n      lineHeight={1}\n      px=\"2x\"\n      py=\"2x\"\n      _hover={{\n        color: hoverColor,\n      }}\n      _active={{\n        color: activeColor,\n      }}\n      _focus={{\n        borderColor: focusBorderColor,\n        boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,\n        color: focusColor,\n      }}\n      _focusHover={{\n        color: focusHoverColor,\n      }}\n      _focusActive={{\n        borderColor: focusBorderColor,\n        boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,\n        color: focusActiveColor,\n      }}\n      {...props}\n    />\n  );\n});\n\nfunction Example() {\n  return (\n    <IconButton>\n      <Icon icon=\"close\" />\n    </IconButton>\n  );\n}\n\nrender(<Example />);\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"notification-action-button",children:["Notification action button",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#notification-action-button",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(e.p,{children:["To perform an action on an alert or toast notification, you can use ",(0,r.jsx)(e.code,{children:"ButtonBase"})," to compose an action button using style props, or override ",(0,r.jsx)(e.code,{children:"Button"})," with the ",(0,r.jsx)(e.code,{children:"css"})," prop to customize the appearance."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"// import\nimport { sx } from '@tonic-ui/styled-system';\n\n// example\nconst ActionButton = forwardRef((props, ref) => (\n  <Button\n    ref={ref}\n    variant=\"secondary\"\n    borderColor=\"black:primary\"\n    color=\"black:primary\"\n    css={sx({\n      ':active': {\n        color: 'black:primary',\n      },\n      ':focus': {\n        color: 'black:primary',\n      },\n      ':hover': {\n        background: 'rgba(0, 0, 0, 0.12)',\n        color: 'black:primary',\n      },\n      ':hover:not(:focus)': {\n        boxShadow: 'none',\n      },\n    })}\n    {...props}\n  />\n));\n"})}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"sx"})," is a utility function provided by ",(0,r.jsx)(e.code,{children:"@tonic-ui/styled-system"})," that can specify style prop value with theme tokens when using the ",(0,r.jsx)(e.code,{children:"css"})," prop on a styled component."]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{noInline:!0,children:(0,r.jsx)(e.code,{className:"language-jsx",children:"const ActionButton = React.forwardRef((props, ref) => (\n  <Button\n    ref={ref}\n    variant=\"secondary\"\n    borderColor=\"black:primary\"\n    color=\"black:primary\"\n    css={sx({\n      ':active': {\n        color: 'black:primary',\n      },\n      ':focus': {\n        color: 'black:primary',\n      },\n      ':hover': {\n        background: 'rgba(0, 0, 0, 0.12)',\n        color: 'black:primary',\n      },\n      ':hover:not(:focus)': {\n        boxShadow: 'none',\n      },\n    })}\n    {...props}\n  />\n));\n\nfunction Example() {\n  return (\n    <Alert variant=\"solid\" severity=\"error\" isClosable>\n      <Flex justifyContent=\"space-between\">\n        <Text>\n          This is an alert notification with an action button.\n        </Text>\n        <ActionButton size=\"sm\">\n          Action Button\n        </ActionButton>\n      </Flex>\n    </Alert>\n  );\n}\n\nrender(<Example />);\n"})}),"\n",(0,r.jsxs)(e.h2,{id:"props",children:["Props",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(e.h3,{id:"buttonbase-1",children:["ButtonBase",(0,r.jsx)(e.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#buttonbase-1",children:(0,r.jsx)(e.svg,{children:(0,r.jsx)(e.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{align:"left",children:"Name"}),(0,r.jsx)(e.th,{align:"left",children:"Type"}),(0,r.jsx)(e.th,{align:"left",children:"Default"}),(0,r.jsx)(e.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{align:"left",children:"children"}),(0,r.jsx)(e.td,{align:"left",children:"ReactNode"}),(0,r.jsx)(e.td,{align:"left"}),(0,r.jsx)(e.td,{align:"left"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{align:"left",children:"disabled"}),(0,r.jsx)(e.td,{align:"left",children:"boolean"}),(0,r.jsx)(e.td,{align:"left"}),(0,r.jsxs)(e.td,{align:"left",children:["If ",(0,r.jsx)(e.code,{children:"true"}),", the button will be disabled. This sets ",(0,r.jsx)(e.code,{children:"aria-disabled=true"})," and you can style this state by passing the ",(0,r.jsx)(e.code,{children:"_disabled"})," prop."]})]})]})]})]})}e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object.assign({},(0,s.ah)(),n.components).wrapper;return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(t,n)})):t(n)}},52050:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/buttonbase",function(){return o(51818)}])}},function(n){n.O(0,[9774,2888,179],function(){return n(n.s=52050)}),_N_E=n.O()}]);