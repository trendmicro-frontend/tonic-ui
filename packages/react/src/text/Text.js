import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTextStyle } from './styles';

const Text = forwardRef((
  {
    size,
    ...rest
  },
  ref,
) => {
  const styleProps = useTextStyle({ size });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Text.displayName = 'Text';

export default Text;
