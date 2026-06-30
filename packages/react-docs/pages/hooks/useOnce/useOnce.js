import { Box, Button } from '@tonic-ui/react';
import { useOnce } from '@tonic-ui/react-hooks';
import { useReducer, useState } from 'react';

const App = () => {
  const [, rerender] = useReducer(x => !x, false);
  const [callCount, setCallCount] = useState(0);

  useOnce(() => {
    console.log('This will run only once before the initial render');
    setCallCount(c => c + 1);
  });

  return (
    <>
      <Box mb="4x">
        Callback called: {callCount}
      </Box>
      <Button onClick={() => rerender()}>
        Click Me
      </Button>
    </>
  );
};

export default App;
