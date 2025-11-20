import { Highlight, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Highlight variant="highlight" query="search keywords">
      The &ldquo;default&rdquo; highlight variant marks search keywords with a yellow background.
    </Highlight>
    
    <Highlight variant="emphasis" query="highlight text">
      The &ldquo;emphasis&rdquo; variant is used to highlight text, such as in auto-complete results.
    </Highlight>
  </Stack>
);

export default App;
