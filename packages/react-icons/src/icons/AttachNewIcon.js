// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const AttachNewIcon = (
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
      <g><path key="attach-new-0" d="M10 5h5v-1l-4-4h-3v1h2zM11 1.4l2.6 2.6h-2.6zM2 15h4v1h-4c-0.536-0.040-0.96-0.464-1-0.996l-0-0.004v-7h1zM4.71 3h2.29v1h-2.29l1.62 1.62-0.71 0.71-1.62-1.62v2.29h-1v-2.29l-1.62 1.62-0.71-0.71 1.62-1.62h-2.29v-1h2.29l-1.62-1.62 0.71-0.71 1.62 1.62v-2.29h1v2.29l1.62-1.62 0.71 0.71zM10.29 15.53l4.88-4.8c0.509-0.498 0.825-1.192 0.825-1.96s-0.316-1.462-0.825-1.96l-0.001-0c-0.513-0.509-1.22-0.824-2-0.824s-1.487 0.315-2 0.824l0-0-3.69 3.68 0.7 0.71 3.74-3.68c0.329-0.32 0.779-0.517 1.275-0.517s0.946 0.197 1.275 0.518l-0-0c0.324 0.316 0.524 0.757 0.524 1.245s-0.201 0.929-0.524 1.245l-0 0-4.88 4.8c-0.119 0.118-0.284 0.192-0.465 0.192s-0.346-0.073-0.465-0.192l0 0c-0.116-0.113-0.188-0.27-0.188-0.445s0.072-0.332 0.188-0.445l0-0 4.88-4.8-0.7-0.71-4.84 4.8c-0.299 0.294-0.484 0.703-0.484 1.155s0.185 0.861 0.484 1.155l0 0c0.301 0.293 0.712 0.473 1.165 0.473s0.864-0.181 1.165-0.474l-0 0z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  AttachNewIcon.displayName = 'AttachNewIcon';
}
export default React.forwardRef(AttachNewIcon);
