import React, { forwardRef } from 'react';
import { useTagStyle, useTagCloseButtonStyle } from './styles';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';

const TagCloseButton = props => (
  <ButtonBase {...props} />
);

const TagLabel = props => (
  <Box {...props} />
);

const Tag = forwardRef(
  (
    {
      borderRadius = 'sm',
      size = 'md',
      variant = 'solid',
      variantColor = 'gray',
      isCloseable,
      invalid,
      disabled,
      children,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const closeButtonStyleProps = useTagCloseButtonStyle({
      size,
    });
    const tagStyleProps = useTagStyle({
      color: variantColor,
      size,
      variant,
      invalid,
    });

    return (
      <PseudoBox
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        borderRadius={borderRadius}
        tabIndex="0"
        display="inline-flex"
        align="flex-start"
        justify="space-between"
        {...tagStyleProps}
        {...rest}
      >
        {/* This Box is for rendering background color of Tag. */}
        <Box
          transition="inherit"
          borderRadius={borderRadius}
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        />
        {/* The z-index is for placing text over the above box. */}
        <Flex
          zIndex="1"
          justify="space-between"
          alignItems="center"
        >
          <TagLabel>{ children }</TagLabel>
          {!!isCloseable && (
            <TagCloseButton
              disabled={disabled}
              {...closeButtonStyleProps}
              onClick={onClose}
            >
              <Icon name="_core.close-s" />
            </TagCloseButton>
          )}
        </Flex>
      </PseudoBox>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
