// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import IPIcon from '../IPIcon';

const IpIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IpIcon` component is deprecated and will be removed in the next major release. Use the `IPIcon` component instead.');
  });

  return (
    <IPIcon ref={ref} {...props} />
  );
});

IpIcon.displayName = 'IPIcon';
IpIcon._isDeprecated = true;

export default IpIcon;
