import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const Divider = forwardRef(({
  color,
  orientation = 'horizontal',
  ...props
}, ref) => {
  const { colorMode } = useColorMode();
  const dividerColor = color || {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];

  const borderProps = {
    vertical: {
      borderLeft: 1,
      borderLeftColor: dividerColor,
    },
    horizontal: {
      borderBottom: 1,
      borderBottomColor: dividerColor,
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
