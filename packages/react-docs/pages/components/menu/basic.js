import { Flex, MenuDivider, MenuItem, Text } from '@tonic-ui/react';
import { LockIcon, SettingsIcon, UndoIcon, UserTeamIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
<Flex
  display="inline-flex"
  flexDirection="column"
>
  <MenuItem value="settings">
    <SettingsIcon mr="2x" />
    <Text>Settings</Text>
  </MenuItem>
  <MenuItem value="accounts">
    <UserTeamIcon mr="2x" />
    <Text>Accounts</Text>
  </MenuItem>
  <MenuItem value="privacy-control">
    <LockIcon mr="2x" />
    <Text>Privacy control</Text>
  </MenuItem>
  <MenuDivider />
  <MenuItem disabled value="restore-defaults">
    <UndoIcon mr="2x" />
    <Text>Restore Defaults</Text>
  </MenuItem>
</Flex>
);

export default App;
