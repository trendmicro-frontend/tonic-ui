import {
  FormControl,
  FormLabel,
  FormInput,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl disabled>
      <FormLabel>Phone Number</FormLabel>
      <FormInput placeholder="Disabled field" />
    </FormControl>
  );
};

export default App;
