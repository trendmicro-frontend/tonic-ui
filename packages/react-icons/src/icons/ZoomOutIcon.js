// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ZoomOutIcon = (
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
      <g><path key="zoom-out-0" d="M11.7 10.3c2.1-2.9 1.5-7-1.4-9.1s-7-1.5-9.1 1.4-1.5 7 1.4 9.1c2.3 1.7 5.4 1.7 7.7 0l4.3 4.3 1.4-1.4-4.3-4.3zM6.5 11.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5c0 2.8-2.2 5-5 5zM3 6h7v1h-7c0 0 0-1 0-1z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ZoomOutIcon.displayName = 'ZoomOutIcon';
}
export default React.forwardRef(ZoomOutIcon);
