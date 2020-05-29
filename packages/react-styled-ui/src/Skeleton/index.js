import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  getSkeletonCSS,
  useSkeletonStyle,
} from './styles';

const defaultVariant = 'text';

const Skeleton = forwardRef((
  {
    animation = false,
    variant,
    css,
    ...props
  },
  ref
) => {
  // Use fallback values if values are null or undefined
  variant = variant ?? defaultVariant;
  css = [
    ...getSkeletonCSS({ animation, variant }),
    css,
  ];
  const styleProps = useSkeletonStyle({ animation, variant });

  return (
    <Box
      css={css}
      {...styleProps}
      {...props}
    />
  );
});

export default Skeleton;
