import { Divider, Flex } from '@tonic-ui/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Flex>
    <AlignRightIcon m="1x" />
    <Divider orientation="vertical" />
    <AlignCenterIcon m="1x" />
    <Divider orientation="vertical" />
    <AlignLeftIcon m="1x" />
  </Flex>
);

export default App;
