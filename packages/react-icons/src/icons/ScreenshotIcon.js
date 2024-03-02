// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ScreenshotIcon = forwardRef((
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
      <g><path key="screenshot-0" d="M16 13.5h-2.5v2.5h-1.5v-2.5h-9.5v-9.475h-2.492v-1.5h2.492v-2.525h1.5v2.525h9.508v1.5h-0.008v6.975h-1.5v-6.975h-8v7.975h12z" /></g>
    </SVGIcon>
  );
});

ScreenshotIcon.displayName = 'ScreenshotIcon';

export default ScreenshotIcon;
