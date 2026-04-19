import { Menu, MenuButton, MenuItem, MenuList, Text } from '@tonic-ui/react';
const App = () => (
  <Menu width="100%">
    <MenuButton variant="secondary" width="100%">
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
