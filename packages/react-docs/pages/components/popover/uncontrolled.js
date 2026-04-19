import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@tonic-ui/react';
const App = () => (
  <Popover defaultIsOpen={true}>
    <PopoverTrigger>
      <Button variant="secondary">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent>
      <Text>This is an uncontrolled popover</Text>
    </PopoverContent>
  </Popover>
);

export default App;
