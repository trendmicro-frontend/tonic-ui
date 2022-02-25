import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { useTagStyle } from './styles';

const Tag = forwardRef((props, ref) => {
  const {
    isClosable, // deprecated
    isCloseButtonVisible, // deprecated
    isInvalid, // deprecated
    onClose, // deprecated
    variantColor: variantColorProp, // deprecated

    borderRadius = 'sm',
    children,
    size = 'md',
    variant = 'solid',
  } = props;

  useEffectOnce(() => {
    const prefix = `${Tag.displayName}:`;

    if (isClosable !== undefined) {
      warnDeprecatedProps('isClosable', {
        prefix,
        alternative: '<EditableTag isClosable />',
        willRemove: true,
      });
    }

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: '<EditableTag isClosable />',
        willRemove: true,
      });
    }

    if (isInvalid !== undefined) {
      warnDeprecatedProps('isInvalid', {
        prefix,
        alternative: '<EditableTag isInvalid />',
        willRemove: true,
      });
    }

    if (onClose !== undefined) {
      warnDeprecatedProps('onClose', {
        prefix,
        alternative: '<EditableTag isClosable onClose={()=>{}} />',
        willRemove: true,
      });
    }

    if (variantColorProp !== undefined) {
      warnDeprecatedProps('variantColor', {
        prefix,
        alternative: 'backgroundColor',
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
      borderRadius={borderRadius}
      {...tagStyleProps}
      {...props}
    >
      { children }
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
