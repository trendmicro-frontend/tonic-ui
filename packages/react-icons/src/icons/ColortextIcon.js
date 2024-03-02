// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const ColortextIcon = forwardRef((
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
      <g><path key="colortext-0" d="M11.718 10.216l-3.043-8.216h-1.389l-2.992 8.229-0.794 0.123v0.648h2.849v-0.648l-0.834-0.097-0.135-0.168 0.794-2.242h2.888l0.794 2.255-0.096 0.168-0.834 0.084v0.648h3.573v-0.648zM6.426 7.099l1.15-3.279 1.182 3.279zM2 14h12v-2h-12z" /></g>
    </SVGIcon>
  );
});

ColortextIcon.displayName = 'ColortextIcon';

export default ColortextIcon;
