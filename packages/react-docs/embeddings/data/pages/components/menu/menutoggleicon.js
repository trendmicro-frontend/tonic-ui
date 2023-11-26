import { Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Menu>
    <MenuToggle>
      <MenuToggleIcon />
    </MenuToggle>
    <MenuList width="max-content">
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
