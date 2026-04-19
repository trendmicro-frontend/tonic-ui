import { Checkbox, Flex } from '@tonic-ui/react';
const App = () => (
  <Flex columnGap="6x">
    <Checkbox variantColor="red" defaultChecked>
      Label
    </Checkbox>
    <Checkbox variantColor="green" defaultChecked>
      Label
    </Checkbox>
  </Flex>
);

export default App;
