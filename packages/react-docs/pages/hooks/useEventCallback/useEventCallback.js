import { Box, Input } from '@tonic-ui/react';
import { useEventCallback } from '@tonic-ui/react-hooks';
import { useLayoutEffect, useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const onChange = useEventCallback((event) => {
    const nextValue = event.target.value;
    console.log(`prev=${value}, next=${nextValue}`);
    setValue(nextValue);
  }, [value]);

  // Start at -1; useLayoutEffect runs synchronously before paint, so the
  // initial run brings it to 0 before the user ever sees -1.
  const [invalidationCount, setInvalidationCount] = useState(-1);

  useLayoutEffect(() => {
    setInvalidationCount(c => c + 1);
  }, [onChange]);

  return (
    <>
      <Box mb="2x">"onChange" invalidation count: {invalidationCount}</Box>
      <Input value={value} onChange={onChange} placeholder="Enter your text" />
    </>
  );
};

export default App;
