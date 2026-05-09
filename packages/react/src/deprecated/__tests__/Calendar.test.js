import { render } from '@tonic-ui/react/test-utils/render';
import { Calendar } from '@tonic-ui/react/src';

describe('Calendar component', () => {
  it('logs a deprecation warning when used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Calendar />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: The `Calendar` component is deprecated and will be removed in the next major release. Use the `DateCalendar` component instead.'
    );

    consoleErrorSpy.mockRestore();
  });
});
