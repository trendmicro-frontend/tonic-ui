// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const LockOpenIcon = forwardRef((
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
      <g><path key="lock-open-0" d="M13.25 6h-7.25v-3c0.001-0.552 0.448-0.999 1-1h2c0.552 0.001 0.999 0.448 1 1v1h2v-1c-0.002-1.656-1.344-2.998-3-3h-2c-1.656 0.002-2.998 1.344-3 3v3h-1.25c-0.414 0.002-0.748 0.336-0.75 0.75v8.5c0.002 0.414 0.336 0.748 0.75 0.75h10.5c0.414-0.002 0.748-0.336 0.75-0.75v-8.5c-0.002-0.414-0.336-0.748-0.75-0.75h-0zM9 12h-2v-2h2z" /></g>
    </SVGIcon>
  );
});

LockOpenIcon.displayName = 'LockOpenIcon';

export default LockOpenIcon;
