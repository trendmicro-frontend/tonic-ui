import React, { forwardRef } from 'react';
import Flex from '../Flex';
import { useInputGroup } from '../InputGroup/context';
import useInputGroupAddonStyle from './useInputGroupAddonStyle';

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

  // - Use the inherited value from the input group
  // - A fallback default value is not necessary for `InputGroupAddon`
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
