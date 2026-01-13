import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Submenu,
  SubmenuList,
  SubmenuTrigger,
  Text,
} from '@tonic-ui/react';
import { AngleLeftIcon } from '@tonic-ui/react-icons';
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
      width="max-content"
    >
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuDivider />
      <Submenu placement="left-start">
        <SubmenuTrigger>
          <AngleLeftIcon mr="auto" />
          <Text>Submenu</Text>
        </SubmenuTrigger>
        <SubmenuList
          PopperProps={{
            usePortal: true,
          }}
          sx={{
            width: 'max-content',

            // The `z-index` of the side menu is "fixed"
            zIndex: 'var(--tonic-zIndices-fixed)',
          }}
        >
          <MenuItem pl="9x">
            <Text>List item</Text>
          </MenuItem>
          <MenuItem pl="9x">
            <Text>List item</Text>
          </MenuItem>
          <Submenu placement="left-start">
            <SubmenuTrigger>
              <AngleLeftIcon mr="auto" />
              <Text>Submenu</Text>
            </SubmenuTrigger>
            <SubmenuList
              PopperProps={{
                usePortal: true,
              }}
              sx={{
                width: 'max-content',

                // The `z-index` of the side menu is "fixed"
                zIndex: 'var(--tonic-zIndices-fixed)',
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
        </SubmenuList>
      </Submenu>
    </MenuList>
  </Menu>
);

export default App;
