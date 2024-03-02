// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const PlaybookIcon = (
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
      <g><path key="playbook-0" d="M1 0v16h14v-16h-14zM14 15h-12v-14h12v14zM7.3 8.6h-2.3l0.6-5.6h3.6l-1.2 3.8h3l-4.2 6.2 0.5-4.4z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  PlaybookIcon.displayName = 'PlaybookIcon';
}
export default React.forwardRef(PlaybookIcon);
