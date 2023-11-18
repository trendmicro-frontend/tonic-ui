import { Input, InputGroup, InputGroupAddon, InputGroupAppend, InputGroupPrepend, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <InputGroup>
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">$</InputGroupAddon>
      </InputGroupPrepend>
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">0.00</InputGroupAddon>
      </InputGroupPrepend>
      <Input />
    </InputGroup>
    <InputGroup>
      <Input />
      <InputGroupAppend>
        <InputGroupAddon variant="filled">$</InputGroupAddon>
      </InputGroupAppend>
      <InputGroupAppend>
        <InputGroupAddon variant="filled">0.00</InputGroupAddon>
      </InputGroupAppend>
    </InputGroup>
  </Stack>
);

export default App;
