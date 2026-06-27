import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useBadgeStyle,
  useBadgeContentStyle,
  useBadgeContentPlacementStyle,
} from './styles';

/**
 * @typedef {Object} BadgeProps
 * @property {React.ReactNode} [children] -
 * @property {React.ReactNode | number | string} [badgeContent] - The badge content.
 * @property {boolean} [isInvisible] - Whether the badge is invisible.
 * @property {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} [placement='top-right'] - The placement of the badge.
 * @property {'solid' | 'dot'} [variant='solid'] -
 */

/**
 * @type {ForwardRefComponent<'div', BadgeProps>}
 */
const Badge = forwardRef((inProps, ref) => {
  const {
    badgeContent: badgeContentProp,
    children,
    isInvisible: isInvisibleProp,
    placement = 'top-right', // One of: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Badge' });
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
