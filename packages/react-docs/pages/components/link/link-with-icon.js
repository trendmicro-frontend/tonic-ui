import { Icon, Link, Space, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack shouldWrapChildren direction="column" spacing="2x">
    <Link
      href="https://github.com/trendmicro-frontend"
    >
      <Icon icon="t-ball"/>
      <Space width="2x" />
      Trend Micro Frontend
    </Link>
    <Link
      href="https://github.com/trendmicro-frontend"
      textDecoration="underline"
    >
      <Icon icon="t-ball"/>
      <Space width="2x" />
      Trend Micro Frontend
    </Link>
  </Stack>
);

export default App;
