import { Button, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Text } from '@tonic-ui/react';
import React, { useRef } from 'react';

const App = () => {
  const initialFocusRef1 = useRef();
  const initialFocusRef2 = useRef();

  return (
    <Stack spacing="6x" width="fit-content">
      <Popover initialFocusRef={initialFocusRef1}>
        <PopoverTrigger>
          <Button variant="secondary">
            Interactive Trigger
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Input mt="3x" ref={initialFocusRef1} defaultValue="Popover" />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover initialFocusRef={initialFocusRef2}>
        <PopoverTrigger tabIndex={-1}>
          <Text
            userSelect="none"
            _hover={{ cursor: 'pointer' }}
          >
            Non-interactive Trigger
          </Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Input mt="3x" ref={initialFocusRef2} defaultValue="Popover" />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default App;
