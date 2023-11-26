import { Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Text size="sm" fontWeight="semibold">Heading 1</Text>
    <Text size="md" fontWeight="semibold">Heading 2</Text>
    <Text size="lg" fontWeight="semibold">Heading 3</Text>
    <Text size="xl" fontWeight="semibold">Heading 4</Text>
    <Text size="2xl" fontWeight="semibold">Heading 5</Text>
    <Text size="3xl" fontWeight="semibold">Heading 6</Text>
    <Text size="4xl" fontWeight="semibold">Heading 7</Text>
  </Stack>
);

export default App;
