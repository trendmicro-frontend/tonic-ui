import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSpaceStyle } from './styles';

const Space = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Space' });
  const styleProps = useSpaceStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Space.displayName = 'Space';

export default Space;
