import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import InputBase from './InputBase';
import { getInputGroupCSS, useInputStyle } from './styles';
import useInputGroup from './useInputGroup';
import { defaultSize, defaultVariant } from './constants';

const Input = forwardRef((inProps, ref) => {
  const {
    size: sizeProp,
    variant: variantProp,
    css: cssProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Input' });
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
