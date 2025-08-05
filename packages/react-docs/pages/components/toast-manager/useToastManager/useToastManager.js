import {
  Box,
  Button,
  Text,
  Toast,
  useToastManager,
} from '@tonic-ui/react';
import React, { useCallback } from 'react';

const App = () => {
  const toast = useToastManager();
  const handleClickOpenToast = useCallback(() => {
    const render = ({ id, data, onClose, placement }) => {
      const isTop = placement.includes('top');
      const toastSpacingKey = isTop ? 'pb' : 'pt';
      const styleProps = {
        [toastSpacingKey]: '2x',
        width: 320,
      };

      return (
        <Box sx={styleProps}>
          <Toast data-toast-id={id} isClosable onClose={onClose}>
            <Text>This is a toast notification</Text>
          </Toast>
        </Box>
      );
    };
    const options = {
      placement: 'bottom-right',
      data: {
        foo: 'bar',
      },
      duration: 5000,
    };
    toast(render, options);
  }, [toast]);

  return (
    <Button onClick={handleClickOpenToast}>
      Open Toast
    </Button>
  );
};

export default App;
