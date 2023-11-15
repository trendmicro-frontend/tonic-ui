import { Button, Flex, Popover, PopoverContent, PopoverTrigger, Switch, Text } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [on, toggle] = useToggle(false);

  return (
    <>
      <Flex mb="4x">
        <Switch checked={on} onChange={toggle} />
      </Flex>
      <Popover
        isOpen={on}
        placement="bottom"
      >
        <PopoverTrigger>
          <Button onClick={toggle}>
            Trigger
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>This is a controlled popover</Text>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default App;
