import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const Divider = forwardRef(({ orientation, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const borderProps =
    orientation === 'vertical'
      ? { borderLeft: 1, height: 'auto' }
      : { borderBottom: 1, width: 'auto' };
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:60',
  }[colorMode];

  return (
    <Box
      ref={ref}
      as="hr"
      aria-orientation={orientation}
      border="0"
      {...borderProps}
      borderColor={borderColor}
      {...props}
    />
  );
});

export default Divider;
