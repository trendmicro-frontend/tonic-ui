// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ArrowUpIcon = (
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
      <g><path key="arrow-up-0" d="M12.311 8.103l-3.326-3.307v10.205h-2v-10.189l-3.292 3.305-1.416-1.412 5.705-5.726 5.739 5.707z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ArrowUpIcon.displayName = 'ArrowUpIcon';
}
export default React.forwardRef(ArrowUpIcon);
