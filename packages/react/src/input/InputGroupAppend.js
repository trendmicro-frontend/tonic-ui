import React, { forwardRef } from 'react';
import { Box } from '../box';
import { getInputGroupAppendCSS, useInputGroupAppendStyle } from './styles';

const InputGroupAppend = forwardRef((
  {
    css: cssProp,
    ...rest
  },
  ref,
) => {
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
