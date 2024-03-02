// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const SortUpIcon = forwardRef((
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
      <g><path key="sort-up-0" d="M10.3 8l-2.3-2.19v6.19h-1v-6.19l-2.3 2.19-0.7-0.667 3.5-3.333 3.5 3.333z" /></g>
    </SVGIcon>
  );
});

SortUpIcon.displayName = 'SortUpIcon';

export default SortUpIcon;
