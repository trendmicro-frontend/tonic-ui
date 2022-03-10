import { useOnceWhen } from '@tonic-ui/react-hooks';
import {
  ensureArray,
  ensureBoolean,
} from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
} from './styles';

const Badge = forwardRef((
  {
    dotSize: dotSizeProp, // deprecated
    isHidden: isHiddenProp, // deprecated
    offset: offsetProp, // deprecated
    variantColor: variantColorProp, // deprecated

    badgeContent: badgeContentProp,
    children,
    isInvisible: isInvisibleProp,
    placement = 'top-right', // One of: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    variant = 'solid',
    ...rest
  },
  ref,
) => {
  const theme = useTheme();

  { // deprecation warning
    const prefix = `${Badge.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('dotSize', {
        prefix,
        alternative: ['width', 'height'],
        willRemove: true,
      });
    }, (dotSizeProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('isHidden', {
        prefix,
        alternative: 'isInvisible',
        willRemove: true,
      });
    }, (isHiddenProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('offset', {
        prefix,
        alternative: ['right', 'top'],
        willRemove: true,
      });
    }, (offsetProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('variant="badge"', {
        prefix,
        alternative: 'variant="solid"',
        willRemove: true,
      });
    }, (variant === 'badge'));

    useOnceWhen(() => {
      warnDeprecatedProps('variantColor', {
        prefix,
        alternative: 'backgroundColor',
        willRemove: true,
      });
    }, (variantColorProp !== undefined));

    if (variant === 'dot' && dotSizeProp !== undefined) {
      rest.height = rest.height ?? dotSizeProp;
      rest.width = rest.width ?? dotSizeProp;
    }
    if (isHiddenProp !== undefined) {
      isInvisibleProp = ensureBoolean(isHiddenProp);
    }
    if (offsetProp !== undefined) {
      const [offsetX, offsetY] = ensureArray(offsetProp);
      if (offsetX !== undefined) {
        rest.right = rest.right ?? offsetX;
      }
      if (offsetY !== undefined) {
        rest.top = rest.top ?? offsetY;
      }
    }
    if (variant === 'badge') {
      variant = 'solid';
    }
    if (variantColorProp !== undefined) {
      const variantColor = theme?.colors?.[`${variantColorProp}:60`] ?? theme?.colors?.[`${variantColorProp}:50`] ?? variantColorProp;
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
