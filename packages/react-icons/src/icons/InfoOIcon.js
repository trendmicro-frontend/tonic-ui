// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const InfoOIcon = forwardRef((
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
      <g><path key="info-o-0" d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5c3.59 0 6.5 2.91 6.5 6.5v0c-0.006 3.588-2.912 6.494-6.499 6.5h-0.001zM6 7v1h1v3h-1v1h4v-1h-1v-4zM9 4h-2v2h2z" /></g>
    </SVGIcon>
  );
});

InfoOIcon.displayName = 'InfoOIcon';

export default InfoOIcon;
