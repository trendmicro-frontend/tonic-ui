import React, { forwardRef } from 'react';
import useBadgeStyle from './styles';
import Box from '../Box';

const Badge = forwardRef(
  (
    {
      variant = 'badge',
      variantColor = 'red',
      badgeContent,
      isHidden,
      children,
      ...restProps
    }
  ) => {
    const badgeStyleProps = useBadgeStyle({ color: variantColor, hasChildren: !!children, showAsDot: variant === 'dot' });

    return (
      <Box
        as="span"
        position="relative"
        display="inline-block"
        mr={!!children ? 24 : 0} // Need to discuss
      >
        {children}
        {!isHidden &&
          <Box
            as="span"
            py="0.125rem"
            fontWeight="normal"
            borderRadius="sm"
            whiteSpace="nowrap"
            {...badgeStyleProps}
            {...restProps}
          >
            {badgeContent}
          </Box>
        }
      </Box>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
