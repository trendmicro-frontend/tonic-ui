// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const AddSquarePlusOIcon = (
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
      <g><path key="add-square-plus-o-0" d="M11 9h3v2h-3v3h-2v-3h-3v-2h3v-3h2zM16 5v10c-0.002 0.552-0.448 0.998-1 1h-10c-0.552-0.002-0.998-0.448-1-1v-1h-1c-0.552-0.002-0.998-0.448-1-1v-1h-1c-0.552-0.002-0.998-0.448-1-1v-10c0.002-0.552 0.448-0.998 1-1h10c0.552 0.002 0.998 0.448 1 1v1h1c0.552 0.002 0.998 0.448 1 1v1h1c0.552 0.002 0.998 0.448 1 1v0zM3 2h8v-1h-10v10h1v-8c0.002-0.552 0.448-0.998 1-1h0zM5 4h8v-1h-10v10h1v-8c0.002-0.552 0.448-0.998 1-1h0zM15 5h-10v10h10z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  AddSquarePlusOIcon.displayName = 'AddSquarePlusOIcon';
}
export default React.forwardRef(AddSquarePlusOIcon);
