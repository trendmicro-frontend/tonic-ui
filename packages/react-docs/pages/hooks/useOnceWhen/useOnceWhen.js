import { Box, Button } from '@tonic-ui/react';
import { useOnceWhen } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const [callCount, setCallCount] = useState(0);

  useOnceWhen(() => {
    console.log('This will run only once when clicked');
    setCallCount(c => c + 1);
  }, (value > 0));

  return (
    <>
      <Box mb="4x">
        Callback called: {callCount}
      </Box>
      <Button onClick={() => setValue(value => value + 1)}>
        Click Me
      </Button>
    </>
  );
};

export default App;
