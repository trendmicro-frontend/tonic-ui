import { Box, Code, TextLabel, Input, Stack, Text, Divider, useColorStyle } from '@tonic-ui/react';
import { useId } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();
  // Form field IDs
  const emailId = useId();
  const passwordId = useId();
  
  // ARIA relationship IDs
  const emailHelperId = useId();
  const passwordHelperId = useId();
  
  // Component instance ID
  const formId = useId();

  return (
    <Box>
      <Box mb="3x">
        <Stack spacing="1x">
          <TextLabel htmlFor={emailId}>Email:</TextLabel>
          <Input
            id={emailId}
            type="email"
            placeholder="Enter your email"
            aria-describedby={emailHelperId}
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
          <Text>Form ID: <Code>{formId}</Code></Text>
          <Text>Email field ID: <Code>{emailId}</Code></Text>
          <Text>Email helper ID: <Code>{emailHelperId}</Code></Text>
          <Text>Password field ID: <Code>{passwordId}</Code></Text>
          <Text>Password helper ID: <Code>{passwordHelperId}</Code></Text>
        </Stack>
        <Divider my="3x" />
        <Text color={colorStyle.color.secondary}>
          Note: IDs may show as <Code>undefined</Code> during SSR with React {'<'} 18
        </Text>
      </Box>
    </Box>
  );
};

export default App;
