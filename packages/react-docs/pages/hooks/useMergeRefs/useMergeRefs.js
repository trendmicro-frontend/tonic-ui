import { Box } from '@tonic-ui/react';
import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef, useEffect, useRef } from 'react';

const Component = forwardRef(function Component(props, ref) {
  const internalRef = useRef();
  const refs = useMergeRefs(internalRef, ref);

  useEffect(() => {
    console.log('ref.current:', ref.current);
    console.log('internalRef.current:', internalRef.current);
  }, [ref]);

  return (
    <Box ref={refs} {...props}>
      A component with multiple refs
    </Box>
  );
});
Component.displayName = 'Component';

const App = () => {
  const externalRef = useRef();

  useEffect(() => {
    console.log('externalRef.current:', externalRef.current);
  }, []);

  return (
    <Component ref={externalRef} />
  );
};

export default App;
