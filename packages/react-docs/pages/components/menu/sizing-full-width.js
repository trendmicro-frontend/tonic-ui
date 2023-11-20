import { Menu, MenuButton, MenuItem, MenuList, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Menu display="block">
    <MenuButton variant="secondary" width="100%">
      <Text>Options</Text>
    </MenuButton>
    <MenuList width="100%">
      <MenuItem>
        List item 1
      </MenuItem>
      <MenuItem>
        List item 2
      </MenuItem>
      <MenuItem>
        List item 3
      </MenuItem>
    </MenuList>
  </Menu>
);

export default App;
