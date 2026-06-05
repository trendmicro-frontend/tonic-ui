import { Button, Divider, Flex, Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon, Space, Text } from '@tonic-ui/react';

const App = () => (
  <Flex alignItems="center">
    <Menu>
      <MenuToggle>
        <Text>Options</Text>
      </MenuToggle>
      <MenuList
        sx={{
          minWidth: 'max-content',
          width: '100%',
        }}
      >
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
      <MenuList
        sx={{
          minWidth: 'max-content',
          width: '100%',
        }}
      >
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
              sx={{
                columnGap: '1x',
              }}
            >
              <Text>Options</Text>
              <MenuToggleIcon />
            </Button>
          );
        }}
      </MenuToggle>
      <MenuList
        sx={{
          // Set the minimum width to fit the menu's content while occupying full width
          minWidth: 'max-content',
          width: '100%',
        }}
      >
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
