// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const FileCodeOIcon = (
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
      <g><path key="file-code-o-0" d="M11 0h-9c-0.5 0-1 0.5-1 1v14c0 0.5 0.5 1 1 1h12c0.5 0 1-0.5 1-1v-11l-4-4zM11 1.4l2.6 2.6h-2.6v-2.6zM14 15h-12v-14h8v4h4v10zM10.6 7.2l0.9-0.4 1.6 3.2-1.6 3.2-0.9-0.4 1.4-2.8-1.4-2.8zM5.4 7.2l-1.3 2.8 1.4 2.8-0.9 0.4-1.7-3.2 1.6-3.2 0.9 0.4zM8.5 5.9l1 0.2-2 8-1-0.2 2-8z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  FileCodeOIcon.displayName = 'FileCodeOIcon';
}
export default React.forwardRef(FileCodeOIcon);
