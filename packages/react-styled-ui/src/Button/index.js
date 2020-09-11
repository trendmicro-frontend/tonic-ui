import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import { useButtonGroup } from '../ButtonGroup/context';
import { getButtonGroupCSS, useButtonStyle } from './styles';

const defaultSize = 'md';
const defaultVariant = 'default';

const Button = forwardRef(
  (
    {
      as: Comp = 'button',
      type = 'button',
      borderRadius = 'sm',
      size,
      variant,
      children,
      css,
      ...rest
    },
    ref,
  ) => {
    const buttonGroupContext = useButtonGroup();
    let isInGroup = false;
    let useVertical = false;
    if (buttonGroupContext) {
      isInGroup = true;
      const {
        size: buttonGroupSize,
        variant: buttonGroupVariant,
        orientation,
      } = { ...buttonGroupContext };
      useVertical = (orientation === 'vertical');
      // - Use the inherited value from the button group
      // - Fallback to the default value if the value is null or undefined
      size = (buttonGroupSize ?? size) ?? defaultSize;
      variant = (buttonGroupVariant ?? variant) ?? defaultVariant;
    } else {
      // Use the default value if the value is null or undefined
      size = size ?? defaultSize;
      variant = variant ?? defaultVariant;
    }
    const buttonStyleProps = useButtonStyle({
      size,
      variant,
      borderRadius,
    });
    css = [
      isInGroup && getButtonGroupCSS({ useVertical }),
      { ...css }
    ];

    return (
      <ButtonBase
        ref={ref}
        as={Comp}
        type={type}
        borderRadius={borderRadius}
        css={css}
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
