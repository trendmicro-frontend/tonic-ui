// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const CloudIcon = forwardRef((
  {
    spin = false,
    ...props
  },
  ref,
) => {
  const styleProps = getIconStyleProps({ spin });
  return (
    <SVGIcon
      ref={ref}
      viewBox="0 0 16 16"
      {...styleProps}
      {...props}
    >
      <g><path key="cloud-0" d="M13.469 7.045c0-0.015 0.004-0.029 0.004-0.045 0-0.013 0-0.029 0-0.045 0-2.184-1.771-3.955-3.955-3.955-1.628 0-3.027 0.984-3.633 2.39l-0.010 0.026c-0.389-0.263-0.869-0.421-1.385-0.421-1.376 0-2.491 1.115-2.491 2.491 0 0.198 0.023 0.39 0.067 0.575l-0.003-0.017c-1.18 0.214-2.063 1.233-2.063 2.459 0 1.379 1.118 2.497 2.497 2.497 0.001 0 0.002 0 0.003 0l10.5-0.003c0.010 0 0.019 0.003 0.029 0.003 1.644-0.014 2.971-1.35 2.971-2.996 0-1.49-1.088-2.727-2.514-2.957l-0.017-0.002z" /></g>
    </SVGIcon>
  );
});

CloudIcon.displayName = 'CloudIcon';

export default CloudIcon;
