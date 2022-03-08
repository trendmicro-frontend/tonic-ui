import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';

const Tag = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    variantColor, // deprecated

    children,
    disabled,
    isClosable,
    isInvalid,
    size = 'md',
    variant = 'solid',
    onClose,
    ...props
  },
  ref
) => {
  useEffectOnce(() => {
    const prefix = `${Tag.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
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
  }, true); // TODO: check if `when` is true for each prop

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  const tagStyleProps = useTagStyle({
    size,
    variant,
  });

  return (
    <Box
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      aria-invalid={isInvalid}
      {...tagStyleProps}
      {...props}
    >
      { children }
      {!!isClosable && (
        <TagCloseButton ml="2x" disabled={disabled} onClick={onClose} />
      )}
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
