import {
  Box,
  Button,
  Icon,
  Stack,
  Toast,
  useColorMode,
  useColorStyle,
  useToastManager,
} from '@tonic-ui/react';
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

const ToastWithAnotherIcon = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
    icon="check-circle-o"
  >
    This is a success toast.
  </Toast>
);

const ToastWithProprietaryIcon = ({ onClose }) => (
  <Toast
    isClosable
    onClose={onClose}
    appearance="success"
    icon={<Icon icon="check-circle-o" color="gray:80" />}
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
      width={320}
      {...props}
    />
  );
};

const App = () => {
  const toast = useToastManager();
  const handleClickBy = (ToastNotification) => () => {
    toast(({ onClose, placement }) => {
      return (
        <ToastLayout>
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
    ToastWithAnotherIcon,
    ToastWithProprietaryIcon,
    ToastWithoutIcon,
  ];

  return (
    <Stack direction="column" spacing="6x">
      {alertToasts.map((ToastNotification, idx) => (
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
