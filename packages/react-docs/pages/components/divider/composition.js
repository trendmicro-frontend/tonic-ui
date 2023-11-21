import { Divider, Flex, Icon } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex>
    <Icon icon="align-right" m="1x" />
    <Divider orientation="vertical" />
    <Icon icon="align-center" m="1x" />
    <Divider orientation="vertical" />
    <Icon icon="align-left" m="1x" />
  </Flex>
);

export default App;
