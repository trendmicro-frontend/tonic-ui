import { Divider, Stack, Tag } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <Stack direction="row" spacing="4x" shouldWrapChildren>
      <Tag>Normal</Tag>
      <Tag disabled>Disabled</Tag>
      <Tag error>Error</Tag>
    </Stack>
    <Stack direction="row" spacing="4x" shouldWrapChildren>
      <Tag variant="outline">Normal</Tag>
      <Tag variant="outline" disabled>Disabled</Tag>
      <Tag variant="outline" error>Error</Tag>
    </Stack>
    <Divider />
    <Stack direction="row" spacing="4x" shouldWrapChildren>
      <Tag isClosable>Normal</Tag>
      <Tag disabled isClosable>Disabled</Tag>
      <Tag error isClosable>Error</Tag>
    </Stack>
    <Stack direction="row" spacing="4x" shouldWrapChildren>
      <Tag variant="outline" isClosable>Normal</Tag>
      <Tag variant="outline" disabled isClosable>Disabled</Tag>
      <Tag variant="outline" error isClosable>Error</Tag>
    </Stack>
  </Stack>
);

export default App;
