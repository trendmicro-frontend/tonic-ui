import React from 'react';
import {
  FormControl,
  FormLabel,
  FormInput,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl readOnly>
      <FormLabel>Company Name</FormLabel>
      <FormInput value="Acme Corporation" />
    </FormControl>
  );
};

export default App;
