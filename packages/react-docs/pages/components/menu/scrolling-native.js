import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Space,
  Submenu,
  SubmenuList,
  SubmenuTrigger,
  Text,
} from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';

const App = () => (
  <Menu width={200}>
    <MenuButton variant="secondary" width="100%">
      <Text>Options</Text>
    </MenuButton>
    <MenuList
      sx={{
        // Set the minimum width to fit the menu's content while occupying full width
        minWidth: 'max-content',
        width: '100%',
        // Vertical scrolling
        maxHeight: 200,
        overflowY: 'auto',
      }}
    >
      {Array.from({ length: 100 }).map((_, key) => (
        <Submenu
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          portalled
          placement="right-start"
        >
          <SubmenuTrigger width="100%">
            <Text>List Item {key + 1}</Text>
            <Space width="1x" />
            <AngleRightIcon ml="auto" />
          </SubmenuTrigger>
          <SubmenuList
            sx={{
              width: 'max-content',
            }}
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
