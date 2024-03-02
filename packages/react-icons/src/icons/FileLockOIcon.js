// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const FileLockOIcon = (
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
      <g><path key="file-lock-o-0" d="M1 1h8v4h4v2h1v-3l-4-4h-9c-0.536 0.040-0.96 0.464-1 0.996l-0 0.004v14c0.040 0.536 0.464 0.96 0.996 1l0.004 0h6v-1h-6zM10 1.4l2.6 2.6h-2.6z" />,<path key="file-lock-o-1" d="M14 11v-3h-5v3h-1v5h7v-5zM12 14h-1v-1h1zM13 11h-3v-2h3z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  FileLockOIcon.displayName = 'FileLockOIcon';
}
export default React.forwardRef(FileLockOIcon);
