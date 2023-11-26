import { Button, Flex, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex>
    <Popover trigger="hover">
      <PopoverTrigger shouldWrapChildren>
        <Button disabled variant="secondary">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        Popover
      </PopoverContent>
    </Popover>
  </Flex>
);

export default App;
