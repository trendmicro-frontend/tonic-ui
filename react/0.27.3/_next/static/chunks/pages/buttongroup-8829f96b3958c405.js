(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[129],{38914:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return u}});var o=e(7896),r=e(59740),i=(e(2784),e(30876)),a=["components"],l={};function u(n){var t=n.components,e=(0,r.Z)(n,a);return(0,i.kt)("wrapper",(0,o.Z)({},l,e,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"ButtonGroup"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ButtonGroup")," is used to group related buttons."),(0,i.kt)("h2",null,"Import"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { ButtonGroup } from '@trendmicro/react-styled-ui';\n")),(0,i.kt)("h2",null,"Usage"),(0,i.kt)("h3",null,"Basic button group"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},"function Example() {\n  const [colorMode] = useColorMode();\n  const dividerColor ={\n    dark: 'gray:70',\n    light: 'gray:30',\n  }[colorMode];\n  return (\n    <ButtonGroup>\n      <Button>One</Button>\n      <Divider orientation=\"vertical\" color={dividerColor} />\n      <Button>Two</Button>\n      <Divider orientation=\"vertical\" color={dividerColor} />\n      <Button>Three</Button>\n    </ButtonGroup>\n  );\n}\n\nrender(<Example />);\n")),(0,i.kt)("h3",null,"Group variants"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"variant")," prop to change the visual style of every button in a group. You can set the value to ",(0,i.kt)("inlineCode",{parentName:"p"},"emphasis"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"primary"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"default"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"secondary")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ghost"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'function Example() {\n  const [colorMode] = useColorMode();\n  const emphasisDividerColor ={\n    dark: \'red:80\',\n    light: \'red:80\',\n  }[colorMode];\n  const primaryDividerColor ={\n    dark: \'blue:80\',\n    light: \'blue:80\',\n  }[colorMode];\n  const defaultDividerColor ={\n    dark: \'gray:70\',\n    light: \'gray:30\',\n  }[colorMode];\n  const ghostDividerColor ={\n    dark: \'gray:60\',\n    light: \'gray:20\',\n  }[colorMode];\n\n  return (\n    <Stack direction="column" spacing="3x">\n      <ButtonGroup variant="emphasis">\n        <Button>One</Button>\n        <Divider orientation="vertical" color={emphasisDividerColor} />\n        <Button>Two</Button>\n        <Divider orientation="vertical" color={emphasisDividerColor} />\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup variant="primary">\n        <Button>One</Button>\n        <Divider orientation="vertical" color={primaryDividerColor} />\n        <Button>Two</Button>\n        <Divider orientation="vertical" color={primaryDividerColor} />\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup variant="default">\n        <Button>One</Button>\n        <Divider orientation="vertical" color={defaultDividerColor} />\n        <Button>Two</Button>\n        <Divider orientation="vertical" color={defaultDividerColor} />\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant="secondary"\n        css={{\n          \'> *:not(:first-of-type)\': {\n            marginLeft: -1\n          }\n        }}\n      >\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant="ghost"\n        css={{\n          \'> *:not(:first-of-type)\': {\n            marginLeft: -1\n          }\n        }}\n      >\n        <Button>One</Button>\n        <Divider orientation="vertical" color={ghostDividerColor} />\n        <Button>Two</Button>\n        <Divider orientation="vertical" color={ghostDividerColor} />\n        <Button>Three</Button>\n      </ButtonGroup>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,i.kt)("h3",null,"Group sizes"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"size")," prop to change the size of the ",(0,i.kt)("inlineCode",{parentName:"p"},"ButtonGroup"),". You can set the value to ",(0,i.kt)("inlineCode",{parentName:"p"},"sm"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"md"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"lg"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'function Example() {\n  const [colorMode] = useColorMode();\n  const defaultDividerColor ={\n    dark: \'gray:70\',\n    light: \'gray:30\',\n  }[colorMode];\n  const ghostDividerColor ={\n    dark: \'gray:60\',\n    light: \'gray:20\',\n  }[colorMode];\n\n  return (\n    <Stack direction="row" spacing="4x">\n      <Stack spacing="4x" alignItems="flex-start">\n        <ButtonGroup size="sm">\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup size="md">\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup size="lg">\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n      </Stack>\n      <Stack spacing="4x" alignItems="flex-start">\n        <ButtonGroup\n          size="sm"\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Button>Middle</Button>\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          size="md"\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Button>Middle</Button>\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          size="lg"\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Button>Middle</Button>\n          <Button>Right</Button>\n        </ButtonGroup>\n      </Stack>\n      <Stack spacing="4x" alignItems="flex-start">\n        <ButtonGroup\n          size="sm"\n          variant="ghost"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          size="md"\n          variant="ghost"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          size="lg"\n          variant="ghost"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>Left</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Middle</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Right</Button>\n        </ButtonGroup>\n      </Stack>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,i.kt)("h3",null,"Group orientation"),(0,i.kt)("p",null,"Make a set of buttons appear vertically stacked rather than horizontally, by adding ",(0,i.kt)("inlineCode",{parentName:"p"},'orientation="vertical"')," to the ",(0,i.kt)("inlineCode",{parentName:"p"},"ButtonGroup")," component."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'function Example() {\n  const [colorMode] = useColorMode();\n  const defaultDividerColor ={\n    dark: \'gray:70\',\n    light: \'gray:30\',\n  }[colorMode];\n  const ghostDividerColor ={\n    dark: \'gray:60\',\n    light: \'gray:20\',\n  }[colorMode];\n  return (\n    <Stack direction="row" spacing="4x">\n      <Stack spacing="4x" alignItems="center">\n        <ButtonGroup>\n          <Button>One</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Two</Button>\n          <Divider orientation="vertical" color={defaultDividerColor} />\n          <Button>Three</Button>\n        </ButtonGroup>\n        <ButtonGroup orientation="vertical">\n          <Button>One</Button>\n          <Divider color={defaultDividerColor} />\n          <Button>Two</Button>\n          <Divider color={defaultDividerColor} />\n          <Button>Three</Button>\n        </ButtonGroup>\n      </Stack>\n      <Stack spacing="4x" alignItems="center">\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>One</Button>\n          <Button>Two</Button>\n          <Button>Three</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          orientation="vertical"\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginTop: -1\n            }\n          }}\n        >\n          <Button>One</Button>\n          <Button>Two</Button>\n          <Button>Three</Button>\n        </ButtonGroup>\n      </Stack>\n      <Stack spacing="4x" alignItems="center">\n        <ButtonGroup\n          variant="ghost"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          <Button>One</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Two</Button>\n          <Divider orientation="vertical" color={ghostDividerColor} />\n          <Button>Three</Button>\n        </ButtonGroup>\n        <ButtonGroup\n          orientation="vertical"\n          variant="ghost"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginTop: -1\n            }\n          }}\n        >\n          <Button>One</Button>\n          <Divider color={ghostDividerColor} />\n          <Button>Two</Button>\n          <Divider color={ghostDividerColor} />\n          <Button>Three</Button>\n        </ButtonGroup>\n      </Stack>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,i.kt)("h3",null,"Button states"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},"const SelectableButton = ({ selected, selectedColor, ...props }) => {\n  const [colorMode] = useColorMode();\n  const { colors } = useTheme();\n  const focusColor = colors['blue:60'];\n  let _selectedColor = selectedColor || {\n    dark: 'blue:60',\n    light: 'blue:60',\n  }[colorMode];\n  _selectedColor = colors[_selectedColor];\n  const getSelectedProps = {\n    bg: _selectedColor,\n    borderColor: _selectedColor,\n    color: 'white:emphasis',\n    cursor: 'default',\n    pointerEvents: 'none',\n    zIndex: 1,\n    css: {\n      '&::before': {\n        backgroundColor: _selectedColor,\n      },\n      '&:focus': {\n        ':not(:active)': {\n          borderColor: focusColor,\n          boxShadow: `inset 0 0 0 1px ${focusColor}`,\n        },\n        '&::before': {\n          backgroundColor: focusColor,\n        },\n      }\n    },\n    _hover: {\n      bg: _selectedColor,\n    },\n    _active: {\n      bg: _selectedColor,\n    },\n  };\n  return (\n    <Button\n      {...(selected && getSelectedProps)}\n      {...props}\n    />\n  );\n};\n\nfunction SwitchButton() {\n  const [colorMode] = useColorMode();\n  const emphasisDividerColor = {\n    dark: 'red:80',\n    light: 'red:80',\n  }[colorMode];\n  const primaryDividerColor = {\n    dark: 'blue:80',\n    light: 'blue:80',\n  }[colorMode];\n  const defaultDividerColor = {\n    dark: 'gray:70',\n    light: 'gray:30',\n  }[colorMode];\n  const ghostDividerColor = {\n    dark: 'gray:60',\n    light: 'gray:20',\n  }[colorMode];\n\n  const emphasisSelectedColor = {\n    dark: 'red:80',\n    light: 'red:80',\n  }[colorMode];\n  const primarySelectedColor = {\n    dark: 'blue:80',\n    light: 'blue:80',\n  }[colorMode];\n\n  const [activeButton1, setActiveButton1] = React.useState('emphasis-chart-line');\n  const [activeButton2, setActiveButton2] = React.useState('primary-chart-line');\n  const [activeButton3, setActiveButton3] = React.useState('default-chart-line');\n  const [activeButton4, setActiveButton4] = React.useState('secondary-chart-line');\n  const [activeButton5, setActiveButton5] = React.useState('ghost-chart-line');\n  const [activeButton6, setActiveButton6] = React.useState('no-divider-ghost-chart-line');\n\n  const handleClick1 = (button) => (e) => {\n    setActiveButton1(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n  const handleClick2 = (button) => (e) => {\n    setActiveButton2(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n  const handleClick3 = (button) => (e) => {\n    setActiveButton3(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n  const handleClick4 = (button) => (e) => {\n    setActiveButton4(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n  const handleClick5 = (button) => (e) => {\n    setActiveButton5(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n  const handleClick6 = (button) => (e) => {\n    setActiveButton6(button);\n    // Remove focus\n    e.currentTarget.blur();\n  };\n\n  return (\n    <Stack spacing=\"3x\">\n      <ButtonGroup variant=\"emphasis\">\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `emphasis-${key}`;\n            return (\n              <React.Fragment key={key}>\n                <SelectableButton\n                  width=\"8x\"\n                  selectedColor={emphasisSelectedColor}\n                  selected={activeButton1 === activeKey}\n                  onClick={handleClick1(activeKey)}\n                >\n                  <Icon icon={key} />\n                </SelectableButton>\n                <Divider orientation=\"vertical\" color={emphasisDividerColor} />\n              </React.Fragment>\n            );\n          })\n        }\n        <Button width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </ButtonGroup>\n      <ButtonGroup variant=\"primary\">\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `primary-${key}`;\n            return (\n              <React.Fragment key={key}>\n                <SelectableButton\n                  width=\"8x\"\n                  selectedColor={primarySelectedColor}\n                  selected={activeButton2 === activeKey}\n                  onClick={handleClick2(activeKey)}\n                >\n                  <Icon icon={key} />\n                </SelectableButton>\n                <Divider orientation=\"vertical\" color={primaryDividerColor} />\n              </React.Fragment>\n            );\n          })\n        }\n        <Button width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </ButtonGroup>\n      <ButtonGroup>\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `default-${key}`;\n            return (\n              <React.Fragment key={key}>\n                <SelectableButton\n                  width=\"8x\"\n                  selected={activeButton3 === activeKey}\n                  onClick={handleClick3(activeKey)}\n                >\n                  <Icon icon={key} />\n                </SelectableButton>\n                <Divider orientation=\"vertical\" color={defaultDividerColor} />\n              </React.Fragment>\n            );\n          })\n        }\n        <Button width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant=\"secondary\"\n        css={{\n          '> *:not(:first-of-type)': {\n            marginLeft: -1\n          }\n        }}\n      >\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `secondary-${key}`;\n            return (\n              <SelectableButton\n                key={key}\n                width=\"8x\"\n                selected={activeButton4 === activeKey}\n                onClick={handleClick4(activeKey)}\n              >\n                <Icon icon={key} />\n              </SelectableButton>\n            );\n          })\n        }\n        <Button width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant=\"ghost\"\n        css={{\n          '> *:not(:first-of-type)': {\n            marginLeft: -1\n          }\n        }}\n      >\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `ghost-${key}`;\n            return (\n              <React.Fragment key={key}>\n                <SelectableButton\n                  width=\"8x\"\n                  selected={activeButton5 === activeKey}\n                  onClick={handleClick5(activeKey)}\n                >\n                  <Icon icon={key} />\n                </SelectableButton>\n                <Divider orientation=\"vertical\" color={ghostDividerColor} />\n              </React.Fragment>\n            );\n          })\n        }\n        <Button width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </ButtonGroup>\n      <Box>\n        {\n          ['chart-pie', 'chart-line', 'chart-table'].map((key, index) => {\n            const activeKey = `no-divider-ghost-${key}`;\n            return (\n              <React.Fragment key={key}>\n                <SelectableButton\n                  variant=\"ghost\"\n                  width=\"8x\"\n                  selected={activeButton6 === activeKey}\n                  onClick={handleClick6(activeKey)}\n                >\n                  <Icon icon={key} />\n                </SelectableButton>\n              </React.Fragment>\n            );\n          })\n        }\n        <Button variant=\"ghost\" width=\"8x\" disabled><Icon icon=\"chart-bar\" /></Button>\n      </Box>\n    </Stack>\n  );\n}\n\nrender(<SwitchButton />);\n")),(0,i.kt)("h2",null,"Props"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"size"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"'md'"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The size for all buttons in the group. Acceptable values: ",(0,i.kt)("inlineCode",{parentName:"td"},"'sm'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'md'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'lg'"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"variant"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"'default'"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The variant of all buttons in the group. Acceptable values: ",(0,i.kt)("inlineCode",{parentName:"td"},"'emphasis'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'primary'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'default'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'secondary'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'ghost'"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"orientation"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"'horizontal'"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The orientation of the Buttons. Acceptable values: ",(0,i.kt)("inlineCode",{parentName:"td"},"'horizontal'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'vertical'"))))))}u.isMDXComponent=!0},4906:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/buttongroup",function(){return e(38914)}])}},function(n){n.O(0,[9774,2888,179],(function(){return t=4906,n(n.s=t);var t}));var t=n.O();_N_E=t}]);