import { Flex, Radio, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="6x">
    <Flex columnGap="6x">
      <Radio>
        Label
      </Radio>
      <Radio defaultChecked>
        Label
      </Radio>
    </Flex>
    <Flex columnGap="6x">
      <Radio disabled>
        Label
      </Radio>
      <Radio disabled defaultChecked>
        Label
      </Radio>
    </Flex>
  </Stack>
);

export default App;
