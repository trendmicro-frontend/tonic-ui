import { Link, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack shouldWrapChildren direction="column" spacing="2x">
    <Link
      href="https://github.com/trendmicro-frontend"
      disabled
    >
      Trend Micro Frontend
    </Link>
    <Link
      href="https://github.com/trendmicro-frontend"
      textDecoration="underline"
      disabled
    >
      Trend Micro Frontend
    </Link>
  </Stack>
);

export default App;
