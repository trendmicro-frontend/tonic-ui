import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Collapse,
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
  ToastController,
  ToastTransition,
  ToastTransitionGroup,
  useColorStyle,
} from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils/src';
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

describe('Toast', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const message = 'This is a toast message';
    const handleClose = jest.fn();

    const TestComponent = ({ onClose }) => {
      const [isOpen, toggle] = useToggle(true);
      return (
        <Collapse in={isOpen} unmountOnExit>
          <Toast
            appearance="success"
            isClosable
            onClose={callEventHandlers(() => toggle(false), onClose)}
            data-testid="toast"
          >
            {message}
          </Toast>
        </Collapse>
      );
    };

    render(<TestComponent onClose={handleClose} />);

    const toastElement = screen.getByTestId('toast');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent(message);

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      timeout: transitionDuration.standard + 100, // see "transitions/Collapse.js"
    });
  });

  test('should display a toast within a modal', async () => {
    const user = userEvent.setup();

    const TestComponent = ({ onClose }) => {
      const [colorStyle] = useColorStyle();
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
                        data-testid="toast"
                      >
                        <Text pr="10x">{toast.content}</Text>
                        <ToastCloseButton top={10} right={8} position="absolute" data-testid="toast-close-button" />
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
