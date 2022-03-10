import {
  Box,
  InputBase,
} from '@tonic-ui/react';
import React, { useEffect, useRef } from 'react';
import wrapEvent from './wrapEvent';

const AutosizeInput = ({
  onInput: onInputProp,
  ...props
}) => {
  const tagInputRef = useRef();
  const tagHiddenSpanRef = useRef();

  const handleInputResize = () => {
    if (!tagInputRef.current) {
      return;
    }
    const tagInput = tagInputRef.current;
    const tagHiddenSpan = tagHiddenSpanRef.current;
    tagHiddenSpan.textContent = tagInput.value;
    tagInput.style.width = `${tagHiddenSpan.offsetWidth}px`;
    tagInput.focus();
  };

  useEffect(() => {
    handleInputResize();
  }, []);

  return (
    <>
      <Box
        as="span"
        ref={tagHiddenSpanRef}
        position="absolute"
        height="0"
        overflow="hidden"
        whiteSpace="pre"
      />
      <InputBase
        ref={tagInputRef}
        maxWidth="100%"
        minHeight="6x"
        onInput={wrapEvent(onInputProp, handleInputResize)}
        {...props}
      />
    </>
  );
};

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;
