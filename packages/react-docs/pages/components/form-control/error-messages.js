import {
  FormControl,
  FormLabel,
  FormInput,
  FormErrorMessage,
} from '@tonic-ui/react';

const App = () => {
  return (
    <FormControl error>
      <FormLabel>Password</FormLabel>
      <FormInput type="password" placeholder="Enter your password" />
      <FormErrorMessage
        errors={[
          'Password must be at least 8 characters',
          'Must include upper and lowercase letters',
          'Must include at least one number',
        ]}
      />
    </FormControl>
  );
};

export default App;
