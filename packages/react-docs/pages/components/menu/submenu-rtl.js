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
import { AngleLeftIcon } from '@tonic-ui/react-icons';

const App = () => (
  <Menu portalled>
    <MenuButton>
      Options
    </MenuButton>
    <MenuList
      width="max-content"
    >
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuDivider />
      <Submenu portalled placement="left-start">
        <SubmenuTrigger>
          <AngleLeftIcon mr="auto" />
          <Space width="1x" />
          <Text>Submenu</Text>
        </SubmenuTrigger>
        <SubmenuList
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
          <Submenu portalled placement="left-start">
            <SubmenuTrigger>
              <AngleLeftIcon mr="auto" />
              <Space width="1x" />
              <Text>Submenu</Text>
            </SubmenuTrigger>
            <SubmenuList
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
