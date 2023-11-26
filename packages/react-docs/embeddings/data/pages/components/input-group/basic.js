import { Input, InputGroup, InputGroupAddon, InputGroupAppend, InputGroupPrepend, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <InputGroup>
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">@</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Username" />
    </InputGroup>
    <InputGroup>
      <Input placeholder="Recipient's username" />
      <InputGroupAppend>
        <InputGroupAddon variant="filled">@example.com</InputGroupAddon>
      </InputGroupAppend>
    </InputGroup>
    <InputGroup>
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">$</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Recipient's username" />
      <InputGroupAppend>
        <InputGroupAddon variant="filled">.00</InputGroupAddon>
      </InputGroupAppend>
    </InputGroup>
  </Stack>
);

export default App;
