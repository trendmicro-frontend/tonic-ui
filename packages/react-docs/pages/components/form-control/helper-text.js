import React from 'react';
import {
  FormControl,
  FormLabel,
  FormInput,
  FormHelperText,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl>
      <FormLabel>Password</FormLabel>
      <FormInput type="password" placeholder="Enter your password" />
      <FormHelperText>
        Password must be at least 8 characters with mixed case letters
      </FormHelperText>
    </FormControl>
  );
};

export default App;
