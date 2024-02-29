// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const TargetIcon = (
  {
    spin = false,
    ...props
  },
  ref
) => {
  const styleProps = getIconStyleProps({ spin });
  return (
    <SVGIcon
      ref={ref}
      viewBox="0 0 16 16"
      {...styleProps}
      {...props}
    >
      <g><path key="target-0" d="M16 7.5h-1c-0.3-3.5-3-6.2-6.5-6.5v-1h-1v1c-3.5 0.3-6.2 3-6.5 6.5h-1v1h1c0.3 3.5 3 6.2 6.5 6.5v1h1v-1c3.5-0.2 6.2-3 6.5-6.5h1v-1zM8.5 13.5v-1.5h-1v1.5c-2.6-0.2-4.7-2.3-5-5h1.5v-1h-1.5c0.2-2.6 2.3-4.7 5-5v1.5h1v-1.5c2.6 0.2 4.7 2.3 5 5h-1.5v1h1.5c-0.3 2.6-2.4 4.7-5 5zM8 6c-1.1 0-2 0.9-2 2s0.9 2 2 2c1.1 0 2-0.9 2-2s-0.9-2-2-2zM8 9c-0.6 0-1-0.4-1-1s0.4-1 1-1c0.6 0 1 0.4 1 1s-0.4 1-1 1z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TargetIcon.displayName = 'TargetIcon';
}
export default React.forwardRef(TargetIcon);
