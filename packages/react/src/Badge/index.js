import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import Box from '../Box';
import useEffectOnce from '../hooks/useEffectOnce';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import warnRemovedProps from '../utils/warnRemovedProps';
import {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
} from './styles';

const Badge = forwardRef((
  {
    isHidden, // deprecated
    variantColor, // deprecated
    dotSize, // removed
    offset, // removed
    badgeContent: badgeContentProp,
    children,
    isInvisible: isInvisibleProp,
    placement = 'top-right', // One of: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    variant = 'solid',
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    if (isHidden !== undefined) {
      warnDeprecatedProps('isHidden', {
        alternative: 'isInvisible',
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

    if (dotSize !== undefined) {
      warnRemovedProps('dotSize', {
        alternative: ['width', 'height'],
      });
    }

    if (offset !== undefined) {
      warnRemovedProps('offset', {
        alternative: ['left', 'top'],
      });
    }
  });

  { // map deprecated props to new props
    if (isHidden !== undefined) {
      isInvisibleProp = ensureBoolean(isHidden);
    }
    if (variant === 'badge') {
      variant = 'solid';
    }
    if (variantColor) {
      rest.backgroundColor = rest.backgroundColor ?? variantColor;
    }
  }

  const badgeContent = (variant === 'dot') ? null : badgeContentProp;
  const isInvisible = isInvisibleProp ?? (() => {
    if ((badgeContent === null || badgeContent === undefined) && (variant !== 'dot')) {
      return true;
    }
    return false;
  })();

  const badgeStyle = useBadgeStyle();
  const badgeContentStyle = useBadgeContentStyle({ variant });
  const badgeContentPlacementStyle = useBadgeContentPlacementStyle({ placement });

  if (!children && !isInvisible) {
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
      {!isInvisible && (
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
