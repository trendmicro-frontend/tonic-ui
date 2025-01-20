import { renderHook } from '@tonic-ui/react/test-utils/render';
import { ToastManager, useToast } from '@tonic-ui/react/src';
import React from 'react';

describe('useToast hook', () => {
  it('logs a deprecation warning when used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = ({ children }) => (
      <ToastManager>
        {children}
      </ToastManager>
    );

    renderHook(() => useToast(), { wrapper }); // Wrap the hook with ToastManager

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: The `useToast` Hook is deprecated and will be removed in the next major release. Use the `useToastManager` Hook instead.'
    );

    consoleErrorSpy.mockRestore();
  });
});
