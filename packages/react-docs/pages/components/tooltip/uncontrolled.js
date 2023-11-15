import { Text, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip
    label="This is an uncontrolled tooltip"
    defaultIsOpen={false}
  >
    <Text display="inline-block">Text content</Text>
  </Tooltip>
);

export default App;
