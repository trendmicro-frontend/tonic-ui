import React, { forwardRef } from 'react';
import { composeSx } from '@tonic-ui/utils/internal';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useInputGroupAppendStyle } from './styles';

/**
 * @typedef {Object} InputGroupAppendProps
 * @property {React.ReactNode} [children] - The content to append to the input group.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupAppendProps>}
 */
const InputGroupAppend = forwardRef((inProps, ref) => {
  const { __sx: __sxProp, ...rest } = useDefaultProps({ props: inProps, name: 'InputGroupAppend' });
  const styleProps = useInputGroupAppendStyle();

  return (
    <Box
      ref={ref}
      {...rest}
      __sx={composeSx(styleProps, __sxProp)}
    />
  );
});

InputGroupAppend.displayName = 'InputGroupAppend';

export default InputGroupAppend;
