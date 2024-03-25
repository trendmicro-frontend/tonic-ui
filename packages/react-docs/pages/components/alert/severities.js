import { Alert, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert variant="solid" severity="success">
      <Text>This is a success alert.</Text>
    </Alert>
    <Alert variant="solid" severity="info">
      <Text>This is an info alert.</Text>
    </Alert>
    <Alert variant="solid" severity="warning">
      <Text>This is a warning alert.</Text>
    </Alert>
    <Alert variant="solid" severity="error">
      <Text>This is an error alert.</Text>
    </Alert>
    <Alert variant="outline" severity="success">
      <Text>This is a success alert.</Text>
    </Alert>
    <Alert variant="outline" severity="info">
      <Text>This is an info alert.</Text>
    </Alert>
    <Alert variant="outline" severity="warning">
      <Text>This is a warning alert.</Text>
    </Alert>
    <Alert variant="outline" severity="error">
      <Text>This is an error alert.</Text>
    </Alert>
  </Stack>
);

export default App;
