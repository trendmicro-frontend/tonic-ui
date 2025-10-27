import { Link, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack rowGap="4x">
    <Link href="#" disabled variant="default">
      Default link
    </Link>
    <Link href="#" disabled variant="inline">
      Inline link
    </Link>
    <Link href="#" disabled variant="subtle">
      Subtle link
    </Link>
  </Stack>
);

export default App;
