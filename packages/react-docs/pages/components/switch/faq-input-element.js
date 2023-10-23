import { Button, Flex, Switch } from '@tonic-ui/react';
import React, { useRef } from 'react';

const App = () => {
  const inputRef = useRef();

  const handleClick = () => {
    const inputEl = inputRef?.current;
    if (inputEl) {
      inputEl.focus();
      window.alert('The switch toggle is ' + (inputEl.checked ? 'on' : 'off'));
    }
  };

  return (
    <Flex alignItems="center" columnGap="6x">
      <Switch defaultChecked inputRef={inputRef}>
        Label
      </Switch>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </Flex>
  );
};

export default App;
