// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const KeyAppOIcon = (
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
      <g><path key="key-app-o-0" d="M8 12h3v3h-3v-3zM8 11h3v-3h-3v3zM14 0h-5c-1.1 0-2 0.9-2 2v4l-2 2h-2v2h-2v2l-1 1v3h3l4-4v-1.4l-4.4 4.4h-1.6v-1.6l1-1v-1.4h2v-2h1.4l2.6-2.6v-4.4c0-0.6 0.4-1 1-1h5c0.6 0 1 0.4 1 1v5c0 0.6-0.4 1-1 1h-2v3h3v-2.27c0.6-0.35 1-0.99 1-1.73v-5c0-1.1-0.9-2-2-2zM12 15h3v-3h-3v3zM12.5 5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zM12.5 4c0.3 0 0.5-0.2 0.5-0.5s-0.2-0.5-0.5-0.5-0.5 0.2-0.5 0.5 0.2 0.5 0.5 0.5z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  KeyAppOIcon.displayName = 'KeyAppOIcon';
}
export default React.forwardRef(KeyAppOIcon);
