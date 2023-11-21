import {
  ButtonBase,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <ButtonBase
      disabled
      _disabled={{
        // dark mode: rgba(255, 255, 255, .28)
        // light mode: rgba(0, 0, 0, .3)
        opacity: 0.28,
      }}
    >
      Button is disabled
    </ButtonBase>
  );
};

export default App;
