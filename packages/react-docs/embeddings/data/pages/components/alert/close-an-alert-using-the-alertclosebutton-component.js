import { Alert, AlertCloseButton, Collapse, Text } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);
  return (
    <Collapse in={isOpen} unmountOnExit>
      <Alert variant="solid" severity="success" onClose={onClose}>
        <Text pr="10x">This is a success alert.</Text>
        <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
      </Alert>
    </Collapse>
  );
};

export default App;
