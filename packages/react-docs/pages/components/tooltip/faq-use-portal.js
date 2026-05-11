import { Text, Tooltip } from '@tonic-ui/react';

const App = () => (
  <Tooltip
    portalled
    label="This is a tooltip"
  >
    <Text display="inline-block">Hover Me</Text>
  </Tooltip>
);

export default App;
