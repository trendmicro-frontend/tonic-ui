// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const AngleLeftIcon = forwardRef((
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
      <g><path key="angle-left-0" d="M9.501 12.506l-4.499-4.506 4.488-4.494 1 1-3.49 3.494 3.501 3.506z" /></g>
    </SVGIcon>
  );
});

AngleLeftIcon.displayName = 'AngleLeftIcon';

export default AngleLeftIcon;
