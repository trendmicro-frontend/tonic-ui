import { Button, Icon, VisuallyHidden } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Button variant="secondary">
    <VisuallyHidden>
      Checkmark
    </VisuallyHidden>
    <Icon icon="check" />
  </Button>
);

export default App;
