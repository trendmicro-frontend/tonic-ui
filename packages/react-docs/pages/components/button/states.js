import {
  Button,
  Flex,
  Grid,
  TextLabel,
} from '@tonic-ui/react';

const App = () => (
  <Flex>
    <Grid
      templateColumns="1fr 1fr"
      columnGap="2x"
      rowGap="4x"
    >
      <TextLabel textAlign="center">Normal</TextLabel>
      <TextLabel textAlign="center">Disabled</TextLabel>
      <Button variant="emphasis">Emphasis</Button>
      <Button variant="emphasis" disabled>Emphasis</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="default">Default</Button>
      <Button variant="default" disabled>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </Grid>
  </Flex>
);

export default App;
