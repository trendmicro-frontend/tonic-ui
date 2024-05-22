import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Skeleton,
  Space,
  Stack,
  Text,
  Toast,
  ToastController,
  ToastTransition,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon } from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

const MAX_TOASTS = 1;

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

let autoIncrementIndex = 0;

const App = () => {
  const [colorStyle] = useColorStyle();
  const [toasts, setToasts] = useState([]);

  const notify = (options) => {
    const {
      appearance,
      content,
      duration = null,
      isClosable = true,
    } = { ...options };

    setToasts(prevState => {
      const id = ++autoIncrementIndex;
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

  const handleClickCloseToasts = () => {
    closeAll();
  };

  return (<>
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
      <DrawerContent
        margin={0}
        minHeight={400}
        minWidth={320}
        width="50%"
      >
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
                    sx={{
                      mb: '2x',
                      minWidth: 280, // The toast has a minimum width of 280 pixels
                      width: 'fit-content',
                      boxShadow: colorStyle.shadow.thin,
                    }}
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
          <Stack direction="column" spacing="4x">
            <Skeleton width={160} />
            <Skeleton width={240} />
            <Skeleton width={240} />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
            <Button variant="primary">
              OK
            </Button>
            <Button>
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Flex>
  </>);
};

export default App;
