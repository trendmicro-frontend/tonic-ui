// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import WMIIcon from '../WMIIcon';

const WmiIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `WmiIcon` component is deprecated and will be removed in the next major release. Use the `WMIIcon` component instead.');
  });

  return (
    <WMIIcon ref={ref} {...props} />
  );
});

WmiIcon.displayName = 'WMIIcon';
WmiIcon._isDeprecated = true;

export default WmiIcon;
