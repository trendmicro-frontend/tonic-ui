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
import React from 'react';

const App = () => (
  <Menu>
    <MenuButton>
      Options
    </MenuButton>
    <MenuList
      PopperProps={{
        usePortal: true,
      }}
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
      <Submenu>
        <SubmenuTrigger>
          <Text>Submenu</Text>
          <Space width="1x" />
          <AngleRightIcon ml="auto" />
        </SubmenuTrigger>
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
          <Submenu>
            <SubmenuTrigger>
              <Text>Submenu</Text>
              <Space width="1x" />
              <AngleRightIcon ml="auto" />
            </SubmenuTrigger>
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
        </SubmenuList>
      </Submenu>
    </MenuList>
  </Menu>
);

export default App;
