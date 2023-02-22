import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Button, Collapse, Toast, ToastManager, useToastManager } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils/src';
import React from 'react';

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

    const toastElement = await screen.getByTestId('toast');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent(message);

    const closeButton = await screen.getByRole('button');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      timeout: transitionDuration.standard + 100, // see "transitions/Collapse.js"
    });
  });

  it('should render correctly with ToastManager', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const message = 'This is a toast message';

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
      <ToastManager>
        <TestComponent />
      </ToastManager>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);
    const toastElement = await screen.getByTestId('toast');
    expect(toastPlacementElement).toContainElement(toastElement);
    expect(toastElement).toHaveTextContent(message);
  });

  it('should dismiss the toast after a certain amount of time', async () => {
    const user = userEvent.setup();

    const duration = 3000;
    const placement = 'bottom-right';
    const message = 'This is a toast message';

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
      <ToastManager>
        <TestComponent />
      </ToastManager>
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
});
