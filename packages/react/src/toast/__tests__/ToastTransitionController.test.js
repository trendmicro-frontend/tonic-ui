import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Flex,
  Grid,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Stack,
  Text,
  Toast,
  ToastCloseButton,
  ToastTransitionController,
  ToastTransitionGroup,
} from '@tonic-ui/react/src';
import { transitionDuration } from '@tonic-ui/utils/src';
import React, { useState } from 'react';

const InlineToastContainer = (props) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    position="absolute"
    top="12x"
    left="50%"
    transform="translateX(-50%)"
    width="max-content"
    maxWidth="80%" // up to 80% of the drawer width
    zIndex="toast"
    {...props}
  />
);

describe('ToastTransitionController', () => {
  test('should display a toast within a modal', async () => {
    const user = userEvent.setup();

    const TestComponent = ({ onClose }) => {
      const [toasts, setToasts] = useState([
        {
          id: 1,
          appearance: 'success',
          content: 'This is a success message.',
          duration: 5000,
        },
      ]);
      const closeToast = (id) => {
        setToasts(toasts => toasts.filter(x => x.id !== id));
      };
      const createCloseToastHandler = (id) => () => {
        closeToast(id);
      };

      return (
        <ModalContent
          margin={0}
          minHeight={400}
          minWidth={320}
          width="50%"
        >
          <InlineToastContainer>
            <ToastTransitionGroup>
              {toasts.map(toast => (
                <ToastTransitionController
                  key={toast.id}
                  duration={toast.duration}
                  onClose={createCloseToastHandler(toast.id)}
                >
                  {({ onClose }) => (
                    <Toast
                      appearance={toast.appearance}
                      isClosable={true}
                      onClose={onClose}
                      sx={{
                        mb: '2x',
                        minWidth: 280,
                        width: 'fit-content',
                      }}
                      data-testid="toast"
                    >
                      <Text pr="10x">{toast.content}</Text>
                      <ToastCloseButton top={10} right={8} position="absolute" data-testid="toast-close-button" />
                    </Toast>
                  )}
                </ToastTransitionController>
              ))}
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
      );
    };

    render(
      <TestComponent />
    );

    // Verify the toast is displayed
    expect(screen.getByText('This is a success message.')).toBeInTheDocument();

    // Simulate closing the toast
    const toastCloseButton = screen.getByTestId('toast-close-button');
    await user.click(toastCloseButton);

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      timeout: transitionDuration.standard + 100, // see "transitions/Collapse.js"
    });
  });
});
