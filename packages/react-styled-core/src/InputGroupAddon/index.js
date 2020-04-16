import React, { forwardRef } from 'react';
import Flex from '../Flex';
import { useInputGroup } from '../InputGroup/context';
import { useInputGroupAddonStyle } from './styles';

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
    <Flex
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
