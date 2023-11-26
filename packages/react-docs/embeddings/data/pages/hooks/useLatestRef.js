import { Box, Button, Space } from '@tonic-ui/react';
import { useLatestRef } from '@tonic-ui/react-hooks';
import React, { useRef, useState } from 'react';

const App = () => {
  const [countdownMode, setCountdownMode] = useState(false);
  const timeoutRef = useRef(null);
  const [count, setCount] = useState(0);
  const latestRef = useLatestRef(count);

  function handleAlertClick() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      alert(`Latest count value: ${latestRef.current}`);
      timeoutRef.current = null;
      setCountdownMode(false);
    }, 3000);
    setCountdownMode(true);
  }

  return (
    <>
      <Box mb="4x">
        You clicked {count} times
      </Box>
      <Button disabled={countdownMode} onClick={handleAlertClick}>
        Show Alert In 5 Seconds
      </Button>
      <Space width="2x" />
      <Button disabled={!countdownMode} onClick={() => setCount(count + 1)}>
        Click Me
      </Button>
    </>
  );
};

export default App;
