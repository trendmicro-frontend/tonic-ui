import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuToggle,
  MenuToggleIcon,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tabs variant="default">
      <TabList>
        <Tab>TAB 1</Tab>
        <Tab>TAB 2</Tab>
        <Tab
          onClick={(event) => {
            const value = event.target.getAttribute('value');
            if (!value) {
              event.preventDefault();
              return;
            }
            console.log('Menu Item ' + value + ' clicked');
          }}
        >
          <Menu offset={[-14, 10]}>
            <MenuToggle
              as={Box}
              alignItems="center"
              columnGap="1x"
            >
              <Text>TAB 3</Text>
              <MenuToggleIcon />
            </MenuToggle>
            <MenuList
              width="max-content"
            >
              <MenuItem value={1}>Menu Item 1</MenuItem>
              <MenuItem value={2}>Menu Item 2</MenuItem>
              <MenuItem value={3}>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default App;
