import { Button, Flex, Radio } from '@tonic-ui/react';
import React, { useCallback, useRef } from 'react';

const App = () => {
  const inputRef = useRef();
  const handleClick = useCallback(() => {
    inputRef.current.focus();
    console.log(inputRef.current.checked); // => true
  }, []);

  return (
    <Flex alignItems="center" columnGap="6x">
      <Radio defaultChecked inputRef={inputRef}>
        Label
      </Radio>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </Flex>
  );
};

export default App;
