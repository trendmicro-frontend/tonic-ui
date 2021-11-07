import React, { forwardRef } from 'react';
import useBadgeStyle from './styles';
import Box from '../Box';

const Badge = forwardRef(
  (
    {
      variant = 'badge',
      variantColor = 'red',
      badgeContent,
      isHidden = false,
      children,
      offset,
      dotSize = 8,
      borderColor,
      borderWidth = 1,
      ...restProps
    },
    ref,
  ) => {
    const badgeBorderColor = borderColor ?? variantColor;
    const badgeStyleProps = useBadgeStyle({
      color: variantColor,
      hasChildren: !!children,
      showAsDot: variant === 'dot',
      offset,
      dotSize,
      borderColor: badgeBorderColor,
      borderWidth
    });

    return (
      <Box
        as="span"
        position="relative"
        display="inline-block"
      >
        {children}
        {!isHidden && (
          <Box
            ref={ref}
            as="span"
            fontWeight="normal"
            borderRadius="sm"
            whiteSpace="nowrap"
            {...badgeStyleProps}
            {...restProps}
          >
            {badgeContent}
          </Box>
        )}
      </Box>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
