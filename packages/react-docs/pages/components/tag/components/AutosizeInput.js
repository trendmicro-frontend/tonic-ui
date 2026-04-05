import {
  Box,
  InputBase,
} from '@tonic-ui/react';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useRef } from 'react';

const AutosizeInput = ({
  onChange: onChangeProp,
  ...props
}) => {
  const inputRef = useRef();
  const sizerRef = useRef();

  const resize = useCallback(() => {
    const input = inputRef.current;
    const sizer = sizerRef.current;
    if (!input || !sizer) {
      return;
    }
    sizer.textContent = input.value;
    input.style.width = `${sizer.offsetWidth}px`;
    input.focus();
  }, []);

  const handleChange = useCallback((event) => {
    callEventHandlers(onChangeProp, resize)(event);
  }, [onChangeProp, resize]);

  useEffect(() => {
    resize();
  }, [resize]);

  return (
    <>
      <Box
        as="span"
        ref={sizerRef}
        position="absolute"
        height="0"
        overflow="hidden"
        whiteSpace="pre"
      />
      <InputBase
        ref={inputRef}
        maxWidth="100%"
        minHeight="6x"
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;
