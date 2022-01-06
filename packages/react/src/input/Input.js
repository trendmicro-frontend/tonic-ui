import React, { forwardRef } from 'react';
import InputBase from './InputBase';
import { getInputGroupCSS, useInputStyle } from './styles';
import useInputGroup from './useInputGroup';

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
    // Use fallback values if values are null or undefined
    size = (size ?? inputGroupSize) ?? defaultSize;
    variant = (variant ?? inputGroupVariant) ?? defaultVariant;
    css = [
      getInputGroupCSS({ variant }),
      css,
    ];
  } else {
    // Use fallback values if values are null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useInputStyle({ size, variant });

  return (
    <InputBase
      ref={ref}
      as="input"
      css={css}
      {...styleProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
