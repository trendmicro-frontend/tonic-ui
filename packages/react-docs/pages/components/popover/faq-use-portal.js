import { Button, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';
const App = () => (
  <Popover>
    <PopoverTrigger>
      <Button variant="secondary">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent
      PopperProps={{
        usePortal: true,
      }}
    >
      Popover
    </PopoverContent>
  </Popover>
);

export default App;
