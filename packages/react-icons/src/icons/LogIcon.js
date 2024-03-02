// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const LogIcon = forwardRef((
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
      <g><path key="log-0" d="M15 1h-14c-0.552 0.002-0.998 0.448-1 1v12c0.002 0.552 0.448 0.998 1 1h14c0.552-0.002 0.998-0.448 1-1v-12c-0.002-0.552-0.448-0.998-1-1h-0zM15 14h-14v-11h14zM6.332 13l-4.301-4.354 4.301-4.353 0.699 0.707-3.603 3.646 3.603 3.647zM9.699 13l-0.699-0.707 3.603-3.646-3.603-3.647 0.699-0.707 4.301 4.353z" /></g>
    </SVGIcon>
  );
});

LogIcon.displayName = 'LogIcon';

export default LogIcon;
