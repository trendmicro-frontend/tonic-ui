import React from 'react';
import {
  FormControl,
  FormLabel,
  FormInput,
  FormErrorMessage,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl error>
      <FormLabel>Email Address</FormLabel>
      <FormInput type="email" placeholder="Enter your email" />
      <FormErrorMessage errors="Please enter a valid email address" />
    </FormControl>
  );
};

export default App;
