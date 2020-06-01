import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  getAnimationCSS,
  getVariantCSS,
  useSkeletonStyle,
} from './styles';

const defaultVariant = 'text';

const Skeleton = forwardRef((
  {
    animation,
    variant,
    css,
    ...props
  },
  ref
) => {
  // Use fallback values if values are null or undefined
  variant = variant ?? defaultVariant;
  css = [
    getAnimationCSS(animation),
    getVariantCSS(variant),
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
