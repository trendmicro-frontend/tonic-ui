import { Box, Button, Stack, Toast, useColorMode, useColorStyle, useToastManager } from '@tonic-ui/react';
import { CheckCircleOIcon } from '@tonic-ui/react-icons';
import React from 'react';

const ToastWithDefaultIcon = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
  >
    This is a success toast.
  </Toast>
);

const ToastWithProprietaryIcon = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
    icon={<CheckCircleOIcon color="gray:80" />}
  >
    This is a success toast.
  </Toast>
);

const ToastWithoutIcon = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
    icon={false}
  >
    This is a success toast.
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
  const alertToasts = [
    ToastWithDefaultIcon,
    ToastWithProprietaryIcon,
    ToastWithoutIcon,
  ];

  return (
    <Stack direction="column" spacing="6x">
      {alertToasts.map((ToastNotification, idx) => (
        <Box key={idx}>
          <Box mb="4x">
            <Button variant="secondary" onClick={handleClickBy(ToastNotification)}>
              Show
            </Button>
          </Box>
          <ToastLayout>
            <ToastNotification />
          </ToastLayout>
        </Box>
      ))}
    </Stack>
  );
};

export default App;
