import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Skeleton,
  Stack,
  Text,
  Toast,
  ToastController,
  ToastTransition,
  usePortalManager,
} from '@tonic-ui/react';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningMinorIcon } from '@tonic-ui/react-icons';
import React, { forwardRef, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

const MAX_TOASTS = 1;

const App = () => {
  const portal = usePortalManager();
  const openDrawer = () => {
    portal((close) => (
      <DrawerExample onClose={close} />
    ));
  };

  return (
    <>
      <Button variant="secondary" onClick={openDrawer}>
        Open Drawer
      </Button>
    </>
  );
};

const DrawerExample = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const autoIncrementRef = useRef(0);
  const [toasts, setToasts] = useState([]);

  const notify = (options) => {
    const {
      appearance,
      content,
      duration = null,
      isClosable = true,
    } = { ...options };

    setToasts(prevState => {
      const id = ++autoIncrementRef.current;
      const onClose = () => {
        setToasts(toasts => toasts.filter(x => x.id !== id));
      };
      // You can decide how many toasts you want to show at the same time depending on your use case
      const nextState = [
        ...prevState.slice(MAX_TOASTS > 1 ? -(MAX_TOASTS - 1) : prevState.length),
        {
          id,
          appearance,
          content,
          duration,
          isClosable,
          onClose,
        },
      ];
      return nextState;
    });
  };

  const handleClickAddToastByAppearance = (appearance) => (event) => {
    // Remove current focus
    event.currentTarget.blur();

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
          <Text>The toast will remain visible until the user dismisses it.</Text>
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
      duration: (appearance === 'success') ? 5000 : undefined,
    });
  };

  return (
    <Drawer
      ref={ref}
      backdrop
      closeOnEsc
      closeOnOutsideClick
      isClosable
      isOpen={true}
      onClose={onClose}
      size="md"
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <CustomToastContainer>
          <TransitionGroup
            component={null} // Pass in `component={null}` to avoid a wrapping `<div>` element
          >
            {toasts.map(toast => (
              <ToastTransition
                key={toast?.id}
                in={true}
                unmountOnExit
              >
                <ToastController
                  duration={toast?.duration}
                  onClose={toast?.onClose}
                >
                  <Toast
                    appearance={toast?.appearance}
                    isClosable={toast?.isClosable}
                    onClose={toast?.onClose}
                    mb="2x"
                    minWidth={280} // The toast has a minimum width of 280 pixels
                    width="fit-content"
                  >
                    {toast?.content}
                  </Toast>
                </ToastController>
              </ToastTransition>
            ))}
          </TransitionGroup>
        </CustomToastContainer>
        <DrawerHeader>
          Drawer
        </DrawerHeader>
        <DrawerBody>
          <Box mb="8x">
            <Stack direction="column" spacing="4x">
              <Skeleton width={160} />
              <Skeleton width={240} />
              <Skeleton width={240} />
            </Stack>
          </Box>
          <ButtonGroup
            variant="secondary"
            sx={{
              '> *:not(:first-of-type)': {
                marginLeft: -1
              }
            }}
          >
            <Button columnGap="2x" onClick={handleClickAddToastByAppearance('success')}>
              <SuccessIcon />
              Success
            </Button>
            <Button columnGap="2x" onClick={handleClickAddToastByAppearance('info')}>
              <InfoIcon />
              Info
            </Button>
            <Button columnGap="2x" onClick={handleClickAddToastByAppearance('warning')}>
              <WarningMinorIcon />
              Warning
            </Button>
            <Button columnGap="2x" onClick={handleClickAddToastByAppearance('error')}>
              <ErrorIcon />
              Error
            </Button>
          </ButtonGroup>
        </DrawerBody>
        <DrawerFooter>
          <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

DrawerExample.displayName = 'DrawerExample';

const CustomToastContainer = (props) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    position="absolute"
    top="12x"
    left="50%"
    transform="translateX(-50%)"
    width="max-content"
    maxWidth="80%" // up to 80% of the modal or drawer width
    zIndex="toast"
    {...props}
  />
);

export default App;
