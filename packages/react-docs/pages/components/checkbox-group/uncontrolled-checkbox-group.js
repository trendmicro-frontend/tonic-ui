import { Checkbox, CheckboxGroup, Stack } from '@tonic-ui/react';
const App = () => (
  <CheckboxGroup defaultValue={['apple']}>
    <Stack direction="column" spacing="1x" shouldWrapChildren>
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
      <Checkbox value="papaya">Papaya</Checkbox>
    </Stack>
  </CheckboxGroup>
);

export default App;
