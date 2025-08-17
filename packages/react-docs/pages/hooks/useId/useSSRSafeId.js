import { Box, Code, TextLabel, Input, Stack, Text, Divider, useColorStyle } from '@tonic-ui/react';
import useSSRSafeId from '@tonic-ui/react-hooks/src/internal/useSSRSafeId';
import React from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();
  
  // Form field IDs
  const emailId = useSSRSafeId();
  const passwordId = useSSRSafeId();
  
  // ARIA relationship IDs
  const passwordHelperId = useSSRSafeId();
  
  return (
    <Box>
      <Box mb="3x">
        <Stack spacing="1x">
          <TextLabel htmlFor={emailId}>Email:</TextLabel>
          <Input
            id={emailId}
            type="email"
            placeholder="Enter your email"
          />
        </Stack>
      </Box>
      <Box>
        <Stack spacing="1x">
          <TextLabel htmlFor={passwordId}>Password:</TextLabel>
          <Input
            id={passwordId}
            type="password"
            placeholder="Enter your password"
            aria-describedby={passwordHelperId}
          />
          <Text id={passwordHelperId} color={colorStyle.color.secondary}>
            Must be at least 8 characters long
          </Text>
        </Stack>
      </Box>
      <Divider my="3x" />
      <Box>
        <Text fontWeight="semibold" mb="2x">
          Generated IDs
        </Text>
        <Stack spacing="1x">
          <Text>Email field ID: <Code>{emailId}</Code></Text>
          <Text>Password field ID: <Code>{passwordId}</Code></Text>
          <Text>Password helper ID: <Code>{passwordHelperId}</Code></Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default App;
