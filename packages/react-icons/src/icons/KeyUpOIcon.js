// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const KeyUpOIcon = (
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
      <g><path key="key-up-o-0" d="M12 12l4 4h-8zM14 1h-5c-0.552 0.001-0.999 0.448-1 1v4.414l-2.586 2.586h-1.414v2h-2v1.414l-1 1v1.586h1.586l7-7h4.414c0.552-0.001 0.999-0.448 1-1v-5c-0.001-0.552-0.448-0.999-1-1h-0zM14 0c1.105 0 2 0.895 2 2v0 5c0 1.105-0.895 2-2 2v0h-4l-7 7h-3v-3l1-1v-2h2v-2h2l2-2v-4c0-1.105 0.895-2 2-2v0zM12.5 3c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c0.276 0 0.5-0.224 0.5-0.5v0c-0-0.276-0.224-0.5-0.5-0.5h-0zM12.5 2c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5c-0.828 0-1.5-0.672-1.5-1.5v0c0-0.828 0.672-1.5 1.5-1.5v0z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  KeyUpOIcon.displayName = 'KeyUpOIcon';
}
export default React.forwardRef(KeyUpOIcon);
