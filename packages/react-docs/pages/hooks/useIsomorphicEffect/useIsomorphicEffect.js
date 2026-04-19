import { Code, Text } from '@tonic-ui/react';
import { useIsomorphicEffect } from '@tonic-ui/react-hooks';
import { useEffect } from 'react';

const App = () => {
  useIsomorphicEffect(() => {
    console.log('useIsomorphicEffect executed');
  }, []);

  return (
    <Text>
      <Code>useIsomorphicEffect()</Code> resolves to <Code>{useIsomorphicEffect === useEffect ? 'useEffect()' : 'useLayoutEffect()'}</Code>
    </Text>
  );
};

export default App;
