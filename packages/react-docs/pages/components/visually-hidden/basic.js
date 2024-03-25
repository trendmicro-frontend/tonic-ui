import { Button, VisuallyHidden } from '@tonic-ui/react';
import { CheckIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Button variant="secondary">
    <VisuallyHidden>
      Checkmark
    </VisuallyHidden>
    <CheckIcon />
  </Button>
);

export default App;
