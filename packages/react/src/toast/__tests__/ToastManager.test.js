import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Button, Toast, ToastManager, useToastManager } from '@tonic-ui/react/src';
import { transitionDuration } from '@tonic-ui/utils/src';
import React, { useRef } from 'react';

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
      const handleClick = React.useCallback(() => {
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
      const handleClick = React.useCallback(() => {
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
      const handleClick = React.useCallback(() => {
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
      const handleClick = React.useCallback(() => {
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
          [placement]: prevState[placement].slice(0, maxToasts),
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
      await user.click(button);
      await user.click(button);
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
