import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useVisuallyHiddenStyle } from './styles';

const VisuallyHidden = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'VisuallyHidden' });
  const styleProps = useVisuallyHiddenStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
