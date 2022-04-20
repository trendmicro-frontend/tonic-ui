import React, { forwardRef } from 'react';
import { Box } from '../box';
import { getInputGroupPrependCSS, useInputGroupPrependStyle } from './styles';

const InputGroupPrepend = forwardRef((
  {
    css: cssProp,
    ...rest
  },
  ref,
) => {
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
