import {
  FormControl,
  FormLabel,
  FormInput,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl>
      <FormLabel required>Email Address</FormLabel>
      <FormInput type="email" placeholder="Enter your email" />
    </FormControl>
  );
};

export default App;
