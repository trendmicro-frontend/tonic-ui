import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDividerStyle } from './styles';

const Divider = forwardRef(({
  orientation = 'horizontal',
  variant = 'solid',
  ...rest
}, ref) => {
  const styleProps = useDividerStyle({ orientation, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
