import { Stack, Tag } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="row" spacing="2x" shouldWrapChildren>
    <Tag variant="solid">Solid Tag</Tag>
    <Tag variant="outline">Outline Tag</Tag>
  </Stack>
);

export default App;
