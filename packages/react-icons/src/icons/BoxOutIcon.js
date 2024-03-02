// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const BoxOutIcon = (
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
      <g><path key="box-out-0" d="M10 13v-3h-5v-4h5v-3l5 5zM8 2h-6v12h6v1h-6c-0.552 0-1-0.448-1-1v0-12c0-0.552 0.448-1 1-1v0h6v1z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BoxOutIcon.displayName = 'BoxOutIcon';
}
export default React.forwardRef(BoxOutIcon);
