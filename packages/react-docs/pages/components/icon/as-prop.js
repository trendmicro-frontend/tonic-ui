import { Flex, Icon } from '@tonic-ui/react';
import { FaceSmileOIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => {
  return (
    <Flex columnGap="4x" alignItems="center">
      <Icon as={FaceSmileOIcon} />
      <Icon as={FaceSmileOIcon} size="6x" color="red:50" />
      <Icon as={FaceSmileOIcon} size="8x" color="yellow:50" />
      <Icon as={FaceSmileOIcon} size="12x" color="teal:40" />
    </Flex>
  );
};

export default App;
