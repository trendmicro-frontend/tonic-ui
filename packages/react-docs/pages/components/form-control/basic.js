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
      <FormLabel>Username</FormLabel>
      <FormInput placeholder="Enter your username" />
      <FormHelperText>
        Choose a unique username that others will see
      </FormHelperText>
    </FormControl>
  );
};

export default App;
