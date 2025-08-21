import React, { useState } from 'react';
import {
  Box,
  Stack,
  Flex,
  Text,
  Divider,
  Tooltip,
} from '@tonic-ui/react';
import { InfoOIcon } from '@tonic-ui/react-icons';
import {
  FormControl,
  FormInput,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormCharacterCount,
} from '@/experiments/form-control';

// InfoTip component using Tooltip
const InfoTip = ({ label }) => {
  return (
    <Tooltip label={label}>
      <InfoOIcon
        cursor="help"
        color="gray:50"
        _hover={{
          color: 'gray:60',
        }}
      />
    </Tooltip>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Validation logic
  const nameError =
    name.length > 0 && name.length < 2
      ? 'Name must be at least 2 characters'
      : null;
  const emailError = [];
  if (email.length > 0 && !email.includes('@')) {
    emailError.push('Email must include "@" symbol');
  }
  if (email.length > 0 && !/\.[a-zA-Z]{2,}$/.test(email)) {
    emailError.push('Email must include a valid domain (e.g., .com, .net)');
  }
  if (email.length > 0 && email.length < 5) {
    emailError.push('Email must be at least 5 characters');
  }

  return (
    <Stack direction="column" spacing="8x">
      <Text fontSize="xl" fontWeight="semibold">
        Custom Styling Examples
      </Text>

      {/* Horizontal Layout */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb="4x">
          Horizontal Layout with Character Count
        </Text>

        <Stack direction="column" spacing="4x">
          <FormControl orientation="horizontal" error={!!nameError}>
            <FormLabel width="20x" required>
              Name
            </FormLabel>
            <FormInput
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Flex
              justifyContent="space-between"
              flexDirection="row-reverse"
              alignItems="center"
              gridColumn="2"
            >
              <FormCharacterCount value={name} max={20} />
              <FormErrorMessage errors={nameError} />
            </Flex>
          </FormControl>

          <FormControl orientation="horizontal" error={!!emailError}>
            <FormLabel width="20x" required>
              Email
            </FormLabel>
            <FormInput
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Flex gridColumn="2" justifyContent="space-between">
              <Stack flexDirection="column" gap="1x">
                <FormErrorMessage errors={emailError} />
                <FormHelperText>
                  This is a required field. Please enter a valid email.
                </FormHelperText>
              </Stack>
              <FormCharacterCount value={email} max={50} />
            </Flex>
          </FormControl>

          <FormControl orientation="horizontal">
            <FormLabel width="20x">Phone</FormLabel>
            <FormInput placeholder="Enter your phone number" />
            <FormHelperText>
              This is an optional field. Please enter a valid phone number.
            </FormHelperText>
          </FormControl>
        </Stack>
      </Box>

      <Divider />

      {/* Custom Indicators & InfoTip */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb="4x">
          Custom Indicators & InfoTip
        </Text>

        <Stack direction="column" spacing="4x">
          {/* Custom required indicator with text */}
          <FormControl gap="1x">
            <Flex>
              <FormLabel>Email</FormLabel>
              <Text color="red:50" fontSize="xs" ml="2x">
                (optional)
              </Text>
            </Flex>
            <FormInput placeholder="Custom text indicator" />
          </FormControl>

          {/* Label with InfoTip */}
          <FormControl gap="1x">
            <Flex alignItems="center" gap="2x">
              <FormLabel required>API Key</FormLabel>
              <InfoTip label="Your API key is used to authenticate requests. Keep it secure and don't share it publicly." />
            </Flex>
            <FormInput placeholder="Enter your API key" />
          </FormControl>

          {/* Error message with InfoTip */}
          <FormControl error gap="1x">
            <FormLabel required>Password</FormLabel>
            <FormInput type="password" placeholder="Enter password" />
            <FormErrorMessage
              errors={[
                <Flex key="password-length" alignItems="center" gap="2x">
                  <Text>Password must contain at least 8 characters</Text>
                  <InfoTip label="Use a mix of uppercase, lowercase, numbers, and special characters for better security." />
                </Flex>,
                'Must include at least one uppercase letter',
                <Flex key="password-number" alignItems="center" gap="2x">
                  <Text>Must include at least one number</Text>
                  <InfoTip label="Numbers help make your password more secure against common attacks." />
                </Flex>,
              ]}
            />
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};

export default App;
