import { Input, InputGroup, InputGroupAddon } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <InputGroup variant="unstyled">
    <InputGroupAddon px="3x">@</InputGroupAddon>
    <Input placeholder="Username" />
  </InputGroup>
);

export default App;
