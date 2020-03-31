import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import { useButtonGroup } from '../ButtonGroup/context';
import useTheme from '../useTheme';
import useButtonStyle from './styles';

const defaultSize = 'md';
const defaultVariant = 'default';

const Button = forwardRef(
  (
    {
      as: Comp = 'button',
      type = 'button',
      borderRadius = 'sm',
      px = '3x',
      selected,
      size,
      variant,
      children,
      css,
      ...rest
    },
    ref,
  ) => {
    const buttonGroupContext = useButtonGroup();
    let divider = null;
    if (buttonGroupContext) {
      const {
        size: buttonGroupSize,
        variant: buttonGroupVariant,
        vertical: buttonGroupVertical,
      } = { ...buttonGroupContext };
      // - Use the inherited value from the button group
      // - Fallback to the default value if the value is null or undefined
      size = (buttonGroupSize ?? size) ?? defaultSize;
      variant = (buttonGroupVariant ?? variant) ?? defaultVariant;
      const useNegativeMargin = (variant === 'secondary');
      const useDivideLine = ['emphasis', 'primary', 'default', 'ghost'].indexOf(variant) >= 0;
      if (useDivideLine) {
        divider = buttonGroupVertical ? (
          <Box height="1px" bg="gray:70" />
        ) : (
          <Box width="1px" bg="gray:70" />
        );
      }
      const horizontalCss = {
        '&:not(:first-of-type)': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        '&:not(:last-of-type)': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        // hide last divide line
        '&:last-of-type + *': {
          display: useDivideLine ? 'none' : 'inherit',
        },
        // adjacent sibling
        '&+&': {
          marginLeft: useNegativeMargin ? -1 : 0,
        },
        ...css
      };
      const verticalCss = {
        '&:not(:first-of-type)': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        '&:not(:last-of-type)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        // hide last divide line
        '&:last-of-type + *': {
          display: useDivideLine ? 'none' : 'inherit',
        },
        // adjacent sibling
        '&+&': {
          marginTop: useNegativeMargin ? -1 : 0,
        },
        ...css
      };
      css = buttonGroupVertical ? verticalCss : horizontalCss;
    } else {
      // Use the default value if the value is null or undefined
      size = size ?? defaultSize;
      variant = variant ?? defaultVariant;
    }
    const buttonStyleProps = useButtonStyle({
      size,
      variant,
    });
    const theme = useTheme();
    const { radii } = theme;
    let innerRadius;
    const radius = radii[borderRadius] ?? borderRadius;
    innerRadius = `calc(${radius} - 3px)`;
    if (/^\d+(\.\d+)?%$/.test(radius)) {
      innerRadius = radius;
    }

    return (
      <>
        <ButtonBase
          ref={ref}
          as={Comp}
          type={type}
          borderRadius={borderRadius}
          data-selected={selected ? 'true' : undefined}
          px={px}
          css={css}
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
        { divider }
      </>
    );
  },
);

Button.displayName = 'Button';

export default Button;
