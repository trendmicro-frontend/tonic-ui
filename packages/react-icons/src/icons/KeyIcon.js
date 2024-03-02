// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const KeyIcon = (
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
      <g><path key="key-0" d="M14 0h-5c-1.105 0-2 0.895-2 2v0 4l-2 2h-2v2h-2v2l-1 1v3h3l7-7h4c1.105 0 2-0.895 2-2v0-5c0-1.105-0.895-2-2-2v0zM12.5 5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v0c0 0.828-0.672 1.5-1.5 1.5v0z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  KeyIcon.displayName = 'KeyIcon';
}
export default React.forwardRef(KeyIcon);
