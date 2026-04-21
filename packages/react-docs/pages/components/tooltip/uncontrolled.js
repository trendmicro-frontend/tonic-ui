import { Text, Tooltip } from '@tonic-ui/react';

const App = () => (
  <Tooltip
    label="This is an uncontrolled tooltip"
    defaultIsOpen={true}
  >
    <Text display="inline-block">Text content</Text>
  </Tooltip>
);

export default App;
