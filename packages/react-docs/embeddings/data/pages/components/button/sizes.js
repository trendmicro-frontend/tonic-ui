import {
  Button,
  Stack,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Stack direction="row" spacing="2x" alignItems="center">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </Stack>
    <Stack direction="row" spacing="2x" alignItems="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
    <Stack direction="row" spacing="2x" alignItems="center">
      <Button variant="secondary" size="sm">Small</Button>
      <Button variant="secondary" size="md">Medium</Button>
      <Button variant="secondary" size="lg">Large</Button>
    </Stack>
    <Stack direction="row" spacing="2x" alignItems="center">
      <Button variant="ghost" size="sm">Small</Button>
      <Button variant="ghost" size="md">Medium</Button>
      <Button variant="ghost" size="lg">Large</Button>
    </Stack>
  </Stack>
);

export default App;
