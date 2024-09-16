import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useSkeletonStyle,
} from './styles';

const defaultVariant = 'text';

const Skeleton = forwardRef((inProps, ref) => {
  const {
    animation,
    variant: variantProp = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Skeleton' });

  let variant = variantProp;

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
