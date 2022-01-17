import React, { forwardRef } from 'react';
import ButtonBase from './ButtonBase';
import { getButtonGroupCSS, useButtonStyle } from './styles';
import useButtonGroup from './useButtonGroup';

const defaultSize = 'md';
const defaultVariant = 'default';

const Button = forwardRef((
  {
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
  if (buttonGroupContext) {
    const {
      size: buttonGroupSize,
      variant: buttonGroupVariant,
      orientation,
    } = { ...buttonGroupContext };
    // Use fallback values if values are null or undefined
    size = (size ?? buttonGroupSize) ?? defaultSize;
    variant = (variant ?? buttonGroupVariant) ?? defaultVariant;
    css = [
      getButtonGroupCSS({ orientation }),
      css,
    ];
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useButtonStyle({
    size,
    variant,
    borderRadius,
  });

  return (
    <ButtonBase
      ref={ref}
      as="button"
      type={type}
      borderRadius={borderRadius}
      css={css}
      {...styleProps}
      {...rest}
    >
      { children }
    </ButtonBase>
  );
});

Button.displayName = 'Button';

export default Button;
