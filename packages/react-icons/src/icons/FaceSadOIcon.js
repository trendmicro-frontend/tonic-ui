// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const FaceSadOIcon = (
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
      <g><path key="face-sad-o-0" d="M8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5c-3.59 0-6.5-2.91-6.5-6.5v0c0.004-3.588 2.912-6.496 6.5-6.5h0zM8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM5 4.998c-0.552 0-1 0.448-1 1s0.448 1 1 1c0.552 0 1-0.448 1-1v0c0-0.552-0.448-1-1-1v0zM11 4.998c-0.552 0-1 0.448-1 1s0.448 1 1 1c0.552 0 1-0.448 1-1v0c0-0.552-0.448-1-1-1v0zM12 10.832c-0.621-1.648-2.172-2.805-3.996-2.835l-0.004-0c-1.828 0.030-3.379 1.187-3.99 2.805l-0.010 0.030 0.95 0.332c0.48-1.253 1.658-2.133 3.046-2.167l0.004-0c1.392 0.034 2.57 0.914 3.042 2.144l0.008 0.023z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  FaceSadOIcon.displayName = 'FaceSadOIcon';
}
export default React.forwardRef(FaceSadOIcon);
