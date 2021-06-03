import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const Divider = forwardRef(({
  color,
  orientation = 'horizontal',
  variant = 'solid',
  ...props
}, ref) => {
  const [colorMode] = useColorMode();
  const dividerColor = color || {
    dark: 'white:disabled',
    light: 'black:disabled',
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
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
