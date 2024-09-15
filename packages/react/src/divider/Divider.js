import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useDividerStyle } from './styles';

const Divider = forwardRef((inProps, ref) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Divider' });
  const styleProps = useDividerStyle({ orientation, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
