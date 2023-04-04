import { withTheme } from '@emotion/react';
import { useOnce } from '@tonic-ui/react-hooks';

export default (...args) => {
  useOnce(() => {
    console.error('Warning: `withTheme` is deprecated and will be removed in the next major release. Use the `useTheme` Hook instead.');
  });

  return withTheme(...args);
};
