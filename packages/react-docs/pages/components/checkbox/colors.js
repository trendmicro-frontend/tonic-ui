import { Checkbox, Flex } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex columnGap="6x">
    <Checkbox variantColor="red" defaultChecked>
      Label
    </Checkbox>
    <Checkbox variantColor="green" defaultChecked>
      Label
    </Checkbox>
  </Flex>
);

export default App;
