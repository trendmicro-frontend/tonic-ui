import { Divider, Flex, Icon, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex columnGap="4x">
    <Tooltip label="">
      <Icon icon="search-o" />
    </Tooltip>
    <Divider orientation="vertical" />
    <Tooltip label="Search" disabled>
      <Icon icon="search-o" />
    </Tooltip>
  </Flex>
);

export default App;
