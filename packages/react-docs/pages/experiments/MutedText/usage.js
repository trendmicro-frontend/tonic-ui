import { Flex, Text } from '@tonic-ui/react';
import MutedText from '@/components/MutedText';
import React from 'react';

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
