import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputGroupAddonStyle } from './styles';
import useInputGroup from './useInputGroup';

const InputGroupAddon = forwardRef((
  {
    size,
    variant,
    ...rest
  },
  ref,
) => {
  const inputGroupContext = useInputGroup();
  if (!inputGroupContext) {
    throw new Error('`InputGroupAddon` must be a descendant of a `InputGroup`.');
  }

  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = inputGroupContext;

  // Use fallback values if values are null or undefined
  size = size ?? inputGroupSize;
  variant = variant ?? inputGroupVariant;

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
