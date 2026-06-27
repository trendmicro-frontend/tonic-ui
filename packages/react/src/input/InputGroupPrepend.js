import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { getInputGroupPrependCSS, useInputGroupPrependStyle } from './styles';

/**
 * @typedef {Object} InputGroupPrependProps
 * @property {React.ReactNode} [children] - The content to prepend to the input group.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupPrependProps>}
 */
const InputGroupPrepend = forwardRef((inProps, ref) => {
  const {
    css: cssProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputGroupPrepend' });
  const css = [getInputGroupPrependCSS(), cssProp];
  const styleProps = useInputGroupPrependStyle();

  return (
    <Box
      ref={ref}
      css={css}
      {...styleProps}
      {...rest}
    />
  );
});

InputGroupPrepend.displayName = 'InputGroupPrepend';

export default InputGroupPrepend;
