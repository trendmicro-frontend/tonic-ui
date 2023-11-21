import { Button, Icon, Space } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <>
    <Button variant="ghost" width="8x" height="8x" borderRadius="circle">
      <Icon icon="add" />
    </Button>
    <Space width="2x" />
    <Button variant="ghost" borderRadius="2rem">
      <Icon icon="settings" />
      <Space width="2x" />
      Settings
    </Button>
  </>
);

export default App;
