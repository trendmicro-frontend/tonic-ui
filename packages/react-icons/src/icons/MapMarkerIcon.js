// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const MapMarkerIcon = forwardRef((
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
      <g><path key="map-marker-0" d="M14 6c0-0.001 0-0.003 0-0.004 0-3.314-2.686-6-6-6s-6 2.686-6 6c0 1.404 0.482 2.695 1.29 3.717l-0.010-0.013 4.72 6.3 4.72-6.3c0.797-1.008 1.279-2.298 1.28-3.7v-0zM8 3c1.657 0 3 1.343 3 3s-1.343 3-3 3c-1.657 0-3-1.343-3-3v0c0-1.657 1.343-3 3-3v0z" /></g>
    </SVGIcon>
  );
});

MapMarkerIcon.displayName = 'MapMarkerIcon';

export default MapMarkerIcon;
