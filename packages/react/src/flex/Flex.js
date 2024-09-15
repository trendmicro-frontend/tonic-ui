import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const Flex = forwardRef((inProps, ref) => {
  const {
    direction,
    wrap,
    align,
    justify,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Flex' });

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap}
      alignItems={align}
      justifyContent={justify}
      {...rest}
    />
  );
});

Flex.displayName = 'Flex';

export default Flex;
