import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupPrepend,
  Stack,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <InputGroup size="sm">
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">sm</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Small size (24px)" />
    </InputGroup>
    <InputGroup size="md">
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">md</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Default size (32px)" />
    </InputGroup>
    <InputGroup size="lg">
      <InputGroupPrepend>
        <InputGroupAddon variant="filled">lg</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Large size (40px)" />
    </InputGroup>
  </Stack>
);

export default App;
