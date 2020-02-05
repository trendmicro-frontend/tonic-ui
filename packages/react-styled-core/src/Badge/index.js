import useBadgeStyle from './styles';
import Box from '../Box';
import { forwardRef } from 'react';

const Badge = forwardRef(
  ({ variant = 'gray', ...props }, ref) => {
    const badgeStyleProps = useBadgeStyle({ variant });

    return (
      <Box
        ref={ref}
        display="inline-block"
        px="0.3rem"
        textTransform="uppercase"
        fontSize="xs"
        borderRadius="sm"
        fontWeight="bold"
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
