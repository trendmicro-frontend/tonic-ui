import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Button, Toast, ToastProvider, useToast } from '@tonic-ui/react/src';
import * as React from 'react';

describe('Toast', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();

    const placement = 'bottom-right';
    const toastMessage = 'This is a toast message';

    const ToastComponent = () => {
      const toast = useToast();
      const handleClick = React.useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="info"
              onClose={onClose}
              data-testid="toast"
            >
              {toastMessage}
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
      <ToastProvider>
        <ToastComponent />
      </ToastProvider>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastPlacementElement = document.querySelector(`[data-toast-placement="${placement}"]`);
    const toastElement = await screen.getByTestId('toast');
    expect(toastPlacementElement).toContainElement(toastElement);
    expect(toastElement).toHaveTextContent(toastMessage);
  });

  it('should dismiss the toast after a certain amount of time', async () => {
    const user = userEvent.setup();

    const duration = 3000;
    const placement = 'bottom-right';
    const toastMessage = 'This is a toast message';

    const ToastComponent = () => {
      const toast = useToast();
      const handleClick = React.useCallback(() => {
        toast(({ onClose, placement }) => {
          return (
            <Toast
              appearance="info"
              onClose={onClose}
              data-testid="toast"
            >
              {toastMessage}
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
      <ToastProvider>
        <ToastComponent />
      </ToastProvider>
    );

    const button = await screen.findByText('Add Toast');
    await user.click(button);

    const toastElement = await screen.getByTestId('toast');
    expect(toastElement).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('toast'), {
      // The toast should be removed after the duration plus 300ms for the transition.
      // Add 500ms to account for the time it takes to run the test.
      timeout: duration + 500,
    });
  });
});
