import { Fade, Tag, Text } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);
  return (
    <Fade in={isOpen} unmountOnExit>
      <Tag variant="solid" isClosable onClose={onClose}>
        <Text>This is a tag</Text>
      </Tag>
    </Fade>
  );
};

export default App;
