import { Box, Tooltip, Truncate } from '@tonic-ui/react';
import { useEventListener, useToggle } from '@tonic-ui/react-hooks';
import React, { useRef } from 'react';

const App = () => {
  const textRef = useRef();
  const [isOpen, toggleIsOpen] = useToggle();
  useEventListener(
    () => textRef.current,
    'mouseenter', // It can be either 'mouseleave' or 'pointerleave'
    React.useCallback((event) => {
      const isOverflowing = (event.currentTarget.scrollWidth > event.currentTarget.clientWidth);
      isOverflowing && toggleIsOpen(true);
    }, [toggleIsOpen]),
  );
  useEventListener(
    () => textRef.current,
    'mouseleave', // It can be either 'mouseleave' or 'pointerleave'
    React.useCallback((event) => {
      toggleIsOpen(false);
    }, [toggleIsOpen]),
  );

  return (
    <Box width={240}>
      <Tooltip
        isOpen={isOpen}
        label="This is a very long text that will be truncated"
      >
        <Truncate ref={textRef}>
          This is a very long text that will be truncated
        </Truncate>
      </Tooltip>
    </Box>
  );
};

export default App;
