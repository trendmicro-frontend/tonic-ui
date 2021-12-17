import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const Divider = forwardRef(({
  color,
  orientation = 'horizontal',
  variant = 'solid',
  ...rest
}, ref) => {
  const [colorMode] = useColorMode();
  const dividerColor = color || {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  const borderProps = {
    vertical: {
      borderLeft: 1,
      borderLeftColor: dividerColor,
      borderLeftStyle: variant,
    },
    horizontal: {
      borderBottom: 1,
      borderBottomColor: dividerColor,
      borderBottomStyle: variant,
    },
  }[orientation];

  return (
    <Box
      ref={ref}
      {...borderProps}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
