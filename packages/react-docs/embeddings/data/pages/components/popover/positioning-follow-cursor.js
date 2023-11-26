import { Popover, PopoverContent, PopoverTrigger, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Popover trigger="hover" followCursor>
    <PopoverTrigger>
      <Text display="inline-block">Hover Me</Text>
    </PopoverTrigger>
    <PopoverContent>
      Popover
    </PopoverContent>
  </Popover>
);

export default App;
