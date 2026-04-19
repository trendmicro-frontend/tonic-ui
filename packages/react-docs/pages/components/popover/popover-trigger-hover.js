import { Popover, PopoverContent, PopoverTrigger, Text } from '@tonic-ui/react';
const App = () => (
  <Popover trigger="hover">
    <PopoverTrigger>
      <Text display="inline-block">Text content</Text>
    </PopoverTrigger>
    <PopoverContent>
      Popover
    </PopoverContent>
  </Popover>
);

export default App;
