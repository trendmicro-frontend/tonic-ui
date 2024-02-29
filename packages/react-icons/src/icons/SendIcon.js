// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const SendIcon = (
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
      <g><path key="send-0" d="M0 0l1 6 10 2-10 2-1 6 16-8-16-8z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  SendIcon.displayName = 'SendIcon';
}
export default React.forwardRef(SendIcon);
