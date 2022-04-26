(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7989],{48777:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var a=t(7896),l=t(59740),o=(t(2784),t(30876)),i=["components"],r={};function s(e){var n=e.components,t=(0,l.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},r,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",null,"Text"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Text")," is used for rendering text and paragraphs."),(0,o.kt)("h2",null,"Import"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Text } from '@tonic-ui/react';\n")),(0,o.kt)("h2",null,"Usage"),(0,o.kt)("h3",null,"Sizes"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"size")," prop to change the corresponding font size and line height. You can set the value to ",(0,o.kt)("inlineCode",{parentName:"p"},"4xl"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"3xl"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"2xl"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"xl"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"lg"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"md"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"sm"),", or ",(0,o.kt)("inlineCode",{parentName:"p"},"xs"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <Text size="4xl">\n    Four Extra Large (4XL)\n  </Text>\n  <Text size="3xl">\n    Three Extra Large (3XL)\n  </Text>\n  <Text size="2xl">\n    Two Extra Large (2XL)\n  </Text>\n  <Text size="xl">\n    Extra Large (XL)\n  </Text>\n  <Text size="lg">\n    Large (LG)\n  </Text>\n  <Text size="md">\n    Medium (MD)\n  </Text>\n  <Text size="sm">\n    Small (SM)\n  </Text>\n  <Text size="xs">\n    Extra Small (XS)\n  </Text>\n</Stack>\n')),(0,o.kt)("h3",null,"Heading text"),(0,o.kt)("p",null,"You can format the ",(0,o.kt)("inlineCode",{parentName:"p"},"Text")," component by passing ",(0,o.kt)("inlineCode",{parentName:"p"},"size")," prop and ",(0,o.kt)("inlineCode",{parentName:"p"},"fontWeight")," to display a formatted Heading."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="column" spacing="4x">\n  <Text size="sm" fontWeight="semibold">Heading 1</Text>\n  <Text size="md" fontWeight="semibold">Heading 2</Text>\n  <Text size="lg" fontWeight="semibold">Heading 3</Text>\n  <Text size="xl" fontWeight="semibold">Heading 4</Text>\n  <Text size="2xl" fontWeight="semibold">Heading 5</Text>\n  <Text size="3xl" fontWeight="semibold">Heading 6</Text>\n  <Text size="4xl" fontWeight="semibold">Heading 7</Text>\n</Stack>\n')),(0,o.kt)("h3",null,"Formatting text"),(0,o.kt)("p",null,"You can format the ",(0,o.kt)("inlineCode",{parentName:"p"},"Text")," component by passing ",(0,o.kt)("inlineCode",{parentName:"p"},"fontSize"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"lineHeight"),", or other style props."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [colorMode] = useColorMode();\n  const bg = colorMode === \'dark\' ? \'gray:80\' : \'gray:20\';\n\n  return (\n    <Stack direction="column" spacing="4x">\n      <Text bg={bg} lineHeight="1" px="2x">\n        This is exactly the same height as the font size\n      </Text>\n      <Text bg={bg} lineHeight="normal" px="2x">\n        A normal line height is about 20% larger than the font size\n      </Text>\n      <Text bg={bg} lineHeight="base" px="2x">\n        For accessibility concerns, use a minimum value of 1.5 for <code>line-height</code> for main paragraph content\n      </Text>\n    </Stack>\n  );\n}\n')),(0,o.kt)("h3",null,"Text truncation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'<Text\n  overflow="hidden"\n  textOverflow="ellipsis"\n  whiteSpace="nowrap"\n>\n  Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n</Text>\n')),(0,o.kt)("h3",null,"The ",(0,o.kt)("inlineCode",{parentName:"h3"},"as")," prop"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const TextBlock = (props) => {\n  const [colorMode] = useColorMode();\n  const borderColor = colorMode === \'dark\' ? \'gray:70\' : \'gray:20\';\n\n  return (\n    <Box px="3x" py="2x" border={1} borderColor={borderColor}>\n      <Text {...props} />\n    </Box>\n  );\n};\n\nfunction Example() {\n  return (\n    <Stack direction="column" spacing="4x" shouldWrapChildren>\n      <TextBlock as="i">Italic</TextBlock>\n      <TextBlock as="u">Underline</TextBlock>\n      <TextBlock as="abbr">Abbreviation or acronym</TextBlock>\n      <TextBlock as="cite">Citation</TextBlock>\n      <TextBlock as="del">Deleted</TextBlock>\n      <TextBlock as="em">Emphasis</TextBlock>\n      <TextBlock as="ins">Inserted</TextBlock>\n      <TextBlock as="kbd">Ctrl + C</TextBlock>\n      <TextBlock as="mark">Highlighted</TextBlock>\n      <TextBlock as="s">Strikethrough</TextBlock>\n      <TextBlock as="samp">Sample</TextBlock>\n      <TextBlock as="sup">Superscript</TextBlock>\n      <TextBlock as="sub">Subscript</TextBlock>\n    </Stack>\n  );\n}\n\nrender(<Example />);\n')),(0,o.kt)("h2",null,"Props"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"size"),(0,o.kt)("td",{parentName:"tr",align:"left"},"string"),(0,o.kt)("td",{parentName:"tr",align:"left"}),(0,o.kt)("td",{parentName:"tr",align:"left"},"One of: '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'")))))}s.isMDXComponent=!0},11314:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/text",function(){return t(48777)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=11314,e(e.s=n);var n}));var n=e.O();_N_E=n}]);