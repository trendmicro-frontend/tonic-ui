import { Alert, Collapse, Text } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);
  return (
    <Collapse in={isOpen} unmountOnExit>
      <Alert variant="solid" severity="success" isClosable onClose={onClose}>
        <Text>This is a success alert.</Text>
      </Alert>
    </Collapse>
  );
};

export default App;
