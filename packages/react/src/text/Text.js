import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTextStyle } from './styles';

const Text = forwardRef((inProps, ref) => {
  const {
    size,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Text' });
  const styleProps = useTextStyle({ size });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Text.displayName = 'Text';

export default Text;
