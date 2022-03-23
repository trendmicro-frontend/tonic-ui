import React, { forwardRef } from 'react';
import ButtonBase from './ButtonBase';
import { useButtonStyle } from './styles';
import useButtonGroup from './useButtonGroup';

const defaultSize = 'md';
const defaultVariant = 'default';
const defaultOrientation = 'horizontal';

const Button = forwardRef((
  {
    size,
    variant,
    ...rest
  },
  ref,
) => {
  let orientation; // orientation for ButtonGroup

  const buttonGroupContext = useButtonGroup();
  if (buttonGroupContext) {
    const {
      size: buttonGroupSize,
      variant: buttonGroupVariant,
      orientation: buttonGroupOrientation,
    } = { ...buttonGroupContext };
    // Use fallback values if values are null or undefined
    size = (size ?? buttonGroupSize) ?? defaultSize;
    variant = (variant ?? buttonGroupVariant) ?? defaultVariant;
    orientation = (orientation ?? buttonGroupOrientation) ?? defaultOrientation;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useButtonStyle({
    orientation, // No default value if not specified
    size,
    variant,
  });

  return (
    <ButtonBase
      ref={ref}
      as="button"
      type="button"
      {...styleProps}
      {...rest}
    />
  );
});

Button.displayName = 'Button';

export default Button;
