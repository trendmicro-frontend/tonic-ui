import {
  Box,
  Button,
  Flex,
  Link,
  Space,
  Stack,
  Text,
  Toast,
  useColorMode,
  useColorStyle,
  useToastManager,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const ActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    variant="secondary"
    borderColor="black:primary"
    color="black:primary"
    sx={{
      ':active': {
        color: 'black:primary',
      },
      ':focus': {
        color: 'black:primary',
      },
      ':hover': {
        background: 'rgba(0, 0, 0, 0.12)',
        color: 'black:primary',
      },
      ':hover:not(:focus)': {
        boxShadow: 'none',
      },
    }}
    {...props}
  />
));
ActionButton.displayName = 'ActionButton';

const ToastSimple = ({ onClose }) => (
  <Toast isClosable onClose={onClose}>
    <Text>This is a toast notification.</Text>
  </Toast>
);

const ToastWithIcon = ({ onClose }) => (
  <Toast isClosable onClose={onClose} py="4x">
    <Flex alignItems="flex-start">
      <Box
        bg="gray:40"
        height={48}
        minWidth={48}
      />
      <Space minWidth="4x" />
      <Text>This is a toast notification.</Text>
    </Flex>
  </Toast>
);

const ToastWithTitle = ({ onClose }) => (
  <Toast isClosable onClose={onClose} py="4x">
    <Box mb="2x">
      <Text fontWeight="bold">Notification Title</Text>
    </Box>
    <Box mr="-10x">
      <Text>This is a toast notification.</Text>
    </Box>
  </Toast>
);

const ToastWithActionButton = ({ onClose }) => (
  <Toast isClosable onClose={onClose} py="4x">
    <Box mb="6x">
      <Text>This is a toast notification.</Text>
    </Box>
    <Flex justifyContent="flex-end" mr="-10x">
      <ActionButton
        // See above for the ActionButton component
        size="sm"
      >
        Action Button
      </ActionButton>
    </Flex>
  </Toast>
);

const ToastWithActionLink = ({ onClose }) => (
  <Toast isClosable onClose={onClose} py="4x">
    <Box mb="6x">
      <Text>This is a toast notification.</Text>
    </Box>
    <Flex justifyContent="flex-end" mr="-10x">
      <Link>Action Link</Link>
    </Flex>
  </Toast>
);

const ToastWithAllTogether = ({ onClose }) => (
  <Toast isClosable onClose={onClose} py="4x">
    <Box mb="2x">
      <Text fontWeight="bold">Notification Title</Text>
    </Box>
    <Flex alignItems="flex-start" mb="6x">
      <Box
        bg="gray:40"
        height={48}
        minWidth={48}
      />
      <Space minWidth="4x" />
      <Text>This is a toast notification.</Text>
    </Flex>
    <Flex justifyContent="flex-end" mr="-10x">
      <ActionButton
        // See above for the ActionButton component
        size="sm"
      >
        Action Button
      </ActionButton>
    </Flex>
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

  return (
    <>
      <Stack direction="column" spacing="6x">
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastSimple)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastSimple />
          </ToastLayout>
        </Box>
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastWithIcon)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastWithIcon />
          </ToastLayout>
        </Box>
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastWithTitle)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastWithTitle />
          </ToastLayout>
        </Box>
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastWithActionButton)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastWithActionButton />
          </ToastLayout>
        </Box>
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastWithActionLink)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastWithActionLink />
          </ToastLayout>
        </Box>
        <Box>
          <Button
            variant="secondary"
            onClick={handleClickBy(ToastWithAllTogether)}
          >
            Show
          </Button>
          <ToastLayout mt="4x">
            <ToastWithAllTogether />
          </ToastLayout>
        </Box>
      </Stack>
    </>
  );
};

export default App;
