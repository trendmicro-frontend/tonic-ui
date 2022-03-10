import { useOnceWhen } from '@tonic-ui/react-hooks';
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
  { // deprecation warning
    const prefix = `${Tag.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('variantColor', {
        prefix,
        alternative: 'backgroundColor',
        willRemove: true,
      });
    }, (variantColor !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }, (isCloseButtonVisible !== undefined));

    isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  }

  const canFocus = isClosable;
  const tagStyleProps = useTagStyle({
    color: variantColor, // TODO: remove this line after deprecation
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
