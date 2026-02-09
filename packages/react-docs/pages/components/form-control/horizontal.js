import React, { useState } from 'react';
import {
  Stack,
  Flex,
  FormControl,
  FormLabel,
  FormInput,
  FormErrorMessage,
  FormCharacterCount,
} from '@tonic-ui/react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const nameError =
    name.length > 0 && name.length < 2
      ? 'Name must be at least 2 characters'
      : null;
  const emailError =
    email.length > 0 && !email.includes('@')
      ? 'Email must include "@" symbol'
      : null;

  return (
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
        <Flex gridColumn="2">
          <FormErrorMessage errors={nameError} />
          <FormCharacterCount count={name.length} maxCount={20} />
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
        <Flex gridColumn="2">
          <FormErrorMessage errors={emailError} />
          <FormCharacterCount count={email.length} maxCount={50} />
        </Flex>
      </FormControl>

      <FormControl orientation="horizontal">
        <FormLabel width="20x">Phone</FormLabel>
        <FormInput placeholder="Enter your phone number" />
      </FormControl>
    </Stack>
  );
};

export default App;
