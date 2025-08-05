import { Button } from '@tonic-ui/react';
import { useEffectOnceWhen } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const [state, setState] = useState('idle');

  useEffectOnceWhen(() => {
    setTimeout(() => {
      setState('loaded');
    }, 3000); // Countdown for 3 seconds
  }, (state === 'loading'));

  return (
    <>
      {state === 'idle' && (
        <Button onClick={() => setState('loading')}>
          Click To Run
        </Button>
      )}
      {state === 'loading' && 'Loading component (will be gone in 3 seconds)...'}
      {state === 'loaded' && 'Component loaded!'}
    </>
  );
};

export default App;
