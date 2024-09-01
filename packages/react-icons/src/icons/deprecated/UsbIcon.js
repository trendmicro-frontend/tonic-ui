// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import USBIcon from '../USBIcon';

const UsbIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `UsbIcon` component is deprecated and will be removed in the next major release. Use the `USBIcon` component instead.');
  });

  return (
    <USBIcon ref={ref} {...props} />
  );
});

UsbIcon.displayName = 'USBIcon';
UsbIcon._isDeprecated = true;

export default UsbIcon;
