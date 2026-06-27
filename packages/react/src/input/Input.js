import { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import InputBase from './InputBase';
import { getInputGroupCSS, useInputStyle } from './styles';
import useInputGroup from './useInputGroup';
import { defaultSize, defaultVariant } from './constants';

/**
 * @typedef {Object} InputProps
 * @property {boolean} [disabled] - The input is disabled and the user cannot interact with it.
 * @property {boolean} [error] - The input displays a red border to indicate an error.
 * @property {boolean} [readOnly] - The value of the input cannot be edited.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The visual size of the `input` element.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} [variant='outline'] - The variant of the input style to use.
 */

/**
 * @type {ForwardRefComponent<'input', InputProps>}
 */
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
