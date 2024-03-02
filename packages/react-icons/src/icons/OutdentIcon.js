// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const OutdentIcon = (
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
      <g><path key="outdent-0" d="M14 5h-12v-2h12zM14 12h-12v2h12zM14 6h-7v2h7zM14 9h-7v2h7zM5 11v-5l-3 2.5z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  OutdentIcon.displayName = 'OutdentIcon';
}
export default React.forwardRef(OutdentIcon);
