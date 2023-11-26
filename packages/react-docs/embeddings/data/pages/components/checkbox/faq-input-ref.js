import { Button, Checkbox, Flex } from '@tonic-ui/react';
import React, { useCallback, useRef } from 'react';

const App = () => {
  const inputRef = useRef();
  const handleClick = useCallback(() => {
    inputRef.current.focus();
    console.log(inputRef.current.checked); // => true
  }, []);

  return (
    <Flex alignItems="center" columnGap="6x">
      <Checkbox defaultChecked inputRef={inputRef}>
        Label
      </Checkbox>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </Flex>
  );
};

export default App;
