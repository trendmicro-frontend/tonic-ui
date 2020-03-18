import React, { forwardRef } from 'react';
import useButtonStyle from './styles';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import useTheme from '../useTheme';

const Button = forwardRef(
  (
    {
      active,
      borderRadius = 'sm',
      children,
      as: Comp = 'button',
      variant = 'solid',
      variantColor,
      type = 'button',
      size = 'md',
      px = '2x',
      ...rest
    },
    ref,
  ) => {
    const isDefinedButton = ['emphasis', 'primary', 'default'].indexOf(variant) >= 0;
    const buttonStyleProps = useButtonStyle({
      color: variantColor,
      size,
      variant,
      isDefinedButton,
    });
    const theme = useTheme();
    const { radii } = theme;
    let innerRadius;
    const radius = radii[borderRadius] || borderRadius;
    innerRadius = `calc(${radius} - 3px)`;
    if (/^\d+(\.\d+)?%$/.test(radius)) {
      innerRadius = radius;
    }

    if (isDefinedButton) {
      return (
        <ButtonBase
          ref={ref}
          as={Comp}
          type={type}
          borderRadius={borderRadius}
          data-active={active ? 'true' : undefined}
          {...buttonStyleProps}
          {...rest}
        >
          <Box
            px={px}
            margin="2px"
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="inherit"
            borderRadius={innerRadius}
          >
            { children }
          </Box>
        </ButtonBase>
      );
    }

    return (
      <ButtonBase
        ref={ref}
        as={Comp}
        type={type}
        borderRadius={borderRadius}
        data-active={active ? 'true' : undefined}
        px={px}
        {...buttonStyleProps}
        {...rest}
      >
        { children }
      </ButtonBase>
    );
  },
);

Button.displayName = 'Button';

export default Button;
