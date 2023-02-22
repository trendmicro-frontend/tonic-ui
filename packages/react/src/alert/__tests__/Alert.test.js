import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Alert, Collapse } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils/src';
import React from 'react';

describe('Alert', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const message = 'This is an alert message';
    const handleClose = jest.fn();

    const TestComponent = ({ onClose }) => {
      const [isOpen, toggle] = useToggle(true);
      return (
        <Collapse in={isOpen} unmountOnExit>
          <Alert
            variant="solid"
            severity="success"
            isClosable
            onClose={callEventHandlers(() => toggle(false), onClose)}
            data-testid="alert"
          >
            {message}
          </Alert>
        </Collapse>
      );
    };

    render(<TestComponent onClose={handleClose} />);

    const alertElement = await screen.getByTestId('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);

    const closeButton = await screen.getByRole('button');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('alert'), {
      timeout: transitionDuration.standard + 100, // see "transitions/Collapse.js"
    });
  });
});
