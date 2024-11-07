import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Space,
  Stack,
  Text,
  Toast,
  ToastController,
  ToastTransition,
  ToastTransitionGroup,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon } from '@tonic-ui/react-icons';
import React, { useState } from 'react';

const MAX_TOASTS = 1;

const InlineToastContainer = (props) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    position="absolute"
    top="12x"
    left="50%"
    transform="translateX(-50%)"
    width="max-content"
    maxWidth="80%" // up to 80% of the modal width
    zIndex="toast"
    {...props}
  />
);

let autoIncrementIndex = 0;

const App = () => {
  const [colorStyle] = useColorStyle();
  const [toasts, setToasts] = useState([]);

  const notify = (options) => {
    const {
      appearance,
      content,
      duration,
    } = { ...options };

    setToasts(prevState => {
      const id = ++autoIncrementIndex;
      // You can decide how many toasts you want to show at the same time depending on your use case
      const nextState = [
        ...prevState.slice(MAX_TOASTS > 1 ? -(MAX_TOASTS - 1) : prevState.length),
        {
          id,
          appearance,
          content,
          duration,
        },
      ];
      return nextState;
    });
  };

  const closeToast = (id) => {
    setToasts(toasts => toasts.filter(x => x.id !== id));
  };

  const closeAll = () => {
    setToasts([]);
  };

  const handleClickAddToastByAppearance = (appearance) => (event) => {
    const content = {
      success: (
        <>
          <Text>This is a success message.</Text>
          <Text>The toast will be automatically dismissed after 5 seconds.</Text>
        </>
      ),
      info: (
        <>
          <Text>This is an info message.</Text>
          <Text>The toast will be automatically dismissed after 5 seconds.</Text>
        </>
      ),
      warning: (
        <>
          <Text>This is a warning message.</Text>
          <Text>The toast will remain visible until the user dismisses it.</Text>
        </>
      ),
      error: (
        <>
          <Text>This is an error message.</Text>
          <Text>The toast will remain visible until the user dismisses it.</Text>
        </>
      ),
    }[appearance];

    notify({
      appearance,
      content,
      duration: (appearance === 'success' || appearance === 'info') ? 5000 : undefined,
    });
  };

  const createCloseToastHandler = (id) => () => {
    closeToast(id);
  };

  const handleClickCloseToasts = () => {
    closeAll();
  };

  return (
    <>
      <Flex justifyContent="space-between" columnGap="4x">
        <Flex flexWrap="wrap" columnGap="2x" rowGap="2x">
          <Button variant="secondary" onClick={handleClickAddToastByAppearance('success')}>
            Show Success Message
          </Button>
          <Button variant="secondary" onClick={handleClickAddToastByAppearance('info')}>
            Show Info Message
          </Button>
          <Button variant="secondary" onClick={handleClickAddToastByAppearance('warning')}>
            Show Warning Message
          </Button>
          <Button variant="secondary" onClick={handleClickAddToastByAppearance('error')}>
            Show Error Message
          </Button>
        </Flex>
        <Box>
          <Button variant="secondary" onClick={handleClickCloseToasts}>
            <CloseSIcon />
            <Space width="2x" />
            Close
          </Button>
        </Box>
      </Flex>
      <Divider my="4x" />
      <Flex columnGap="4x">
        <ModalContent
          margin={0}
          minHeight={400}
          minWidth={320}
          width="50%"
        >
          <InlineToastContainer>
            <ToastTransitionGroup>
              {toasts.map(toast => {
                const onClose = createCloseToastHandler(toast.id);
                return (
                  <ToastTransition
                    key={toast.id}
                    in
                    unmountOnExit
                  >
                    <ToastController
                      duration={toast.duration}
                      onClose={onClose}
                    >
                      <Toast
                        appearance={toast.appearance}
                        isClosable={true}
                        onClose={onClose}
                        sx={{
                          mb: '2x',
                          minWidth: 280, // The toast has a minimum width of 280 pixels
                          width: 'fit-content',
                          boxShadow: colorStyle.shadow.thin,
                        }}
                      >
                        {toast.content}
                      </Toast>
                    </ToastController>
                  </ToastTransition>
                );
              })}
            </ToastTransitionGroup>
          </InlineToastContainer>
          <ModalHeader>
            Modal
          </ModalHeader>
          <ModalBody>
            <Stack direction="column" spacing="4x">
              <Skeleton width={160} />
              <Skeleton width={240} />
              <Skeleton width={240} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
              <Button variant="primary">
                OK
              </Button>
              <Button>
                Cancel
              </Button>
            </Grid>
          </ModalFooter>
        </ModalContent>
      </Flex>
    </>
  );
};

export default App;
