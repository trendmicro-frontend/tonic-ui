import { Box, Button } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <>
      <Box mb="4x">
        Current: {value} - Previous: {lastValue}
      </Box>
      <Button onClick={() => setValue(value + 1)}>
        Click Me
      </Button>
    </>
  );
};

export default App;
