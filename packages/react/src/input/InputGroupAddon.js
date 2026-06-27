import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultSize, defaultVariant } from './constants';
import { useInputGroupAddonStyle } from './styles';
import useInputGroup from './useInputGroup';

/**
 * @typedef {Object} InputGroupAddonProps
 * @property {React.ReactNode} [children] - The content of the input group addon.
 * @property {('sm'|'md'|'lg')} [size='md'] - The size of the input group addon.
 * @property {('outline'|'filled'|'flush'|'unstyled')} [variant='outline'] - The variant of the input group addon style.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupAddonProps>}
 */
const InputGroupAddon = forwardRef((inProps, ref) => {
  const {
    size: sizeProp,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputGroupAddon' });
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
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
