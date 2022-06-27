(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5934],{16007:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var a=n(7896),l=n(59740),i=(n(2784),n(30876)),r=["components"],m={};function u(e){var t=e.components,n=(0,l.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"Menu"),(0,i.kt)("p",null,"An accessible dropdown menu for the common dropdown menu button design pattern.\nMenu uses roving tabIndex for focus management."),(0,i.kt)("p",null,(0,i.kt)("carbon-ad",null)),(0,i.kt)("h2",null,"Import"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Menu"),": The component that provides the menu functionality."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuButton"),": A button that composes ",(0,i.kt)("inlineCode",{parentName:"li"},"Button"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuToggle"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuToggleIcon")," to create a menu button."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuDivider"),": A divider that separates menu items."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuGroup"),": A component that groups menu items."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuItem"),": The individual menu items."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuList"),": A styled ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuContent")," that wraps the menu items."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuToggle"),": The toggle that opens the menu. This is usually a button or link."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuToggleIcon"),": An indicator that appears next to the toggle. This is usually a chevron or arrow."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Submenu"),": The component that provides the submenu functionality."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"SubmenuList"),": The list of menu items that appear in the submenu."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"SubmenuToggle"),": The toggle that opens the submenu when the menu item is hovered over.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Menu,\n  MenuButton,\n  MenuDivider,\n  MenuGroup,\n  MenuItem,\n  MenuList,\n  MenuToggle,\n  MenuToggleIcon,\n  Submenu,\n  SubmenuList,\n  SubmenuToggle,\n  useMenu,\n  useSubmenu,\n} from '@trendmicro/react-styled-ui';\n")),(0,i.kt)("h2",null,"Usage"),(0,i.kt)("h3",null,"Basic menu with an anchor"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"function basicMenu() {\n  const [anchorEl, setAnchorEl] = React.useState(null);\n  const { isOpen, onClose, onToggle } = useDisclosure();\n  const handleClick = (event) => {\n    setAnchorEl(event.currentTarget);\n    onToggle();\n  };\n  const handleMenuItemClick = (event) => {\n    const value = event.target.getAttribute('value');\n    console.log(`Menu item #${value} clicked`);\n  };\n\n  return (\n    <>\n      <Button onClick={handleClick}>Select an option</Button>\n      <Menu\n        anchorEl={anchorEl}\n        isOpen={isOpen}\n        onClose={onClose}\n      >\n        <MenuList onClick={handleMenuItemClick}>\n          <MenuItem value={1}>List item</MenuItem>\n          <MenuItem value={2}>List item</MenuItem>\n          <MenuItem valie={3}>List item</MenuItem>\n        </MenuList>\n      </Menu>\n    </>\n  );\n}\n")),(0,i.kt)("h3",null,"Basic menu with ",(0,i.kt)("inlineCode",{parentName:"h3"},"MenuButton")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack shouldWrapChildren spacing="2x">\n  <Menu>\n    <MenuButton>Select an option</MenuButton>\n    <MenuList maxHeight="200px" overflow="auto">\n      <MenuItem>List item 1</MenuItem>\n      <MenuItem>List item 2</MenuItem>\n      <MenuItem>List item 3</MenuItem>\n      <MenuItem>List item 4</MenuItem>\n      <MenuItem>List item 5</MenuItem>\n      <MenuItem>List item 6</MenuItem>\n      <MenuItem>List item 7</MenuItem>\n      <MenuItem>List item 8</MenuItem>\n      <MenuItem>List item 9</MenuItem>\n      <MenuItem>List item 10</MenuItem>\n      <MenuItem>List item 11</MenuItem>\n      <MenuItem>List item 12</MenuItem>\n    </MenuList>\n  </Menu>\n  <Menu>\n    <MenuButton variant="ghost">Select an option</MenuButton>\n    <MenuList>\n      <MenuItem>List item</MenuItem>\n      <MenuItem>List item</MenuItem>\n      <MenuItem>List item</MenuItem>\n    </MenuList>\n  </Menu>\n</Stack>\n')),(0,i.kt)("h3",null,"Cascading submenus"),(0,i.kt)("p",null,"The following example shows a menu with cascading submenus."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Flex\n  justify="space-between"\n>\n  <Flex\n    flexDirection="column"\n  >\n    <MenuItem>\n      <Text>List item</Text>\n    </MenuItem>\n    <MenuItem>\n      <Text>List item</Text>\n    </MenuItem>\n    <MenuDivider />\n    <Submenu>\n      <SubmenuToggle>\n        <MenuItem>\n          <Flex\n            alignItems="center"\n            columnGap="2x"\n            justifyContent="space-between"\n            width="100%"\n          >\n            <Text>Submenu</Text>\n            <Icon icon="angle-right" />\n          </Flex>\n        </MenuItem>\n      </SubmenuToggle>\n      <SubmenuList width="max-content">\n        <MenuItem>\n          <Text>List item</Text>\n        </MenuItem>\n        <MenuItem>\n          <Text>List item</Text>\n        </MenuItem>\n        <Submenu>\n          <SubmenuToggle>\n            <MenuItem>\n              <Flex\n                alignItems="center"\n                columnGap="2x"\n                justifyContent="space-between"\n                width="100%"\n              >\n                <Text>Submenu</Text>\n                <Icon icon="angle-right" />\n              </Flex>\n            </MenuItem>\n          </SubmenuToggle>\n          <SubmenuList width="max-content">\n            <MenuItem>\n              <Text>List item</Text>\n            </MenuItem>\n            <MenuItem>\n              <Text>List item</Text>\n            </MenuItem>\n          </SubmenuList>\n        </Submenu>\n      </SubmenuList>\n    </Submenu>\n  </Flex>\n  <Flex\n    flexDirection="column"\n  >\n    <MenuItem pl="9x">\n      <Text>List item</Text>\n    </MenuItem>\n    <MenuItem pl="9x">\n      <Text>List item</Text>\n    </MenuItem>\n    <MenuDivider />\n    <Submenu placement="left-start">\n      <SubmenuToggle>\n        <MenuItem>\n          <Flex\n            alignItems="center"\n            columnGap="2x"\n            justifyContent="space-between"\n            width="100%"\n          >\n            <Icon icon="angle-left" />\n            <Text>Submenu</Text>\n          </Flex>\n        </MenuItem>\n      </SubmenuToggle>\n      <SubmenuList width="max-content">\n        <MenuItem pl="9x">\n          <Text>List item</Text>\n        </MenuItem>\n        <MenuItem pl="9x">\n          <Text>List item</Text>\n        </MenuItem>\n        <Submenu placement="left-start">\n          <SubmenuToggle>\n            <MenuItem>\n              <Flex\n                alignItems="center"\n                columnGap="2x"\n                justifyContent="space-between"\n                width="100%"\n              >\n                <Icon icon="angle-left" />\n                <Text>Submenu</Text>\n              </Flex>\n            </MenuItem>\n          </SubmenuToggle>\n          <SubmenuList\n            width="max-content"\n          >\n            <MenuItem>\n              <Text>List item</Text>\n            </MenuItem>\n            <MenuItem>\n              <Text>List item</Text>\n            </MenuItem>\n          </SubmenuList>\n        </Submenu>\n      </SubmenuList>\n    </Submenu>\n  </Flex>\n</Flex>\n')),(0,i.kt)("h3",null,"Group"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList>\n    <MenuGroup title="title1">\n      <MenuItem px="6x">List item</MenuItem>\n      <MenuItem px="6x">List item</MenuItem>\n      <MenuItem px="6x">List item</MenuItem>\n    </MenuGroup>\n    <MenuGroup title="title2">\n      <MenuItem px="6x">List item</MenuItem>\n      <MenuItem px="6x">List item</MenuItem>\n      <MenuItem px="6x">List item</MenuItem>\n    </MenuGroup>\n  </MenuList>\n</Menu>\n')),(0,i.kt)("h3",null,"Divider"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuDivider />\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n  </MenuList>\n</Menu>\n")),(0,i.kt)("h3",null,"Disabled"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"disabled")," property on ",(0,i.kt)("inlineCode",{parentName:"p"},"MenuItem")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList>\n    <MenuItem>List item</MenuItem>\n    <MenuItem disabled>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n  </MenuList>\n</Menu>\n")),(0,i.kt)("h3",null,"Set the minimum width of the ",(0,i.kt)("inlineCode",{parentName:"h3"},"MenuList")," to the width of the ",(0,i.kt)("inlineCode",{parentName:"h3"},"MenuButton")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Menu display="inline-block">\n  <MenuButton>Select an option</MenuButton>\n  <MenuList minWidth="100%" whiteSpace="nowrap">\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n  </MenuList>\n</Menu>\n')),(0,i.kt)("h3",null,"Menu with icon"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList>\n    <MenuItem><Icon icon="delete" mr="2x"/>List item</MenuItem>\n    <MenuItem><Icon icon="edit" mr="2x"/>List item</MenuItem>\n    <MenuItem><Icon icon="share" mr="2x"/>List item</MenuItem>\n  </MenuList>\n</Menu>\n')),(0,i.kt)("h3",null,"Dropup Menu"),(0,i.kt)("p",null,"Add the ",(0,i.kt)("inlineCode",{parentName:"p"},"placement")," property with ",(0,i.kt)("inlineCode",{parentName:"p"},"top-start")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Menu display="inline-block" placement="top-start">\n  <MenuButton>Select an option</MenuButton>\n  <MenuList minWidth="100%" whiteSpace="nowrap">\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n  </MenuList>\n</Menu>\n')),(0,i.kt)("h3",null,"Menu with checkbox"),(0,i.kt)("p",null,"Need to set ",(0,i.kt)("inlineCode",{parentName:"p"},"closeOnSelect")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"false")," on ",(0,i.kt)("inlineCode",{parentName:"p"},"Menu")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'function menuWithCheckbox() {\n  const [checkedItems, setCheckedItems] = React.useState([\'host\', \'ip\']);\n  const handleChange = (e) => {\n    const value = e.target.value;\n    const items = [...checkedItems];\n    items.indexOf(value) === -1 ? items.push(value) : items.splice(items.indexOf(value), 1);\n    setCheckedItems(items);\n  };\n  return (\n    <Menu closeOnSelect={false}>\n      <MenuButton>Select an option</MenuButton>\n      <MenuList>\n        <CheckboxGroup size="sm" defaultValue={checkedItems}>\n          <MenuItem><Checkbox value="host" onChange={e => handleChange(e)}>Endpoint name</Checkbox></MenuItem>\n          <MenuItem><Checkbox value="ip" onChange={e => handleChange(e)}>IP address</Checkbox></MenuItem>\n          <MenuItem><Checkbox value="os" onChange={e => handleChange(e)}>Operating system</Checkbox></MenuItem>\n        </CheckboxGroup>\n      </MenuList>\n    </Menu>\n  );\n}\n')),(0,i.kt)("h3",null,"Menu with label inline"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'function inlineLabelMenu() {\n  const [menuItem, setMenuItem] = React.useState(\'Name\');\n\n  const handleClick = (event) => {\n    if (event.key === \'Enter\' || event.type === \'click\') {setMenuItem(event.target.innerHTML)}\n  };\n\n  return (\n    <Menu display="inline-block">\n      <MenuButton><Text color="white:secondary" mr="1x">Search by:</Text>{menuItem}</MenuButton>\n      <MenuList onClick={handleClick} minWidth="100%" whiteSpace="nowrap">\n        <MenuItem onKeyDown={handleClick}>Name</MenuItem>\n        <MenuItem onKeyDown={handleClick}>Address</MenuItem>\n        <MenuItem onKeyDown={handleClick}>Postcode</MenuItem>\n      </MenuList>\n    </Menu>\n  );\n}\n')),(0,i.kt)("h3",null,"Offset position"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"skidding")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"distance")," to customize menu offset position"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"<Menu>\n  <MenuButton>Select an option</MenuButton>\n  <MenuList skidding={20} distance={8}>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n    <MenuItem>List item</MenuItem>\n  </MenuList>\n</Menu>\n")),(0,i.kt)("h2",null,"Accessibility"),(0,i.kt)("h3",null,"Keyboard Interaction"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Key"),(0,i.kt)("th",{parentName:"tr",align:null},"Action"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"Enter")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"Space")),(0,i.kt)("td",{parentName:"tr",align:null},"When ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton")," receives focus, opens the menu and places focus on the first menu item")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ArrowDown")),(0,i.kt)("td",{parentName:"tr",align:null},"When ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton")," receives focus, opens the menu and moves focus to the first menu item")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ArrowUp")),(0,i.kt)("td",{parentName:"tr",align:null},"When ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton")," receives focus, opens the menu and moves focus to the last menu item")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"Escape")),(0,i.kt)("td",{parentName:"tr",align:null},"When the menu is open, closes the menu and sets focus to the ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton"))))),(0,i.kt)("h3",null,"ARIA roles"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"For ",(0,i.kt)("inlineCode",{parentName:"strong"},"MenuButton"),":")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It has ",(0,i.kt)("inlineCode",{parentName:"li"},"role")," set to ",(0,i.kt)("inlineCode",{parentName:"li"},"button"),"."),(0,i.kt)("li",{parentName:"ul"},"It has aria-haspopup set to either ",(0,i.kt)("inlineCode",{parentName:"li"},"menu"),"."),(0,i.kt)("li",{parentName:"ul"},"When the menu is displayed, ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuButton")," has ",(0,i.kt)("inlineCode",{parentName:"li"},"aria-expanded")," set to ",(0,i.kt)("inlineCode",{parentName:"li"},"true"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MenuButton")," has ",(0,i.kt)("inlineCode",{parentName:"li"},"aria-controls")," set to the ",(0,i.kt)("inlineCode",{parentName:"li"},"id")," of the ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuList"),".")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"For ",(0,i.kt)("inlineCode",{parentName:"strong"},"MenuList"),":")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It contains the ",(0,i.kt)("inlineCode",{parentName:"li"},"MenuItem")," has role ",(0,i.kt)("inlineCode",{parentName:"li"},"menu"),".")),(0,i.kt)("h2",null,"Props"),(0,i.kt)("h3",null,"Menu"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The children of the menu must be ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuList"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"isOpen"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", the menu will be opened")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"autoSelect"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The menu will select the first enabled item when it opens, the trigger item must be ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuButton"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"closeOnBlur"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"true")),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", the menu will close on outside click or blur")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"closeOnSelect"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"true")),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", the menu will close on menu item select")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"placement"),(0,i.kt)("td",{parentName:"tr",align:"left"},"PopperJS.placement"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"bottom-start")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The placement of the ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuList"),". One of: ",(0,i.kt)("inlineCode",{parentName:"td"},"'top'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'bottom'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'right'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'left'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'top-start'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'top-end'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'bottom-start'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'bottom-end'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'right-start'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'right-end'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'left-start'"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"'left-end'"))))),(0,i.kt)("h3",null,"MenuButton"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onClick"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.MouseEventHandler")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onKeyDown"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.KeyboardEventHandler")))),(0,i.kt)("h3",null,"MenuDivider"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"})))),(0,i.kt)("h3",null,"MenuGroup"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The content of the menu group, should be the ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuItem")," component"),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"title"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The title of the menu group"),(0,i.kt)("td",{parentName:"tr",align:"left"})))),(0,i.kt)("h3",null,"MenuItem"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", the menu item will be disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onClick"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.MouseEventHandler"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Function that is called on click and enter/space keypress"),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onKeyDown"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.KeyboardEventHander"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Function that is called on keydown"),(0,i.kt)("td",{parentName:"tr",align:"left"})))),(0,i.kt)("h3",null,"MenuList"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The content of the ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuList"),", should be the ",(0,i.kt)("inlineCode",{parentName:"td"},"MenuItem")," component")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onClick"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.MouseEventHandler"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Function to be called when you click on the menu item")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onBlur"),(0,i.kt)("td",{parentName:"tr",align:"left"},"React.FocusEventHandler"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Function to be called when you blur out of the menu list")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"skidding"),(0,i.kt)("td",{parentName:"tr",align:"left"},"number"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"0")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Displaces the menu (in pixels) along the reference element. Used by ",(0,i.kt)("a",{parentName:"td",href:"https://popper.js.org/docs/v2/modifiers/offset/#skidding-1"},(0,i.kt)("inlineCode",{parentName:"a"},"popper.js")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"distance"),(0,i.kt)("td",{parentName:"tr",align:"left"},"number"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"0")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Displaces the menu (in pixels) away from, or toward, the reference. Used by ",(0,i.kt)("a",{parentName:"td",href:"https://popper.js.org/docs/v2/modifiers/offset/#distance-1"},(0,i.kt)("inlineCode",{parentName:"a"},"popper.js")))))),(0,i.kt)("h3",null,"MenuToggle"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," ({ getMenuToggleProps }) => ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Whether the menu toggle is disabled.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onClick"),(0,i.kt)("td",{parentName:"tr",align:"left"},"function"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Callback when the menu toggle is clicked.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onKeyDown"),(0,i.kt)("td",{parentName:"tr",align:"left"},"function"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Callback when the user presses a key.")))),(0,i.kt)("h3",null,"MenuToggleIcon"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"appear"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},"false"),(0,i.kt)("td",{parentName:"tr",align:"left"},"By default the child component does not perform the enter transition when it first mounts, regardless of the value of ",(0,i.kt)("inlineCode",{parentName:"td"},"in"),". If you want this behavior, set both ",(0,i.kt)("inlineCode",{parentName:"td"},"appear")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"in")," to true.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," (state, props) => ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Whether the menu toggle icon is disabled.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"easing"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string ","|"," { enter?: string, exit?: string }"),(0,i.kt)("td",{parentName:"tr",align:"left"},"{ enter: easing.easeInOut, exit: easing.easeInOut }"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"in"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", the component will transition in.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"mountOnEnter"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),', it will "lazy mount" the component on the first ',(0,i.kt)("inlineCode",{parentName:"td"},"in={true}"),". After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify ",(0,i.kt)("inlineCode",{parentName:"td"},"unmountOnExit"),". By default the child component is mounted immediately along with the parent transition component.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"timeout"),(0,i.kt)("td",{parentName:"tr",align:"left"},"number ","|"," { appear?: number, enter?: number, exit?: number }"),(0,i.kt)("td",{parentName:"tr",align:"left"},"{ enter: duration.enterScreen, exit: duration.levingScreen }"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"unmountOnExit"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"If ",(0,i.kt)("inlineCode",{parentName:"td"},"true"),", it will unmount the child component when ",(0,i.kt)("inlineCode",{parentName:"td"},"in={false}")," and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state.")))),(0,i.kt)("h3",null,"Submenu"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"defaultIsOpen"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Whether the submenu is open by default.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"isOpen"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Whether the submenu is open.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onClose"),(0,i.kt)("td",{parentName:"tr",align:"left"},"function"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Callback when the submenu is closed.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"onOpen"),(0,i.kt)("td",{parentName:"tr",align:"left"},"function"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Callback when the submenu is opened.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"placement"),(0,i.kt)("td",{parentName:"tr",align:"left"},"string"),(0,i.kt)("td",{parentName:"tr",align:"left"},"'right-start'"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The placement of the submenu. One of: 'right-start', 'right-end', 'left-start', 'left-end'")))),(0,i.kt)("h3",null,"SubmenuList"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"})))),(0,i.kt)("h3",null,"SubmenuToggle"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"children"),(0,i.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," ({ getSubmenuToggleProps }) => ReactNode"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,i.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"left"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Whether the submenu toggle is disabled.")))))}u.isMDXComponent=!0},81374:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/menu",function(){return n(16007)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=81374,e(e.s=t);var t}));var t=e.O();_N_E=t}]);