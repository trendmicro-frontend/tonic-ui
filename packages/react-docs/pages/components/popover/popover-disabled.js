import { Button, Divider, Flex, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';

const App = () => (
  <Flex columnGap="4x">
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent />
    </Popover>
    <Divider orientation="vertical" />
    <Popover disabled>
      <PopoverTrigger>
        <Button variant="secondary">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        Popover
      </PopoverContent>
    </Popover>
  </Flex>
);

export default App;
