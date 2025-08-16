import { Box, TextLabel, Input, Stack } from '@tonic-ui/react';
import { useId } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  // Auto-generated IDs
  const emailId = useId();
  const passwordId = useId();

  return (
    <Box display="flex" flexDirection="column" rowGap="3x">
      <Box>
        <TextLabel htmlFor={emailId}>Email</TextLabel>
        <Input id={emailId} type="email" placeholder="Enter your email" />
      </Box>

      <Box>
        <TextLabel htmlFor={passwordId}>Password</TextLabel>
        <Input
          id={passwordId}
          type="password"
          placeholder="Enter your password"
        />
      </Box>

      <Stack p="2x">
        <Box mb="2x">Generated IDs:</Box>
        <Box>
          <Box>Email ID: {emailId || 'undefined'}</Box>
          <Box>Password ID: {passwordId || 'undefined'}</Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default App;
