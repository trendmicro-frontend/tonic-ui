import {
  Menu,
  MenuButton,
  MenuDivider,
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
  <Menu portalled>
    <MenuButton>
      Options
    </MenuButton>
    <MenuList
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
      <MenuDivider />
      <Submenu portalled>
        <SubmenuTrigger>
          <Text>Submenu</Text>
          <Space width="1x" />
          <AngleRightIcon ml="auto" />
        </SubmenuTrigger>
        <SubmenuList
          width="max-content"
        >
          <MenuItem>
            <Text>List item</Text>
          </MenuItem>
          <MenuItem>
            <Text>List item</Text>
          </MenuItem>
          <Submenu portalled>
            <SubmenuTrigger>
              <Text>Submenu</Text>
              <Space width="1x" />
              <AngleRightIcon ml="auto" />
            </SubmenuTrigger>
            <SubmenuList
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
        </SubmenuList>
      </Submenu>
    </MenuList>
  </Menu>
);

export default App;
