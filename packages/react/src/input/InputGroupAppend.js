import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { getInputGroupAppendCSS, useInputGroupAppendStyle } from './styles';

/**
 * @typedef {Object} InputGroupAppendProps
 * @property {React.ReactNode} [children] - The content to append to the input group.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupAppendProps>}
 */
const InputGroupAppend = forwardRef((inProps, ref) => {
  const {
    css: cssProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputGroupAppend' });
  const css = [getInputGroupAppendCSS(), cssProp];
  const styleProps = useInputGroupAppendStyle();

  return (
    <Box
      ref={ref}
      css={css}
      {...styleProps}
      {...rest}
    />
  );
});

InputGroupAppend.displayName = 'InputGroupAppend';

export default InputGroupAppend;
