import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';

const Text = forwardRef((
  {
    size,
    ...rest
  },
  ref,
) => {
  const { fontSizes } = useTheme();
  const sizeProps = {};
  if (size !== undefined && Object.prototype.hasOwnProperty.call(fontSizes, size)) {
    sizeProps.fontSize = size;
    sizeProps.lineHeight = size;
  }

  return (
    <Box
      ref={ref}
      display="inline-block"
      fontFamily="base"
      {...sizeProps}
      {...rest}
    />
  );
});

Text.displayName = 'Text';

export default Text;
