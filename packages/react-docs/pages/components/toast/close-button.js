import {
  Collapse,
  Text,
  Toast,
  ToastCloseButton,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Toast appearance="success" onClose={onClose} width={320}>
        <Text pr="10x">This is a success toast.</Text>
        <ToastCloseButton top={10} right={8} position="absolute" data-test="toast-close-button" />
      </Toast>
    </Collapse>
  );
};

export default App;
