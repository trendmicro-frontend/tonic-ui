(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1579],{75101:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var a=n(7896),l=n(59740),r=(n(2784),n(30876)),o=["components"],i={};function p(t){var e=t.components,n=(0,l.Z)(t,o);return(0,r.kt)("wrapper",(0,a.Z)({},i,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"Transition"),(0,r.kt)("h2",null,"Import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Scale,\n  Slide,\n  SlideIn,\n} from '@trendmicro/react-styled-ui';\n")),(0,r.kt)("h2",null,"Usage"),(0,r.kt)("h3",null,"Scale transition"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const SkeletonContent = (props) => (\n  <ModalContent p="4x" {...props}>\n    <Flex>\n      <Flex flex="none" mr="4x" align="center">\n        <Skeleton variant="circle" width="10x" height="10x" />\n      </Flex>\n      <Box flex="auto">\n        <Skeleton />\n        <Skeleton />\n        <Skeleton />\n      </Box>\n    </Flex>\n  </ModalContent>\n);\n\nfunction Example() {\n  const { isOpen, onToggle } = useDisclosure();\n\n  return (\n    <>\n      <Button onClick={onToggle}>\n        Toggle\n      </Button>\n      <Scale in={isOpen}>\n        {styles => (\n          <SkeletonContent mt="4x" {...styles} />\n        )}\n      </Scale>\n    </>\n  );\n}\n\nrender(<Example />);\n')),(0,r.kt)("h3",null,"Slide transition"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},"const SelectableButton = ({ selected, ...props }) => {\n  const [colorMode] = useColorMode();\n  const { colors } = useTheme();\n  const focusColor = colors['blue:60'];\n  let _selectedColor = {\n    dark: 'blue:60',\n    light: 'blue:60',\n  }[colorMode];\n  _selectedColor = colors[_selectedColor];\n  const getSelectedProps = {\n    bg: _selectedColor,\n    borderColor: _selectedColor,\n    color: 'white:emphasis',\n    cursor: 'default',\n    pointerEvents: 'none',\n    zIndex: 1,\n    css: {\n      '&::before': {\n        backgroundColor: _selectedColor,\n      },\n      '&:focus': {\n        ':not(:active)': {\n          borderColor: focusColor,\n          boxShadow: `inset 0 0 0 1px ${focusColor}`,\n        },\n        '&::before': {\n          backgroundColor: focusColor,\n        },\n      }\n    },\n    _hover: {\n      bg: _selectedColor,\n    },\n    _active: {\n      bg: _selectedColor,\n    },\n  };\n  return (\n    <Button\n      {...(selected && getSelectedProps)}\n      {...props}\n    />\n  );\n};\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nconst SkeletonContent = (props) => (\n  <ModalContent p=\"4x\" {...props}>\n    <Flex>\n      <Flex flex=\"none\" mr=\"4x\" align=\"center\">\n        <Skeleton variant=\"circle\" width=\"10x\" height=\"10x\" />\n      </Flex>\n      <Box flex=\"auto\">\n        <Skeleton />\n        <Skeleton />\n        <Skeleton />\n      </Box>\n    </Flex>\n  </ModalContent>\n);\n\nfunction Example() {\n  const { isOpen, onClose, onToggle } = useDisclosure();\n  const [from, changeFromBy] = useSelection('top');\n\n  return (\n    <>\n      <Box mb=\"4x\">\n        <Button onClick={onToggle}>\n          Toggle\n        </Button>\n      </Box>\n      <ButtonGroup\n        variant=\"secondary\"\n        css={{\n          '> *:not(:first-of-type)': {\n            marginLeft: -1\n          }\n        }}\n      >\n        {['top', 'bottom', 'left', 'right'].map(value => {\n          const changeFrom = changeFromBy(value);\n          const onClick = () => {\n            changeFrom();\n            onClose();\n          };\n\n          return (\n            <SelectableButton\n              key={value}\n              selected={value === from}\n              onClick={onClick}\n              minWidth=\"15x\"\n            >\n              {value}\n            </SelectableButton>\n          );\n        })}\n      </ButtonGroup>\n      <Slide\n        in={isOpen}\n        from={from}\n        finalWidth=\"100%\"\n      >\n        {styles => (\n          <SkeletonContent mt=\"4x\" {...styles} />\n        )}\n      </Slide>\n    </>\n  );\n}\n\nrender(<Example />);\n")),(0,r.kt)("h3",null,"Slide in transition"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const SkeletonContent = (props) => (\n  <ModalContent p="4x" {...props}>\n    <Flex>\n      <Flex flex="none" mr="4x" align="center">\n        <Skeleton variant="circle" width="10x" height="10x" />\n      </Flex>\n      <Box flex="auto">\n        <Skeleton />\n        <Skeleton />\n        <Skeleton />\n      </Box>\n    </Flex>\n  </ModalContent>\n);\n\nfunction Example() {\n  const { isOpen, onToggle } = useDisclosure();\n\n  return (\n    <>\n      <Button onClick={onToggle}>\n        Toggle\n      </Button>\n      <SlideIn in={isOpen}>\n        {styles => (\n          <SkeletonContent mt="4x" {...styles} />\n        )}\n      </SlideIn>\n    </>\n  );\n}\n\nrender(<Example />);\n')),(0,r.kt)("h2",null,"Props"),(0,r.kt)("h3",null,"Scale"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"in"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Toggle visibility with a transition effect.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A single function-child that receives the styles and renders components.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"duration"),(0,r.kt)("td",{parentName:"tr",align:"left"},"number"),(0,r.kt)("td",{parentName:"tr",align:"left"},"150"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The duration of the transition.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"initialScale"),(0,r.kt)("td",{parentName:"tr",align:"left"},"number"),(0,r.kt)("td",{parentName:"tr",align:"left"},"0.97"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The initial zoom level.")))),(0,r.kt)("h3",null,"Slide"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"in"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Toggle visibility with a transition effect.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A single function-child that receives the styles and renders components.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"duration"),(0,r.kt)("td",{parentName:"tr",align:"left"},"number"),(0,r.kt)("td",{parentName:"tr",align:"left"},"250"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The duration of the transition.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"from"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"One of: ",(0,r.kt)("inlineCode",{parentName:"td"},"'bottom'"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"'top'"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"'left'"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"'right'"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"finalHeight"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'auto'"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"finalWidth"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"})))),(0,r.kt)("h3",null,"SlideIn"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"in"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Toggle visibility with a transition effect.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A single function-child that receives the styles and renders components.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"duration"),(0,r.kt)("td",{parentName:"tr",align:"left"},"number"),(0,r.kt)("td",{parentName:"tr",align:"left"},"150"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The duration of the transition.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"offset"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'10px'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The slide-in offset in pixel.")))))}p.isMDXComponent=!0},58010:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/transition",function(){return n(75101)}])}},function(t){t.O(0,[9774,2888,179],(function(){return e=58010,t(t.s=e);var e}));var e=t.O();_N_E=e}]);