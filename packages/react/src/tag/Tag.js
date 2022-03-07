import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTagStyle } from './styles';

const Tag = forwardRef((
  {
    children,
    size = 'md',
    variant = 'solid',
    ...props
  },
  ref
) => {
  const tagStyleProps = useTagStyle({
    size,
    variant,
  });

  return (
    <Box
      ref={ref}
      {...tagStyleProps}
      {...props}
    >
      { children }
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
