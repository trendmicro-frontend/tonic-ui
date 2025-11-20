import { Highlight, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Highlight query={['search', 'find', 'match']}>
      Use this component to search for text, find specific words, or match patterns in your content. It&apos;s perfect for search results!
    </Highlight>
    
    <Highlight query={['one', 'two', 'three', 'four']}>
      Count with me: one, two, three, four. All four numbers will be highlighted!
    </Highlight>
  </Stack>
);

export default App;
