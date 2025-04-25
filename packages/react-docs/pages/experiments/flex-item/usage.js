import { Flex } from '@tonic-ui/react';
import React from 'react';
import { MutedText } from '@/experiments/muted-text';
import { FlexItem } from '@/experiments/flex-item';

const App = () => {
  const items = ['Apple', 'Banana', 'Cherry', 'Dragonfruit'];
  return (
    <Flex alignItems="center" columnGap="1x">
      <FlexItem as={MutedText} fixed>
        Fruits:
      </FlexItem>
      <FlexItem maxWidth={120} tooltip>
        {items.join(', ')}
      </FlexItem>
      <FlexItem fixed>
        ({items.length})
      </FlexItem>
    </Flex>
  );
};

export default App;
