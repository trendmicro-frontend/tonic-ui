import { Stack, Tag } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <Stack direction="row" alignItems="center" spacing="2x">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </Stack>
    <Stack direction="row" alignItems="center" spacing="2x">
      <Tag size="sm" borderRadius="lg">Small</Tag>
      <Tag size="md" borderRadius="lg">Medium</Tag>
      <Tag size="lg" borderRadius="32px">Large</Tag>
    </Stack>
    <Stack direction="row" alignItems="center" spacing="2x">
      <Tag size="sm" variant="outline">Small</Tag>
      <Tag size="md" variant="outline">Medium</Tag>
      <Tag size="lg" variant="outline">Large</Tag>
    </Stack>
    <Stack direction="row" alignItems="center" spacing="2x">
      <Tag size="sm" variant="outline" borderRadius="lg">Small</Tag>
      <Tag size="md" variant="outline" borderRadius="lg">Medium</Tag>
      <Tag size="lg" variant="outline" borderRadius="32px">Large</Tag>
    </Stack>
  </Stack>
);

export default App;
