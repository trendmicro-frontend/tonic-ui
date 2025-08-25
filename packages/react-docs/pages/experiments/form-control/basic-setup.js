import React, { useState } from 'react';
import { Box, Flex, Stack } from '@tonic-ui/react';
import {
  FormControl,
  FormInput,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormCharacterCount,
} from '@/experiments/form-control';

const App = () => {
  const [bio, setBio] = useState('');
  const maxChars = 20;

  return (
    <Stack direction="column" spacing="6x">
      {/* 1. Basic field with helper text */}
      <Box>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <FormInput placeholder="Enter your username" />
          <FormErrorMessage errors={['This field has an error']} />
          <FormHelperText>
            Choose a unique username that others will see
          </FormHelperText>
        </FormControl>
      </Box>

      {/* 2. Required field with helper text */}
      <Box>
        <FormControl>
          <FormLabel required>Email Address</FormLabel>
          <FormInput type="email" placeholder="Enter your email" />
          <FormErrorMessage errors={['Please enter a valid email']} />
          <FormHelperText>
            We&apos;ll use this to send you important updates
          </FormHelperText>
        </FormControl>
      </Box>

      {/* 3. Invalid field with multiple errors */}
      <Box>
        <FormControl error>
          <FormLabel>Password</FormLabel>
          <FormInput type="password" placeholder="Enter your password" />
          <FormErrorMessage
            errors={[
              'Password must be at least 8 characters.',
              'Must include upper and lowercase letters.',
            ]}
          />
          <FormHelperText>Use a strong password for security</FormHelperText>
        </FormControl>
      </Box>

      {/* 4. Read-only field */}
      <Box>
        <FormControl readOnly>
          <FormLabel>Company Name</FormLabel>
          <FormInput value="Acme Corporation" />
          <FormHelperText>This field is read-only</FormHelperText>
        </FormControl>
      </Box>

      {/* 5. Disabled field */}
      <Box>
        <FormControl disabled>
          <FormLabel>Phone Number</FormLabel>
          <FormInput placeholder="Disabled field" />
          <FormHelperText>This field is currently disabled</FormHelperText>
        </FormControl>
      </Box>

      {/* 6. Field with Character Count */}
      <Box>
        <FormControl error={bio.length > maxChars}>
          <FormLabel required>About You</FormLabel>
          <FormInput
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Flex justifyContent="space-between">
            <Stack flexDirection="column" gap="1x">
              <FormErrorMessage errors={['Exceeded maximum character limit']} />
              <FormHelperText>Maximum {maxChars} characters</FormHelperText>
            </Stack>
            <FormCharacterCount value={bio} max={maxChars} />
          </Flex>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default App;
