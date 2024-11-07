import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Button, Toast, ToastCloseButton, ToastManager, useToastManager } from '@tonic-ui/react/src';
import { transitionDuration } from '@tonic-ui/utils/src';
import React, { useCallback, useRef } from 'react';

describe('ToastManager', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );
    const TestComponent = () => {
      const toast = useToastManager();
      const handleClick = useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid="toast"
            >
              {message}
            </Toast>
          );
        }, { placement });
      }, [toast]);

      return (
        <Button onClick={handleClick}>
          Add Toast
        </Button>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);
    const toastElement = screen.getByTestId('toast');
    expect(toastPlacementElement).toContainElement(toastElement);
    expect(toastElement).toHaveTextContent(message);
  });

  it('should render into a custom container', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => {
      const ref = useRef(null);
      return (
        <>
          <Box ref={ref} data-testid="custom-container" />
          <ToastManager containerRef={ref} {...props} />
        </>
      );
    };
    const TestComponent = () => {
      const toast = useToastManager();
      const handleClick = useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid="toast"
            >
              {message}
            </Toast>
          );
        }, { placement });
      }, [toast]);

      return (
        <Button onClick={handleClick}>
          Add Toast
        </Button>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastElement = screen.getByTestId('toast');
    expect(toastElement).toHaveTextContent(message);

    const customContainer = screen.getByTestId('custom-container');
    expect(customContainer).toContainElement(toastElement);
  });

  it('should dismiss the toast after a certain amount of time', async () => {
    const user = userEvent.setup();

    const duration = 100; // Shorten the duration to 100ms for testing
    const placement = 'bottom-right';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );
    const TestComponent = () => {
      const toast = useToastManager();
      const handleClick = useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid="toast"
            >
              {message}
            </Toast>
          );
        }, {
          duration,
          placement,
        });
      }, [toast]);

      return (
        <Button onClick={handleClick}>
          Add Toast
        </Button>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastElement = screen.getByTestId('toast');
    expect(toastElement).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      // The toast should be removed after the duration plus the transition.
      timeout: duration + transitionDuration.standard + 100, // see "toast/ToastTransition.js"
    });
  });

  it('should close a toast', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );
    const TestComponent = () => {
      const toastCounterRef = useRef(0);
      const toast = useToastManager();
      const handleClickAddToast = useCallback(() => {
        const testId = ++toastCounterRef.current;
        const toastTestId = `toast-${testId}`;
        const toastCloseButtonTestId = `toast-close-button-${testId}`;
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              onClose={onClose}
              data-testid={toastTestId}
            >
              {message}
              <ToastCloseButton top={10} right={8} position="absolute" data-testid={toastCloseButtonTestId} />
            </Toast>
          );
        }, { placement });
      }, [toast]);

      return (
        <Button onClick={handleClickAddToast}>
          Add Toast
        </Button>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const addToastButton = await screen.findByText('Add Toast');

    // Generate more than the maximum number of toasts
    await user.click(addToastButton);
    await user.click(addToastButton);
    await user.click(addToastButton);

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);

    await waitFor(() => {
      expect(toastPlacementElement.childNodes.length).toBe(3);
    });

    // Close the second toast
    const toastCloseButton = screen.getByTestId('toast-close-button-2');
    expect(toastCloseButton).toBeInTheDocument();
    await user.click(toastCloseButton);

    await waitFor(() => {
      expect(toastPlacementElement.childNodes.length).toBe(2);
    });

    expect(screen.getByTestId('toast-close-button-1')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-close-button-2')).not.toBeInTheDocument(); // use queryBy* only when an element is not present
    expect(screen.getByTestId('toast-close-button-3')).toBeInTheDocument();
  });

  it('should close all toasts', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );
    const TestComponent = () => {
      const toast = useToastManager();
      const handleClickAddToast = useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid="toast"
            >
              {message}
            </Toast>
          );
        }, { placement });
      }, [toast]);
      const handleClickCloseToasts = useCallback(() => {
        toast.closeAll();
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToast}>
            Add Toast
          </Button>
          <Button onClick={handleClickCloseToasts}>
            Close All
          </Button>
        </>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const addToastButton = await screen.findByText('Add Toast');
    const closeAllButton = await screen.findByText('Close All');

    await user.click(addToastButton);
    await user.click(addToastButton);
    await user.click(addToastButton);

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);
    expect(toastPlacementElement.childNodes.length).toBe(3);

    await user.click(closeAllButton);

    await waitFor(() => {
      expect(toastPlacementElement.childNodes.length).toBe(0);
    });
  });

  it('should not exceed the maximum number of toasts', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';
    const maxToasts = 3;

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );
    const TestComponent = () => {
      const toast = useToastManager();
      const handleClick = useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid="toast"
            >
              {message}
            </Toast>
          );
        }, {
          placement,
        });

        // Limit the maximum number of toasts
        toast.setState(prevState => ({
          ...prevState,
          [placement]: prevState[placement].slice(-maxToasts),
        }));
      }, [toast]);

      return (
        <Button onClick={handleClick}>
          Add Toast
        </Button>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const button = await screen.findByText('Add Toast');

    await act(async () => {
      // Generate more than the maximum number of toasts
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);
    });

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);

    expect(toastPlacementElement.childNodes.length).toBe(maxToasts);
  });

  it('should find a toast by ID using find()', async () => {
    const user = userEvent.setup();
    const toastId = 'toast-id';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );

    const TestComponent = () => {
      const toast = useToastManager();
      const handleClickAddToast = useCallback(() => {
        toast(({ onClose, placement }) => (
          <Toast
            appearance="success"
            isClosable
            onClose={onClose}
            data-testid={toastId}
          >
            {message}
          </Toast>
        ), { id: toastId });
      }, [toast]);
      const handleClickFindToast = useCallback(() => {
        const foundToast = toast.find(toastId);
        expect(foundToast).toBeDefined();
        expect(foundToast.id).toBe(toastId);
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToast}>
            Add Toast
          </Button>
          <Button onClick={handleClickFindToast}>
            Find Toast
          </Button>
        </>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    // Add the toast
    await user.click(screen.getByText('Add Toast'));

    // Find the toast
    await user.click(screen.getByText('Find Toast'));

    // Check if the toast message is displayed correctly
    const toastElement = screen.getByTestId(toastId);
    expect(toastElement).toHaveTextContent(message);
  });

  it('should find the index of a toast by ID using findIndex()', async () => {
    const user = userEvent.setup();
    const toastId = 'toast-id';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );

    const TestComponent = () => {
      const toast = useToastManager();
      const handleClickAddToast = useCallback(() => {
        toast(({ onClose, placement }) => (
          <Toast
            appearance="success"
            isClosable
            onClose={onClose}
            data-testid={toastId}
          >
            {message}
          </Toast>
        ), { id: toastId });
      }, [toast]);
      const handleClickFindToast = useCallback(() => {
        const toastIndex = toast.findIndex(toastId);
        expect(toastIndex).toBeGreaterThan(-1);
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToast}>
            Add Toast
          </Button>
          <Button onClick={handleClickFindToast}>
            Find Toast
          </Button>
        </>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    // Add the toast
    await user.click(screen.getByText('Add Toast'));

    // Find the toast
    await user.click(screen.getByText('Find Toast'));

    // Check if the toast message is displayed correctly
    const toastElement = screen.getByTestId(toastId);
    expect(toastElement).toHaveTextContent(message);
  });

  it('should update an existing toast by ID using update()', async () => {
    const user = userEvent.setup();
    const toastId = 'toast-id';
    const initialMessage = 'Initial toast message';
    const updatedMessage = 'Updated toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );

    const TestComponent = () => {
      const toast = useToastManager();
      const handleClickAddToast = useCallback(() => {
        toast(({ onClose }) => (
          <Toast
            appearance="success"
            isClosable
            onClose={onClose}
            data-testid={toastId}
          >
            {initialMessage}
          </Toast>
        ), { id: toastId });
      }, [toast]);
      const handleClickUpdateToast = useCallback(() => {
        const updateSuccess = toast.update(toastId, {
          content: ({ onClose }) => (
            <Toast
              appearance="success"
              isClosable
              onClose={onClose}
              data-testid={toastId}
            >
              {updatedMessage}
            </Toast>
          ),
        });
        expect(updateSuccess).toBe(true);
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToast}>
            Add Toast
          </Button>
          <Button onClick={handleClickUpdateToast}>
            Update Toast
          </Button>
        </>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    // Add the toast
    await user.click(screen.getByText('Add Toast'));

    // Update the toast
    await user.click(screen.getByText('Update Toast'));

    // Check if the content has been updated
    const toastElement = screen.getByTestId(toastId);
    expect(toastElement).toHaveTextContent(updatedMessage);
  });
});
