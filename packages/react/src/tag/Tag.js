import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { useTagStyle } from './styles';

const Tag = forwardRef((
  {
    isClosable, // deprecated
    isCloseButtonVisible, // deprecated
    isInvalid, // deprecated
    variantColor, // deprecated
    onClose, // deprecated

    children,
    size = 'md',
    variant = 'solid',
    ...props
  },
  ref
) => {
  useEffectOnce(() => {
    const prefix = `${Tag.displayName}:`;

    if (isClosable !== undefined) {
      warnDeprecatedProps('isClosable', {
        prefix,
        willRemove: true,
      });
    }

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        willRemove: true,
      });
    }

    if (isInvalid !== undefined) {
      warnDeprecatedProps('isInvalid', {
        prefix,
        willRemove: true,
      });
    }

    if (variantColor !== undefined) {
      warnDeprecatedProps('variantColor', {
        prefix,
        alternative: 'backgroundColor',
        willRemove: true,
      });
    }

    if (onClose !== undefined) {
      warnDeprecatedProps('onClose', {
        prefix,
        willRemove: true,
      });
    }
  }, true); // TODO: check if `when` is true for each prop

  const tagStyleProps = useTagStyle({
    size,
    variant,
  });

  return (
    <Box
      ref={ref}
      {...tagStyleProps}
      {...props}
    >
      { children }
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
