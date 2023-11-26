import { Fade, Tag, TagCloseButton, Text } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, onClose] = useToggle(true);
  return (
    <Fade in={isOpen} unmountOnExit>
      <Tag variant="solid" onClose={onClose}>
        <Text>This is a tag</Text>
        <TagCloseButton ml="2x" data-test="tag-close-button" />
      </Tag>
    </Fade>
  );
};

export default App;
