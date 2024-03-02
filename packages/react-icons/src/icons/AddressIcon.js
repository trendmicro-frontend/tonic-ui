// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const AddressIcon = (
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
      <g><path key="address-0" d="M14 5v0zM14 2v3c0.033 0.004 0.072 0.007 0.111 0.007 0.447 0 0.817-0.325 0.888-0.752l0.001-0.005v-1.5c-0.071-0.432-0.442-0.757-0.889-0.757-0.039 0-0.078 0.003-0.116 0.007l0.004-0zM14 2v0zM14 6v3c0.033 0.004 0.072 0.007 0.111 0.007 0.447 0 0.817-0.325 0.888-0.752l0.001-0.005v-1.5c-0.071-0.432-0.442-0.757-0.889-0.757-0.039 0-0.078 0.003-0.116 0.007l0.004-0zM14 10.060v3c0.033 0.004 0.072 0.007 0.111 0.007 0.447 0 0.817-0.325 0.888-0.752l0.001-0.005v-1.5c-0.071-0.432-0.442-0.757-0.889-0.757-0.039 0-0.078 0.003-0.116 0.007l0.004-0zM13 1v14c0 0.552-0.448 1-1 1v0h-10c-0.552 0-1-0.448-1-1v0-14c0-0.552 0.448-1 1-1v0h10c0.552 0 1 0.448 1 1v0zM10 9.34v0c-0.541-0.541-1.214-0.949-1.967-1.172l-0.033-0.008v-0.46c0.602-0.352 1-0.996 1-1.732 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.736 0.398 1.38 0.991 1.727l0.009 0.005v0.46c-0.786 0.231-1.459 0.64-2 1.18l0-0c-0.64 0.66-2 2.66 0.26 2.66h5.46c2.28 0 0.89-2 0.28-2.66z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  AddressIcon.displayName = 'AddressIcon';
}
export default React.forwardRef(AddressIcon);
