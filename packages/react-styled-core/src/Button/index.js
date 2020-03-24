import React, { forwardRef } from 'react';
import useButtonStyle from './styles';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import useTheme from '../useTheme';

const Button = forwardRef(
  (
    {
      as: Comp = 'button',
      borderRadius = 'sm',
      children,
      px = '3x',
      selected,
      size = 'md',
      type = 'button',
      variant = 'default',
      ...rest
    },
    ref,
  ) => {
    const buttonStyleProps = useButtonStyle({
      size,
      variant,
    });
    const theme = useTheme();
    const { radii } = theme;
    let innerRadius;
    const radius = radii[borderRadius] || borderRadius;
    innerRadius = `calc(${radius} - 3px)`;
    if (/^\d+(\.\d+)?%$/.test(radius)) {
      innerRadius = radius;
    }

    return (
      <ButtonBase
        ref={ref}
        as={Comp}
        type={type}
        borderRadius={borderRadius}
        data-selected={selected ? 'true' : undefined}
        px={px}
        {...buttonStyleProps}
        {...rest}
      >
        {/* This Box is for rendering background color of Button. */}
        <Box
          transition="inherit"
          borderRadius={innerRadius}
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        />
        {/* The z-index is for placing text over the above box. */}
        <Box zIndex="1">{ children }</Box>
      </ButtonBase>
    );
  },
);

Button.displayName = 'Button';

export default Button;
