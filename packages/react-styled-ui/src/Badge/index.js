import React, { forwardRef } from 'react';
import useBadgeStyle from './styles';
import Box from '../Box';

const Badge = forwardRef(
  ({ variantColor = 'gray', ...props }, ref) => {
    const badgeStyleProps = useBadgeStyle({ color: variantColor });

    return (
      <Box
        ref={ref}
        display="inline-block"
        px="1x"
        textTransform="uppercase"
        fontSize="xs"
        borderRadius="sm"
        fontWeight="normal"
        whiteSpace="nowrap"
        verticalAlign="middle"
        {...badgeStyleProps}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
