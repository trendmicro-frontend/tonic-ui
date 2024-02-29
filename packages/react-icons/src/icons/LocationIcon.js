// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const LocationIcon = (
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
      <g><path key="location-0" d="M2 1v15h12v-15zM6 4h1v1h-1zM6 6h1v1h-1zM6 8h1v1h-1zM6 10h1v1h-1zM5 13h-1v-1h1zM5 11h-1v-1h1zM5 9h-1v-1h1zM5 7h-1v-1h1zM5 5h-1v-1h1zM10 15h-4v-2h4zM10 11h-1v-1h1zM10 9h-1v-1h1zM10 7h-1v-1h1zM10 5h-1v-1h1zM12 13h-1v-1h1zM12 11h-1v-1h1zM12 9h-1v-1h1zM12 7h-1v-1h1zM12 5h-1v-1h1z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  LocationIcon.displayName = 'LocationIcon';
}
export default React.forwardRef(LocationIcon);
