/* eslint-disable react/no-unescaped-entities */
import { Box, Input } from '@tonic-ui/react';
import { useEventCallback } from '@tonic-ui/react-hooks';
import React, { useRef, useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const onChange = useEventCallback((event) => {
    const nextValue = event.target.value;
    console.log(`prev=${value}, next=${nextValue}`);
    setValue(nextValue);
  }, [value]);
  const prevOnChangeRef = useRef(onChange);
  const invalidationCountRef = useRef(0);
  if (prevOnChangeRef.current !== onChange) {
    prevOnChangeRef.current = onChange;
    invalidationCountRef.current++;
  }

  return (
    <>
      <Box mb="2x">"onChange" invalidation count: {invalidationCountRef.current}</Box>
      <Input value={value} onChange={onChange} placeholder="Enter your text" />
    </>
  );
};

export default App;
