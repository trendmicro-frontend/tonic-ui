// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ServerIcon = forwardRef((
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
      <g><path key="server-0" d="M0 1v4h16v-4zM7 3h-5v-1h5zM14 3h-1v-1h1z" />,<path key="server-1" d="M0 10h16v-4h-16zM13 7h1v1h-1zM2 7h5v1h-5z" />,<path key="server-2" d="M0 15h16v-4h-16zM13 12h1v1h-1zM2 12h5v1h-5z" /></g>
    </SVGIcon>
  );
});

ServerIcon.displayName = 'ServerIcon';

export default ServerIcon;
