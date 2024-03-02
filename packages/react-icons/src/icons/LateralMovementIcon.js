// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const LateralMovementIcon = forwardRef((
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
      <g><path key="lateral-movement-0" d="M5 8c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1v0c0.552 0 1 0.448 1 1v0zM6.448 6l2 2-2 2 0.552 0.552 2.552-2.552-2.552-2.552zM10.5 5.448l-0.552 0.552 2 2-2 2 0.552 0.552 2.552-2.552zM16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-4.418 3.582-8 8-8v0c4.418 0 8 3.582 8 8v0zM15 8c0-3.866-3.134-7-7-7s-7 3.134-7 7c0 3.866 3.134 7 7 7v0c3.866 0 7-3.134 7-7v0z" /></g>
    </SVGIcon>
  );
});

LateralMovementIcon.displayName = 'LateralMovementIcon';

export default LateralMovementIcon;
