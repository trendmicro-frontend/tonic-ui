// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const DownloadIcon = forwardRef((
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
      <g><path key="download-0" d="M15 10v4c0 0.5-0.5 1-1 1h-12c-0.5 0-1-0.5-1-1v-4h1v4h12v-4h1zM8 11l5-5h-3v-5h-4v5h-3l5 5z" /></g>
    </SVGIcon>
  );
});

DownloadIcon.displayName = 'DownloadIcon';

export default DownloadIcon;
