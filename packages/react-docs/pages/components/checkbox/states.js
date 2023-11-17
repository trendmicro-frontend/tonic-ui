import { Checkbox, Flex, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="6x">
    <Flex columnGap="6x">
      <Checkbox>
        Label
      </Checkbox>
      <Checkbox indeterminate>
        Label
      </Checkbox>
      <Checkbox defaultChecked>
        Label
      </Checkbox>
    </Flex>
    <Flex columnGap="6x">
      <Checkbox disabled>
        Label
      </Checkbox>
      <Checkbox disabled indeterminate>
        Label
      </Checkbox>
      <Checkbox disabled defaultChecked>
        Label
      </Checkbox>
    </Flex>
  </Stack>
);

export default App;
