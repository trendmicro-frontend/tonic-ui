import React from 'react';
import useColorMode from '../useColorMode';

const TestComponent = () => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  );
};

export default TestComponent;
