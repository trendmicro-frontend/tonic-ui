import { Box, Button } from '@tonic-ui/react';
import { useOnce } from '@tonic-ui/react-hooks';
import React, { useRef, useState } from 'react';

const App = () => {
  const [, setValue] = useState(0);
  const ref = useRef(0);

  useOnce(() => {
    console.log('This will run only once before the initial render');
    ref.current++;
  });

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
