// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const VirustotalIcon = forwardRef((
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
      <g><path key="virustotal-0" d="M14 15h-13l6.6-7-6.6-7h13c0.6 0 1 0.4 1 1v12c0 0.6-0.4 1-1 1zM3.3 14h10.7v-12h-10.7l5.7 6-5.7 6z" /></g>
    </SVGIcon>
  );
});

VirustotalIcon.displayName = 'VirustotalIcon';

export default VirustotalIcon;
