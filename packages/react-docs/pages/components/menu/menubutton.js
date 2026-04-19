import { Menu, MenuButton, MenuItem, MenuList, Text } from '@tonic-ui/react';
const App = () => (
  <Menu>
    <MenuButton variant="secondary">
      <Text>Options</Text>
    </MenuButton>
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
);

export default App;
