import React, { forwardRef } from 'react';
import useBadgeStyle from './styles';
import Box from '../Box';

const Badge = forwardRef(
  (
    {
      variantColor = 'red',
      count,
      dot = false,
      overflowCount = 99,
      showZero = false,
      title,
      children,
      ...restProps
    }
  ) => {
    const badgeStyleProps = useBadgeStyle({ color: variantColor, hasChildren: !!children, showAsDot: dot });
    const getNumberedDisplayCount = () => {
      const displayCount =
        count > overflowCount ? `${overflowCount}+` : count;
      return displayCount;
    };

    const isZero = () => {
      const numberedDisplayCount = getNumberedDisplayCount();
      return numberedDisplayCount === '0' || numberedDisplayCount === 0;
    };

    const isDot = () => {
      return (dot && !isZero());
    };

    const getDisplayCount = () => {
      if (isDot()) {
        return '';
      }
      return getNumberedDisplayCount();
    };

    const isHidden = () => {
      const displayCount = getDisplayCount();
      const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
      return (isEmpty || (isZero() && !showZero)) && !isDot();
    };

    return (
      <Box
        as="span"
        position="relative"
        display="inline-block"
        mr={!!children ? 24 : 0} // Need to discuss
      >
        {children}
        {!isHidden() &&
          <Box
            as="sup"
            py="0.125rem"
            fontWeight="normal"
            borderRadius="sm"
            whiteSpace="nowrap"
            {...badgeStyleProps}
            {...restProps}
          >
            {getDisplayCount()}
          </Box>
        }
      </Box>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
