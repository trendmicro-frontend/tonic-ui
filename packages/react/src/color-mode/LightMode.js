import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import ColorModeProvider from './ColorModeProvider';

const LightMode = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'LightMode' });

  return (
    <ColorModeProvider value="light">
      <Box
        ref={ref}
        colorScheme="light"
        {...props}
      />
    </ColorModeProvider>
  );
});

LightMode.displayName = 'LightMode';

export default LightMode;
