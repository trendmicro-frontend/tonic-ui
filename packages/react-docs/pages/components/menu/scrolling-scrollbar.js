import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Scrollbar,
  Submenu,
  SubmenuList,
  SubmenuTrigger,
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
      width={200}
    >
      <Scrollbar
        height={200}
        overflowY="visible"
      >
        {Array.from({ length: 100 }).map((_, key) => (
          <Submenu
            key={key}
            placement="right-start"
          >
            <SubmenuTrigger width="100%">
              <Text>List Item {key + 1}</Text>
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
        ))}
      </Scrollbar>
    </MenuList>
  </Menu>
);

export default App;
