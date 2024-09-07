// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import APIIcon from '../APIIcon';

const ApiIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ApiIcon` component is deprecated and will be removed in the next major release. Use the `APIIcon` component instead.');
  });

  return (
    <APIIcon ref={ref} {...props} />
  );
});

ApiIcon.displayName = 'APIIcon';
ApiIcon._isDeprecated = true;

export default ApiIcon;
