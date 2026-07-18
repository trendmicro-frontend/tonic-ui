import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import ColorModeProvider from './ColorModeProvider';
import useColorMode from './useColorMode';

/**
 * @typedef {Object} InvertedModeProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', InvertedModeProps>}
 */
const InvertedMode = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'InvertedMode' });
  const [colorMode] = useColorMode();
  const invertedColorMode = colorMode === 'light' ? 'dark' : 'light';

  return (
    <ColorModeProvider value={invertedColorMode}>
      <Box
        ref={ref}
        colorScheme={invertedColorMode}
        data-color-scheme={invertedColorMode}
        {...props}
      />
    </ColorModeProvider>
  );
});

InvertedMode.displayName = 'InvertedMode';

export default InvertedMode;
