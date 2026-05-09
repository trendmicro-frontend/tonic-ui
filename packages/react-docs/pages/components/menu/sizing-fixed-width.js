import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  OverflowTooltip,
} from '@tonic-ui/react';

const App = () => (
  <Menu
    width={200}
  >
    <MenuButton
      variant="secondary"
      sx={{
        width: '100%',
        '> :first-of-type': {
          // Override flex item's default `minWidth: auto` to allow text truncation
          minWidth: 0,
        },
      }}
    >
      <OverflowTooltip label="Long text on a menu button">
        Long text on a menu button
      </OverflowTooltip>
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
