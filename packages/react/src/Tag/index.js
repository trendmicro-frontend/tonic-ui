import React, { forwardRef } from 'react';
import { useTagStyle, useTagCloseButtonStyle } from './styles';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import Box from '../Box';

const TagCloseButton = ({ size, ...props }) => {
  const closeButtonStyleProps = useTagCloseButtonStyle({ size });
  return (
    <ButtonBase {...closeButtonStyleProps} {...props} />
  );
};

const Tag = forwardRef(
  (
    {
      borderRadius = 'sm',
      size = 'md',
      variant = 'solid',
      variantColor = 'gray',
      isInvalid,
      isClosable: _isClosable = false,
      isCloseButtonVisible: LEGACY_isCloseButtonVisible = false, // eslint-disable-line camelcase
      disabled,
      children,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const isClosable = _isClosable || LEGACY_isCloseButtonVisible; // eslint-disable-line camelcase
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
  },
);

Tag.displayName = 'Tag';

export default Tag;
