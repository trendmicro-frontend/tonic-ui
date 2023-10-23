import {
  Button,
  Flex,
  Grid,
  TextLabel,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex>
    <Grid
      templateColumns="1fr 1fr 1fr"
      columnGap="2x"
      rowGap="4x"
    >
      <TextLabel textAlign="center">Normal</TextLabel>
      <TextLabel textAlign="center">Disabled</TextLabel>
      <TextLabel textAlign="center">Selected</TextLabel>
      <Button variant="emphasis">Emphasis</Button>
      <Button variant="emphasis" disabled>Emphasis</Button>
      <Button variant="emphasis" selected>Emphasis</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="primary" selected>Primary</Button>
      <Button variant="default">Default</Button>
      <Button variant="default" disabled>Default</Button>
      <Button variant="default" selected>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="secondary" selected>Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="ghost" selected>Ghost</Button>
    </Grid>
  </Flex>
);

export default App;
