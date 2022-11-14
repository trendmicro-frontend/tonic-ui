import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
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
  { // deprecation warning
    const prefix = `${Skeleton.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('variant="rect"', {
        prefix,
        alternative: 'variant="rectangle"',
        willRemove: true,
      });
    }, (variant === 'rect'));

    if (variant === 'rect') {
      variant = 'rectangle';
    }
  }

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
