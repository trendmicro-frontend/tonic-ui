import { Global, css } from '@emotion/react';
import {
  Button,
  useColorMode,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode, setColorMode] = useColorMode(); // One of: 'dark', 'light'
  const toggleColorMode = () => {
    const nextColorMode = {
      'dark': 'light',
      'light': 'dark',
    }[colorMode];
    setColorMode(nextColorMode);
  };

  return (
    <>
      <Global
        styles={css`
          :root, :host {
            color-scheme: ${colorMode};
          }
        `}
      />
      <Button onClick={toggleColorMode}>
        Toggle Color Mode
      </Button>
    </>
  );
};

export default App;
