import { Button, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';

const App = () => (
  <Popover>
    <PopoverTrigger>
      <Button variant="secondary">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent
      portalled
    >
      Popover
    </PopoverContent>
  </Popover>
);

export default App;
