import { Button, Divider, Flex, Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon, Space, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex alignItems="center">
    <Menu>
      <MenuToggle>
        <Text>Options</Text>
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
    <Divider
      variant="solid"
      orientation="vertical"
      height="5x"
      mx="4x"
    />
    <Menu>
      <MenuToggle>
        <Flex alignItems="center" userSelect="none">
          <Text>Options</Text>
          <Space width="1x" />
          <MenuToggleIcon />
        </Flex>
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
    <Divider
      variant="solid"
      orientation="vertical"
      height="5x"
      mx="4x"
    />
    <Menu>
      <MenuToggle>
        {({ getMenuToggleProps }) => {
          return (
            <Button
              {...getMenuToggleProps()}
              variant="default"
            >
              <Text>Options</Text>
              <Space width="1x" />
              <MenuToggleIcon />
            </Button>
          );
        }}
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
  </Flex>
);

export default App;
