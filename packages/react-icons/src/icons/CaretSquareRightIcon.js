// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const CaretSquareRightIcon = (
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
      <g><path key="caret-square-right-0" d="M14 3v10h-12v-10h12zM14 2h-12c-0.552 0-1 0.448-1 1v0 10c0 0.552 0.448 1 1 1v0h12c0.552 0 1-0.448 1-1v0-10c0-0.552-0.448-1-1-1v0zM6 4v8l5-4z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  CaretSquareRightIcon.displayName = 'CaretSquareRightIcon';
}
export default React.forwardRef(CaretSquareRightIcon);
