import { Input, InputGroup, InputGroupAddon, InputGroupPrepend, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <InputGroup variant="filled">
      <InputGroupPrepend>
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroupPrepend>
      <Input variant="outline" placeholder="Username" />
    </InputGroup>
    <InputGroup variant="filled">
      <InputGroupPrepend>
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Username" />
    </InputGroup>
  </Stack>
);

export default App;
