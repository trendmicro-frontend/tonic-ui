// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import IAMIcon from '../IAMIcon';

const IamIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IamIcon` component is deprecated and will be removed in the next major release. Use the `IAMIcon` component instead.');
  });

  return (
    <IAMIcon ref={ref} {...props} />
  );
});

IamIcon.displayName = 'IAMIcon';
IamIcon._isDeprecated = true;

export default IamIcon;
