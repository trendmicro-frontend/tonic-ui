import { render } from '@tonic-ui/react/test-utils/render';
import { ToastProvider } from '@tonic-ui/react/src';
import React from 'react';

describe('ToastProvider component', () => {
  it('logs a deprecation warning when used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ToastProvider />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: The `ToastProvider` component is deprecated and will be removed in the next major release. Use the `ToastManager` component instead.'
    );

    consoleErrorSpy.mockRestore();
  });
});
