import {
  Collapse,
  Text,
  Toast,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Toast appearance="success" isClosable onClose={onClose} width={320}>
        <Text>This is a success toast.</Text>
      </Toast>
    </Collapse>
  );
};

export default App;
