import { Box, Button } from '@tonic-ui/react';
import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('useEffect is triggered when value changes', { value });
  }, [value]);

  useEffectOnce(() => {
    console.log('useEffectOnce is triggered only once', { value });
  });

  return (
    <>
      <Box mb="2x">
        {value}
      </Box>
      <Button onClick={() => setValue(value => value + 1)}>
        Click Me
      </Button>
    </>
  );
};

export default App;
