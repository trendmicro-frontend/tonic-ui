import { Button } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
const App = () => {
  const [value, toggleValue] = useToggle(false);

  return (
    <Button onClick={toggleValue}>
      {value ? 'ON' : 'OFF'}
    </Button>
  );
};

export default App;
