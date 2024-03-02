// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ServerUpdateIcon = forwardRef((
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
      <g><path key="server-update-0" d="M11 6c-2.761 0-5 2.239-5 5s2.239 5 5 5c2.761 0 5-2.239 5-5v0c0-2.761-2.239-5-5-5v0zM11 14l-3-3h2v-3h2v3h2zM14 0h-14v3h14zM5 2h-3v-1h3zM0 8v3h5c0.002-1.105 0.303-2.14 0.825-3.028l-0.015 0.028zM2 10v-1h2v1zM11 5c1.105 0.002 2.14 0.303 3.028 0.825l-0.028-0.015v-1.81h-14v3h6.54c1.101-1.227 2.69-1.996 4.459-2h0.001zM2 6v-1h3v1z" /></g>
    </SVGIcon>
  );
});

ServerUpdateIcon.displayName = 'ServerUpdateIcon';

export default ServerUpdateIcon;
