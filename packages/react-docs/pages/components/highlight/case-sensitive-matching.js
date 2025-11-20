import { Highlight, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Highlight query="React" caseSensitive={true}>
      Only React with exact casing will be highlighted. REACT, react, and ReAcT will not match.
    </Highlight>
    <Highlight query={['JavaScript', 'HTML']} caseSensitive={true}>
      JavaScript and HTML will be highlighted, but javascript and html will not match due to case sensitivity.
    </Highlight>
  </Stack>
);

export default App;
