import { Link, Space, Stack } from '@tonic-ui/react';
import { TBallIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Stack shouldWrapChildren direction="column" spacing="2x">
    <Link
      href="https://github.com/trendmicro-frontend"
    >
      <TBallIcon />
      <Space width="2x" />
      Trend Micro Frontend
    </Link>
    <Link
      href="https://github.com/trendmicro-frontend"
      textDecoration="underline"
    >
      <TBallIcon />
      <Space width="2x" />
      Trend Micro Frontend
    </Link>
  </Stack>
);

export default App;
