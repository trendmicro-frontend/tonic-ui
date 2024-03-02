// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const DesktopDownIcon = (
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
      <g><path key="desktop-down-0" d="M14 7.41l1-1v4.59c0 0.552-0.448 1-1 1v0h-5v0.5l2.75 1.57c0.148 0.089 0.245 0.248 0.245 0.43 0 0.274-0.221 0.497-0.495 0.5h-7c-0.274-0.003-0.495-0.226-0.495-0.5 0-0.182 0.097-0.341 0.243-0.429l0.002-0.001 2.75-1.57v-0.5h-5c-0.552 0-1-0.448-1-1v0-9c0-0.552 0.448-1 1-1v0h8v2h-7v7h10v-1.59zM15 4h-2v-4h-2v4h-3l4 4 4-4z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  DesktopDownIcon.displayName = 'DesktopDownIcon';
}
export default React.forwardRef(DesktopDownIcon);
