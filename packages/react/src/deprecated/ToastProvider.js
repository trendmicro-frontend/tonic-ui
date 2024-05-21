import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { ToastManager } from '../toast';

const ToastProvider = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ToastProvider` component is deprecated and will be removed in the next major release. Use the `ToastManager` component instead.');
  });

  return (
    <ToastManager ref={ref} {...props} />
  );
});

ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;
