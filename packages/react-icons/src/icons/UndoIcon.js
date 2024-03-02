// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const UndoIcon = (
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
      <g><path key="undo-0" d="M14.76 9.812c-0.826 3.012-3.54 5.188-6.762 5.188-2.577 0-4.829-1.393-6.044-3.467l-0.018-0.033 1.732-1c0.88 1.511 2.493 2.511 4.339 2.511 2.764 0 5.004-2.24 5.004-5.004s-2.24-5.004-5.004-5.004c-1.632 0-3.081 0.781-3.995 1.99l-0.009 0.013 1.995 1.995h-5v-5l1.579 1.579c1.293-1.578 3.242-2.578 5.425-2.578 3.864 0 6.997 3.133 6.997 6.997 0 0.645-0.087 1.27-0.251 1.863l0.012-0.049z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  UndoIcon.displayName = 'UndoIcon';
}
export default React.forwardRef(UndoIcon);
