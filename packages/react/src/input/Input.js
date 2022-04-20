import React, { forwardRef } from 'react';
import InputBase from './InputBase';
import { getInputGroupCSS, useInputStyle } from './styles';
import useInputGroup from './useInputGroup';

const defaultSize = 'md';
const defaultVariant = 'outline';

const Input = forwardRef((
  {
    size: sizeProp,
    variant: variantProp,
    css: cssProp,
    ...rest
  },
  ref,
) => {
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
  const css = inputGroupContext ? [getInputGroupCSS({ variant }), cssProp] : cssProp;
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
