(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5690],{29841:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var a=n(7896),r=n(59740),o=(n(2784),n(30876)),l=["components"],p={};function i(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",null,"Stack"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Stack")," is a layout utility component that makes it easy to stack items together and apply a space between them."),(0,o.kt)("h2",null,"Import"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Stack } from '@tonic-ui/react';\n")),(0,o.kt)("h2",null,"Usage"),(0,o.kt)("p",null,"Try resizing the browser window width as small as possible to see how ",(0,o.kt)("inlineCode",{parentName:"p"},"Stack")," adapts to the available space."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const Item = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const boxShadow = colorStyle.shadow.thin;\n  const borderColor = colorMode === \'dark\' ? \'gray:70\' : \'gray:20\';\n  return (\n    <Box\n      boxShadow={boxShadow}\n      border={1}\n      borderColor={borderColor}\n      p="2x"\n      {...props}\n    />\n  );\n};\n\nconst FormGroup = (props) => (\n  <Box mb="4x" {...props} />\n);\n\nconst Note = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  return (\n    <Text color={colorStyle.color.tertiary} {...props} />\n  );\n};\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nfunction Example() {\n  const [direction, changeDirectionBy] = useSelection(\'column\');\n  const [flexWrap, changeFlexWrapBy] = useSelection(\'nowrap\');\n  const [gap, toggleGap] = useToggle(false);\n  const [shouldWrapChildren, toggleShouldWrapChildren] = useToggle(false);\n\n  return (\n    <>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            direction\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'column\', \'column-reverse\', \'row\', \'row-reverse\'].map(value => (\n            <SelectButton\n              key={value}\n              isSelected={value === direction}\n              onClick={changeDirectionBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </SelectButton>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb="2x">\n          <TextLabel>\n            flexWrap\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant="secondary"\n          css={{\n            \'> *:not(:first-of-type)\': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[\'nowrap\', \'wrap\', \'wrap-reverse\'].map(value => (\n            <SelectButton\n              key={value}\n              isSelected={value === flexWrap}\n              onClick={changeFlexWrapBy(value)}\n              minWidth="15x"\n            >\n              {value}\n            </SelectButton>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel>\n          <Flex alignItems="center">\n            <Checkbox\n              checked={gap}\n              onChange={() => toggleGap()}\n            />\n            <Space width="2x" />\n            <Text fontFamily="mono" whiteSpace="nowrap">\n              gap="4x"\n            </Text>\n          </Flex>\n        </TextLabel>\n        <Note pl="6x" pt="1x">\n          Set \'direction="row"\' and \'flexWrap="wrap"\' to see the gap between rows.\n        </Note>\n      </FormGroup>\n      <FormGroup>\n        <TextLabel display="flex" alignItems="center">\n          <Checkbox\n            checked={shouldWrapChildren}\n            onChange={() => toggleShouldWrapChildren()}\n          />\n          <Space width="2x" />\n          <Text fontFamily="mono" whiteSpace="nowrap">\n            shouldWrapChildren\n          </Text>\n        </TextLabel>\n      </FormGroup>\n      <Divider mb="4x" />\n      <Stack\n        direction={direction}\n        flexWrap={flexWrap}\n        shouldWrapChildren={shouldWrapChildren}\n        gap={gap ? \'4x\' : undefined}\n        spacing="4x"\n      >\n        <Item>Stacked Item 1</Item>\n        <Item>Stacked Item 2</Item>\n        <Item>Stacked Item 3</Item>\n        <Item>Stacked Item 4</Item>\n        <Item>Stacked Item 5</Item>\n        <Item>Stacked Item 6</Item>\n      </Stack>\n    </>\n  );\n}\n\nrender(<Example />);\n')),(0,o.kt)("h2",null,"Props"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"direction"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"},"'column'"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The shorthand of ",(0,o.kt)("inlineCode",{parentName:"td"},"flexDirection"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"flexDirection"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"},"'column'"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The direction to stack the items. One of: 'column', 'column-reverse', 'row', 'row-reverse'")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"flexWrap"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Whether to wrap the items. One of: 'nowrap' (default), 'wrap', 'wrap-reverse'")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"gap"),(0,o.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"Set the gap between rows and columns. It is useful when ",(0,o.kt)("inlineCode",{parentName:"td"},"flexWrap")," is set to 'wrap' or 'wrap-reverse'.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"shouldWrapChildren"),(0,o.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"left"},"false"),(0,o.kt)("td",{parentName:"tr",align:"left"},"If ",(0,o.kt)("inlineCode",{parentName:"td"},"true"),", each child will be wrapped in a ",(0,o.kt)("inlineCode",{parentName:"td"},"Box")," with ",(0,o.kt)("inlineCode",{parentName:"td"},"display: inline-flex"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"spacing"),(0,o.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,o.kt)("td",{parentName:"tr",align:"left"},"0"),(0,o.kt)("td",{parentName:"tr",align:"left"},"The space between items based on the direction.")))))}i.isMDXComponent=!0},77632:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/stack",function(){return n(29841)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=77632,e(e.s=t);var t}));var t=e.O();_N_E=t}]);