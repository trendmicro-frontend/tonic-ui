import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputGroupAddonStyle } from './styles';
import useInputGroup from './useInputGroup';

const defaultSize = 'md';
const defaultVariant = 'outline';

const InputGroupAddon = forwardRef((
  {
    size,
    variant,
    ...rest
  },
  ref,
) => {
  const inputGroupContext = useInputGroup();
  if (inputGroupContext) {
    const {
      size: inputGroupSize,
      variant: inputGroupVariant,
    } = { ...inputGroupContext };
    // Use fallback values if values are null or undefined
    size = (size ?? inputGroupSize) ?? defaultSize;
    variant = (variant ?? inputGroupVariant) ?? defaultVariant;
  } else {
    // Use fallback values if values are null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useInputGroupAddonStyle({ size, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
