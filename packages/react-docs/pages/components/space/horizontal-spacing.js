import { Button, Space } from '@tonic-ui/react';
import { AddIcon, SettingsIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <>
    <Button variant="ghost" width="8x" height="8x" borderRadius="circle">
      <AddIcon />
    </Button>
    <Space width="2x" />
    <Button variant="ghost" borderRadius="2rem">
      <SettingsIcon />
      <Space width="2x" />
      Settings
    </Button>
  </>
);

export default App;
