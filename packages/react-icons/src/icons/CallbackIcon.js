// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const CallbackIcon = (
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
      <g><path key="callback-0" d="M0 7.96v0.012c-0 0.004-0 0.010-0 0.015 0 1.967 0.709 3.767 1.885 5.161l-0.010-0.012-0.010-0.012-1.865 1.876h5v-5.028l-2.067 2.078c-0.893-1.11-1.433-2.537-1.433-4.091 0-2.488 1.387-4.653 3.43-5.763l0.035-0.017 0.035-0.017v-1.662c-2.959 1.239-5 4.11-5 7.459 0 0 0 0.001 0 0.001v0zM9 0.383c-0.264-0.237-0.615-0.383-1-0.383-0.828 0-1.5 0.671-1.5 1.5 0 0 0 0 0 0v0c0 0.064 0.004 0.126 0.012 0.187l-0.001-0.007-0-0.007c0.089 0.751 0.722 1.327 1.49 1.327 0.765 0 1.396-0.573 1.488-1.313l0.001-0.007 0.001-0.007c0.006-0.050 0.010-0.109 0.010-0.168 0-0.002 0-0.003-0-0.005v-0c0-0.001 0-0.001 0-0.002 0-0.442-0.192-0.839-0.497-1.113l-0.001-0.001-0.002-0.001zM9.415 14c-0.212-0.588-0.765-1.001-1.414-1.001-0.765 0-1.397 0.573-1.488 1.314l-0.001 0.007-0 0.007c-0.006 0.050-0.010 0.109-0.010 0.168 0 0.002 0 0.003 0 0.005v-0c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v0 0c-0-0.064-0.004-0.126-0.012-0.187l0.001 0.007 0.001 0.007c-0.014-0.125-0.042-0.24-0.082-0.348l0.003 0.010 0.004 0.011zM16 1h-5v5.028l2.066-2.078c0.893 1.11 1.434 2.537 1.434 4.091 0 2.488-1.387 4.653-3.43 5.763l-0.034 0.017-0.036 0.017v1.662c2.959-1.241 5-4.114 5-7.463 0-1.974-0.709-3.783-1.886-5.185l0.010 0.012 0.010 0.012z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  CallbackIcon.displayName = 'CallbackIcon';
}
export default React.forwardRef(CallbackIcon);
