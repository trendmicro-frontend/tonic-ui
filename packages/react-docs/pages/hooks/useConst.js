import { Box } from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const mountTime = useConst(() => new Date().toTimeString());
  const randomValue = useConst(Math.random());

  return (
    <Box display="flex" flexDirection="column" rowGap="2x">
      <Box>Mount time: {mountTime}</Box>
      <Box>Random value: {randomValue}</Box>
    </Box>
  )
};

export default App;
