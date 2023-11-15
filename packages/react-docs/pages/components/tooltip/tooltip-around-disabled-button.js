import { Button, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip label="This is a tooltip">
    <Button disabled>Button</Button>
  </Tooltip>
);

export default App;
