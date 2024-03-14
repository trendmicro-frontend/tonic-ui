import React from 'react';
import { Flex } from '@tonic-ui/react';
import {
  HomeIcon,
} from '@tonic-ui/react-icons';

const App = () => {
  return (
    <Flex alignItems="end" columnGap="6x">
      <HomeIcon size="4x" />
      <HomeIcon size="6x" />
      <HomeIcon size="8x" />
      <HomeIcon width={40} height={40} />
    </Flex>
  );
};

export default App;
