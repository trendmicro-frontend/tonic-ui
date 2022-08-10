(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2689],{41699:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(7896),l=n(59740),a=(n(2784),n(30876)),o=["components"],i={};function c(e){var t=e.components,n=(0,l.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",null,"Scrollbar"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Scrollbar")," component provides a consistent look and feel for scrollbars across multiple platforms and browsers."),(0,a.kt)("h2",null,"Import"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Scrollbar,\n} from '@trendmicro/react-styled-ui';\n")),(0,a.kt)("h2",null,"Usage"),(0,a.kt)("p",null,"The scrollbar is hidden by default. You can mouse over the scrollable content to show the scrollbar."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Scrollbar\n  height={200}\n  border={1}\n  borderColor="#424242"\n>\n  <Lorem count={10} px="4x" py="3x" />\n</Scrollbar>\n')),(0,a.kt)("h3",null,"Scroll direction"),(0,a.kt)("p",null,"The examples below illustrate the different scroll directions. You can try to resize the scrollable content to see how the scrollbar changes."),(0,a.kt)("h4",null,"Vertical scrolling"),(0,a.kt)("p",null,"To enable vertical scrolling, set the scrollbar height to a value less than the scrollable content height."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Scrollbar\n  width="50%"\n  height={200}\n  minHeight={100}\n  maxHeight={300}\n  border={1}\n  borderColor="#424242"\n  overflow="scroll"\n  resize="vertical"\n>\n  <Lorem count={10} px="4x" py="3x" />\n</Scrollbar>\n')),(0,a.kt)("h3",null,"Horizontal scrolling"),(0,a.kt)("p",null,"To enable horizontal scrolling, set the scrollbar width to a value less than the scrollable content width."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Scrollbar\n  width="50%"\n  height="auto"\n  minWidth="10%"\n  maxWidth="100%"\n  border={1}\n  borderColor="#424242"\n  overflow="scroll"\n  resize="horizontal"\n>\n  <Lorem count={6} px="4x" py="3x" whiteSpace="nowrap" />\n</Scrollbar>\n')),(0,a.kt)("h3",null,"Bidirectional scrolling"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Scrollbar\n  width="50%"\n  height={200}\n  border={1}\n  borderColor="#424242"\n  overflow="scroll"\n  resize="both"\n>\n  <Lorem count={10} px="4x" py="3x" whiteSpace="nowrap" />\n</Scrollbar>\n')),(0,a.kt)("h3",null,"Overflow control"),(0,a.kt)("p",null,"Use the ",(0,a.kt)("inlineCode",{parentName:"p"},"overflow")," prop to set the overflow of the content. You can set the value to ",(0,a.kt)("inlineCode",{parentName:"p"},"auto"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"scroll"),", or ",(0,a.kt)("inlineCode",{parentName:"p"},"hidden"),"."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"auto"),": The scrollbar will be shown if the content overflows and mouse is hovering over the content."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"scroll"),": The scrollbar is always visible if the content overflows."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"hidden"),": The scrollbar is never shown.")),(0,a.kt)("p",null,"Note: ",(0,a.kt)("inlineCode",{parentName:"p"},"overflowX")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"overflowY")," are also available if you need to set the overflow on both X and Y axis."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="row" spacing="4x">\n  <Box flex="1">\n    <Text size="xl" marginBottom="2x">\n      overflow="auto"\n    </Text>\n    <Scrollbar\n      height={200}\n      border={1}\n      borderColor="#424242"\n      overflow="auto"\n    >\n      <Lorem count={10} px="4x" py="3x" whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n  <Box flex="1">\n    <Text size="xl" marginBottom="2x">\n      overflow="scroll"\n    </Text>\n    <Scrollbar\n      height={200}\n      border={1}\n      borderColor="#424242"\n      overflow="scroll"\n    >\n      <Lorem count={10} px="4x" py="3x" whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n  <Box flex="1">\n    <Text size="xl" marginBottom="2x">\n      overflow="hidden"\n    </Text>\n    <Scrollbar\n      height={200}\n      border={1}\n      borderColor="#424242"\n      overflow="hidden"\n    >\n      <Lorem count={10} px="4x" py="3x" whiteSpace="nowrap" />\n    </Scrollbar>\n  </Box>\n</Stack>\n')),(0,a.kt)("h3",null,"Scrollbar thumb"),(0,a.kt)("p",null,"Use the ",(0,a.kt)("inlineCode",{parentName:"p"},"minThumbWidth")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"minThumbHeight")," props to set the minimum size of the thumb (in pixels)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack direction="row" spacing="4x">\n  <Box flex="1">\n    <Text size="xl" marginBottom="2x">\n      minThumbHeight=50\n    </Text>\n    <Scrollbar\n      height={200}\n      border={1}\n      borderColor="#424242"\n      minThumbHeight={50}\n      overflow="scroll"\n    >\n      <Lorem count={10} px="4x" py="3x" />\n    </Scrollbar>\n  </Box>\n  <Box flex="1">\n    <Text size="xl" marginBottom="2x">\n      minThumbHeight=100\n    </Text>\n    <Scrollbar\n      height={200}\n      border={1}\n      borderColor="#424242"\n      minThumbHeight={100}\n      overflow="scroll"\n    >\n      <Lorem count={10} px="4x" py="3x" />\n    </Scrollbar>\n  </Box>\n</Stack>\n')),(0,a.kt)("h3",null,"Scroll indicator"),(0,a.kt)("p",null,"The scroll indicator can visually indicate the current scroll position of the scrollable element, so that the user knows whether it can be scrolled further."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const ShadowScrollbar = (props) => {\n  const topIndicatorRef = React.useRef(null);\n  const bottomIndicatorRef = React.useRef(null);\n  const handleUpdate = ({ values }) => {\n    const { scrollTop, scrollHeight, clientHeight } = values;\n    const topIndicatorOpacity = 1 / 20 * Math.min(scrollTop, 20);\n    const bottomScrollTop = scrollHeight - clientHeight;\n    const bottomIndicatorOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));\n    topIndicatorRef.current.style.opacity = topIndicatorOpacity;\n    bottomIndicatorRef.current.style.opacity = bottomIndicatorOpacity;\n  };\n\n  return (\n    <Box position="relative">\n      <Scrollbar\n        onUpdate={handleUpdate}\n        {...props}\n      />\n      <Box\n        ref={topIndicatorRef}\n        position="absolute"\n        top="0"\n        left="0"\n        right="0"\n        height="24px"\n        background="linear-gradient(to bottom, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)"\n      />\n      <Box\n        ref={bottomIndicatorRef}\n        position="absolute"\n        bottom="0"\n        left="0"\n        right="0"\n        height="24px"\n        background="linear-gradient(to top, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)"\n      />\n    </Box>\n  );\n}\n\nrender(\n  <ShadowScrollbar\n    height={300}\n    border={1}\n    borderColor="#424242"\n  >\n    <Lorem count={10} px="4x" py="3x" />\n  </ShadowScrollbar>\n);\n')),(0,a.kt)("h3",null,"Scrollable menu"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Menu width="160px">\n  <MenuButton width="100%">Select an option</MenuButton>\n  <MenuList width="100%" height={200}>\n    <Scrollbar>\n      <MenuItem>List item 1</MenuItem>\n      <MenuItem>List item 2</MenuItem>\n      <MenuItem>List item 3</MenuItem>\n      <MenuItem>List item 4</MenuItem>\n      <MenuItem>List item 5</MenuItem>\n      <MenuItem>List item 6</MenuItem>\n      <MenuItem>List item 7</MenuItem>\n      <MenuItem>List item 8</MenuItem>\n      <MenuItem>List item 9</MenuItem>\n      <MenuItem>List item 10</MenuItem>\n      <MenuItem>List item 11</MenuItem>\n      <MenuItem>List item 12</MenuItem>\n    </Scrollbar>\n  </MenuList>\n</Menu>\n')),(0,a.kt)("h3",null,"Scrollable table"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},"const CustomScrollbar = ({\n  children,\n  ...rest\n}) => {\n  const [colorMode] = useColorMode();\n  const backgroundColor = {\n    dark: 'gray:70',\n    light: 'gray:30',\n  }[colorMode];\n\n  return (\n    <Scrollbar\n      {...rest}\n    >\n      {({\n        ScrollView,\n        HorizontalTrack,\n        VerticalTrack,\n        HorizontalThumb,\n        VerticalThumb,\n        getScrollViewProps,\n        getHorizontalTrackProps,\n        getVerticalTrackProps,\n        getHorizontalThumbProps,\n        getVerticalThumbProps,\n      }) => (\n        <>\n          <ScrollView {...getScrollViewProps()}>\n            {children}\n          </ScrollView>\n          <HorizontalTrack\n            {...getHorizontalTrackProps()}\n            backgroundColor={backgroundColor}\n          >\n            <HorizontalThumb {...getHorizontalThumbProps()} />\n          </HorizontalTrack>\n          <VerticalTrack\n            {...getVerticalTrackProps()}\n            backgroundColor={backgroundColor}\n          >\n            <VerticalThumb {...getVerticalThumbProps()} />\n          </VerticalTrack>\n        </>\n      )}\n    </Scrollbar>\n  );\n};\n\nfunction ScrollableTable() {\n  const tableHeaderRef = React.createRef();\n  const [isHorizontalScrollbarVisible, setHorizontalScrollbarVisible] = React.useState(false);\n  const [isVerticalScrollbarVisible, setVerticalScrollbarVisible] = React.useState(false);\n\n  const columns = React.useMemo(() => [\n    {\n      Header: 'Event Type',\n      accessor: 'eventType',\n    },\n    {\n      Header: 'Affected Devices',\n      accessor: 'affectedDevices',\n      customProps: {\n        textAlign: 'right',\n      },\n    },\n    {\n      Header: 'Detections',\n      accessor: 'detections',\n      customProps: {\n        textAlign: 'right',\n      },\n    },\n  ], []);\n\n  const data = React.useMemo(() => [\n    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },\n    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },\n    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },\n    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },\n    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },\n    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }\n  ], []);\n\n  const onScroll = (e) => {\n    const scrollLeft = e.target.scrollLeft;\n    if (tableHeaderRef.current && tableHeaderRef.current.scrollLeft !== scrollLeft) {\n      tableHeaderRef.current.scrollLeft = scrollLeft;\n    }\n  };\n\n  const onUpdate = (props) => {\n    const { scrollWidth, clientWidth, scrollHeight, clientHeight } = props;\n    const _isHorizontalScrollbarVisible = (scrollWidth > clientWidth);\n    const _isVerticalScrollbarVisible = (scrollHeight > clientHeight);\n\n    if (_isHorizontalScrollbarVisible !== isHorizontalScrollbarVisible) {\n      setHorizontalScrollbarVisible(_isHorizontalScrollbarVisible);\n    }\n\n    if (_isVerticalScrollbarVisible !== isVerticalScrollbarVisible) {\n      setVerticalScrollbarVisible(_isVerticalScrollbarVisible);\n    }\n  };\n\n  const {\n    getTableProps,\n    getTableBodyProps,\n    headerGroups,\n    rows,\n    prepareRow\n  } = useTable(\n    {\n      columns,\n      data,\n    },\n    useBlockLayout,\n  );\n  \n  return (\n    <Table\n      variant=\"outline\"\n      width={400}\n      height={200}\n      {...getTableProps()}\n    >\n      <TableHeader ref={tableHeaderRef}>\n        {headerGroups.map(headerGroup => {\n          const { style, ...props } = headerGroup.getHeaderGroupProps();\n          let headerWidth = style.width;\n          if (isVerticalScrollbarVisible) {\n            headerWidth = `calc(${style.width} + 8px)`; // 8px is scrollbar width\n          }\n          return (\n            <TableHeaderRow style={{...style, width: headerWidth}} {...props}>\n              {headerGroup.headers.map((column, index) => (\n                <TableHeaderCell\n                  key={column.accessor}\n                  {...column.getHeaderProps()}\n                  {...column.customProps}\n                  {...(isVerticalScrollbarVisible && index === headerGroup.headers.length - 1) && {\n                    borderRight: 0,\n                  }}\n                >\n                  {column.render('Header')}\n                </TableHeaderCell>\n              ))}\n              {isVerticalScrollbarVisible && (\n                <TableHeaderCell width=\"2x\" padding={0} borderLeft={0} />\n              )}\n            </TableHeaderRow>\n          );\n        })}\n      </TableHeader>\n      <CustomScrollbar\n        onScroll={onScroll}\n        onUpdate={onUpdate}\n      >\n        <TableBody {...getTableBodyProps()}>\n          {rows.map((row, index) => {\n            prepareRow(row);\n            return (\n              <TableRow\n                {...row.getRowProps()}\n                key={index}\n                _hover={{\n                  bg: 'rgba(255, 255, 255, 0.12)'\n                }}\n              >\n                {row.cells.map(cell => {\n                  return (\n                    <TableCell\n                      key={cell.id}\n                      {...cell.getCellProps()}\n                      {...cell.column.customProps}\n                    >\n                      {cell.render('Cell')}\n                    </TableCell>\n                  );\n                })}\n              </TableRow>\n            );\n          })}\n        </TableBody>\n      </CustomScrollbar>\n    </Table>\n  );\n}\n\nrender(<ScrollableTable />);\n")),(0,a.kt)("h2",null,"Props"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"children"),(0,a.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," function"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The content of the scrollbar.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"width"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"},"'100%'"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The width of the scrollbar. If set to 'auto', you can constrain the width using the ",(0,a.kt)("inlineCode",{parentName:"td"},"minWidth")," and ",(0,a.kt)("inlineCode",{parentName:"td"},"maxWidth")," props.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"height"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"},"'100%'"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The height of the scrollbar. If set to 'auto', you can constrain the height using the ",(0,a.kt)("inlineCode",{parentName:"td"},"minHeight")," and ",(0,a.kt)("inlineCode",{parentName:"td"},"maxHeight")," props.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"minWidth"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The minimum width of the scrollbar.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"maxWidth"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The maximum width of the scrollbar.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"minHeight"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The minimum height of the scrollbar.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"maxHeight"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The maximum height of the scrollbar.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"minThumbWidth"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number"),(0,a.kt)("td",{parentName:"tr",align:"left"},"32"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The minimum width of the thumb in pixels.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"minThumbHeight"),(0,a.kt)("td",{parentName:"tr",align:"left"},"number"),(0,a.kt)("td",{parentName:"tr",align:"left"},"32"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The minimum height of the thumb in pixels.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"onScroll"),(0,a.kt)("td",{parentName:"tr",align:"left"},"function"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"A callback function that is called when the scrollbar is scrolled.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"onUpdate"),(0,a.kt)("td",{parentName:"tr",align:"left"},"function"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"A callback function that is called when the scrollbar is updated.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"overflow"),(0,a.kt)("td",{parentName:"tr",align:"left"},"string"),(0,a.kt)("td",{parentName:"tr",align:"left"},"'auto'"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"overflowX"),(0,a.kt)("td",{parentName:"tr",align:"left"},"string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The horizontal overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"overflowY"),(0,a.kt)("td",{parentName:"tr",align:"left"},"string"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"},"The vertical overflow of the scrollable content. One of: 'auto', 'scroll', 'hidden'.")))),(0,a.kt)("h2",null,"Further Reading"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://adamsilver.io/blog/bidirectional-scrolling-whats-not-to-like/"},"Bidirectional scrolling: what\u2019s not to like?"))))}c.isMDXComponent=!0},31500:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/scrollbar",function(){return n(41699)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=31500,e(e.s=t);var t}));var t=e.O();_N_E=t}]);