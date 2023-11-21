import { Flex, Spinner } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex alignItems="center" columnGap="6x">
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <Spinner size="xl" />
  </Flex>
);

export default App;
