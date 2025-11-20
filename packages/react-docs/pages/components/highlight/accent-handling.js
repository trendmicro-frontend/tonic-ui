import { Highlight, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Accent-sensitive (default):</Text>
      <Highlight query="cafe">
        The word café (with accent) will not match when searching for cafe (without accent) by default.
      </Highlight>
    </Stack>
    
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Accent-insensitive:</Text>
      <Highlight query="cafe" ignoreAccents>
        Now café, cafe, càfé, and cafè will all match when searching for cafe with &ldquo;ignoreAccents&rdquo; enabled.
      </Highlight>
    </Stack>
    
    <Stack direction="column" spacing="2x">
      <Text fontWeight="semibold">Multiple languages:</Text>
      <Highlight query={['resume', 'naive']} ignoreAccents>
        Words like résumé, resume, naïve, and naive will all be highlighted. This is useful for multilingual content.
      </Highlight>
    </Stack>
  </Stack>
);

export default App;
