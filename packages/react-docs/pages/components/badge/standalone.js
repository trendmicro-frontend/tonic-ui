import { Badge, Icon, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="row" spacing="8x" alignItems="center">
    <Badge variant="dot" />
    <Badge variant="solid" badgeContent={0} />
    <Badge variant="solid" badgeContent={5} />
    <Badge variant="solid" badgeContent="99+" />
    <Badge variant="solid" badgeContent={<Icon icon="virus" size="4x" />} height="6x" />
  </Stack>
);

export default App;
