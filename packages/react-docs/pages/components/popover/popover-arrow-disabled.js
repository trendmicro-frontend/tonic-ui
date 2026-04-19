import { Button, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';
const App = () => (
  <Popover arrow={false}>
    <PopoverTrigger>
      <Button variant="secondary">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent>
      Popover
    </PopoverContent>
  </Popover>
);

export default App;
