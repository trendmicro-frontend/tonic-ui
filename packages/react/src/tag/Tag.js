import { useOnceWhen } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { useTagStyle } from './styles';
import { Box } from '../box';
import { Icon } from '../icon';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import TagCloseButton from './TagCloseButton';

const Tag = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    borderRadius = 'sm',
    size = 'md',
    variant = 'solid',
    variantColor = 'gray',
    isInvalid,
    isClosable = false,
    disabled,
    children,
    onClose,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Tag.displayName}:`;

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
    color: variantColor,
    size,
    variant,
    canFocus,
    isClosable,
    borderRadius,
  });

  return (
    <Box
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      aria-invalid={isInvalid}
      borderRadius={borderRadius}
      tabIndex={disabled ? '-1' : '0'}
      {...tagStyleProps}
      {...rest}
    >
      { children }
      {!!isClosable && (
        <TagCloseButton
          size={size}
          borderRadius={borderRadius}
          disabled={disabled}
          onClick={onClose}
          tabIndex="-1"
        >
          <Icon icon="close-s" />
        </TagCloseButton>
      )}
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
