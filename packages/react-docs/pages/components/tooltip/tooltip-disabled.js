import { Divider, Flex, Tooltip } from '@tonic-ui/react';
import { SearchOIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Flex columnGap="4x">
    <Tooltip label="">
      <SearchOIcon />
    </Tooltip>
    <Divider orientation="vertical" />
    <Tooltip label="Search" disabled>
      <SearchOIcon />
    </Tooltip>
  </Flex>
);

export default App;
