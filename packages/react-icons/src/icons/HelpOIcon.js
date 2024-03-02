// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const HelpOIcon = forwardRef((
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
      <g><path key="help-o-0" d="M8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5c-3.59 0-6.5-2.91-6.5-6.5v0c0.006-3.588 2.912-6.494 6.499-6.5h0.001zM8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM9 11h-2v2h2zM11.1 5.55c-0.005-0.72-0.328-1.364-0.837-1.797l-0.003-0.003c-0.563-0.469-1.295-0.754-2.093-0.754-0.059 0-0.117 0.002-0.175 0.005l0.008-0c-0.045-0.002-0.098-0.004-0.152-0.004-0.774 0-1.483 0.277-2.033 0.738l0.005-0.004c-0.498 0.456-0.811 1.105-0.82 1.828l-0 0.002h1.51c0.11-0.49 0.11-1.3 1.56-1.3s1.42 0.84 1.42 1.16c0 0.004 0 0.009 0 0.014 0 0.238-0.083 0.456-0.222 0.628l0.001-0.002c-0.381 0.406-0.779 0.782-1.199 1.133l-0.021 0.017s-1.050 0.94-1.050 1.79v1h2v-1c0-0.92 1.090-1.81 1.6-2.28 0.306-0.297 0.496-0.711 0.5-1.169v-0.001z" /></g>
    </SVGIcon>
  );
});

HelpOIcon.displayName = 'HelpOIcon';

export default HelpOIcon;
