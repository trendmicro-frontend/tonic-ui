import { Button, Flex, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex>
    <Tooltip label="This is a tooltip" shouldWrapChildren>
      <Button disabled>Button</Button>
    </Tooltip>
  </Flex>
);

export default App;
