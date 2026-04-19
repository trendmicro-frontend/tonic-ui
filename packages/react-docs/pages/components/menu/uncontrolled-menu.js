import {
  Flex,
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
import { isNullish } from '@tonic-ui/utils';
import { useState } from 'react';

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClickMenuItem = (event) => {
    const value = event.target.getAttribute('value');
    if (!isNullish(value)) {
      setSelectedValue(value);
    }
  };
  const handleKeyDownMenuItem = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const value = event.target.getAttribute('value');
      if (!isNullish(value)) {
        setSelectedValue(value);
      }
    }
  };

  return (
    <Flex columnGap="4x" alignItems="center">
      <Menu defaultIsOpen={true}>
        <MenuButton>
          Options
        </MenuButton>
        <MenuList
          PopperProps={{
            usePortal: true,
          }}
          onClick={handleClickMenuItem}
          onKeyDown={handleKeyDownMenuItem}
          width="max-content"
        >
          <MenuItem value={1}>
            List item 1
          </MenuItem>
          <MenuItem value={2}>
            List item 2
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
              <MenuItem value={3}>
                List item 3
              </MenuItem>
              <MenuItem value={4}>
                List item 4
              </MenuItem>
            </SubmenuList>
          </Submenu>
        </MenuList>
      </Menu>
      <Text>Selected value: {selectedValue}</Text>
    </Flex>
  );
};

export default App;
