// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const PlanPendingIcon = forwardRef((
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
      <g><path key="plan-pending-0" d="M14.5 8h1.5c0 4.4-3.6 8-8 8s-8-3.6-8-8c0-4.4 3.6-8 8-8v1.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5c3.6 0 6.5-2.9 6.5-6.5zM10 0c-0.6 0-1 0.4-1 1s0.4 1 1 1 1-0.4 1-1-0.4-1-1-1zM13 2c-0.6 0-1 0.4-1 1s0.4 1 1 1 1-0.4 1-1-0.4-1-1-1zM15 5c-0.6 0-1 0.4-1 1s0.4 1 1 1 1-0.4 1-1-0.4-1-1-1z" /></g>
    </SVGIcon>
  );
});

PlanPendingIcon.displayName = 'PlanPendingIcon';

export default PlanPendingIcon;
