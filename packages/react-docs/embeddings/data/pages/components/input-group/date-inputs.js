import { Input, InputGroup, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <InputGroup variant="unstyled">
    <Input
      placeholder="YYYY"
      borderBottom={1}
      textAlign="center"
      width="12x"
    />
    <Text px="2x">–</Text>
    <Input
      placeholder="MM"
      borderBottom={1}
      textAlign="center"
      width="8x"
    />
    <Text px="2x">–</Text>
    <Input
      placeholder="DD"
      borderBottom={1}
      textAlign="center"
      width="8x"
    />
  </InputGroup>
);

export default App;
