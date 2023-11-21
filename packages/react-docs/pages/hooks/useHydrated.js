import { useHydrated } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const isHydrated = useHydrated();

  return (
    <>
      {isHydrated ? 'Hydrated' : 'Not hydrated'}
    </>
  );
};

export default App;
