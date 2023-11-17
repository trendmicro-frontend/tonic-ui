import { Checkbox, Flex } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex columnGap="6x">
    <Checkbox size="sm">
      Label
    </Checkbox>
    <Checkbox size="md">
      Label
    </Checkbox>
    <Checkbox size="lg">
      Label
    </Checkbox>
  </Flex>
);

export default App;
