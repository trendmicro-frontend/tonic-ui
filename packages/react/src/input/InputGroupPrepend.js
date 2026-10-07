import React, { forwardRef } from 'react';
import { composeSx } from '@tonic-ui/utils/internal';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useInputGroupPrependStyle } from './styles';

/**
 * @typedef {Object} InputGroupPrependProps
 * @property {React.ReactNode} [children] - The content to prepend to the input group.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupPrependProps>}
 */
const InputGroupPrepend = forwardRef((inProps, ref) => {
  const { __sx: __sxProp, ...rest } = useDefaultProps({ props: inProps, name: 'InputGroupPrepend' });
  const styleProps = useInputGroupPrependStyle();

  return (
    <Box
      ref={ref}
      {...rest}
      __sx={composeSx(styleProps, __sxProp)}
    />
  );
});

InputGroupPrepend.displayName = 'InputGroupPrepend';

export default InputGroupPrepend;
