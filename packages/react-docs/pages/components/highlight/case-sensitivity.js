import { Highlight, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Case-insensitive (default):</Text>
      <Highlight query="react">
        React, REACT, react, and ReAcT will all be highlighted because the search is case-insensitive by default.
      </Highlight>
    </Stack>
    
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Case-sensitive:</Text>
      <Highlight query="React" caseSensitive>
        Only React with exact casing will be highlighted. REACT, react, and ReAcT will not match.
      </Highlight>
    </Stack>
    
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Multiple queries with case sensitivity:</Text>
      <Highlight query={['JavaScript', 'HTML']} caseSensitive>
        JavaScript and HTML will be highlighted, but javascript and html will not match due to case sensitivity.
      </Highlight>
    </Stack>
  </Stack>
);

export default App;