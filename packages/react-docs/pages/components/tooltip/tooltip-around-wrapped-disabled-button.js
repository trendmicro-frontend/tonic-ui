import { Button, Flex, Tooltip } from '@tonic-ui/react';
const App = () => (
  <Flex>
    <Tooltip label="This is a tooltip" shouldWrapChildren>
      <Button disabled>Button</Button>
    </Tooltip>
  </Flex>
);

export default App;
