import React, { forwardRef } from 'react';
import { useTagStyle, useTagCloseButtonStyle } from './styles';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import useEffectOnce from '../hooks/useEffectOnce';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';

const TagCloseButton = ({ size, ...props }) => {
  const closeButtonStyleProps = useTagCloseButtonStyle({ size });
  return (
    <ButtonBase {...closeButtonStyleProps} {...props} />
  );
};

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
  useEffectOnce(() => {
    const prefix = `${Tag.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  });

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
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
          borderRadius={borderRadius}
          size={size}
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
