// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ArrowRightIcon = forwardRef((
  {
    spin = false,
    ...props
  },
  ref,
) => {
  const styleProps = getIconStyleProps({ spin });
  return (
    <SVGIcon
      ref={ref}
      viewBox="0 0 16 16"
      {...styleProps}
      {...props}
    >
      <g><path key="arrow-right-0" d="M15 7.976l-5.707 5.739-1.418-1.41 3.316-3.335h-10.191v-2h10.158l-3.296-3.283 1.412-1.416 4.716 4.699h0.009v0.009z" /></g>
    </SVGIcon>
  );
});

ArrowRightIcon.displayName = 'ArrowRightIcon';

export default ArrowRightIcon;
