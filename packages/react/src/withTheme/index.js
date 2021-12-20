import { withTheme } from '@emotion/react';

export default (...args) => {
  console.error('Warning: `withTheme` is deprecated and will be removed in the next major release. Use the `useTheme` Hook instead.');

  return withTheme(...args);
};
