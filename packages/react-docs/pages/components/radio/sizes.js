import { Flex, Radio } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex columnGap="6x">
    <Radio size="sm" name="1">
      Label
    </Radio>
    <Radio size="md" name="1">
      Label
    </Radio>
    <Radio size="lg" name="1">
      Label
    </Radio>
  </Flex>
);

export default App;
