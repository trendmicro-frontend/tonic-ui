import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import ColorModeProvider from './ColorModeProvider';

/**
 * @typedef {Object} DarkModeProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', DarkModeProps>}
 */
const DarkMode = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DarkMode' });

  return (
    <ColorModeProvider value="dark">
      <Box
        ref={ref}
        colorScheme="dark"
        data-color-scheme="dark"
        {...props}
      />
    </ColorModeProvider>
  );
});

DarkMode.displayName = 'DarkMode';

export default DarkMode;
