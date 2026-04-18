import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Toast, ToastController } from '@tonic-ui/react/src';

jest.useFakeTimers();

describe('ToastController', () => {
  test('pauses timeout on mouse enter and resumes on mouse leave', async () => {
    const user = userEvent.setup({
      // Disable action delay to allow `await user.hover(element)` to complete immediately
      // Reference: https://github.com/testing-library/user-event/issues/833
      delay: null,
    });
    const onClose = jest.fn();
    const duration = 5000;

    render(
      <ToastController
        duration={duration}
        onClose={onClose}
      >
        <Toast data-testid="toast">
          This is a toast
        </Toast>
      </ToastController>
    );

    const toast = screen.getByTestId('toast');

    // Simulate mouse enter, which should pause the timeout
    await user.hover(toast);

    // Timeout should be paused
    jest.advanceTimersByTime(duration);
    expect(onClose).not.toHaveBeenCalled();

    // Simulate mouse leave, which should resume the timeout
    await user.unhover(toast);

    // Timeout should be resumed
    jest.advanceTimersByTime(duration);
    expect(onClose).toHaveBeenCalled();
  });
});
