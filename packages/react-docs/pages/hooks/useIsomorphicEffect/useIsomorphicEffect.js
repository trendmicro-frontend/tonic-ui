import React from 'react';
import { Code, Text } from '@tonic-ui/react';
import { useIsomorphicEffect } from '@tonic-ui/react-hooks';

const App = () => {
  useIsomorphicEffect(() => {
    console.log('useIsomorphicEffect executed');
  }, []);

  return (
    <Text>
      <Code>useIsomorphicEffect()</Code> resolves to <Code>{useIsomorphicEffect === React.useEffect ? 'useEffect()' : 'useLayoutEffect()'}</Code>
    </Text>
  );
};

export default App;
