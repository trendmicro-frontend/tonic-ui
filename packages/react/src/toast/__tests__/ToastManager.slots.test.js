import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Button, Toast, ToastManager, useToastManager } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { useCallback } from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <div ref={ref} data-testid="custom-transition" {...rest}>{children}</div>
));
CustomTransition.displayName = 'CustomTransition';

const placement = 'bottom-right';
const message = 'This is a toast message';

const TestComponent = () => {
  const toast = useToastManager();
  const handleClick = useCallback(() => {
    toast(({ onClose }) => (
      <Toast
        appearance="success"
        isClosable
        onClose={onClose}
        data-testid="toast"
      >
        {message}
      </Toast>
    ), { placement });
  }, [toast]);

  return (
    <Button onClick={handleClick}>
      Add Toast
    </Button>
  );
};

describe('ToastManager slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', async () => {
    const user = userEvent.setup();

    render(
      <ToastManager slots={{ transition: CustomTransition }}>
        <TestComponent />
      </ToastManager>
    );

    await user.click(screen.getByText('Add Toast'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    });
  });

  it('B — slotProps.transition passes additional props to the transition element', async () => {
    const user = userEvent.setup();

    render(
      <ToastManager
        slots={{ transition: CustomTransition }}
        slotProps={{ transition: { 'data-foo': 'bar' } }}
      >
        <TestComponent />
      </ToastManager>
    );

    await user.click(screen.getByText('Add Toast'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
    });
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', async () => {
    const user = userEvent.setup();

    render(
      <ToastManager
        TransitionComponent={CustomTransition}
        TransitionProps={{}}
      >
        <TestComponent />
      </ToastManager>
    );

    await user.click(screen.getByText('Add Toast'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    });

    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'ToastManager:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'ToastManager:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});
