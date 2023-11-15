import { Text, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip label="This is a tooltip">
    <Text display="inline-block" tabIndex="0">Text content</Text>
  </Tooltip>
);

export default App;
