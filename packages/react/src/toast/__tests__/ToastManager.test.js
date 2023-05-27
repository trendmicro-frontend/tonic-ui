import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Button, Toast, ToastManager, useToastManager } from '@tonic-ui/react/src';
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
    const toastElement = await screen.getByTestId('toast');
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

    const toastElement = await screen.getByTestId('toast');
    expect(toastElement).toHaveTextContent(message);

    const customContainer = await screen.getByTestId('custom-container');
    expect(customContainer).toContainElement(toastElement);
  });

  it('should dismiss the toast after a certain amount of time', async () => {
    const user = userEvent.setup();

    const duration = 3000;
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

    const toastElement = await screen.getByTestId('toast');
    expect(toastElement).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      // The toast should be removed after the duration plus the transition.
      timeout: duration + transitionDuration.standard + 100, // see "toast/ToastTransition.js"
    });
  });

  it('should close all toasts when `closeAll` is called', async () => {
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
});
