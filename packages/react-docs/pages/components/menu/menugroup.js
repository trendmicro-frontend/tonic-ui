import { ButtonBase, Flex, MenuDivider, MenuGroup, MenuItem, Space, Text } from '@tonic-ui/react';
import { SettingsIcon, UserIcon } from '@tonic-ui/react-icons';
import React from 'react';

const Avatar = (props) => (
  <Flex
    p="1x"
    borderRadius="50%"
    alignItems="center"
    justifyContent="center"
    fontSize="xs"
    lineHeight="1"
    {...props}
  />
);

const App = () => (
  <Flex
    flexDirection="column"
    width="fit-content"
  >
    <MenuItem>
      <Text>My Profile</Text>
    </MenuItem>
    <MenuDivider />
    <MenuGroup
      title={(
        <Flex justifyContent="space-between">
          <Text>Other profiles</Text>
          <Space minWidth="10x" />
          <ButtonBase title="Manage profiles">
            <SettingsIcon size="3x" />
          </ButtonBase>
        </Flex>
      )}
    >
      <MenuItem>
        <Avatar color="white" bg="blue:50" mr="3x">
          JD
        </Avatar>
        <Text>John Doe</Text>
      </MenuItem>
      <MenuItem>
        <Avatar color="white" bg="gray:50" mr="3x">
          <UserIcon size="3x" />
        </Avatar>
        <Text>Guest</Text>
      </MenuItem>
    </MenuGroup>
  </Flex>
);

export default App;
