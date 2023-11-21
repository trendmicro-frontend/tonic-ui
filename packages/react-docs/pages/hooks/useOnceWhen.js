import { Box, Button } from '@tonic-ui/react';
import { useOnceWhen } from '@tonic-ui/react-hooks';
import React, { useRef, useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(0);

  useOnceWhen(() => {
    console.log('This will run only once when clicked');
    ref.current++;
  }, (value > 0));

  return (
    <>
      <Box mb="4x">
        Callback called: {ref.current}
      </Box>
      <Button onClick={() => setValue(value => value + 1)}>
        Click Me
      </Button>
    </>
  );
};

export default App;
