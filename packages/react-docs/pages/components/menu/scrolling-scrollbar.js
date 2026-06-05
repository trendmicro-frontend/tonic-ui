import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Scrollbar,
  Space,
  Submenu,
  SubmenuList,
  SubmenuTrigger,
  Text,
} from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';

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
