import { Box, Button, Text } from '@tonic-ui/react';
import { useState } from 'react';
import { Render } from '@/experiments/render';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Box p="4">
      <Render
        when={isLoggedIn}
        fallback={(
          <>
            <Box mb="2x">
              <Text>Please log in.</Text>
            </Box>
            <Button variant="secondary" onClick={toggleLogin}>Log In</Button>
          </>
        )}
      >
        <>
          <Box mb="2x">
            <Text>Welcome back!</Text>
          </Box>
          <Button variant="secondary" onClick={toggleLogin}>Log Out</Button>
        </>
      </Render>
    </Box>
  );
};

export default App;
