import { Flex, Radio } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex columnGap="6x">
    <Radio variantColor="red" defaultChecked>
      Label
    </Radio>
    <Radio variantColor="green" defaultChecked>
      Label
    </Radio>
  </Flex>
);

export default App;
