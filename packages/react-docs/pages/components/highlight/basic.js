import { Highlight, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Highlight query="highlight">
      This text contains the word highlight which will be highlighted.
    </Highlight>
    <Highlight query="highlight">
      The "Highlight" component is useful for search results and text matching.
    </Highlight>
  </Stack>
);

export default App;
