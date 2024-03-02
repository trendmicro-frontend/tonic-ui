// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const SaveIcon = forwardRef((
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
      <g><path key="save-0" d="M11 1h-9c-0.6 0-1 0.4-1 1v12c0 0.6 0.4 1 1 1h12c0.6 0 1-0.4 1-1v-9l-4-4zM3 2h5v3h1v-3h1v4h-7v-4zM13 13h-10v-5h10v5z" /></g>
    </SVGIcon>
  );
});

SaveIcon.displayName = 'SaveIcon';

export default SaveIcon;
