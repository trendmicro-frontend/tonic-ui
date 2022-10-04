import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  defaultSeverity,
  defaultVariant,
} from './defaults';
import {
  useAlertIconStyle,
} from './styles';

const AlertIcon = forwardRef((
  {
    severity = defaultSeverity,
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const styleProps = useAlertIconStyle({ variant, severity });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

AlertIcon.displayName = 'AlertIcon';

export default AlertIcon;
