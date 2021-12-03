import React, { forwardRef } from 'react';
import Box from '../Box';
import useEffectOnce from '../hooks/useEffectOnce';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
} from './styles';

const Badge = forwardRef((
  {
    isHidden, // deprecated
    variantColor, // deprecated
    variant = 'solid',
    badgeContent,
    children,
    placement = 'top-right',
    //offset,
    //dotSize = 8,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    if (isHidden !== undefined) {
      warnDeprecatedProps('isHidden', {
        message: 'Use \'badgeContent={null}\' instead or do not pass the `badgeContent` prop.',
        willRemove: true,
      });
    }

    if (variant === 'badge') {
      warnDeprecatedProps('variant="badge"', {
        alternative: 'variant="solid"',
        willRemove: true,
      });
    }

    if (variantColor !== undefined) {
      warnDeprecatedProps('variantColor', {
        alternative: 'background',
        willRemove: true,
      });
    }
  });

  { // map deprecated props to new props
    if (isHidden) {
      badgeContent = null;
    }
    if (variant === 'badge') {
      variant = 'solid';
    }
    if (variantColor) {
      rest.backgroundColor = rest.backgroundColor ?? variantColor;
    }
  }

  const badgeStyle = useBadgeStyle();
  const badgeContentStyle = useBadgeContentStyle({ variant });
  const badgeContentPlacementStyle = useBadgeContentPlacementStyle({ placement });

  if (!children && badgeContent) {
    return (
      <Box
        ref={ref}
        {...badgeContentStyle}
        {...rest}
      >
        {badgeContent}
      </Box>
    );
  }

  return (
    <Box
      {...badgeStyle}
    >
      {children}
      {badgeContent && (
        <Box
          ref={ref}
          {...badgeContentStyle}
          {...badgeContentPlacementStyle}
          {...rest}
        >
          {badgeContent}
        </Box>
      )}
    </Box>
  );
});

Badge.displayName = 'Badge';

export default Badge;
