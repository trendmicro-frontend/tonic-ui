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
      const handleClickUpdateInvalidToast = useCallback(() => {
        const updateSuccess = toast.update(null, {});
        expect(updateSuccess).toBe(false);
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToast}>
            Add Toast
          </Button>
          <Button onClick={handleClickUpdateToast}>
            Update Toast
          </Button>
          <Button onClick={handleClickUpdateInvalidToast}>
            Update Invalid Toast
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
    await user.click(screen.getByText('Update Invalid Toast'));

    // Check if the content has been updated
    const toastElement = screen.getByTestId(toastId);
    expect(toastElement).toHaveTextContent(updatedMessage);
  });

  it('should not create a toast and return false for invalid placement', async () => {
    const user = userEvent.setup();
    const toastId = 'toast-id';
    const placement = 'center'; // "center" is not a supported placement
    const message = 'This is a toast message';

    // Spy on console.error to capture and check the error message
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );

    const TestComponent = () => {
      const toast = useToastManager();
      const handleClick = useCallback(() => {
        const result = toast(({ onClose }) => (
          <Toast
            appearance="error"
            isClosable
            onClose={onClose}
            data-testid={toastId}
          >
            {message}
          </Toast>
        ), { placement });
        expect(result).toBe(false);
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

    // Check that console.error was called with the expected error message
    const placements = [
      'bottom',
      'bottom-right',
      'bottom-left',
      'top',
      'top-left',
      'top-right',
    ];
    const expectedErrorMessage = `[ToastManager] Error: Invalid toast placement "${placement}". Please provide a valid placement from the following options: ${placements.join(', ')}.`;
    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);

    // Assert that no toast element with the invalid placement was created
    const toastElement = screen.queryByTestId(toastId);
    expect(toastElement).not.toBeInTheDocument();

    // Restore console.error to its original implementation
    consoleErrorSpy.mockRestore();
  });

  it('should create toasts in the correct order for top and bottom placements in the state', async () => {
    const user = userEvent.setup();
    const topPlacement = 'top';
    const bottomPlacement = 'bottom';
    const message = 'This is a toast message';

    const WrapperComponent = (props) => (
      <ToastManager {...props} />
    );

    const TestComponent = () => {
      const toast = useToastManager();
      const handleClickAddToasts = useCallback(() => {
        // Add toast for top-right placement
        toast(({ onClose }) => (
          <Toast
            appearance="success"
            isClosable
            onClose={onClose}
          >
            {message}
          </Toast>
        ), { placement: topPlacement });

        // Add toast for bottom-right placement
        toast(({ onClose }) => (
          <Toast
            appearance="success"
            isClosable
            onClose={onClose}
          >
            {message}
          </Toast>
        ), { placement: bottomPlacement });
      }, [toast]);

      return (
        <>
          <Button onClick={handleClickAddToasts}>Add Toasts</Button>
          {/* Access toast.state here to check order */}
          {toast.state && (
            <pre data-testid="toast-state">{JSON.stringify(toast.state, null, 2)}</pre>
          )}
        </>
      );
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    const button = await screen.findByText('Add Toasts');
    await user.click(button);
    await user.click(button);

    // Wait for the state to be updated with toasts
    await screen.findByTestId('toast-state');

    // Get the state of the toasts
    const toastState = JSON.parse(screen.getByTestId('toast-state').textContent);

    // Check that toasts with top-right and bottom-right placements exist in the state
    const topToasts = toastState[topPlacement];
    const bottomToasts = toastState[bottomPlacement];

    // top-right
    //
    // ```js
    // [
    //   { id: '3', placement: 'top-right' },
    //   { id: '1', placement: 'top-right' },
    // ]
    // ```
    expect(topToasts).toHaveLength(2);
    expect(topToasts[0].id > topToasts[1].id).toBeTruthy();

    // bottom-right
    //
    // ```js
    // [
    //   { id: '2', placement: 'bottom-right' },
    //   { id: '4', placement: 'bottom-right' },
    // ]
    // ```
    expect(bottomToasts).toHaveLength(2);
    expect(bottomToasts[0].id < bottomToasts[1].id).toBeTruthy();
  });
});
