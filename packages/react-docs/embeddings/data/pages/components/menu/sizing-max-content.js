import { Menu, MenuButton, MenuItem, MenuList, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Menu>
    <MenuButton variant="secondary">
      <Text>Options</Text>
    </MenuButton>
    <MenuList width="max-content">
      <MenuItem>
        This is a very long list item 1
      </MenuItem>
      <MenuItem>
        This is a very long list item 2
      </MenuItem>
      <MenuItem>
        This is a very long list item 3
      </MenuItem>
    </MenuList>
  </Menu>
);

export default App;
