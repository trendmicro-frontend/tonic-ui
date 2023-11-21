import { Flex, Icon, MenuDivider, MenuItem, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
<Flex
  display="inline-flex"
  flexDirection="column"
>
  <MenuItem value="settings">
    <Icon icon="settings" mr="2x" />
    <Text>Settings</Text>
  </MenuItem>
  <MenuItem value="accounts">
    <Icon icon="user-team" mr="2x" />
    <Text>Accounts</Text>
  </MenuItem>
  <MenuItem value="privacy-control">
    <Icon icon="lock" mr="2x" />
    <Text>Privacy control</Text>
  </MenuItem>
  <MenuDivider />
  <MenuItem disabled value="restore-defaults">
    <Icon icon="undo" mr="2x" />
    <Text>Restore Defaults</Text>
  </MenuItem>
</Flex>
);

export default App;
