(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8],{3604:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var a=n(7896),l=n(9740),i=(n(2784),n(876)),o=n(3921),r=["components"],d={};function p(e){var t=e.components,n=(0,l.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"Migration From v0.x to v1"),(0,i.kt)(o.Box,{mb:"4x",mdxType:"Box"},(0,i.kt)(o.Text,{fontSize:"lg",lineHeight:"lg",mdxType:"Text"},"\u26a0\ufe0f This is the Tonic UI migration guide for upgrading from v0.x to v1. You have to consider whether you will do the upgrade if the breaking changes are not acceptable to you at the moment. A proper way for the migration is to make v0.x and v1 coexist for a while, then remove v0.x packages once you have finished the migration.")),(0,i.kt)("h2",null,"Upgrade Steps"),(0,i.kt)("h3",null,"1. Update the dependencies"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Rename the ",(0,i.kt)("inlineCode",{parentName:"li"},"@trendmicro/react-styled-ui")," package to ",(0,i.kt)("inlineCode",{parentName:"li"},"@tonic-ui/react")),(0,i.kt)("li",{parentName:"ul"},"Rename the ",(0,i.kt)("inlineCode",{parentName:"li"},"@trendmicro/styled-ui-theme")," package to ",(0,i.kt)("inlineCode",{parentName:"li"},"@tonic-ui/theme"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'"dependencies": {\n- "@trendmicro/react-styled-ui": "0.x",\n- "@trendmicro/styled-ui-theme": "0.x",\n+ "@tonic-ui/react": "^1.0.0"\n}\n')),(0,i.kt)("p",null,"To make v0.x and v1 coexist, do the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'"dependencies": {\n  "@trendmicro/react-styled-ui": "0.x",\n  "@trendmicro/styled-ui-theme": "0.x",\n+ "@tonic-ui/react": "^1.0.0"\n}\n')),(0,i.kt)("p",null,"You can keep v0.x packages until you are ready to remove them."),(0,i.kt)("h3",null,"2. Update the providers"),(0,i.kt)("p",null,"A ",(0,i.kt)("inlineCode",{parentName:"p"},"TonicProvider")," is provided by the ",(0,i.kt)("inlineCode",{parentName:"p"},"@tonic-ui/react")," package. It includes the following providers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ThemeProvider"),": Provides the theming context for all components."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ColorModeProvider"),": Provides color mode context to all components. ",(0,i.kt)("a",{parentName:"li",href:"../components/color-mode"},"Learn more")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ColorStyleProvider"),": Provides the color style context to all components. ",(0,i.kt)("a",{parentName:"li",href:"../components/color-style"},"Learn more"))),(0,i.kt)("p",null,"Optionally via prop:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"useCSSBaseline"),": To omit the recommended ",(0,i.kt)("inlineCode",{parentName:"li"},"CSSBaseline"),", pass ",(0,i.kt)("inlineCode",{parentName:"li"},"useCSSBaseline={false}"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"+ <TonicProvider\n+   colorMode={{ defaultValue: 'dark' }}\n+   useCSSBaseline={true}\n+ >\n- <ThemeProvider>\n-   <ColorModeProvider value=\"dark\">\n-     <ColorStyleProvider>\n-       <CSSBaseline />\n-       <App />\n+   <App />\n-     </ColorStyleProvider>\n-   </ColorModeProvider>\n- </ThemeProvider>\n+ </TonicProvider>\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"See ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/usage"},"Getting Started")," to learn more about the providers.")),(0,i.kt)("h3",null,"3. Replace deprecated components and Hooks"),(0,i.kt)("h4",null,"FlatButton component"),(0,i.kt)("p",null,"\ud83d\udca3 ",(0,i.kt)("inlineCode",{parentName:"p"},"FlatButton")," is deprecated and will be removed in the next major release. Use ",(0,i.kt)("a",{parentName:"p",href:"../components/button"},"Button")," or ",(0,i.kt)("a",{parentName:"p",href:"../components/buttonbase"},"ButtonBase")," instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'- <FlatButton variant="solid"/>\n+ <Button variant="default"/>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'- <FlatButton variant="outline"/>\n+ <Button variant="secondary"/>\n')),(0,i.kt)("p",null,"For alert or toast notifications, you may use the code below to replace the deprecated ",(0,i.kt)("inlineCode",{parentName:"p"},"FlatButton")," while rendering action buttons on a bright background:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const ActionButton = forwardRef((props, ref) => (\n  <Button\n    ref={ref}\n    variant=\"secondary\"\n    borderColor=\"black:primary\"\n    color=\"black:primary\"\n    css={{\n      '&:active': {\n        color: 'black',\n      },\n      '&:focus': {\n        color: 'black',\n      },\n      '&:hover': {\n        background: 'rgba(0, 0, 0, 0.12)',\n        color: 'black',\n      },\n      '&:hover:not(:focus)': {\n        boxShadow: 'none',\n      },\n    }}\n    {...props}\n  />\n));\n")),(0,i.kt)("h4",null,"PseudoBox component"),(0,i.kt)("p",null,"\ud83d\udca3 ",(0,i.kt)("inlineCode",{parentName:"p"},"PseudoBox")," is deprecated and its props can now be passed to ",(0,i.kt)("inlineCode",{parentName:"p"},"Box")," directly. Use ",(0,i.kt)("a",{parentName:"p",href:"../components/box"},"Box")," instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"- <PseudoBox\n+ <Box\n    _hover={{ fontWeight: 'semibold' }}\n  >\n    Hover Me\n- </PseudoBox>\n+ </Box>\n")),(0,i.kt)("h4",null,"ToggleSwitch component"),(0,i.kt)("p",null,"\ud83d\udca3 ",(0,i.kt)("inlineCode",{parentName:"p"},"ToggleSwitch")," is deprecated and will be removed in the next major release. Use ",(0,i.kt)("a",{parentName:"p",href:"../components/switch"},"Switch")," instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"- <ToggleSwitch />\n+ <Switch />\n")),(0,i.kt)("h4",null,"useDisclosure Hook"),(0,i.kt)("p",null,"\ud83d\udca3 ",(0,i.kt)("inlineCode",{parentName:"p"},"useDisclosure")," is deprecated and will be removed in the next major release. Use ",(0,i.kt)("a",{parentName:"p",href:"../hooks/use-toggle"},"useToggle")," instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const [value, toggleValue] = useToggle(false);\ntoggleValue(); // toggle the value between true and false\ntoggleValue(true); // set the value to true\ntoggleValue(false); // set the value to false\n")),(0,i.kt)("h4",null,"withTheme HoC"),(0,i.kt)("p",null,"\ud83d\udca3 ",(0,i.kt)("inlineCode",{parentName:"p"},"withTheme")," is deprecated and will be removed in the next major release. Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"useTheme")," Hook instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const theme = useTheme();\n")),(0,i.kt)("h3",null,"4. Examine breaking changes"),(0,i.kt)("p",null,"The following components changed the ",(0,i.kt)("inlineCode",{parentName:"p"},"display")," property internally. Check whether you have to do corresponding layout change."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Component"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Previous"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Current"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Note"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Button")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Menu")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"SVGIcon")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"},"It might affect the layout according to your usage")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Space")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"},"It might affect the layout according to your usage")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Stack")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"},"It might affect the layout according to your usage")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Tag")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-flex")),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Text")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline-block")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"block")),(0,i.kt)("td",{parentName:"tr",align:"left"},"It might affect the layout according to your usage",(0,i.kt)("br",null),"- To make inline text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<Text display="inline" />'),(0,i.kt)("br",null),"- To make inline block text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<Text display="inline-block" />'),(0,i.kt)("br",null),"- To make inline flex text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<Text display="inline-flex" />'),(0,i.kt)("br",null),"- Use ",(0,i.kt)("inlineCode",{parentName:"td"},'<Flex direction="row" />')," or ",(0,i.kt)("inlineCode",{parentName:"td"},'<Flex direction="column" />')," if you need to render multiple components in the same row or column.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"TextLabel")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"inline")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"block")),(0,i.kt)("td",{parentName:"tr",align:"left"},"It might affect the layout according to your usage",(0,i.kt)("br",null),"- To make inline text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<TextLabel display="inline" />'),(0,i.kt)("br",null),"- To make inline block text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<TextLabel display="inline-block" />'),(0,i.kt)("br",null),"- To make inline flex text, use ",(0,i.kt)("inlineCode",{parentName:"td"},'<TextLabel display="inline-flex" />'),(0,i.kt)("br",null),"- Use ",(0,i.kt)("inlineCode",{parentName:"td"},'<Flex direction="row" />')," or ",(0,i.kt)("inlineCode",{parentName:"td"},'<Flex direction="column" />')," if you need to render multiple components in the same row or column.")))),(0,i.kt)("h2",null,"System Updates"),(0,i.kt)("h3",null,"Theme"),(0,i.kt)("p",null,"Removed dark and light shadows from the ",(0,i.kt)("inlineCode",{parentName:"p"},"theme.shadows")," object in favor of ",(0,i.kt)("inlineCode",{parentName:"p"},"colorStyle.shadow"),". See ",(0,i.kt)("a",{parentName:"p",href:"../theme/shadows"},"shadows")," to learn more."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"{\n  shadows: {\n    none: 'none',\n-   dark: {\n-     sm: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',\n-     md: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',\n-     lg: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',\n-   },\n-   light: {\n-     sm: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',\n-     md: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',\n-     lg: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',\n-   },\n  },\n}\n")),(0,i.kt)("p",null,"You can use ",(0,i.kt)("inlineCode",{parentName:"p"},"useColorStyle")," Hook to get the shadow value:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const [colorMode] = useColorMode();\nconst [colorStyle] = useColorStyle({ colorMode });\n\nconsole.log(colorStyle.shadow.thin);\nconsole.log(colorStyle.shadow.medium);\nconsole.log(colorStyle.shadow.thick);\n")),(0,i.kt)("h3",null,"Color Style"),(0,i.kt)("p",null,"Moved ",(0,i.kt)("inlineCode",{parentName:"p"},"selected")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"marked")," tokens from ",(0,i.kt)("inlineCode",{parentName:"p"},"background")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"text"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"{ // Dark mode\n  background: {\n    primary: 'gray:100',\n    secondary: 'gray:90',\n    tertiary: 'gray:80',\n    inverse: 'gray:10',\n-   selected: 'blue:60', // replaced with text.selection in the v1 release\n-   marked: '#fce79e', // replaced with text.highlight in the v1 release\n  },\n+ color: {\n+   emphasis: 'white:emphasis',\n+   primary: 'white:primary',\n+   secondary: 'white:secondary',\n+   tertiary: 'white:tertiary',\n+   disabled: 'white:disabled',\n+   success: 'green:40',\n+   info: 'blue:40',\n+   warning: 'orange:50',\n+   error: 'red:50',\n+ },\n  text: {\n-   emphasis: 'white:emphasis',\n-   primary: 'white:primary',\n-   secondary: 'white:secondary',\n-   tertiary: 'white:tertiary',\n-   disabled: 'white:disabled',\n-   link: 'blue:40',\n-   warning: 'orange:50',\n-   error: 'red:50',\n    selection: 'blue:60',\n    highlight: '#fce79e',\n  },\n}\n")),(0,i.kt)("h3",null,"useColorMode Hook"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"useColorMode")," Hook now returns ",(0,i.kt)("inlineCode",{parentName:"p"},"[colorMode, setColorMode]")," not the object ",(0,i.kt)("inlineCode",{parentName:"p"},"{ colorMode, setColorMode, toggleColorMode }")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"- const { colorMode, setColorMode, toggleColorMode } = useColorMode();\n+ const [colorMode, setColorMode] = useColorMode();\n")),(0,i.kt)("h2",null,"Component Updates"),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Accordion")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Removed ",(0,i.kt)("inlineCode",{parentName:"li"},"allowMultiple")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"allowToggle")," props in favor of controling state from the parent"),(0,i.kt)("li",{parentName:"ul"},"Removed ",(0,i.kt)("inlineCode",{parentName:"li"},"index")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"defaultIndex")," props"),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange")," prop. Use ",(0,i.kt)("inlineCode",{parentName:"li"},"onToggle")," on ",(0,i.kt)("inlineCode",{parentName:"li"},"AccordionItem")," instead"),(0,i.kt)("li",{parentName:"ul"},"Added ",(0,i.kt)("inlineCode",{parentName:"li"},"AccordionToggle"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"AccordionToggleIcon"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"AccordionCollapse")," components for unstyled toggle and collapse")),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"AccordionItem")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isOpen")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isExpanded")),(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"defaultIsOpen")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"defaultIsExpanded")),(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"onToggle")),(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isDisabled")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"disabled"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Alert")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isCloseButtonVisible")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isClosable"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Badge")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"dotSize")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"width")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"w")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"height")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"h")),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isHidden")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isInvisible")),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"offset")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"right")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"top")),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"variantColor")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"backgroundColor")),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="badge"')," to ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="solid"'))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"CheckboxGroup")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Changed ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange(value, event)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange(value)"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Drawer")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isCloseButtonVisible")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isClosable")),(0,i.kt)("li",{parentName:"ul"},"Added ",(0,i.kt)("inlineCode",{parentName:"li"},"scrollBehavior")," prop to control the scroll behavior of the drawer"),(0,i.kt)("li",{parentName:"ul"},"Added support for passing style props to ",(0,i.kt)("inlineCode",{parentName:"li"},"Drawer"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Modal")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isCloseButtonVisible")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isClosable")),(0,i.kt)("li",{parentName:"ul"},"Added ",(0,i.kt)("inlineCode",{parentName:"li"},"scrollBehavior")," prop to control the scroll behavior of the modal"),(0,i.kt)("li",{parentName:"ul"},"Added support for passing style props to ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Popover")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"shouldWrapChildren")," prop. Use Function as Child Component (FaCC) to render the tooltip trigger instead.")),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"RadioGroup")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Changed ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange(value, event)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"onChange(value)"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Scrollbar")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"disabled")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},'overflow="hidden"')),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"minThumbSize")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"minThumbWidth")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"minThumbHeight")),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"visibility")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"overflow")),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"renderView")," prop. Use Function as Child Component (FaCC) to render the scroll view instead."),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"renderHorizontalTrack")," prop. Use Function as Child Component (FaCC) to render the horizontal track instead."),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"renderHorizontalThumb")," prop. Use Function as Child Component (FaCC) to render the horizontal thumb instead."),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"renderVerticalTrack")," prop. Use Function as Child Component (FaCC) to render the vertical track instead."),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"renderVerticalThumb")," prop. Use Function as Child Component (FaCC) to render the vertical thumb instead."),(0,i.kt)("li",{parentName:"ul"},"Changed the ",(0,i.kt)("inlineCode",{parentName:"li"},"thumbSize")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"minThumbWidth")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"minThumbHeight"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Spinner")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"color")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"lineColor")),(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"strokeWidth")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"lineWidth")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"trackWidth")),(0,i.kt)("li",{parentName:"ul"},"Remove the ",(0,i.kt)("inlineCode",{parentName:"li"},"speed")," prop")),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Stack")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Removed the use of ",(0,i.kt)("inlineCode",{parentName:"li"},"cloneElement")," in favor of the ",(0,i.kt)("inlineCode",{parentName:"li"},"gap"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"columnGap"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"rowGap")," props")),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Tab")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isActive")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isSelected"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Tabs")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Removed ",(0,i.kt)("inlineCode",{parentName:"li"},"activateOnKeyPress"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"isFitted"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"isManual")," props"),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="line"')," to ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="default"')),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="enclosed"')," to ",(0,i.kt)("inlineCode",{parentName:"li"},'variant="filled"'))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"TabPanel")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isActive")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isSelected"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Table")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isHoverable")," prop. Use the ",(0,i.kt)("inlineCode",{parentName:"li"},"_hover")," prop on the ",(0,i.kt)("inlineCode",{parentName:"li"},"TableRow")," component instead.")),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Tag")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isCloseButtonVisible")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isClosable"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Toast")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"isCloseButtonVisible")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"isClosable"))),(0,i.kt)("h3",null,(0,i.kt)("inlineCode",{parentName:"h3"},"Tooltip")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"showDelay")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"enterDelay")),(0,i.kt)("li",{parentName:"ul"},"Renamed the ",(0,i.kt)("inlineCode",{parentName:"li"},"hideDelay")," prop to ",(0,i.kt)("inlineCode",{parentName:"li"},"leaveDelay")),(0,i.kt)("li",{parentName:"ul"},"Removed the ",(0,i.kt)("inlineCode",{parentName:"li"},"shouldWrapChildren")," prop. Use Function as Child Component (FaCC) to render the tooltip trigger instead.")),(0,i.kt)("h2",null,"Transition Updates"),(0,i.kt)("p",null,"The following components now have built-in transitions. Remember to remove all transitions from the following components:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Component"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Composed Transition"),(0,i.kt)("th",{parentName:"tr",align:"left"},"The ",(0,i.kt)("inlineCode",{parentName:"th"},"appear")," Prop"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"AccordionCollapse")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Collapse")),(0,i.kt)("td",{parentName:"tr",align:"left"},"false")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"AccordionToggleIcon")),(0,i.kt)("td",{parentName:"tr",align:"left"},"built-in"),(0,i.kt)("td",{parentName:"tr",align:"left"},"false")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DrawerContent")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Slide")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DrawerOverlay")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Fade")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"MenuList")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Collapse")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"MenuToggleIcon")),(0,i.kt)("td",{parentName:"tr",align:"left"},"built-in"),(0,i.kt)("td",{parentName:"tr",align:"left"},"false")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ModalContent")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Fade")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ModalOverlay")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Fade")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"PopoverContent")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Grow")),(0,i.kt)("td",{parentName:"tr",align:"left"},"true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ToastTransition")),(0,i.kt)("td",{parentName:"tr",align:"left"},"built-in"),(0,i.kt)("td",{parentName:"tr",align:"left"},"false")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Tooltip")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Grow")),(0,i.kt)("td",{parentName:"tr",align:"left"},"false")))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions"},"Transitions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/collapse"},"Collapse")," - internally used in ",(0,i.kt)("inlineCode",{parentName:"li"},"Accordion")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Menu")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/fade"},"Fade")," - internally used in ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/grow"},"Grow")," - internally used in ",(0,i.kt)("inlineCode",{parentName:"li"},"Popover")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Tooltip")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/scale"},"Scale")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/slide"},"Slide")," - internally used in ",(0,i.kt)("inlineCode",{parentName:"li"},"Drawer")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../components/transitions/zoom"},"Zoom"))),(0,i.kt)("h3",null,"Drawer"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Drawer")," component now has built-in transitions. Follow the diff below to remove transitions if present."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'- <Slide\n-  in={isOpen}\n-  duration={250}\n-  from={placement}\n-  finalHeight="100vh"\n- >\n-   {styles => (\n      <Drawer\n        isClosable\n        isOpen={isOpen}\n      >\n-       <DrawerOverlay opacity={styles.opacity} />\n+       <DrawerOverlay />\n-       <DrawerContent {...styles}>\n+       <DrawerContent>\n          <DrawerBody>\n            Drawer body\n          </DrawerBody>\n        </DrawerContent>\n      </Drawer>\n-   )}\n- </Slide>\n')),(0,i.kt)("h3",null,"Modal"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Modal")," component now has built-in transitions. Follow the diff below to remove transitions if present."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"- <Scale\n-   in={isOpen}\n-   duration={150}\n- >\n-   {styles => (\n      <Modal\n        isClosable\n        isOpen={isOpen}\n      >\n-       <ModalOverlay opacity={styles.opacity} />\n+       <ModalOverlay />\n-       <ModalContent {...styles}>\n+       <ModalContent>\n          <ModalBody>\n            Modal body\n          <ModalBody>\n        </ModalContent>\n      </Modal>\n-   )}\n- </Scale>\n")))}p.isMDXComponent=!0},8749:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started/migration-v0x",function(){return n(3604)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=8749,e(e.s=t);var t}));var t=e.O();_N_E=t}]);