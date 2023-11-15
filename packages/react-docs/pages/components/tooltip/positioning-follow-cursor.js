import { Text, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip label="This is a tooltip" followCursor>
    <Text display="inline-block">Hover Me</Text>
  </Tooltip>
);

export default App;
