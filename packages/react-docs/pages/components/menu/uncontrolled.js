import {
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Submenu,
  SubmenuList,
  SubmenuToggle,
  Text,
} from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';
import { isNullish } from '@tonic-ui/utils';
import React, { useState } from 'react';

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClickMenuItem = (event) => {
    const value = event.target.getAttribute('value');
    if (!isNullish(value)) {
      setSelectedValue(value);
    }
  };

  return (
    <Flex columnGap="4x" alignItems="center">
      <Menu>
        <MenuButton>
          Options
        </MenuButton>
        <MenuList
          onClick={handleClickMenuItem}
          width="max-content"
        >
          <MenuItem value={1}>
            List item 1
          </MenuItem>
          <MenuItem value={2}>
            List item 2
          </MenuItem>
          <MenuDivider />
          <Submenu>
            <SubmenuToggle>
              <MenuItem>
                <Flex
                  alignItems="center"
                  columnGap="2x"
                  justifyContent="space-between"
                  width="100%"
                >
                  Submenu
                  <AngleRightIcon />
                </Flex>
              </MenuItem>
            </SubmenuToggle>
            <SubmenuList width="max-content">
              <MenuItem value={3}>
                List item 3
              </MenuItem>
              <MenuItem value={4}>
                List item 4
              </MenuItem>
            </SubmenuList>
          </Submenu>
        </MenuList>
      </Menu>
      <Text>Selected: {selectedValue}</Text>
    </Flex>
  );
};

export default App;
