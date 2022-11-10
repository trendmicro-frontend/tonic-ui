import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useSkeletonStyle,
} from './styles';

const defaultVariant = 'text';

const Skeleton = forwardRef((
  {
    animation,
    variant,
    ...rest
  },
  ref
) => {
  // Use fallback values if values are null or undefined
  variant = variant ?? defaultVariant;
  const styleProps = useSkeletonStyle({ animation, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
