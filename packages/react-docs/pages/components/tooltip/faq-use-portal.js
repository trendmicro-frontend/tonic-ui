import { Text, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip
    PopperProps={{ usePortal: true }}
    label="This is a tooltip"
  >
    <Text display="inline-block">Hover Me</Text>
  </Tooltip>
);

export default App;
