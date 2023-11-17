import { Button, Checkbox, Flex } from '@tonic-ui/react';
import React, { useRef } from 'react';

const App = () => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.focus();
    console.log(inputRef.current.checked); // => true
  };

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
