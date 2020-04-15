import React, { forwardRef } from 'react';
import InputBase from '../InputBase';
import { useInputGroup } from '../InputGroup/context';
import { getInputGroupCSS, useInputStyle } from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';

const Input = forwardRef((
  {
    size,
    variant,
    css,
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

    // - Use the inherited value from the input group
    // - Fallback to the default value if the value is null or undefined
    size = (size ?? inputGroupSize) ?? defaultSize;
    variant = (variant ?? inputGroupVariant) ?? defaultVariant;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useInputStyle({ size, variant });

  return (
    <InputBase
      ref={ref}
      as="input"
      css={[ // TODO: combine the css array in v11
        getInputGroupCSS({ variant }),
        css,
      ]}
      {...styleProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
