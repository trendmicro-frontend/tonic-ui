// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const SliderIcon = forwardRef((
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
      <g><path key="slider-0" d="M7 2v-0.25c-0.001-0.414-0.336-0.749-0.75-0.75h-2.5c-0.414 0.001-0.749 0.336-0.75 0.75v0.25h-3v2h3v0.25c0.001 0.414 0.336 0.749 0.75 0.75h2.5c0.414-0.002 0.748-0.336 0.75-0.75v-0.25h9v-2zM4 4v-2h2v2zM13 6.75c-0.002-0.414-0.336-0.748-0.75-0.75h-2.5c-0.414 0.002-0.748 0.336-0.75 0.75v0.25h-9v2h9v0.25c0.002 0.414 0.336 0.748 0.75 0.75h2.5c0.414-0.002 0.748-0.336 0.75-0.75v-0.25h3v-2h-3zM10 9v-2h2v2zM7 11.75c-0.002-0.414-0.336-0.748-0.75-0.75h-2.5c-0.414 0.001-0.749 0.336-0.75 0.75v0.25h-3v2h3v0.25c0.001 0.414 0.336 0.749 0.75 0.75h2.5c0.414-0.002 0.748-0.336 0.75-0.75v-0.25h9v-2h-9zM4 14v-2h2v2z" /></g>
    </SVGIcon>
  );
});

SliderIcon.displayName = 'SliderIcon';

export default SliderIcon;
