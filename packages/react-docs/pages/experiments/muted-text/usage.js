import { Flex, Text } from '@tonic-ui/react';
import React from 'react';
import { MutedText } from '@/experiments/muted-text';

const App = () => {
  return (
    <Flex alignItems="center" columnGap="1x">
      <MutedText flex="none">
        Name:
      </MutedText>
      <Text flex="auto">
        John Doe
      </Text>
    </Flex>
  );
};

export default App;
