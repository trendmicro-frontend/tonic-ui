// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const KeyAddOIcon = (
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
      <g><path key="key-add-o-0" d="M16 13h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM9.293 8.293l-1.707 1.707h1.414l1-1v-1h-0.414zM2.586 15h-1.586v-1.586l1-1v-1.414h2v-2h1.414l2.586-2.586v-4.414c0.001-0.552 0.448-0.999 1-1h5c0.552 0.001 0.999 0.448 1 1v5c-0.001 0.552-0.448 0.999-1 1h-0v1c1.105 0 2-0.895 2-2v0-5c0-1.105-0.895-2-2-2v0h-5c-1.105 0-2 0.895-2 2v0 4l-2 2h-2v2h-2v2l-1 1v3h3l4-4v-1.414zM14 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5v0c0.828 0 1.5 0.672 1.5 1.5v0zM13 3.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5c0 0.276 0.224 0.5 0.5 0.5v0c0.276-0 0.5-0.224 0.5-0.5v-0z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  KeyAddOIcon.displayName = 'KeyAddOIcon';
}
export default React.forwardRef(KeyAddOIcon);
