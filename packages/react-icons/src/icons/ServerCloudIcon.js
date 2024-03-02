// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ServerCloudIcon = forwardRef((
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
      <g><path key="server-cloud-0" d="M1 0v3h14v-3zM6 2h-3v-1h3zM1 4v3h14v-3zM6 6h-3v-1h3zM7 8h8v3h-2.34c-0.577-1.19-1.774-1.996-3.16-2h-0c-0.273 0-0.539 0.033-0.793 0.095l0.023-0.005c-0.413-0.555-1.017-0.95-1.712-1.087l-0.018-0.003zM5 8l-2.45 2c-0.106-0.019-0.227-0.030-0.352-0.030-0.449 0-0.865 0.142-1.205 0.384l0.006-0.004v-2.35h4c-1.114 0.225-2.014 0.977-2.442 1.978l-0.008 0.022zM6 10c0.666 0.003 1.255 0.331 1.616 0.834l0.004 0.006 0.49 0.68 0.75-0.36c0.186-0.097 0.406-0.155 0.638-0.16l0.002-0c0.009-0 0.020-0 0.030-0 0.722 0 1.325 0.511 1.468 1.191l0.002 0.010 0.16 0.8h2.84c0.552 0 1 0.448 1 1s-0.448 1-1 1v0h-11.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5v0c0.14 0.003 0.274 0.025 0.401 0.063l-0.011-0.003 0.93 0.25 0.29-0.91c0.261-0.813 1.007-1.392 1.889-1.4h0.001zM6 9c-1.331 0.005-2.457 0.876-2.844 2.079l-0.006 0.021c-0.194-0.059-0.417-0.095-0.647-0.1l-0.003-0c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5v0h11.5c1.105 0 2-0.895 2-2s-0.895-2-2-2v0h-2.050c-0.232-1.148-1.233-2.001-2.433-2.001-0.396 0-0.769 0.093-1.101 0.257l0.014-0.006c-0.55-0.759-1.433-1.248-2.43-1.25h-0z" /></g>
    </SVGIcon>
  );
});

ServerCloudIcon.displayName = 'ServerCloudIcon';

export default ServerCloudIcon;
