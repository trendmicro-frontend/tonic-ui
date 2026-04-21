import { Input, InputGroup, InputGroupAddon } from '@tonic-ui/react';

const App = () => (
  <InputGroup variant="flush" width="100%">
    <InputGroupAddon>@</InputGroupAddon>
    <Input placeholder="Username" />
  </InputGroup>
);

export default App;
