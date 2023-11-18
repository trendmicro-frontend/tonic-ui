import { Input, InputGroup, InputGroupAddon, InputGroupPrepend } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <InputGroup>
    <InputGroupPrepend>
      <InputGroupAddon variant="filled" whiteSpace="nowrap">First and last name</InputGroupAddon>
    </InputGroupPrepend>
    <Input placeholder="First name" defaultValue="John" required />
    <Input placeholder="Last name" defaultValue="Doe" required />
  </InputGroup>
);

export default App;
