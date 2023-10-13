import {
  Box,
  Button,
  Text,
  Toast,
  useToastManager,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const toast = useToastManager();
  const handleClickOpenToast = () => {
    const render = ({ onClose, placement }) => {
      const styleProps = {
        'top-left': { pt: '2x', px: '4x' },
        'top': { pt: '2x', px: '4x' },
        'top-right': { pt: '2x', px: '4x' },
        'bottom-left': { pb: '2x', px: '4x' },
        'bottom': { pb: '2x', px: '4x' },
        'bottom-right': { pb: '2x', px: '4x' },
      }[placement];

      return (
        <Box
          {...styleProps}
          width={320}
        >
          <Toast isClosable onClose={onClose}>
            <Text>This is a toast notification</Text>
          </Toast>
        </Box>
      );
    };
    const options = {
      placement: 'bottom-right',
      duration: 5000,
    };
    toast(render, options);
  };

  return (
    <Button onClick={handleClickOpenToast}>
      Open Toast
    </Button>
  );
};

export default App;
