import {
  Box,
  Button,
  Stack,
  Toast,
  useColorMode,
  useColorStyle,
  useToastManager,
} from '@tonic-ui/react';
import React from 'react';

const ToastSuccess = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
  >
    This is a success toast.
  </Toast>
);

const ToastInfo = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="info"
  >
    This is an info toast.
  </Toast>
);

const ToastWarning = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="warning"
  >
    This is a warning toast.
  </Toast>
);

const ToastError = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="error"
  >
    This is an error toast.
  </Toast>
);

const ToastLayout = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const boxShadow = colorStyle.shadow.thin;

  return (
    <Box
      fontSize="sm"
      lineHeight="sm"
      textAlign="left"
      boxShadow={boxShadow}
      {...props}
    />
  );
};

const App = () => {
  const toast = useToastManager();
  const handleClickBy = (ToastNotification) => () => {
    toast(({ onClose, placement }) => {
      const isTop = placement.includes('top');
      const toastSpacingKey = isTop ? 'pb' : 'pt';
      const styleProps = {
        [toastSpacingKey]: '2x',
        width: 320,
      };

      return (
        <ToastLayout sx={styleProps}>
          <ToastNotification onClose={onClose} />
        </ToastLayout>
      );
    }, {
      placement: 'bottom-right',
      duration: 5000,
    });
  };
  const toastComponents = [
    ToastSuccess,
    ToastInfo,
    ToastWarning,
    ToastError,
  ];

  return (
    <Stack direction="column" spacing="6x">
      {toastComponents.map((ToastNotification, idx) => (
        <Box key={idx}>
          <Button variant="secondary" onClick={handleClickBy(ToastNotification)}>
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastNotification />
          </ToastLayout>
        </Box>
      ))}
    </Stack>
  );
};

export default App;
