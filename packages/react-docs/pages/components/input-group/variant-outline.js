import { Input, InputGroup, InputGroupAddon, InputGroupPrepend, Stack } from '@tonic-ui/react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <InputGroup variant="outline">
      <InputGroupPrepend>
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroupPrepend>
      <Input placeholder="Username" />
    </InputGroup>
    <InputGroup variant="outline">
      <InputGroupPrepend>
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroupPrepend>
      <Input variant="filled" placeholder="Username" />
    </InputGroup>
  </Stack>
);

export default App;
