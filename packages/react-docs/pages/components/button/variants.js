import {
  Button,
  Flex,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex display="inline-flex" direction="column" rowGap="4x">
    <Button variant="emphasis">Emphasis Button</Button>
    <Button variant="primary">Primary Button</Button>
    <Button variant="default">Default Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="ghost">Ghost Button</Button>
  </Flex>
);

export default App;
