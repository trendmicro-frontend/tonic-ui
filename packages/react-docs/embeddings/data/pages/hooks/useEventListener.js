import { Button } from '@tonic-ui/react';
import { useEventListener } from '@tonic-ui/react-hooks';
import React, { useRef } from 'react';

const App = () => {
  const buttonRef = useRef(null);

  const onScroll = (event) => {
    console.log('document scrolled', event);
  };

  const onClick = (event) => {
    console.log('button clicked', event);
  };

  // example with document based event
  useEventListener(
    () => (buttonRef.current.ownerDocument || document),
    'scroll',
    onScroll,
  );

  // example with element based event
  useEventListener(
    () => buttonRef.current,
    'click',
    onClick,
  );

  return (
    <Button ref={buttonRef}>
      Click Me
    </Button>
  );
};

export default App;
