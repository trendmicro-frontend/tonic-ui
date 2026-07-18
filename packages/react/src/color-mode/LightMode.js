import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import ColorModeProvider from './ColorModeProvider';

/**
 * @typedef {Object} LightModeProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', LightModeProps>}
 */
const LightMode = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'LightMode' });

  return (
    <ColorModeProvider value="light">
      <Box
        ref={ref}
        colorScheme="light"
        data-color-scheme="light"
        {...props}
      />
    </ColorModeProvider>
  );
});

LightMode.displayName = 'LightMode';

export default LightMode;
