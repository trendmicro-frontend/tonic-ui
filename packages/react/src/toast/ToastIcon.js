import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastIconStyle,
} from './styles';

const ToastIcon = forwardRef((
  {
    appearance = defaultAppearance,
    ...rest
  },
  ref,
) => {
  const styleProps = useToastIconStyle({ appearance });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

ToastIcon.displayName = 'ToastIcon';

export default ToastIcon;
