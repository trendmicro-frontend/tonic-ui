import React from 'react';
import { Flex } from '@tonic-ui/react';
import {
  FaceSmileOIcon,
} from '@tonic-ui/react-icons';

const App = () => {
  return (
    <Flex columnGap="4x" alignItems="center">
      <FaceSmileOIcon />
      <FaceSmileOIcon size="6x" color="red:50" />
      <FaceSmileOIcon size="8x" sx={{ color: 'yellow:50' }} />
    </Flex>
  );
};

export default App;
