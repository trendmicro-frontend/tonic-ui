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
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = useInputGroup();

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
