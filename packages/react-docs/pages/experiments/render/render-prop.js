import { Text } from '@tonic-ui/react';
import { isNullish } from '@tonic-ui/utils';
import React from 'react';
import { Render } from '@/experiments/render';

const App = () => {
  const value = 0;

  return (
    <Render
      when={!isNullish(value)}
    >
      {(when) => (
        <Text>Value: {value}</Text>
      )}
    </Render>
  )
};

export default App;
