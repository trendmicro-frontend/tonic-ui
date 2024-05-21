import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Submenu,
  SubmenuToggle,
  SubmenuList,
  Text,
} from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Menu display="block">
    <MenuButton variant="secondary" width={200}>
      <Text>Options</Text>
    </MenuButton>
    <MenuList
      maxHeight={200}
      overflow="auto"
      width={200}
    >
      {Array.from({ length: 100 }).map((_, key) => (
        <Submenu
          key={key}
          placement="right-start"
        >
          <SubmenuToggle width="100%">
            <MenuItem>
              <Flex
                alignItems="center"
                columnGap="2x"
                justifyContent="space-between"
                width="100%"
              >
                <Text>List Item {key + 1}</Text>
                <AngleRightIcon />
              </Flex>
            </MenuItem>
          </SubmenuToggle>
          <SubmenuList
            PopperProps={{
              usePortal: true,
            }}
            width="max-content"
          >
            <MenuItem>
              <Text>List item</Text>
            </MenuItem>
            <MenuItem>
              <Text>List item</Text>
            </MenuItem>
          </SubmenuList>
        </Submenu>
      ))}
    </MenuList>
  </Menu>
);

export default App;
